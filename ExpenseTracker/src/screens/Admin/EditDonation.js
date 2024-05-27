import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';
import React, { useState, useContext, useEffect } from 'react';
import { UIContext } from '../../../UIContext';
import AppBar from '../../../components/Common/AppBar';
import COLORS from '../../../contains/color';
import TimeModal from '../../../components/Modals/TimeModal';
import * as validator from '../../../contains/validator';
import validatorMessage from '../../../contains/validatorMessage';
import ButtonNew from '../../../components/ButtonNew';
import { doc, updateDoc } from 'firebase/firestore';
import { fb_db } from '../../../firebaseConfig';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const EditDonation = props => {
  const { categoryData, currentScreen } = useContext(UIContext);
  const [timeStart, setTimeStart] = useState(categoryData.timeStart);
  const [timeEnd, setTimeEnd] = useState(categoryData.timeEnd);
  const [title, setTitle] = useState(categoryData.name);
  const [description, setDescription] = useState(categoryData.description);

  useEffect(() => {
    if (categoryData === null) {
      alert('Không có dữ liệu của khoản đóng góp để chỉnh sửa');
      return;
    }
  }, []);

  const updateDonation = async () => {
    const donationRef = doc(fb_db, 'donations', categoryData.id);
    try {
      await updateDoc(donationRef, {
        category: title,
        create_date: timeStart,
        payment_due_date: timeEnd,
        description: description,
      });
      console.log('Donations successfully updated!');
    } catch (error) {
      console.error('Error updating donation: ', error);
    }
  };

  const updateExpense = async () => {
    const expenseRef = doc(fb_db, 'expenses', categoryData.id);
    try {
      await updateDoc(expenseRef, {
        category: title,
        create_date: timeStart,
        payment_due_date: timeEnd,
        description: description,
      });
      console.log('Expenses successfully updated!');
    } catch (error) {
      console.error('Error updating expense: ', error);
    }
  };

  const [onChangeTitle, setOnChangeTitle] = useState(0); // 0: chưa thay đổi, 1: đã thay đổi
  const handleInputTitle = infor => {
    setTitle(infor);
    setOnChangeTitle(1);
  };

  const [onChangeDescription, setOnChangeDescription] = useState(0); // 0: chưa thay đổi, 1: đã thay đổi
  const handleInputDescription = infor => {
    setDescription(infor);
    setOnChangeDescription(1);
  };

  const [onChangeTimeStart, setOnChangeTimeStart] = useState(0); // 0: chưa thay đổi, 1: đã thay đổi
  const handleInputTimeStart = infor => {
    setTimeStart(infor);
    setOnChangeTimeStart(onChangeTimeStart + 1);
  };

  const [onChangeTimeEnd, setOnChangeTimeEnd] = useState(0); // 0: chưa thay đổi, 1: đã thay đổi
  const handleInputTimeEnd = infor => {
    setTimeEnd(infor);
    setOnChangeTimeEnd(onChangeTimeEnd + 1);
  };

  const saveChange = () => {
    if (
      validator.isEmpty(title) ||
      validator.checkBlank(title) ||
      !validator.checkValidatorTime(timeStart) ||
      !validator.checkValidatorTime(timeEnd) ||
      !validator.checkTime(timeStart, timeEnd) ||
      validator.isEmpty(description) ||
      validator.checkBlank(description)
    ) {
      Alert.alert(
        'Thông báo',
        'Vui lòng nhập đầy đủ và đúng định dạng thông tin'
      );
      return;
    }
    Alert.alert('Thông báo', 'Bạn có chắc chắn muốn lưu thay đổi?', [
      {
        text: 'Hủy',
        style: 'cancel',
      },
      {
        text: 'Đồng ý',
        onPress: () => {
          if (currentScreen === 'InforOnceExpense') {
            updateExpense();
          } else {
            updateDonation();
          }
          props.navigation.goBack();
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <AppBar
        title="Chỉnh sửa thông tin quỹ"
        back={true}
        navigation={props.navigation}
      />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={{ paddingHorizontal: 20, paddingVertical: 20 }}>
          <View>
            <Text style={styles.text}>
              Tên quỹ {<Text style={{ color: 'red' }}>*</Text>}
            </Text>

          <View style={[styles.search, {marginBottom: 5}]}>
            <TextInput
              multiline={true}
              placeholder="Tên quỹ đóng góp"
              placeholderTextColor={COLORS.black}
              keyboardType="ascii-capable"
              onChangeText={text => handleInputTitle (text)}
              style={styles.inputSearch}
              defaultValue={categoryData.name}
            />
          </View>

            {onChangeTitle === 0 ||
              (validator.isEmpty(title) &&
                <Text
                  style={{ color: 'red' }}
                >{`Vui lòng nhập tên loại phí hoặc quỹ đóng góp`}</Text>) ||
              (validator.checkBlank(title) &&
                <Text style={{ color: 'red' }}>
                  {validatorMessage.blank}
                </Text>)}

          </View>

          <View>
            <TimeModal
              title="Thời gian thu quỹ"
              setTimeLeft={true}
              setTimeStart={handleInputTimeStart}
              setTimeEnd={handleInputTimeEnd}
              timeStartOld={categoryData.timeStart}
              timeEndOld={categoryData.timeEnd}
              update={true}
            />

            {onChangeTimeStart < 2 && onChangeTimeEnd < 2 ||
              (validator.checkValidatorTime(timeStart) === false &&
                <Text style={{ color: 'red' }}>
                  Thời gian bắt đầu thu không hợp lệ: {validatorMessage.time}
                </Text>) ||
              (
                (validator.checkValidatorTime(timeEnd) === false &&
                  <Text style={{ color: 'red' }}>
                    Thời gian kết thúc thu không hợp lệ: {validatorMessage.time}
                  </Text>)) ||
              (validator.checkTime(timeStart, timeEnd) === false &&
                <Text style={{ color: 'red' }}>
                  Thời gian kết thúc thu phải là thời điểm sau thời gian bắt đầu thu
                </Text>)}
          </View>

          <View>
            <Text style={styles.text}>
              Mô tả {<Text style={{ color: 'red' }}>*</Text>}
            </Text>

          <View style={[styles.search, {marginBottom: 5}]}>
            <TextInput
              multiline={true}
              placeholder="Mô tả về loại quỹ"
              placeholderTextColor={COLORS.black}
              keyboardType="ascii-capable"
              onChangeText={handleInputDescription}
              style={styles.inputSearch}
              defaultValue={categoryData.description}
            />

            </View>
            {onChangeDescription === 0 ||
              (validator.isEmpty(description) &&
                <Text style={{ color: 'red' }}>{`Vui lòng nhập mô tả`}</Text>) ||
              (validator.checkBlank(description) &&
                <Text style={{ color: 'red' }}>{validatorMessage.blank}</Text>)}
          </View>

          <View style={{ alignItems: 'center' }}>
            <ButtonNew
              title="Lưu thay đổi"
              nextScreen={false}
              onPress={saveChange}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditDonation;

const styles = StyleSheet.create({
  inputSearch: {
    width: '90%',
    fontSize: 15,
  },
  search: {
    flexDirection: 'row',
    backgroundColor: COLORS.search,
    marginBottom: screenHeight * 0.035,
    borderRadius: 20,
    borderColor: COLORS.border,
    borderWidth: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  text: {
    fontSize: 16,
    marginVertical: 15,
  },
});

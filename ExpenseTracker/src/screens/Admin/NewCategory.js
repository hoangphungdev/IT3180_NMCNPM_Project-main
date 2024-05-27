import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  TextInput,
  Alert,
} from 'react-native';
import React, { useContext, useState } from 'react';
import AppBar from '../../../components/Common/AppBar';
import COLORS from '../../../contains/color';
import TimeModal from '../../../components/Modals/TimeModal';
import { Picker } from '@react-native-picker/picker';
import Checkbox from 'expo-checkbox';
import ButtonNew from '../../../components/ButtonNew';
import { collection, addDoc } from 'firebase/firestore';
import { fb_db } from '../../../firebaseConfig';
import * as validator from '../../../contains/validator';
import validatorMessage from '../../../contains/validatorMessage';
import { UIContext } from '../../../UIContext';
import { ScrollView } from 'react-native-gesture-handler';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const NewCategory = props => {
  const [unit, setUnit] = useState('family');
  const [isChecked, setIsChecked] = useState(false);
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [timeStart, setTimeStart] = useState('');
  const [timeEnd, setTimeEnd] = useState('');
  const { currentScreen } = useContext(UIContext);

  const addExpensesToFirestore = async () => {
    try {
      const docRef = await addDoc(collection(fb_db, 'expenses'), {
        category: category,
        create_date: timeStart,
        payment_due_date: timeEnd,
        description: description,
        total: 0,
      });
      console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  const addDonationToFirestore = async () => {
    try {
      const docRef = await addDoc(collection(fb_db, 'donations'), {
        category: category,
        create_date: timeStart,
        payment_due_date: timeEnd,
        description: description,
        total: 0,
      });
      console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  const addNewCategory = () => {
    if (currentScreen === 'Expense') {
      addExpensesToFirestore();
      Alert.alert('Thông báo', 'Thêm phí thu thành công');
    } else {
      addDonationToFirestore();
      Alert.alert('Thông báo', 'Thêm quỹ đóng góp thành công');
    }
    props.navigation.goBack();
  };

  const confirmNewCategory = () => {
    if (
      validator.checkBlank(category) ||
      validator.checkBlank(description) ||
      validator.isEmpty(description) ||
      validator.isEmpty(category)
    ) {
      Alert.alert(
        'Thông báo',
        'Vui lòng nhập đầy đủ và đúng định dạng của thông tin'
      );
      return;
    }

    if (
      validator.checkTime(timeStart, timeEnd) === false ||
      validator.checkValidatorTime(timeStart) === false ||
      validator.checkValidatorTime(timeEnd) === false
    ) {
      Alert.alert(
        'Thông báo',
        'Thông tin về khoảng thời gian thu không hợp lệ, vui lòng kiểm tra lại'
      );
      return;
    }

    Alert.alert(
      'Xác nhận',
      'Bạn có chắc muốn tạo loại phí mới?',
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'Xác nhận',
          onPress: () => addNewCategory(),
        },
      ],
      { cancelable: false }
    );
  };

  const handleGoBack = () => {
    Alert.alert(
      'Xác nhận',
      'Bạn có chắc muốn quay lại?',
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'Xác nhận',
          onPress: () => props.navigation.goBack(),
        },
      ],
      { cancelable: false }
    );
  };

  const [onChangeCategory, setOnChangeCategory] = useState(0); // 0: chưa thay đổi, 1: đã thay đổi

  const handleInputCategory = infor => {
    setCategory(infor);
    setOnChangeCategory(1);
  };

  const [onChangeDescription, setOnChangeDescription] = useState(0); // 0: chưa thay đổi, 1: đã thay đổi
  const handleInputDescription = infor => {
    setDescription(infor);
    setOnChangeDescription(1);
  };

  const [onChangeTimeStart, setOnChangeTimeStart] = useState(0); // 0: chưa thay đổi, 1: đã thay đổi
  const handleInputTimeStart = infor => {
    setTimeStart(infor);
    setOnChangeTimeStart(timeStart + 1);
  };

  const [onChangeTimeEnd, setOnChangeTimeEnd] = useState(0); // 0: chưa thay đổi, 1: đã thay đổi
  const handleInputTimeEnd = infor => {
    setTimeEnd(infor);
    setOnChangeTimeEnd(timeEnd + 1);
  };

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <AppBar
        title={
          currentScreen !== 'Expense' ? 'Tạo quỹ đóng góp' : 'Tạo phí dịch vụ'
        }
      />

      <ScrollView
        keyboardShouldPersistTaps="handled"
      >
        <View style={{ paddingHorizontal: 20, paddingVertical: 20 }}>
          <View>
            <Text style={styles.text}>
              {currentScreen === "Expense" ? "Tên phí dịch vụ" : "Tên quỹ đóng góp"} {<Text style={{ color: 'red' }}>*</Text>}
            </Text>

          <View style={[styles.search, {marginBottom: 5}]}>
            <TextInput
              multiline={true}
              placeholder={
                currentScreen === 'Expense'
                  ? 'Tên loại phí mới'
                  : 'Tên quỹ đóng góp mới'
              }
              placeholderTextColor={COLORS.black}
              keyboardType="ascii-capable"
              style={styles.inputValue}
              onChangeText={text => handleInputCategory (text)}
            />
          </View>

            {onChangeCategory === 0 ||
              (validator.isEmpty(category) &&
                <Text style={{ color: 'red' }}>
                  {currentScreen !== 'Expense'
                    ? 'Vui lòng nhập quỹ đóng góp mới'
                    : 'Vui lòng nhập phí dịch vụ mới'}
                </Text>) ||
              (validator.checkBlank(category) &&
                <Text style={{ color: 'red' }}>
                  {validatorMessage.blank}
                </Text>)}
          </View>

          <View>
            <TimeModal
              title="Khoảng thời gian thu"
              setTimeLeft={true}
              setTimeStart={handleInputTimeStart}
              setTimeEnd={handleInputTimeEnd}
            />
            {onChangeTimeStart < 2 ||
              (validator.checkValidatorTime(timeStart) === false &&
                <Text style={{ color: 'red' }}>
                  Thời gian bắt đầu thu không hợp lệ: {validatorMessage.time}
                </Text>) ||
              (onChangeTimeEnd < 2 ||
                (validator.checkValidatorTime(timeEnd) === false &&
                  <Text style={{ color: 'red' }}>
                    Thời gian kết thúc thu không hợp lệ: {validatorMessage.time}
                  </Text>)) ||
              (validator.checkTime(timeStart, timeEnd) === false &&
                <Text style={{ color: 'red' }}>
                  Thời gian kết thúc thu phải là thời điểm sau thời gian bắt đầu thu
                </Text>)}
          </View>

          {/* <View
          style={{
            borderBottomColor: COLORS.primary,
            borderBottomWidth: 1,
            paddingBottom: 5,
            marginVertical: 10,
            flexDirection: 'row',
          }}
        >
          <Text style={styles.inputValue}>Loại phí bắt buộc</Text>
          <Checkbox
            style={{right: 20}}
            value={isChecked}
            onValueChange={setIsChecked}
            color={isChecked ? COLORS.primary : undefined}
          />
        </View> */}

        <View>
          <Text style={styles.text}>
            Mô tả {<Text style={{color: 'red'}}>*</Text>}
          </Text>
          <View style={[styles.search, {marginBottom: 5}]}>
            <TextInput
              multiline={true}
              placeholder={
                currentScreen !== 'Expense'
                  ? 'Mô tả về quỹ đóng góp mới'
                  : 'Mô tả về phí dịch vụ mới'
              }
              placeholderTextColor={COLORS.black}
              keyboardType="ascii-capable"
              style={styles.inputValue}
              onChangeText={text => handleInputDescription (text)}
            />
          </View>

            {onChangeDescription === 0 ||
              (validator.isEmpty(description) &&
                <Text style={{ color: 'red' }}>{`Vui lòng nhập mô tả`}</Text>) ||
              (validator.checkBlank(description) &&
                <Text style={{ color: 'red' }}>{validatorMessage.blank}</Text>)}
          </View>
        </View>
        <View style={{ justifyContent: 'space-around', flexDirection: 'row' }}>
          <ButtonNew title="Hủy" nextScreen={false} onPress={handleGoBack} />

          <ButtonNew
            title="Tạo loại phí mới"
            nextScreen={false}
            onPress={confirmNewCategory}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NewCategory;

const styles = StyleSheet.create({
  inputValue: {
    width: '100%',
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
  label: {
    marginBottom: 5,
  },
  picker: {
    height: 50,
    backgroundColor: COLORS.search,
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderRadius: 20,
    justifyContent: 'center',
    width: 180,
  },
  revenueValue: {
    height: 50,
    backgroundColor: COLORS.search,
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderRadius: 20,
    justifyContent: 'center',
    width: 100,
    paddingHorizontal: 15,
    fontSize: 15,
  },
});

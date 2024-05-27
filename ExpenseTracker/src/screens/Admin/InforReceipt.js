import { View, Text, SafeAreaView, StyleSheet, TextInput, Alert } from 'react-native';
import React, { useContext, useState } from 'react';
import AppBar from '../../../components/Common/AppBar';
import COLORS from '../../../contains/color';
import { MaterialIcons } from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';
import Checkbox from 'expo-checkbox';
import { useEffect } from 'react';
import { fetchCitizensDatabyId } from '../../../database/Dao/CitizenDao';
import { fetchHouseHoldDatabyId } from '../../../database/Dao/HouseholdDao';
import { deleteDonationPaymentbyDate, deleteExpensePaymentbyDate } from '../../../database/Dao/PaymentDao';
import { updateDonationData } from '../../../database/Dao/DonationDao';
import { updateExpenseData } from '../../../database/Dao/ExpenseDao';
import { UIContext } from '../../../UIContext';
import { formatMoney } from '../../../utils/moneyFormatter';


const Line = props => {
  const [inputValue, setInputValue] = useState('');
  const [onChangeText, setOnChangeText] = useState(0); // 0: chưa thay đổi, 1: đã thay đổi

  const itemStyle = {
    fontSize: 30,
    color: 'red', // Màu chữ cho mỗi mục
  };

  return (
    <View style={styles.line}>
      <Text style={styles.text}>
        {props.title}
      </Text>
      {props.checkBox === true
        ? <Checkbox
          value={!props.isChecked}
          onValueChange={props.setIsChecked}
          color={props.isChecked ? COLORS.primary : undefined}
        />
        : <View style={{ width: '60%' }}>
          {props.picker === true
            ? <RNPickerSelect
              placeholder={{
                label: props.label,
                value: '',
              }}
              items={props.pickerItems}
              onValueChange={value => handlePickerChange(value)}
              value={props.selectedValue}
            />
            : <View>
              {props.textInput === true
                ? <View>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Nhập mô tả về phiếu"
                    onChangeText={infor => handleInputChange(infor)}
                  />
                </View>
                : <View>
                  {props.time === true
                    ? <Text>{props.currentTime}</Text>
                    : null}
                </View>}
            </View>}
        </View>}
    </View>
  );
};

const InforReceipt = props => {
  const data = props.route.params.data;
  const [headOfHH, setHeadOfHH] = useState('');
  const {isAdmin} = useContext(UIContext);

  const deleteReceipt = async () => {
    if (data.donation) {
      await deleteDonationPaymentbyDate(data.payment.date, data.payment.household_id);
      await updateDonationData(data.payment.donation_id, data.payment.amount);
    } else {
      await deleteExpensePaymentbyDate(data.payment.date, data.payment.household_id);
      await updateExpenseData(data.payment.expense_id, data.payment.amount);
    }
    Alert.alert('Thông báo', 'Xóa phiếu thu thành công !')
    props.navigation.navigate('HomeAdmin');
  }

  const confirmDelete = () => { 
    Alert.alert(
      'Xác nhận xóa phiếu thu',
      'Bạn có chắc chắn muốn xóa phiếu thu này không ?',
      [
        {
          text: 'Hủy',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'Xóa', onPress: () => deleteReceipt() },
      ],
      { cancelable: false }
    );
  }

  useEffect(() => {
    const fetchData = async () => {
      const household = await fetchHouseHoldDatabyId(data.payment.household_id);
      const citizenData = await fetchCitizensDatabyId(household.members[0]);
      setHeadOfHH(citizenData);
    };
    fetchData();
  }, []);

  return (
    <SafeAreaView>
      <AppBar
        title="Thông tin phiếu thu"
        back={true}
        navigation={props.navigation}
        delete={isAdmin}
        func={confirmDelete}
      />

      <View style={[styles.view, { flexDirection: 'row' }]}>
        <MaterialIcons
          name="local-atm"
          size={100}
          color={COLORS.primary}
          style={{ marginRight: 30 }}
        />
        <View>
          <Text style={{ fontSize: 18, width: 150 }}>
            Giá trị thu
          </Text>
          <TextInput
            multiline={true}
            style={styles.textInput}
            keyboardType="numeric"
            placeholder="Số tiền thu"
            defaultValue={formatMoney(data.payment.amount)}
          />
        </View>
      </View>

      <View style={styles.view}>
        <Line
          title="Phiếu thu bắt buộc"
          checkBox={true}
          isChecked={data.donation ? true : false}
        />

        <Line
          title="Khoản phí"
          time={true}
          currentTime={
            data.donation ? data.donation.category : data.expense.category
          }
        />

        <Line
          title="Người nộp"
          time={true}
          currentTime={
            // Thay tên chủ hộ vào vị trí này
            headOfHH.name
          }
        />
      </View>

      <View style={styles.view}>
        <Line
          title="Ngày tạo phiếu"
          time={true}
          currentTime={data.payment.date}
        />
        <Line
          title="Ngày ghi nhận"
          time={true}
          currentTime={data.payment.date}
        />
        <Line
          title="Mô tả"
          time={true}
          currentTime={data.payment.description}
        />
      </View>
    </SafeAreaView>
  );
};

export default InforReceipt;

const styles = StyleSheet.create({
  view: {
    backgroundColor: COLORS.buttonUpdate,
    marginTop: 20,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    borderBottomColor: COLORS.border,
    borderBottomWidth: 1,
    fontSize: 15,
  },
  line: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',
    borderBottomColor: COLORS.border,
    borderBottomWidth: 2,
    paddingVertical: 10,
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
  },
  inputSearch: {
    width: '90%',
    fontSize: 15,
  },
  iconSearch: {
    bottom: 2,
    marginRight: 10,
  },
  search: {
    flexDirection: 'row',
    backgroundColor: COLORS.search,
    borderRadius: 20,
    borderColor: COLORS.border,
    borderWidth: 1,
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 30,
  },
});

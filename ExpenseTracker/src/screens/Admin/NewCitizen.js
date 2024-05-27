import { View, Text, SafeAreaView, Alert } from 'react-native';
import React from 'react';
import AppBar from '../../../components/Common/AppBar';
import BoxChangeInfor
  from '../../../components/Screens/AccountInfo/BoxChangeInfor';
import { ScrollView } from 'react-native-gesture-handler';
import ButtonNew from '../../../components/ButtonNew';
import { collection, addDoc } from 'firebase/firestore';
import { fb_db } from '../../../firebaseConfig';
import * as validator from '../../../contains/validator';
import { checkId_card_number } from '../../../database/Dao/CitizenDao';

const NewCitizen = ({ navigation }) => {
  const [phone, setPhone] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [job, setJob] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [name, setName] = React.useState('');
  const [birth, setBirth] = React.useState('');
  const [ID_card_number, setID_card_number] = React.useState('');
  const [gender, setGender] = React.useState('');

  const addCitizenToFirestore = async () => {
    if (!await checkId_card_number(ID_card_number)) return;
    try {
      const docRef = await addDoc(collection(fb_db, 'citizens'), {
        phone: phone,
        email: email,
        job: job,
        address: address,
        name: name,
        birth: birth,
        ID_card_number: ID_card_number,
        gender: gender,
        household_id: '',
      });
      Alert.alert('Thông báo', 'Thêm dân cư mới thành công');
      navigation.goBack();
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  const confirmNewCitizen = () => {
    if (
      validator.checkBlank(name) ||
      !validator.checkValidatorTime(birth) ||
      (!validator.isEmpty(ID_card_number) &&
        !validator.checkValidatorCCCD(ID_card_number)) ||
      !validator.checkValidatorGender(gender) ||
      (!validator.isEmpty(phone) && !validator.checkValidatorPhone(phone)) ||
      (!validator.isEmpty(email) && !validator.checkValidatorEmail(email)) ||
      (!validator.isEmpty(job) && validator.checkBlank(job)) ||
      validator.isEmpty(address) ||
      validator.checkBlank(address)
    ) {
      Alert.alert('Thông báo', 'Vui lòng kiểm tra lại thông tin');
      return;
    }

    Alert.alert(
      'Xác nhận',
      'Bạn có chắc muốn thêm dân cư mới?',
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'Đồng ý',
          onPress: () => addCitizenToFirestore(),
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}
    >
      <AppBar title="Tạo dân cư mới" back={true} navigation={navigation} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >

        <BoxChangeInfor
          topic="Họ và tên"
          placeholder="Nhập họ và tên"
          onChangeText={setName}
          obligatory={true}
        />

        <BoxChangeInfor
          topic="Ngày sinh"
          placeholder="Nhập ngày sinh"
          onChangeText={setBirth}
          category="Birth"
          obligatory={true}
        />

        <BoxChangeInfor
          topic="Số CCCD/CMND"
          placeholder="Nhập số CCCD/CMND"
          onChangeText={setID_card_number}
          keyboardType="numeric"
          category="ID_card_number"
        />

        <BoxChangeInfor
          topic="Giới tính"
          placeholder="Nhập giới tính"
          onChangeText={setGender}
          category="Gender"
          obligatory={true}
        />

        <BoxChangeInfor
          topic="Số điện thoại"
          placeholder="Nhập số điện thoại"
          onChangeText={setPhone}
          keyboardType="numeric"
          category="Phone"
        />

        <BoxChangeInfor
          topic="Email"
          placeholder="Nhập địa chỉ email"
          onChangeText={setEmail}
          keyboardType="email-address"
          category="Email"
        />

        <BoxChangeInfor
          topic="Nghề nghiệp"
          placeholder="Nhập nghề nghiệp hiện tại"
          onChangeText={setJob}
          keyboardType="default"
        />

        <BoxChangeInfor
          topic="Địa chỉ thường trú"
          placeholder="Nhập địa chỉ nơi bạn đang thường trú"
          onChangeText={setAddress}
          keyboardType="default"
          obligatory={true}
        />
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ButtonNew
            title="Thêm dân cư mới"
            nextScreen={false}
            onPress={confirmNewCitizen}
          />
        </View>
      </ScrollView>


    </SafeAreaView>
  );
};

export default NewCitizen;

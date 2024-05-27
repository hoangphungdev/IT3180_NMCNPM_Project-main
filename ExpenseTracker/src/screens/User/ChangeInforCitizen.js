import { SafeAreaView, ScrollView, Dimensions, View, Alert } from 'react-native';
import React, { useContext, useEffect } from 'react';
import { UIContext } from '../../../UIContext';
import AppBar from '../../../components/Common/AppBar';
import BoxChangeInfor
  from '../../../components/Screens/AccountInfo/BoxChangeInfor';
import ButtonNew from '../../../components/ButtonNew';
import * as validator from '../../../contains/validator';
import { doc, updateDoc } from 'firebase/firestore';
import { fb_db } from '../../../firebaseConfig';
import { checkId_card_number } from '../../../database/Dao/CitizenDao';
import { useNavigation } from '@react-navigation/native';
import { fetchUserData } from '../../../database/Dao/UserDao';

const { width, height } = Dimensions.get("screen");

const ChangeInforCitizen = (props) => {
  const { citizen, idPerson, setIdPerson, user } = useContext(UIContext);
  const { isAdmin } = useContext(UIContext);
  const [phone, setPhone] = React.useState(citizen.phone);
  const [email, setEmail] = React.useState(citizen.email);
  const [job, setJob] = React.useState(citizen.job);
  const [address, setAddress] = React.useState(citizen.address);
  const [gender, setGender] = React.useState(citizen.gender);
  const [birth, setBirth] = React.useState(citizen.birth);
  const [ID_card_number, setID_card_number] = React.useState(
    citizen.ID_card_number
  );
  const [name, setName] = React.useState(citizen.name);

  useEffect(() => {
    setIdPerson(user.citizen_id);
  }, []);

  const updateCitizenData = async () => {
    if (!(await checkId_card_number(ID_card_number, "ChangeInforCitizen")))
      return;
    const citizenRef = doc(fb_db, "citizens", idPerson);
    try {
      await updateDoc(citizenRef, {
        phone: phone,
        email: email,
        job: job,
        address: address,
        name: name,
        ID_card_number: ID_card_number,
        gender: gender,
        birth: birth,
      });
      console.log('Citizen successfully updated!');
      Alert.alert('Thông báo', 'Cập nhật thông tin thành công');
      // if (!isAdmin) {
      //   const userData = await fetchUserData (userId);
      //   setUser (userData);
      // }
      props.navigation.goBack();
    } catch (error) {
      console.error("Error updating citizen: ", error);
    }
  };

  const handleGoBack = () => {
    Alert.alert(
      "Xác nhận",
      "Bạn có chắc muốn quay lại?",
      [
        {
          text: "Hủy",
          style: "cancel",
        },
        {
          text: "Xác nhận",
          onPress: () => props.navigation.goBack(),
        },
      ],
      { cancelable: false }
    );
  };

  const saveChange = () => {
    Alert.alert(
      "Xác nhận",
      "Bạn có chắc muốn cập nhật thông tin?",
      [
        {
          text: "Hủy",
          style: "cancel",
        },
        {
          text: "Xác nhận",
          // Hàm thay đổi thông tin tại đây
          onPress: () => updateCitizenData(),
        },
      ],
      { cancelable: false }
    );
  };

  const checkValidator = () => {
    if (
      validator.checkBlank(name) ||
      !validator.checkValidatorTime(birth) ||
      (!validator.isEmpty(ID_card_number) &&
        !validator.checkValidatorCCCD(ID_card_number)) ||
      !validator.checkValidatorGender(gender) ||
      (!validator.isEmpty(phone) && !validator.checkValidatorPhone(phone)) ||
      (!validator.isEmpty(email) && !validator.checkValidatorEmail(email)) ||
      (!validator.isEmpty(job) && validator.checkBlank(job)) ||
      validator.checkBlank(address)
    ) {
      Alert.alert(
        "Thông báo",
        "Thông tin cập nhật không hợp lệ hoặc còn thiếu"
      );
      return false;
    } else {
      saveChange();
      return true;
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <AppBar title="Cập nhật thông tin cá nhân" />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <BoxChangeInfor
          topic="Họ và tên"
          placeholder="Nhập họ và tên"
          change={isAdmin}
          inforTopic={citizen.name}
          onChangeText={setName}
          obligatory={true}
        />

        <BoxChangeInfor
          topic="Ngày sinh"
          placeholder="Nhập ngày sinh"
          change={isAdmin}
          inforTopic={citizen.birth}
          onChangeText={setBirth}
          category="Birth"
          obligatory={true}
        />

        <BoxChangeInfor
          topic="Số CCCD/CMND"
          placeholder="Nhập số CCCD/CMND"
          change={isAdmin}
          inforTopic={citizen.ID_card_number}
          onChangeText={setID_card_number}
          keyboardType="numeric"
          category="ID_card_number"
        />

        <BoxChangeInfor
          topic="Giới tính"
          placeholder="Nhập giới tính"
          change={isAdmin}
          inforTopic={citizen.gender}
          onChangeText={setGender}
          category="Gender"
          obligatory={true}
        />

        <BoxChangeInfor
          topic="Số điện thoại"
          placeholder="Nhập số điện thoại"
          onChangeText={setPhone}
          inforTopic={citizen.phone}
          keyboardType="numeric"
          category="Phone"
        />

        <BoxChangeInfor
          topic="Email"
          placeholder="Nhập địa chỉ email"
          onChangeText={setEmail}
          inforTopic={citizen.email}
          keyboardType="email-address"
          category="Email"
        />

        <BoxChangeInfor
          topic="Nghề nghiệp"
          placeholder="Nhập nghề nghiệp hiện tại"
          inforTopic={citizen.job}
          onChangeText={setJob}
          keyboardType="default"
        />

        <BoxChangeInfor
          topic="Địa chỉ thường trú"
          placeholder="Nhập địa chỉ nơi bạn đang thường trú"
          inforTopic={citizen.address}
          onChangeText={setAddress}
          keyboardType="default"
          obligatory={true}
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around'

          }}>
          <ButtonNew title="Quay lại" nextScreen={false} onPress={handleGoBack} />
          <ButtonNew
            title="Lưu thay đổi"
            nextScreen={false}
            onPress={checkValidator}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChangeInforCitizen;

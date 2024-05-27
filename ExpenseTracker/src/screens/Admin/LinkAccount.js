import {View, Text, SafeAreaView, Alert} from 'react-native';
import React, {useState} from 'react';
import AppBar from '../../../components/Common/AppBar';
import BoxChangeInfor
  from '../../../components/Screens/AccountInfo/BoxChangeInfor';
import ButtonNew from '../../../components/ButtonNew';
import validatorMessage from '../../../contains/validatorMessage';
import * as validator from '../../../contains/validator';
import {fetchCitizensDatabyId} from '../../../database/Dao/CitizenDao';
import {fetchUserIDbyPhoneNumber} from '../../../database/Dao/UserDao';
import {doc, updateDoc} from '@firebase/firestore';
import {fb_db} from '../../../firebaseConfig';

const LinkAccount = ({navigation}) => {
  const [username, setUsername] = useState ('');
  const [idCitizen, setIdCitizen] = useState ('');

  const confirmLinkAccount = () => {
    if (
      !(!validator.isEmpty (username) &&
        !validator.isEmpty (idCitizen) &&
        !validator.checkBlank (username) &&
        !validator.checkBlank (idCitizen) &&
        validator.checkValidatorUserName (username))
    ) {
      Alert.alert ('Thông báo', 'Vui lòng kiểm tra lại thông tin');
      return false;
    }
  };

  const checkUsername = async username => {
    const userId = await fetchUserIDbyPhoneNumber (username);
    if (userId.length == 0) {
      Alert.alert ('Thông báo', 'Không tìm thấy tài khoản này trong hệ thống');
      return false;
    }
    return true;
  };

  const checkIdCitizen = async idCitizen => {
    const citizenData = await fetchCitizensDatabyId (idCitizen);
    if (citizenData == undefined) {
      Alert.alert ('Thông báo', 'Không tìm thấy công dân này trong hệ thống');
      return false;
    }
    return true;
  };

  const LinkAccountAndCitizen = async () => {
    if (!await checkUsername (username) || !await checkIdCitizen (idCitizen))
      return;

    const userId = await fetchUserIDbyPhoneNumber (username);
    
    const userRef = doc (fb_db, 'users', userId[0]);
    try {
      await updateDoc (userRef, {
        citizen_id: idCitizen,
      });
      Alert.alert ('Thông báo', 'Liên kết tài khoản thành công');
      navigation.goBack ();
    } catch (e) {
      console.error ('Error updating document: ', e);
    }
  };

  return (
    <SafeAreaView>
      <AppBar back={true} title="Liên kết tài khoản" navigation={navigation} />

      <BoxChangeInfor
        topic="Tên tài khoản"
        placeholder="Nhập tên tài khoản"
        category="userName"
        onChangeText={(text) => setUsername(text.toLowerCase())}
        obligatory={true}
      />

      <BoxChangeInfor
        topic="Mã định danh"
        placeholder="Nhập mã định danh"
        onChangeText={setIdCitizen}
        obligatory={true}
      />

      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <ButtonNew
          title="Liên kết"
          nextScreen={false}
          // onPress={confirmLinkAccount}
          onPress={LinkAccountAndCitizen}
        />
      </View>

    </SafeAreaView>
  );
};

export default LinkAccount;

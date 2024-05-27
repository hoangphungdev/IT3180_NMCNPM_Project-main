import {SafeAreaView, ScrollView, Dimensions, View, Alert, BackHandler} from 'react-native';
import React, {useContext, useState} from 'react';
import {UIContext} from './../../UIContext';
import AppBar from '../../components/Common/AppBar';
import BoxChangeInfor
  from '../../components/Screens/AccountInfo/BoxChangeInfor';
import ButtonNew from '../../components/ButtonNew';
import * as validator from '../../contains/validator';
import validatorMessage from '../../contains/validatorMessage';
import {doc, updateDoc} from 'firebase/firestore';
import {fb_db} from '../../firebaseConfig';
import BackModal from '../../components/Modals/InforAccountModals/BackModal';
import UpdateModal from '../../components/Modals/InforAccountModals/UpdateModal';
import AlertModal from '../../components/Modals/InforAccountModals/AlertModal';

const {width, height} = Dimensions.get ('screen');

const ChangeInforLogin = props => {
  // prepare data for user
  const {userId} = useContext (UIContext);
  const {user, setUser} = useContext (UIContext);
  const userName = user.phoneNumber;
  const password = user.password;

  const [oldPassword, setOldPassword] = React.useState ('');
  const [newPassword, setNewPassword] = React.useState ('');
  const [confirmPassword, setConfirmPassword] = React.useState ('');

  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);

  const updateUserData = async id => {
    const userRef = doc (fb_db, 'users', id.toString());
    try {
      await updateDoc (userRef, {
        password: newPassword,
      });
      Alert.alert ('Thông báo', 'Cập nhật thông tin thành công');
      setUser ({
        ...user,
        password: newPassword,
      });
      props.navigation.goBack ();
    } catch (error) {
      Alert.alert ('Thông báo', 'Cập nhật thông tin thất bại');
    }
  };

  const checkPassword = () => {
    if (validator.checkOldPassword (password, oldPassword) === false) {
      Alert.alert (
        'Thông báo',
        `${validatorMessage.oldPassword}, hãy nhập lại`
      );
      return false;
    } else if (newPassword === oldPassword) {
      Alert.alert (
        'Thông báo',
        'Mật khẩu mới không được trùng với mật khẩu cũ, hãy nhập lại'
      );
      return false;
    } else if (
      !validator.checkValidatorConfirmPassword (newPassword, confirmPassword)
    ) {
      Alert.alert ('Thông báo', 'Mật khẩu mới không trùng khớp, hãy nhập lại');
      return false;
    } else {
      updateUserData (userId);
    }
  };

  const handleGoBack = () => {
    Alert.alert (
      'Xác nhận',
      'Bạn có chắc muốn quay lại?',
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'Xác nhận',
          onPress: () => props.navigation.goBack (),
        },
      ],
      {cancelable: false}
    );
  };

  const saveChange = () => {
    if (
      validator.checkBlank (newPassword) ||
      validator.checkBlank (confirmPassword) ||
      validator.checkBlank (oldPassword) ||
      !validator.checkValidatorPassword (newPassword) ||
      !validator.checkValidatorPassword (confirmPassword) ||
      !validator.checkValidatorPassword (oldPassword)
    ) {
      Alert.alert ('Thông báo', 'Hãy nhập đầy đủ và đúng định dạng thông tin ');
      return false;
    }
    Alert.alert (
      'Xác nhận',
      'Bạn có chắc muốn cập nhật thông tin?',
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'Xác nhận',
          // Hàm thay đổi thông tin tại đây
          onPress: () => {
            checkPassword ();
          },
        },
      ],
      {cancelable: false}
    );
  };

  const handleConfirm = () => {
    if (
      validator.checkBlank (newPassword) ||
      validator.checkBlank (confirmPassword) ||
      validator.checkBlank (oldPassword) ||
      !validator.checkValidatorPassword (newPassword) ||
      !validator.checkValidatorPassword (confirmPassword) ||
      !validator.checkValidatorPassword (oldPassword)
    ) {
      setModalVisible3(true);
    } else {
      setModalVisible2(true);
    }
  }

  return (
    <SafeAreaView
      style={{
        height: height,
        backgroundColor: '#fff',
      }}
    >
      <AppBar title="Sửa thông tin tài khoản" />
      <BackModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        navigation={props.navigation}
      />
      <UpdateModal
        modalVisible={modalVisible2}
        setModalVisible={setModalVisible2}
        navigation={props.navigation}
        func={checkPassword}
      />
      <AlertModal
        modalVisible={modalVisible3}
        setModalVisible={setModalVisible3}
        navigation={props.navigation}
      />
      <ScrollView style={{height: height * 0.63}}>
        <BoxChangeInfor
          topic="Tên tài khoản"
          inforTopic={userName}
          placeholder="Nhập tên tài khoản"
          change={false}
          category="userName"
        />

        <BoxChangeInfor
          topic="Mật khẩu cũ"
          placeholder="Nhập mật khẩu cũ"
          onChangeText={setOldPassword}
          category="password"
        />

        <BoxChangeInfor
          topic="Mật khẩu mới"
          placeholder="Nhập mật khẩu mới"
          onChangeText={setNewPassword}
          category="password"
        />

        <BoxChangeInfor
          topic="Xác nhận mật khẩu mới"
          placeholder="Nhập lại mật khẩu mới"
          onChangeText={setConfirmPassword}
          category="password"
        />
      </ScrollView>

      <View style={{flexDirection: 'row', justifyContent: 'space-around', marginBottom: 50}}>
        <ButtonNew title="Quay lại" nextScreen={false} onPress={()=>{setModalVisible(true)}} />

        <ButtonNew
          title="Lưu thay đổi"
          nextScreen={false}
          onPress={handleConfirm}
        />

      </View>
    </SafeAreaView>
  );
};

export default ChangeInforLogin;

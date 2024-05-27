import {
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import COLORS from '../../contains/color';
import {Ionicons} from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import {addDoc, collection, getDocs, query, where} from '@firebase/firestore';
import {fb_db} from '../../firebaseConfig';
import {useContext} from 'react';

import {UIContext} from './../../UIContext';
import LoginButton from '../../components/Common/LoginButton';
import * as validator from '../../contains/validator';
import validatorMessage from '../../contains/validatorMessage';

const Signup = ({navigation}) => {
  const {userId, setUserId} = useContext (UIContext);

  const [isPasswordShown, setIsPasswordShown] = useState (false);
  const [isChecked, setIsChecked] = useState (false);
  const [phoneNumber, setPhoneNumber] = useState ('');
  const [password, setPassword] = useState ('');
  const [confirmPassword, setConfirmPassword] = useState ('');
  const [name, setName] = useState ('');
  const [loading, setLoading] = useState (false);
  const [gmail, setGmail] = useState ('');

  const db = fb_db;

  const signUp = async () => {
    // Input validation
    if (validator.isEmpty (phoneNumber)) {
      Alert.alert ('Thông báo', 'Chưa nhập tên tài khoản!');
      return;
    } else if (
      !validator.checkValidatorUserName (phoneNumber) ||
      validator.checkBlank (phoneNumber)
    ) {
      Alert.alert ('Thông báo', 'Tên tài khoản không hợp lệ!');
      return;
    }
    if (
      !validator.checkValidatorEmail (gmail) ||
      validator.checkBlank (gmail)
    ) {
      Alert.alert ('Thông báo', 'Email không hợp lệ!');
      return;
    }

    if (validator.isEmpty (password)) {
      Alert.alert ('Thông báo', 'Mật khẩu đang trống!');
      return;
    } else if (
      !validator.checkValidatorPassoword (password) ||
      validator.checkBlank (password)
    ) {
      Alert.alert ('Thông báo', 'Mật khẩu không hợp lệ!');
      return;
    }

    if (validator.isEmpty (confirmPassword)) {
      Alert.alert ('Thông báo', 'Mật khẩu xác nhận đang trống!');
      return;
    } else if (
      !validator.checkValidatorPassoword (confirmPassword) ||
      validator.checkBlank (confirmPassword)
    ) {
      Alert.alert ('Thông báo', 'Mật khẩu xác nhận không hợp lệ!');
      return;
    }

    if (
      validator.checkValidatorConfirmPassword (password, confirmPassword) ==
      false
    ) {
      Alert.alert ('Thông báo', 'Mật khẩu xác nhận không khớp!');
      return;
    }

    if (isChecked == false) {
      Alert.alert ('Thông báo', 'Chưa đồng ý với thỏa thuận người dùng!');
      return;
    }

    // Sign up logic
    setLoading (true);
    const qPhone = await query (
      collection (db, 'users'),
      where ('phoneNumber', '==', phoneNumber)
    );
    const querySnapshot = await getDocs (qPhone);
    if (!querySnapshot.empty) {
      setLoading (false);
      Alert.alert ('Thông báo','Tài khoản đã tồn tại!');
      return;
    }
    try {
      // get current day timestamp and convert to string
      const date = new Date ();
      const timestamp =
        date.getDate () +
        '/' +
        (date.getMonth () + 1) +
        '/' +
        date.getFullYear ();
      const last_update = timestamp.toString ();
      await addDoc (collection (db, 'users'), {
        emailAuthen: gmail,
        phoneNumber: phoneNumber,
        password: password,
        active: true,
        birth: '',
        gender: '',
        isAdmin: false,
        last_update: last_update,
        name: name,
        username: '',
      });
      // // set userId
      // const userId = await getDocs (
      //   query (
      //     collection (db, 'users'),
      //     where ('phoneNumber', '==', phoneNumber)
      //   )
      // ).then (querySnapshot => querySnapshot.docs.map (doc => doc.id));
      // setUserId (userId);
      setLoading (false);
      Alert.alert ('Thông báo','Tạo tài khoản thành công!');
      navigation.navigate ('SignIn');
    } catch (error) {
      setLoading (false);
      alert (error.message);
    } finally {
      setLoading (false);
    }
  };

  const [onChangeName, setOnChangeName] = useState (0);
  const onChangeInputName = text => {
    setPhoneNumber (text.toLowerCase ());
    setOnChangeName (onChangeName + 1);
  };

  const [onChangePhoneNumber, setOnChangePhoneNumber] = useState (0);

  const [onChangePassword, setOnChangePassword] = useState (0);
  const onChangeInputPassword = text => {
    setPassword (text);
    setOnChangePassword (onChangePassword + 1);
  };

  const [onChangeConfirmPassword, setOnChangeConfirmPassword] = useState (0);
  const onChangeInputConfirmPassword = text => {
    setConfirmPassword (text);
    setOnChangeConfirmPassword (onChangeConfirmPassword + 1);
  };

  const [onChangeGmail, setOnChangeGmail] = useState (0);
  const onChangeInputGmail = text => {
    setGmail (text);
    setOnChangeGmail (onChangeGmail + 1);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <View style={{flex: 1, marginHorizontal: 22}}>
        <View style={{marginVertical: 15}}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: 'bold',
              color: COLORS.black,
            }}
          >
            Tạo tài khoản mới
          </Text>
        </View>

        <View style={{marginBottom: 12}}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 400,
              marginVertical: 8,
            }}
          >
            Tên tài khoản
          </Text>

          <View
            style={{
              width: '100%',
              height: 48,
              borderColor: COLORS.black,
              borderWidth: 1,
              borderRadius: 8,
              alignItems: 'center',
              justifyContent: 'center',
              paddingLeft: 22,
            }}
          >
            <TextInput
              multiline={true}
              placeholder="Nhập tên tài khoản"
              placeholderTextColor={COLORS.black}
              onChangeText={text => onChangeInputName (text)}
              style={{
                width: '100%',
              }}
            />
          </View>
          {onChangeName === 0 ||
            (validator.isEmpty (phoneNumber) &&
              <Text style={{color: 'red'}}>
                Vui lòng nhập tên tài khoản
              </Text>) ||
            (validator.checkBlank (phoneNumber) &&
              <Text style={{color: 'red'}}>{validatorMessage.blank}</Text>) ||
            (!validator.checkValidatorUserName (phoneNumber) &&
              <Text style={{color: 'red'}}>
                {validatorMessage.userName}
              </Text>)}
        </View>

        <View style={{marginBottom: 12}}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 400,
              marginVertical: 8,
            }}
          >
            Gmail xác thực
          </Text>

          <View
            style={{
              width: '100%',
              height: 48,
              borderColor: COLORS.black,
              borderWidth: 1,
              borderRadius: 8,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingLeft: 22,
            }}
          >

            <TextInput
              multiline={true}
              placeholder="Nhập gmail xác thực"
              placeholderTextColor={COLORS.black}
              onChangeText={text => onChangeInputGmail (text)}
              style={{
                width: '80%',
              }}
              keyboardType='email-address'
            />
          </View>
          {onChangeGmail === 0 ||
            (validator.isEmpty (gmail) &&
              <Text style={{color: 'red'}}>
                Vui lòng nhập gmail xác thực
              </Text>) ||
            (validator.checkBlank (gmail) &&
              <Text style={{color: 'red'}}>{validatorMessage.blank}</Text>) ||
            (!validator.checkValidatorEmail (gmail) &&
              <Text style={{color: 'red'}}>{validatorMessage.email}</Text>)}
        </View>

        <View style={{marginBottom: 12}}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 400,
              marginVertical: 8,
            }}
          >
            Mật khẩu
          </Text>

          <View
            style={{
              width: '100%',
              height: 48,
              borderColor: COLORS.black,
              borderWidth: 1,
              borderRadius: 8,
              alignItems: 'center',
              justifyContent: 'center',
              paddingLeft: 22,
            }}
          >
            <TextInput
              placeholder="Nhập mật khẩu"
              placeholderTextColor={COLORS.black}
              secureTextEntry={isPasswordShown}
              onChangeText={text => onChangeInputPassword (text)}
              style={{
                width: '100%',
              }}
            />

            <TouchableOpacity
              onPress={() => setIsPasswordShown (!isPasswordShown)}
              style={{
                position: 'absolute',
                right: 12,
              }}
            >
              {isPasswordShown == true
                ? <Ionicons name="eye-off" size={24} color={COLORS.black} />
                : <Ionicons name="eye" size={24} color={COLORS.black} />}

            </TouchableOpacity>
          </View>
          {onChangePassword === 0 ||
            (validator.isEmpty (password) &&
              <Text style={{color: 'red'}}>Vui lòng nhập mật khẩu</Text>) ||
            (validator.checkBlank (password) &&
              <Text style={{color: 'red'}}>{validatorMessage.blank}</Text>) ||
            (!validator.checkValidatorPassword (password) &&
              <Text style={{color: 'red'}}>{validatorMessage.password}</Text>)}
        </View>

        <View style={{marginBottom: 12}}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 400,
              marginVertical: 8,
            }}
          >
            Nhập lại mật khẩu
          </Text>

          <View
            style={{
              width: '100%',
              height: 48,
              borderColor: COLORS.black,
              borderWidth: 1,
              borderRadius: 8,
              alignItems: 'center',
              justifyContent: 'center',
              paddingLeft: 22,
            }}
          >
            <TextInput
              placeholder="Nhập lại mật khẩu"
              placeholderTextColor={COLORS.black}
              secureTextEntry={isPasswordShown}
              style={{
                width: '100%',
              }}
              onChangeText={text => onChangeInputConfirmPassword (text)}
            />

            <TouchableOpacity
              onPress={() => setIsPasswordShown (!isPasswordShown)}
              style={{
                position: 'absolute',
                right: 12,
              }}
            >
              {isPasswordShown == true
                ? <Ionicons name="eye-off" size={24} color={COLORS.black} />
                : <Ionicons name="eye" size={24} color={COLORS.black} />}

            </TouchableOpacity>
          </View>
          {onChangeConfirmPassword === 0 ||
            (validator.isEmpty (confirmPassword) &&
              <Text style={{color: 'red'}}>Vui lòng nhập lại mật khẩu</Text>) ||
            (validator.checkBlank (confirmPassword) &&
              <Text style={{color: 'red'}}>{validatorMessage.blank}</Text>) ||
            (!validator.checkValidatorPassword (confirmPassword) &&
              <Text style={{color: 'red'}}>
                {validatorMessage.password}
              </Text>) ||
            (password != confirmPassword &&
              <Text style={{color: 'red'}}>Mật khẩu xác nhận không khớp</Text>)}
        </View>

        <View
          style={{
            flexDirection: 'row',
            marginVertical: 6,
          }}
        >
          <Checkbox
            style={{marginRight: 8}}
            value={isChecked}
            onValueChange={setIsChecked}
            color={isChecked ? COLORS.primary : undefined}
          />

          <Text>Tôi đồng ý với thỏa thuận người dùng</Text>
        </View>
          
        <LoginButton
          title="Đăng ký"
          filled
          onPress={signUp}
          loading={loading}
        />

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 20,
          }}
        >
          <View
            style={{
              flex: 1,
              height: 1,
              backgroundColor: COLORS.grey,
              marginHorizontal: 10,
            }}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginVertical: 22,
          }}
        >
          <Text style={{fontSize: 16, color: COLORS.black}}>
            Bạn đã có tài khoản ?
          </Text>
          <Pressable onPress={() => navigation.navigate ('SignIn')}>
            <Text
              style={{
                fontSize: 16,
                color: COLORS.primary,
                fontWeight: 'bold',
                marginLeft: 6,
              }}
            >
              Đăng nhập
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Signup;

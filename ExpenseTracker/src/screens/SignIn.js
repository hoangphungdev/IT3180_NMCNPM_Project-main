import {
  View,
  Text,
  Pressable,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import COLORS from '../../contains/color';
import {Ionicons} from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import {collection, getDocs, query, where} from '@firebase/firestore';
import {fb_db} from '../../firebaseConfig';
import {ActivityIndicator} from 'react-native';
import {useContext} from 'react';

import {UIContext} from './../../UIContext';
import LoginButton from '../../components/Common/LoginButton';

import {getDoc, doc} from 'firebase/firestore';
import {fetchUserData} from '../../database/Dao/UserDao';
import {fetchCitizensDatabyId} from '../../database/Dao/CitizenDao';

import * as validator from '../../contains/validator';
import validatorMessage from '../../contains/validatorMessage';
import {validate} from 'react-native-web/dist/cjs/exports/StyleSheet/validate';

const SignIn = ({navigation}) => {
  const [isPasswordShown, setIsPasswordShown] = useState (false);
  const [isChecked, setIsChecked] = useState (false);
  const [phoneNumber, setPhoneNumber] = useState ('');
  const [password, setPassword] = useState ('');
  const [loading, setLoading] = useState (false);
  const db = fb_db;

  const {userId, setUserId} = useContext (UIContext);
  const {setIsAdmin} = useContext (UIContext);
  const {setUser} = useContext (UIContext);
  const {citizen, setCitizen} = useContext (UIContext);
  useEffect (() => {
    const initialize = async () => {
      try {
        setLoading (true);
        const storedUserId = await AsyncStorage.getItem ('userId');

        if (storedUserId !== null) {
          console.log ('Found user saved: ', storedUserId);
          const docRef = doc (db, 'users', storedUserId);
          const docData = await getDoc (docRef).then (doc => {
            if (doc.exists ()) {
              setIsAdmin (doc.data ().isAdmin);
              setUserId (storedUserId);
              setUser (doc.data ());
            } else {
              console.log ('User not found!');
            }
          });
        } else {
          console.log ('No user saved, login instead');
        }
      } catch (error) {
        console.log (error + ' (in SignIn.js)');
      } finally {
        setLoading (false);
      }
    };

    initialize ();
  }, []);

  const signIn = async () => {
    // input validation
    if (validator.isEmpty (phoneNumber)) {
      Alert.alert ('Thông báo', 'Thiếu thông tin tài khoản!');
      return;
    } else if (
      !validator.checkValidatorUserName (phoneNumber) ||
      validator.checkBlank (phoneNumber)
    ) {
      Alert.alert (
        'Thông báo',
        'Sai định dạng tài khoản, vui lòng kiểm tra lại!'
      );
      return;
    }

    if (validator.isEmpty (password)) {
      Alert.alert ('Thiếu thông tin đăng nhập', 'Vui lòng nhập mật khẩu!');
      return;
    } else {
      if (
        validator.checkBlank (password) ||
        !validator.checkValidatorPassword (password)
      ) {
        Alert.alert (
          'Thông báo',
          'Sai định dạng mật khẩu, vui lòng kiểm tra lại!'
        );
        return;
      }
    }
    // login logic
    setLoading (true);
    const qPhone = await query (
      collection (db, 'users'),
      where ('phoneNumber', '==', phoneNumber)
    );
    const queryPhone = await getDocs (qPhone);

    if (queryPhone.empty) {
      Alert.alert ('Thông tin không đúng', 'Tài khoản không tồn tại!');
      setLoading (false);
      return;
    }

    try {
      const qPassword = await query (
        collection (db, 'users'),
        where ('password', '==', password)
      );
      const queryPassword = await getDocs (qPassword);
      if (!queryPassword.empty) {
        const userId = await getDocs (
          query (
            collection (db, 'users'),
            where ('phoneNumber', '==', phoneNumber)
          )
        ).then (querySnapshot => querySnapshot.docs.map (doc => doc.id));
        // kiem tra is admin
        const arrayIsAdmin = await getDocs (
          query (
            collection (db, 'users'),
            where ('phoneNumber', '==', phoneNumber)
          )
        ).then (querySnapshot =>
          querySnapshot.docs.map (doc => doc.data ().isAdmin)
        );
        setIsAdmin (arrayIsAdmin[0]);
        setUserId (userId);
        const userData = await fetchUserData (userId);
        setUser (userData);
        const citizenId = userData.citizen_id;
        console.log(citizenId)
        if (citizenId !== undefined) {
          const citizenData = await fetchCitizensDatabyId (citizenId);
          setCitizen (citizenData);
        }
        if (isChecked) {
          _storeUserId (userId);
        }
      } else {
        Alert.alert ('Thông tin không đúng', 'Sai mật khẩu!');
      }
    } catch (error) {
      Alert.alert ('Có lỗi xảy ra', error.message);
    } finally {
      setLoading (false);
    }
  };

  const _storeUserId = async userId => {
    try {
      console.log ('User ID: ' + userId);
      await AsyncStorage.setItem ('userId', userId.toString ()).then (() => {
        console.log ('User ID stored!: ' + userId);
      });
    } catch (error) {
      Alert.alert ('Lỗi', 'Xảy ra lỗi khi lưu mật khẩu, vui lòng thử lại sau');
      console.log (error);
    }
  };

  const [onChangeUserName, setOnchangeUserName] = useState (0);
  const inputUserName = textValue => {
    setPhoneNumber (textValue);
    setOnchangeUserName (onChangeUserName + 1);
  };

  const [onChangeUserPassword, setOnChangeUserPassword] = useState (0);
  const inputUserPassword = textValue => {
    setPassword (textValue);
    setOnChangeUserPassword (onChangeUserPassword + 1);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <View style={{flex: 1, marginHorizontal: 22}}>
        <View style={{marginVertical: 22}}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: 'bold',
              marginVertical: 12,
              color: COLORS.black,
            }}
          >
            Chào mừng quay trở lại ! 👋
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
            Tài khoản
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
              placeholder="Nhập tên đăng nhập"
              placeholderTextColor={COLORS.black}
              style={{
                width: '100%',
              }}
              onChangeText={text => inputUserName (text.toLowerCase ())}
            />
          </View>
          {onChangeUserName == 0 ||
            (validator.isEmpty (phoneNumber) &&
              <Text style={{color: 'red'}}>
                Vui lòng nhập tên tài khoản
              </Text>) ||
            (validator.checkBlank (phoneNumber) &&
              <Text style={{color: 'red'}}>
                {validatorMessage.blank}
              </Text>) ||
            (!validator.checkValidatorUserName (phoneNumber) &&
              <Text style={{color: 'red'}}>{validatorMessage.userName}</Text>)}
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
              secureTextEntry={!isPasswordShown}
              style={{
                width: '100%',
              }}
              onChangeText={text => inputUserPassword (text)}
            />

            <TouchableOpacity
              onPress={() => setIsPasswordShown (!isPasswordShown)}
              style={{
                position: 'absolute',
                right: 12,
              }}
            >
              {isPasswordShown == false
                ? <Ionicons name="eye-off" size={24} color={COLORS.black} />
                : <Ionicons name="eye" size={24} color={COLORS.black} />}

            </TouchableOpacity>
          </View>
          {onChangeUserPassword === 0 ||
            (validator.isEmpty (password) &&
              <Text style={{color: 'red'}}>Vui lòng nhập mật khẩu</Text>) ||
            (validator.checkBlank (password) &&
              <Text style={{color: 'red'}}>{validatorMessage.blank}</Text>) ||
            (!validator.checkValidatorPassword (password) &&
              <Text style={{color: 'red'}}>{validatorMessage.password}</Text>)}
        </View>

        <View
          style={{
            flexDirection: 'row',
            marginVertical: 6,
            justifyContent: 'space-between',
            marginBottom: 20,
          }}
        >
          <View style={{flexDirection: 'row'}}>
            <Checkbox
              style={{marginRight: 8}}
              value={isChecked}
              onValueChange={setIsChecked}
              color={isChecked ? COLORS.primary : undefined}
            />

            <Text>Nhớ tài khoản</Text>
          </View>

          <Pressable onPress={() => navigation.navigate ('ForgotPassword')}>
            <Text style={{alignSelf: 'flex-end', color: COLORS.primary}}>
              Quên mật khẩu ?
            </Text>
          </Pressable>

        </View>

        <LoginButton
          title="Đăng nhập"
          filled
          onPress={signIn}
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
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginVertical: 22,
          }}
        >
          <Text style={{fontSize: 16, color: COLORS.black}}>
            Bạn chưa có tài khoản ?{' '}
          </Text>
          <Pressable onPress={() => navigation.navigate ('SignUp')}>
            <Text
              style={{
                fontSize: 16,
                color: COLORS.primary,
                fontWeight: 'bold',
                marginLeft: 6,
              }}
            >
              Đăng ký ngay
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;

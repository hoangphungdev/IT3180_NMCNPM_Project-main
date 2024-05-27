import { View, Text, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import COLORS from '../../../../contains/color';
import { fetchUserDatabyPhoneNumber } from '../../../../database/Dao/UserDao';

import ButtonNew from '../../../ButtonNew';

const ForgotPassword = ({ navigation }) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [mail, setMail] = useState('');
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');

  const togglePasswordVisiblity = async () => {
    try {
      const userData = await fetchUserDatabyPhoneNumber(userName.toLowerCase());

      if (userData && userData.length > 0) {
        const mailValue = userData[0].data.emailAuthen;
        const userIdValue = userData[0].id;
        navigation.navigate('OTPAuthentication', { mailValue, userIdValue });
      } else {
        Alert.alert('Thông báo','Tài khoản không tồn tại');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={{ flex: 1, marginHorizontal: 22 }}>
        <View style={{ marginBottom: 12 }}>
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
              keyboardType="email-address"
              style={{
                width: '100%',
              }}
              onChangeText={text => setUserName(text)}
            />
          </View>
        </View>

        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <ButtonNew
            title="Tiếp tục"
            filled
            navigation={navigation}
            nextScreen={false}
            onPress={togglePasswordVisiblity}
            mail={mail}
            userName={userName}
          />
        </View>

      </View>
    </SafeAreaView>
  );
};

export default ForgotPassword;

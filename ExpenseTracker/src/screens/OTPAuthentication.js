import {
  View,
  Text,
  Pressable,
  TextInput,
  TouchableOpacity,
  Alert,
  Button,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import COLORS from '../../contains/color';
import {Ionicons} from '@expo/vector-icons';
import ButtonNew from '../../components/ButtonNew';
import axios from 'axios';
import {LogBox} from 'react-native';
import {updateUserPassword} from '../../database/Dao/UserDao';

const OTPAuthentication = props => {
  const navigation = props.navigation;
  const mail = props.route.params.mailValue;
  const userName = props.route.params.userName;
  const userId = props.route.params.userIdValue;
  const [isPasswordShown, setIsPasswordShown] = useState (false);
  const [countdown, setCountdown] = useState (0);
  const [password, setPassword] = useState ('');
  const [confirmPassword, setConfirmPassword] = useState ('');
  const [maskEmail, setMaskEmail] = useState ('');

  const min = 100000;
  const max = 999999;
  const [code, setCode] = useState (Math.floor (Math.random () * (max - min + 1)) + min);
  const [userCode, setUserCode] = useState ('');

  const api_key = '77d7d625b3268d7906d7c39bb16f0160';
  const api_secret = '65a2a6f9170d73cc00dee0086fc8aa38';
  const endpoint = 'https://api.mailjet.com/v3.1/send';

  LogBox.ignoreLogs ([
    'Non-serializable values were found in the navigation state',
  ]);

  const sendVerification = () => {
    const data = {
      Messages: [
        {
          From: {
            Email: 'hieu.lm215368@sis.hust.edu.vn',
            Name: 'Le Minh Hieu',
          },
          To: [
            {
              Email: mail,
              Name: 'User', 
            },
          ],
          Subject: 'Reset password Confirmation',
          TextPart: 'Vui lòng không chia sẻ mã này với bất kỳ ai.',
          HTMLPart: '<h3>Điền mã để thay đổi mật khẩu: <strong>' +
            code +
            '</strong></h3> \
            <br /> <h3>Nếu bạn không yêu cầu thay đổi mật khẩu, hãy bỏ qua mail này.</h3>\
            <br /> <h3>Vui lòng không phản hồi lại.</h3>\
            ',
          CustomID: 'AppGettingStartedTest',
        },
      ],
    };
    const sendEmail = async () => {
      try {
        const response = await axios.post (endpoint, data, {
          auth: {
            username: api_key,
            password: api_secret,
          },
          headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*"
          },
        });
        console.log ('send mail status: ', response.status);
        console.log ('mail data: ', response.data);
      } catch (error) {
        console.error ('mail error: ', error);
      }
    };
    sendEmail ();
  };

  const confirmCode = () => {
    if (userCode == code) {
      changePassword ();
    } else {
      Alert.alert ('Sai mã OTP', 'Vui lòng nhập lại');
    }
  };

  const genNewCode = () => {
    if (countdown <= 0) {
      setCode (generateSixDigitCode ().toString ());
    } else {
      Alert.alert ('Thông báo', 'Vui lòng chờ hết thời gian để lấy mã mới');
    }
  };
  const generateSixDigitCode = () => {
    const min = 100000;
    const max = 999999;
    return Math.floor (Math.random () * (max - min + 1)) + min;
  };

  useEffect (() => {
    //genNewCode ();
    sendVerification ();
    // console.log ('mail: ', mail, 'code: ', userId);
    setInterval (() => {
      setCountdown (prevCountdown => prevCountdown - 1);
    }, 1000);
  }, []);


  useEffect (
    () => {
      setCountdown (120);
      console.log ('code: ', code);
      maskEmailOTP (mail);
    },
    [code]
  );

  const changePassword = () => {
    if (password == confirmPassword) {
      saveChange ();
      Alert.alert ('Thông báo', 'Đổi mật khẩu thành công');
      navigation.navigate ('SignIn');
    } else {
      Alert.alert ('Mật khẩu không khớp', 'Vui lòng nhập lại');
    }
  };

  const saveChange = () => {
    updateUserPassword (userId, password);
  };

  const maskEmailOTP = input => {
    const length = input.length;
    if (length <= 6) {
      // Hiển thị toàn bộ chuỗi nếu chiều dài là 2 hoặc ít hơn
      return setMaskEmail ('*****');
    } else {
      // Hiển thị 2 ký tự đầu và ký tự cuối, các ký tự còn lại chuyển thành 5 dấu '*'
      const masked =
        input.substring (0, 6) +
        '*'.repeat (length / 3) +
        input.substring (length - 7);

      return setMaskEmail (masked);
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <View style={{flex: 1, marginHorizontal: 22}}>
        <View style={{marginBottom: 12}}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 400,
              marginVertical: 8,
            }}
          >
            Mã OTP xác thực đã được gửi về:
            {<Text style={{color: 'red'}}>{`\n${maskEmail}`}</Text>}
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
              placeholder="Nhập mã OTP"
              placeholderTextColor={COLORS.black}
              keyboardType="email-address"
              style={{
                width: '100%',
              }}
              onChangeText={text => setUserCode (text)}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginVertical: 8,
            }}
          >

            {countdown <= 0
              ? <Text
                  style={{
                    alignSelf: 'flex-end',
                    paddingTop: 10,
                    color: COLORS.primary,
                  }}
                >
                  Mã đã hết hạn
                </Text>
              : <Text
                  style={{
                    alignSelf: 'flex-end',
                    paddingTop: 10,
                    color: COLORS.primary,
                  }}
                >
                  Mã hết hạn trong {countdown} giây
                </Text>}
            <Text
              style={{
                alignSelf: 'flex-end',
                paddingTop: 10,
                color: COLORS.primary,
              }}
              onPress={() => {
                genNewCode ();
              }}
            >
              Gửi lại OTP {<Ionicons name="reload" size={15} />}
            </Text>
          </View>

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
              multiline={true}
              placeholder="Nhập mật khẩu"
              placeholderTextColor={COLORS.black}
              secureTextEntry={isPasswordShown}
              style={{
                width: '100%',
              }}
              onChangeText={text => setPassword (text)}
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
        </View>
        <View style={{marginBottom: 12}}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 400,
              marginVertical: 8,
            }}
          >
            Xác nhận mật khẩu
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
              placeholder="Nhập lại mật khẩu"
              placeholderTextColor={COLORS.black}
              secureTextEntry={isPasswordShown}
              style={{
                width: '100%',
              }}
              onChangeText={text => setConfirmPassword (text)}
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
        </View>

        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <ButtonNew
            title="Xác nhận"
            nextScreen={false}
            onPress={confirmCode}
          />
        </View>

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
            marginVertical: 22,
          }}
        >
          <Text style={{fontSize: 16, color: COLORS.black}}>
            Bạn đã có tài khoản ?{' '}
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
              Đăng nhập ngay
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OTPAuthentication;

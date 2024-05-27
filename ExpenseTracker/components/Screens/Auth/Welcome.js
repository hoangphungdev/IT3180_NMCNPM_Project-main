import { View, Text, Pressable, Image, Dimensions, Alert, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import COLORS from '../../../contains/color';
import LoginButton from '../../Common/LoginButton';

import AsyncStorage from '@react-native-async-storage/async-storage';

const screenHeight = Dimensions.get('window').height; // 812

const Welcome = ({ navigation }) => {
  // check if firs launch
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  useEffect(() => {
    AsyncStorage.getItem('isFirstLaunch')
      .then(value => {
        if (value === null) {
          setIsFirstLaunch(true);
          AsyncStorage.setItem('isFirstLaunch', 'false');
        } else {
          setIsFirstLaunch(false);
        }
      })
      .catch(error => console.log(error));
  }, []);
  useEffect(() => {
    if (isFirstLaunch === false) {
      navigation.navigate('SignIn');
    }
  }, [isFirstLaunch, navigation]);

  if (isFirstLaunch === null) {
    return (
      <View>
        <ActivityIndicator />
        <ActivityIndicator size="large" />
      </View>
    );
  }
  if (!isFirstLaunch) {
    return null;
  }


  return (
    <LinearGradient
      style={{
        flex: 1,
      }}
      colors={[COLORS.secondary, COLORS.primary]}
    >
      <View style={{ flex: 1, paddingTop: screenHeight * 0.03 }}>
        <View>
          <Image
            source={require('../../../assets/hero1.jpg')}
            style={{
              height: 100,
              width: 100,
              borderRadius: 20,
              position: 'absolute',
              top: 10,
              transform: [
                { translateX: 20 },
                { translateY: 50 },
                { rotate: '-15deg' },
              ],
            }}
          />

          <Image
            source={require('../../../assets/hero3.jpg')}
            style={{
              height: 100,
              width: 100,
              borderRadius: 20,
              position: 'absolute',
              top: -30,
              left: 100,
              transform: [
                { translateX: 50 },
                { translateY: 50 },
                { rotate: '-5deg' },
              ],
            }}
          />

          <Image
            source={require('../../../assets/hero3.jpg')}
            style={{
              width: 100,
              height: 100,
              borderRadius: 20,
              position: 'absolute',
              top: 130,
              left: -50,
              transform: [
                { translateX: 50 },
                { translateY: 50 },
                { rotate: '15deg' },
              ],
            }}
          />

          <Image
            source={require('../../../assets/hero2.jpg')}
            style={{
              height: 200,
              width: 200,
              borderRadius: 20,
              position: 'absolute',
              top: 110,
              left: 100,
              transform: [
                { translateX: 50 },
                { translateY: 50 },
                { rotate: '-15deg' },
              ],
            }}
          />
        </View>

        {/* content  */}

        <View
          style={{
            paddingHorizontal: 22,
            position: 'absolute',
            top: 400,
            width: '100%',
          }}
        >
          <Text
            style={{
              fontSize: 50,
              fontWeight: 800,
              color: COLORS.white,
            }}
          >
            Xin chào mừng
          </Text>

          <View style={{ marginVertical: 22 }}>
            <Text
              style={{
                fontSize: 16,
                color: COLORS.white,
                marginVertical: 4,
              }}
            >
              Theo dõi khoản phí, đóng góp của gia đình
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: COLORS.white,
              }}
            >
              Kiểm tra thông tin bản thân
            </Text>
          </View>

          <LoginButton
            title="Đăng ký"
            onPress={() => navigation.navigate('SignUp')}
            style={{
              marginTop: 22,
              width: '100%',
            }}
          />

          <View
            style={{
              flexDirection: 'row',
              marginTop: 12,
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: COLORS.white,
              }}
            >
              Bạn đã có tài khoản ?
            </Text>
            <Pressable onPress={() => navigation.navigate('SignIn')}>
              <Text
                style={{
                  fontSize: 16,
                  color: COLORS.white,
                  fontWeight: 'bold',
                  marginLeft: 4,
                }}
              >
                Đăng nhập
              </Text>
            </Pressable>

          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

export default Welcome;

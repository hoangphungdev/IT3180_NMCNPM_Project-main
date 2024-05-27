import {View, ScrollView, SafeAreaView, StyleSheet} from 'react-native';
import React, {useEffect, useContext} from 'react';
import AppBar from '../../../components/Common/AppBar';
import styleApp from '../../../components/styleApp';
import {MaterialIcons} from '@expo/vector-icons';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {Fontisto} from '@expo/vector-icons';
import FunctionUIClass from '../../../components/Screens/Home/FunctionUIClass';
import {UIContext} from '../../../UIContext';
import {Feather} from '@expo/vector-icons';

const HomeAdmin = ({navigation}) => {
  const {userId, setCurrentScreen, currentScreen} = useContext (UIContext);
  return (
    <SafeAreaView>
      <View>
        <AppBar title="Trang quản trị hệ thống" />

        <ScrollView style={styleApp.bodyHomeAdmin}>
          <FunctionUIClass
            icon={
              <MaterialIcons
                name="family-restroom"
                size={50}
                color="black"
                style={styles.icon}
              />
            }
            topic="Hộ gia đình"
            detail="Danh sách các hộ gia đình"
            nextScreen="FamilyRestroom"
            navigation={navigation}
          />

          <FunctionUIClass
            icon={
              <MaterialCommunityIcons
                name="pig-variant"
                size={50}
                color="black"
                style={styles.icon}
              />
            }
            topic="Quỹ đóng góp"
            detail="Các cuộc vận động đóng góp"
            nextScreen="Donation"
            navigation={navigation}
          />

          <FunctionUIClass
            icon={
              <Fontisto
                name="wallet"
                size={45}
                color="black"
                style={styles.icon}
              />
            }
            topic="Phí dịch vụ"
            detail="Các khoản phí bắt buộc"
            nextScreen="Expense"
            navigation={navigation}
          />

          <FunctionUIClass
            icon={
              <MaterialIcons
                name="switch-account"
                size={50}
                color="black"
                style={styles.icon}
              />
            }
            topic="Quản lý dân cư"
            detail="Quản lý thông tin dân cư"
            nextScreen="ManageCitizens"
            navigation={navigation}
          />

          <FunctionUIClass
            icon={
              <Feather name="link" size={50} color="black" style={styles.icon}/>
            }
            topic="Xác thực tài khoản"
            detail="Liên kết tài khoản với thông tin cư dân"
            nextScreen="LinkAccount"
            navigation={navigation}
          />

        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default HomeAdmin;

const styles = StyleSheet.create ({
  icon: {
    paddingRight: 30,
  },
});

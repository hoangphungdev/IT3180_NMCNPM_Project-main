import {View, ScrollView, SafeAreaView, StyleSheet} from 'react-native';
import React, {useEffect, useContext} from 'react';
import AppBar from '../../../components/Common/AppBar';
import styleApp from '../../../components/styleApp';
import {MaterialIcons} from '@expo/vector-icons';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {Fontisto} from '@expo/vector-icons';
import FunctionUIClass from '../../../components/Screens/Home/FunctionUIClass';
import {UIContext} from '../../../UIContext';

const HomeUser = ({navigation}) => {
  const {userId, setCurrentScreen, currentScreen, citizen} = useContext (
    UIContext
  );

  useEffect (() => {
    setCurrentScreen ('HomeUser');
  }, []);

  return (
    <SafeAreaView>
      <View>
        <AppBar
          title="Trang quản trị người dùng"
          justifyContent="space-between"
        />

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
            detail="Thông tin của hộ gia đình"
            nextScreen="FamilyInformation"
            navigation={navigation}
            citizen={citizen === null ? false : true}
            inforHousehold={citizen === null ? null : citizen}
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
            citizen={citizen === null ? false : true}
          />

          <FunctionUIClass
            icon={
              <Fontisto
                name="wallet"
                size={50}
                color="black"
                style={styles.icon}
              />
            }
            topic="Thông tin cá nhân"
            detail="Thông tin của bản thân"
            nextScreen="InfoCitizen"
            navigation={navigation}
            citizen={citizen === null ? false : true}
          />

        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default HomeUser;

const styles = StyleSheet.create ({
  icon: {
    paddingRight: 30,
  },
});

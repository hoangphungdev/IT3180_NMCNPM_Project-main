import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import React from 'react';

import COLORS from '../contains/color';
import BoxSideBar from './Screens/AccountInfo/BoxSideBar';
import {MaterialCommunityIcons} from '@expo/vector-icons';

const screenHeight = Dimensions.get ('window').height;
const screenWidth = Dimensions.get ('window').width;

const SideBar = props => {
  const setModalVisible = () => {
    props.setModalVisible (!props.modalVisible);
  };

  return (
    <View style={{flexDirection: 'row', height: screenHeight}}>
      <TouchableOpacity onPress={setModalVisible} style={styles.notSideBar} />
      <View style={styles.sideBar}>
        <Image source={require ('./../assets/logo.png')} style={styles.logo} />

        <View style={styles.scrollView}>
          <BoxSideBar title="Thay đổi thông tin đăng nhập" />
          <BoxSideBar title="Cập nhật thông tin" />
        </View>

        <TouchableOpacity style={styles.logOut}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>Đăng xuất </Text>
          <MaterialCommunityIcons name="logout" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SideBar;

const styles = StyleSheet.create ({
  notSideBar: {
    width: screenWidth * 0.2,
  },
  sideBar: {
    width: screenWidth * 0.8,
    backgroundColor: COLORS.sideBar,
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
  },
  logo: {
    marginVertical: 100,
  },
  logOut: {
    marginTop: 100,
    flexDirection: 'row',
  },
  scrollView: {
    borderTopColor: COLORS.white,
    borderBottomColor: COLORS.white,
    borderBottomWidth: 1,
    borderTopWidth: 1,
  },
});

import {View, StyleSheet} from 'react-native';
import React from 'react';
import COLORS from '../../../contains/color';
import BoxTabBarFamily from './BoxTabBarFamily';

const TabBarFamily = props => {
  return (
    <View style={styles.tabBar}>
      <BoxTabBarFamily
        title="Thông tin"
        status={props.status}
        navigation={props.navigation}
      />

      <BoxTabBarFamily
        title="Đã nộp"
        status={props.status}
        navigation={props.navigation}
      />

      <BoxTabBarFamily
        title="Chưa nộp"
        status={props.status}
        navigation={props.navigation}
      />
    </View>
  );
};

export default TabBarFamily;

const styles = StyleSheet.create ({
  tabBar: {
    height: 50,
    backgroundColor: COLORS.tabBar,
    flexDirection: 'row',
  },
});

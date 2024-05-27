import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import COLORS from '../../../contains/color';

const BoxTabBarFamily = props => {
  var backgroundColorTrue = COLORS.tabBar;
  var fontWeightTrue = null;
  var navigation = props.navigation
  var nextScreen = null

  if (props.title === "Thông tin") {
    nextScreen = "InformationFamily";
  } else if (props.title === "Đã nộp") {
    nextScreen = "SubmittedFamily";
  } else {
    nextScreen = "NotSubmittedFamily";
  }

  if (props.status === props.title) {
    backgroundColorTrue = COLORS.boxTabBarTrue;
    fontWeightTrue = 'bold';
  }

  return (
    <TouchableOpacity
      style={[styles.boxTabBar, {backgroundColor: backgroundColorTrue}]}
      onPress={() => navigation.navigate(nextScreen)}
    >
      <Text style={[styles.title, {fontWeight: fontWeightTrue}]}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

export default BoxTabBarFamily;

const styles = StyleSheet.create ({
  boxTabBar: {
    borderWidth: 1,
    borderColor: COLORS.border,
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 15,
  },
});

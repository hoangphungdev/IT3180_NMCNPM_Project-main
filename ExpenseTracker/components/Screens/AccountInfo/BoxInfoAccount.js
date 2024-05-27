import {View, Text, StyleSheet, Dimensions} from 'react-native';
import React, {useState} from 'react';

import COLORS from '../../../contains/color';

const screenHeight = Dimensions.get ('window').height;
const screenWidth = Dimensions.get ('window').width;

const BoxInfoAccount = props => {
  return (
    <View style={styles.content}>
      <View>
        <Text style={styles.title}>{props.title}:</Text>
      </View>

      <View style={styles.viewValue}>
        <Text style={styles.value}>{props.value}</Text>
      </View>
    </View>
  );
};

export default BoxInfoAccount;

const styles = StyleSheet.create ({
  content: {
    borderBottomColor: COLORS.border,
    borderBottomWidth: 1,
    flexDirection: 'row',
    height: screenHeight * 0.0625,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    // width: screenWidth * 0.4,
    paddingLeft: screenWidth * 0.05,
  },
  value: {
    fontSize: 16,
    textAlign: 'right',
    paddingRight: screenWidth * 0.05,
  },
  viewValue: {
    // width: screenWidth * 0.6,
  },
});

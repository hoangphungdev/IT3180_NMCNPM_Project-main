import {View, Text, StyleSheet, Dimensions} from 'react-native';
import React from 'react';
import COLORS from '../../../contains/color';

const screenWidth = Dimensions.get ('window').width;
const screenHeight = Dimensions.get ('window').height;

const BoxListDonations = props => {
  const itembg = props.index % 2 == 0 ? COLORS.colorEven : COLORS.colorOdd;

  return (
    <View style={[styles.group, {backgroundColor: itembg}]}>
      <View style={styles.info}>
        <View style={{left: 20}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.title}>Chủ hộ: </Text>
            <Text style={styles.textInfo}>{props.leaderHouse}</Text>
          </View>

          <View style={{flexDirection: 'row'}}>
            <Text style={styles.title}>Số điện thoại: </Text>
            <Text style={styles.textInfo}>{props.phone}</Text>
          </View>
        </View>
      </View>

      <View style={{width: 1, backgroundColor: COLORS.white}} />

    <View style={styles.total}>
        <Text style={styles.textInfo}>{props.total}</Text>
    </View>
    </View>
  );
};

export default BoxListDonations;

const styles = StyleSheet.create ({
  title: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  textInfo: {
    fontSize: 15,
  },
  group: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: COLORS.white,
  },
  total: {
    justifyContent: 'center',
    alignItems: 'center',
    width: screenWidth * 0.35,
  },
  info: {
    flexDirection: 'column',
    marginVertical: 8,
    width: screenWidth * 0.65,
  },
});

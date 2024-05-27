import {View, Text, Dimensions, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import COLORS from '../../../contains/color';
import Checkbox from 'expo-checkbox';
import {fetchDataHouseHold} from '../../../database/Dao/HouseholdDao';
import { formatMoney } from '../../../utils/moneyFormatter';

const screenWidth = Dimensions.get ('window').width;
const screenHeight = Dimensions.get ('window').height;

const BoxCleaningExpense = props => {
  const [isChecked, setIsChecked] = useState (false);
  const [householdData, setHouseholdData] = useState (null);

  const data = props.data;

  const itembg = props.index % 2 == 0 ? COLORS.colorEven : COLORS.colorOdd;

  return (
    <View style={[styles.group, {backgroundColor: itembg}]}>
      <View style={styles.info}>
        <View style={{left: 20}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.title}>Chủ hộ: </Text>
            <Text style={styles.textInfo}>{data.headOfHousehold.name}</Text>
          </View>

          <View style={{flexDirection: 'row'}}>
            <Text style={styles.title}>Số điện thoại: </Text>
            <Text style={styles.textInfo}>{data.headOfHousehold.phone}</Text>
          </View>
        </View>
      </View>
      <View style={{width: 1, backgroundColor: COLORS.white}} />

      <View style={styles.total}>
        <Text style={styles.textInfo}>{formatMoney(data.amount)}</Text>
      </View>
    </View>
  );
};

export default BoxCleaningExpense;

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

import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import COLORS from '../../../contains/color';

const BoxNotSubmitted = props => {
  const data = props.data;
  
  return (
    <TouchableOpacity style={styles.boxView} disabled={props.disabled}>
      <View style={{flexDirection: 'row', marginVertical: 2}}>
        <Text style={styles.topic}>Tên phí: </Text>
        <Text style={styles.infoTopic}>{data.category}</Text>
      </View>

      <View style={{flexDirection: 'row', marginVertical: 2}}>
        <Text style={styles.topic}>Ngày hết hạn: </Text>
        <Text style={styles.infoTopic}>{data.payment_due_date}</Text>
      </View>

      <View style={{flexDirection: 'row', marginVertical: 2}}>
        <Text style={styles.topic}>Mô tả: </Text>
        <Text style={styles.infoTopic}>{data.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default BoxNotSubmitted;

const styles = StyleSheet.create ({
  boxView: {
    borderBottomWidth: 2,
    borderColor: COLORS.border,
    marginHorizontal: 15,
    paddingVertical: 10,
  },
  topic: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  infoTopic: {
    fontSize: 15,
    width: '80%',
  },
});

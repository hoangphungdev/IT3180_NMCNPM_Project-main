import {View, Text, TextInput, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import styleModal from './styleModal';

const SetTime = props => {
  var locationSetTime = 0;
  var [dayOld, monthOld, yearOld] = ['', '', ''];

  if (props.update == true) {
    const timeOld = props.timeOld;
    [dayOld, monthOld, yearOld] = timeOld.split ('/');
  }

  const [day, setDay] = useState (dayOld);
  const [month, setMonth] = useState (monthOld);
  const [year, setYear] = useState (yearOld);
  
  useEffect (
    () => {
      props.setTime (day + '/' + month + '/' + year);
      if (props.left === true) {
        locationSetTime = 50;
      }
    },
    [day, month, year]
  );

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          left: locationSetTime,
        }}
      >
        <Text style={styles.text}>{props.type} </Text>
        <TextInput
          multiline={true}
          placeholder="DD"
          style={styleModal.textInputTime}
          keyboardType="number-pad"
          onChangeText={text => setDay (text)}
          defaultValue={dayOld}
        />

        <Text style={styles.text}>/</Text>
        <TextInput
          multiline={true}
          placeholder="MM"
          style={styleModal.textInputTime}
          keyboardType="number-pad"
          onChangeText={text => setMonth (text)}
          defaultValue={monthOld}
        />

        <Text style={styles.text}>/</Text>
        <TextInput
          multiline={true}
          placeholder="YYYY"
          style={styleModal.textInputTime}
          keyboardType="number-pad"
          onChangeText={text => setYear (text)}
          defaultValue={yearOld}
        />
      </View>
    </View>
  );
};

export default SetTime;

const styles = StyleSheet.create ({
  text: {
    fontSize: 16,
  },
});

import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import SetTime from './SetTime';

const TimeModal = ({
  title,
  setTimeLeft,
  setTimeStart,
  setTimeEnd,
  timeEndOld,
  timeStartOld,
  update,
}) => {
  return (
    <View>
      <Text style={[styles.text, {marginTop: 20}]}>
        {title} {<Text style={{color: 'red'}}>*</Text>}
      </Text>
      
      <SetTime
        type="Bắt đầu: "
        left={setTimeLeft}
        setTime={setTimeStart}
        timeOld={timeStartOld}
        update={update}
      />

      <SetTime
        type="Kết thúc:"
        left={setTimeLeft}
        setTime={setTimeEnd}
        timeOld={timeEndOld}
        update={update}
      />
    </View>
  );
};

export default TimeModal;

const styles = StyleSheet.create ({
  text: {
    fontSize: 16,
  },
});

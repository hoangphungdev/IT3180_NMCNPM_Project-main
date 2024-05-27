import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React from 'react';
import styleApp from '../../styleApp';

const screenWidth = Dimensions.get ('window').width;

const BoxViewSubmitted = props => {
  return (
    <TouchableOpacity style={styleApp.box} disabled={props.disabled} onPress={props.onPress}>
      <View style={{width: screenWidth * 0.7}}>
        <View style={styles.title}>
          <Text style={styles.textTitle}>{props.title}</Text>
        </View>

        <View style={styles.viewTopic}>
          <Text style={styles.topic}>Thời gian nộp: </Text>
          <Text style={styles.infoTopic}>{props.time}</Text>
        </View>

        <View style={styles.viewTopic}>
          <Text style={styles.topic}>Số tiền đã nộp: </Text>
          <Text style={styles.infoTopic}>{props.total}</Text>
        </View>
      </View>

    </TouchableOpacity>
  );
};

export default BoxViewSubmitted;

const styles = StyleSheet.create ({
  title: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  textTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  viewTopic: {
    flexDirection: 'row',
    paddingVertical: 5,
  },
  topic: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  infoTopic: {
    fontSize: 15,
  },
});

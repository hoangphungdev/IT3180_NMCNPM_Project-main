import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

const BoxInfoEachFamilyMember = props => {
  return (
    <View style={styles.viewTopic}>
      <Text style={styles.topic}>{props.topic}: </Text>
      <Text style={styles.info}>{props.info}</Text>
    </View>
  );
};

export default BoxInfoEachFamilyMember;

const styles = StyleSheet.create ({
  topic: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  info: {
    fontSize: 15,
    paddingRight: 100,
  },
  viewTopic: {
    flexDirection: 'row',
    marginBottom: 5,
  },
});

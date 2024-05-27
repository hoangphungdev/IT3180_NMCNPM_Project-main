import {View, Text, Dimensions} from 'react-native';
import React from 'react';

import COLORS from '../../../contains/color';
import {TextInput} from 'react-native-gesture-handler';

const BoxUpdateInfoAccount = props => {
  return (
    <View style={{marginBottom: 12, paddingHorizontal: 20}}>
      <Text
        style={{
          fontSize: 16,
          fontWeight: 400,
          marginVertical: 8,
        }}
      >
        {props.title}
      </Text>

      <View
        style={{
          width: '100%',
          height: 48,
          borderColor: COLORS.black,
          borderWidth: 1,
          borderRadius: 15,
          borderColor: COLORS.border,
          alignItems: 'center',
          justifyContent: 'center',
          paddingLeft: 22,
          backgroundColor: COLORS.buttonUpdate
        }}
      >
        <TextInput
          multiline={true}
          placeholder={props.title}
          placeholderTextColor={COLORS.black}
          keyboardType={props.keyboardType}
          style={{
            width: '100%',
          }}
        />
      </View>
    </View>
  );
};

export default BoxUpdateInfoAccount;
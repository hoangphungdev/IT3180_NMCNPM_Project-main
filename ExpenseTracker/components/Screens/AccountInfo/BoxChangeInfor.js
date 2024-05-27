import {View, Text, TextInput, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import COLORS from '../../../contains/color';
import * as validator from '../../../contains/validator';
import validatorMessage from '../../../contains/validatorMessage';

const BoxChangeInfor = props => {
  const [inputValue, setInputValue] = useState ('');
  const [onChangeText, setOnChangeText] = useState (0); // 0: chưa thay đổi, 1: đã thay đổi

  const handleInputChange = infor => {
    setInputValue (infor);
    props.onChangeText (infor);
    setOnChangeText (1);
  };

  return (
    <View>
      <Text style={styles.textTopic}>
        {props.topic}
        {props.obligatory === true
          ? <Text style={{color: 'red'}}> *</Text>
          : null}
      </Text>
      <View style={styles.viewInput}>
        <TextInput
          multiline={true}
          placeholder={props.placeholder}
          editable={props.change}
          onChangeText={infor => handleInputChange (infor)}
          keyboardType={props.keyboardType}
          defaultValue={props.inforTopic}
        />
      </View>

      {props.change === false ||
        onChangeText === 0 ||
        (props.obligatory &&
          validator.isEmpty (inputValue) &&
          <Text style={{color: 'red', paddingLeft: 20}}>
            {`Vui lòng nhập ${props.topic.toLowerCase ()}`}
          </Text>) ||
        (validator.isEmpty(inputValue) || validator.checkBlank (inputValue) &&
          <Text style={{color: 'red', paddingLeft: 20}}>
            {validatorMessage.blank}
          </Text>) ||
        (props.category === 'Email' &&
          !validator.checkValidatorEmail (inputValue) &&
          <Text style={{color: 'red', paddingLeft: 20}}>
            {validatorMessage.email}
          </Text>) ||
        (props.category === 'Phone' &&
          !validator.checkValidatorPhone (inputValue) &&
          <Text style={{color: 'red', paddingLeft: 20}}>
            {validatorMessage.phone}
          </Text>) ||
        (props.category === 'userName' &&
          !validator.checkValidatorUserName (inputValue) &&
          <Text style={{color: 'red', paddingLeft: 20}}>
            {validatorMessage.userName}
          </Text>) ||
        (props.category === 'password' &&
          !validator.checkValidatorPassword (inputValue) &&
          <Text style={{color: 'red', paddingLeft: 20}}>
            {validatorMessage.password}
          </Text>) ||
        (props.category === 'Birth' &&
          !validator.checkValidatorTime (inputValue) &&
          <Text style={{color: 'red', paddingLeft: 20}}>
            {validatorMessage.time}
          </Text>) ||
        (props.category === 'ID_card_number' &&
          !validator.checkValidatorCCCD (inputValue) &&
          <Text style={{color: 'red', paddingLeft: 20}}>
            {validatorMessage.ID_card_number}
          </Text>) ||
        (props.category === 'Gender' &&
          !validator.checkValidatorGender (inputValue) &&
          <Text style={{color: 'red', paddingLeft: 20}}>
            {validatorMessage.gender}
          </Text>)}

    </View>
  );
};

export default BoxChangeInfor;

const styles = StyleSheet.create ({
  viewInput: {
    borderWidth: 1,
    borderRadius: 15,
    borderColor: COLORS.border,
    backgroundColor: COLORS.boxInput,
    height: 45,
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginHorizontal: 20,
    marginTop: 10,
  },
  textTopic: {
    fontSize: 16,
    paddingLeft: 20,
    paddingTop: 20,
  },
});

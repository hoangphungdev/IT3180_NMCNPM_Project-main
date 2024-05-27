import {View, Text, TextInput, StyleSheet, Dimensions} from 'react-native';
import React from 'react';
import styleApp from '../styleApp';
import {EvilIcons} from '@expo/vector-icons';
import COLORS from '../../contains/color';

const screenHeight = Dimensions.get ('window').height;
const screenWidth = Dimensions.get ('window').width;

const Search = props => {
  return (
    <View style={styles.search}>
      <EvilIcons
        name="search"
        size={20}
        color="black"
        style={styles.iconSearch}
      />
      <TextInput
      multiline={true}
        placeholder={props.placeholder}
        placeholderTextColor={COLORS.black}
        keyboardType="ascii-capable"
        onChangeText={props.onChangeText}
        style={styles.inputSearch}
      />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create ({
  inputSearch: {
    width: '90%',
    fontSize: 15,
  },
  iconSearch: {
    bottom: 2,
    marginRight: 10,
  },
  search: {
    flexDirection: 'row',
    backgroundColor: COLORS.search,
    marginHorizontal: screenWidth * 0.055,
    marginVertical: screenHeight * 0.035,
    borderRadius: 20,
    borderColor: COLORS.border,
    borderWidth: 1,
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
});

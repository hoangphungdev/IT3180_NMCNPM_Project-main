import {StyleSheet, Dimensions} from 'react-native';

import COLORS from '../contains/color';

const screenHeight = Dimensions.get ('window').height;
const screenWidth = Dimensions.get ('window').width;

const styleApp = StyleSheet.create ({
  box: {
    backgroundColor: COLORS.box,
    marginHorizontal: screenWidth * 0.07,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 15,
  },
  bodyHomeAdmin: {
    marginVertical: screenHeight * 0.075,
  },
});

export default styleApp;

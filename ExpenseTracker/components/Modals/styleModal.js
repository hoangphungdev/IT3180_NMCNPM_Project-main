import {StyleSheet, Dimensions} from 'react-native';
import COLORS from '../../contains/color';

const screenWidth = Dimensions.get ('window').width;
const screenHeight = Dimensions.get ('window').height;

const styleModal = StyleSheet.create ({
  formInput: {
    borderRadius: 15,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
    height: 40,
    paddingLeft: 20,
    justifyContent: 'center',
    width: screenWidth * 0.75
  },
  textInput: {
    fontSize: 15,
  },
  textTitle: {
    fontSize: 16,
    marginTop: 30,
    marginBottom: 5
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20
  },
  buttonModal: {
    width: screenWidth * 0.5,
    borderColor: COLORS.border,
    borderWidth: 1,
    borderRadius: 45,
    height: 45,
    backgroundColor: COLORS.buttonModal,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 40,
    textButton: {
      fontSize: 16,
      color: COLORS.white
    },
  },
  textInputTime: {
    width: 50,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
    marginHorizontal: 3,
    marginVertical: 10,
    paddingLeft: 5
  }
});

export default styleModal;

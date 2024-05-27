import { Text, StyleSheet, Dimensions, Alert } from "react-native";
import React, { useContext } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import COLORS from "../contains/color";
import { UIContext } from "../UIContext";

const screenWidth = Dimensions.get("window").width;

const ButtonNew = (props) => {
  const { isAdmin } = useContext(UIContext);
  const navigation = props.navigation;
  var onPress = null;

  if (props.nextScreen === false) {
    onPress = props.onPress;
  } else if (props.nextScreen == "OTPAuthentication") {
    onPress = () =>
      navigation.navigate(props.nextScreen, {
        mail: props.mail,
        navigation: navigation,
      });
  } else {
    if (
      props.nextScreen == "FamilyInformation" &&
      props.citizen.household_id == "" && isAdmin === false
    ) {
      onPress = () =>
        Alert.alert(
          "Thông báo",
          "Bạn chưa có thông tin hộ gia đình, vui lòng tới cơ quan chức năng để được cấp thông tin hộ gia đình"
        );
    } else {
      onPress = () =>
        navigation.navigate(props.nextScreen, {
          userName: props.userName,
          password: props.password,
          citizen: props.citizen,
        });
    }
  }

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.title}>{props.title}</Text>
    </TouchableOpacity>
  );
};

export default ButtonNew;

const styles = StyleSheet.create({
  button: {
    height: 45,
    width: 150,
    backgroundColor: COLORS.buttonNew,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    borderColor: COLORS.borderButtonNew,
    borderWidth: 1,
    marginVertical: 40,
  },
  title: {
    fontSize: 16,
    color: COLORS.white,
    textAlign: "center",
  },
});

import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import React, { useContext } from "react";
import styleApp from "../../styleApp";
import { UIContext } from "../../../UIContext";

const FunctionUIClass = (props) => {
  const { isAdmin } = useContext(UIContext);
  navigation = props.navigation;

  const onPress = () => {
    if (
      props.inforHousehold !== null &&
      props.nextScreen === "FamilyInformation" &&
      props.inforHousehold.household_id === ""
    ) {
      Alert.alert(
        "Thông báo",
        "Bạn chưa có thông tin hộ gia đình, vui lòng tới cơ quan chức năng để được cấp thông tin hộ gia đình"
      );
    } else {
      if (props.citizen === true || isAdmin === true) {
        navigation.navigate(props.nextScreen);
      } else {
        Alert.alert(
          "Thông báo",
          "Tài khoản chưa được xác thực, vui lòng tới cơ quan chức năng để được xác thực"
        );
      }
    }
  };

  return (
    <TouchableOpacity
      style={styleApp.box}
      onPress={onPress}
      disabled={props.disabled}
    >
      {props.icon}
      <View style={{ flexDirection: "column" }}>
        <Text style={styles.topic}>{props.topic}</Text>
        <Text style={styles.detail}>{props.detail}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default FunctionUIClass;

const styles = StyleSheet.create({
  topic: {
    fontSize: 18,
  },
  detail: {
    fontSize: 13,
  },
});

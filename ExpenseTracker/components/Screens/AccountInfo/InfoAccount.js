import {
  SafeAreaView,
  Dimensions,
  ScrollView,
  Alert,
  View,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import COLORS from "../../../contains/color";

import AppBar from "../../Common/AppBar";
import BoxInfoAccount from "./BoxInfoAccount";
import ButtonNew from "../../ButtonNew";
import LogoutModal from "../../Modals/LogoutModal";

import { UIContext } from "../../../UIContext";

const screenHeight = Dimensions.get("window").height;

const InfoAccount = ({ navigation }) => {
  const { setCurrentScreen } = useContext(UIContext);
  const { userId } = useContext(UIContext);
  const { user } = useContext(UIContext);
  const [password, setPassword] = useState("");
  const [emailAuthen, setEmailAuthen] = useState("");
  // control logout modal
  const [modalVisible, setModalVisible] = useState(false);

  const { isAdmin } = useContext(UIContext);

  useEffect(() => {
    setCurrentScreen("InfoAccount");
    setPassword(maskPassword(user.password));
    if (!isAdmin) {
      setEmailAuthen(maskPassword(user.emailAuthen));
    }
  }, []);

  const maskPassword = (input) => {
    const length = input.length;
    if (length <= 2) {
      // Hiển thị toàn bộ chuỗi nếu chiều dài là 2 hoặc ít hơn
      return "*****";
    } else {
      // Hiển thị 2 ký tự đầu và ký tự cuối, các ký tự còn lại chuyển thành 5 dấu '*'
      const masked =
        input.substring(0, 2) +
        "*".repeat(length - 4) +
        input.substring(length - 1);
      return masked;
    }
  };

  return (
    <SafeAreaView>
      <AppBar title="Thông tin tài khoản" />

      <LogoutModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      <ScrollView style={{ height: screenHeight * 0.6 }}>
        <BoxInfoAccount title="Id tài khoản" value={userId} />
        <BoxInfoAccount title="Tên đăng nhập" value={user.phoneNumber} />
        <BoxInfoAccount title="Mật khẩu" value={password} />
        {isAdmin ? null : (
          <BoxInfoAccount title="Email xác thực" value={emailAuthen} />
        )}
      </ScrollView>

      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <ButtonNew
          title="Sửa thông tin tài khoản"
          navigation={navigation}
          nextScreen="ChangeInforLogin"
          userName={user.phoneNumber}
          password={user.password}
        />

        <ButtonNew
          title="Đăng xuất"
          nextScreen={false}
          onPress={() => {
            setModalVisible(true);
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default InfoAccount;

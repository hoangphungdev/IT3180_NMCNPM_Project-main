import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Pressable,
  Button,
  StatusBar,
  Dimensions,
  Alert,
  ScrollView,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import AppBar from "../../../components/Common/AppBar";
import COLORS from "../../../contains/color";
import { MaterialIcons } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import Checkbox from "expo-checkbox";
import RNPickerSelect from "react-native-picker-select";
import ButtonNew from "../../../components/ButtonNew";
import { fetchDataExpense } from "../../../database/Dao/ExpenseDao";
import { fetchDataDonation } from "../../../database/Dao/DonationDao";
import { fetchDataHouseHoldAndId } from "../../../database/Dao/HouseholdDao";
import {
  addDoc,
  collection,
  doc,
  updateDoc,
  increment,
} from "firebase/firestore";
import { fb_db } from "../../../firebaseConfig";
import moment from "moment";
import * as validator from "../../../contains/validator";
import validatorMessage from "../../../contains/validatorMessage";
import { fetchDataExpensePaymentbyHouseHoldIdAndExpenseId } from "../../../database/Dao/PaymentDao";
import AlertModalRecipe from "../../../components/Modals/RecipeModals/AlertModalRecipe";
import ConfirmRecipeModal from "../../../components/Modals/RecipeModals/ConfirmRecipeModal";
import { UIContext } from "../../../UIContext";

const { screenHeight, screenWidth } = Dimensions.get("screen");

const Line = (props) => {
  const [inputValue, setInputValue] = useState("");
  const [onChangeText, setOnChangeText] = useState(0); // 0: chưa thay đổi, 1: đã thay đổi

  const handleInputChange = (infor) => {
    setInputValue(infor);
    props.setDescription(infor);
    setOnChangeText(1);
  };

  const handlePickerChange = (value) => {
    props.onValueChange(value); // Gọi hàm callback từ props
  };

  const itemStyle = {
    fontSize: 30,
    color: "red", // Màu chữ cho mỗi mục
  };

  return (
    <View style={styles.line}>
      <Text style={styles.text}>
        {props.title}
        {props.obligatory === true ? (
          <Text style={{ color: "red" }}> *</Text>
        ) : null}
      </Text>
      {props.checkBox === true ? (
        <Checkbox
          value={props.isChecked}
          onValueChange={props.setIsChecked}
          color={props.isChecked ? COLORS.primary : undefined}
        />
      ) : (
        <View style={{ width: "60%" }}>
          {props.picker === true ? (
            <RNPickerSelect
              placeholder={{
                label: props.label,
                value: "",
              }}
              items={props.pickerItems}
              onValueChange={(value) => handlePickerChange(value)}
              value={props.selectedValue}
            />
          ) : (
            <View>
              {props.textInput === true ? (
                <View>
                  <TextInput
                    multiline={true}
                    placeholder="Nhập mô tả về phiếu thu"
                    onChangeText={(infor) => handleInputChange(infor)}
                  />
                  {props.validator === false ||
                    onChangeText === 0 ||
                    (validator.isEmpty(inputValue) && (
                      <Text style={{ color: "red" }}>
                        {props.inforTopic || `Vui lòng nhập mô tả về phiếu thu`}
                      </Text>
                    )) ||
                    (validator.checkBlank(inputValue) && (
                      <Text style={{ color: "red" }}>
                        {props.inforTopic || validatorMessage.blank}
                      </Text>
                    ))}
                </View>
              ) : (
                <View>
                  {props.time === true ? (
                    <Text>{props.currentTime}</Text>
                  ) : null}
                </View>
              )}
            </View>
          )}
        </View>
      )}
    </View>
  );
};

const NewReceipt = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [donations, setDonations] = useState([]);
  const [households, setHouseholds] = useState([]);
  const [currentDateTime, setCurrentDateTime] = useState(moment());

  const [amount, setAmount] = useState(0);
  const [categoryId, setCategoryId] = useState("");
  const [householdId, setHouseholdId] = useState("");
  const [description, setDescription] = useState("");

  const [inputValue, setInputValue] = useState("");
  const [onChangeValue, setOnChangeValue] = useState(0); // 0: chưa thay đổi, 1: đã thay đổi

  const {userId} = useContext(UIContext)

  useEffect(() => {
    // Cập nhật thời gian hiện tại mỗi giây
    const interval = setInterval(() => {
      setCurrentDateTime(moment());
    }, 60000);

    const fetchData = async () => {
      const expensesData = await fetchDataExpense();
      const donationsData = await fetchDataDonation();
      const householdId = await fetchDataHouseHoldAndId();

      setExpenses(expensesData);
      setDonations(donationsData);
      setHouseholds(householdId);
    };

    fetchData();
  }, []);

  const checkExpensePayment = async () => {
    const expense_paymentId =
      await fetchDataExpensePaymentbyHouseHoldIdAndExpenseId({
        expense_id: categoryId,
        household_id: householdId,
      });
    if (expense_paymentId.length !== 0) {
      Alert.alert(
        "Thông báo",
        "Người dùng đã thanh toán khoản phí này, vui lòng chọn khoản phí khác"
      );
      return false;
    }
    return true;
  };

  const addExpensePaymentToFirestore = async () => {
    if (!(await checkExpensePayment())) return;
    else {
      try {
        const docRef = await addDoc(collection(fb_db, "expense_payment"), {
          amount: amount,
          expense_id: categoryId,
          household_id: householdId,
          description: description,
          date: currentDateTime.format("DD/MM/YYYY HH:mm:ss"),
          idAdmin: userId,
        });
        Alert.alert("Thông báo", "Tạo phiếu thu thành công!");
        navigation.goBack();
      } catch (e) {
        console.error("Error adding document: ", e);
      }

      const userRef = doc(fb_db, "expenses", categoryId);
      try {
        await updateDoc(userRef, {
          total: increment(amount),
        });
        console.log("Expenses successfully updated!");
      } catch (error) {
        console.error("Error updating expenses: ", error);
      }
    }
  };

  const addDonationPaymentToFirestore = async () => {
    try {
      const docRef = await addDoc(collection(fb_db, "donation_payment"), {
        amount: amount,
        donation_id: categoryId,
        household_id: householdId,
        description: description,
        date: currentDateTime.format("DD/MM/YYYY HH:mm:ss"),
      });
      Alert.alert("Thông báo", "Tạo phiếu thu thành công!");
      navigation.goBack();
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    const userRef = doc(fb_db, "donations", categoryId);
    try {
      await updateDoc(userRef, {
        total: increment(amount),
      });
      console.log("Donations successfully updated!");
    } catch (error) {
      console.error("Error updating donations: ", error);
    }
  };

  const handleInputChange = (infor) => {
    setInputValue(infor);
    setOnChangeValue(1);
    setAmount(infor);
  };

  const confirmNew = () => {
    if (
      !validator.checkValidatorAmount(amount) ||
      !validator.checkValidatorAmount(inputValue) ||
      validator.isEmpty(categoryId) ||
      validator.isEmpty(householdId)
    ) {
      setModalVisible(true);
      return;
    }
    setModalVisible2(true);
  };

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <AppBar title="Tạo phiếu thu" back={true} navigation={navigation} />
      <AlertModalRecipe
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        navigation={navigation}
      />
      <ConfirmRecipeModal
        modalVisible={modalVisible2}
        setModalVisible={setModalVisible2}
        func={isChecked===true ? addExpensePaymentToFirestore : addDonationPaymentToFirestore}
      />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.view, { flexDirection: "row" }]}>
          <MaterialIcons
            name="local-atm"
            size={100}
            color={COLORS.primary}
            style={{ marginRight: 30 }}
          />
          <View>
            <Text style={{ fontSize: 18, width: 150 }}>
              Giá trị thu {<Text style={{ color: "red" }}>*</Text>}
            </Text>
            <TextInput
              multiline={true}
              style={styles.textInput}
              keyboardType="numeric"
              placeholder="Số tiền thu"
              onChangeText={(infor) => handleInputChange(infor)}
            />
            {onChangeValue === 0 ||
              (validator.isEmpty(inputValue) && (
                <Text style={{ color: "red" }}>Vui lòng nhập giá trị thu</Text>
              )) ||
              (validator.checkValidatorAmount(inputValue) === false && (
                <Text style={{ color: "red" }}>{validatorMessage.amount}</Text>
              ))}
          </View>
        </View>

        <View style={styles.view}>
          <Line
            title="Phiếu thu bắt buộc"
            checkBox={true}
            setIsChecked={setIsChecked}
            isChecked={isChecked}
          />
          <Line
            title="Khoản phí"
            picker={true}
            onValueChange={setCategoryId}
            pickerItems={
              isChecked
                ? expenses.map((item, index) => {
                    return {
                      label: item.data.category,
                      value: item.id,
                    };
                  })
                : donations.map((item, index) => {
                    return {
                      label: item.data.category,
                      value: item.id,
                    };
                  })
            }
            label="Chọn khoản phí"
            obligatory={true}
          />

          <Line
            title="Người nộp"
            picker={true}
            onValueChange={setHouseholdId}
            pickerItems={households.map((item, index) => {
              return {
                label: item.name,
                value: item.id,
              };
            })}
            label="Chọn người nộp"
            obligatory={true}
          />
        </View>

        <View style={styles.view}>
          <Line
            title="Ngày tạo phiếu"
            time={true}
            currentTime={currentDateTime.format("DD/MM/YYYY HH:mm:ss")}
          />
          <Line
            title="Ngày ghi nhận"
            time={true}
            currentTime={currentDateTime.format("DD/MM/YYYY HH:mm:ss")}
          />
          <Line
            title="Mô tả"
            textInput={true}
            setDescription={setDescription}
            validator={false}
          />
        </View>

        <View style={{ alignItems: "center" }}>
          <ButtonNew
            title="Tạo phiếu thu"
            nextScreen={false}
            onPress={confirmNew}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NewReceipt;

const styles = StyleSheet.create({
  view: {
    backgroundColor: COLORS.buttonUpdate,
    marginTop: 20,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    borderBottomColor: COLORS.border,
    borderBottomWidth: 1,
    fontSize: 15,
    width: 150,
  },
  line: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between",
    borderBottomColor: COLORS.border,
    borderBottomWidth: 2,
    paddingVertical: 10,
    alignItems: "center",
  },
  text: {
    fontSize: 16,
  },
  inputSearch: {
    width: "90%",
    fontSize: 15,
  },
  iconSearch: {
    bottom: 2,
    marginRight: 10,
  },
  search: {
    flexDirection: "row",
    backgroundColor: COLORS.search,
    borderRadius: 20,
    borderColor: COLORS.border,
    borderWidth: 1,
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 30,
  },
});

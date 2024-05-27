import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { UIContext } from "../../../UIContext";
import AppBar from "../../../components/Common/AppBar";
import Search from "../../../components/Common/Search";
import COLORS from "../../../contains/color";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import BoxCleaningExpense from "../../../components/Screens/Expenses/BoxCleaningExpense";
import DeleteExpenseModal from "../../../components/Modals/DeleteExpenseModal";
import Loading from "../../../components/Screens/Loading/Loading";
import { fetchHouseHoldDatabyId } from "../../../database/Dao/HouseholdDao";
import { fetchCitizensDatabyId } from "../../../database/Dao/CitizenDao";
import { fetchDataHouseHold } from "../../../database/Dao/HouseholdDao";
import { fetchDataExpensePaymentbyExpenseId } from "../../../database/Dao/PaymentDao";
import { Ionicons } from "@expo/vector-icons";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const CleaningExpense = (props) => {
  const { setCategoryData } = useContext(UIContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [households, setHouseholds] = useState([]);
  const [unpaidHouseholds, setUnpaidHouseholds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [state, setState] = useState(true);

  const navigation = props.navigation;
  const data = props.route.params.data;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const householdsPromises = data.expense_payments.map(
        async (expense_payments) => {
          const householdData = await fetchHouseHoldDatabyId(
            expense_payments.household_id
          );
          const headOfHouseholdData = await fetchCitizensDatabyId(
            householdData.members[0]
          );
          return {
            headOfHousehold: headOfHouseholdData,
            amount: expense_payments.amount,
          };
        }
      );
      const households = await Promise.all(householdsPromises);
      setHouseholds(households);
      // get data for expense
      const expenseData = {
        id: data.expense.id,
        name: data.expense.data.category,
        description: data.expense.data.description,
        timeStart: data.expense.data.create_date,
        timeEnd: data.expense.data.payment_due_date,
      };
      setCategoryData(expenseData);
      setLoading(false);

      const householdData = await fetchDataHouseHold();
      const paidedhouseholdData = await fetchDataExpensePaymentbyExpenseId(
        data.expense.id
      );

      const unpaidHouseholds = householdData.filter((household) => {
        return !paidedhouseholdData.some(
          (paidHousehold) => paidHousehold.household_id === household.id
        );
      });

      const allUnpaidHouseholdDataPromise = unpaidHouseholds.map((household) =>
        fetchCitizensDatabyId(household.data.members[0])
      );
      const allUnpaidHouseholdData = await Promise.all(
        allUnpaidHouseholdDataPromise
      );
      const unpaidHouseholdsData = allUnpaidHouseholdData.map((household) => {
        return {
          headOfHousehold: household,
          amount: "Chưa nộp",
        };
      });
      setUnpaidHouseholds(unpaidHouseholdsData);
    };
    fetchData();
  }, []);

  const onDelete = () => {
    setModalVisible(true);
  };

  const filteredHouseholds = households.filter((household) =>
    household.headOfHousehold.name
      .toLowerCase()
      .includes(searchValue.toLowerCase())
  );

  const filteredUnpaidHouseholds = unpaidHouseholds.filter((unpaidHouseholds) =>
    unpaidHouseholds.headOfHousehold.name
      .toLowerCase()
      .includes(searchValue.toLowerCase())
  );

  return (
    <SafeAreaView >
      <AppBar
        title={data.expense.data.category}
        back={true}
        navigation={navigation}
        delete={true}
        func={onDelete}
      />
      <DeleteExpenseModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        expense_id={data.expense.id}
      />

      <Search
        placeholder="Tên chủ hộ"
        onChangeText={(text) => setSearchValue(text)}
      />

      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="on-drag"
      >
        <View>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={{
                width: screenWidth * 0.65,
                alignItems: "center",
                justifyContent: "center",
                height: screenHeight * 0.05,
                backgroundColor: COLORS.border,
              }}
              onPress={() => {
                setState(!state);
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {state ? (
                  <Text style={styles.text}>Hộ gia đình đã nộp </Text>
                ) : (
                  <Text style={styles.text}>Hộ gia đình chưa nộp </Text>
                )}
                <Ionicons name="swap-vertical" size={18} color={COLORS.white} />
              </View>
            </TouchableOpacity>
            <View style={{ width: 1 }} />

            <View
              style={{
                width: screenWidth * 0.35,
                alignItems: "center",
                justifyContent: "center",
                height: screenHeight * 0.05,
                backgroundColor: COLORS.border,
              }}
            >
              <Text style={styles.text}>Số tiền</Text>
            </View>
          </View>
        </View>

        {loading ? (
          <Loading state={loading}/>
        ) : (
          <View>
            {state
              ? filteredHouseholds.map((item, index) => {
                  return (
                    <View key={index}>
                      <BoxCleaningExpense
                        data={item}
                        index={index + 1}
                        navigation={navigation}
                      />
                    </View>
                  );
                })
              : filteredUnpaidHouseholds.map((item, index) => {
                  return (
                    <View key={index}>
                      <BoxCleaningExpense
                        data={item}
                        index={index + 1}
                        navigation={navigation}
                      />
                    </View>
                  );
                })}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default CleaningExpense;

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    fontWeight: "bold",
    color: COLORS.white,
  },
});

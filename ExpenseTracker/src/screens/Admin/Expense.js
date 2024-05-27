import { FlatList, ScrollView, SafeAreaView, View } from "react-native";
import React from "react";
import AppBar from "../../../components/Common/AppBar";
import Search from "../../../components/Common/Search";
import BoxExpense from "../../../components/Screens/Expenses/BoxExpense";
import { useState, useEffect } from "react";
import Loading from "../../../components/Screens/Loading/Loading";
import { fetchDataExpense } from "../../../database/Dao/ExpenseDao";
import { fetchDataExpensePayment } from "../../../database/Dao/PaymentDao";
import { formatMoney } from "../../../utils/moneyFormatter";

const Expense = ({ navigation }) => {
  const [expenses, setExpenses] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const expensesData = await fetchDataExpense();
      const expense_paymentsDataPromises = expensesData.map(async (expense) => {
        const expense_paymentsData = await fetchDataExpensePayment(expense.id);
        return { expense: expense, expense_payments: expense_paymentsData };
      });
      const paymentsOfExpensesData = await Promise.all(
        expense_paymentsDataPromises
      );

      setExpenses(paymentsOfExpensesData);
      setLoading(false);
    };
    fetchData();
  }, []);

  const filteredExpenses = expenses.filter((expense) =>
    expense.expense.data.category
      .toLowerCase()
      .includes(searchValue.toLowerCase())
  );

  return (
    <SafeAreaView style={{ flex: 0.95 }}>
      <AppBar title="Phí dịch vụ" back={true} navigation={navigation} />

      <Search
        placeholder="Tên chi phí"
        onChangeText={(text) => setSearchValue(text)}
      />


      {loading === true ? (
        <Loading state={loading} />
      ) : (
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          keyboardDismissMode="on-drag"
        >
          {filteredExpenses.map((item, index) => {
            return (
              <View key={index}>
                <BoxExpense
                  data={item}
                  navigation={navigation}
                  nextScreen="InforOnceExpense"
                />
              </View>
            );
          })}
        </ScrollView>
      )}

    </SafeAreaView>
  );
};

export default Expense;

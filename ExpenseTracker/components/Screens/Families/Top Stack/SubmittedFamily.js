import { View, Text, SafeAreaView, StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import BoxViewSubmitted from "../BoxViewSubmitted";
import { fetchDataExpensePaymentbyHouseHoldId } from "../../../../database/Dao/PaymentDao";
import { FlatList } from "react-native-gesture-handler";
import Loading from "../../Loading/Loading";
import { fetchDataExpensebyId } from "../../../../database/Dao/ExpenseDao";
import { fetchDataDonationbyId } from "../../../../database/Dao/DonationDao";
import { fetchDataDonationPaymentbyHouseHoldId } from "../../../../database/Dao/PaymentDao";
import { formatMoney } from "../../../../utils/moneyFormatter";

const SubmittedFamily = ({ idHousehold, navigation }) => {
  const [dataExpense, setDataExpense] = useState([]);
  const [dataDonation, setDataDonation] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (idHousehold == undefined) {
      return;
    }
    const fetchData = async () => {
      const ExpensePaymentData = await fetchDataExpensePaymentbyHouseHoldId(
        idHousehold
      );
      const expenseDataPromises = ExpensePaymentData.map(async (payment) => {
        const ExpenseData = await fetchDataExpensebyId(payment.expense_id);
        return { expense: ExpenseData, payment: payment };
      });
      const ExpenseData = await Promise.all(expenseDataPromises);

      const DonationPaymentData = await fetchDataDonationPaymentbyHouseHoldId(
        idHousehold
      );
      const donationDataPromises = DonationPaymentData.map(async (payment) => {
        const DonationData = await fetchDataDonationbyId(payment.donation_id);
        return { donation: DonationData, payment: payment };
      });
      const DonationData = await Promise.all(donationDataPromises);

      setDataExpense(ExpenseData);
      setDataDonation(DonationData);
      setLoading(false);
    };
    fetchData();
  }, []);

  const mergedData = dataDonation.map((donationItem) => ({
    donation: donationItem.donation,
    payment: donationItem.payment,
  }));

  // Nối mảng expenseData
  dataExpense.forEach((expenseItem) => {
    mergedData.push({
      expense: expenseItem.expense,
      payment: expenseItem.payment,
    });
  });

  return (
    <SafeAreaView style={{ flex: 0.95 }}>
      {loading ? (
        <Loading state={loading} 
          style={{justifyContent: "center", alignItems: "center"}}
        />
      ) : (
        <View>
          {mergedData.length === 0 ? (
            <View style={{justifyContent: "center", alignItems: "center", height: 500}}>
              <Text style={{fontSize: 20}}>Gia đình bạn chưa nộp khoản nào</Text>
            </View>
          ) : (
            <FlatList
              data={mergedData}
              renderItem={({ item }) => (
                <BoxViewSubmitted
                  title={
                    item.expense
                      ? item.expense.category
                      : item.donation.category
                  }
                  time={item.payment.date}
                  total={formatMoney(item.payment.amount)}
                  onPress={() => {
                    navigation.navigate("InforReceipt", { data: item });
                  }}
                />
              )}
            />
          )}
        </View>
      )}
    </SafeAreaView>
  );
};

export default SubmittedFamily;

const styles = StyleSheet.create({
  title: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 25,
  },
  textTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  infoTitle: {
    fontSize: 18,
  },
});

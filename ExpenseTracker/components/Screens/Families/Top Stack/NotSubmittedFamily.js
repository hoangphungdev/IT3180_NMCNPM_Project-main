import {View, Text, SafeAreaView} from 'react-native';
import React, {useEffect, useState} from 'react';
import Search from '../../../Common/Search';
import BoxNotSubmitted from '../BoxNotSubmitted';
import {fetchDataExpense} from '../../../../database/Dao/ExpenseDao';
import {
  fetchDataExpensePaymentbyHouseHoldId,
} from '../../../../database/Dao/PaymentDao';
import {fetchDataExpensebyId} from '../../../../database/Dao/ExpenseDao';
import {FlatList} from 'react-native-gesture-handler';

const NotSubmittedFamily = props => {
  const [expense, setExpense] = useState ([]);
  const [danop, setDanop] = useState ([]);

  useEffect (() => {
    if (props.idHousehold == undefined) {
      return;
    }
    const fetchData = async () => {
      const ExpenseData = await fetchDataExpense ();
      setExpense (ExpenseData);
      const ExpensePaymentData = await fetchDataExpensePaymentbyHouseHoldId (
        props.idHousehold
      );
      const expenseDataPromises = ExpensePaymentData.map (async payment => {
        const ExpenseData = await fetchDataExpensebyId (payment.expense_id);
        return {expense: ExpenseData, payment: payment};
      });
      const data = await Promise.all (expenseDataPromises);
      setDanop (data);
    };
    fetchData ();
  }, []);

  const unpaidFees = (expenses, feeTypes) => {
    // Lấy danh sách tất cả các expense_id đã nộp
    const paidExpenseIds = expenses.map (item => item.payment.expense_id);

    // Lọc ra các loại phí mà hộ gia đình chưa nộp
    const unpaidFees = feeTypes.filter (
      fee => !paidExpenseIds.includes (fee.id)
    );

    return unpaidFees;
  };

  return (
    <View>
      <FlatList
        data={unpaidFees (danop, expense)}
        renderItem={({item}) => (
          <BoxNotSubmitted
            data={item.data}
            disabled={true}
          />
        )}
      />
    </View>
  );
};

export default NotSubmittedFamily;

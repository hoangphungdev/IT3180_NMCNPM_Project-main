import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';
import React from 'react';
import styleApp from '../../styleApp';
import { formatMoney } from '../../../utils/moneyFormatter';

const screenWidth = Dimensions.get ('window').width;

const BoxExpense = props => {
  const navigation = props.navigation;
  const data = props.data;
  const title = data.expense.data.category;
  const time = data.expense.data.create_date + ' - ' + data.expense.data.payment_due_date;
  const number = data.expense_payments.length;
  const total = data.expense.data.total;
  const description = data.expense.data.description;

  
  return (
    <TouchableOpacity style={styleApp.box}
      disabled={props.disabled}
      onPress={() => navigation.navigate (props.nextScreen, {data: data})}
    >
      <View style={{width: screenWidth * 0.7}}>
        <View>
          <View>
            <Text style={styles.title}>{title}</Text>
          </View>

          <View style={styles.boxText}>
            <Text style={styles.text}>Thời gian: </Text>
            <Text style={styles.content}>{time}</Text>
          </View>

          <View style={styles.boxText}>
            <Text style={styles.text}>Số hộ đã nộp: </Text>
            <Text style={styles.content}>
              {number}
            </Text>
          </View>

          <View style={styles.boxText}>
            <Text style={styles.text}>Tổng tiền đã thu: </Text>
            <Text style={styles.content}>{formatMoney(total)}</Text>
          </View>

          <View style={styles.boxText}>
            <Text style={styles.text}>Mô tả: </Text>
            <Text style={styles.content}>{description}</Text>
          </View>

        </View>
      </View>
    </TouchableOpacity>
  );
};

export default BoxExpense;

const styles = StyleSheet.create ({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  content: {
    paddingRight: 20,
    fontSize: 15,
  },
  boxText: {
    flexDirection: 'row',
    marginBottom: 9,
    paddingRight: 30,
  },
});

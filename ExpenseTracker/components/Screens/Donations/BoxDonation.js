import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React from 'react';
import styleApp from '../../styleApp';

const screenWidth = Dimensions.get('window').width;

const BoxDonation = props => {
  const item = props.item;
  const navigation = props.navigation;

  return (
    <TouchableOpacity
      style={styleApp.box}
      onPress={() => navigation.navigate('ListDonations', { item: item })}
      disabled={props.disabled}
    >
      <View style={{ width: screenWidth * 0.75 }}>
        <View>
          <Text style={styles.title}>{props.title}</Text>
        </View>

        <View style={styles.boxText}>
          <Text style={styles.text}>Tổng số tiền: </Text>
          <Text style={styles.content}>{props.totalMoney}</Text>
        </View>

        <View style={styles.boxText}>
          <Text style={styles.text}>Thời gian: </Text>
          <Text style={styles.content}>{props.time}</Text>
        </View>

        <View style={styles.boxText}>
          <Text style={styles.text}>Số hộ đã đóng góp: </Text>
          <Text style={styles.content}>{props.number}</Text>
        </View>

        <View style={styles.boxText}>
          <Text style={styles.text}>Mô tả: </Text>
          <Text style={styles.content}>{props.description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default BoxDonation;

const styles = StyleSheet.create({
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

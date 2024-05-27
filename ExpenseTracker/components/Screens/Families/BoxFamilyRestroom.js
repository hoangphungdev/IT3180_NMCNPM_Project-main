import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import React, { useContext, useEffect } from 'react';
import styleApp from '../../styleApp';
import { UIContext } from '../../../UIContext';

const screenWidth = Dimensions.get('window').width;

const BoxFamilyRestroom = props => {
  const { setHouseholdId } = useContext(UIContext);

  const navigation = props.navigation;
  const data = props.data;

  const isAdmin = useContext(UIContext).isAdmin;
  var headOfHousehold, phone, address, number;

  if (isAdmin === true && props.bug !== true) {
    headOfHousehold = data.citizen[0].name;
    phone = data.citizen[0].phone;
    address = data.address;
    number = data.citizen.length;
  } else {
    headOfHousehold = data.citizen.name;
    phone = data.citizen.phone;
    address = data.address;
    number = props.number;
  }

  return (
    <TouchableOpacity
      style={styleApp.box}
      onPress={() => {
        setHouseholdId(data.household_id);
        navigation.navigate('FamilyInformation', {
          data: data.citizen.map(item => ({
            address: data.address,
            citizen: item,
            household_id: data.household_id,
          })),
        });
      }}
      disabled={props.disabled}
    >
      <View style={{ width: screenWidth * 0.7 }}>
        <View style={styles.aroundTopic}>
          <Text style={styles.topic}>Chủ hộ: </Text>
          <Text style={styles.content}>{headOfHousehold}</Text>
        </View>

        <View style={styles.aroundTopic}>
          <Text style={styles.topic}>Số điện thoại: </Text>
          <Text style={styles.content}>{phone}</Text>
        </View>

        <View style={styles.aroundTopic}>
          <Text style={styles.topic}>Địa chỉ: </Text>
          <Text style={styles.content}>{address}</Text>
        </View>

        <View style={styles.aroundTopic}>
          <Text style={styles.topic}>Số nhân khẩu: </Text>
          <Text style={styles.content}>{number}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default BoxFamilyRestroom;

const styles = StyleSheet.create({
  topic: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  content: {
    paddingRight: 20,
    fontSize: 15,
  },
  aroundTopic: {
    flexDirection: 'row',
    marginBottom: 9,
    paddingRight: 30,
  },
});

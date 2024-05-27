import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  TextInput,
} from 'react-native';
import React from 'react';
import AppBar from '../../../components/Common/AppBar';
import COLORS from '../../../contains/color';
import TimeModal from '../../../components/Modals/TimeModal';

const screenHeight = Dimensions.get ('window').height;
const screenWidth = Dimensions.get ('window').width;

const UpdateDonation = props => {
  return (
    <SafeAreaView>
      <AppBar title="Quỹ đóng góp" back={true} />

      <View style={{paddingHorizontal: 20, paddingVertical: 20}}>
        <View>
          <Text style={styles.text}>Tên quỹ đóng góp</Text>

          <View style={styles.search}>
            <TextInput
              multiline={true}
              placeholder={props.placeholder}
              placeholderTextColor={COLORS.black}
              keyboardType="ascii-capable"
              onChangeText={props.onChangeText}
              style={styles.inputSearch}
            />
          </View>
        </View>

        <View>
          <TimeModal title="Thời gian thu quỹ" />
        </View>

        <View>
          <Text style={styles.text}>Mô tả</Text>
          <View style={styles.search}>
            <TextInput
              multiline={true}
              placeholder={props.placeholder}
              placeholderTextColor={COLORS.black}
              keyboardType="ascii-capable"
              onChangeText={props.onChangeText}
              style={styles.inputSearch}
            />
          </View>
        </View>
      </View>

    </SafeAreaView>
  );
};

export default UpdateDonation;

const styles = StyleSheet.create ({
  inputSearch: {
    width: '90%',
    fontSize: 15,
  },
  search: {
    flexDirection: 'row',
    backgroundColor: COLORS.search,
    marginBottom: screenHeight * 0.035,
    borderRadius: 20,
    borderColor: COLORS.border,
    borderWidth: 1,
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  text: {
    fontSize: 16,
    marginVertical: 15
  }
});

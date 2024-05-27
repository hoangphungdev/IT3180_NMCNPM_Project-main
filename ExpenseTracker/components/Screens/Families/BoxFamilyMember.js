import {View, StyleSheet, Dimensions} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';

import COLORS from '../../../contains/color';
import BoxInfoEachFamilyMember from './BoxInfoEachFamilyMember';

const screenWidth = Dimensions.get ('window').width;

const BoxFamilyMember = props => {
  return (
    <TouchableOpacity style={styles.box} disabled={props.disabled}>
      <View>
        <BoxInfoEachFamilyMember topic="Họ và tên" info={props.data.name} />
        <BoxInfoEachFamilyMember topic="Ngày sinh" info={props.data.birth} />
        <BoxInfoEachFamilyMember topic="Số CCCD/CMND" info={props.data.ID_card_number} />
        <BoxInfoEachFamilyMember topic="Giới tính" info={props.data.gender} />
        <BoxInfoEachFamilyMember topic="Số điện thoại" info={props.data.phone} />
        <BoxInfoEachFamilyMember topic="Nghề nghiệp" info={props.data.job} />
        <BoxInfoEachFamilyMember topic="Email" info={props.data.email} />
      </View>
    </TouchableOpacity>
  );
};

export default BoxFamilyMember;

const styles = StyleSheet.create ({
  box: {
    backgroundColor: COLORS.box,
    marginHorizontal: screenWidth * 0.11,
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopColor: COLORS.white,
    borderTopWidth: 1,
  },
});

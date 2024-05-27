import { View, Text, SafeAreaView, Alert, Button } from 'react-native';
import React from 'react';
import AppBar from '../../../components/Common/AppBar';
import BoxChangeInfor
  from '../../../components/Screens/AccountInfo/BoxChangeInfor';
import ButtonNew from '../../../components/ButtonNew';
import COLORS from '../../../contains/color';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { fb_db } from '../../../firebaseConfig';
import { UIContext } from '../../../UIContext';
import {
  fetchCitizensIDAndHouseHoldDatabyCitizenID,
} from '../../../database/Dao/HouseholdDao';
import { fetchHouseHoldDatabyCitizenID } from '../../../database/Dao/HouseholdDao';
import { updateHouseHoldIdToCitizen } from '../../../database/Dao/CitizenDao';


const NewCitizenOfHousehold = ({ navigation }) => {
  const { householdId } = React.useContext(UIContext);
  const [inforCitizen, setInforCitizen] = React.useState('');

  const updateMemberOfHouseHold = async () => {
    const userRef = doc(fb_db, 'households', householdId);

    try {
      await updateDoc(userRef, {
        members: arrayUnion(inforCitizen),
      });
      console.log('User successfully updated!');
    } catch (error) {
      console.error('Error updating user: ', error);
    }
  };

  const addNewCitizenOfHouseHold = async () => {
    try {
      const citizenID = await fetchCitizensIDAndHouseHoldDatabyCitizenID(
        inforCitizen
      );
      
      if (citizenID.length != 0) {
        if (citizenID[0].data.length == 0) {
          updateMemberOfHouseHold();
          const household_id = await fetchHouseHoldDatabyCitizenID(inforCitizen);
          updateHouseHoldIdToCitizen(inforCitizen, household_id);
          Alert.alert('Thông báo', 'Thêm thành viên thành công');
          navigation.goBack();
        } else {
          Alert.alert('Thông báo', 'Công dân này đã có hộ gia đình');
        }
      } else {
        Alert.alert('Thông báo', 'Không tìm thấy công dân này trong hệ thống');
      }
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  const newCitizenOfHousehold = () => {
    Alert.alert(
      'Xác nhận',
      'Bạn có chắc muốn thêm thành viên mới?',
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'Xác nhận',
          // Hàm thay đổi thông tin tại đây
          // Yêu cầu có kiểm tra thông tin hợp lệ
          onPress: () => addNewCitizenOfHouseHold(),
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <AppBar title="Thêm thành viên" />

      <BoxChangeInfor
        topic="Thông tin thành viên"
        placeholder="Mã định danh của thành viên"
        onChangeText={setInforCitizen}
      />

      <View
        style={{
          justifyContent: 'space-around',
          alignItems: 'center',
          flexDirection: 'row',
        }}
      >
        <ButtonNew
          title="Quay lại"
          nextScreen={false}
          onPress={() => navigation.goBack()}
        />

        <ButtonNew
          title="Thêm thành viên"
          nextScreen={false}
          onPress={newCitizenOfHousehold}
        />
      </View>

    </SafeAreaView>
  );
};

export default NewCitizenOfHousehold;

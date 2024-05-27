import { View, Text, SafeAreaView, Alert } from 'react-native';
import React from 'react';
import AppBar from '../../../components/Common/AppBar';
import { ScrollView } from 'react-native-gesture-handler';
import BoxChangeInfor
  from '../../../components/Screens/AccountInfo/BoxChangeInfor';
import ButtonNew from '../../../components/ButtonNew';
import { addDoc, collection } from 'firebase/firestore';
import { fb_db } from '../../../firebaseConfig';
import {
  fetchCitizensIDAndHouseHoldDatabyCMND,
} from '../../../database/Dao/HouseholdDao';
import * as validator from '../../../contains/validator';
import { updateHouseHoldIdToCitizen } from '../../../database/Dao/CitizenDao';
import { fetchHouseHoldDatabyCitizenID } from '../../../database/Dao/HouseholdDao';


const NewHousehold = ({ navigation }) => {
  const [address, setAddress] = React.useState('');
  const [ID_card_number, setID_card_number] = React.useState('');
  const [citizenId, setCitizenId] = React.useState([]);

  const addHouseHoldToFirestore = async (address, citizenId) => {
    try {
      const docRef = await addDoc(collection(fb_db, 'households'), {
        address: address,
        members: [citizenId],
      });
      console.log('Document written with ID: ', docRef.id);
      Alert.alert('Thông báo', 'Thêm hộ gia đình thành công');
      navigation.goBack();
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };



  const addHouseHold = async () => {
    try {
      const citizenID = await fetchCitizensIDAndHouseHoldDatabyCMND(
        ID_card_number
      );
      if (citizenID.length != 0) {
        if (citizenID[0].data.length == 0) {
          addHouseHoldToFirestore(address, citizenID[0].id);
          const household_id = await fetchHouseHoldDatabyCitizenID(citizenID[0].id);
          updateHouseHoldIdToCitizen(citizenID[0].id, household_id);
        } else {
          alert('Công dân này đã có hộ gia đình');
        }
      } else {
        alert('Không tìm thấy công dân này trong hệ thống');
      }
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  const confirmNewHousehold = () => {
    if (
      validator.isEmpty(address) ||
      validator.checkBlank(address) ||
      !validator.checkValidatorCCCD(ID_card_number)
    ) {
      Alert.alert('Thông báo', 'Vui lòng nhập thông tin và đúng định dạng');
      return;
    }

    Alert.alert(
      'Xác nhận',
      'Bạn có chắc muốn thêm hộ gia đình mới?',
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'Xác nhận',
          // Hàm thay đổi thông tin tại đây
          onPress: addHouseHold,
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}
    >
      <AppBar title="Tạo hộ gia đình mới" back={true} navigation={navigation} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
      >
        <View>
          <View style={{ marginHorizontal: 20, marginTop: 20 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
              Thông tin chung
            </Text>
          </View>


          <BoxChangeInfor
            topic="Địa chỉ"
            placeholder="Nhập địa chỉ hộ gia đình"
            onChangeText={setAddress}
          />

          <View style={{ marginHorizontal: 20, marginTop: 20 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Chủ hộ</Text>
          </View>

          <BoxChangeInfor
            topic="Thông tin chủ hộ"
            placeholder="Nhập số CCCD/CMND"
            onChangeText={setID_card_number}
            category="ID_card_number"
            keyboardType="numeric"
          />


          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <ButtonNew
              title="Thêm mới"
              nextScreen={false}
              onPress={confirmNewHousehold}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NewHousehold;

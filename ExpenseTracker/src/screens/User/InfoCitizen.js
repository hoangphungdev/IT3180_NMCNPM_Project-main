import { SafeAreaView, Dimensions, ScrollView, View } from 'react-native';
import React, { useContext, useEffect } from 'react';
import { UIContext } from '../../../UIContext';

import AppBar from '../../../components/Common/AppBar';
import BoxInfoAccount from './../../../components/Screens/AccountInfo/BoxInfoAccount';
import ButtonNew from '../../../components/ButtonNew';

const screenHeight = Dimensions.get('window').height;

const InfoCitizen = ({ navigation }) => {
  const { setCurrentScreen } = useContext(UIContext);
  const { citizen } = useContext(UIContext);

  useEffect(() => {
    setCurrentScreen('InfoCitizen');
  }, []);

  return (
    <SafeAreaView>
      <AppBar
        title="Thông tin cá nhân"
        back={true}
        navigation={navigation}
      />

      <ScrollView style={{ height: screenHeight * 0.6 }}>
        <BoxInfoAccount title="Mã định danh" value={citizen.id} />
        <BoxInfoAccount title="Họ và tên" value={citizen.name} />
        <BoxInfoAccount title="Ngày sinh" value={citizen.birth} />
        <BoxInfoAccount title="Số CCCD/CMND" value={citizen.ID_card_number} />
        <BoxInfoAccount title="Giới tính" value={citizen.gender} />
        <BoxInfoAccount title="Số điện thoại" value={citizen.phone} />
        <BoxInfoAccount title="Email" value={citizen.email} />
        <BoxInfoAccount title="Nghề nghiệp" value={citizen.job} />
        <BoxInfoAccount title="Địa chỉ" value={citizen.address} />
      </ScrollView>

      <View style={{ flexDirection: 'row', justifyContent: ('space-around') }}>
        <ButtonNew
          title="Xem hộ gia đình"
          navigation={navigation}
          nextScreen="FamilyInformation"
          citizen={citizen}
        />

        <ButtonNew
          title="Sửa thông tin"
          nextScreen="ChangeInforCitizen"
          navigation={navigation}
          citizen={citizen}
        />
      </View>

    </SafeAreaView>
  );
};

export default InfoCitizen;

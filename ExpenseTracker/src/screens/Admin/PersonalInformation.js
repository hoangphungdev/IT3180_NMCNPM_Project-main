import { View, Text, SafeAreaView } from 'react-native';
import React, { useContext, useEffect } from 'react';
import AppBar from '../../../components/Common/AppBar';
import BoxInfoAccount
  from '../../../components/Screens/AccountInfo/BoxInfoAccount';
import { UIContext } from '../../../UIContext';
import { fetchCitizensDatabyId } from '../../../database/Dao/CitizenDao';
import ButtonNew from '../../../components/ButtonNew';

const PersonalInformation = props => {
  const { setCurrentScreen, citizen } = useContext(UIContext);

  const data = props.route.params.data;
  const id = props.route.params.id;
  
  useEffect(() => {
    setCurrentScreen('PersonalInformation');
  }, []);

  return (
    <SafeAreaView>
      <AppBar title={'Thông tin cư dân'} back={true} navigation={props.navigation} />
      <BoxInfoAccount title="Mã định danh" value={id} />
      <BoxInfoAccount title="Họ và tên" value={data.name} />
      <BoxInfoAccount title="Ngày sinh" value={data.birth} />
      <BoxInfoAccount title="Số CCCD/CMND" value={data.ID_card_number} />
      <BoxInfoAccount title="Giới tính" value={data.gender} />
      <BoxInfoAccount title="Số điện thoại" value={data.phone} />
      <BoxInfoAccount title="Email" value={data.email} />
      <BoxInfoAccount title="Nghề nghiệp" value={data.job} />
      <BoxInfoAccount title="Địa chỉ" value={data.address} />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginBottom: 20,
        }}
      >

        {/* <ButtonNew
          title="Xem hộ gia đình"
          navigation={props.navigation}
          nextScreen={false}
          onPress={() => {
            props.navigation.navigate('FamilyInformation', {
              data: data,
            });
          }}
        /> */}
      </View>
    </SafeAreaView>
  );
};

export default PersonalInformation;

import {View, Text, ScrollView, SafeAreaView} from 'react-native';
import React from 'react';
import AppBar from '../../../components/Common/AppBar';
import BoxChangeInfor
  from '../../../components/Screens/AccountInfo/BoxChangeInfor';
import ButtonNew from '../../../components/ButtonNew';
import {UIContext} from '../../../UIContext';

const ChangeInforHousehold = ({navigation}) => {
  const [address, setAddress] = React.useState ('');
  const {householdId} = React.useContext (UIContext);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}
    >
      <AppBar
        title="Sửa thông tin hộ gia đình"
        back={true}
        navigation={navigation}
      />

      <View
        style={{
          justifyContent: 'space-around',
          alignItems: 'center',
          flexDirection: 'row',
        }}
      >
        <ButtonNew
          title="Thêm thành viên"
          nextScreen={false}
          onPress={() => navigation.navigate ('NewCitizenOfHousehold')}
        />
      </View>
    </SafeAreaView>
  );
};

export default ChangeInforHousehold;

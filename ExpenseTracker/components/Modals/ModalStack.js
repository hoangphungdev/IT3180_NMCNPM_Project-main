import { Modal, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import TestModal from './NavBarModals/TestModal';
import EditDonation from '../../src/screens/Admin/EditDonation';
import NewReceipt from '../../src/screens/Admin/NewReceipt';
import ChangeInforLogin from '../../src/screens/ChangeInforLogin';
import NewCategory from '../../src/screens/Admin/NewCategory';
import NewCitizen from '../../src/screens/Admin/NewCitizen';
import ChangeInforCitizen from '../../src/screens/User/ChangeInforCitizen';
import NewHousehold from '../../src/screens/Admin/NewHousehold';
import ChangeInforHousehold from '../../src/screens/Admin/ChangeInforHousehold';
import NewCitizenOfHousehold from '../../src/screens/Admin/NewCitizenOfHousehold';

const ModalStack = createStackNavigator();

const ModalViewStack = () => {
  return (
    <ModalStack.Navigator
      screenOptions={{
        headerShown: false,
        presentation: 'modal',
        cardStyle: { backgroundColor: 'transparent' },
      }}
    >
      <ModalStack.Screen name="Test" component={TestModal} />
      <ModalStack.Screen name="EditDonation" component={EditDonation} />
      <ModalStack.Screen name="NewReceipt" component={NewReceipt} />
      <ModalStack.Screen name="ChangeInforLogin" component={ChangeInforLogin} />
      <ModalStack.Screen name="NewCategory" component={NewCategory} />
      <ModalStack.Screen name="NewCitizen" component={NewCitizen} />
      <ModalStack.Screen name="ChangeInforCitizen" component={ChangeInforCitizen} />
      <ModalStack.Screen name="NewHousehold" component={NewHousehold} />
      <ModalStack.Screen name="ChangeInforHousehold" component={ChangeInforHousehold} />
      <ModalStack.Screen name="NewCitizenOfHousehold" component={NewCitizenOfHousehold} />
    </ModalStack.Navigator>
  )
}

export default ModalViewStack
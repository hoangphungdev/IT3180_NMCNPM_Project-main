import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import HomeUser from '../../src/screens/User/HomeUser';
import FamilyInformation from '../../src/screens/FamilyInformation';
import Donation from '../../src/screens/Donation';
import ListDonations from '../../src/screens/ListDonations';
import InfoCitizen from '../../src/screens/User/InfoCitizen';

import { useContext, useEffect } from 'react';
import { UIContext } from '../../UIContext';
import ChangeInforCitizen from '../../src/screens/User/ChangeInforCitizen';
import InforReceipt from '../../src/screens/Admin/InforReceipt'

const HomeStack = createStackNavigator ();

const UserHomeStack = () => {
  const { 
    setCurrentScreen, 
    topStackUserHome,
    setTopStackUserHome
  } = useContext(UIContext);
  useEffect(() => {
    setTopStackUserHome('HomeUser');
    setCurrentScreen(topStackUserHome);
  }, []);
  useEffect(() => {
    setCurrentScreen(topStackUserHome);
  }, [topStackUserHome]);
  return (
    <NavigationContainer independent="true">
      <HomeStack.Navigator
        screenListeners={({ route }) => ({
          focus: () => {
            setTopStackUserHome(route.name);
          }
        })}
      >
        <HomeStack.Screen name='HomeUser' component={HomeUser} options={{ headerShown: false }}/>
        <HomeStack.Screen name='FamilyInformation' component={FamilyInformation} options={{ headerShown: false }}/>
        <HomeStack.Screen name="Donation" component={Donation} options={{ headerShown: false }}/>
        <HomeStack.Screen name="ListDonations" component={ListDonations} options={{ headerShown: false }}/>
        <HomeStack.Screen name="InfoCitizen" component={InfoCitizen} options={{ headerShown: false }}/>
        <HomeStack.Screen name="ChangeInforCitizen" component={ChangeInforCitizen}  options={{ headerShown: false }}/>
        <HomeStack.Screen name="InforReceipt" component={InforReceipt} options={{headerShown: false}} />
      </HomeStack.Navigator>
    </NavigationContainer>
  );
};

export default UserHomeStack;

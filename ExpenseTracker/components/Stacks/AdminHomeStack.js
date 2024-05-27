import React, { useContext, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import HomeAdmin from "../../src/screens/Admin/HomeAdmin";
import ListDonations from "../../src/screens/ListDonations";
import Expense from "../../src/screens/Admin/Expense";
import InforOnceExpense from "../../src/screens/Admin/InforOnceExpense";
import FamilyRestroom from "../../src/screens/Admin/FamilyRestroom";
import Donation from "../../src/screens/Donation";
import FunctionUIClass from '../Screens/Home/FunctionUIClass';
import InforFamily from '../../src/screens/Admin/InforFamily';
import NewReceipt from '../../src/screens/Admin/NewReceipt';
import NewCategory from '../../src/screens/Admin/NewCategory'

import { UIContext } from '../../UIContext';
import EditDonation from '../../src/screens/Admin/EditDonation';
import ChangeInforLogin from '../../src/screens/ChangeInforLogin';
import ManageCitizens from '../../src/screens/Admin/ManageCitizens';
import PersonalInformation from '../../src/screens/Admin/PersonalInformation';
import NewCitizen from '../../src/screens/Admin/NewCitizen';
import FamilyInformation from '../../src/screens/FamilyInformation';
import NewHousehold from '../../src/screens/Admin/NewHousehold';
import ChangeInforHousehold from '../../src/screens/Admin/ChangeInforHousehold';
import NewCitizenOfHousehold from '../../src/screens/Admin/NewCitizenOfHousehold';
import ChangeInforCitizen from '../../src/screens/User/ChangeInforCitizen';
import DeleteExpenseModal from '../Modals/DeleteExpenseModal';
import ChangeInforReceipt from '../../src/screens/Admin/ChangeInforReceipt';
import InforReceipt from '../../src/screens/Admin/InforReceipt';
import SubmittedFamily from '../../components/Screens/Families/Top Stack/SubmittedFamily'
import LinkAccount from '../../src/screens/Admin/LinkAccount';

const HomeStack = createStackNavigator();

const AdminHomeStack = () => {
  const {
    setCurrentScreen,
    topStackAdminHome,
    setTopStackAdminHome
  } = useContext(UIContext);
  // gia tri mac dinh dau tien cho top screen ~ HomeAdmin
  useEffect(() => {
    setTopStackAdminHome('HomeAdmin');
    setCurrentScreen(topStackAdminHome);
  }, []);
  // khi top screen thay doi thi cap nhat lai current screen
  useEffect(() => {
    setCurrentScreen(topStackAdminHome);
  }, [topStackAdminHome]);
  return (
    <NavigationContainer independent="true">
      <HomeStack.Navigator
        screenListeners={({ route }) => ({
          focus: () => {
            setTopStackAdminHome(route.name);
          }
        })}
      > 
        <HomeStack.Screen name="HomeAdmin" component={HomeAdmin} options={{ headerShown: false }} />
        <HomeStack.Screen name="NewCitizenOfHousehold" component={NewCitizenOfHousehold} options={{ headerShown: false }} />
        <HomeStack.Screen name="ChangeInforHousehold" component={ChangeInforHousehold} options={{ headerShown: false }} />
        <HomeStack.Screen name="NewHousehold" component={NewHousehold} options={{ headerShown: false }} />
        <HomeStack.Screen name="NewCategory" component={NewCategory} options={{ headerShown: false }} />
        <HomeStack.Screen name="NewCitizen" component={NewCitizen} options={{ headerShown: false }} />
        <HomeStack.Screen name="ManageCitizens" component={ManageCitizens} options={{ headerShown: false }} />
        <HomeStack.Screen name="PersonalInformation" component={PersonalInformation} options={{ headerShown: false }} />
        <HomeStack.Screen name="EditDonation" component={EditDonation} options={{ headerShown: false }} />
        <HomeStack.Screen name="NewRecript" component={NewReceipt} options={{ headerShown: false }} />
        <HomeStack.Screen name="InforFamily" component={InforFamily} options={{ headerShown: false }} />
        <HomeStack.Screen name="ListDonations" component={ListDonations} options={{ headerShown: false }} />
        <HomeStack.Screen name="Expense" component={Expense} options={{ headerShown: false }} />
        <HomeStack.Screen name="InforOnceExpense" component={InforOnceExpense} options={{ headerShown: false }} />
        <HomeStack.Screen name="FamilyRestroom" component={FamilyRestroom} options={{ headerShown: false }} />
        <HomeStack.Screen name="Donation" component={Donation} options={{ headerShown: false }} />
        <HomeStack.Screen name='FunctionUIClass' component={FunctionUIClass} options={{ headerShown: false }} />
        <HomeStack.Screen name="ChangInforLogin" component={ChangeInforLogin} options={{ headerShown: false }} />
        <HomeStack.Screen name="FamilyInformation" component={FamilyInformation} options={{ headerShown: false }} />
        <HomeStack.Screen name="DeleteExpenseModal" component={DeleteExpenseModal } options={{ headerShown: false }} />
        <HomeStack.Screen name="ChangeInforReceipt" component={ ChangeInforReceipt } options={{ headerShown: false }} />
        <HomeStack.Screen name="InforReceipt" component={InforReceipt} options={{ headerShown: false }} />
        <HomeStack.Screen name="SubmittedFamily" component={SubmittedFamily} options={{ headerShown: false }} />
        <HomeStack.Screen name="LinkAccount" component={LinkAccount} options={{ headerShown: false }} />
        <HomeStack.Screen name="ChangeInforCitizen" component={ChangeInforCitizen} options={{ headerShown: false }} />
      </HomeStack.Navigator>
    </NavigationContainer>
  );
};

export default AdminHomeStack;
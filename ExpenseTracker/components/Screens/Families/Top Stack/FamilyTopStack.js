import {
  createMaterialTopTabNavigator,
} from '@react-navigation/material-top-tabs';
import React, { useContext, useEffect, useState } from 'react';

import InformationFamily from './InformationFamily';
import SubmittedFamily from './SubmittedFamily';
import NotSubmittedFamily from './NotSubmittedFamily';
import COLORS from '../../../../contains/color';
import { UIContext } from '../../../../UIContext';

const Tab = createMaterialTopTabNavigator();

const FamilyTopStack = (props) => {
  const {
    currentScreen, setCurrentScreen,
    setTopStackAdminHome,
  } = useContext(UIContext);

  const data = props.data;

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontWeight: 'bold' },
        tabBarStyle: { backgroundColor: COLORS.tabBar },
        tabBarIndicatorStyle: { backgroundColor: COLORS.boxTabBarTrue },
      }}

      screenListeners={({ route }) => ({
        tabPress: () => setTopStackAdminHome(route.name),
        focus: () => setTopStackAdminHome(route.name),
      })}
    >
      <Tab.Screen name="Thông tin">
        {() => <InformationFamily data={data} />}
      </Tab.Screen>
      <Tab.Screen name="Đã nộp">
        {() => <SubmittedFamily idHousehold={data[0].citizen.household_id} navigation={props.navigation}/>}
      </Tab.Screen>
      <Tab.Screen name="Chưa nộp">
        {() => <NotSubmittedFamily idHousehold={data[0].citizen.household_id} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default FamilyTopStack;

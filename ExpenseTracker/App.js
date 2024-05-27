import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { UIProvider } from './UIContext';

import Tab from './components/NavBar/NavBarBottom'
import ModalViewStack from './components/Modals/ModalStack';

const RootStack = createStackNavigator();
export default function App () {
  return (
    <UIProvider>
      <NavigationContainer>
        <RootStack.Navigator>
          <RootStack.Screen name="Tab" component={Tab} options={{ headerShown: false }} />
          <RootStack.Screen name="ModalViewStack" component={ModalViewStack} options={{ headerShown: false }} />
        </RootStack.Navigator>
      </NavigationContainer>
    </UIProvider>
  );
}

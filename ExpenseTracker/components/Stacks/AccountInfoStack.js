import React, { useContext } from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import InfoAccount from "../Screens/AccountInfo/InfoAccount";
import ChangeInforLogin from "../../src/screens/ChangeInforLogin";

import { UIContext } from '../../UIContext';

const InfoStack = createStackNavigator();

const AccountInfoStack = () => {
    const {
        setCurrentScreen, currentScreen,
        topStackAccountInfo, setTopStackAccountInfo
    } = useContext(UIContext);
    // gia tri mac dinh dau tien cho top screen ~ InfoAccount
    React.useEffect(() => {
        setTopStackAccountInfo('InfoAccount');
        setCurrentScreen(topStackAccountInfo);
    }, []);
    // khi top screen thay doi thi cap nhat lai current screen
    React.useEffect(() => {
        setCurrentScreen(topStackAccountInfo);
    }, [topStackAccountInfo]);
    return (
        <NavigationContainer independent="true">
            <InfoStack.Navigator
                screenListeners={({ route }) => ({
                    focus: () => {
                        setTopStackAccountInfo(route.name);
                    }
                })}
            >
                <InfoStack.Screen name="InfoAccount" component={InfoAccount} options={{ headerShown: false }} />
                <InfoStack.Screen name="ChangeInforLogin" component={ChangeInforLogin} options={{ headerShown: false }} />
            </InfoStack.Navigator>
        </NavigationContainer>
    )
}
export default AccountInfoStack;
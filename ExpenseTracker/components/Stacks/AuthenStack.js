import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Welcome from "../Screens/Auth/Welcome";
import SignIn from "../../src/screens/SignIn";
import SignUp from "../../src/screens/SignUp";
import ForgotPassword from "../Screens/Auth/ForgotPassword/ForgotPassword";
import OTPAuthentication from "../../src/screens/OTPAuthentication";

const AuthenStack = createStackNavigator();

const AuthenStackScreen = () => {
    return (
        <NavigationContainer independent="true">
            <AuthenStack.Navigator>
                <AuthenStack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
                <AuthenStack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
                <AuthenStack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
                <AuthenStack.Screen name="ForgotPassword" component={ForgotPassword} options={{headerTitle: "Quên mật khẩu"}}/>
                <AuthenStack.Screen name="OTPAuthentication" component={OTPAuthentication} options={{headerTitle: "Quên mật khẩu"}}/>
            </AuthenStack.Navigator>
        </NavigationContainer>
    );
}

export default AuthenStackScreen;
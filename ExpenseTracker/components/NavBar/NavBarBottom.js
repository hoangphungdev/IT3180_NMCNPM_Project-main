import React, { useContext, useEffect } from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Image, StyleSheet, Text, Dimensions } from "react-native";
import COLORS from "../../contains/color";
import { UIContext } from "../../UIContext";

import CustomPlusButton from "./CustomPlusButton";
import AuthenStackScreen from "../Stacks/AuthenStack";
import AccountInfoStack from "../Stacks/AccountInfoStack";
import AdminHomeStack from "../Stacks/AdminHomeStack";
import UserHomeStack from "../Stacks/UserHomeStack";
const CreateNewPlaceHolder = () => <View style={{ flex: 1, backgroundColor: 'blue' }} />

const Tab = createBottomTabNavigator();
const { width, height } = Dimensions.get('screen');
const NavBarBottom = () => {
    
    const { isAdmin } = useContext(UIContext);

    const {
        userId,
        currentScreen, setCurrentScreen,
        currentModal,
        topStackAdminHome,
        topStackAccountInfo,
        topStackUserHome,
    } = useContext(UIContext);
    // userId check
    if (userId === null) {
        return <AuthenStackScreen />;
    }
    return (
        <View style={{
            width,
            // height depends on current screen
            height: (
                ['ChangeInforLogin'].includes(currentScreen)
                || ['LinkAccount'].includes(currentScreen)
                )
                ? height+150 
                : height,   
        }}>
            <Tab.Navigator
                screenOptions={{
                    tabBarHideOnKeyboard: true,
                    "activeTintColor": '#e91e63',
                    tabBarStyle: [{
                        "height": 96,
                        "backgroundColor": COLORS.appBar,
                        "flexDirection": "row"
                    }]
                }}
            >
                <Tab.Screen
                    name="HomeStack"
                    component={
                        (isAdmin === true) ? AdminHomeStack : UserHomeStack
                    }
                    options={{
                        headerShown: false,
                        tabBarShowLabel: false,
                        tabBarIcon: () => {
                            return (
                                <View style={styles.TabElement}>
                                    <Image
                                        source={require('../../assets/home.png')}
                                        resizeMode="contain"
                                        style={styles.Image}
                                    />
                                    <Text style={styles.Text}>Trang Chủ</Text>
                                </View>
                            )
                        }
                    }}
                    listeners={() => ({
                        tabPress: () => {
                            if (isAdmin == true) {
                                setCurrentScreen(topStackAdminHome);
                            } else {
                                setCurrentScreen(topStackUserHome);
                            };
                        },
                        focus: () => {
                            if (isAdmin == true) {
                                setCurrentScreen(topStackAdminHome);
                            } else {
                                setCurrentScreen(topStackUserHome);
                            };
                        }
                    })}
                />
                {
                    (['InfoAccount','InforReceipt'].includes(currentScreen) || isAdmin ===false) ? (
                        null
                    ) : (
                        <Tab.Screen name="CreateNew" component={CreateNewPlaceHolder}
                            options={{
                                headerShown: false,
                                tabBarShowLabel: false,
                                tabBarIcon: () => {
                                    return (
                                        <CustomPlusButton />
                                    )
                                }
                            }}
                            listeners={({ navigation }) => ({
                                tabPress: event => {
                                    event.preventDefault();
                                    navigation.navigate('ModalViewStack', { screen: currentModal })
                                }
                            })}
                        />
                    )
                }

                <Tab.Screen name="InfoStack" component={AccountInfoStack}
                    options={{
                        headerShown: false,
                        tabBarShowLabel: false,
                        tabBarIcon: () => {
                            return (
                                <View style={styles.TabElement}>
                                    <Image
                                        source={require('../../assets/person.png')}
                                        resizeMode="contain"
                                        style={styles.Image}
                                    />
                                    <Text style={styles.Text}>Tài Khoản</Text>
                                </View>
                            )
                        }
                    }}
                    listeners={() => ({
                        focus: () => {
                            setCurrentScreen(topStackAccountInfo)
                        },
                        tabPress: () => {
                            setCurrentScreen(topStackAccountInfo)
                        }
                    })}
                />
            </Tab.Navigator>
        </View>
    )
}

const styles = StyleSheet.create({
    TabElement: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 39,
    },
    Image: {
        width: 34,
        height: 34,
        tintColor: COLORS.white,
    },
    Text: {
        color: COLORS.white,
        fontSize: 12,
    }
})

export default NavBarBottom
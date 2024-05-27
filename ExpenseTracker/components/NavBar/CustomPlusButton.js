import React from "react";

import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import COLORS from "../../contains/color";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useContext, useEffect, useState } from "react";
import { UIContext } from "./../../UIContext";


const CustomPlusButton = () => {
    const { currentScreen, setCurrentModal } = useContext(UIContext);
    const [icon, setIcon] = useState(null);
    const [text, setText] = useState('');
    useEffect(() => {
        if (currentScreen == 'Thông tin') {
            setIcon(<MaterialCommunityIcons name="application-edit-outline" size={55} color="white" />);
            setText('Cập nhật thông tin')
            setCurrentModal('ChangeInforHousehold')
        } else if (currentScreen === 'InfoAccount') {
            setIcon(<MaterialCommunityIcons name="account-edit-outline" size={55}  color="white" />);
            setText('Thêm thành viên');
            setCurrentModal('ChangeInforLogin')
        } else if (currentScreen === 'Đã nộp') {
            setIcon(<MaterialCommunityIcons name="application-edit-outline" size={50} color="white" />);
            setText('Thêm thành viên')
            setCurrentModal('ChangeInforHousehold')
        } else if (currentScreen === 'FamilyInformation') {
            setIcon(<MaterialCommunityIcons name="application-edit-outline" size={50} color="white" />);
            setText('Thêm thành viên')
            setCurrentModal('ChangeInforHousehold')
        } else if (currentScreen === 'Chưa nộp') {
            setIcon(<MaterialCommunityIcons name="application-edit-outline" size={50} color="white" />);
            setText('Thêm thành viên')
            setCurrentModal('ChangeInforHousehold')
        } else if (currentScreen === 'HomeAdmin') {
            setIcon(<MaterialCommunityIcons name="wallet-outline" size={55} color="white" />);
            setText('Thêm phiếu thu')
            setCurrentModal('NewReceipt')
        } else if (currentScreen === 'ListDonations') {
            setIcon(<MaterialCommunityIcons name="application-edit-outline" size={50} color="white" />);
            setText('Sửa thông tin')
            setCurrentModal('EditDonation')
        } else if (currentScreen === 'Expense') {
            setIcon(<Ionicons name="add-outline" size={55} color="white" />);
            setText('Thêm mới')
            setCurrentModal('NewCategory')
        } else if (currentScreen === 'Donation') {
            setIcon(<Ionicons name="add-outline" size={55} color="white" />);
            setText('Thêm mới')
            setCurrentModal('NewCategory')
        } else if (currentScreen === 'FamilyRestroom') {
            setIcon(<Ionicons name="add-outline" size={55} color="white" />);
            setText('Thêm mới')
            setCurrentModal('NewHousehold')
        } else if (currentScreen === "InforFamily") {
            setIcon(<MaterialCommunityIcons name="application-edit-outline" size={55} color="white" />);
            setText('Cập nhật thông tin')
            setCurrentModal('ChangeInforHousehold')
        } else if (currentScreen === "InforOnceExpense") {
            setIcon(<MaterialCommunityIcons name="application-edit-outline" size={55} color="white" />);
            setText('Sửa thông tin')
            setCurrentModal('EditDonation')
        } else if (currentScreen === "ManageCitizens") {
            setIcon(<Ionicons name="add-outline" size={55} color="white" />);
            setText('Thêm mới')
            setCurrentModal('NewCitizen')
        } else if (currentScreen === "PersonalInformation") {
            setIcon(<MaterialCommunityIcons name="application-edit-outline" size={55} color="white" />);
            setText('Sửa thông tin')
            setCurrentModal('ChangeInforCitizen')
        }
    }, [currentScreen])
    return (
        <TouchableOpacity activeOpacity={1}
            style={{
                top: -30,
                justifyContent: 'center',
                alignItems: 'center',
                width: 150,
                height: 150,
            }}
        >
            <View
                style={{
                    width: 110,
                    height: 120,
                    borderRadius: 55,
                    backgroundColor: COLORS.appBar,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingBottom: 30,
                }}
            >
                {icon}
                <Text style={{
                    color: COLORS.white,
                    fontSize: 13,
                }}>{text}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default CustomPlusButton;
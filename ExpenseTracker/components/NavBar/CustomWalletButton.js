import React from "react";

import { Text, View, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import COLORS from "../../contains/color";

const CustomWalletButton = ({ children, onPress }) => {
    return (
        <TouchableOpacity
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
                <Ionicons
                    name="wallet-outline"
                    size={55}
                    color={COLORS.white}
                />
                <Text style={{
                    color: COLORS.white,
                    fontSize: 13,
                }}>Tạo phiếu thu</Text>
            </View>
        </TouchableOpacity>
    )
}

export default CustomWalletButton;
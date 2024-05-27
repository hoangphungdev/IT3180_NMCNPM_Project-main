import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import COLORS from '../../../contains/color'

const screenHeight = Dimensions.get ('window').height;
const screenWidth = Dimensions.get ('window').width;

const BoxSideBar = (props) => {
  return (
    <TouchableOpacity style={styles.box}>
        <Text style={styles.title}>{props.title}</Text>
    </TouchableOpacity>
  )
}

export default BoxSideBar

const styles = StyleSheet.create({
    box: {
        borderTopColor: COLORS.white,
        borderBottomColor: COLORS.white,
        borderBottomWidth: 1,
        borderTopWidth: 1,
        height: 50,
        justifyContent: 'center',
        width: screenWidth * 0.8,
        paddingLeft: 20,
    },
    title: {
        fontSize: 16,
        width: '80%',
    }
})
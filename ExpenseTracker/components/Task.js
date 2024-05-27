import { View, Text } from 'react-native'
import React from 'react'
import styleApp from './styleApp'

import {MaterialIcons} from '@expo/vector-icons';
import COLORS from '../contains/color';

const Task = (props) => {
  return (
    <View style={styleApp.box}>
      <Text>
        <MaterialIcons name={props.icons} size={24} color={COLORS.black} />
      </Text>
      <Text>
        {props.content}
      </Text>
    </View>
  )
}

export default Task
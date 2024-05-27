import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Animated,
} from 'react-native';
import React, { useState } from 'react';
import COLORS from '../../contains/color';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import SideBar from '../SideBar';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const AppBar = props => {
  const [isNotification, setIsNotification] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const showModal = () => {
    setModalVisible(true);
  };

  const func = props.func ? props.func : () => { };

  var alignItems = 'center';

  if (props.badge === true) {
    alignItems = 'flex-start';
  }

  return (
    <View
      style={{
        height: screenHeight * 0.11,
        backgroundColor: COLORS.appBar,
        flexDirection: 'row',
      }}
    >
      <View style={styles.left}>
        {props.back === true
          ? <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Ionicons
              name="arrow-back-outline"
              size={30}
              color={COLORS.white}
            />
          </TouchableOpacity>
          : <View>
            {props.badge === true
              ? <FontAwesome name="id-badge" size={26} color={COLORS.white} />
              : null}
          </View>}
      </View>

      <View style={[styles.middle, { alignItems: alignItems }]}>
        <Text style={styles.title}>{props.title}</Text>
      </View>

      <View style={styles.right}>
        {props.notification === true
          ? <TouchableOpacity
            onPress={() => setIsNotification(!isNotification)}
          >
            {isNotification == true
              ? <Ionicons
                name="notifications-off"
                size={26}
                color={COLORS.white}
              />
              : <Ionicons
                name="notifications"
                size={26}
                color={COLORS.white}
              />}

          </TouchableOpacity>
          : <View>
            {props.list === true
              ? <TouchableOpacity onPress={showModal}>
                <Feather name="list" size={26} color={COLORS.white} />
              </TouchableOpacity>
              : <View>
                {props.done === true
                  ? <TouchableOpacity>
                    <MaterialIcons
                      name="done"
                      size={26}
                      color={COLORS.white}
                    />
                  </TouchableOpacity>
                  : <TouchableOpacity>
                    {props.report === true
                      ? <MaterialIcons
                        name="report"
                        size={26}
                        color={COLORS.white}
                      />
                      : <TouchableOpacity>
                        {props.delete === true
                          ? <MaterialIcons
                            name="delete-sweep"
                            size={24}
                            color={COLORS.white}
                            onPress={() => func()}
                          />
                          : null}
                      </TouchableOpacity>}
                  </TouchableOpacity>}
              </View>}
          </View>}
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        statusBarTranslucent={true}
      >
        <Animated.View>
          <SideBar
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
          />
        </Animated.View>
      </Modal>
    </View>
  );
};

export default AppBar;

const styles = StyleSheet.create({
  left: {
    width: screenWidth * 0.175,
    justifyContent: 'center',
    alignItems: 'center',
    top: 15,
  },
  middle: {
    width: screenWidth * 0.65,
    justifyContent: 'center',
    top: 15,
  },
  right: {
    justifyContent: 'center',
    alignItems: 'center',
    width: screenWidth * 0.175,
    top: 15,
  },
  title: {
    fontSize: 20,
    color: COLORS.white,
    textAlign: 'center'
  },
});

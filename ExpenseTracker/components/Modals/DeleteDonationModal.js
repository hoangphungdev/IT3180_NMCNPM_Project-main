import {StyleSheet, Text, View, Modal, Pressable, Alert} from 'react-native';
import React, {useEffect} from 'react';
import {UIContext} from '../../UIContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import COLORS from '../../contains/color';
import {deleteDataDonation} from '../../database/Dao/DonationDao';
import {deleteDataDonationPayment} from '../../database/Dao/PaymentDao';

const DeleteDonationModal = props => {
  const confirmDelete = async () => {
    const donation_id = props.donation_id;

    await deleteDataDonation (donation_id);
    await deleteDataDonationPayment (donation_id);
    Alert.alert ('Thông báo', 'Xóa phí quỹ đóng góp thành công !');
    navigation.goBack ();
  };

  // buttons structure for modal
  const AndroidButtonBox = () => {
    const buttons = [
      {text: 'Hủy bỏ'},
      {
        text: 'Xác nhận',
        func: () => {
          confirmDelete ();
        },
      },
    ];

    return (
      <View style={styles.androidButtonGroup}>
        {buttons.map ((item, index) => (
          <View key={index} style={[styles.androidButton, {flex: 1}]}>
            <Pressable
              onPress={() => {
                props.setModalVisible (false);
                if (item.func && typeof item.func === 'function') {
                  item.func ();
                }
              }}
              style={[{alignSelf: 'auto'}]}
            >
              <View
                style={[
                  styles.androidButtonInner,
                  styles.button.backgroundColor,
                ]}
              >
                <Text style={styles.button}>{item.text}</Text>
              </View>
            </Pressable>
          </View>
        ))}
      </View>
    );
  };

  return (
    <Modal
      statusBarTranslucent={true}
      animationType="fade"
      transparent={true}
      visible={props.modalVisible}
      onRequestClose={() => {
        props.setModalVisible (false);
      }}
    >
      <Pressable
        style={[styles.androidBackdrop, styles.backdrop]}
        onPress={() => props.setModalVisible (false)}
      />
      <View style={styles.alertBox}>
        <View style={[styles.androidAlertBox, styles.container]}>
          <Text style={styles.title}>{'Thông báo'}</Text>
          <Text style={styles.message}>
            {'Bạn muốn xóa khoản đóng góp này ?'}
          </Text>
          <AndroidButtonBox />
        </View>
      </View>
    </Modal>
  );
};

export default DeleteDonationModal;

const styles = StyleSheet.create ({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  button: {
    color: '#000000',
    fontFamily: 'Roboto',
    fontSize: 16,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    paddingBottom: 8,
  },
  buttonOpen: {
    backgroundColor: COLORS.box,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  androidBackdrop: {
    backgroundColor: '#232f34',
    opacity: 0.4,
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  alertBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  androidAlertBox: {
    maxWidth: 320,
    width: '100%',
    margin: 48,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
  },
  title: {
    margin: 18,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    fontSize: 18,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  message: {
    marginLeft: 24,
    marginRight: 24,
    marginBottom: 24,
    flexDirection: 'row',
    alignSelf: 'center',
    fontSize: 16,
  },
  androidButtonGroup: {
    marginTop: 0,
    marginRight: 24,
    marginBottom: 8,
    marginLeft: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  androidButton: {
    marginTop: 12,
    marginRight: 8,
  },
});

import {SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';
import FamilyTopStack
  from '../../../components/Screens/Families/Top Stack/FamilyTopStack';
import AppBar from '../../../components/Common/AppBar';
import {useContext, useEffect} from 'react';
import {UIContext} from './../../../UIContext';

const InforFamily = ([props, {navigation}]) => {
  // data chinh la item
  const data = props.route.params.data;

  const {setCurrentScreen} = useContext (UIContext);

  useEffect (() => {
    setCurrentScreen ('InforFamily');
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <AppBar
        title="Thông tin hộ gia đình"
        back={true}
        navigation={props.navigation}
      />

      <FamilyTopStack data={data}/>
    </SafeAreaView>
  );
};

export default InforFamily;

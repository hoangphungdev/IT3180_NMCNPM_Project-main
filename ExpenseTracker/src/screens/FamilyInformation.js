import {SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';
import FamilyTopStack
  from '../../components/Screens/Families/Top Stack/FamilyTopStack';
import AppBar from '../../components/Common/AppBar';
import {useContext, useEffect, useState} from 'react';
import {UIContext} from '../../UIContext';
import {fetchCitizensDatabyId} from '../../database/Dao/CitizenDao';
import {fetchHouseHoldDatabyId} from '../../database/Dao/HouseholdDao';
import {fetchUserData} from '../../database/Dao/UserDao';
import Loading from '../../components/Screens/Loading/Loading';
import {useRoute} from '@react-navigation/native';

const FamilyInformation = ({navigation, data}) => {
  const {setCurrentScreen, isAdmin, userId} = useContext (UIContext);
  const [households, setHouseHolds] = useState ([]);
  const [loading, setLoading] = useState (true);
  const [count, setCount] = useState (0);

  if (isAdmin === true) {
    const data = useRoute ().params.data;
    useEffect (
      () => {
        setCurrentScreen ('InforFamily');
        setHouseHolds (data);
        setLoading (false);
      },
      [setCurrentScreen, data]
    ); // Thêm dependency vào useEffect
  } else {
    useEffect (
      () => {
        setCurrentScreen ('InforFamily');
        const fetchData = async () => {
          const usersData = await fetchUserData (userId);

          const citizensData = await fetchCitizensDatabyId (
            usersData.citizen_id
          );
          const householdsData = await fetchHouseHoldDatabyId (
            citizensData.household_id
          );

          const citizensOfHouseHoldsData = await Promise.all (
            householdsData.members.map (async memberId => {
              const citizenData = await fetchCitizensDatabyId (memberId);
              return {citizen: citizenData, address: householdsData.address};
            })
          );
          setHouseHolds (citizensOfHouseHoldsData);
          setLoading (false);
        };
        fetchData ();
      },
      [setCurrentScreen, userId]
    ); // Thêm dependency vào useEffect
  }
  
  return (
    <SafeAreaView style={{flex: 1}}>
      <AppBar
        title="Thông tin hộ gia đình"
        back={true}
        navigation={navigation}
      />
      {loading === true
        ? <Loading state={loading} />
        : <FamilyTopStack data={households} navigation={navigation}/>}
    </SafeAreaView>
  );
};

export default FamilyInformation;

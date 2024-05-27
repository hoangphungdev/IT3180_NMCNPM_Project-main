import { ScrollView, SafeAreaView, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import AppBar from '../../../components/Common/AppBar';
import Search from '../../../components/Common/Search';
import BoxFamilyRestroom
  from '../../../components/Screens/Families/BoxFamilyRestroom';
import { fetchDataHouseHold } from '../../../database/Dao/HouseholdDao';
import { fetchCitizensDatabyId } from '../../../database/Dao/CitizenDao';
import Loading from '../../../components/Screens/Loading/Loading';

const FamilyRestroom = ({ navigation }) => {
  const [households, setHouseHolds] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const householdsData = await fetchDataHouseHold();
        const citizensOfHouseHoldsData = await Promise.all(
          householdsData.map(async household => ({
            citizen: await Promise.all(household.data.members.map(fetchCitizensDatabyId)),
            address: household.data.address,
            household_id: household.id
          }))
        );
        setHouseHolds(citizensOfHouseHoldsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error, "(fetching in FamilyRestroom UI)");
      }
    };
    setLoading(false);
    fetchData();
  }, []);

  const filteredHouseHolds = households.filter(householdObject =>
    householdObject.citizen[0].name
      .toLowerCase()
      .includes(searchValue.toLowerCase())
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AppBar title="Hộ gia đình" back={true} navigation={navigation} />

      <Search
        placeholder="Tên chủ hộ"
        onChangeText={text => setSearchValue(text)}
      />

      {loading === true
        ? <Loading state={loading} />
        : <FlatList
          style={{ height: '73%' }}
          data={filteredHouseHolds}
          renderItem={({ item }) => (
            <BoxFamilyRestroom
              navigation={navigation}
              data={item}
            />
          )}
        />}

    </SafeAreaView>
  );
};

export default FamilyRestroom;

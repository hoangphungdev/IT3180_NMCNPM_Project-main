import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";
import React, { useContext } from "react";
import { UIContext } from "../../../UIContext";
import AppBar from "../../../components/Common/AppBar";
import Search from "../../../components/Common/Search";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import COLORS from "../../../contains/color";
import styleApp from "../../../components/styleApp";
import { useState, useEffect } from "react";
import { fetchDataCitizen } from "../../../database/Dao/CitizenDao";
import { fetchDataCitizenAndId } from "../../../database/Dao/CitizenDao";
import Loading from "../../../components/Screens/Loading/Loading";

const screenWidth = Dimensions.get("window").width;

const BoxManageCitizen = (props) => {
  const { setCitizen, setIdPerson } = useContext(UIContext);
  const data = props.data;
  const id = props.id;

  return (
    <TouchableOpacity
      style={styleApp.box}
      onPress={() => {
        setCitizen(data);
        props.navigation.navigate("PersonalInformation", {
          data: data, id: id
        });
        setIdPerson(props.id);
      }}
    >
      <View style={{ width: screenWidth * 0.7 }}>
        <View style={styles.aroundTopic}>
          <Text style={styles.topic}>Họ và tên: </Text>
          <Text style={styles.content}>{data.name}</Text>
        </View>

        <View style={styles.aroundTopic}>
          <Text style={styles.topic}>Giới tính: </Text>
          <Text style={styles.content}>{data.gender}</Text>
        </View>

        <View style={styles.aroundTopic}>
          <Text style={styles.topic}>Ngày sinh: </Text>
          <Text style={styles.content}>{data.birth}</Text>
        </View>

        <View style={styles.aroundTopic}>
          <Text style={styles.topic}>Số CCCD/CMND: </Text>
          <Text style={styles.content}>{data.ID_card_number}</Text>
        </View>

        <View style={styles.aroundTopic}>
          <Text style={styles.topic}>Địa chỉ thường trú: </Text>
          <Text style={styles.content}>{data.address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const ManageCitizens = ({ navigation }) => {
  const [citizens, setCitizens] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const citizensData = await fetchDataCitizenAndId();
      setCitizens(citizensData);
      setLoading(false);
    };
    fetchData();
  }, []);

  const filteredCitizens = citizens.filter((citizen) =>
    citizen.data.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AppBar title="Quản lý dân cư" back={true} navigation={navigation} />

      <Search
        placeholder="Tên dân cư"
        onChangeText={(text) => setSearchValue(text)}
      />
      {
        loading === true ? (
          <Loading state={loading} />
        ) : (
          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            keyboardDismissMode="on-drag"
            style={{ height: 550 }}
          >
            {filteredCitizens.map((item, index) => {
              return (
                <View key={index}>
                  <BoxManageCitizen
                    navigation={navigation}
                    data={item.data}
                    id={item.id}
                  />
                </View>
              );
            })}

          </ScrollView>
        )
      }
    </SafeAreaView>
  );
};

export default ManageCitizens;

const styles = StyleSheet.create({
  topic: {
    fontWeight: "bold",
    fontSize: 15,
  },
  content: {
    paddingRight: 20,
    fontSize: 15,
  },
  aroundTopic: {
    flexDirection: "row",
    marginBottom: 9,
    paddingRight: 30,
  },
});

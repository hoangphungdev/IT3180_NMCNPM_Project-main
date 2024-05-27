import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  ScrollView,
  ScrollViewPropsAndroid,
  ScrollViewBase,
} from "react-native";
import React, { useEffect, useState } from "react";
import BoxFamilyRestroom from "../../../../components/Screens/Families/BoxFamilyRestroom";
import BoxFamilyMember from "../../../../components/Screens/Families/BoxFamilyMember";
import COLORS from "../../../../contains/color";
import { FlatList } from "react-native-gesture-handler";
import Loading from "../../Loading/Loading";

const windowWidth = Dimensions.get("window").width;
const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("window").height;

const InformationFamily = (props) => {
  const [loading, setLoading] = useState(true);
  const data = props.data;

  return (
    <ScrollView>
      <View>
        <BoxFamilyRestroom
          data={data[0]}
          disabled={true}
          bug={true}
          number={data.length}
        />

        <View>
          <View style={styles.ListHeaderComponent}>
            <Text style={styles.textTitleList}>Danh sách thành viên</Text>
          </View>

          {data.map((item, index) => {
            return (
              <View key={index}>
                <BoxFamilyMember data={item.citizen} index={index} disabled={true}/>
              </View>
            );
          })}

          <View style={styles.ListFooterComponent} />
        </View>
      </View>
    </ScrollView>
  );
};

export default InformationFamily;

const styles = StyleSheet.create({
  ListFooterComponent: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopColor: COLORS.white,
    borderBottomColor: COLORS.box,
    borderLeftColor: COLORS.box,
    borderRightColor: COLORS.box,
    borderWidth: 1,
    height: 40,
    backgroundColor: COLORS.box,
    marginHorizontal: windowWidth * 0.11,
  },
  ListHeaderComponent: {
    marginTop: 15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: COLORS.box,
    marginHorizontal: screenWidth * 0.11,
    alignItems: "center",
    paddingVertical: 10,
  },
  textTitleList: {
    fontWeight: "bold",
    fontSize: 15,
  },
});

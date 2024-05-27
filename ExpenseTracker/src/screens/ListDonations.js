import { View, Text, SafeAreaView, Dimensions, StyleSheet } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import AppBar from "../../components/Common/AppBar";
import BoxDonation from "../../components/Screens/Donations/BoxDonation";
import COLORS from "../../contains/color";
import BoxListDonations from "../../components/Screens/Donations/BoxListDonations";
import { UIContext } from "../../UIContext";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { fetchHouseHoldDatabyId } from "../../database/Dao/HouseholdDao";
import { fetchCitizensDatabyId } from "../../database/Dao/CitizenDao";
import DeleteDonationModal from "../../components/Modals/DeleteDonationModal";
import { formatMoney } from "../../utils/moneyFormatter";
import Loading from "../../components/Screens/Loading/Loading";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const ListDonations = (props) => {
  const { isAdmin, setCategoryData } = useContext(UIContext);
  const [households, setHouseholds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const data = props.route.params.item;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const householdsPromises = data.donation_payments.map(
        async (donation_payment) => {
          const householdData = await fetchHouseHoldDatabyId(
            donation_payment.household_id
          );
          const headOfHouseholdData = await fetchCitizensDatabyId(
            householdData.members[0]
          );
          return {
            headOfHousehold: headOfHouseholdData,
            amount: donation_payment.amount,
          };
        }
      );
      const households = await Promise.all(householdsPromises);
      setHouseholds(households);
      // get data for donation
      const donationData = {
        id: data.donation.id,
        name: data.donation.data.category,
        description: data.donation.data.description,
        timeStart: data.donation.data.create_date,
        timeEnd: data.donation.data.payment_due_date,
      };
      setCategoryData(donationData);
      setLoading(false);
    };
    fetchData();
  }, []);

  // invoke the delete modal
  const confirmDeleteDonation = () => {
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AppBar
        title="Quỹ đóng góp"
        back={true}
        delete={isAdmin}
        navigation={props.navigation}
        func={() => confirmDeleteDonation()}
      />

      <DeleteDonationModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        donation_id={data.donation.id}
      />

      <ScrollView >
        <BoxDonation
          title={data.donation.data.category}
          totalMoney={formatMoney(data.donation.data.total)}
          time={
            data.donation.data.create_date +
            " - " +
            data.donation.data.payment_due_date
          }
          number={data.donation_payments.length}
          disabled={true}
          description={data.donation.data.description}
        />

        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              width: screenWidth * 0.65,
              alignItems: "center",
              justifyContent: "center",
              height: screenHeight * 0.05,
              backgroundColor: COLORS.border,
            }}
          >
            <Text style={styles.text}>Hộ gia đình</Text>
          </View>

          <View style={{ width: 1 }} />

          <View
            style={{
              width: screenWidth * 0.35,
              alignItems: "center",
              justifyContent: "center",
              height: screenHeight * 0.05,
              backgroundColor: COLORS.border,
            }}
          >
            <Text style={styles.text}>Số tiền</Text>
          </View>
        </View>

        {loading ? (
          <Loading state={loading}/>
        ) : (
          households.map((item, index) => (
            <View key={index}>
              <BoxListDonations
                leaderHouse={item.headOfHousehold.name}
                phone={item.headOfHousehold.phone}
                index={index + 1}
                total={formatMoney(item.amount)}
              />
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ListDonations;

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    fontWeight: "bold",
    color: COLORS.white,
  },
});

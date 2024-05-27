import { SafeAreaView, FlatList, ScrollView, View } from "react-native";
import React from "react";
import AppBar from "./../../components/Common/AppBar";
import Search from "./../../components/Common/Search";
import BoxDonation from "../../components/Screens/Donations/BoxDonation";
import { useState, useEffect } from "react";
import Loading from "../../components/Screens/Loading/Loading";
import { fetchDataDonation } from "../../database/Dao/DonationDao";
import { fetchDataDonationPayment } from "../../database/Dao/PaymentDao";
import { formatMoney } from "../../utils/moneyFormatter";

const Donation = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [donations, setDonations] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const donationsData = await fetchDataDonation();
      const donation_paymentsDataPromises = donationsData.map(
        async (donation) => {
          const donation_paymentsData = await fetchDataDonationPayment(
            donation.id
          );
          return {
            donation: donation,
            donation_payments: donation_paymentsData,
          };
        }
      );
      const paymentsOfDonationsData = await Promise.all(
        donation_paymentsDataPromises
      );

      setDonations(paymentsOfDonationsData);
      setLoading(false);
    };
    fetchData();
  }, []);

  const filteredDonations = donations.filter((donation) =>
    donation.donation.data.category
      .toLowerCase()
      .includes(searchValue.toLowerCase())
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AppBar title="Quỹ đóng góp" back={true} navigation={navigation} />

      <Search
        placeholder="Tên quỹ đóng góp"
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
          >
            {filteredDonations.map((item, index) => {
              return (
            <View key={index}>
              <BoxDonation
                item={item}
                title={item.donation.data.category}
                totalMoney={formatMoney(item.donation.data.total)}
                time={
                  item.donation.data.create_date +
                  " - " +
                  item.donation.data.payment_due_date
                }
                number={item.donation_payments.length}
                navigation={navigation}
                description={item.donation.data.description}
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

export default Donation;

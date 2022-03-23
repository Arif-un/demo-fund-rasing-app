import { collection, getDocs, query, where } from "firebase/firestore";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { Appbar, Button, IconButton } from "react-native-paper";
import TopBar from "../components/TopBar";
import { db } from "../firebaseConfig";
import { useState, useEffect } from "react";
import StatusCard from "../components/StatusCard";
import { Image } from "react-native";

export default function DonorList() {
  const [refetchData, setRefetchData] = useState(false)

  useEffect(async () => {
    const data = []
    const usersDetails = await getDocs(collection(db, 'userDetails'))
    usersDetails.forEach(doc => {
      data.push({ ...doc.data(), id: doc.id })
    })
    // setCharities(data)
  }, [refetchData])

  return (
    <>
      <TopBar title="Donor List" />
      <ScrollView style={{ flex: 1 }}>
        <View style={s.donorCard}>
          <View style={s.profileWrp}>
            <Image
              style={s.profileImg}
              source={{ uri: 'https://www.slazzer.com/static/images/home-page/banner-transparent-bg.jpg' }}
            />
            <View>
              <Text style={{ fontSize: 16 }}>Adasd asd sdasd</Text>
              <Text style={{ fontSize: 14, fontFamily: 'Poppins-Bold' }}>2000 Tk</Text>
              <Text style={{ fontSize: 12, borderRadius: 5, backgroundColor: '#e7ebee', width: 50, padding: 3 }}>Card</Text>
            </View>
          </View>
          <View></View>
        </View>
      </ScrollView>
    </>
  )
}
const s = StyleSheet.create({
  donorCard: {
    borderWidth: 2,
    borderColor: '#e2e9f3',
    padding: 10,
    width: '85%',
    marginRight: 'auto',
    marginLeft: 'auto',
    borderRadius: 20,
    marginBottom: 10
  },
  profileImg: {
    borderRadius: 50,
    width: 70,
    height: 70,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#e2e9f3'
  },
  profileWrp: {
    flexDirection: 'row',
    alignItems: 'center'
  }
})

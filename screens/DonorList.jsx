import { collection, getDocs, query, where } from "firebase/firestore";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { Appbar, Button, IconButton } from "react-native-paper";
import TopBar from "../components/TopBar";
import { auth, db } from "../firebaseConfig";
import { useState, useEffect } from "react";
import StatusCard from "../components/StatusCard";
import { Image } from "react-native";
import { useParams } from "react-router-native";
import { onAuthStateChanged } from "firebase/auth";

export default function DonorList() {
  const { id } = useParams()
  const [donors, setDonors] = useState([])

  useEffect(async () => {
    onAuthStateChanged(auth, async user => {
      if (!user) {
        navigate("/login")
      }
      console.log(user.uid)
      const data = []
      const q = query(collection(db, 'donations'), where('charityId', '==', user.uid))
      const usersDetails = await getDocs(q)
      usersDetails.forEach(doc => {
        data.push({ ...doc.data(), id: doc.id })
      })
      setDonors(data)
    })

  }, [])

  return (
    <>
      <TopBar title="Donor List" />
      <ScrollView style={{ flex: 1 }}>

        {!donors.length && <Text style={{ textAlign: 'center', fontSize: 20 }}>No data found.</Text>}

        {donors.map(donor => (
          <View style={s.donorCard}>
            <View style={s.profileWrp}>
              <Image
                style={s.profileImg}
                source={{ uri: donor.img }}
              />
              <View>
                <Text style={{ fontSize: 16 }}>{donor.donor}</Text>
                <Text style={{ fontSize: 14, fontFamily: 'Poppins-Bold' }}>{donor.amount} Tk</Text>
                <Text style={{
                  fontSize: 11,
                  borderRadius: 5,
                  backgroundColor: '#e7ebee',
                  width: 40,
                  paddingVertical: 2,
                  paddingHorizontal: 4,
                  textAlign: 'center'
                }}>{donor.method}</Text>
              </View>
            </View>
            <View>
              <Text style={{ color: '#757575' }}>{donor.date}</Text>
              <Text style={{ fontSize: 10, color: '#8b8b8b' }}>{donor.time}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </>
  )
}
const s = StyleSheet.create({
  donorCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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

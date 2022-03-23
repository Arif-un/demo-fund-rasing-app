import { collection, getDocs, query, where } from "firebase/firestore";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { Appbar, Button, IconButton } from "react-native-paper";
import TopBar from "../components/TopBar";
import { db } from "../firebaseConfig";
import { useState, useEffect } from "react";
import StatusCard from "../components/StatusCard";

export default function CharityApproval() {
  const [charities, setCharities] = useState([])
  const [refetchData, setRefetchData] = useState(false)
  useEffect(async () => {
    const data = []
    const usersDetails = await getDocs(collection(db, 'userDetails'))
    usersDetails.forEach(doc => {
      data.push({ ...doc.data(), id: doc.id })
    })
    setCharities(data)
  }, [refetchData])

  return (
    <>
      <TopBar title="Charity Status List" />
      <ScrollView style={{ flex: 1 }}>
        {charities.map((itm, i) => (
          <StatusCard
            key={`lc-${i + 9}`}
            img={itm.img}
            title={itm.name}
            subTitle={itm.slogan}
            status={itm.status}
            description={itm.description}
            location={itm.location}
            phone={itm.phone}
            id={itm.id}
            action={() => setRefetchData(!refetchData)}
          />
        ))}
      </ScrollView>
    </>
  )
}
const s = StyleSheet.create({
  container: {
    flex: 1,
  }
})

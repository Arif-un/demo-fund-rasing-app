import { useEffect, useState } from "react";
import { View, StyleSheet, Image, Text, Touchable } from "react-native"
import { Badge, Button, Divider, IconButton, TouchableRipple } from "react-native-paper"
// import * as Font from 'expo-font';

import { useFonts } from '@expo-google-fonts/inter'
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";


export default function StatusCard({
  img,
  title,
  subTitle,
  status,
  description,
  location,
  phone,
  id,
  action
}) {
  let [fontLoading] = useFonts({ 'Poppins_Bold': require('../assets/fonts/Poppins-Bold.ttf') });

  if (!fontLoading) return <Text>Loading...</Text>

  const handleStatus = (id, status) => async () => {
    const docRef = doc(db, 'userDetails', id)
    await updateDoc(docRef, { status })
    action()
  }

  return (
    <TouchableRipple style={s.cardWrp} borderless onPress={() => { }}>
      <View style={s.card} >
        <Image
          style={s.cardImg}
          source={{ uri: img }}
        />
        <View style={s.cardContent}>
          <Text style={s.cardTitle}>{title}</Text>
          <Text style={s.cardSubTitle}>
            {subTitle}
          </Text>

          <View style={{ marginVertical: 5 }} />
          <Text style={s.desc}>{description}</Text>
          <View style={{ marginVertical: 5 }} />
          <Text>{phone}</Text>
          <Text>{location}</Text>

          <View style={s.statusWrapper}>
            <View style={s.statusBadge}>
              <View style={{ ...s.badge, backgroundColor: status === 'active' ? '#00e078' : '#fceb08' }} />
              <Text>{status.toUpperCase()}</Text>
            </View>

            <View style={s.btnWrapper}>
              <IconButton onPress={handleStatus(id, 'pending')} icon='close' color="#ffc31de1" accessibilityLabel="Pending" />
              <IconButton onPress={handleStatus(id, 'active')} icon='check' color="#56d800" accessibilityLabel="Approve" />
            </View>
          </View>
          <Divider />

        </View>
      </View>
    </TouchableRipple>
  )
}


const s = StyleSheet.create({
  cardWrp: {
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 25,
    marginVertical: 10
  },
  card: {
    width: '100%',
    borderRadius: 25,
    borderColor: '#eaeff8',
    borderWidth: 1,
    flexDirection: 'row',
    // alignItems: 'center',
    padding: 10,
    backgroundColor: '#f6fbff'
  },
  cardContent: {
    // width: 'calc(100% - 80px)',
  },
  cardImg: {
    height: 100,
    width: 80,
    borderColor: '#d1d1d1',
    borderWidth: 1,
    borderRadius: 16,
    marginRight: 10
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Poppins_Bold',
    color: '#002352'
  },
  cardSubTitle: {
    width: '80%',
    color: '#2a4972'
  },
  cardButton: {
    fontSize: 10,
    width: 150,
    marginTop: 10,
    padding: 0,
  },
  statusWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '40%',
  },
  btnWrapper: {
    flexDirection: 'row',
  },
  statusBadge: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  badge: {
    width: 10,
    height: 10,
    borderRadius: 10,
    marginRight: 10
  },
  desc: {
    width: '35%'
  }
})


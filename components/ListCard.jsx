import { useEffect, useState } from "react";
import { View, StyleSheet, Image, Text, Touchable } from "react-native"
import { Button, TouchableRipple } from "react-native-paper"
// import * as Font from 'expo-font';

import { useFonts } from '@expo-google-fonts/inter'
import { useNavigate } from "react-router-native";


export default function ListCard({ img, title, subTitle, id,userUid, balance, goal }) {
  let [fontLoading] = useFonts({ 'Poppins_Bold': require('../assets/fonts/Poppins-Bold.ttf') });
  const nav = useNavigate()

  if (!fontLoading) return <Text>Loading...</Text>

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
          <Button
            onPress={() => { nav(`charity-details/${userUid}`) }}
            style={s.cardButton}
            compact
            mode="outlined"
            icon="currency-usd"
          >
            Donate Now
          </Button>
          {goal && (
            <View style={s.progressBar}>
              <View style={{ ...s.progress, width: `${Math.floor((Number(balance) / Number(goal)) * 100)}%` }} />
              <Text style={s.processText}>{balance}</Text>
              <Text style={{ ...s.processText, textAlign: 'right' }}>/ {goal}</Text>
            </View>
          )}
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
    height: 140,
    borderColor: '#eaeff8',
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f6fbff'
  },
  cardContent: {
    // width: 'calc(100% - 80px)',
  },
  cardImg: {
    height: 120,
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
  progressBar: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    height: 15,
    borderRadius: 10,
    width: '75%',
    position: 'relative',
    backgroundColor: '#d4d4d4'
  },
  progress: {
    position: 'absolute',
    width: '80%',
    height: 15,
    backgroundColor: '#00b7ff',
    borderRadius: 10,
  },
  processText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 2,
    marginLeft: 5
  }
})


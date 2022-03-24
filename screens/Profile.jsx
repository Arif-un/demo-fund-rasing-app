import { TextInput, Button } from "react-native-paper"
import { StyleSheet, Text, View, Image, Slider } from "react-native"
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-native"
import { collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore"
import { auth, db } from "../firebaseConfig"
import { async } from "@firebase/util"
import TopBar from "../components/TopBar"
import { onAuthStateChanged } from "firebase/auth"

export default function Profile({ userId }) {
  const [form, setForm] = useState({})
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleProfileUpdate = async () => {
    setLoading(true)
    const docRef = doc(db, 'userDetails', form.id)
    await updateDoc(docRef, form)
    setLoading(false)
  }

  useEffect(async () => {
    onAuthStateChanged(auth, user => {
      if(!user) {
        navigate("/login")
      }
    })
    const q = query(collection(db, 'userDetails'), where('userUid', '==', userId))
    const userDetails = await getDocs(q)

    const userDetail = userDetails.docs?.[0]?.data()
    const id = userDetails?.docs?.[0]?.id
    setForm({ ...userDetail, id })
    return () => {
      setForm({})
    }


  }, [])
  return (
    <>
      <TopBar title="Profile" color="#00b7ff" />
      <View>
        <View style={s.bg} />
        <Image
          style={s.profileImg}
          source={{ uri: form.img }}
        />

        <View style={s.inputsWrapper}>

          <Text style={{
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 10,
            marginTop: 10,
            textAlign: 'center',
          }}>Fund: {form.balance}</Text>

          <TextInput
            label="Name of Charity"
            value={form.name}
            dense
            left={<TextInput.Icon name="hand-heart" />}
            onChangeText={text => setForm({ ...form, name: text })}
            mode="outlined"
          />
          <TextInput
            label="Slogan"
            value={form.slogan}
            mode="outlined"
            dense
            left={<TextInput.Icon name="format-text" />}
            onChangeText={text => setForm({ ...form, slogan: text })}
          />
          <TextInput
            label="Description"
            value={form.description}
            mode="outlined"
            dense
            multiline
            numberOfLines={3}
            left={<TextInput.Icon name="playlist-edit" />}
            onChangeText={text => setForm({ ...form, description: text })}
          />
          <TextInput
            label="Location"
            value={form.location}
            mode="outlined"
            dense
            left={<TextInput.Icon name="map-marker" />}
            onChangeText={text => setForm({ ...form, location: text })}
          />
          <TextInput
            label="Phone"
            value={form.phone}
            mode="outlined"
            dense
            left={<TextInput.Icon name="phone" />}
            onChangeText={text => setForm({ ...form, phone: text })}
          />
          <TextInput
            label="Fund Raise Goal"
            value={form.goal}
            mode="outlined"
            dense
            left={<TextInput.Icon name="currency-bdt" />}
            onChangeText={text => setForm({ ...form, goal: text })}
          />
          {/* <Slider /> */}

          <Button
            loading={loading}
            onPress={handleProfileUpdate}
            style={{ marginTop: 12 }}
            mode="contained"
          >
            Update Profile
          </Button>
        </View>
      </View>
    </>
  )
}
const s = StyleSheet.create({
  bg: {
    backgroundColor: "#00b7ff",
    height: 100,
  },
  profileImg: {
    width: 150,
    height: 150,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: '#fff',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: -50,
  },
  inputsWrapper: {
    marginTop: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '80%'
  }
})
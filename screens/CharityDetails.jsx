import { TextInput, Button, TouchableRipple, IconButton, Snackbar } from "react-native-paper"
import { StyleSheet, Text, View, Image, } from "react-native"
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from "react-router-native"
import { addDoc, collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore"
import { db, donationsCollection } from "../firebaseConfig"
import { async } from "@firebase/util"
import TopBar from "../components/TopBar"
import { ScrollView } from "react-native"
import donor from '../components/donor.json'

export default function CharityDetails() {
  const [form, setForm] = useState({})
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const random = Math.floor(Math.random() * 5)
  const donorData = donor[random]
  const [showSuccess, setShowSuccess] = useState(false)
  const { id: userId } = useParams()

  useEffect(() => {
    if (showSuccess) {
      setTimeout(() => {
        setShowSuccess(false)
      }, 1000)
    }
  }, [])

  const donate = async () => {
    setLoading(true)
    await addDoc(donationsCollection, {
      charityId: userId,
      amount: form.donationAmount,
      ...donorData
    })
    const docRef = doc(db, 'userDetails', form.id)
    await updateDoc(docRef, { balance: Number((form.balance) || 0) + Number(form.donationAmount) })
    setShowSuccess(true)
    setLoading(false)
  }

  useEffect(async () => {
    const q = query(collection(db, 'userDetails'), where('userUid', '==', userId))
    const userDetails = await getDocs(q)

    const userDetail = userDetails.docs?.[0]?.data()
    const id = userDetails?.docs?.[0]?.id
    setForm({ ...userDetail, id })
    // setForm(userDetails.data() || {})
    // console.log(userDetails.data())
    return () => {
      setForm({})
    }
  }, [])

  return (
    <>
      <TopBar title="Profile" color="#00b7ff" />
      <ScrollView>
        <View>
          <View style={s.bg} />
          <Image
            style={s.profileImg}
            source={{ uri: form.img }}
          />

          <View style={s.inputsWrapper}>

            <Text style={{ ...s.txtCenter, ...s.name }} >{form.name}</Text>
            <Text style={{ ...s.txtCenter, ...s.slogan }} >{form.slogan}</Text>
            <Text style={{ ...s.txtCenter, ...s.detail }} >{form.description}</Text>
            <Text style={s.txtCenter} >{form.location}</Text>
            <Text style={s.txtCenter} >{form.phone}</Text>

            <Text style={{ ...s.txtCenter, ...s.title }}>Donation Amount</Text>
            <View style={s.btnWrp}>
              {[100, 200, 400, 800, 1000, 2000, 4000, 6000, 8000].map(amount => (
                <TouchableRipple
                  key={amount}
                  borderless
                  onPress={() => setForm({ ...form, donationAmount: amount })}
                  style={[s.btn, form.donationAmount === amount && s.btnActive]}
                >
                  <Text style={[s.txtCenter, s.btnChild, form.donationAmount === amount && s.txtActive]}>{amount}</Text>
                </TouchableRipple>
              ))}
            </View>

            <TextInput
              label="Amount"
              value={form.donationAmount?.toString()}
              mode="outlined"
              left={<TextInput.Icon name="hand-heart" />}
              onChangeText={text => setForm({ ...form, donationAmount: text })}
              style={{ ...s.txtCenter, ...s.input }}
            />

            <IconButton
              icon={loading ? 'dots-horizontal' : 'send'}
              onPress={donate}
              style={s.sendBtn}
            />

            <Snackbar
              onDismiss={() => setShowSuccess(false)}
              visible={showSuccess}
            >
              Donation Successfull.
            </Snackbar>

          </View>
        </View>
      </ScrollView>
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
    width: '80%',
  },
  txtCenter: {
    textAlign: 'center',
  },
  name: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
  },
  slogan: {
    fontSize: 18
    // fontFamily:'Poppins-Semi-Bold',
  },
  detail: {
    marginTop: 5,
    color: '#5e5e5e',
    fontSize: 14,
    marginBottom: 10
  },
  title: {
    color: '#919191',
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    marginTop: 15
  },
  btnWrp: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 10,
    flexWrap: 'wrap',
  },
  btn: {
    width: '30%',
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  btnActive: {
    color: '#fff',
    backgroundColor: '#0051ff',
    borderColor: '#00b7ff',
  },
  btnChild: {
    borderWidth: 1,
    borderColor: '#919191',
    width: '100%',
    height: '100%',
    borderRadius: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 18,
    lineHeight: 45
  },
  sendBtn: {
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: '#28a8fd',
    transform: [{
      rotate: '-45deg'
    }],
    color: '#fff',
    borderWidth: 2,
    borderColor: '#00ffb3',
  }
})
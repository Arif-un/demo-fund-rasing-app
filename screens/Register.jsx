import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { Link, useNavigate } from "react-router-native";
import { createUserWithEmailAndPassword, db, getAuth, onAuthStateChanged } from "firebase/auth"
import { addDoc } from "firebase/firestore";
import { auth, userDetailsCollection } from "../firebaseConfig";

const d = [
  {
    name: 'The Human Foundation',
    slogan: 'Help homless and poor family, and help the community',
    description: 'This platform is dedicated to providing you with the tools you need to raise money for whatever your cause may be.',
    phone: '8801800004455',
    location: 'Dhaka, BD',
    role: 'user',
    status: 'pending',
    userUid: 'aj13DVAHxmbqifBQtciz5sNLerB2',
  },
  {
    name: 'Feed the Babies',
    slogan: 'Help homless and poor family, and help the community',
    description: 'This platform is dedicated to providing you with the tools you need to raise money for whatever your cause may be.',
    phone: '8801800004455',
    location: 'Dhaka, BD',
    role: 'user',
    status: 'pending',
    userUid: 'bLkvel2NohORiGl4fGhj2kMldmg2',
  },
  {
    name: 'Save the Community',
    slogan: 'Help homless and poor family, and help the community',
    description: 'This platform is dedicated to providing you with the tools you need to raise money for whatever your cause may be.',
    phone: '8801800004455',
    location: 'Chittagong, BD',
    role: 'user',
    status: 'pending',
    userUid: 'WrqOuA4NyESnyEuPaYckW3TtVfC2',
  },
  {
    name: 'Sisters of Charity',
    slogan: 'Help homless and poor family, and help the community',
    description: 'This platform is dedicated to providing you with the tools you need to raise money for whatever your cause may be.',
    phone: '8801800004455',
    location: 'Chittagong, BD',
    role: 'user',
    status: 'pending',
    userUid: 'fXLZdQbVhscj0reRL91Usd6PoPf1',
  },
  {
    name: 'Helping Hands Club',
    slogan: 'Help homless and poor family, and help the community',
    description: 'This platform is dedicated to providing you with the tools you need to raise money for whatever your cause may be.',
    phone: '8801800004455',
    location: 'Wall Street, USA',
    role: 'user',
    status: 'pending',
    userUid: 'LGiPXSiRmFTvD2xh0XZNAB56WAw2',
  },
  {
    name: 'Fortune Found',
    slogan: 'Help homless and poor family, and help the community',
    description: 'This platform is dedicated to providing you with the tools you need to raise money for whatever your cause may be.',
    phone: '8801800004455',
    location: 'Wall Street, USA',
    role: 'user',
    status: 'pending',
    userUid: 's2E6vRooUpNX07fJ6sxTAQb6n693',
  },
  {
    name: 'Donation Nation',
    slogan: 'Help homless and poor family, and help the community',
    description: 'This platform is dedicated to providing you with the tools you need to raise money for whatever your cause may be.',
    phone: '8801800004455',
    location: 'Dhaka, BD',
    role: 'user',
    status: 'pending',
    userUid: 'BVyCYoBiorQoE4vHztaut7oq37S2',
  },
  {
    name: 'Worthy Wellness',
    slogan: 'Help homless and poor family, and help the community',
    description: 'This platform is dedicated to providing you with the tools you need to raise money for whatever your cause may be.',
    phone: '8801800004455',
    location: 'Chittagong, BD',
    role: 'user',
    status: 'pending',
    userUid: 'mvD90lyklLXj3Mx5YvgqNDrYq2J3',
  },
  {
    name: 'Wonder Foundation',
    slogan: 'Help homless and poor family, and help the community',
    description: 'This platform is dedicated to providing you with the tools you need to raise money for whatever your cause may be.',
    phone: '8801800004455',
    location: 'Wall Street, USA',
    role: 'user',
    status: 'pending',
    userUid: 'I1E5pCE7ADciBrVtgeisUlJ9K3Y2',
  },
  {
    name: 'Benefit Aid',
    slogan: 'Help homless and poor family, and help the community',
    description: 'This platform is dedicated to providing you with the tools you need to raise money for whatever your cause may be.',
    phone: '8801800004455',
    location: 'Chittagong, BD',
    role: 'user',
    status: 'pending',
    userUid: 'Bawcd4Bga7VaENNGIuvdEZCViwj1',
  },
  {
    name: 'Donation Dash',
    slogan: 'Help homless and poor family, and help the community',
    description: 'This platform is dedicated to providing you with the tools you need to raise money for whatever your cause may be.',
    phone: '8801800004455',
    location: 'Wall Street, USA',
    role: 'user',
    status: 'pending',
    userUid: '8ij7uHy2bFaOGgjkFa82wtMIgpW2',
  },
  {
    name: 'Foundation Fantasy',
    slogan: 'Help homless and poor family, and help the community',
    description: 'This platform is dedicated to providing you with the tools you need to raise money for whatever your cause may be.',
    phone: '8801800004455',
    location: 'Dhaka, BD',
    role: 'user',
    status: 'pending',
    userUid: 'gBoMdG9PUSYzdzfPl3ViZPzZasg2',
  },
  {
    name: 'Lasting Foundation',
    slogan: 'Help homless and poor family, and help the community',
    description: 'This platform is dedicated to providing you with the tools you need to raise money for whatever your cause may be.',
    phone: '8801800004455',
    location: 'Chittagong, BD',
    role: 'user',
    status: 'pending',
    userUid: 'powWFScetYaBtJOSxmx8EllnyOI3',
  },
  {
    name: 'Giving Hand',
    slogan: 'Help homless and poor family, and help the community',
    description: 'This platform is dedicated to providing you with the tools you need to raise money for whatever your cause may be.',
    phone: '8801800004455',
    location: 'Chittagong, BD',
    role: 'user',
    status: 'pending',
    userUid: 'sudxFqPHjOPedYLSKE0Iw4PfCik1',
  },
]

const img = [
  'https://cdn.downtoearth.org.in/uploads/0.51881800_1447151770_poverty.jpg',
  'https://images.squarespace-cdn.com/content/v1/55caa6b6e4b0b9a7ca485045/1479410086119-AZ8FSHFS6MRXUDJ3JEC6/image-asset.jpeg?format=500w',
  'https://image.shutterstock.com/image-vector/people-throw-gold-coins-into-260nw-1336223207.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzbqCI0X0NTidPitnBa0XJwqiSMnvWes5ZIw&usqp=CAU',
  'https://i.ytimg.com/vi/2rTZ9UndNeI/maxresdefault.jpg',
  'https://www.lovesove.com/wp-content/uploads/2021/04/Laughter-Day-Messages-Lovesove.jpg',
  'https://thumbs.dreamstime.com/b/concept-charity-food-poor-life-problems-hunger-society-helping-people-kindness-hands-beggars-receive-donated-149442931.jpg',
  'https://static.vecteezy.com/system/resources/previews/003/498/818/large_2x/woman-holding-red-heart-love-health-insurance-donation-happy-charity-volunteer-world-mental-health-day-world-heart-day-valentine-s-day-free-photo.jpg',
  'https://media.gettyimages.com/vectors/caring-and-loving-hand-vector-id1368410837?s=612x612',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBuOJwLRU74MNWUThw3EY5N-Jpw2IkrJirJw&usqp=CAU',
  'https://www.wesleymission.org.au/wp-content/uploads/2021/06/One-off-donation-1.jpg',
  'https://previews.123rf.com/images/dreamcreation01/dreamcreation011805/dreamcreation01180502092/101735916-happy-kid-cartoon-standing-around-the-world.jpg',
  'https://i.pinimg.com/originals/75/38/8d/75388da785e0a7363325eb11d05a4c1b.jpg',
  'https://thumbs.dreamstime.com/b/cartoon-kids-save-earth-saving-ecology-concept-51148129.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_5dO9ZJIqUNr7vOQMftF74vSR_zoMA5WPIg&usqp=CAU',
  'https://lirp.cdn-website.com/74fc01d3/dms3rep/multi/opt/PJ+1-1-0a93b4d0-640w.png'
]

export default function Registerr() {
  const [form, setForm] = useState({})
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        navigate("/")
      }
    })
  }, [])

  const handleRegister = async () => {
    try {
      d.forEach(async (itm, i) => {
        const docRef = await addDoc(userDetailsCollection, {
          userUid: itm.userUid || '',
          name: itm.name || '',
          slogan: itm.slogan || '',
          description: itm.description || '',
          location: itm.location || '',
          phone: itm.phone || '',
          role: 'user',
          status: 'pending',
          img: img[i] || '',
        })
      })

      setLoading(false)
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      setLoading(false)
      console.error("Error adding document: ", e);
    }

    // if (form.password !== form.confirmPassword) return alert('Password not match')
    // setLoading(true)
    // createUserWithEmailAndPassword(auth, 'asdsaddnnasdssasa@mailsac.com', 'adsdasda')
    //   .then(async (userCredential) => {
    //     try {
    //       const docRef = await addDoc(userDetailsCollection, {
    //         userUid: userCredential.user.uid || '',
    //         name: form.name || '',
    //         slogan: form.slogan || '',
    //         description: form.description || '',
    //         location: form.location || '',
    //         phone: form.phone || '',
    //         role: 'user',
    //         status: 'pending'
    //       });
    //       setLoading(false)
    //       console.log("Document written with ID: ", docRef.id);
    //     } catch (e) {
    //       setLoading(false)
    //       console.error("Error adding document: ", e);
    //     }
    //   })
    //   .catch((error) => {
    //     setLoading(false)
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     console.log('-- register error', errorCode, errorMessage)
    //   });
  }

  return (
    <>
      <Button
        style={{ position: 'absolute', top: 30, left: 0 }}
        compact
        icon="arrow-left"
        onPress={() => navigate('/')}
      >
        Back
      </Button>
      <View style={s.container}>
        <Image source={require('../assets/logo.png')} style={s.logo} />
        <Text style={s.slogan}>Charity Registration</Text>

        <TextInput
          label="Name of Charity"
          value={form.name}
          mode="outlined"
          dense
          left={<TextInput.Icon name="hand-heart" />}
          onChangeText={text => setForm({ ...form, name: text })}
        />
        <TextInput
          label="Slogan"
          value={form.slogan}
          mode="outlined"
          dense
          left={<TextInput.Icon name="format-name" />}
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
          label="Email"
          value={form.email}
          mode="outlined"
          dense
          left={<TextInput.Icon name="email" />}
          onChangeText={text => setForm({ ...form, email: text })}
        />

        <TextInput
          label="Password"
          value={form.password}
          mode="outlined"
          dense
          left={<TextInput.Icon name="lock" />}
          style={{ marginTop: 5 }}
          onChangeText={text => setForm({ ...form, password: text })}
        />
        <TextInput
          label="Confirm Password"
          value={form.confirmPassword}
          mode="outlined"
          dense
          left={<TextInput.Icon name="lock" />}
          style={{ marginTop: 5 }}
          onChangeText={text => setForm({ ...form, confirmPassword: text })}
        />
        <Button loading={loading} onPress={handleRegister} style={{ marginTop: 12 }} mode="contained">Register</Button>
        <Text style={s.loginText}>Already have account ? <Link to="/login"><Text style={s.loginLink}>Login Here</Text></Link>.</Text>
      </View>
    </>
  )
}

const s = StyleSheet.create({
  container: {
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    padding: 30
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: '#2f0064',
    marginBottom: 5,
  },
  slogan: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: '#574968',
    marginBottom: 15,
  },
  logo: {
    width: 120,
    height: 120,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  loginText: {
    textAlign: 'center',
    marginTop: 10
  },
  loginLink: {
    color: '#1100ff',
    marginTop: 4
  }
})

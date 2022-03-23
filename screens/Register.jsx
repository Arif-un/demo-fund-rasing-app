import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { Link, useNavigate } from "react-router-native";
import { createUserWithEmailAndPassword, db, getAuth, onAuthStateChanged } from "firebase/auth"
import { addDoc } from "firebase/firestore";
import { auth, userDetailsCollection } from "../firebaseConfig";

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
    // try {
    //   d.forEach(async (itm, i) => {
    //     const docRef = await addDoc(userDetailsCollection, {
    //       userUid: itm.userUid || '',
    //       name: itm.name || '',
    //       slogan: itm.slogan || '',
    //       description: itm.description || '',
    //       location: itm.location || '',
    //       phone: itm.phone || '',
    //       role: 'user',
    //       status: 'pending',
    //       img: img[i] || '',
    //     })
    //   })

    //   setLoading(false)
    //   console.log("Document written with ID: ", docRef.id);
    // } catch (e) {
    //   setLoading(false)
    //   console.error("Error adding document: ", e);
    // }

    if (form.password !== form.confirmPassword) return alert('Password not match')
    setLoading(true)
    createUserWithEmailAndPassword(auth, 'asdsaddnnasdssasa@mailsac.com', 'adsdasda')
      .then(async (userCredential) => {
        try {
          const docRef = await addDoc(userDetailsCollection, {
            userUid: userCredential.user.uid || '',
            name: form.name || '',
            slogan: form.slogan || '',
            description: form.description || '',
            location: form.location || '',
            phone: form.phone || '',
            role: 'user',
            status: 'pending'
          });
          setLoading(false)
          console.log("Document written with ID: ", docRef.id);
        } catch (e) {
          setLoading(false)
          console.error("Error adding document: ", e);
        }
      })
      .catch((error) => {
        setLoading(false)
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('-- register error', errorCode, errorMessage)
      });
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

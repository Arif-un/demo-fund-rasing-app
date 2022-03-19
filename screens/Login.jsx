import { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Button, IconButton, TextInput } from "react-native-paper";
import { useFonts, Inter_900Black, Inter_600SemiBold } from '@expo-google-fonts/inter';
import { Link, useNavigate } from "react-router-native";

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const navigate = useNavigate();
  useFonts({ Inter_900Black, Inter_600SemiBold })

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
        <Text style={s.subTitle}>Login Here</Text>
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
        <Button style={{ marginTop: 12 }} mode="contained">Login</Button>
        <Text>Not have any account ? Register as a Charity.</Text>
      </View>
    </>
  )
}

const s = StyleSheet.create({
  container: {
    // backgroundColor: '#ff8282',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    padding: 30
    // flexDirection
    // alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: '#2f0064',
    marginBottom: 5,
    // fontFamily: 'Inter_900Black',
  },
  subTitle: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: '#574968',
    marginBottom: 15,
    // fontFamily: 'Inter_600SemiBold',
  },
  logo: {
    width: 120,
    height: 120,
    marginLeft: 'auto',
    marginRight: 'auto'
  }
})

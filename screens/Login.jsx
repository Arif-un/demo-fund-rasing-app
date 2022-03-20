import { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { Link, useNavigate } from "react-router-native";

export default function Register() {
  const [form, setForm] = useState({ email: '', password: '' })
  const navigate = useNavigate();

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
        <Text style={s.registerText}>Not have any account ? <Link to="/register"><Text style={s.registerLink}>Register a new charity</Text></Link>.</Text>
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: '#2f0064',
    marginBottom: 5,
  },
  subTitle: {
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
  registerText: {
    textAlign: 'center',
    marginTop: 10
  },
  registerLink: {
    color: '#1100ff',
    marginTop: 4
  }
})

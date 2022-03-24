import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { NativeRouter, Route, Link, Routes } from "react-router-native"
import Home from './screens/Home';
import Login from './screens/Login';
import { DefaultTheme, Drawer, Provider as PaperProvider } from 'react-native-paper'
import { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import Register from './screens/Register';
import CharityApproval from './screens/CharityApproval';
import Profile from './screens/Profile';
import CharityDetails from './screens/CharityDetails';
import DonorList from './screens/DonorList';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig';
import { LogBox } from 'react-native';
import { BackHandler } from 'react-native-web';
LogBox.ignoreLogs([
  'Setting a timer',
  'AsyncStorage',
  "[Unhandled promise rejection: TypeError: undefined is not an object (evaluating 'window.document.getElementsByTagName')]",
  '/indexedDB',
  'Warning:',
]);
const theme = {
  ...DefaultTheme,
  roundness: 10,
  colors: {
    ...DefaultTheme.colors,
    primary: '#0026ff',
    // accent: '#f1c40f',
  },
}

export default function App() {
  const [user, setUser] = useState({})

  async function loadFonts() {
    await Font.loadAsync({
      'Poppins-Regular': {
        uri: require('./assets/fonts/Poppins-Regular.ttf'),
        display: Font.FontDisplay.FALLBACK,
      },
      'Poppins-Bold': {
        uri: require('./assets/fonts/Poppins-Bold.ttf'),
        display: Font.FontDisplay.FALLBACK,
      },

    });
  }
  useEffect(() => {
    loadFonts()
    onAuthStateChanged(auth, user => {
      if (user) {
        setUser(user)
      } else {
        setUser({})
      }
    })

    BackHandler.addEventListener('hardwareBackPress', function () {
      alert('back button pressed')
      return false
    })
  }, [])


  return (
    <PaperProvider theme={theme}>
      <NativeRouter>
        <View style={styles.container}>
          <StatusBar style="auto" />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/approval" element={<CharityApproval />} />
            <Route path="/profile" element={<Profile userId={user.uid} />} />
            <Route path="/charity-details/:id" element={<CharityDetails />} />
            <Route path="/donors-list/:id" element={<DonorList />} />
          </Routes>

        </View>
      </NativeRouter>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    // fontFamily: 'Inter_900Black',
    flex: 1,
    // backgroundColor: '#ff8282',
    // alignItems: 'center',
    justifyContent: 'flex-start',
  },
});

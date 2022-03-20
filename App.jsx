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
  const [active, setActive] = useState('')
  async function loadFonts() {
    await Font.loadAsync({
      // Load a font `Montserrat` from a static resource
      // Montserrat: require('./assets/fonts/Poppins-Bold.ttf'),

      // Any string can be used as the fontFamily name. Here we use an object to provide more control
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
  }, [])


  return (
    <PaperProvider theme={theme}>
      <NativeRouter>
        <View style={styles.container}>
          <StatusBar style="auto" />
          {/* <Home/> */}
          {/* <Drawer.Section title="Some title">
            <Drawer.Item
              label="First Item"
              active={active === 'first'}
              onPress={() => setActive('first')}
            />
            <Drawer.Item
              label="Second Item"
              active={active === 'second'}
              onPress={() => setActive('second')}
            />
          </Drawer.Section> */}

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/approval" element={<CharityApproval />} />
          </Routes>
          {/* <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
          </Routes> */}
          {/* <Text style={styles.container}>aasdfasdfasdfasdfsdf</Text>
          <Link
            to="/login"
            underlayColor="#f0f4f7"
            style={styles.navItem}
          >
            <Text>About</Text>
          </Link>
          <StatusBar style="auto" /> */}
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

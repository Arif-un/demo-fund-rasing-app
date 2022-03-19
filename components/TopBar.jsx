import { useFonts } from "@expo-google-fonts/inter/useFonts";
import { Animated, Image, Text, View } from "react-native";
import { Button, IconButton } from "react-native-paper";
import { TouchableOpacity } from "react-native";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-native"

export default function TopBar({ title }) {
  const [loaded] = useFonts({ p_semi: require("../assets/fonts/Poppins-SemiBold.ttf") })
  const [drawer, setDrawer] = useState(false)
  const navigate = useNavigate()
  const slideAnim = useRef(new Animated.Value(-250)).current

  const handleDraweer = (isOpen) => () => {
    setDrawer(isOpen)
    Animated.timing(slideAnim, { toValue: isOpen ? 0 : -250, duration: 300, useNativeDriver: true }).start();
  }
  if (!loaded) return <Text>Loading...</Text>


  return (
    <>
      <View style={{ flex: 1, flexDirection: 'row', paddingTop: 20, alignItems: 'center', maxHeight: 80, }}>
        <IconButton icon="menu" style={{ position: 'absolute', top: '40%' }} onPress={handleDraweer(true)} />
        <Text style={{ marginLeft: 'auto', marginRight: 'auto', fontSize: 18, fontFamily: 'p_semi' }}>{title}</Text>
      </View>
      <Animated.View
        style={{
          transform: [{ translateX: slideAnim }],
          ...s.drawer
        }}
      >
        <Image
          style={s.drawerImg}
          // width={100}
          // height={20}
          source={{ uri: 'http://www.innovairre.com/wp-content/uploads/2015/07/Fundly-logo-web-e1438032255736.png' }}
        />

        <Button
          icon="login"
          contentStyle={s.btn}
          onPress={() => navigate('/login')}
        >
          Login
        </Button>

      </Animated.View>
      {drawer && (
        <TouchableOpacity
          onPress={handleDraweer(false)}
          style={s.drawerBackdrop}
        />
      )}
    </>
  )
}

const s = {
  drawer: {
    backgroundColor: '#fff',
    height: '100%',
    width: 250,
    position: 'absolute',
    elevation: 9999,
    zIndex: 99999,
    padding: 20
  },
  drawerBackdrop: {
    backgroundColor: '#000000b2',
    width: '100%',
    height: '100%',
    position: 'absolute',
    left: 0,
    elevation: 999,
    zIndex: 999
  },
  drawerImg: {
    width: 140,
    height: 40,
    marginTop: 20,
    marginBottom: 20,
  },
  btn: {
    width: 400,
    textAlign: '100%',
    justifyContent: 'flex-start',
  }
}

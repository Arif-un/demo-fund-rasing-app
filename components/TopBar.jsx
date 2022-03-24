import { useFonts } from "@expo-google-fonts/inter/useFonts";
import { Animated, Image, Text, View } from "react-native";
import { Button, IconButton } from "react-native-paper";
import { TouchableOpacity } from "react-native";
import { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-native"
import { app, auth, db } from '../firebaseConfig'
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";

export default function TopBar({ title, color = '#fff' }) {
  const [loaded] = useFonts({ p_semi: require("../assets/fonts/Poppins-SemiBold.ttf") })
  const [drawer, setDrawer] = useState(false)
  const navigate = useNavigate()
  const slideAnim = useRef(new Animated.Value(-250)).current
  const [user, setUser] = useState({})
  // const [userDetails, setUserDetails] = useState({})
  const handleDraweer = (isOpen) => () => {
    setDrawer(isOpen)
    Animated.timing(slideAnim, { toValue: isOpen ? 0 : -250, duration: 300, useNativeDriver: true }).start();
  }

  useEffect(() => {
    onAuthStateChanged(auth, async user => {
      if (user) {
        const q = query(collection(db, 'userDetails'), where('userUid', '==', user.uid))
        const userDetails = await getDocs(q)

        const userDetail = userDetails.docs?.[0]?.data()
        const id = userDetails?.docs?.[0]?.id
        setUser({ ...user, ...userDetail, id })
      }
    })
  }, [])

  if (!loaded) return <Text>Loading...</Text>

  const logout = async () => {
    await signOut(auth)
    navigate('/')
    setDrawer(false)
  }

  return (
    <>
      <View style={{ flex: 1, flexDirection: 'row', paddingTop: 20, alignItems: 'center', maxHeight: 80, backgroundColor: color }}>
        <IconButton icon="menu" style={{ position: 'absolute', top: '40%' }} onPress={handleDraweer(true)} />
        <Text style={{ marginLeft: 'auto', marginRight: 'auto',left:20, fontSize: 18, fontFamily: 'p_semi' }}>{title}</Text>
        <IconButton onPress={() => navigate(-1)} icon={'arrow-left'} />
      </View>
      <Animated.View
        style={{
          transform: [{ translateX: slideAnim }],
          ...s.drawer
        }}
      >
        <Image
          style={s.drawerImg}
          source={{ uri: 'http://www.innovairre.com/wp-content/uploads/2015/07/Fundly-logo-web-e1438032255736.png' }}
        />

        <Text style={{ color: '#696969', marginLeft: 15 }}>{user.email}</Text>

        <Button
          icon="home"
          contentStyle={s.btn}
          onPress={() => navigate('/')}
        >
          Home
        </Button>
        {!user.id &&
          <Button
            icon="login-variant"
            contentStyle={s.btn}
            onPress={() => navigate('/login')}
          >
            Login
          </Button>
        }


        {!user.id && (
          <Button
            icon="account-plus"
            contentStyle={s.btn}
            onPress={() => navigate('/register')}
          >
            Register
          </Button>
        )}

        {user && user.role === 'admin' && (
          <Button
            icon="check-decagram"
            contentStyle={s.btn}
            onPress={() => navigate('/approval')}
          >
            Charity Approval
          </Button>
        )}

        {user.uid && (
          <>
            <Button
              icon="account"
              contentStyle={s.btn}
              onPress={() => navigate('/profile')}
            >
              Profile
            </Button>

            <Button
              icon="format-list-bulleted"
              contentStyle={s.btn}
              onPress={() => navigate(`/donors-list/${user.uid}`)}
            >
              Donors List
            </Button>

            <Button
              icon="logout-variant"
              contentStyle={s.btn}
              onPress={logout}
            >
              Logout
            </Button>
          </>
        )}

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

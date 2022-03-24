import { Text, View, StyleSheet, ScrollView } from "react-native";
import { Appbar, Button, IconButton, TextInput } from "react-native-paper";
import { useState, useEffect } from "react"
import ListCard from "../components/ListCard";
import TopBar from "../components/TopBar";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db, userDetailsCollection } from "../firebaseConfig";


const ch = [
  {
    title: 'The Human Foundation',
    subTitle: 'Help homless and poor family, and help the community',
    img: 'https://cdn.downtoearth.org.in/uploads/0.51881800_1447151770_poverty.jpg'
  },
  {
    title: 'Feed the Babies',
    subTitle: 'Help homless and poor family, and help the community',
    img: 'https://images.squarespace-cdn.com/content/v1/55caa6b6e4b0b9a7ca485045/1479410086119-AZ8FSHFS6MRXUDJ3JEC6/image-asset.jpeg?format=500w'
  },
  {
    title: 'Save the Community',
    subTitle: 'Help homless and poor family, and help the community',
    img: 'https://image.shutterstock.com/image-vector/people-throw-gold-coins-into-260nw-1336223207.jpg'
  },
  {
    title: 'Sisters of Charity',
    subTitle: 'Help homless and poor family, and help the community',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzbqCI0X0NTidPitnBa0XJwqiSMnvWes5ZIw&usqp=CAU'
  },
  {
    title: 'Helping Hands Club',
    subTitle: 'Help homless and poor family, and help the community',
    img: 'https://thumbs.dreamstime.com/b/concept-charity-food-poor-life-problems-hunger-society-helping-people-kindness-hands-beggars-receive-donated-149442931.jpg'
  },
  {
    title: 'The Funding Network',
    subTitle: 'Help homless and poor family, and help the community',
    img: 'https://i.ytimg.com/vi/2rTZ9UndNeI/maxresdefault.jpg'
  },
  {
    title: 'The Funding Network',
    subTitle: 'Help homless and poor family, and help the community',
    img: 'https://www.lovesove.com/wp-content/uploads/2021/04/Laughter-Day-Messages-Lovesove.jpg'
  }
]

export default function Home() {
  const [charities, setCharities] = useState([])
  const [search, setSearch] = useState([])

  useEffect(async () => {
    const data = []
    const q = query(collection(db, 'userDetails'),
      where('status', '==', 'active'),
      where('role', '==', 'user'),
    )
    const usersDetails = await getDocs(q)
    usersDetails.forEach(doc => {
      data.push({ ...doc.data(), id: doc.id })
    })
    setCharities(data)
  }, [])

  const handleSearch = (val) => {
    const searchData = []
    if (val === '') {
      setSearch([])
      return
    }
    charities.map(charity => {
      if (charity?.name.toLowerCase().includes(val.toLowerCase())) {
        searchData.push(charity)
      }
    })
    charities.map(charity => {
      if (charity?.location.toLowerCase().includes(val.toLowerCase())) {
        searchData.push(charity)
      }
    })
    setSearch(searchData)
  }

  return (
    <>
      <TopBar title="Charity List" />
      <ScrollView style={{ flex: 1 }}>
        <TextInput
          label="Search"
          right={<TextInput.Icon name="magnify" />}
          mode="outlined"
          dense
          style={{
            marginLeft: 'auto',
            marginRight: 'auto',
            width: '88%',
          }}
          onChangeText={handleSearch}
        />
        {!search.length && charities.map((itm) => (
          <ListCard
            key={itm.id}
            id={itm.id}
            userUid={itm.userUid}
            img={itm.img}
            title={itm.name}
            subTitle={itm.slogan}
            balance={itm.balance}
            goal={itm.goal}
          />
        ))}
        {search?.map((itm) => (
          <ListCard
            key={itm.id}
            id={itm.id}
            userUid={itm.userUid}
            img={itm.img}
            title={itm.name}
            subTitle={itm.slogan}
            balance={itm.balance}
            goal={itm.goal}
          />
        ))}
      </ScrollView>
    </>
  )
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#ff8282',
  }
})


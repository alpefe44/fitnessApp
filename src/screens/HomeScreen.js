import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { auth, logout } from '../../firebase/firebase'
import { useSelector } from 'react-redux'
import { Entypo } from '@expo/vector-icons';
import BodyPart from '../components/bodyPart'


const HomeScreen = ({ navigation }) => {

  const { user } = useSelector((state) => state.auth)
  const [category, setCategory] = useState("back")
  const categories = [
    "back",
    "chest",
    "lower legs",
    "shoulders"
  ]

  const handleLogOut = async () => {
    await logout()
    navigation.replace("LoginScreen")
  }



  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <TouchableOpacity onPress={handleLogOut} style={{ alignSelf: 'flex-end', marginRight: 15 }}>
            <Entypo name="log-out" size={25} color={'black'} />
          </TouchableOpacity>
        )
      }
    })
  }, [navigation])
  return (
    <View className="flex-1 bg-[#e2e2e2]">
      <View>
        <Navbar
          name={user?.displayName}
          url={user?.photoURL == null ? 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png' : user.photoURL}></Navbar>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <View style={{ flexDirection: 'row', paddingHorizontal: 20, justifyContent: 'center' }}>
          {
            categories.map((item , index) => {
              return (
                <View key={index}>
                  <TouchableOpacity onPress={() => setCategory(item)}>
                    {console.log(category)}
                    <View style={{ paddingHorizontal: 10, padding: 10, backgroundColor: '#ffbb9a', marginHorizontal: 5, borderRadius: 10 }}>
                      <Text style={{ textTransform: 'uppercase', fontWeight: 'bold', color: 'white' }}>{item}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )
            })
          }
        </View>
        <BodyPart name={category}></BodyPart>
      </ScrollView>
    </View>
  )
}

export default HomeScreen
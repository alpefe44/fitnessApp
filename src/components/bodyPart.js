import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import { apiCall } from '../../api'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'


const BodyPart = ({ name }) => {

  const navigation = useNavigation();

  const [data, setData] = useState([]);
  useEffect(() => {
    getApi(name);
  }, [name])

  const getApi = async (name) => {
    const response = await apiCall(name);
    if (response) setData(response)
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
    >
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', marginTop: 20 }}>
        {
          data.map((item) => {
            return (
              <View style={{ marginHorizontal: 15, marginVertical: 15 }}>
                <TouchableOpacity onPress={() => navigation.navigate("DetailScreen", {
                  id: item.id
                })}>
                  <View style={{ alignItems: 'center' }}>
                    <Image style={{ width: 100, height: 100 }} source={{ uri: item.gifUrl }}></Image>
                    <View style={{ padding: 8 }}>
                      <Text style = {{padding:3 , fontWeight:'bold'}}>{item.target.toUpperCase()}</Text>
                    </View>
                  </View>
                </TouchableOpacity>

              </View>
            )

          })
        }
      </View>
    </ScrollView>
  )
}

export default BodyPart
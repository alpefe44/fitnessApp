import { View, Text, ScrollView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { apiCall } from '../../api';


const AnotherPart = ({ part }) => {

  const [data, setData] = useState([]);

  useEffect(() => {
    getApiCall(part)
    console.log(part, "part")
  }, [part])

  const getApiCall = async (bodyPart) => {
    const response = await apiCall(bodyPart);
    if (response) {
      setData(response)
    }
  }

  return (
    <View>
      <ScrollView>
        <View>
          {
            data.map((item, index) => {
              <View>
                <Image style={{ width: 100, height: 100 }} source={{ uri: item.gifUrl }}></Image>
              </View>
            })
          }
        </View>
      </ScrollView>
    </View>
  )
}

export default AnotherPart
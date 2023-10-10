import { View, Text, Image, Dimensions, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getIdApiCall } from '../../api';

const { width, height } = Dimensions.get('window');

const DetailScreen = ({ route }) => {

  const { id } = route.params
  console.log(id)
  const [data, setData] = useState(null);

  useEffect(() => {
    getIdBody(id)
  }, [id])

  const getIdBody = async (id) => {
    const response = await getIdApiCall(id);
    console.log(response)
    if (response) {
      setData(response)
      console.log(data)
    }
  }

  return (
    <View style={{ flex: 1, marginTop: 25, backgroundColor: 'white' }}>

      {
        data !== null ? (
          <>
            <View style={[{ alignSelf: 'center' }]}>
              <Image style={{ borderRadius: 20, width: width * 0.8, height: height * 0.5 }} source={{ uri: data?.gifUrl }}></Image>
            </View>
            <View style={[{ alignItems: 'center', marginVertical: 15, padding: 10, marginHorizontal: 5 }, styles.shadow]}>
              <Text style={{ fontSize: 24, fontWeight: 'bold', textTransform: 'uppercase', textAlign: 'center', marginBottom: 10 }}>{data.name}</Text>
              <Text style={{ fontSize: 24, fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 10 }}>{data?.target}</Text>
              <Text style={{ fontSize: 14, fontWeight: 'bold', textTransform: 'uppercase', textAlign: 'center', marginHorizontal: 5 }}>{data.instructions[0]}</Text>
            </View>
          </>
        ) : <Text>Loading</Text>
      }

    </View>
  )
}

const styles = StyleSheet.create({
  shadow: {
    elevation: 1,
    shadowColor: 'black'
  }
})

export default DetailScreen
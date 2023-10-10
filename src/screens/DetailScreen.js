import { View, Text, Image, Dimensions, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getIdApiCall } from '../../api';
import LottieView from "lottie-react-native";
import { Ionicons } from '@expo/vector-icons';
import AnotherPart from '../components/AnotherPart';

const { width, height } = Dimensions.get('window');

const DetailScreen = ({ route, navigation }) => {

  const { id, part } = route.params
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
    }
  }

  return (
    <View style={{ flex: 1, marginTop: 25, backgroundColor: 'white' }}>

      {
        data !== null ? (
          <>
            <View style={[{ alignSelf: 'center' }]}>
              <Image style={{ borderRadius: 20, width: width * 0.8, height: height * 0.5 }} source={{ uri: data?.gifUrl }}></Image>
              <TouchableOpacity style={{ position: 'absolute', left: -20, top: 20 }} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={34} color="black" />
              </TouchableOpacity>
            </View>
            <View style={[{ alignItems: 'center', marginVertical: 25, padding: 10, marginHorizontal: 5 }, styles.shadow]}>
              <View style={{ marginBottom: 20, flexDirection: 'row', borderColor: 'red', borderRightWidth: .5, borderLeftWidth: .5, padding: 10, alignSelf: 'flex-start', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', textTransform: 'uppercase', textAlign: 'center', marginBottom: 10 }}>{data.name.length > 20 ? data.name.slice(0, 20) + " ... " : data.name}</Text>
                <Text style={{ fontSize: 18, fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 10 }}> || {data?.target}</Text>
              </View>

              <Text style={{ padding: 6, borderTopWidth: .5, borderLeftWidth: .5, borderTopLeftRadius: 15, lineHeight: 25, fontSize: 14, fontWeight: 'bold', textTransform: 'uppercase', textAlign: 'center', marginHorizontal: 5 }}>{data.instructions[0]}</Text>
            </View>

            <AnotherPart part={part}></AnotherPart>
          </>
        ) :
          <LottieView source={require('../../assets/loading.json')} autoPlay loop style={{ justifyContent: 'center', alignItems: 'center', height: '100%' }}>

          </LottieView>
      }

    </View >
  )
}

const styles = StyleSheet.create({
  shadow: {
    elevation: 10,
    shadowColor: 'black'
  }
})

export default DetailScreen
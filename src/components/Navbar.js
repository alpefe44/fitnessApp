import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React from 'react'

const Navbar = ({ name, url }) => {
  return (
    <View style={[{ backgroundColor: 'gray', width: '90%', marginHorizontal: 20, marginVertical: 15, borderRadius: 15, padding: 10 }, styles.shadow]}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10 }}>
        <View style={{ width: 40, height: 40 }} >
          <Image style={{ flex: 1 }} source={require('../../assets/favicon.png')}></Image>
        </View>
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>{name}</Text>
        <View style={{ width: 50, height: 50 }} >
          <Image style={{ flex: 1 , borderRadius:30 }} source={{ uri: url }}></Image>
        </View>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  shadow: {
    elevation: 7,
    shadowColor: 'black'
  }
})

export default Navbar
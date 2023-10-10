import { View, Text, TouchableOpacity} from 'react-native'
import React from 'react'

const CustomButton = ({ style , text , press}) => {
  return (
    <TouchableOpacity style={style} onPress={press}>
      <Text style={{ color: 'white' , fontWeight:'bold' , fontSize:16}}>{text}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton
import { View, Text, TextInput, StyleSheet, KeyboardAvoidingView } from 'react-native'
import React from 'react'


const TextArea = ({ placeholder, secureTextEntry, value, setValue, edit , bcolor = "gray"}) => {
  return (
    <View style={[{ backgroundColor: 'white', marginHorizontal: 11, borderRadius: 5, borderWidth: 2, marginBottom: 5, borderColor: bcolor }, styles.shadow]}>
      <TextInput editable={edit} value={value} onChangeText={(text) => setValue(text)} placeholder={placeholder} secureTextEntry={secureTextEntry} style={{ padding: 5 }}></TextInput>
    </View>
  )
}


const styles = StyleSheet.create({
  shadow: {
    elevation: 7,
  }
})


export default TextArea
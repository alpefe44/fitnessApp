import { View, Text, Image, StyleSheet, Pressable, KeyboardAvoidingView, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { auth, changePassword, sendEmail, update, logout } from '../../firebase/firebase'
import TextArea from '../components/textArea'
import CustomButton from '../components/customButton'
import { login as LoginHandle } from '../../redux/auth';

const ProfileScreen = ({navigation}) => {

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [userName, setUserName] = useState(auth.currentUser?.displayName || "")
  const [email, setEmail] = useState(auth.currentUser?.email || "")
  const [photoURL, setPhotoUrl] = useState(auth.currentUser?.photoURL || "");
  const [emailVerification, setEmailVerification] = useState(auth.currentUser?.emailVerified)


  const handleVerification = async () => {
    await sendEmail();
  }

  const handleLogOut = async () => {
    await logout()
    navigation.replace("LoginScreen")
  }

  const handleUpdateProfile = async () => {
    await update({
      displayName: userName,
      photoURL: photoURL
    })
    dispatch(LoginHandle({
      displayName: auth.currentUser.displayName,
      email: auth.currentUser.email,
      photoURL: auth.currentUser.photoURL,
      uid: auth.currentUser.uid,
      emailVerified: auth.currentUser.emailVerified
    }))
  }

  return (
    <View style={{ flex: 1 , backgroundColor:"#e2e2e2" }}>
      <View className="rounded-full self-center w-[80] h-[80] mt-4 ">
        <Image style={{ flex: 1, borderRadius: 100 }} source={{ uri: user?.photoURL == null ? 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png' : user.photoURL }} ></Image>
      </View>
      <View className="py-5 gap-y-10 mx-[10]">
        <View>
          <Text style={{ marginLeft: 10, marginBottom: 5, fontWeight: 'bold' }}>Username</Text>
          <TextArea value={userName == null ? `Charlie${Math.floor(Math.random() * (1000 - 0 + 1)) + 0}` : userName} placeholder={"Username"} secureTextEntry={false} setValue={setUserName}></TextArea>
        </View>
        <View>
          <Text style={{ marginLeft: 10, marginBottom: 5, fontWeight: 'bold' }}>Email {!user.emailVerified ? <TouchableOpacity onPress={handleVerification}><MaterialIcons name="dangerous" size={13} color="red" /></TouchableOpacity> : null} </Text>
          <TextArea value={email} edit={false} placeholder={"Email"} secureTextEntry={false} setValue={setEmail} bcolor={user.emailVerified ? 'green' : 'red'} ></TextArea>
        </View>
        <View>
          <Text style={{ marginLeft: 10, marginBottom: 5, fontWeight: 'bold' }}>Photo URL</Text>
          <TextArea value={photoURL} secureTextEntry={false} setValue={setPhotoUrl} placeholder={"Photo Link"}></TextArea>
        </View>
      </View>
      <View style={{ flexDirection: 'column', alignSelf: 'center' }}>
        <View style={{ flexDirection: 'row', marginHorizontal: 8, alignItems: 'center', justifyContent: 'center' }}>
          <CustomButton press={handleUpdateProfile} style={styles.button} text={"Güncelle"}></CustomButton>
          <View style={{ position: 'absolute', left: 30 }}>
            <MaterialIcons name="update" size={34} color="white" />
          </View>
        </View>
        <View style={{ flexDirection: 'row', marginHorizontal: 8, marginVertical: 20, alignItems: 'center', justifyContent: 'center' }}>
          <CustomButton press={handleLogOut} style={styles.button} text={"Çıkış Yap"}></CustomButton>
          <View style={{ position: 'absolute', left: 30 }}>
            <MaterialIcons name="logout" size={34} color="white" />
          </View>
        </View>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'gray',
    padding: 15,
    width: '90%',
    borderRadius: 15,
    height: 50
  },

})

export default ProfileScreen
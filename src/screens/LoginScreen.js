import { View, Text, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Dimensions, Button, Image } from 'react-native'
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
import React, { useEffect, useState } from 'react'
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import TextArea from '../components/textArea'
import CustomButton from '../components/customButton'
import { auth, login, register } from '../../firebase/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { login as LoginHandle } from '../../redux/auth';
import 'react-native-gesture-handler'
import { MotiView, useAnimationState } from 'moti';


const { height, width } = Dimensions.get('window');

const LoginScreen = ({ navigation }) => {

  const animationState = useAnimationState({
    signIn: {
      height: height * 0.5
    },
    signUp: {
      height: height * 0.8,
    },
  })

  const [mode, setMode] = useState("signIn")

  const user = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {
    console.log(user, "login")
    console.log(auth.currentUser)
    if (auth.currentUser) {
      navigation.navigate("TabScreen")
    }
  }, [])

  useEffect(() => {
    animationState.transitionTo("signIn")
  }, [])

  function RenderSignIn() {
    return (
      <AlertNotificationRoot>
        <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'white' }}>
          <MotiView
            state={animationState}
            style={[{ backgroundColor: 'white', marginHorizontal: 10, width: '90%', height: height * 0.5, alignSelf: 'center', justifyContent: 'center' }, styles.shadow]}>
            <View style={{ alignSelf: 'center', padding: 15 }}>
              <Ionicons name="person" size={44} color="black" />
            </View>
            <TextArea value={email} setValue={setEmail} placeholder={"Email"} secureTextEntry={false}></TextArea>
            <TextArea value={password} setValue={setPassword} placeholder={"Password"} secureTextEntry={true}></TextArea>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10, marginVertical: 15, alignItems: 'center' }}>
              <View style={{ flexDirection: 'row' }}>
                <CustomButton press={handleLogin} style={[styles.button, styles.shadow]} text={"Giriş Yap"}></CustomButton>
                <CustomButton style={[styles.button, styles.shadow]} text={"Kayıt Ol"} press={() => {
                  if (animationState.current == "signIn") {
                    animationState.transitionTo("signUp")
                    setMode("signUp")
                  } else {
                    animationState.transitionTo("signIn")
                    setMode("signIn")
                  }
                }}></CustomButton>
              </View>
              <View>
                <TouchableOpacity>
                  <Text style={{ fontSize: 13, fontWeight: 'bold', color: 'lightblue' }}>Şifremi Unuttum</Text>
                </TouchableOpacity>
              </View>
            </View>
          </MotiView>
        </View>
      </AlertNotificationRoot>
    )
  }

  function RenderSignUp() {
    return (
      <AlertNotificationRoot>
        <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'white' }}>
          <MotiView
            state={animationState}
            style={[{ backgroundColor: 'white', marginHorizontal: 10, width: '90%', alignSelf: 'center', justifyContent: 'center' }, styles.shadow]}>
            <View>
              <Image style={{ width: 200, height: 200, borderRadius: 20, alignSelf: 'center' }} source={require('../../assets/logo.png')}></Image>
            </View>
            <View style={{ alignSelf: 'center', padding: 20, marginVertical: 15 }}>
              <FontAwesome5 name="user-lock" size={35} color="black" />
            </View>
            <TextArea value={username} setValue={setUserName} placeholder={"User Name"} secureTextEntry={false}></TextArea>
            <TextArea value={email} setValue={setEmail} placeholder={"Email"} secureTextEntry={false}></TextArea>
            <TextArea value={password} setValue={setPassword} placeholder={"Password"} secureTextEntry={true}></TextArea>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10, marginVertical: 15 }}>
              <View style={{ flexDirection: 'row' }}>
                <CustomButton press={handleRegister} style={[styles.button, styles.shadow]} text={"Register"}></CustomButton>
                <CustomButton style={[styles.button, styles.shadow]} text={"Giriş Yap"} press={() => {
                  if (animationState.current == "signIn") {
                    animationState.transitionTo("signUp")
                    setMode("signUp")
                  } else {
                    animationState.transitionTo("signIn")
                    setMode("signIn")
                  }
                }}></CustomButton>
              </View>
            </View>
          </MotiView>
        </View>
      </AlertNotificationRoot>
    )
  }

  function renderAuthContainer() {
    if (mode == "signIn") {
      return RenderSignIn()
    } else {
      return RenderSignUp()
    }
  }

  const handleLogin = async () => {
    const response = await login(email, password)
    if (response) {
      Dialog.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Success',
        textBody: 'Giriş Başarılı, Ana Sayfaya Yönlendirileceksiniz.',
        button: 'close',
        onPressButton: () => {
          navigation.navigate("TabScreen")
        }
      })
    } else {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Yanlış Bilgi Girdiniz',
        textBody: 'Lütfen Bilgilerinizi Kontrol edin !',
        button: 'close',
      })
    }
  }

  const handleRegister = async () => {

    const response = await register(email, password)
    if (response) {
      response.user.displayName = username;
      dispatch(LoginHandle({
        displayName: auth.currentUser.displayName,
        email: auth.currentUser.email,
        photoURL: auth.currentUser.photoURL,
        uid: auth.currentUser.uid,
        emailVerified: auth.currentUser.emailVerified
      }))
      Dialog.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Success',
        textBody: 'Kayıt Başarılı.',
        button: 'close',
        onPressButton: () => {
          navigation.navigate("TabScreen")
        }
      })
    } else {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Eposta Geçersiz yada Kayıtlı',
        textBody: 'Lütfen Bilgilerinizi Kontrol edin !',
        button: 'close',
      })
    }
  }

  return (
    renderAuthContainer()
  )
}

const styles = StyleSheet.create({
  button: {
    padding: 15,
    backgroundColor: 'gray',
    borderRadius: 8,
    marginLeft: 3
  },
  shadow: {
    elevation: 20
  }
})

export default LoginScreen
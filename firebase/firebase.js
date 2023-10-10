// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, initializeAuth, signInWithEmailAndPassword, getReactNativePersistence, updateProfile, updatePassword, onAuthStateChanged, signOut, sendEmailVerification } from "firebase/auth"
import { login as LoginHandle, logout as LogoutHandle } from "../redux/auth";
import store from "../redux/store";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAiCSiym1SE0L4v7-puGAlKqEqg2oyrV30",
  authDomain: "fitnessapp-b4606.firebaseapp.com",
  projectId: "fitnessapp-b4606",
  storageBucket: "fitnessapp-b4606.appspot.com",
  messagingSenderId: "870361954910",
  appId: "1:870361954910:web:6ea7eb0338e73c605a92cf",
  measurementId: "G-8HGDRWME79"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app)



export const register = async (email, password) => {
  try {
    const user = await createUserWithEmailAndPassword(auth, email, password)
    console.log(user)
    return user;
  } catch (error) {
    console.log(error)
  }
}

export const sendEmail = async () => {
  try {
    await sendEmailVerification(auth.currentUser)
    return true
  } catch (error) {
    console.log(error)
  }
}

export const login = async (email, password) => {
  try {
    const user = await signInWithEmailAndPassword(auth, email, password)
    return user
  } catch (error) {
    console.log(error)
  }
}

export const update = async data => {
  try {
    await updateProfile(auth.currentUser, data)
    console.log("profil güncellendi")
    return true
  } catch (error) {
    console.log(error)
  }
}

export const logout = async () => {
  try {
    const a = await signOut(auth);
    return true
  } catch (error) {
    console.log(error)
  }
}

export const changePassword = async (password) => {
  try {
    const response = await updatePassword(auth.currentUser, password)
    console.log("parola yenilendi")
    console.log(response)
    return response
  } catch (error) {
    console.log(error)
  }
}


onAuthStateChanged(auth, (user) => {
  if (user) {
    store.dispatch(LoginHandle({
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      uid: user.uid,
      emailVerified: user.emailVerified
    }))
  } else {
    store.dispatch(LogoutHandle())
  }
})

export { auth }
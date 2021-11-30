import React, {useContext,useState, createContext} from "react";

import firebase from "firebase";
import 'firebase/auth';
import config from '../config/fire';
import { TokenContext, TokenProvider } from '../context/TokenContext';
import { Alert } from "react-native";
//const [_, setToken] = useContext(TokenContext)
const FirebaseContext = createContext()

if(!firebase.apps.length){
  firebase.initializeApp(config);
}



const Firebase = {
  getCurrentUser: () => {
    return firebase.auth().currentUser
  },



  signIn: async (email, password) => {
   await firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch(err => {
      switch(err.code){
        case "auth/invalid-email":
        case "auth/user-disaled":
        case "auth/user-not-found":
          Alert.alert(err.message);
          break;
        case "auth/wrong-password":
          Alert.alert(err.message);
          break;  
      }
    })
    try{
      const user = Firebase.getCurrentUser().getIdToken(user);
      return user;
    }catch(err)
    {
      return {message: err}
    }
  },

  signUp: async (email, password) =>{
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(err => {
        switch(err.code){
          case "auth/email-already-in-use":
          case "auth/invalid-email":
            Alert.alert(err.message);
            break;
          case "auth/weak-password":
            Alert.alert(err.message);
            break;  
        }
      })
      try{
        const user = Firebase.getCurrentUser().getIdToken(user);
        return user;
      }catch(err)
      {
        Alert.alert(err.message)
        return {message: err}
      }
  },

  logOut: async () => {
    return await firebase.auth().signOut();
    
  },

  resetPassword: async (password) => {
    const reset = await firebase.auth().sendPasswordResetEmail(password).then(() =>{
      Alert.alert("Please check your email");
    }).catch((err) => {
      Alert.alert(err)
    })
  },

  reAuthenticate: (currentPassword) => {
    const user = Firebase.getCurrentUser();
    const cred = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword);
    return user.reauthenticateWithCredential(cred)
  },
  changePassword: async (currentPassword, newPassword) => {
    const cp = Firebase.reAuthenticate(currentPassword).then(() => {
      const user = Firebase.getCurrentUser();
      user.updatePassword(newPassword).then(() => {
        Alert.alert("Password was changed");
      }).catch((err) => {
        Alert.alert(err.message);
      });
    }).catch((err) => {
      Alert.alert(err.message);
    });
    return cp;
  }
}

const FirebaseProvider = (props) => {
  return <FirebaseContext.Provider value={Firebase}>{props.children}</FirebaseContext.Provider>
}

export {FirebaseContext, FirebaseProvider}

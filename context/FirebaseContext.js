import React, {useContext,useState, createContext} from "react";

import firebase from "firebase";
import 'firebase/auth';
import config from '../config/fire';
import { TokenContext, TokenProvider } from '../context/TokenContext';
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
          console.log(err.message);
          break;
        case "auth/wrong-password":
          console.log(err.message);
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
            console.log(err.message);
            break;
          case "auth/weak-password":
            console.log(err.message);
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

  logOut: async () => {
    return await firebase.auth().signOut();
    
  },
}

const FirebaseProvider = (props) => {
  return <FirebaseContext.Provider value={Firebase}>{props.children}</FirebaseContext.Provider>
}

export {FirebaseContext, FirebaseProvider}

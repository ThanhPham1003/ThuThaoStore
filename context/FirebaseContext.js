import React, {useState, createContext} from "react";

import firebase from "firebase";
import 'firebase/auth';
import config from '../config/fire';


const FirebaseContext = createContext()

if(!firebase.apps.length){
  firebase.initializeApp(config);
}



const Firebase = {
  signIn: async (email, password) => {
    return firebase
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
  },

  signUp: async (email, password) =>{
    return await firebase
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
  },

  // logOut: aysnc () => {
  //   return firebase.auth().signOut();
  // }
}

const FirebaseProvider = (props) => {
  return <FirebaseContext.Provider value={Firebase}>{props.children}</FirebaseContext.Provider>
}

export {FirebaseContext, FirebaseProvider}

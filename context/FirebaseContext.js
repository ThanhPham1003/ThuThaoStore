import React, {useContext,useState, createContext} from "react";
import axios from 'axios';
import API from '../config/environmentVariables';
import firebase from "firebase";
import 'firebase/auth';
import config from '../config/fire';
import { TokenContext, TokenProvider } from '../context/TokenContext';
import { Alert } from "react-native";
//import {  } from "react-native";
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
          alert(err.message);
          break;
        case "auth/wrong-password":
          alert(err.message);
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
            alert(err.message);
            break;
          case "auth/weak-password":
            alert(err.message);
            break;  
        }
      })
      try{
        const user = Firebase.getCurrentUser().getIdToken(user);
        return user;
      }catch(err)
      {
        alert(err.message)
        return {message: err}
      }
  },

  logOut: async () => {
    return await firebase.auth().signOut();
    
  },

  resetPassword: async (password) => {
    const reset = await firebase.auth().sendPasswordResetEmail(password).then(() =>{
      alert("Please check your email");
    }).catch((err) => {
      alert(err)
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
        alert("Password was changed");
      }).catch((err) => {
        alert(err.message);
      });
    }).catch((err) => {
      alert(err.message);
    });
    return cp;
  },
  getBlod: async (uri) => {
    return await new Promise((resolve, reject) =>{
      const xhr = new XMLHttpRequest()
      xhr.onload = () =>{
        resolve(xhr.response)
      };
      xhr.responseType = "blob";
      xhr.open("GET",uri,true);
      xhr.send(null);

    })
  },
  uploadProduct: async (name, cost, sell, ctvprice, code, orderquantity, daysubmitted, status, uri, token) =>{
    const uid = Firebase.getCurrentUser().uid;
    try{
      const photo = await Firebase.getBlod(uri);
      
      const path = `photos/${uid}/${Date.now()}.jpg`
      const imageRef = firebase.storage().ref(path);
      console.log("2222", JSON.stringify(photo));
      await imageRef.put(photo);

      const url = await imageRef.getDownloadURL();
      const res = await axios.post( API.BASE_URL + "products/allproducts", {uid: uid, name: name, cost: cost, sell: sell, ctvprice: ctvprice, code: code, orderquantity: orderquantity, daysubmitted: daysubmitted, status: status, url: url}, {
        headers: {
            authorization: "Bearer " + token,
        }
    });
    Alert.alert(res.data);

  }catch(error){
    alert(error);
    console.log(error);
  }
  },
  deleteProductImage: async(url) => {
    const uid = Firebase.getCurrentUser().uid;
    const desertRef = firebase.storage().refFromURL(url);
    desertRef.delete().then(function() {}).catch(function(error){
      alert(error)
    });
  },
  updateProfileUser: async (name, age, uri, token) => {
    const uid = Firebase.getCurrentUser().uid;
    const add = API.BASE_URL + "users/" + uid;
    try{
      const photo = await Firebase.getBlod(uri);
      const path = `avatars/${uid}/${Date.now()}`

      const imageRef = firebase.storage().ref(path);
      console.log("4444444", JSON.stringify(photo));
      await imageRef.put(photo);
      
      const url = await imageRef.getDownloadURL();

    
      const res = await axios.post(add,{name: name, age: age, url: url},{
        headers: {
            authorization: "Bearer " + token,
        }
  
    });
    Alert.alert(res.data);
    }catch(error){
      alert(error);
      console.log(error);
    }
  }

}

const FirebaseProvider = (props) => {
  return <FirebaseContext.Provider value={Firebase}>{props.children}</FirebaseContext.Provider>
}
export {FirebaseContext, FirebaseProvider}

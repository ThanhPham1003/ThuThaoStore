import React, { useContext, useState, createContext } from "react";
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

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}



const Firebase = {

  getCurrentUser: () => {
    return firebase.auth().currentUser
  },



  signIn: async (email, password) => {
    let msg = "";
    await Firebase.logOut();
    const signInResult = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(err => {

        switch (err.code) {
          case "auth/invalid-email":
          case "auth/user-disaled":
          case "auth/user-not-found":
            // alert(err.message);
            msg = err.message;
            break;
          case "auth/wrong-password":
            msg = err.message;
            break;
        }
        return null;
      });
    if (signInResult) {

      try {
        // const user = Firebase.getCurrentUser().getIdToken(user);
        const user = Firebase.getCurrentUser();
        if (user) {
          const token = await user.getIdToken();
          return {
            isSuccessful: true,
            message: token
          }
        }
        return {
          isSuccessful: false,
          message: msg
        };
      } catch (err) {
        // return { message: err }
        return {
          isSuccessful: false,
          message: "fail at get id token"
        };
      }
    } else {
      return {
        isSuccessful: false,
        message: msg
      };
    }
  },

  signUp: async (email, password) => {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(err => {
        switch (err.code) {
          case "auth/email-already-in-use":
          case "auth/invalid-email":
            alert(err.message);
            break;
          case "auth/weak-password":
            alert(err.message);
            break;
        }
      })
    try {
      const user = Firebase.getCurrentUser().getIdToken(user);
      return user;
    } catch (err) {
      alert(err.message)
      return { message: err }
    }
  },

  logOut: async () => {
    return await firebase.auth().signOut();

  },

  resetPassword: async (password) => {
    const reset = await firebase.auth().sendPasswordResetEmail(password).then(() => {
      return "Please check your email";
    }).catch((err) => {
      return "Error with reseting error";
    })
  },

  reAuthenticate: (currentPassword) => {
    const user = Firebase.getCurrentUser();
    const cred = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword);
    return user.reauthenticateWithCredential(cred)
  },
  changePassword: async (currentPassword, newPassword) => {
    let message;
    // const cp = await Firebase.reAuthenticate(currentPassword).then(() => {
    //   const user = await Firebase.getCurrentUser();
    //   user.updatePassword(newPassword).then(() => {
    //     message = "Đã đổi mật khẩu"
    //     return message;
    //   }).catch((err) => {
    //     message = "Đổi mật khẩu không thành công vì lỗi firebase"
    //     return message;
    //   });
    // }).catch((err) => {
    //   message = "Mật khẩu hiện tại không đúng"
    //   return message;
    // });
    // console.log("444444")
    // return message;

    // const updatePassResult = await user.updatePassword(newPassword);

    try {
      await Firebase.reAuthenticate(currentPassword);
      try {
        const user = await Firebase.getCurrentUser();
        await user.updatePassword(newPassword);
        message = "Đã đổi mật khẩu"
      } catch (err){
        message = "Đổi mật khẩu không thành công vì lỗi firebase"
      }
    } catch {
      message = "Mật khẩu hiện tại không đúng"
    }
    return message;

  },
  getBlod: async (uri) => {
    return await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.onload = () => {
        resolve(xhr.response)
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);

    })
  },
  uploadProduct: async (tenSP, code, giaNhap, giaBanLe, giaCTV, soluongNhap, soluongBanLe, soluongBanCTV, noiNhap, ngayDang, status, uri, token) => {
    const uid = Firebase.getCurrentUser().uid;
    try {
      const photo = await Firebase.getBlod(uri);

      const path = `photos/${uid}/${Date.now()}.jpg`
      const imageRef = firebase.storage().ref(path);
      await imageRef.put(photo);

      const url = await imageRef.getDownloadURL();
      const res = await axios.post(API.BASE_URL + "products/allproducts", { uid: uid, tenSP: tenSP, code: code, giaNhap: giaNhap,giaBanLe: giaBanLe, giaCTV: giaCTV, soluongNhap: soluongNhap, soluongBanLe: soluongBanLe, soluongBanCTV: soluongBanCTV, noiNhap: noiNhap, ngayDang: ngayDang, status: status, url: url }, {
        headers: {
          authorization: "Bearer " + token,
        }
      });
      return res.data;

    } catch (error) {
      return "Error with sending product data to storage."
    }
  },
  deleteProductImage: async (url) => {
    const uid = Firebase.getCurrentUser().uid;
    const desertRef = firebase.storage().refFromURL(url);
    desertRef.delete().then(function () { }).catch(function (error) {
      return false;
    });
    return true;
  },
  updateProfileUser: async (name, age, uri, token) => {
    const uid = Firebase.getCurrentUser().uid;
    const add = API.BASE_URL + "users/" + uid;
    try {
      const photo = await Firebase.getBlod(uri);
      const path = `avatars/${uid}/${Date.now()}`

      const imageRef = firebase.storage().ref(path);
      await imageRef.put(photo);

      const url = await imageRef.getDownloadURL();


      const res = await axios.post(add, { name: name, age: age, url: url }, {
        headers: {
          authorization: "Bearer " + token,
        }

      });
      return res.data;
    } catch (error) {
      return "Error with updating profile user";
    }
  }

}

const FirebaseProvider = (props) => {
  return <FirebaseContext.Provider value={Firebase}>{props.children}</FirebaseContext.Provider>
}
export { FirebaseContext, FirebaseProvider }

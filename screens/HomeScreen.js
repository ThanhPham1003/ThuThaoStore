import React, { useContext, useEffect, useState } from 'react';
import axios from "axios";
import { View, Text,StyleSheet, TouchableOpacity } from 'react-native'
import {FirebaseContext} from '../context/FirebaseContext'
export default function HomeScreen({token}) {
  const firebase = useContext(FirebaseContext);
  useEffect(() => {
    if(token)
    {
      fetchData(token);
    }
  }, [token])

  const fetchData = async (token) => {
    const res = await axios.post("http://localhost:5000/users", {
        headers: {
          authorization: "Thanh " + token,
        }
    });
    console.log(res.data);

  }

  const logOut = async () =>{
    await firebase.logOut();
  }


  return (
    <View style={styles.Container}>
      <Text> Home </Text>
      <TouchableOpacity  onPress={logOut}>
        <Text> Logout </Text>
      </TouchableOpacity>
    </View>
  )
}
  const styles = StyleSheet.create({
    Container: {
      flex:1,
      justifyContent: 'center',
      alignItems: 'center'
    },
  })


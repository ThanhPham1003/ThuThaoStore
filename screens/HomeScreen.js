import react, { useEffect } from "react";
import React from "react";
import axios from "axios";
import { View, Text } from 'react-native'

export default function HomeScreen({token}) {

  useEffect(() => {
    if(token)
    {
      fetchData(token);
    }
  }, [token])

  const fetchData = async (token) => {
    const res = await axios.get("http://localhost:5000/api/todos", {
        headers: {
          Authorization: "Thanh " + token,
        }
    });
    

    console.log(res.data);

  }


  return (
    <Text> Home </Text>
  )
}

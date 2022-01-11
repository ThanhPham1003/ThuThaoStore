import React, { useContext, useEffect, useState } from 'react';
import { View, Text,StyleSheet, TouchableOpacity, Image } from 'react-native'
import {FirebaseContext} from '../context/FirebaseContext';
import API from '../config/environmentVariables';
import { TokenContext, TokenProvider } from '../context/TokenContext';
import axios from "axios";
export default ClientCardOrdered= (props) => {
  const {data, navigation} = props
  const {item} = data;
  const [client, setClient] = useState('')
  const [token, setToken] = useContext(TokenContext);
  useEffect(() => {
    fetchData(token);
}, [])
const fetchData = async (token) => {
  const res2 = await axios.get(API.BASE_URL + "clients/" +item.clientid,{
    headers: {
      authorization: "Bearer " + token.token,
    }
  });
  console.log("333333" , res2.data)
  setClient(res2.data);
  
}
  const details = (id) => {
    console.log("hhhhh", id)
    navigation.navigate('Thông Tin',{id})
  }
  const setInfo = () => {
    child(item);
  }
  return(
    <TouchableOpacity style = {styles.Container} onPress={() => details(item.clientid)} >
      
      <View style={styles.InfoContainer}>
          <Text style={styles.ClientTittleText}> {client.name} </Text>
        <Text style={styles.ClientInfoText}> {client.phone}</Text>
      </View>  
    </TouchableOpacity>

  )
}
const styles = StyleSheet.create({
  Container: {
    flex:1,
    alignItems: 'center',
  },
  InfoContainer:{
    marginTop: 20,
    height: 60,
    width: ' 90%',
    borderRadius: 10,
    backgroundColor:  '#FFFFFF',
  },
  ClientTittleText:{
    color: '#0C3674',
    fontSize:  20,
    marginLeft:10,
    marginTop: 5,
  },
  ClientInfoText:{
    marginLeft:10,
    marginTop: 10,
    color: '#0C3674',
    //fontSize:  15,
  },
})
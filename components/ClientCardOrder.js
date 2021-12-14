import React, { useContext, useEffect, useState } from 'react';
import { View, Text,StyleSheet, TouchableOpacity, Image } from 'react-native'
import {FirebaseContext} from '../context/FirebaseContext';
import API from '../config/environmentVariables';

export default ClientCardOrder = (props) => {
  const {data, navigation, child} = props
  const {item} = data;
  const details = (id) => {
    navigation.navigate('Thông Tin',{id})
}
  const setInfo = () => {

    child(item);
  }
  return(
    <TouchableOpacity style = {styles.Container} onPress={setInfo} >
      
      <View style={styles.InfoContainer}>
        {/* <TouchableOpacity onPress={() => details(item._id)}> */}
          <Text style={styles.ClientTittleText}> {item.name} </Text>
        {/* </TouchableOpacity> */}
        <Text style={styles.ClientInfoText}> {item.phone}</Text>
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
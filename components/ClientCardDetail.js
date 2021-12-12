import React, { useContext, useEffect, useState } from 'react';
import { View, Text,StyleSheet, TouchableOpacity, Image } from 'react-native'
import {FirebaseContext} from '../context/FirebaseContext';
import API from '../config/environmentVariables';

export default ClientCardDetail = (props) => {
  const {data, navigation, child} = props
  const {item} = data;
  const details = (phone) => {
    navigation.navigate('Client Details',{phone})
}
  const setInfo = () => {
    child(item);
  }
  return(
    <TouchableOpacity style = {styles.Container} onPress={() => details(item.phone)}>
      
      <View style={styles.InfoContainer}>
          <Text style={styles.ClientTittleText}> {item.name} </Text>
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
    minHeight: 60,
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
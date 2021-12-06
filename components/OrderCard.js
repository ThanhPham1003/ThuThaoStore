import React, { useContext, useEffect, useState } from 'react';
import { View, Text,StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native'
import {FirebaseContext} from '../context/FirebaseContext';
import API from '../config/environmentVariables';

export default OrderCard = (props) => {
  const {data, navigation} = props
  const {item} = data;
  const details = (id) => {
    navigation.navigate('Client Details',{id})
}
  const setInfo = () => {
    child(item);
  }
  return(
    <View style = {styles.Container} >
      
      <View style={styles.InfoContainer}>
        {/* <TouchableOpacity onPress={() => details(item._id)}> */}
          <Text style={styles.ClientTittleText}> Product Name: {item.productname} </Text>
        {/* </TouchableOpacity> */}
        <Text style={styles.ClientInfoText}> Type: {item.type}</Text>
        <Text style={styles.ClientInfoText}> Amount: {item.amount}</Text>
        <Text style={styles.ClientInfoText}> Day Ordered: {item.dayordered}</Text>
      </View>  
    </View>

  )
}
const styles = StyleSheet.create({
  Container: {
    flex:1,
    alignItems: 'center',
  },
  InfoContainer:{
    marginTop: 20,
    height: 120,
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
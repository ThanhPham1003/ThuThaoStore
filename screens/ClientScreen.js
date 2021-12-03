import React, { useEffect, useState, useContext } from "react";
import { View, Text,StyleSheet, TouchableOpacity, Image } from 'react-native';
import axios from "axios";
import { TextInput } from "react-native-gesture-handler";
import { TokenContext, TokenProvider } from '../context/TokenContext';
import API from '../config/environmentVariables';

export default ClientScreen = ({route,navigation}) =>{
  const {id} = route.params;

  return(
    <View style={styles.Container}>
      <View style={styles.ClientTitle}>
        <Text style={styles.ClientTitleText}> Chi Thanh</Text>
      </View>
      <View style={styles.ClientInfo}>
        <Text style={styles.ClientInfoText}>
          Address: Q12
        </Text>
        <Text style={styles.ClientInfoText}>
          Link: fb.com
        </Text>
        <Text style={styles.ClientInfoText}>
          Phone Number: 0123456789
        </Text>
        <Text style={styles.ClientInfoText}>
          Deposit: 1000
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  Container: {
    flex:1,
    backgroundColor: '#f5ceb2'
  },
  ClientTitle:{
    alignItems: "center",
  },
  ClientTitleText:{
    fontSize: 28,
    color: '#0C3674',
  },
  ClientInfo:{
    marginLeft: 20,
  },
  ClientInfoText:{
    fontSize: 20,
    marginTop: 20,
  }

})
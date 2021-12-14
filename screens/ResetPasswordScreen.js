import React, { useContext, useState } from 'react';
import {Text, StyleSheet, View, TextInput, TouchableOpacity,Image,KeyboardAvoidingView} from 'react-native';
import {FirebaseContext} from '../context/FirebaseContext';

export default function ResetPasswordScreen({navigation}){
  const [email, setEmail] = useState('');
  const firebase = useContext(FirebaseContext);


  const resetPassword = async () => {
    const reset = await firebase.resetPassword(email);
    console.log(reset);
  }
  return(
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{flex: 1}}
    >
      <View  style={styles.Container}>
        <View style={styles.LogoSpace}>
            <Image
            source = {require('../assets/thuthaostore.jpg')}
            style={styles.LogoStyle}
            />

          </View>
        <View style={styles.LoginSpace}>
          <TextInput
            style={styles.UserInput}
            placeholder=' Enter your Email...'
            onChangeText={email => setEmail(email.trim())}
            value={email}
          />

              <TouchableOpacity style={styles.LoginBottom} onPress={resetPassword}>
                <Text> Reset </Text>
              </TouchableOpacity>
              <View style={styles.SignUpSpace}>
                <Text> Login Now? </Text>
                <TouchableOpacity onPress={() => navigation.navigate("Sign in")}><Text style={styles.SignUpText}>Login</Text></TouchableOpacity>
              </View>
              
            
        </View>
      </View>
    </KeyboardAvoidingView>

  )
}
const styles = StyleSheet.create({
  Container: {
    flex:1,
    backgroundColor: '#ffffff',
  },
  LogoSpace:{
    flex: 5,
    marginLeft: 17,
  },
  LogoStyle: {
    height:'100%',
    width: '100%'
  },
  LoginSpace: {
    flex: 5,
    //justifyContent: 'center',
    alignItems: 'center'
  },
  UserInput: {
    height: 50,
    width: '70%',
    borderWidth: 5,
    borderColor: '#efb65c',
    borderRadius: 20,
    margin: 10,
    padding: 10,
    //backgroundColor: '#ccc'
  },

  LoginBottom:{
    borderColor: '#efb65c',
    borderWidth: 2,
    borderRadius: 10,
    height: 30,
    width:'20%',
    alignItems:'center',
    justifyContent: 'center',
    backgroundColor: '#efb65b',
    marginTop:30,
  },
  SignUpSpace:{
    flexDirection: 'row',
    marginTop:30
  },
  SignUpText:{
    color: '#76c4d7'
  }
  
})
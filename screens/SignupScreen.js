
import React, { useContext, useEffect, useState } from 'react';
import {Text, StyleSheet, View, TextInput, TouchableOpacity,Image,KeyboardAvoidingView} from 'react-native';
import {FirebaseContext} from '../context/FirebaseContext'
import { TokenContext, TokenProvider } from '../context/TokenContext';
import API from '../config/environmentVariables'
import axios from "axios";


export default function SignupScreen ({navigation})  {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const firebase = useContext(FirebaseContext);
  const [token, setToken] = useContext(TokenContext);
  const [tk, setTk] = useState(null);
  useEffect(() => {
    if(tk){
      fetchData(tk)
    }
  },[tk])
  const fetchData = async (token) => {
    try{
      const res = await axios.get(API.BASE_URL, {
          headers: {
            authorization: "Thanh " + tk,
          }
      });
      if(res.data === 'Verified')
      {
        setToken(({
          token: tk,
          isLoggedIn: true,
        }))
      }
      else alert('Wrong token')
    } catch(err){
      alert(err.message)
    }
    
  }

  const handleSignUp = async () => {
    const tk = await firebase.signUp(email, password);
    setTk(tk);
    
  };

  return(
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{flex: 1}}
    >
      <View  style={styles.Container}>
        <View style={styles.LogoSpace}>
            <Image
            source = {require('../assets/cute-petshop-logo-with-cat-dog_454510-56.jpg')}
            style={styles.LogoStyle}
            />

          </View>
        <View style={styles.SignUpSpace}>
          <TextInput
            style={styles.UserInput}
            placeholder=' Enter your Email...'
            onChangeText={email => setEmail(email.trim())}
            value={email}
          />
          <TextInput
            style={styles.UserInput}
            placeholder='Password'
            secureTextEntry={true}
            onChangeText={password => setPassword(password.trim())}
            value={password}
          />

              <TouchableOpacity style={styles.SignUpBottom} onPress={handleSignUp}>
                <Text> Sign Up </Text>
              </TouchableOpacity>
              <View style={styles.LoginSpace}>
                <Text> Already have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate("Sign in")}><Text style={styles.LoginText}>Login</Text></TouchableOpacity>
              </View>
              
            
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}


const styles = StyleSheet.create({
  Container: {
    flex:1,
    backgroundColor: '#f9e3bd',
  },
  LogoSpace:{
    flex: 5,
    marginLeft: 17,
  },
  LogoStyle: {
    height:'100%',
    width: '100%'
  },
  SignUpSpace: {
    flex: 5,
    //justifyContent: 'center',
    alignItems: 'center'
  },
  UserInput: {
    height: 40,
    width: '60%',
    borderWidth: 5,
    borderColor: '#efb65c',
    borderRadius: 20,
    margin: 10,
    padding: 10,
  },

  SignUpBottom:{
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
  LoginSpace:{
    flexDirection: 'row',
    marginTop:30
  },
  LoginText:{
    color: '#76c4d7'
  }
  
})
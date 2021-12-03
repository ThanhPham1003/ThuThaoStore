
import { setStatusBarHidden } from 'expo-status-bar';
import React, { useContext, useEffect, useState } from 'react';
import {Text, StyleSheet, View, TextInput, TouchableOpacity, Image, Alert, KeyboardAvoidingView} from 'react-native';
import {FirebaseContext} from '../context/FirebaseContext'
import { TokenContext, TokenProvider } from '../context/TokenContext';
import API from '../config/environmentVariables'
import axios from 'axios';

export default function SigninScreen ({navigation})  {

  const [user, setUser] = useState();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [auth, setAuth] = useState(false);
  const [hasAccount, setHasAccount] = useState(true);
  const firebase = useContext(FirebaseContext);
 const [tk, setTk] = useState(null);
  const [token, setToken] = useContext(TokenContext);


  useEffect(() => {
    if(tk){
      fetchData(tk)
    }
  },[tk])

  const fetchData = async (token) => {
    const add = API.BASE_URL 
    try{
    const res = await axios.get(add, {
        headers: {
          authorization: "Bearer " + tk,
        }
    });
    console.log("23232", res.data)
    if(res.data === 'Verified')
    {
      setToken(({
        token: tk,
        isLoggedIn: true,
        isChanged: false
      }))
    }
    else Alert.alert('Wrong token')
  } catch(err){
    console.log("22222", err);
  }
    
  }


  const handleLogin = async () => {
    const tk = await firebase.signIn(email,password);
    setTk(tk);
    //console.log("123 ", tk)
    
  };



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
          <TextInput
            style={styles.UserInput}
            placeholder=' Password'
            secureTextEntry={true}
            onChangeText={password => setPassword(password.trim())}
            value={password}
            
          />
  
              <TouchableOpacity style={styles.LoginBottom} onPress={handleLogin}>
                <Text> Login </Text>
              </TouchableOpacity>
              <View style={styles.SignUpSpace}>
                <Text> Don't have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate("Sign up")}><Text style={styles.SignUpText}>Sign Up</Text></TouchableOpacity>
                
              </View>
              <View style={styles.SignUpSpace}>
                <Text> Forgot Password? </Text>
                <TouchableOpacity onPress={() => navigation.navigate("Reset Password")}><Text style={styles.SignUpText}>Reset Password</Text></TouchableOpacity>
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
    borderColor: '#f5ceb2',
    borderRadius: 20,
    margin: 10,
    padding: 10,
    //backgroundColor: '#ccc'
  },

  LoginBottom:{
    borderWidth: 2,
    borderRadius: 10,
    height: 30,
    width:'20%',
    alignItems:'center',
    justifyContent: 'center',
    backgroundColor: '#f5ceb2',
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

import { setStatusBarHidden } from 'expo-status-bar';
import React, { useContext, useEffect, useState } from 'react';
import {Text, StyleSheet, View, TextInput, TouchableOpacity, Image} from 'react-native';
import {FirebaseContext} from '../context/FirebaseContext'
import fire from 'firebase'
import { TokenContext, TokenProvider } from '../context/TokenContext';



export default function SigninScreen ({navigation})  {

  const [user, setUser] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [auth, setAuth] = useState(false);
  const [hasAccount, setHasAccount] = useState(true);
  const firebase = useContext(FirebaseContext);
 // const [token, setToken] = useState();
  const [token, setToken] = useContext(TokenContext);


  useEffect(() => {
    fire.auth().onAuthStateChanged((userCred) => {
      if(userCred){
        //setAuth(true);
        userCred.getIdToken().then((tk) => {
          setToken({
            token: tk,
            isLoggedIn:true,
          });
        })
      }
    })
  },[auth])

  const handleLogin = async () => {
    await firebase.signIn(email,password)
    .then((userCred) => {
      if(userCred){
        setAuth(true);
        //navigation.navigate('Home')
        console.log("654654")
      }
    });
  };

  // const handleSignUp = async () => {
  //   console.log("1111111");
  //   await firebase.signUp(email, password);
  // };
  // const hangdleLogout = () => {
  //   fire.auth().signOut();
  // };

  





  return(
    <>
    {/* {auth ? (
      <HomeScreen token={token} navigation={navigation}/>
    ) : ( */}
      <View  style={styles.Container}>
        <View style={styles.LogoSpace}>
          <Image
          source = {require('../assets/cute-petshop-logo-with-cat-dog_454510-56.jpg')}
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
              
            
        </View>
      </View>
    {/* )} */}
    </>
  )
}

const styles = StyleSheet.create({
  Container: {
    flex:1,
    backgroundColor: '#f9e3bd',
  },
  LogoSpace:{
    flex: 3,
    marginLeft: 17,
  },
  LoginSpace: {
    flex: 7,
    justifyContent: 'center',
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
    backgroundColor: '#efb65b'
  },
  SignUpSpace:{
    flexDirection: 'row',
  },
  SignUpText:{
    color: '#76c4d7'
  }
  
})
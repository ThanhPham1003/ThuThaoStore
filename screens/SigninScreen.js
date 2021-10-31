
import { setStatusBarHidden } from 'expo-status-bar';
import React, { useContext, useEffect, useState } from 'react';
import {Text, StyleSheet, View, TextInput, TouchableOpacity} from 'react-native';
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
    console.log("123456");
    fire.auth().onAuthStateChanged((userCred) => {
      if(userCred){
        //setAuth(true);
        userCred.getIdToken().then((tk) => {
          setToken({
            token: tk,
            isLoggedIn:true,
          });
          //console.log("2222222", token)
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
        <View style={styles.LoginSpace}>
          <TextInput
            style={styles.UserInput}
            placeholder=' Enter your Email...'
            onChangeText={email => setEmail(email.trim())}
            value={email}
          />
          <TextInput
            style={styles.UserInput}
            placeholder='Password'
            onChangeText={password => setPassword(password.trim())}
            value={password}
          />
  
              <TouchableOpacity style={styles.LoginBottom} onPress={handleLogin}>
                <Text> Login </Text>
              </TouchableOpacity>
              <View style={styles.SignUp}>
                <Text> Don't have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate("Sign up")}><Text>Sign Up</Text></TouchableOpacity>
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
  },
  LoginSpace: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  UserInput: {
    height: 40,
    width: '60%',
    borderWidth: 2,
    borderColor: '#ccc',
    margin: 10,
  },

  LoginBottom:{
    borderColor: '#ccc',
    borderWidth: 2,
    height: 30,
    width:'20%',
    alignItems:'center'
  },
  SignUp:{
    flexDirection: 'row',
  }
  
})
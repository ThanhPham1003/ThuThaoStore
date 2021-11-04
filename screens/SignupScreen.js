
import React, { useContext, useEffect, useState } from 'react';
import {Text, StyleSheet, View, TextInput, TouchableOpacity,Image} from 'react-native';
import {FirebaseContext} from '../context/FirebaseContext'




export default function SignupScreen ({navigation})  {
  const [user, setUser] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  
  const [hasAccount, setHasAccount] = useState(true);
  const firebase = useContext(FirebaseContext);

  const clearInputs = () => {
    setEmail('');
    setPassword('');
  }

  // const handleLogin = async () => {
  //   await firebase.signIn(email,password);
  // };

  const handleSignUp = async () => {
    await firebase.signUp(email, password);
  };
  // const hangdleLogout = () => {
  //   fire.auth().signOut();
  // };

  



  const UserInfo = async () => {

  }


  return(
    <View  style={styles.Container}>
      <View style={styles.LogoSpace}>
          <Image
          source = {require('../assets/cute-petshop-logo-with-cat-dog_454510-56.jpg')}
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
  );
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
  SignUpSpace: {
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
  },

  SignUpBottom:{
    borderColor: '#efb65c',
    borderWidth: 2,
    borderRadius: 10,
    height: 30,
    width:'20%',
    alignItems:'center',
    justifyContent: 'center',
    backgroundColor: '#efb65b'
  },
  LoginSpace:{
    flexDirection: 'row',
  },
  LoginText:{
    color: '#76c4d7'
  }
  
})
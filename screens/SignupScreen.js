
import React, { useContext, useEffect, useState } from 'react';
import {Text, StyleSheet, View, TextInput, TouchableOpacity} from 'react-native';
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
          secureTextEntry={true}
          onChangeText={password => setPassword(password.trim())}
          value={password}
        />

            <TouchableOpacity style={styles.LoginBottom} onPress={handleSignUp}>
              <Text> Sign Up </Text>
            </TouchableOpacity>
            <View style={styles.SignUp}>
              <Text> Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Sign in")}><Text>Login</Text></TouchableOpacity>
            </View>
            
          
      </View>
    </View>
  );
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

import { setStatusBarHidden } from 'expo-status-bar';
import React, { useContext, useEffect, useState } from 'react';
import { Text, StyleSheet, View, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import { FirebaseContext } from '../context/FirebaseContext'
import { TokenContext, TokenProvider } from '../context/TokenContext';
import API from '../config/environmentVariables'
import axios from 'axios';
import Modal from 'react-native-modal';
export default function SigninScreen({ navigation }) {

  const [user, setUser] = useState();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [auth, setAuth] = useState(false);
  const [hasAccount, setHasAccount] = useState(true);
  const firebase = useContext(FirebaseContext);
  const [tk, setTk] = useState(null);
  const [token, setToken] = useContext(TokenContext);
  const [loaded, setLoaded] = useState(true);

  useEffect(() => {
    if (tk) {
      fetchData(tk)
    }
  }, [tk])

  useEffect(() => {
    console.log('5555555', validateEmail(email));
  }, [email])
  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  const fetchData = async (token) => {
    const add = API.BASE_URL
    try {
      const res = await axios.get(add, {
        headers: {
          authorization: "Bearer " + token,
        }
      });
      if (res.data === 'Verified') {
        setToken(({
          token: tk,
          isLoggedIn: true,
        }))
      }
      setLoaded(true);
    } catch (err) {
      console.log("22222", err);
    }

  }


  const handleLogin = async () => {
    setLoaded(false);
    if(!validateEmail(email)){
      alert("Your email is invalid or empty. Please try it again!!!")
      setLoaded(true);
    }
    else if(!password){
      alert("Please enter your password.")
      setLoaded(true);
    }
    else {
      const tk = await firebase.signIn(email, password);
      if (!tk.isSuccessful) {
        setLoaded(true);
        alert(tk.message)
      } else {
        setTk(tk.message);
      }
      console.log("123 ", tk)
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View style={styles.Container}>
        <Modal
          animationType="slide"
          visible={!loaded}
        >
          <View style={styles.LoadingStyle}>
            <ActivityIndicator size="large" color="#000" />
            <Text> Chờ chút nhé...</Text>
          </View>
        </Modal>
        <View style={styles.LogoSpace}>
          <Image
            source={require('../assets/thuthaostore.jpg')}
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
          {/* <View style={styles.SignUpSpace}>
                <Text> Don't have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate("Sign up")}><Text style={styles.SignUpText}>Sign Up</Text></TouchableOpacity>
                
              </View> */}
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
    flex: 1,
    backgroundColor: '#ffffff',
  },
  LogoSpace: {
    flex: 5,
  },
  LogoStyle: {
    height: '100%',
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

  LoginBottom: {
    borderWidth: 2,
    borderRadius: 10,
    height: 30,
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5ceb2',
    marginTop: 30,
  },
  SignUpSpace: {
    flexDirection: 'row',
    marginTop: 30
  },
  SignUpText: {
    color: '#76c4d7'
  },
  LoadingStyle: {
    margin: 10,
    backgroundColor: "#efb65b",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
})
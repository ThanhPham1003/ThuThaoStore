
import React, { useContext, useEffect, useState } from 'react';
import {Text, StyleSheet, View, TextInput, TouchableOpacity,Image,KeyboardAvoidingView, ActivityIndicator} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons'
import {FirebaseContext} from '../context/FirebaseContext'
import { TokenContext, TokenProvider } from '../context/TokenContext';
import * as ImagePicker from 'expo-image-picker';
import API from '../config/environmentVariables'
import axios from "axios";
import Modal from 'react-native-modal';

export default function SignupScreen ({navigation})  {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [image, setImage] = useState(null);
  const firebase = useContext(FirebaseContext);
  const [token, setToken] = useContext(TokenContext);
  const [tk, setTk] = useState(null);
  const [loaded, setLoaded] = useState(true);
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);
  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
    });

    if (!result.cancelled) {
        setImage(result.uri);
    }
};
const sendData = async(tk) =>{

  const uid = firebase.getCurrentUser().uid;
  console.log("123456", uid);
  const data  = new FormData()
  data.append('email',email);
  data.append('uid', uid);
  data.append('name', name);
  data.append('age', age);
  data.append('userImage', {
      uri: image,
      type: 'image',
      name: image,
    });

  const res = await axios.post( API.BASE_URL + "users", data, {
      headers: {
          authorization: "Bearer " + tk,
      }

  });
      setLoaded(true);
      setToken(({
        token: tk,
        isLoggedIn: true,
      }))
  setName('');
  setAge('');
  setImage(null);
  setEmail('');
}
const uploadImage = async () => {
  await pickImage();
}
  const handleSignUp = async () => {
    setLoaded(false);
    const tk = await firebase.signUp(email, password);
    sendData(tk);
  };

  return(
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{flex: 1}}
    >
      <View  style={styles.Container}>
        <Modal
        animationType="slide"
        visible={!loaded}>
          <View style={styles.LoadingStyle}>
            <ActivityIndicator size="large" color="#000" />
            <Text> Wait a minute...</Text>
          </View>
        </Modal>  
        <TouchableOpacity style={styles.AddImageSpace} onPress={uploadImage}>
                    {image ?
                    <Image style={styles.ProductImage} source={{uri: image}} />
                    :
                    <>
                    <MaterialIcons name="add-a-photo" size={60}/>
                    <Text> Select your profile Photo</Text>
                    </>
                }
                </TouchableOpacity>
        <View style={styles.SignUpSpace}>
          <TextInput
            style={styles.UserInput}
            placeholder=' Enter your Name...'
            onChangeText={name => setName(name)}
            value={name}
          />
          <TextInput
            style={styles.UserInput}
            placeholder=' Enter your Age...'
            onChangeText={age => setAge(age)}
            value={age}
          />
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
  LoadingStyle:{
    margin: 10,
    backgroundColor: "#efb65b",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#fff",
    shadowOffset:{
      width: 0,
      height:2
    },
    shadowOpacity: 0.25,
    shadowRadius:4,
    elevation: 5
  },
  ModalStyle:{
    height:'40%',
    width: '80%',
  },
  AddImageSpace:{
    borderWidth: 3,
    height: '40%',
    width: '90%',
    borderRadius: 10,
    backgroundColor: '#e7eaed',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 30,
    marginTop:40,
  },
  ProductImage:{
      width: '90%',
      height:'90%'
  },
  SignUpSpace: {
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
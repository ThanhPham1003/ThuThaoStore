import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Picker,Image, KeyboardAvoidingView, Alert } from 'react-native';
import { TokenContext, TokenProvider } from '../context/TokenContext';
import { HomeUpdatedContext, HomeUpdatedProvider } from '../context/HomeUpdatedContext';
import {FirebaseContext} from '../context/FirebaseContext'
import * as ImagePicker from 'expo-image-picker';
import API from '../config/environmentVariables';
import {MaterialIcons} from '@expo/vector-icons'
import RNPickerSelect from 'react-native-picker-select'
export default function PostProductScreen(props){
    const {navigation} = props;
    const firebase = useContext(FirebaseContext);
    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [orderquantity, setOrderQuantity] =  useState('');
    const [cost, setCost] = useState('');
    const [sell, setSell] = useState('');
    const [daysubmitted, setDaysubmitted] = useState('');
    const [status, setStatus] = useState('status');
    const [image, setImage] = useState(null);
    const [token, setToken] = useContext(TokenContext);
    const [reload, setReload] = useContext(HomeUpdatedContext);
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
    

    const sendData = async() =>{
        const data  = new FormData()
        const uid = firebase.getCurrentUser().uid;
        data.append('uid', uid);
        data.append('name', name);
        data.append('cost', cost);
        data.append('sell', sell);
        data.append('code', code);
        data.append('orderquantity', orderquantity);
        data.append('daysubmitted', daysubmitted)
        data.append('status', status)
        data.append('productImage', {
            uri: image,
            type: 'image',
            name: image,
          });

        const res = await axios.post( API.BASE_URL + "products/allproducts", data, {
            headers: {
                authorization: "Bearer " + token.token,
            }

        });
        Alert.alert(res.data)
        setReload({isUpdated: true})
        setName('');
        setDaysubmitted('');
        setStatus('');
        setCost('')
        setSell('');
        setCode('');
        setOrderQuantity('');
        setImage(null);
    }

    const uploadImage = async () => {
        await pickImage();
    }

    return(
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{flex: 1}}
        >
            <View style ={styles.Container}>
                <TouchableOpacity style={styles.AddImageSpace} onPress={uploadImage}>
                    {image ?
                    <Image style={styles.ProductImage} source={{uri: image}} />
                    :
                    <>
                    <MaterialIcons name="add-a-photo" size={60}/>
                    <Text> Select a photo for your Product</Text>
                    </>
                }
                </TouchableOpacity>
                <TextInput
                    style={styles.ProductInput}
                    placeholder='Name'
                    onChangeText={name => setName(name)}
                    value={name}
                />
                <TextInput
                    style={styles.ProductInput}
                    placeholder='Cost'
                    keyboardType={'decimal-pad'}
                    onChangeText={cost => setCost(cost)}
                    value={cost}
                />
                <TextInput
                    style={styles.ProductInput}
                    placeholder='Sell'
                    keyboardType={'decimal-pad'}
                    onChangeText={sell => setSell(sell)}
                    value={sell}
                />
                <TextInput
                    style={styles.ProductInput}
                    placeholder='Code'
                    onChangeText={code => setCode(code)}
                    value={code}
                />
                < TextInput
                   style={styles.ProductInput}
                    placeholder='Order Quantity'
                    keyboardType={'decimal-pad'}
                    onChangeText={orderquantity => setOrderQuantity(orderquantity)}
                    value={orderquantity}
                />
                < TextInput
                   style={styles.ProductInput}
                    placeholder='Day Submitted'
                    onChangeText={daysubmitted => setDaysubmitted(daysubmitted)}
                    value={daysubmitted}
                />

                <View style={styles.StatusPicker}>
                    <RNPickerSelect
                    placeholder={{label : "Select your status", value: "status"}}
                    onValueChange={(itemValue) => setStatus(itemValue)}
                    items={[
                        { label : "Available", value: "Available" },
                        { label: "Ordering", value: "Ordering" }

                    ]} />
                </View>


                

                <TouchableOpacity style={styles.SendBot} onPress={() => sendData()}>
                    <Text> Send </Text>
                </TouchableOpacity>
            </View>  
        </KeyboardAvoidingView>
    )
}
const styles = StyleSheet.create({
    Container: {
        flex:1,
        //justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5ceb2',
    },
    AddImageSpace:{
        borderWidth: 3,
        height: '20%',
        width: '60%',
        borderRadius: 10,
        backgroundColor: '#e7eaed',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 30,
    },
    ProductImage:{
        width: '90%',
        height:'90%'
    },
    ProductInput: {
        height: 50,
        width: '70%',
        borderWidth: 5,
        borderColor: '#efb65c',
        backgroundColor: '#e7eaed',
        borderRadius: 20,
        margin: 5,
        padding: 10,
        
    },
    StatusPicker:{
        height: 50,
        width: '70%',
        borderWidth: 5,
        borderColor: '#efb65c',
        backgroundColor: '#e7eaed',
        borderRadius: 20,
        margin: 5,
        padding: 10
    },
    SendBot: {
        borderColor: '#efb65c',
        borderWidth: 2,
        borderRadius: 10,
        height: 30,
        width:'20%',
        alignItems:'center',
        justifyContent: 'center',
        backgroundColor: '#efb65b',
        marginTop:10,
    }
})

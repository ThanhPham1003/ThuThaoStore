import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Button,Image, KeyboardAvoidingView, Alert } from 'react-native';
import { TokenContext, TokenProvider } from '../context/TokenContext';
import * as ImagePicker from 'expo-image-picker';
import API from '../config/environmentVariables';
import {MaterialIcons} from '@expo/vector-icons'
export default function PostClientScreen(props){
    const {navigation} = props;
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [link, setLink] = useState('');
    const [phone, setPhone] = useState('');
    const [deposit, setDeposit] = useState('');
    const [token, setToken] = useContext(TokenContext);
    
    const sendData = async() => {
        const data = new FormData()

        data.append('name', name);
        data.append('address', address);
        data.append('link', link);
        data.append('phone', phone);
        data.append('deposit', deposit);
        console.log("55555", data)
        const res = await axios.post( API.BASE_URL + "clients" ,{name: name, address: address, link: link, phone: phone, deposit: deposit}, {
            headers: {
                authorization: "Bearer " + token.token,
            }
        });
        Alert.alert(res.data);
        setName('');
        setAddress('');
        setLink('');
        setPhone('');
        setDeposit('');
    }
    return(
        <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{flex: 1}} >
            <View style={styles.Container}>
                <TextInput
                    style={styles.ClientInput}
                    placeholder='Name'
                    onChangeText={name => setName(name)}
                    value={name}
                />
                <TextInput
                    style={styles.ClientInput}
                    placeholder='Address'
                    onChangeText={address => setAddress(address)}
                    value={address}
                />
                <TextInput
                    style={styles.ClientInput}
                    placeholder='Link'
                    onChangeText={link => setLink(link)}
                    value={link}
                />
                <TextInput
                    style={styles.ClientInput}
                    placeholder='Phone Number'
                    onChangeText={phone => setPhone(phone)}
                    value={phone}
                />
                <TextInput
                    style={styles.ClientInput}
                    placeholder='Deposit'
                    onChangeText={deposit => setDeposit(deposit)}
                    value={deposit}
                />
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
    ClientInput:{
        height: 50,
        width: '70%',
        borderWidth: 5,
        borderColor: '#efb65c',
        backgroundColor: '#e7eaed',
        borderRadius: 20,
        margin: 10,
        padding: 10,
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
        marginTop:30,
    }
})

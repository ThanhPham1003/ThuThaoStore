import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Button,Image, KeyboardAvoidingView, ActivityIndicator, Alert } from 'react-native';
import { TokenContext, TokenProvider } from '../context/TokenContext';
import { ClientUpdatedContext, ClientUpdatedProvider } from '../context/ClientUpdatedContext';
import {FirebaseContext} from '../context/FirebaseContext'
import API from '../config/environmentVariables';
import Modal from 'react-native-modal';
export default function PostClientScreen(props){
    const firebase = useContext(FirebaseContext);
    const {navigation} = props;
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [link, setLink] = useState('');
    const [phone, setPhone] = useState('');
    const [token, setToken] = useContext(TokenContext);
    const [reload, setReload] = useContext(ClientUpdatedContext);
    const [loaded, setLoaded] = useState(true);
    const sendData = async() => {
        setLoaded(false);
        const uid = firebase.getCurrentUser().uid;
        const res = await axios.post( API.BASE_URL + "clients" ,{uid: uid, name: name, address: address, link: link, phone: phone}, {
            headers: {
                authorization: "Bearer " + token.token,
            }
        });
        Alert.alert(res.data);
        setLoaded(true)
        setReload({isUpdated: true})
        setName('');
        setAddress('');
        setLink('');
        setPhone('');
    }
    return(
        <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{flex: 1}} >
            <View style={styles.Container}>
            <Modal
                animationType="slide"
                visible={!loaded}>
                <View style={styles.LoadingStyle}>
                    <ActivityIndicator size="large" color="#000" />
                    <Text> Chờ chút nhé...</Text>
                </View>
            </Modal>  
                <TextInput
                    style={styles.ClientInput}
                    placeholder='Tên khách hàng'
                    onChangeText={name => setName(name)}
                    value={name}
                />
                <TextInput
                    style={styles.ClientInput}
                    placeholder='Địa chỉ'
                    onChangeText={address => setAddress(address)}
                    value={address}
                />
                <TextInput
                    style={styles.ClientInput}
                    placeholder='Link facebook'
                    onChangeText={link => setLink(link)}
                    value={link}
                />
                <TextInput
                    style={styles.ClientInput}
                    placeholder='Số điện thoại'
                    keyboardType={'decimal-pad'}
                    onChangeText={phone => setPhone(phone)}
                    value={phone}
                />
                <TouchableOpacity style={styles.SendBot} onPress={() => sendData()}>
                    <Text> Lưu khách hàng </Text>
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
        width:'40%',
        alignItems:'center',
        justifyContent: 'center',
        backgroundColor: '#efb65b',
        marginTop:30,
    }
})

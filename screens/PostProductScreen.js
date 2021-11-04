import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Button } from 'react-native';
// import { Camera } from 'expo-camera';
import API from '../config/environmentVariables';
export default function PostProductScreen(props){
    const {navigation} = props;
    const [url, setUrl] = useState();
    const [name, setName] = useState();
    const [age, setAge] = useState();
    const [colorProduct, setColorProduct] =  useState();
    const [price, setPrice] = useState();
    
    // useEffect(() => {
    //     console.log("234234");
    //     if(url)
    //     {
    //         sendData(url);
    //     }
    // },[url])



    const sendData = async() =>{
        console.log("222222");
        const res = await axios.post( API.BASE_URL + "products", {
            headers: {
                uid: "123456",
                name: name,
                age: age,
                color: colorProduct,
                price: price,
                url: url,
            },
        })
    }

    
    
    return(
        <View style ={styles.Container}>

        
            <TextInput
                style={styles.ProductInput}
                placeholder=' Enter your URL...'
                onChangeText={url => setUrl(url)}
                value={url}
            />
            <TextInput
                style={styles.ProductInput}
                placeholder='Name'
                onChangeText={name => setName(name)}
                value={name}
            />
            <TextInput
                style={styles.ProductInput}
                placeholder='Age'
                onChangeText={age => setAge(age)}
                value={age}
            />
            <TextInput
                style={styles.ProductInput}
                placeholder='Color'
                onChangeText={colorProduct => setColorProduct(colorProduct)}
                value={colorProduct}
            />
            <TextInput
                style={styles.ProductInput}
                placeholder='Price'
                onChangeText={price => setPrice(price)}
                value={price}
            />
            <TouchableOpacity style={styles.SendBot} onPress={() => sendData()}>
                <Text> Send </Text>
            </TouchableOpacity>
        </View>  
    )
}
const styles = StyleSheet.create({
    Container: {
        flex:1,
    },
    ProductInput: {
        height: 40,
        width: '60%',
        borderWidth: 2,
        borderColor: '#ccc',
        margin: 10,
    },
    SendBot: {
        backgroundColor: 'red',
        borderWidth: 3
    }
})

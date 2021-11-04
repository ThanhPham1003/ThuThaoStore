import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import API from '../config/environmentVariables';
export default function PostProductScreen(props){
    const {navigation} = props;
    const [url, setUrl] = useState();
    const [name, setName] = useState();
    const [age, setAge] = useState();
    const [colorProduct, setColorProduct] =  useState();
    const [price, setPrice] = useState();
    const [image, setImage] = useState(null);
    
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
  
        console.log('11111 pickImage',result);
  
        if (!result.cancelled) {
            setImage(result.uri);
        }
    };
    

    const sendData = async() =>{
        const data  = new FormData()
        
        data.append('uid', '123456');
        data.append('name', name);
        data.append('age', age);
        data.append('color', colorProduct);
        data.append('price', price);
        data.append('url', '1234567');
        data.append('productImage', {
            uri: image,
            type: 'image/png',
            name: 'image.png',
          });

        const res = await axios.post( API.BASE_URL + "products", data)
    }

    const uploadImage = async () => {
        console.log('22222233334444');
        await pickImage();
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

            <TouchableOpacity style={styles.SendBot} onPress={() => uploadImage()}>
                <Text> Select from Gallery </Text>
            </TouchableOpacity>

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

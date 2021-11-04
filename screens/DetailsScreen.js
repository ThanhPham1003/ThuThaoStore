import React, { useEffect, useState } from "react";
import { View, Text,StyleSheet, TouchableOpacity, Image } from 'react-native';
import axios from "axios";
import { TextInput } from "react-native-gesture-handler";
import API from '../config/environmentVariables';

export default DetailsScreen = ({route,navigation}) => {
    const {id} = route.params;
    const [product, setProduct] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState('');
    const [newAge, setNewAge] = useState('');
    const [newColor, setNewColor] = useState('');
    const [newPrice, setNewPrice] = useState('');
    useEffect(() => {
        fetchData();
    },[])

    useEffect(() => {
        const {name = '', age = '', color = '', price = ''} = product
        setNewName(name);
        setNewAge(age);
        setNewColor(color);
        setNewPrice(price.toString())
    }, [product])
    const fetchData = async () => {
        const add = API.BASE_URL + "products/" + id;
        const res  = await axios.get(add);
        setProduct(res.data);
    }
    const deleteData = async () => {
        const add = API.BASE_URL + "products/" + id;
        const res = await axios.delete(add);
        navigation.goBack();
    }
    const updateData = async () => {
        const add = API.BASE_URL + "products/" + id;
        const res = await axios.patch(add, {
            headers: {
                name: newName,
                age: newAge,
                color: newColor,
                price: newPrice,
            },
        });
        fetchData();
        setIsEditing(false);
    }




    return(
        <View style={styles.Container}>
            <View style={styles.ProductPhotoSpace}>
                <Image 
                 source = {{uri: product.url}}   
                 style={styles.ProductPhoto}
                />
            </View>
            <View style={styles.ProductInformation}>
                {isEditing ? (
                <View>
                    <View style={styles.ProductTittle}>
                        <TextInput 
                        value= {newName}
                        onChangeText={(text) => setNewName(text)} />
                    </View>
                    <View style={styles.ProductSpecs}>
                        <Text style={styles.ProductSpecsText}>Age: </Text>
                        <TextInput 
                        value= {newAge}
                        onChangeText={(text) => setNewAge(text)} />
                        <Text style={styles.ProductSpecsText}>Color:  </Text>
                        <TextInput 
                        value= {newColor}
                        onChangeText={(text) => setNewColor(text)} />
                        <Text style={styles.ProductSpecsText}>Price: </Text>
                        <TextInput 
                        value= {newPrice}
                        keyboardType={'decimal-pad'}
                        onChangeText={(text) => setNewPrice(text)} />
                    {/* <Text style={styles.ProductSpecsText}>Date submit: {product.date}</Text> */}
                    </View>
                    <TouchableOpacity style={styles.DeleteButton} onPress={updateData}>
                        <Text> Save </Text>
                    </TouchableOpacity>
                </View>
                ) : (
                <View>
                    <View style={styles.ProductTittle}>
                        <Text style={styles.ProductTittleText}> {product.name} </Text>

                    </View>
                    <View style={styles.ProductSpecs}>
                        <Text style={styles.ProductSpecsText}>Age: {product.age}</Text>
                        <Text style={styles.ProductSpecsText}>Color: {product.color} </Text>
                        <Text style={styles.ProductSpecsText}>Price: {product.price}$</Text>
                        
                        {/* <Text style={styles.ProductSpecsText}>Date submit: {product.date}</Text> */}
                    </View>
                    
                

                    <TouchableOpacity style={styles.DeleteButton} onPress={deleteData}>
                        <Text> Delete </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.DeleteButton} onPress={() => setIsEditing(true)}>
                        <Text> Edit</Text>
                    </TouchableOpacity>
                </View>
            )}
            </View>    
        </View>
    )
}
const styles = StyleSheet.create({
    Container: {
      flex:1,
      backgroundColor: '#f9e3bd'
    },
    ProductPhotoSpace:{
        //backgroundColor: 'yellow',
        flex:4,
        // height: '40%',
        // width: '100%',
        alignItems: 'center',
        justifyContent:'center'
    },
    ProductPhoto:{
        height:'90%',
        width: '90%', 
        borderRadius: 20,
        
    },
    ProductInformation:{
        // height: '60%',
        // width: '100%',
        flex: 6,
       
        //justifyContent: "center",
        //backgroundColor: "red"
        
    },
    ProductTittle:{
        alignItems: "center",
    },
    ProductTittleText:{
        fontSize: 28,
        color: '#0C3674',
    },
    ProductSpecs:{
        marginLeft: 20,
    },
    ProductSpecsText:{
        fontSize: 20,
        marginTop: 20,
    },
    DeleteButton:{
        borderWidth: 3,
        margin:20,
    }

  })
import React, { useEffect, useState } from "react";
import { View, Text,StyleSheet, TouchableOpacity, Image } from 'react-native';
import axios from "axios";
export default DetailsScreen = ({route,navigation}) => {
    const {id} = route.params;
    const [product, setProduct] = useState({});
    useEffect(() => {
        fetchData();
    },[])
    const fetchData = async () => {
        const add = "http://192.168.1.9:5000/products/" + id;
        const res  = await axios.get(add);
        setProduct(res.data);
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
                <View style={styles.ProductTittle}>
                    <Text style={styles.ProductTittleText}> {product.name} </Text>
                </View>
                <View style={styles.ProductSpecs}>
                    <Text style={styles.ProductSpecsText}>Age: {product.age}</Text>
                    <Text style={styles.ProductSpecsText}>Color: {product.color} </Text>
                    <Text style={styles.ProductSpecsText}>Price: {product.price}$</Text>
                    <Text style={styles.ProductSpecsText}>Date submit: {product.date}</Text>
                </View>

            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    Container: {
      flex:1,
      backgroundColor: '#a9d1b9'
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
    }

  })
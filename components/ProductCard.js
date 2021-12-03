import React, { useContext, useEffect, useState } from 'react';
import { View, Text,StyleSheet, TouchableOpacity, Image } from 'react-native'
import {FirebaseContext} from '../context/FirebaseContext';
import API from '../config/environmentVariables';

export default ProductCard = (props) => {
    const {data, navigation}  = props
    const {item} = data;
    const [image, setImage] = useState('');
    const [id, setID] = useState();
    useEffect(() => {
      const url = API.BASE_URL + item.url;
      let path2 = url.replace(/\\/g, "/");
      setImage(path2)
    })


    const details = (id) => {

        navigation.navigate('Details',{id})
    }
    return (
    <View style={styles.Container}>
        <View style={styles.ProductContainer}>
          <Image
          source = {{uri: image}}
          style={styles.ProductImage} />
          <View style={styles.ProductTittleAndInfo}>
            <TouchableOpacity
             style={styles.ProductTittle}
             onPress={() => details(item._id)}
             >
              <Text style={styles.ProductTittleText}> {item.name} </Text>
            </TouchableOpacity>
            <View style={styles.ProductInfo}>
                <Text> Code: {item.code}  </Text>
                <Text> Quantity: {item.orderquantity} </Text>
                <Text> Price: {item.price} $ </Text>
            </View>
          </View>
        </View>
    </View>  
    )
}
const styles = StyleSheet.create({
    Container: {
      flex:1,
      // justifyContent: 'center',
      alignItems: 'center',
      //backgroundColor: 'yellow'
    },
    // HomeTittle:{
    //   fontSize: 64,
    //   fontWeight: "200",
    //   textAlign: 'center',
    // }
    ProductContainer:{
      flexDirection:'row',
      marginTop: 20,
      height: 120,
      width: ' 90%',
      borderRadius: 10,
      backgroundColor:  '#FFFFFF',
    },
    ProductImage:{
      width:100,
      height: '80%',
      borderRadius: 20,
      marginTop: 12,
      marginLeft: 10,
    },
    ProductTittleAndInfo:{
      flexDirection: 'column',
    },
    ProductTittle:{
      marginLeft: 80,
      marginTop: 10,
    },
    ProductTittleText:{
      color: '#0C3674',
      fontSize:  16,
    },
    ProductInfo:{
      marginLeft: 20,
      marginTop: 10,
    }
  })
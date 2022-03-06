import React, { useContext, useEffect, useState } from 'react';
import { View, Text,StyleSheet, TouchableOpacity, Image } from 'react-native'
import {FirebaseContext} from '../context/FirebaseContext';
import API from '../config/environmentVariables';
import AntDesign from 'react-native-vector-icons/AntDesign';
export default ProductCard = (props) => {
    const {data, navigation}  = props
    const {item} = data;
    const [image, setImage] = useState('');
    const [id, setID] = useState();


    const gotoDetails = (id) => {

      navigation.navigate('Sản Phẩm',{id})
    }
    return (
    <TouchableOpacity 
      style={styles.Container}
      onPress={() => gotoDetails(item._id)}
    
    >
        <View style={styles.ProductContainer}>
          <Image
          source = {{uri: item.url}}
          style={styles.ProductImage} />
          <View style={styles.ProductTittleAndInfo}>
           
              <Text style={styles.ProductTittleText}> {item.tenSP} </Text>
              <Text style={styles.ProductTittleText}> Code: {item.code}  </Text>

          </View>

        </View>
    </TouchableOpacity>  
    )
}
const styles = StyleSheet.create({
    Container: {
      //flex:1,
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
      minHeight: 120,
      width: ' 90%',
      borderRadius: 10,
      backgroundColor:  '#FFFFFF',
    },
    ProductImage:{
      width: 120,
      height: '80%',
      borderRadius: 20,
      marginTop: 12,
      marginLeft: 10,
    },
    ProductTittleAndInfo:{
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 40,
    },
    // ProductTittle:{
      
    //   marginTop: 10,
    // },
    ProductTittleText:{
      color: '#0C3674',
      fontSize:  20,
      marginTop: 5,
    },
    ProductInfo:{
      marginLeft: 20,
      marginTop: 10,
    },
    PlusBottom :{
      flex: 3,
      justifyContent: 'center',
      alignItems: 'center'
      //marginLeft: 0,
      // marginTop: 50
    }
  })
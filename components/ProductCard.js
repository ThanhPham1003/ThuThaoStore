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
    const gotoOrder = (product) => {
      navigation.navigate('Order', {product, navigation})
    }
    return (
    <View style={styles.Container}>
        <View style={styles.ProductContainer}>
          <Image
          source = {{uri: item.url}}
          style={styles.ProductImage} />
          <View style={styles.ProductTittleAndInfo}>
            <TouchableOpacity
             style={styles.ProductTittle}
             onPress={() => gotoDetails(item._id)}
             >
              <Text style={styles.ProductTittleText}> {item.name} </Text>
            </TouchableOpacity>
            <View style={styles.ProductInfo}>
                <Text> Code: {item.code}  </Text>
                <Text> Số lượng: {item.orderquantity} </Text>
                <Text> Giá Nhập: {item.cost}  </Text>
                <Text> Giá Bán: {item.sell}  </Text>
            </View>
          </View>
          <View style ={styles.PlusBottom}>
            <TouchableOpacity onPress={() => gotoOrder(item)}>
              <AntDesign name='plussquare' size = '40' color='#efb65b'/>
            </TouchableOpacity>
          </View>
        </View>
    </View>  
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
      flex: 1,
      flexDirection:'row',
      marginTop: 20,
      minHeight: 120,
      width: ' 90%',
      borderRadius: 10,
      backgroundColor:  '#FFFFFF',
    },
    ProductImage:{
      flex: 3,
      width:100,
      height: '80%',
      borderRadius: 20,
      marginTop: 12,
      marginLeft: 10,
    },
    ProductTittleAndInfo:{
      flexDirection: 'column',
      flex: 4,
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
    },
    PlusBottom :{
      flex: 3,
      justifyContent: 'center',
      alignItems: 'center'
      //marginLeft: 0,
      // marginTop: 50
    }
  })
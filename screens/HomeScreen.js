import React, { useContext, useEffect, useState } from 'react';
import axios from "axios";
import { View, Text,StyleSheet, TouchableOpacity, Image,FlatList } from 'react-native'
import {FirebaseContext} from '../context/FirebaseContext'
import { TokenContext, TokenProvider } from '../context/TokenContext';
//import { FlatList } from 'react-native-gesture-handler';
import ProductCard from '../components/ProductCard';

// export default function HomeScreen({token, navigation}) {
  export default function HomeScreen(props) {
  const {navigation} = props;
  const firebase = useContext(FirebaseContext);
  const [token, _] = useContext(TokenContext);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    if(token)
    {
      fetchData(token);
    }
  }, [token])

  const fetchData = async (token) => {
    // const req = await axios.post("http://localhost:5000/users", {
    //     headers: {
    //       authorization: "Thanh " + token,
    //     }
    // });
    // console.log(req.data);
      const res = await axios.get("http://192.168.1.9:5000/products");
      setProducts(res.data);

  }

  const logOut = async () =>{

    await firebase.logOut();
    navigation.navigate("Sign in");
  }

  // const goToDetail = () => {
  //   console.log('aaaaaaaaa');
  //   navigation.navigate("Details");
  // }


  return (
    <View style={styles.Container}>
        {/* <Image
        source = {{uri: "https://ichef.bbci.co.uk/news/976/cpsprodpb/EB24/production/_112669106_66030514-b1c2-4533-9230-272b8368e25f.jpg"}}
        style={styles.ProductImage} />
        <View style={styles.ProductTittleAndInfo}>
          <View style={styles.ProductTittle}>
            <Text style={styles.ProductTittleText}> Husky </Text>
          </View>
          <View style={styles.ProductInfo}>
              <Text> Age: 1 months </Text>
              <Text> Color: Black </Text>
              <Text> Price: 1000$ </Text>
          </View>
        </View> */}
        <FlatList
          data={products}
          renderItem={(item) => <ProductCard data={item} navigation={navigation}/> }
          keyExtractor={item => item._id}
        />
      <TouchableOpacity  onPress={logOut}>
        <Text> Logout </Text>
      </TouchableOpacity>
    </View>
  )
}
  const styles = StyleSheet.create({
    Container: {
      // justifyContent: 'center',
      //alignItems: 'center',
      backgroundColor:'#a9d1b9',
      flex:1,
      
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


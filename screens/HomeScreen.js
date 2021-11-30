import React, { useContext, useEffect, useState } from 'react';
import axios from "axios";
import { View, Text,StyleSheet, TouchableOpacity, Image,FlatList } from 'react-native'
import {FirebaseContext} from '../context/FirebaseContext'
import { TokenContext, TokenProvider } from '../context/TokenContext';
//import { FlatList } from 'react-native-gesture-handler';
import ProductCard from '../components/ProductCard';
import { TextInput } from 'react-native-gesture-handler';
import API from '../config/environmentVariables'
import Ionicons from 'react-native-vector-icons/Ionicons';
// export default function HomeScreen({token, navigation}) {
  export default function HomeScreen(props) {
  const {navigation} = props;
  const firebase = useContext(FirebaseContext);
  const [token, setToken] = useContext(TokenContext);
  const [products, setProducts] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);
  const [search, setSearch] = useState('');
  useEffect(() => {
    if(token)
    {
      fetchData(token);
    }
  }, [])

  const fetchData = async (token) => {
    

      const res2 = await axios.get(API.BASE_URL + "products/allproducts",{
        headers: {
          authorization: "Bearer " + token.token,
        }
      });
      //console.log("333333" , res2)
      setProducts(res2.data);
      setFilterProducts(res2.data);
      //console.log("555555", res2.data);
 
  }



  const searchFilter = (text) => {
    if(text) {
      //console.log(text)
      const newData = filterProducts.filter((item) => {
        //console.log(item.name);
        const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
        //console.log(itemData.indexOf(textData))
      });
      setProducts(newData);
      setSearch(text);
    }else{
      setProducts(filterProducts);
      setSearch(text);
    }
  }


  // const goToDetail = () => {
  //   console.log('aaaaaaaaa');
  //   navigation.navigate("Details");
  // }


  return (
    <View style={styles.Container}>
      <View style={styles.SearchSpace}>
        <Ionicons name="search" size={25} style={styles.SearchIcon}/>
        <TextInput 
          //style={styles.SearchBar}
          value={search}
          placeholder="Search Here"
          onChangeText={(text) => searchFilter(text)}
        
        />
      </View>
        <FlatList
          data={products}
          renderItem={(item) => <ProductCard data={item} navigation={navigation}/> }
          keyExtractor={(item, index) => index.toString()}
        />
    </View>
  )
}
  const styles = StyleSheet.create({
    Container: {
      // justifyContent: 'center',
      //alignItems: 'center',
      backgroundColor:'#f9e3bd',
      flex:1,
      
    },
    
    SearchSpace:{
      flexDirection: 'row',
      borderWidth: 3,
      borderRadius: 10,
      borderColor: '#efb65c',
      margin: 5,
    },
    SearchIcon:{
      margin:10,
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


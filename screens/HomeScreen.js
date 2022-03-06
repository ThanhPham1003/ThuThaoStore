import React, { useContext, useEffect, useState } from 'react';
import axios from "axios";
import { View, Text,StyleSheet, TouchableOpacity, Image,FlatList } from 'react-native'
import {FirebaseContext} from '../context/FirebaseContext'
import { TokenContext, TokenProvider } from '../context/TokenContext';
import { HomeUpdatedContext, HomeUpdatedProvider } from '../context/HomeUpdatedContext';
import ProductCard from '../components/ProductCard';
import { TextInput } from 'react-native-gesture-handler';
import API from '../config/environmentVariables'
import Ionicons from 'react-native-vector-icons/Ionicons';
// export default function HomeScreen({token, navigation}) {
  export default function HomeScreen(props) {
  const {navigation} = props;
  const firebase = useContext(FirebaseContext);
  const [token, setToken] = useContext(TokenContext);
  const [reload, setReload] = useContext(HomeUpdatedContext);
  const [products, setProducts] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);
  const [search, setSearch] = useState('');
  // useEffect(() => {
  //     fetchData(token);
  // }, [])
  useEffect(() => {
    fetchData(token);
    setReload({isUpdated: false});
}, [reload.isUpdated])

  const fetchData = async (token) => {
      const res2 = await axios.get(API.BASE_URL + "products/allproducts",{
        headers: {
          authorization: "Bearer " + token.token,
        }
      });
      //console.log("333333" , res2)
      setProducts(res2.data);
      setFilterProducts(res2.data);
      
  }



  const searchFilter = (text) => {
    if(text) {
      //console.log(text)
      const newData = filterProducts.filter((item) => {
        //console.log(item.name);
        const itemData = item.tenSP ? item.tenSP.toUpperCase() : ''.toUpperCase();
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
          placeholder="Tìm kiếm sản phẩm"
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
      backgroundColor:'#f5ceb2',
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

    
  })


import React, { useContext, useState, useEffect } from "react";
import {View, Text, StyleSheet, FlatList, TextInput} from 'react-native';
import API from '../config/environmentVariables';
import axios from "axios";
import {FirebaseContext} from '../context/FirebaseContext'
import { TokenContext, TokenProvider } from '../context/TokenContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { HistoryUpdatedContext } from "../context/HistoryUpdatedContext";
export default function History(props){
  const {navigation} = props;
  const firebase = useContext(FirebaseContext);
  const [token, setToken] = useContext(TokenContext);
  const [products, setProducts] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [user, setUser] = useState('');
  const [loinhuanThangtruoc, setLoinhuanThangtruoc] = useState('');
  const [loinhuanThangnay, setLoinhuanThangnay] = useState('');
  const [reload, setReload] = useContext(HistoryUpdatedContext)
  useEffect(() => {
    fetchData(token);
    setReload({isHistoryUpdated: false})
  }, [reload.isHistoryUpdated])
  const fetchData = async (token) => {
    const uid = firebase.getCurrentUser().uid;
        const add = API.BASE_URL + "users/" + uid;
        const res = await axios.get(add, {
            headers: {
              authorization: "Bearer " + token.token,
            }
        });
    setUser(res);
    setLoinhuanThangtruoc(res.data.lastsells);
    setLoinhuanThangnay(res.data.currentsells);    
    const res2 = await axios.get(API.BASE_URL + "products/histories",{
      headers: {
        authorization: "Bearer " + token.token,
      }
    });
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

  return(
    <View style={styles.Container}>
      <View style={styles.ProfitSpace}>
          <Text style={styles.ProfitTextSpace}>Lợi nhuận trong tháng : {loinhuanThangnay} </Text>
          <Text style={styles.ProfitTextSpace}>Lợi nhuận tháng trước : {loinhuanThangtruoc}</Text>
          
      </View>
      <View style={styles.HistorySpace}>
          <Text style={styles.HistoryText}>Lịch sử mua hàng</Text>
      </View>
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
    flex:1,
    backgroundColor: '#f5ceb2'
  },
  ProfitSpace:{
    marginLeft: 20,
    marginTop: 30,
  },
  ProfitTextSpace:{
    fontSize: 24,
    color: '#0C3674',
  },
  HistorySpace:{
    marginLeft: 20,
    marginTop: 30,
  },
  HistoryText:{
    fontSize: 16,
    color: '#0C3674',
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
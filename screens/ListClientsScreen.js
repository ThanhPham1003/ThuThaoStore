import React, { useContext, useEffect, useState } from 'react';
import axios from "axios";
import { View, Text,StyleSheet, TouchableOpacity, Image,FlatList } from 'react-native'
import {FirebaseContext} from '../context/FirebaseContext'
import { TokenContext, TokenProvider } from '../context/TokenContext'
import { ClientUpdatedContext, ClientUpdatedProvider } from '../context/ClientUpdatedContext';
import { TextInput } from 'react-native-gesture-handler';
import API from '../config/environmentVariables'
import Ionicons from 'react-native-vector-icons/Ionicons';
import ClientCardDetail from '../components/ClientCardDetail';

export default function ListClientsScreen(props){
  const {navigation} = props;
  const [token, setToken] = useContext(TokenContext);
  const [reload, setReload] = useContext(ClientUpdatedContext);
  const [clients, setClients] = useState([]);
  const [filterClients, setFilterClients] = useState([]);
  const [search, setSearch] = useState('');
  useEffect(() => {
    fetchClient(token);
    setReload({isUpdated: false})
}, [reload.isUpdated])
  const fetchClient = async (token) =>{
    const res = await axios.get(API.BASE_URL + "clients",{
      headers: {
        authorization: "Bearer " + token.token,
      }
    });
    setClients(res.data);
    setFilterClients(res.data);
  };
  const searchFilter = (text) => {
    if(text) {
      //console.log(text)
      const newData = filterClients.filter((item) => {
        //console.log(item.name);
        const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
        //console.log(itemData.indexOf(textData))
      });
      setClients(newData);
      setSearch(text);
    }else{
      setClients(filterClients);
      setSearch(text);
    }
  }
  return(
    <View style={styles.Container}>
      <View style={styles.SearchSpace}>
        <Ionicons name="search" size={25} style={styles.SearchIcon}/>
        <TextInput 
          //style={styles.SearchBar}
          value={search}
          placeholder="Tìm kiếm khách hàng"
          onChangeText={(text) => searchFilter(text)}
        />
      </View>
      <FlatList
      data={clients}
      renderItem={(item) => <ClientCardDetail data={item} navigation={navigation} />}
      keyExtractor={(item, index) => index.toString()} />
    </View>
  )
}

const styles = StyleSheet.create({
  Container:{
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
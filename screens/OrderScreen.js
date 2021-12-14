import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, FlatList,Image, KeyboardAvoidingView, Alert } from 'react-native';
import { TokenContext, TokenProvider } from '../context/TokenContext';
import API from '../config/environmentVariables';
import ClientCardOrder from '../components/ClientCardOrder';
export default function OrderScreen({route, props}){
  const {product, navigation} = route.params;  
  //const {navigation} = props;
  const [clientName, setClientName] = useState('');
  const [phone, setPhone] = useState('');
  const [clientID, setClientID] = useState('');
  const [type, setType] = useState('');
  const [amount, setAmount] = useState('');
  const [deposit, setDeposit] = useState('');
  const [dayordered, setDayordered] = useState('');
  const [token, setToken] = useContext(TokenContext);
  const [clients, setClients] = useState([]);
  const [filterClients, setFilterClients] = useState([]);
  const [search, setSearch] = useState('');  
  
  useEffect(() => {
      fetchData(token);
  },[])
  const fetchData = async (token) => {
      const res = await axios.get(API.BASE_URL +"clients",{
        headers: {
          authorization: "Bearer " + token.token,
        }
      })
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
        setClients(clients);
        setSearch(text);
      }
  }
  const sendData = async () => {
    let costs = parseInt(product.cost) * parseInt(amount);
    let sells = parseInt(product.sell) * parseInt(amount);

    const res = await axios.post( API.BASE_URL + "orders" ,{productname: product.name,productid: product._id, clientname: clientName,phone: phone,clientid: clientID, type: type, amount: amount,deposit: deposit, costs: costs, sells: sells, dayordered: dayordered}, {
        headers: {
            authorization: "Bearer " + token.token,
        }
    });
    Alert.alert(res.data);
    setClientName('');
    searchFilter('');
    setType('');
    setAmount('');
    setDeposit('');
    setDayordered('');
  }

  const fulfillInfo = (childInfo) => {
    const {name= '', phone = '', _id = ''} = childInfo;
    searchFilter(name);
    setClientName(name);
    setPhone(phone);
    setClientID(_id)
  }

  return(
    <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{flex: 1}} >
            <View style={styles.Container}>
                
                    <TextInput 
                //style={styles.SearchBar}
                        style={styles.OrderInput}
                        value={search}
                        placeholder="Tên Khách Hàng"
                        onChangeText={(text) => searchFilter(text)}/>
                    <View style={styles.List}>
                        <FlatList
                            data={clients}
                            renderItem={(item) => <ClientCardOrder child={fulfillInfo} data={item} navigation={navigation} />}
                            keyExtractor={(item, index) => index.toString()} />
                    </View>
                
                
                    <TextInput
                        style={styles.OrderInput}
                        placeholder='Loại'
                        onChangeText={type => setType(type)}
                        value={type}
                    />
                    <TextInput
                        style={styles.OrderInput}
                        placeholder='Số Lượng'
                        keyboardType={'decimal-pad'}
                        onChangeText={amount => setAmount(amount)}
                        value={amount}
                    />
                    <TextInput
                        style={styles.OrderInput}
                        placeholder='Cọc'
                        keyboardType={'decimal-pad'}
                        onChangeText={deposit => setDeposit(deposit)}
                        value={deposit}
                    />
                    <TextInput
                        style={styles.OrderInput}
                        placeholder='Ngày mua'
                        onChangeText={dayordered => setDayordered(dayordered)}
                        value={dayordered}
                    />
                    <TouchableOpacity style={styles.SendBot} onPress={() => sendData()}>
                        <Text> Lưu Order </Text>
                    </TouchableOpacity>
                
            </View>
        </KeyboardAvoidingView>
  )

}
const styles = StyleSheet.create({
  Container: {
      flex:1,
      //justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f5ceb2',
  },
  List:{
    height: 100,
    width: '70%',
  },
  OrderInput:{
      height: 50,
      width: '70%',
      borderWidth: 5,
      borderColor: '#efb65c',
      backgroundColor: '#e7eaed',
      borderRadius: 20,
      margin: 10,
      padding: 10,
  },
  SendBot: {
      borderColor: '#efb65c',
      borderWidth: 2,
      borderRadius: 10,
      height: 30,
      width:'20%',
      alignItems:'center',
      justifyContent: 'center',
      backgroundColor: '#efb65b',
      marginTop:30,
  }
})
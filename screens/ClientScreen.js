import React, { useEffect, useState, useContext } from "react";
import { View, Text,StyleSheet, TouchableOpacity, Image , FlatList} from 'react-native';
import axios from "axios";
import { TextInput } from "react-native-gesture-handler";
import { TokenContext, TokenProvider } from '../context/TokenContext';
import API from '../config/environmentVariables';
import OrderCard from "../components/OrderCard";

export default ClientScreen = ({route,navigation}) =>{
  const {phone} = route.params;
  const [client, setClient] = useState({});
  const [orders, setOrders] = useState([]);
  const [token, setToken] = useContext(TokenContext);
  useEffect(() => {
    fetchData();
},[])
  useEffect(() =>{
    console.log("33333", client)
  },[client])
  const fetchData = async () => {
    const add = API.BASE_URL + "clients/" + phone;
    const res  = await axios.get(add,{
      headers: {
          authorization: "Bearer " + token.token,
        }
    });
    setClient(res.data)
    const add2 = API.BASE_URL + "orders/" + res.data.phone;
    const res2  = await axios.get(add2,{
      headers: {
          authorization: "Bearer " + token.token,
        }
    });
    setOrders(res2.data);
  }


  return(
    <View style={styles.Container}>
      <View style={styles.ClientTitle}>
        <Text style={styles.ClientTitleText}> {client.name}</Text>
      </View>
      <View style={styles.ClientInfo}>
        <Text style={styles.ClientInfoText}>
          Address: {client.address}
        </Text>
        <Text style={styles.ClientInfoText}>
          Link: {client.link}
        </Text>
        <Text style={styles.ClientInfoText}>
          Phone Number: {client.phone}
        </Text>
        <Text style={styles.ClientInfoText}>
          Deposit: {client.deposit}
        </Text>
        <Text style={styles.ClientInfoText}>
          List Order:
        </Text>
        <View style={styles.List}>
          <FlatList
            data={orders}
            renderItem={(item) => <OrderCard data={item} navigation={navigation}/> }
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  Container: {
    flex:1,
    backgroundColor: '#f5ceb2'
  },
  ClientTitle:{
    alignItems: "center",
  },
  ClientTitleText:{
    fontSize: 28,
    color: '#0C3674',
  },
  ClientInfo:{
    marginLeft: 20,
  },
  ClientInfoText:{
    fontSize: 20,
    marginTop: 20,
  },
  List: {
    marginTop: 10,
    height: 500,
    width: '95%',
  }
})
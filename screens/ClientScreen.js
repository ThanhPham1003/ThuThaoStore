import React, { useEffect, useState, useContext } from "react";
import { View, Text,StyleSheet, TouchableOpacity, Image , FlatList, Alert} from 'react-native';
import axios from "axios";
import { TextInput } from "react-native-gesture-handler";
import { TokenContext, TokenProvider } from '../context/TokenContext';
import { ClientUpdatedContext, ClientUpdatedProvider } from '../context/ClientUpdatedContext';
import API from '../config/environmentVariables';
import OrderCard from "../components/OrderCard";

export default ClientScreen = ({route,navigation}) =>{
  const {phone} = route.params;
  const [client, setClient] = useState({});
  const [orders, setOrders] = useState([]);
  const [deposit, setDeposit] = useState('');
  const [costs, setCosts] = useState('');
  const [sells, setSells] = useState('');
  const [profit, setProfit] = useState('');
  const [newName, setNewName] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const [newLink, setNewLink] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [token, setToken] = useContext(TokenContext);
  const [reloadList, setReloadList] = useContext(ClientUpdatedContext);
  const [isEditing, setIsEditing] = useState('');
  useEffect(() => {
    fetchData();
  },[])
  useEffect(() => {
    const {name = '' , address = '', link = '', phone = ''} = client
    setNewName(name);
    setNewPhone(phone);
    setNewAddress(address);
    setNewLink(link);
  }, [client])


  const fetchData = async () => {
    const add = API.BASE_URL + "clients/" + phone;
    const res  = await axios.get(add,{
      headers: {
          authorization: "Bearer " + token.token,
        }
    });
    setClient(res.data)
    const add2 = API.BASE_URL + "orders/" + res.data._id;
    const res2  = await axios.get(add2,{
      headers: {
          authorization: "Bearer " + token.token,
        }
    });
    setOrders(res2.data);
    const totalDeposit = res2.data.reduce((total, count) => total=total+ count.deposit, 0)
    setDeposit(totalDeposit);
    const totalCost = res2.data.reduce((total, count) => total=total+ count.costs, 0)
    setCosts(totalCost);
    const totalSell = res2.data.reduce((total, count) => total=total+ count.sells, 0)
    setSells(totalSell)
    setProfit(totalSell - totalCost);
  }
  const handleDelete = () =>{
    Alert.alert(
      "CHÚ Ý",
      "Bạn có chắc chắn muốn xóa không?",
      [
        {
          text:" Hủy bỏ",
          onPress: () => console.log("Hủy bỏ")
        },
        {
          text: "Xác nhận", onPress: () => deleteData()

        }
      ]
    )
  }
  const deleteData = async () =>{
    const add = API.BASE_URL + "clients/" + client._id;
    const res = await axios.delete(add, {
        headers: {
            authorization: "Bearer " + token.token,
          }
    });
    setReloadList({isUpdated: true})
    Alert.alert(res.data)
    navigation.navigate('Thu Thao Store');
  }
  const updateData = async () =>{
    const add = API.BASE_URL + "clients/" + client._id;
        const res = await axios.patch(add, {
                name: newName,
                address: newAddress,
                link: newLink,
                phone: newPhone},{
                headers: {
                        authorization: "Bearer " + token.token,
                    }
                });
        Alert.alert(res.data)
        fetchData();
        setReloadList({isUpdated: true})
        setIsEditing(false);
       
  }
  const reload = async () =>{
    fetchData();
  }

  return(
    <View style={styles.Container}>
      {isEditing ? (
        <View>
          <View style={styles.ClientTitle}>
            <TextInput style={styles.NameEditInput}
              value= {newName}
              onChangeText={(text) => setNewName(text)} />
          </View>
          <View style={styles.ClientSpecsEdit}>
            <View style={styles.EditInputSpace}>
              <Text style={styles.ClientInfoText}>Địa Chỉ: </Text>
              <TextInput style={styles.EditInput}
                value= {newAddress}
                onChangeText={(text) => setNewAddress(text)} />
            </View>
            <View style={styles.EditInputSpace}>
              <Text style={styles.ClientInfoText}>Link Facebook: </Text>
              <TextInput style={styles.EditInput}
                value= {newLink}
                onChangeText={(text) => setNewLink(text)} />
            </View>
            <View style={styles.EditInputSpace}>
              <Text style={styles.ClientInfoText}>Số Điện Thoại: </Text>
              <TextInput style={styles.EditInput}
                value= {newPhone}
                onChangeText={(text) => setNewPhone(text)} />
            </View>
          </View>
          <View style={styles.ButtonSpaceEdit}>
            <TouchableOpacity style={styles.ButtonStyle} onPress={updateData}>
              <Text> Lưu </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) :(
      <View>
        <View style={styles.ClientTitle}>
          <Text style={styles.ClientTitleText}> {client.name}</Text>
        </View>
        <View style={styles.ClientInfo}>
          <View style={styles.LeftClientInfo}>
            
            <Text style={styles.ClientInfoText}>
              Link Facebook: {client.link}
            </Text>
            <Text style={styles.ClientInfoText}>
              Số Điện Thoại: {client.phone}
            </Text>
            <Text style={styles.ClientInfoText}>
              Tiền Cọc: {deposit}
            </Text>
            <Text style={styles.ClientInfoText}>
              Địa Chỉ: {client.address}
            </Text>
            <Text style={styles.ClientInfoText}>
              Danh sách mua hàng:
            </Text>

          </View>
          <View style={styles.RightClientInfo}>
            <Text style={styles.ClientInfoText}>
              Tổng giá nhập: {costs}
            </Text>
            <Text style={styles.ClientInfoText}>
              Tổng giá bán: {sells}
            </Text>
            <Text style={styles.ClientInfoText}>
              Lợi nhuận: {profit}
            </Text>
          </View>
        
        </View>
          <View style={styles.List}>
            <FlatList
              data={orders}
              renderItem={(item) => <OrderCard child={reload} data={item} navigation={navigation}/> }
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
          <View style={styles.ButtonSpace}>
            <TouchableOpacity style={styles.ButtonStyle} onPress={handleDelete}>
              <Text> Xóa Khách Hàng </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.ButtonStyle} onPress={() => setIsEditing(true)}>
              <Text> Sửa thông tin</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

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
  NameEditInput:{
    fontSize: 28,
    color: '#0C3674',
  },
  ClientSpecsEdit:{
    marginLeft: 20,
    flexDirection:'column'
  },
  EditInputSpace:{
    flexDirection:'row'
  },
  EditInput:{
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    height: '50%',
    width: '40%',
    marginTop: 20,
    marginLeft:10,
  },
  ButtonSpaceEdit:{
    alignItems:'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  ClientTitleText:{
    fontSize: 28,
    color: '#0C3674',
  },
  ClientInfo:{
    marginLeft: 20,
    flexDirection: 'row'
  },
  LeftClientInfo:{
    flexDirection: 'column',
  },
  RightClientInfo:{
    flexDirection: 'column',
    marginLeft: 50,
  },
  ClientInfoText:{
    marginTop: 20,
  },
  List: {
    marginTop: 10,
    height: 400,
    width: '100%',
  },
  ButtonSpace:{
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'center',
  },
  ButtonStyle:{
    borderColor: '#efb65c',
    borderWidth: 2,
    borderRadius: 10,
    height: 40,
    width:130,
    alignItems:'center',
    justifyContent: 'center',
    backgroundColor: '#efb65b',
    marginRight: 20,
  },
})
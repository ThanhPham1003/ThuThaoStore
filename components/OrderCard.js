import React, { useContext, useEffect, useState } from 'react';
import { View, Text,StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native'
import {FirebaseContext} from '../context/FirebaseContext';
import { TokenContext, TokenProvider } from '../context/TokenContext';
import API from '../config/environmentVariables';
import axios from "axios";
import AntDesign from 'react-native-vector-icons/AntDesign';
export default OrderCard = (props) => {
  const {data, navigation, child} = props
  const {item} = data;
  const [isEditing, setIsEditing] = useState(false);
  const [product, setProduct] = useState({});
  const [newType, setNewType] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [newDeposit, setNewDeposit] = useState('');
  const [newDayOrdered, setNewDayOrdered] = useState('');
  const [token, setToken] = useContext(TokenContext);
  useEffect(() => {
    fetchData();
  },[])
  useEffect(() => {
    const {type= '', amount= '', deposit= '',dayordered= ''} = item
    setNewType(type);
    setNewAmount(amount.toString());
    setNewDayOrdered(dayordered);
    setNewDeposit(deposit.toString());
  },[item])
  const fetchData = async () =>{
    const add = API.BASE_URL + "products/" + item.productid;
    const res  = await axios.get(add,{
        headers: {
            authorization: "Bearer " + token.token,
          }
    });
    setProduct(res.data);
  }
  const deleteData =  async () => {
    const add = API.BASE_URL + "orders/" + item._id;
    const res = await axios.delete(add, {
        headers: {
            authorization: "Bearer " + token.token,
          }
    });
    Alert.alert(res.data)
    child();
  }
  const updateData = async () => {
    const add = API.BASE_URL + "orders/" +item._id;
    const res = await axios.patch(add, {
      type: newType,
      amount: newAmount,
      dayordered: newDayOrdered,
      deposit: newDeposit},{
      headers:{
        authorization: "Bearer " + token.token,
      }
    });
    Alert.alert(res.data)
    fetchData();
    setIsEditing(false);
  }

  return(
    <View style = {styles.Container} >
      
      <View style={styles.InfoContainer}>
      {isEditing ? (
        <>
          <Text style={styles.ClientTittleText}> Product Name: {item.productname} </Text>
          <View style={styles.OrderInfo}>
              <View style={styles.LeftInfo}>
                <View style={styles.EditInputSpace}>
                  <Text style={styles.ClientInfoText}> Type: </Text>
                  <TextInput style={styles.EditInput}
                  value= {newType}
                  onChangeText={(text) => setNewType(text)} />
                </View>
                <View style={styles.EditInputSpace}>  

                   <Text style={styles.ClientInfoText}> Day Ordered: </Text>
                    <TextInput style={styles.EditInput}
                    value= {newDayOrdered}
                    onChangeText={(text) => setNewDayOrdered(text)} />
                </View>
              </View>
              <View style={styles.RightInfoEdit}>
                <View style={styles.EditInputSpace}>
                    <Text style={styles.ClientInfoText}> Deposit: </Text>
                    <TextInput style={styles.EditInput}
                    value= {newDeposit}
                    onChangeText={(text) => setNewDeposit(text)} />
                  </View>
                  <View style={styles.EditInputSpace}>  
                  <Text style={styles.ClientInfoText}> Amount: </Text>
                  <TextInput style={styles.EditInput}
                  value= {newAmount}
                  onChangeText={(text) => setNewAmount(text)} />
                  </View>
              </View>
          </View>
          <View style={styles.ButtonSpaceEdit}>
            <TouchableOpacity style={styles.ButtonStyle} onPress={updateData}>
              <Text> Save </Text>
            </TouchableOpacity>
          </View>
        </>
        ) : (
        <>
            <Text style={styles.ClientTittleText}> Product Name: {item.productname} </Text>
          <View style={styles.OrderInfo}>
              <View style={styles.LeftInfo}>
                <Text style={styles.ClientInfoText}> Type: {newType}</Text>
                <Text style={styles.ClientInfoText}> Amount: {newAmount}</Text>
                <Text style={styles.ClientInfoText}> Deposit: {newDeposit}</Text>

              </View>
              <View style={styles.RightInfo}>
                <Text style={styles.ClientInfoText}> Day Ordered: {newDayOrdered}</Text>
                <Text style={styles.ClientInfoText}> Status: {product.status}</Text>
              </View>
              <View style ={styles.Bottom}>
                  <TouchableOpacity style={styles.EachBut} onPress={() => setIsEditing(true)}>
                    <AntDesign name='edit' size = '25' color='#efb65b' />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={deleteData}>
                    <AntDesign name='delete' size = '25' color='#efb65b'/>
                  </TouchableOpacity>
              </View>
            </View>
        </> 
        )}
      </View>  
    </View>

  )
}
const styles = StyleSheet.create({
  Container: {
    flex:1,
    alignItems: 'center',
  },
  OrderInfo:{
    flexDirection: 'row'
  },
  LeftInfo:{
    flexDirection: 'column',
  },
  EditInputSpace:{
    flexDirection:'row'
  },
  EditInput:{
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    height: '50%',
    width: '30%',
    marginTop: 10,
    marginLeft:10,
  },
  RightInfo:{
    flexDirection: 'column',
    marginLeft: 10,
  },
  RightInfoEdit:{
    flexDirection: 'column',
  },
  InfoContainer:{
    marginTop: 20,
    height: 130,
    width: ' 90%',
    borderRadius: 10,
    backgroundColor:  '#FFFFFF',
  },
  ClientTittleText:{
    color: '#0C3674',
    fontSize:  20,
    marginLeft:10,
    marginTop: 5,
  },
  ClientInfoText:{
    marginLeft:10,
    marginTop: 10,
    color: '#0C3674',
    //fontSize:  15,
  },
  Bottom:{
    marginLeft: 30,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  EachBut:{
    marginBottom: 20,
  },
  ButtonSpaceEdit:{
    marginTop:10,
    alignItems:'center',
    justifyContent: 'center',
  },
  ButtonStyle:{
    borderColor: '#efb65c',
    borderWidth: 2,
    borderRadius: 10,
    height: 25,
    width: 70,
    alignItems:'center',
    justifyContent: 'center',
    backgroundColor: '#efb65b',
    marginRight: 20,
  },
})
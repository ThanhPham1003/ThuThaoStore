import React, { useContext, useEffect, useState } from 'react';
import { View, Text,StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native'
import {FirebaseContext} from '../context/FirebaseContext';
import { TokenContext, TokenProvider } from '../context/TokenContext';
import API from '../config/environmentVariables';
import axios from "axios";
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { UserUpdatedContext } from '../context/UserUpdatedContext';

export default OrderCard = (props) => {
  const {data, navigation, child} = props
  const {item} = data;
  const firebase = useContext(FirebaseContext);
  const [isEditing, setIsEditing] = useState(false);
  const [product, setProduct] = useState({});
  const [user, setUser] = useState({});
  const [newType, setNewType] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [newDeposit, setNewDeposit] = useState('');
  const [newDayOrdered, setNewDayOrdered] = useState('');
  const [price, setPrice] = useState('');
  const [token, setToken] = useContext(TokenContext);
  const [reload, setReload] = useContext(UserUpdatedContext);
  useEffect(() => {
    fetchData();
  },[])
  useEffect(() => {
    const {type= '', amount= '', deposit= '',dayordered= '', sells = ''} = item
    const p = sells/amount;
    setPrice(p);
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
    const uid = firebase.getCurrentUser().uid;
    const add2 = API.BASE_URL + "users/" + uid;
    const res2 = await axios.get(add2, {
      headers: {
        authorization: "Bearer " + token.token,
      }
    });
    setUser(res2.data)
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
  const doneOrder = async () => {
    const uid = firebase.getCurrentUser().uid;
    const add = API.BASE_URL + "users/updatesells/" + uid;
    const newSell = parseInt(user.currentsells) + parseInt(item.sells);
    const res = await axios.patch(add, { currentsells: newSell},{
      headers:{
        authorization: "Bearer " + token.token,
      }
    });
    setReload({isUpdated: true});
    Alert.alert("Đã hoàn thành đơn hàng.")
    deleteData();
  }

  return(
    <View style = {styles.Container} >
      
      <View style={styles.InfoContainer}>
      {isEditing ? (
        <>
          <Text style={styles.ClientTittleText}> Tên Sản Phẩm: {item.productname} </Text>
          <View style={styles.OrderInfo}>
              <View style={styles.LeftInfo}>
                <View style={styles.EditInputSpace}>
                  <Text style={styles.ClientInfoText}> Loại: </Text>
                  <TextInput style={styles.EditInput}
                  value= {newType}
                  onChangeText={(text) => setNewType(text)} />
                </View>
                <View style={styles.EditInputSpace}>  

                   <Text style={styles.ClientInfoText}> Ngày Đặt: </Text>
                    <TextInput style={styles.EditInput}
                    value= {newDayOrdered}
                    onChangeText={(text) => setNewDayOrdered(text)} />
                </View>
              </View>
              <View style={styles.RightInfoEdit}>
                <View style={styles.EditInputSpace}>
                    <Text style={styles.ClientInfoText}> Tiền Cọc: </Text>
                    <TextInput style={styles.EditInput}
                    value= {newDeposit}
                    onChangeText={(text) => setNewDeposit(text)} />
                  </View>
                  <View style={styles.EditInputSpace}>  
                  <Text style={styles.ClientInfoText}> Số lượng: </Text>
                  <TextInput style={styles.EditInput}
                  value= {newAmount}
                  onChangeText={(text) => setNewAmount(text)} />
                  </View>
              </View>
          </View>
          <View style={styles.ButtonSpaceEdit}>
            <TouchableOpacity style={styles.ButtonStyle} onPress={updateData}>
              <Text> Lưu </Text>
            </TouchableOpacity>
          </View>
        </>
        ) : (
        <>
            <Text style={styles.ClientTittleText}> Tên Sản Phẩm: {item.productname} </Text>
          <View style={styles.OrderInfo}>
              <View style={styles.LeftInfo}>
                <Text style={styles.ClientInfoText}> Loại: {newType}</Text>
                <Text style={styles.ClientInfoText}> Số Lượng: {newAmount}</Text>
                <Text style={styles.ClientInfoText}> Cọc: {newDeposit}</Text>

              </View>
              <View style={styles.RightInfo}>
                <Text style={styles.ClientInfoText}> Ngày Đặt: {newDayOrdered}</Text>
                <Text style={styles.ClientInfoText}> Trạng Thái: {product.status}</Text>
                <Text style={styles.ClientInfoText}> Giá bán: {price}</Text>
              </View>
              <View style ={styles.Bottom}>
                  <TouchableOpacity style={styles.EachBut} onPress={() => setIsEditing(true)}>
                    <AntDesign name='edit' size = '25' color='#efb65b' />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleDelete}>
                    <AntDesign name='delete' size = '25' color='#efb65b'/>
                  </TouchableOpacity>
              </View>
            </View>
            <View style={styles.DoneBut}>
              <TouchableOpacity style={styles.DoneButStyle} onPress={doneOrder}>
                {/* <MaterialIcons name='done-outline' size = '25' color='#efb65b'/> */}
                <Text> Hoàn Thành </Text>
              </TouchableOpacity>
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
    width: '30%'
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
    width: '50%'
  },
  RightInfoEdit:{
    flexDirection: 'column',
  },
  InfoContainer:{
    marginTop: 20,
    height: 150,
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
    marginLeft: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  EachBut:{
    marginBottom: 25,
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
  DoneBut:{
    alignItems:'center',
    justifyContent: 'center',
    marginTop: 10
  },
  DoneButStyle:{
    borderColor: '#efb65c',
    borderWidth: 2,
    borderRadius: 10,
    height: 25,
    width: 100,
    alignItems:'center',
    justifyContent: 'center',
    backgroundColor: '#efb65b',
    marginRight: 20,
  }
})
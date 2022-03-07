import React, { useEffect, useState, useContext } from "react";
import { View, Text,StyleSheet, TouchableOpacity, Image, FlatList, Alert } from 'react-native';
import axios from "axios";
import { TextInput } from "react-native-gesture-handler";
import { TokenContext, TokenProvider } from '../context/TokenContext';
import {FirebaseContext} from '../context/FirebaseContext'
import { HomeUpdatedContext, HomeUpdatedProvider } from '../context/HomeUpdatedContext';
import { HistoryUpdatedContext } from "../context/HistoryUpdatedContext";
import API from '../config/environmentVariables';

export default DetailsScreen = ({route,navigation}) => {
    const {id} = route.params;
    const firebase = useContext(FirebaseContext);
    const [product, setProduct] = useState({});
    const [user, setUser] = useState('');
    const [loinhuanThangnay, setLoinhuanThangnay] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [newTenSP, setNewTenSP] = useState('');
    const [newCode, setNewCode] = useState('');
    const [newGiaNhap, setNewGiaNhap] = useState('');
    const [newGiaBanLe, setNewGiaBanLe] = useState('');
    const [newGiaCTV, setNewGiaCTV] = useState('');
    const [newSoluongNhap, setNewSoluongNhap] = useState('');
    const [newSoluongBanLe, setNewSoluongBanLe] = useState('');
    const [newSoluongBanCTV, setNewSoluongBanCTV] = useState('');
    const [newNoiNhap, setNewNoiNhap] = useState('');
    const [newNgayDang, setNewNgayDang] = useState('');
    const [image, setImage] = useState('');
    const [ton, setTon] = useState('');
    const [loiNhuan, setLoiNhuan] = useState('');
    const [token, setToken] = useContext(TokenContext);
    const [isUpdated, setIsUpdated] = useContext(HomeUpdatedContext);
    const [isHistoryUpdated, setIsHistoryUpdated] = useContext(HistoryUpdatedContext);
    useEffect(() => {
        fetchData();
    },[loiNhuan])

    useEffect(() => {
        const {tenSP = '', code = '', giaNhap = '',giaBanLe = '', giaCTV = '', soluongNhap = '', soluongBanLe = '',soluongBanCTV = '',noiNhap = '', ngayDang = ''} = product
        
        // setNewName(name);
        // setNewCost(cost.toString());
        // setNewSell(sell.toString());
        // setNewCtvPrice(ctvprice.toString());
        // setNewCode(code);
        // setNewOrderQuantity(orderquantity);
        // setNewDaySubmitted(daysubmitted);
        setNewTenSP(tenSP);
        setNewCode(code);
        setNewGiaNhap(giaNhap);
        setNewGiaBanLe(giaBanLe);
        setNewGiaCTV(giaCTV);
        setNewSoluongNhap(soluongNhap);
        setNewSoluongBanLe(soluongBanLe);
        setNewSoluongBanCTV(soluongBanCTV);
        setNewNoiNhap(noiNhap);
        setNewNgayDang(ngayDang);
    }, [product])
    const fetchData = async () => {
        const uid = firebase.getCurrentUser().uid;
        const add2 = API.BASE_URL + "users/" + uid;
        const res2 = await axios.get(add2, {
            headers: {
              authorization: "Bearer " + token.token,
            }
        });
        setUser(res2.data);
        setLoinhuanThangnay(user.currentsells);

        const add = API.BASE_URL + "products/" + id;
        const res  = await axios.get(add,{
            headers: {
                authorization: "Bearer " + token.token,
              }
        });
        setProduct(res.data);
        setImage(res.data.url)
        const a = parseInt(product.giaNhap);
        const b = parseInt(product.giaBanLe);
        const c = parseInt(product.giaCTV);
        const d = parseInt(product.soluongNhap);
        const e = parseInt(product.soluongBanLe);
        const f = parseInt(product.soluongBanCTV);

        const temp1 = d - (e+f);
        setTon(temp1);
        const temp2 = a*d - ((b*e) + (c*f))
        setLoiNhuan(temp2);


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
    const deleteData = async () => {
        const add = API.BASE_URL + "products/" + id;
        const message = await firebase.deleteProductImage(image);
        if(!message){
            Alert.alert("Error with deleting image from firebase");
        }
        else{
            const res = await axios.delete(add, {
                headers: {
                    authorization: "Bearer " + token.token,
                }
            });

            Alert.alert(res.data)
            setIsUpdated({isUpdated: true});
            setIsHistoryUpdated({isHistoryUpdated: true});
            navigation.navigate('Thu Thao Store');
        }
    }
    const updateData = async () => {
        const add = API.BASE_URL + "products/" + id;
        const res = await axios.patch(add, {
                tenSP: newTenSP,
                code: newCode,
                giaNhap: newGiaNhap,
                giaBanLe: newGiaBanLe,
                giaCTV: newGiaCTV,
                soluongNhap: newSoluongNhap,
                soluongBanLe: newSoluongBanLe,
                soluongBanCTV: newSoluongBanCTV,
                noiNhap: newNoiNhap,
                ngayDang: newNgayDang,
            },{
                headers: {
                        authorization: "Bearer " + token.token,
                    }
                });
        Alert.alert(res.data)
        fetchData();
        setIsEditing(false);
        setIsUpdated({isUpdated: true});
    }
    const handleSoldout = () =>{
        Alert.alert(
          "CHÚ Ý",
          "Bạn có chắc chắn đơn hàng đã hoàn thành?",
          [
            {
              text:" Hủy bỏ",
              onPress: () => console.log("Hủy bỏ")
            },
            {
              text: "Xác nhận", onPress: () => soldOut()
    
            }
          ]
        )
      }
    const soldOut = async () => {
        const newLoiNhuan = parseInt(loinhuanThangnay) + parseInt(loiNhuan);
        const uid = firebase.getCurrentUser().uid;
        const add = API.BASE_URL + "users/updatesells/" + uid;
        const res = await axios.patch(add, {
            currentsells: newLoiNhuan
        },{
            headers: {
                authorization: "Bearer " + token.token,
            }
        })



        const add2 = API.BASE_URL + "products/status/" + id;
        const res2 = await axios.patch(add2,
            {
                status: '0',
            },{
            headers: {
                authorization: "Bearer " + token.token,
            }
        });
        Alert.alert(res2.data)
        
        setIsUpdated({isUpdated: true});
        setIsHistoryUpdated({isHistoryUpdated: true});
        navigation.navigate('Thu Thao Store');
    }




    return(
        <View style={styles.Container}>
            <View style={styles.ProductPhotoSpace}>
                <Image 
                 source = {{uri: image}}   
                 style={styles.ProductPhoto}
                />
            </View>
            <View style={styles.ProductInformation}>
                {isEditing ? (
                <View>
                    <View style={styles.ProductTittle}>
                        <TextInput style={styles.NameEditInput}
                        value= {newTenSP}
                        onChangeText={(text) => setNewTenSP(text)} />
                        <View style={styles.EditInputSpace}>
                            <Text style={styles.CodeEditInput}>Code: </Text>
                                <TextInput style={styles.CodeEditInput}
                                value= {newCode}
                                onChangeText={(text) => setNewCode(text)} />
                        </View>
                    </View>
                    <View style={styles.ProductSpecsEdit}>
                            <View style={styles.EditInputSpace}>
                                <Text style={styles.ProductSpecsText}>Giá Nhập: </Text>
                                <TextInput style={styles.EditInput}
                                value= {newGiaNhap}
                                keyboardType={'decimal-pad'}
                                onChangeText={(text) => setNewGiaNhap(text)} />
                            </View>
                            <View style={styles.EditInputSpace}>
                                <Text style={styles.ProductSpecsText}>Giá Bán Lẻ: </Text>
                                <TextInput style={styles.EditInput}
                                value= {newGiaBanLe}
                                keyboardType={'decimal-pad'}
                                onChangeText={(text) => setNewGiaBanLe(text)} />
                            </View>
                            <View style={styles.EditInputSpace}>
                                <Text style={styles.ProductSpecsText}>Giá Bán CTV: </Text>
                                <TextInput style={styles.EditInput}
                                value= {newGiaCTV}
                                keyboardType={'decimal-pad'}
                                onChangeText={(text) => setNewGiaCTV(text)} />
                            </View>
                            
                            <View style={styles.EditInputSpace}>
                                <Text style={styles.ProductSpecsText}>Số Lượng Nhập:  </Text>
                                <TextInput style={styles.EditInput}
                                value= {newSoluongNhap}
                                onChangeText={(text) => setNewSoluongNhap(text)} />
                            </View>
                            <View style={styles.EditInputSpace}>
                                <Text style={styles.ProductSpecsText}>Số Lượng Bán Lẻ:  </Text>
                                <TextInput style={styles.EditInput}
                                value= {newSoluongBanLe}
                                onChangeText={(text) => setNewSoluongBanLe(text)} />
                            </View>
                            <View style={styles.EditInputSpace}>
                                <Text style={styles.ProductSpecsText}>Số Lượng Bán CTV:  </Text>
                                <TextInput style={styles.EditInput}
                                value= {newSoluongBanCTV}
                                onChangeText={(text) => setNewSoluongBanCTV(text)} />
                            </View>

                            <View style={styles.EditInputSpace}>
                                <Text style={styles.ProductSpecsText}>Nơi Nhập:  </Text>
                                <TextInput style={styles.EditInput}
                                value= {newNoiNhap}
                                onChangeText={(text) => setNewNoiNhap(text)} />
                            </View>
                            <View style={styles.EditInputSpace}>
                                <Text style={styles.ProductSpecsText}>Ngày Đăng:  </Text>
                                <TextInput style={styles.EditInput}
                                value= {newNgayDang}
                                onChangeText={(text) => setNewNgayDang(text)} />
                            </View>
                            

                    </View>
                    <View style={styles.ButtonSpaceEdit}>
                        <TouchableOpacity style={styles.ButtonStyle} onPress={updateData}>
                            <Text> Lưu </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                ) : (
                    
                <View>
                    <View style={styles.ProductTittle}>
                        <Text style={styles.ProductTittleText}> {product.tenSP} </Text>
                        <Text style={styles.ProductTittleCode}> Code: {product.code} </Text>
                    </View>
                    <View style={styles.ProductSpecs}>
                        <View style={styles.HalfProductSpecs}>
                           
                            <Text style={styles.ProductSpecsText}>Giá Nhập: {product.giaNhap}</Text>
                            <Text style={styles.ProductSpecsText}>Giá Bán Lẻ: {product.giaBanLe}</Text>
                            <Text style={styles.ProductSpecsText}>Giá Cộng Tác Viên: {product.giaCTV}</Text>
                            <Text style={styles.ProductSpecsText}>Ngày Đăng: {product.ngayDang}</Text>
                            <Text style={styles.ProductSpecsText}> Nơi Nhập: {product.noiNhap}</Text>

                            
                        </View>
                        <View style={styles.HalfProductSpecs}>
 
                            <Text style={styles.ProductSpecsText}>Số Lượng Nhập: {product.soluongNhap}</Text>
                            <Text style={styles.ProductSpecsText}>Số Lượng Bán Lẻ: {product.soluongBanLe}</Text>
                            <Text style={styles.ProductSpecsText}>Số Lượng Bán CTV: {product.soluongBanCTV}</Text>
                            <Text style={styles.ProductSpecsText}>Tồn: {ton} </Text>
                        </View>
                        {/* <Text style={styles.ProductSpecsText}>Date submit: {product.date}</Text> */}
                    </View>
                    <View style={styles.ProductSpecs}>
                        
                    </View>
                    {/* <View style={styles.List}>
                    <FlatList
                        data={orders}
                        renderItem={(item) => <ClientCardOrdered data={item} navigation={navigation}/> }
                        keyExtractor={(item, index) => index.toString()}
                    />
                    </View> */}
                    <Text style={styles.ProductSpecsProfit}>Lợi nhuận: {loiNhuan}</Text>
                    <View style={styles.ButtonSpace}>
                        <TouchableOpacity style={styles.ButtonStyle} onPress={handleSoldout} >
                            <Text> Hoàn Thành </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.ButtonStyle} onPress={() => setIsEditing(true)}>
                            <Text> Chỉnh Sửa</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.ButtonStyle} onPress={handleDelete}>
                            <Text> Xóa </Text>
                        </TouchableOpacity>
                        
                    </View>
                </View>
            )}
            </View>    
        </View>
    )
}
const styles = StyleSheet.create({
    Container: {
      flex:1,
      backgroundColor: '#f5ceb2'
    },
    ProductPhotoSpace:{
        //backgroundColor: 'yellow',
        flex:3,
        // height: '40%',
        // width: '100%',
        alignItems: 'center',
        justifyContent:'center'
    },
    ProductPhoto:{
        height:'90%',
        width: '70%', 
        borderRadius: 20,
        
    },
    ProductInformation:{
        // height: '60%',
        // width: '100%',
        flex: 7,
       
        //justifyContent: "center",
        //backgroundColor: "red"
        
    },
    ProductTittle:{
        alignItems: "center",

    },
    ProductTittleText:{
        fontSize: 28,
        color: '#0C3674',
    },
    ProductTittleCode:{
        fontSize: 16,
        color: '#0C3674',
    },
    ProductSpecs:{
        marginLeft: 20,
        flexDirection:'row',

    },
    ProductSpecsEdit:{
        marginLeft: 20,
        flexDirection:'column'
    },
    HalfProductSpecs:{
        flexDirection: 'column',
        width:'50%'
    },
   
    EditInputSpace:{
        flexDirection:'row'
    },
    HalfSpecsEdit:{
        flexDirection: 'column'
    },
    EditInput:{
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        height: '50%',
        width: '40%',
        marginTop: 20,
        marginLeft:10,
    },
    NameEditInput:{
        fontSize: 28,
        color: '#0C3674',
    },
    CodeEditInput:{
        fontSize: 16,
        color: '#0C3674',
    },
    ProductSpecsText:{
        marginTop: 20,
    },
    ProductSpecsProfit:{
        marginLeft: 20,
        marginTop: 20,
        fontSize: 28,
        color: '#0C3674',
    },
    DeleteButton:{
        borderWidth: 3,
        margin:20,
    },
    ButtonSpace:{
        marginTop: 50,
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'center',

    },
    ButtonSpaceEdit:{
        alignItems:'center',
        justifyContent: 'center',
        marginTop: 40,
    },
    ButtonStyle:{
        borderColor: '#efb65c',
        borderWidth: 2,
        borderRadius: 10,
        height: 40,
        width:100,
        alignItems:'center',
        justifyContent: 'center',
        backgroundColor: '#efb65b',
        marginRight: 20,
    },
    List:{
        marginTop: 10,
        marginLeft: 20,
        height: 200,
        width: '90%',
    }
    

  })
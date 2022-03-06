import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Picker,Image, KeyboardAvoidingView, ActivityIndicator, Alert} from 'react-native';
import { TokenContext, TokenProvider } from '../context/TokenContext';
import { HomeUpdatedContext, HomeUpdatedProvider } from '../context/HomeUpdatedContext';
import {FirebaseContext} from '../context/FirebaseContext'
import * as ImagePicker from 'expo-image-picker';
import API from '../config/environmentVariables';
import {MaterialIcons} from '@expo/vector-icons'
import RNPickerSelect from 'react-native-picker-select';
import Modal from 'react-native-modal';
export default function PostProductScreen(props){
    const {navigation} = props;
    const firebase = useContext(FirebaseContext);
    const [loaded, setLoaded] = useState(true);
    const [tenSP, setTenSP] = useState('');
    const [code, setCode] = useState('');
    const [giaNhap, setGiaNhap] = useState('');
    const [giaBanLe, setGiaBanLe] = useState('');
    const [giaCTV, setGiaCTV] = useState('');
    const [soluongNhap, setSoluongNhap] = useState('');
    const [soluongBanLe, setSoluongBanLe] = useState('');
    const [soluongBanCTV, setSoluongBanCTV] = useState('');
    const [noiNhap, setNoiNhap] = useState('');
    const [ngayDang, setNgayDang] = useState('');
    const [status, setStatus] = useState('');
    const [image, setImage] = useState(null);
    const [token, setToken] = useContext(TokenContext);
    const [reload, setReload] = useContext(HomeUpdatedContext);
    useEffect(() => {
        (async () => {
          if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              alert('Sorry, we need camera roll permissions to make this work!');
            }
          }
        })();
      }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
  
        if (!result.cancelled) {
            setImage(result.uri);
        }
    };
    

    const sendData = async() =>{
        setLoaded(false)
        // const data  = new FormData()
        // const uid = firebase.getCurrentUser().uid;
        // data.append('uid', uid);
        // data.append('name', name);
        // data.append('cost', cost);
        // data.append('sell', sell);
        // data.append('ctvprice', ctvprice);
        // data.append('code', code);
        // data.append('orderquantity', orderquantity);
        // data.append('daysubmitted', daysubmitted)
        // data.append('status', status)
        // data.append('productImage', {
        //     uri: image,
        //     type: 'image',
        //     name: image,
        //   });

        // const res = await axios.post( API.BASE_URL + "products/allproducts", data, {
        //     headers: {
        //         authorization: "Bearer " + token.token,
        //     }

        // });
        
        //Alert.alert(res.data)
        const message = await firebase.uploadProduct(tenSP,code, giaNhap, giaBanLe, giaCTV,soluongNhap, soluongBanLe, soluongBanCTV, noiNhap, ngayDang,'1',image, token.token);

        
        Alert.alert("Thông báo",message,[
            {
                text: "OK", onPress: () => {
                    setLoaded(true);
                    setReload({isUpdated: true})
                    setTenSP('');
                    setCode('');
                    setGiaNhap('');
                    setGiaBanLe('');
                    setGiaCTV('');
                    setSoluongNhap('');
                    setSoluongBanLe('');
                    setSoluongBanCTV('');
                    setNoiNhap('');
                    setNgayDang('');
                    setImage(null);
                }
            }
        ]);
        
    }

    const uploadImage = async () => {
        await pickImage();
    }

    return(
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.Container}
        >
            <Modal
                animationType="slide"
                visible={!loaded}>
                <View style={styles.LoadingStyle}>
                    <ActivityIndicator size="large" color="#000" />
                    <Text> Chờ chút nhé...</Text>
                </View>
            </Modal>  
            <View style={styles.AddImage}>
                <TouchableOpacity style={styles.AddImageSpace} onPress={uploadImage}>
                    {image ?
                    <Image style={styles.ProductImage} source={{uri: image}} />
                    :
                    <>
                    <MaterialIcons name="add-a-photo" size={60}/>
                    <Text> Chọn ảnh cho sản phẩm </Text>
                    </>
                }
                </TouchableOpacity>
            </View>
            <View style={styles.InfoSpace}>
                <View style={styles.HalfSpace}>
                <View style={styles.InputSpace}>
                    <TextInput
                        placeholder='Tên'
                        onChangeText={tenSP => setTenSP(tenSP)}
                        value={tenSP}
                    />
                </View>
                <View style={styles.InputSpace}>   
                    <TextInput
                        placeholder='Code'
                        onChangeText={code => setCode(code)}
                        value={code}
                    />
                </View>  
                <View style={styles.InputSpace}>     
                    <TextInput
                        placeholder='Giá Nhập'
                        keyboardType={'decimal-pad'}
                        onChangeText={giaNhap => setGiaNhap(giaNhap)}
                        value={giaNhap}
                    />
                </View>
                <View style={styles.InputSpace}>  
                    <TextInput
                        placeholder='Giá Bán Lẻ'
                        keyboardType={'decimal-pad'}
                        onChangeText={giaBanLe => setGiaBanLe(giaBanLe)}
                        value={giaBanLe}
                    />
                </View>
                <View style={styles.InputSpace}>      
                    <TextInput
                        placeholder='Giá CTV'
                        keyboardType={'decimal-pad'}
                        onChangeText={giaCTV => setGiaCTV(giaCTV)}
                        value={giaCTV}
                    />
                </View>
                </View>
                <View style={styles.HalfSpace}>
                    <View style={styles.InputSpace}>  
                    < TextInput
                        placeholder='Ngày đăng'
                        onChangeText={ngayDang => setNgayDang(ngayDang)}
                        value={ngayDang}
                    />
                    </View>
                    <View style={styles.InputSpace}>  
                    < TextInput
                        placeholder='Nơi nhập'
                        onChangeText={noiNhap => setNoiNhap(noiNhap)}
                        value={noiNhap}
                    />
                    </View>
                    <View style={styles.InputSpace}>
                        < TextInput
                            placeholder='Số lượng nhập'
                            keyboardType={'decimal-pad'}
                            onChangeText={soluongNhap => setSoluongNhap(soluongNhap)}
                            value={soluongNhap}
                        />
                    </View> 
                    <View style={styles.InputSpace}>  
                    <TextInput
                        placeholder='Số lượng bán lẻ'
                        keyboardType={'decimal-pad'}
                        onChangeText={soluongBanLe => setSoluongBanLe(soluongBanLe)}
                        value={soluongBanLe}
                    />
                    </View>
                    <View style={styles.InputSpace}>  
                    <TextInput
                        placeholder='Số lượng bán CTV'
                        keyboardType={'decimal-pad'}
                        onChangeText={soluongBanCTV => setSoluongBanCTV(soluongBanCTV)}
                        value={soluongBanCTV}
                    />
                    </View>
                </View>
                
            </View> 
            <View style={styles.BotSpace}>
            <TouchableOpacity style={styles.SendBot} onPress={() => sendData()}>
                    <Text> Lưu Sản Phẩm </Text>
            </TouchableOpacity>
            </View>   
        </KeyboardAvoidingView>
    )
}
const styles = StyleSheet.create({
    Container: {
        flex:1,
        backgroundColor: '#f5ceb2',
        minHeight: '70%'
    },
    LoadingStyle:{
        margin: 10,
        backgroundColor: "#efb65b",
        borderRadius: 20,
        padding: 20,
        alignItems: "center",
        shadowColor: "#fff",
        shadowOffset:{
          width: 0,
          height:2
        },
        shadowOpacity: 0.25,
        shadowRadius:4,
        elevation: 5
      },
    AddImage:{
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    AddImageSpace:{
        borderWidth: 3,
        height: '80%',
        width: '60%',
        borderRadius: 10,
        backgroundColor: '#e7eaed',
        justifyContent: 'center',
        alignItems: 'center',
    },
    ProductImage:{
        width: '90%',
        height:'90%'
    },
    InfoSpace:{
        flex: 4,
        flexDirection:'row',

    },
    InputSpace:{
        height: 50,
        minHeight: 15,
        width: 160,
        borderWidth: 5,
        borderColor: '#efb65c',
        backgroundColor: '#e7eaed',
        borderRadius: 20,
        marginTop: 10, 
        justifyContent:'center',
        alignItems: 'center'
    },
    ProductInput: {
        height: 50,
        minHeight: 15,
        width: 160,
        borderWidth: 5,
        borderColor: '#efb65c',
        backgroundColor: '#e7eaed',
        borderRadius: 20,
        marginTop: 10, 
        justifyContent:'center',
        alignItems: 'center'
    },
    HalfSpace:{
        flexDirection:'column',
        marginRight: 15,
        marginLeft: 30,
    },
    BotSpace:{
        flex: 3,
        alignItems:'center',
    },
    SendBot: {
        alignItems:'center',
        justifyContent:'center',
        height: 40,
        width: 120,
        borderColor: '#efb65c',
        borderWidth: 2,
        borderRadius: 10,
        backgroundColor: '#efb65b',
        marginTop: 30,

    }
})

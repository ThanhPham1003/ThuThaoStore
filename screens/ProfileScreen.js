
import React, { useContext, useState, useEffect } from "react";
import {View, Text, StyleSheet, Image,TouchableOpacity,  TextInput,ActivityIndicator, Alert} from 'react-native';
import API from '../config/environmentVariables';
import axios from "axios";
import * as ImagePicker from 'expo-image-picker';
import { TokenContext, TokenProvider } from '../context/TokenContext';
import {FirebaseContext} from '../context/FirebaseContext'
import { UserUpdatedContext } from "../context/UserUpdatedContext";
import Modal from 'react-native-modal';
export default function ProfileScreen(props){
    const {navigation} = props;
    const [product, setProduct] = useState('');
    const firebase = useContext(FirebaseContext);
    const [token, setToken] = useContext(TokenContext);
    const [reload, setReload] = useContext(UserUpdatedContext);
    const [image, setImage] = useState(null);
    const [imageEditing, setImageEditing] = useState(null);
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [today, setToday] = useState('')
    const [isEditing, setIsEditing] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [isChangingPassword, setIsChangingPassword] = useState('');
    const [loaded, setLoaded] = useState(true);
    useEffect(() => {
        fetchData();
        setReload({isUpdated: false});
    },[reload.isUpdated])
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
    // useEffect(()=>{
    //     console.log("55555", image);
    // },[image])
    const fetchData = async() => {
        
        const uid = firebase.getCurrentUser().uid;
        const add = API.BASE_URL + "users/" + uid;
        const res = await axios.get(add, {
            headers: {
              authorization: "Bearer " + token.token,
            }
        });
        setProduct(res.data);

        setImageEditing(res.data.url);
        setImage(res.data.url);
        setName(res.data.name);
        setAge(res.data.age);
    }   
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
    
        if (!result.cancelled) {
            setImageEditing(result.uri);
        }
    };
    const updateData = async () => {
        setLoaded(false)
        // const uid = firebase.getCurrentUser().uid;
        // const add = API.BASE_URL + "users/" + uid;
        // const addImage = API.BASE_URL + "users/photo" + uid;
        // const userImage ={uri: imageEditing,
        //     type: 'image',
        //     name: imageEditing,}
        // const data = new FormData();
        // data.append('name', name);
        // data.append('age', age);
        // data.append('_method', 'PATCH');
        // data.append('userImage', {
        //     uri: imageEditing,
        //     type: 'image',
        //     name: imageEditing,
        //   });


        // const res = await axios.post(add,data,{
        //     headers: {
        //         authorization: "Bearer " + token.token,
        //     }
      
        // });
        // Alert.alert(res.data);
        const message = await firebase.updateProfileUser(name,age,imageEditing, token.token)
        Alert.alert(message)
        fetchData();
        setLoaded(true);
        setIsEditing(false);
    }
    const changePassword = async () => {
        const message = await firebase.changePassword(currentPassword,newPassword);
        alert(message)
        setIsChangingPassword(false);
    }
    const uploadImageEditing = async () => {
        await pickImage();
    }

    const logOut = async () =>{

        await firebase.logOut();
        setToken({
          token: "",
          isLoggedIn: false,
        });
      }

    return(
        <View style = {styles.Container}>
            <Modal
            animationType="slide"
            visible={!loaded}>
            <View style={styles.LoadingStyle}>
                <ActivityIndicator size="large" color="#000" />
                <Text> Chờ chút nhé...</Text>
            </View>
        </Modal>
            {isEditing ? (
                    <>
                        <TouchableOpacity onPress={uploadImageEditing}>
                            <Image source={{uri: imageEditing}}
                                        style={styles.ImageEditStyle}
                            />
                        </TouchableOpacity>
                        <View style={styles.EditSpace}>
                            <Text style={styles.InformationText}>Tên: </Text>
                            <TextInput style={styles.PasswordInput}
                            value= {name}
                            onChangeText={(text) => setName(text)} />
                        </View>
                        <View style={styles.EditSpace}>
                            <Text style={styles.InformationText}>Tuổi:  </Text>
                            <TextInput style={styles.PasswordInput}
                            value= {age}
                            keyboardType={'decimal-pad'}
                            onChangeText={(text) => setAge(text)} />
                        </View>
                        <View style={styles.ButtonExtra}>
                            <TouchableOpacity style={styles.ButtonStyle} onPress={updateData}>
                                <Text> Lưu </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.ButtonStyle}
                                    onPress={() => setIsEditing(false)}>
                                        <Text>Quay Lại</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                ) : (
                <>
                    {isChangingPassword ? (
                        <>
                            <View style={styles.EditSpace}>
                            <Text style={styles.InformationText}>Mật khẩu hiện tại: </Text>
                            <TextInput style={styles.PasswordInput}
                            value= {currentPassword}
                            secureTextEntry={true}
                            onChangeText={(text) => setCurrentPassword(text)} />
                            </View>
                            <View style={styles.EditSpace}>
                                <Text style={styles.InformationText}>Mật khẩu mới:  </Text>
                                <TextInput style={styles.PasswordInput}
                                value= {newPassword}
                                secureTextEntry={true}
                                onChangeText={(text) => setNewPassword(text)} />
                            </View>
                            <View style={styles.ButtonExtra}>
                                <TouchableOpacity style={styles.ButtonStyle} onPress={changePassword}>
                                    <Text> Đổi Mật Khẩu </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.ButtonStyle}
                                    onPress={() => setIsChangingPassword(false)}>
                                    <Text>Quay Lại</Text>
                                </TouchableOpacity>
                            </View>    
                        </>
                    ):(
                        <>
                            <View style={styles.ImageAndUserSpace}>
                                <Image source={{uri: image}}
                                    style={styles.ImageStyle}
                                />
                                <Text style={styles.UserText}> {product.name || '-'}</Text>
                            </View>
                            <View style={styles.UserInformation}>
                                        <Text style={styles.InformationText}> Email: {product.email || '-'}</Text>
                                        <Text style={styles.InformationText}> Tuổi: {product.age || '-'}</Text>
                                        <Text style={styles.InformationText}> Doanh Thu Tháng Trước: {product.lastsells || '-'}</Text>
                                        <Text style={styles.InformationText}> Doanh Thu Tháng Này: {product.currentsells || '-'}</Text>
                            </View>
                            <View style={styles.ButtonSpace}>
                                <View style={styles.EditAndChangeSpace}>
                                    <TouchableOpacity style={styles.ButtonStyle}
                                    onPress={() => setIsEditing(true)}
                                    >
                                        <Text>Sửa Thông Tin</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.ButtonStyle}
                                    onPress={() => setIsChangingPassword(true)}>
                                        <Text>Đổi Mật Khẩu</Text>
                                    </TouchableOpacity>
                                </View>
                                <TouchableOpacity style={styles.ButtonStyle}
                                onPress={logOut}
                                >
                                    <Text>Đăng Xuất</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.LogOutSpace}>
                            
                            </View>
                        </>
                    )}
            </>
            )}
        </View>
    )
}
const styles = StyleSheet.create({
    Container: {
        flex:1,
        //justifyContent: 'center',
        
        backgroundColor: '#f5ceb2',
    },
    ExtraSpace:{
        alignItems: 'center',
        justifyContent:'center'
    },
    ImageAndUserSpace:{
        alignItems: 'center',
        flex: 4,
        marginBottom: 15,
    },
    ImageStyle:{

        borderWidth: 5,
        height: '80%',
        width: '55%',
        borderRadius: 1000,
        // backgroundColor: '#e7eaed',
        // justifyContent: 'center',
        // alignItems: 'center',
        borderColor: '#efb65b',
        margin: 25,
    },
    ImageEditSpace:{
        justifyContent: 'center',
        alignItems: 'center',
    },
    ImageEditStyle:{
        borderWidth: 5,
        height: '55%',
        width: '55%',
        borderRadius: 1000,
        // backgroundColor: '#e7eaed',
        // justifyContent: 'center',
        // alignItems: 'center',
        borderColor: '#efb65b',
        marginTop: 20,
        marginLeft: 100,
    },
    UserText:{
        fontSize: 25,
        fontWeight: '500',
    },
    UserInformation:{
        flex: 3,
        marginLeft: 20,
    },
    EditSpace:{
        flexDirection: 'row'
    },
    InformationText:{
        //fontSize:20,
        marginTop: 20,
    },
    ButtonSpace:{
        flex: 3,
        
        alignItems:'center',
        justifyContent: 'center',
    },
    EditAndChangeSpace:{
        flexDirection:'row',
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
        margin:30,
    },
    LogOutSpace:{
        flex: 1,
        alignItems:'center',
        justifyContent: 'center',
    },
    PasswordInput:{
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        height: '50%',
        width: '40%',
        marginTop: 10
    },
    ButtonExtra:{
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'center',

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
})
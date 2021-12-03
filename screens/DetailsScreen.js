import React, { useEffect, useState, useContext } from "react";
import { View, Text,StyleSheet, TouchableOpacity, Image } from 'react-native';
import axios from "axios";
import { TextInput } from "react-native-gesture-handler";
import { TokenContext, TokenProvider } from '../context/TokenContext';
import API from '../config/environmentVariables';

export default DetailsScreen = ({route,navigation}) => {
    const {id} = route.params;
    const [product, setProduct] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState('');
    const [newPrice, setNewPrice] = useState('');
    const [newCode, setNewCode] = useState('');
    const [newOrderQuantity, setNewOrderQuantity] = useState('');
    const [newDaySubmitted, setNewDaySubmitted] = useState('');
    const [image, setImage] = useState('');
    const [token, setToken] = useContext(TokenContext);
    useEffect(() => {
        fetchData();
    },[])

    useEffect(() => {
        const {name = '', price = '', code = '', orderquantity = '', daysubmitted= ''} = product
        

        setNewName(name);
        setNewCode(code);
        setNewOrderQuantity(orderquantity);
        setNewDaySubmitted(daysubmitted);
        setNewPrice(price.toString())
    }, [product])
    const fetchData = async () => {
        const add = API.BASE_URL + "products/" + id;
        const res  = await axios.get(add,{
            headers: {
                authorization: "Bearer " + token.token,
              }
        });
        setProduct(res.data);
        const image = API.BASE_URL + res.data.url; 
        let path2 = image.replace(/\\/g, "/");
        setImage(path2)
    }
    const deleteData = async () => {
        const add = API.BASE_URL + "products/" + id;
        const res = await axios.delete(add, {
            headers: {
                authorization: "Bearer " + token.token,
              }
        });
        navigation.navigate('Thu Thao Store');
    }
    const updateData = async () => {
        const add = API.BASE_URL + "products/" + id;
        const res = await axios.patch(add, {
            headers: {
                name: newName,
                price: newPrice,
                code: newCode,
                orderquantity: newOrderQuantity,
                daysubmitted: newDaySubmitted,
            },
        });
        fetchData();
        setIsEditing(false);
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
                        value= {newName}
                        onChangeText={(text) => setNewName(text)} />
                    </View>
                    <View style={styles.ProductSpecs}>
                        <View style={styles.EditInputSpace}>
                            <Text style={styles.ProductSpecsText}>Code: </Text>
                            <TextInput style={styles.EditInput}
                            value= {newCode}
                            onChangeText={(text) => setNewCode(text)} />
                        </View>
                        <View style={styles.EditInputSpace}>
                            <Text style={styles.ProductSpecsText}>Quantity:  </Text>
                            <TextInput style={styles.EditInput}
                            value= {newOrderQuantity}
                            onChangeText={(text) => setNewOrderQuantity(text)} />
                        </View>
                        <View style={styles.EditInputSpace}>
                            <Text style={styles.ProductSpecsText}>Day Submitted:  </Text>
                            <TextInput style={styles.EditInput}
                            value= {newDaySubmitted}
                            onChangeText={(text) => setNewDaySubmitted(text)} />
                        </View>
                        <View style={styles.EditInputSpace}>
                            <Text style={styles.ProductSpecsText}>Price: </Text>
                            <TextInput style={styles.EditInput}
                            value= {newPrice}
                            keyboardType={'decimal-pad'}
                            onChangeText={(text) => setNewPrice(text)} />
                        </View>
                    </View>
                    <View style={styles.ButtonSpace}>
                        <TouchableOpacity style={styles.ButtonStyle} onPress={updateData}>
                            <Text> Save </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                ) : (
                <View>
                    <View style={styles.ProductTittle}>
                        <Text style={styles.ProductTittleText}> {product.name} </Text>

                    </View>
                    <View style={styles.ProductSpecs}>
                        <Text style={styles.ProductSpecsText}>Price: {product.price}</Text>
                        <Text style={styles.ProductSpecsText}>Code: {product.code} </Text>
                        <Text style={styles.ProductSpecsText}>Quantity: {product.orderquantity}</Text>
                        <Text style={styles.ProductSpecsText}>Day Submitted: {product.daysubmitted}</Text>
                        {/* <Text style={styles.ProductSpecsText}>Date submit: {product.date}</Text> */}
                    </View>
                    
                
                    <View style={styles.ButtonSpace}>
                        <TouchableOpacity style={styles.ButtonStyle} onPress={deleteData}>
                            <Text> Delete </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.ButtonStyle} onPress={() => setIsEditing(true)}>
                            <Text> Edit</Text>
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
        flex:4,
        // height: '40%',
        // width: '100%',
        alignItems: 'center',
        justifyContent:'center'
    },
    ProductPhoto:{
        height:'90%',
        width: '90%', 
        borderRadius: 20,
        
    },
    ProductInformation:{
        // height: '60%',
        // width: '100%',
        flex: 6,
       
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
    ProductSpecs:{
        marginLeft: 20,
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
    NameEditInput:{
        fontSize: 28,
        color: '#0C3674',
    },
    ProductSpecsText:{
        fontSize: 20,
        marginTop: 20,
    },
    DeleteButton:{
        borderWidth: 3,
        margin:20,
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
        margin:30,
    },

    

  })
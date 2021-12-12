import React, { useEffect, useState, useContext } from "react";
import { View, Text,StyleSheet, TouchableOpacity, Image, FlatList, Alert } from 'react-native';
import axios from "axios";
import { TextInput } from "react-native-gesture-handler";
import { TokenContext, TokenProvider } from '../context/TokenContext';
import { HomeUpdatedContext, HomeUpdatedProvider } from '../context/HomeUpdatedContext';
import API from '../config/environmentVariables';
import ClientCardDetail from "../components/ClientCardDetail";
import ClientCardOrdered from "../components/ClientCardOrdered";

export default DetailsScreen = ({route,navigation}) => {
    const {id} = route.params;
    const [product, setProduct] = useState({});
    const [orders, setOrders] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState('');
    const [newCost, setNewCost] = useState('');
    const [newSell, setNewSell] = useState('');
    const [newCode, setNewCode] = useState('');
    const [newOrderQuantity, setNewOrderQuantity] = useState('');
    const [newDaySubmitted, setNewDaySubmitted] = useState('');
    const [image, setImage] = useState('');
    const [token, setToken] = useContext(TokenContext);
    const [isUpdated, setIsUpdated] = useContext(HomeUpdatedContext);
    useEffect(() => {
        fetchData();
    },[])

    useEffect(() => {
        const {name = '', cost = '', sell = '',code = '', orderquantity = '', daysubmitted= ''} = product
        
        setNewName(name);
        setNewCost(cost.toString());
        setNewSell(sell.toString());
        setNewCode(code);
        setNewOrderQuantity(orderquantity);
        setNewDaySubmitted(daysubmitted);

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

        const add2 = API.BASE_URL + "orders/products/" + res.data._id;
        const res2  = await axios.get(add2,{
            headers: {
                authorization: "Bearer " + token.token,
              }
        });
        setOrders(res2.data);

    }
    const deleteData = async () => {
        const add = API.BASE_URL + "products/" + id;
        const res = await axios.delete(add, {
            headers: {
                authorization: "Bearer " + token.token,
              }
        });
        Alert.alert(res.data)
        setIsUpdated({isUpdated: true});
        navigation.navigate('Thu Thao Store');
    }
    const updateData = async () => {
        const add = API.BASE_URL + "products/" + id;
        const res = await axios.patch(add, {
                name: newName,
                cost: newCost,
                sell: newSell,
                code: newCode,
                orderquantity: newOrderQuantity,
                daysubmitted: newDaySubmitted},{
                headers: {
                        authorization: "Bearer " + token.token,
                    }
                });
        Alert.alert(res.data)
        fetchData();
        setIsEditing(false);
        setIsUpdated({isUpdated: true});
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
                    <View style={styles.ProductSpecsEdit}>

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
                                <Text style={styles.ProductSpecsText}>Cost: </Text>
                                <TextInput style={styles.EditInput}
                                value= {newCost}
                                keyboardType={'decimal-pad'}
                                onChangeText={(text) => setNewCost(text)} />
                            </View>
                            <View style={styles.EditInputSpace}>
                                <Text style={styles.ProductSpecsText}>Sell: </Text>
                                <TextInput style={styles.EditInput}
                                value= {newSell}
                                keyboardType={'decimal-pad'}
                                onChangeText={(text) => setNewSell(text)} />
                            </View>

                    </View>
                    <View style={styles.ButtonSpaceEdit}>
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
                        <View style={styles.HalfProductSpecs}>
                            <Text style={styles.ProductSpecsText}>Cost: {product.cost}</Text>
                            <Text style={styles.ProductSpecsText}>Quantity: {product.orderquantity}</Text>
                            <Text style={styles.ProductSpecsText}>Day Submitted: {product.daysubmitted}</Text>
                            <Text style={styles.ProductSpecsText}>List Order: </Text>
                        </View>
                        <View style={styles.HalfProductSpecs}>
                            <Text style={styles.ProductSpecsText}>Sell: {product.sell}</Text>
                            <Text style={styles.ProductSpecsText}>Code: {product.code} </Text>
                        </View>
                        {/* <Text style={styles.ProductSpecsText}>Date submit: {product.date}</Text> */}
                    </View>
                    <View style={styles.ProductSpecs}>
                        
                    </View>
                    <View style={styles.List}>
                    <FlatList
            data={orders}
            renderItem={(item) => <ClientCardOrdered data={item} navigation={navigation}/> }
            keyExtractor={(item, index) => index.toString()}
          />
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
        marginLeft: 30,
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
    ProductSpecsText:{
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
        width:130,
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
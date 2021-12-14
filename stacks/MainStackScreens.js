import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {NavigationContainer} from '@react-navigation/native';


import TabStackScreens from './TabStackScreens';
import DetailsScreen from '../screens/DetailsScreen'
import ListClientsScreen from '../screens/ListClientsScreen';
import ClientScreen from '../screens/ClientScreen';
import OrderScreen from '../screens/OrderScreen';
export default MainStackScreens = () => {
  const MainStack = createStackNavigator()
  const screenOptions = {
    headerStyle: {
      backgroundColor: '#efb65b',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }
  return(

      <MainStack.Navigator screenOptions={screenOptions}>
        <MainStack.Screen name="Thu Thao Store" component={TabStackScreens} />
        <MainStack.Screen name="Sản Phẩm" component={DetailsScreen} />
        <MainStack.Screen name="Khách Hàng" component={ListClientsScreen} />
        <MainStack.Screen name="Thông Tin" component={ClientScreen} />
        <MainStack.Screen name="Order" component={OrderScreen} />
        {/* <AuthStack.Screen name="Home" component={HomeScreen} />
        <AuthStack.Screen name="Details" component={DetailsScreen} /> */}
      </MainStack.Navigator>
  )
}
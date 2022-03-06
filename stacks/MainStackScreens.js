import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {NavigationContainer} from '@react-navigation/native';


import TabStackScreens from './TabStackScreens';
import DetailsScreen from '../screens/DetailsScreen'
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
        {/* <AuthStack.Screen name="Home" component={HomeScreen} />
        <AuthStack.Screen name="Details" component={DetailsScreen} /> */}
      </MainStack.Navigator>
  )
}
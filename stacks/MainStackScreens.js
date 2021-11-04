import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {NavigationContainer} from '@react-navigation/native';


import TabStackScreens from './TabStackScreens';
import DetailsScreen from '../screens/DetailsScreen'
export default MainStackScreens = () => {
  const MainStack = createStackNavigator()

  return(

      <MainStack.Navigator>
        <MainStack.Screen name="HomeScreen" component={TabStackScreens} />
        <MainStack.Screen name="Details" component={DetailsScreen} />
        {/* <AuthStack.Screen name="Home" component={HomeScreen} />
        <AuthStack.Screen name="Details" component={DetailsScreen} /> */}
      </MainStack.Navigator>
  )
}
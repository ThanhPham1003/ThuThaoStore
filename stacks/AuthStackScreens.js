import React, { useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';

import SigninScreen from '../screens/SigninScreen'
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import LoadingScreen from '../screens/LoadingScreen';
export default AuthStackScreens = () => {
  const AuthStack = createStackNavigator()
  return (

    <AuthStack.Navigator screenOptions={{
      headerShown: false
    }}>

      <AuthStack.Screen name="Loading" component={LoadingScreen} />
      <AuthStack.Screen name="Sign in" component={SigninScreen} />
      <AuthStack.Screen name="Reset Password" component={ResetPasswordScreen} />
    </AuthStack.Navigator>
  )
}
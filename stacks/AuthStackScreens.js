import React, {useContext} from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';

import SigninScreen from '../screens/SigninScreen'
import SignupScreen from '../screens/SignupScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import {LoadingContext} from '../context/LoadingContext'
import LoadingScreen from '../screens/LoadingScreen';
export default AuthStackScreens = () => {
  const AuthStack = createStackNavigator()
  const [loaded, _] = useContext(LoadingContext);
  return (

    <AuthStack.Navigator screenOptions={{
      headerShown: false
    }}>
      {!loaded.isLoaded ?(
        <AuthStack.Screen name="Loading" component={LoadingScreen}/>
      ):(
      <AuthStack.Screen name="Sign in" component={SigninScreen} />
    )}
      <AuthStack.Screen name="Sign up" component={SignupScreen} />
      <AuthStack.Screen name="Reset Password" component={ResetPasswordScreen} />
    </AuthStack.Navigator>
  )
}
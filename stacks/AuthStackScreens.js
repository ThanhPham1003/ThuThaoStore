import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {NavigationContainer} from '@react-navigation/native';

import SigninScreen from '../screens/SigninScreen'
import SignupScreen from '../screens/SignupScreen';

export default AuthStackScreens = () => {
  const AuthStack = createStackNavigator()

  return(
    <NavigationContainer>
      <AuthStack.Navigator>
        <AuthStack.Screen name="Sign in" component={SigninScreen} />
        <AuthStack.Screen name="Sign up" component={SignupScreen} />

      </AuthStack.Navigator>
    </NavigationContainer>
  )
}
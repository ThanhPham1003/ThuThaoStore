import React, { useContext, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TokenContext, TokenProvider } from '../context/TokenContext';
import { NavigationContainer } from '@react-navigation/native';
import AuthStackScreens from './AuthStackScreens';
import TabStackScreens from './TabStackScreens';
import MainStackScreens from './MainStackScreens';
export default AppStackScreens = () => {
    const AppStack = createStackNavigator();
    const [token, _ ] = useContext(TokenContext);
    return (
            <AppStack.Navigator screenOptions={{
                headerShown: false
              }}>
                {token.isLoggedIn ? (
                    <AppStack.Screen name="Main" component={MainStackScreens} />
                ):(
                    <AppStack.Screen name="Auth" component={AuthStackScreens} />
                )}
               
            </AppStack.Navigator>
    )
}
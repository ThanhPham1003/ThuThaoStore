import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {NavigationContainer} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PostProductScreen from "../screens/PostProductScreen";
import ProfileScreen from "../screens/ProfileScreen";
import HomeScreen from '../screens/HomeScreen';
import ListClientsScreen from "../screens/ListClientsScreen";
import PostClientScreen from '../screens/PostClientScreen'
export default TabStackScreens = () => {
    const TabStack = createBottomTabNavigator();




    const screenOptions = ({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused
              ? 'home'
              : 'home-outline';
          } else if (route.name === 'Post') {
            iconName = focused ? 'paw' : 'paw-outline';
          }else if (route.name === 'Profile') {
            iconName = focused ? 'person-circle' : 'person-circle-outline';
          }else if (route.name === 'Client') {
            iconName = focused ? 'person' : 'person-outline';
          }else if (route.name === 'Add Client') {
            iconName = focused ? 'ios-person-add' : 'ios-person-add-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#efb65b',
        tabBarInactiveTintColor: 'gray',
      })
    return(
            <TabStack.Navigator screenOptions={screenOptions}>
                <TabStack.Screen name="Home" component={HomeScreen} options={{headerShown: false}} />
                <TabStack.Screen name="Post" component={PostProductScreen} options={{headerShown: false}}/>
                <TabStack.Screen name="Client" component={ListClientsScreen} options={{headerShown: false}}/>
                <TabStack.Screen name="Add Client" component={PostClientScreen} options={{headerShown: false}}/>
                <TabStack.Screen name="Profile" component={ProfileScreen} options={{headerShown: false}}/>
                
                {/* <TabStack.Screen name="Details" component={DetailsScreen} /> */}
            </TabStack.Navigator>
    )
}
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {NavigationContainer} from '@react-navigation/native';

import PostProductScreen from "../screens/PostProductScreen";
import ProfileScreen from "../screens/ProfileScreen";
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen'

export default TabStackScreens = () => {
    const TabStack = createBottomTabNavigator();


    return(
            <TabStack.Navigator>
                <TabStack.Screen name="Home" component={HomeScreen} />
                <TabStack.Screen name="Post" component={PostProductScreen} />
                <TabStack.Screen name="Profile" component={ProfileScreen} />

                {/* <TabStack.Screen name="Details" component={DetailsScreen} /> */}
            </TabStack.Navigator>
    )
}
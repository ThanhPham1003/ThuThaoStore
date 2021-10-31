import React from 'react'

import { FirebaseProvider } from './context/FirebaseContext';
import AppStackScreens from "./stacks/AppStackScreens";
import { TokenProvider } from './context/TokenContext';
import TabStackScreens from './stacks/TabStackScreens';
import { NavigationContainer } from '@react-navigation/native';
const App = () => {
  return(
    <FirebaseProvider>
      <TokenProvider>
        <NavigationContainer>
          <AppStackScreens/>
        </NavigationContainer>
      </TokenProvider>
    </FirebaseProvider>
  )
};


export default App;

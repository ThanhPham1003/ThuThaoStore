import React from 'react'

import { FirebaseProvider } from './context/FirebaseContext';
import AppStackScreens from "./stacks/AppStackScreens";
import { TokenProvider } from './context/TokenContext';
import TabStackScreens from './stacks/TabStackScreens';
import { NavigationContainer } from '@react-navigation/native';
import { HomeUpdatedProvider } from './context/HomeUpdatedContext';
import { HistoryUpdatedContext, HistoryUpdatedProvider } from './context/HistoryUpdatedContext';

const App = () => {
  return (
    <FirebaseProvider>
      <TokenProvider>
        <HomeUpdatedProvider>
          <HistoryUpdatedProvider>
              <NavigationContainer>
                <AppStackScreens />
              </NavigationContainer>
          </HistoryUpdatedProvider>  
        </HomeUpdatedProvider>
      </TokenProvider>
    </FirebaseProvider>
  )
};


export default App;

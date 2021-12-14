import React from 'react'

import { FirebaseProvider } from './context/FirebaseContext';
import AppStackScreens from "./stacks/AppStackScreens";
import { TokenProvider } from './context/TokenContext';
import TabStackScreens from './stacks/TabStackScreens';
import { NavigationContainer } from '@react-navigation/native';
import { HomeUpdatedProvider } from './context/HomeUpdatedContext';
import { ClientUpdatedContext, ClientUpdatedProvider } from './context/ClientUpdatedContext';
import { UserUpdatedProvider } from './context/UserUpdatedContext';
const App = () => {
  return(
    <FirebaseProvider>
      <TokenProvider>
        <HomeUpdatedProvider>
          <ClientUpdatedProvider>
            <UserUpdatedProvider>
              <NavigationContainer>
                <AppStackScreens/>
              </NavigationContainer>
            </UserUpdatedProvider>
          </ClientUpdatedProvider>
        </HomeUpdatedProvider>  
      </TokenProvider>
    </FirebaseProvider>
  )
};


export default App;

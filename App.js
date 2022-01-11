import React from 'react'

import { FirebaseProvider } from './context/FirebaseContext';
import AppStackScreens from "./stacks/AppStackScreens";
import { TokenProvider } from './context/TokenContext';
import TabStackScreens from './stacks/TabStackScreens';
import { NavigationContainer } from '@react-navigation/native';
import { HomeUpdatedProvider } from './context/HomeUpdatedContext';
import { ClientUpdatedContext, ClientUpdatedProvider } from './context/ClientUpdatedContext';
import { UserUpdatedProvider } from './context/UserUpdatedContext';
import { OrderUpdatedProvider } from './context/OrderUpdatedContext';
const App = () => {
  return (
    <FirebaseProvider>
      <TokenProvider>
        <HomeUpdatedProvider>
          <ClientUpdatedProvider>
            <UserUpdatedProvider>
              <OrderUpdatedProvider>
                <NavigationContainer>
                  <AppStackScreens />
                </NavigationContainer>
              </OrderUpdatedProvider>
            </UserUpdatedProvider>
          </ClientUpdatedProvider>
        </HomeUpdatedProvider>
      </TokenProvider>
    </FirebaseProvider>
  )
};


export default App;

import React from 'react'

import { FirebaseProvider } from './context/FirebaseContext';
import AuthStackScreens from "./stacks/AuthStackScreens";
import { TokenProvider } from './context/TokenContext';
const App = () => {
  return(
    <FirebaseProvider>
      <TokenProvider>
        <AuthStackScreens />
      </TokenProvider>
    </FirebaseProvider>
  )
};


export default App;

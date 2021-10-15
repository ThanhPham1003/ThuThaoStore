import React from 'react'

import { FirebaseProvider } from './context/FirebaseContext';
import AuthStackScreens from "./stacks/AuthStackScreens";
const App = () => {
  return(
    <FirebaseProvider>
      <AuthStackScreens />
    </FirebaseProvider>
  )
};


export default App;

import React, {useState, createContext, useContext} from 'react'
const UserContext = createContext([{}, () => {}]);

export default UserContext;
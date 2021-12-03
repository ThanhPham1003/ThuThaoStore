import React, {useState, createContext} from 'react'
const TokenContext = createContext([{}, () => {}])

const TokenProvider = (props) => {
    const [state, setState] = useState({
        token:"",
        isLoggedIn: null,
        isChange: false,
    })
    return <TokenContext.Provider value={[state, setState]}>{props.children}</TokenContext.Provider>
}
export { TokenContext, TokenProvider};
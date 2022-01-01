import React, {useState, createContext} from 'react'
const LoadingContext = createContext([{}, () => {}])

const LoadingProvider = (props) => {
    const [state, setState] = useState({
       isLoaded: false,
    })
    return <LoadingContext.Provider value={[state, setState]}>{props.children}</LoadingContext.Provider>
}
export { LoadingContext, LoadingProvider};
import React, {useState, createContext} from 'react'
const HomeUpdatedContext = createContext([{}, () => {}])

const HomeUpdatedProvider = (props) => {
    const [state, setState] = useState({
       isHistoryUpdated: false,
    })
    return <HomeUpdatedContext.Provider value={[state, setState]}>{props.children}</HomeUpdatedContext.Provider>
}
export { HomeUpdatedContext, HomeUpdatedProvider};
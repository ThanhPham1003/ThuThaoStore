import React, {useState, createContext} from 'react'
const ClientUpdatedContext = createContext([{}, () => {}])

const ClientUpdatedProvider = (props) => {
    const [state, setState] = useState({
       isUpdated: false,
    })
    return <ClientUpdatedContext.Provider value={[state, setState]}>{props.children}</ClientUpdatedContext.Provider>
}
export { ClientUpdatedContext, ClientUpdatedProvider};
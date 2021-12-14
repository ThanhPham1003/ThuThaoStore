import React, {useState, createContext} from 'react'
const UserUpdatedContext = createContext([{}, () => {}])

const UserUpdatedProvider = (props) => {
    const [state, setState] = useState({
       isUpdated: false,
    })
    return <UserUpdatedContext.Provider value={[state, setState]}>{props.children}</UserUpdatedContext.Provider>
}
export { UserUpdatedContext, UserUpdatedProvider};
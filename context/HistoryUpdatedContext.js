import React, {useState, createContext} from 'react'
const HistoryUpdatedContext = createContext([{}, () => {}])

const HistoryUpdatedProvider = (props) => {
    const [state, setState] = useState({
       isUpdated: false,
    })
    return <HistoryUpdatedContext.Provider value={[state, setState]}>{props.children}</HistoryUpdatedContext.Provider>
}
export { HistoryUpdatedContext, HistoryUpdatedProvider};
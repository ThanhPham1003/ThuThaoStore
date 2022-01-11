import React, {useState, createContext} from 'react'
const OrderUpdatedContext = createContext([{}, () => {}])

const OrderUpdatedProvider = (props) => {
    const [state, setState] = useState({
       isUpdated: false,
    })
    return <OrderUpdatedContext.Provider value={[state, setState]}>{props.children}</OrderUpdatedContext.Provider>
}
export { OrderUpdatedContext, OrderUpdatedProvider};
import { createContext, useReducer } from "react";

const initialState = {
    startKwh: 0,
    endKwh: 0,
    pricePerKwh: 1444,
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'updateStartKwh':
            return {
                ...state,
                startKwh: action.payload,
            };
        case 'updateEndKwh':
            return {
                ...state,
                endKwh: action.payload,
            };
        case 'updatePricePerKwh':
            return {
                ...state,
                pricePerKwh: action.payload,
            };
        default:
            return {...state};
    }
}

export const AppContext = createContext()
export const AppProvider = ({ children }) => {
    const [appState, setAppState] = useReducer(appReducer, initialState)
    return (
        <AppContext.Provider value={[appState, setAppState]}>
            {children}
        </AppContext.Provider>
    )
}
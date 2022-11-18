import { createContext, useReducer } from "react";


export const residences = [{
    no: 'D2',
    start: 220,
}, {
    no: 'D3',
    start: 44,
}, {
    no: 'D4',
    start: 384,
}, {
    no: 'D5',
    start: 307,
}, {
    no: 'D6',
    start: 65,
}]

const initialState = {
    startKwh: 83.4,
    endKwh: 0,
    pricePerKwh: 1444,
    totalWaterUsage: residences.reduce((acc, d) => ({...acc, ...{[d.no]: d.start }}), {}),
    initialWaterUsage: residences.reduce((acc, d) => ({...acc, ...{[d.no]: d.start }}), {})
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
        case 'updateTotalWaterUsage':
            return {
                ...state,
                totalWaterUsage: {
                    ...state.totalWaterUsage,
                    [action.no]: action.usage,
                },
            };
        case 'updateInitialWaterUsage':
            return {
                ...state,
                initialWaterUsage: {
                    ...state.initialWaterUsage,
                    [action.no]: action.start,
                },
            };
        default:
            return { ...state };
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
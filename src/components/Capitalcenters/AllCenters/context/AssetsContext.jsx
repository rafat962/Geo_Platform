import { createContext, useContext, useReducer } from "react";

const initState = {
    OBJECTID: 0,
    detailsState: false,
    updateState: false,
    ItemData: null,
};

const AstsContext = createContext();

function reducer(state, action) {
    switch (action.type) {
        case "scroll":
            return { ...state, OBJECTID: action.payload };
        case "details":
            return {
                ...state,
                detailsState: true,
                ItemData: action.payload,
            };
        case "endDetails":
            return {
                ...state,
                detailsState: false,
                ItemData: null,
                OBJECTID: 0,
            };
        case "updateItem":
            return {
                ...state,
                updateState: true,
                ItemData: action.payload,
            };
        case "endUpdate":
            return { ...state, updateState: false, ItemData: null };
        default:
            return new Error("INVALID Action (AstsContext)");
    }
}

const AssetsContext = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initState);
    return (
        <AstsContext.Provider value={{ dispatch, state }}>
            {children}
        </AstsContext.Provider>
    );
};

const useAstsContext = () => {
    const context = useContext(AstsContext);
    if (context === undefined)
        throw new Error(
            "useAstsContext must be used within a AstsContextProvider"
        );
    return context;
};

export { AssetsContext, useAstsContext };

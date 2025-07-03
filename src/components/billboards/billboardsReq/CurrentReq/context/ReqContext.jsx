import { createContext, useContext, useReducer } from "react";

// Initial state
const initialRequestState = {
    objectId: 0,
    isDetailsOpen: false,
    isUpdateMode: false,
    itemData: null,
};

// Create context
const RequestContext = createContext();

// Reducer function
function requestReducer(state, action) {
    switch (action.type) {
        case "SET_OBJECT_ID":
            return { ...state, objectId: action.payload };
        case "SHOW_DETAILS":
            return {
                ...state,
                isDetailsOpen: true,
                itemData: action.payload,
            };
        case "HIDE_DETAILS":
            return {
                ...state,
                isDetailsOpen: false,
                itemData: null,
                objectId: 0,
            };
        case "START_UPDATE":
            return {
                ...state,
                isUpdateMode: true,
                itemData: action.payload,
            };
        case "END_UPDATE":
            return { ...state, isUpdateMode: false, itemData: null };
        default:
            throw new Error(`Invalid action type: ${action.type}`);
    }
}

// Context provider component
const RequestProvider = ({ children }) => {
    const [state, dispatch] = useReducer(requestReducer, initialRequestState);
    return (
        <RequestContext.Provider value={{ state, dispatch }}>
            {children}
        </RequestContext.Provider>
    );
};

// Custom hook for using context
const useRequestContext = () => {
    const context = useContext(RequestContext);
    if (!context) {
        throw new Error(
            "useRequestContext must be used within a RequestProvider"
        );
    }
    return context;
};

export { RequestProvider, useRequestContext };

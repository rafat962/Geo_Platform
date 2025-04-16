import React, { createContext, useContext, useReducer } from "react";

const RightNavBarContext = createContext();
const initState = {
    AttributeQuery: false,
    lable: false,
    Edit: false,
    Buffer: false,
    Routing: false,
    attribute: false,
    Print: false,
    Tools: false,
    MeasureDistance: false,
    MeasureArea: false,
    search: false,
    location: false,
};

function setAllFalse() {
    let falseArr = {};
    Object.keys(initState).forEach((key) => {
        falseArr[key] = false;
    });
    return falseArr;
}

function reducer(state, action) {
    let ResetStet = setAllFalse();
    switch (action.type) {
        case "AttributeQuery":
            return {
                AttributeQuery: !state.AttributeQuery,
            };
        case "lable":
            return {
                ...ResetStet,
                lable: !state.lable,
            };
        case "Edit":
            return {
                ...ResetStet,
                Edit: !state.Edit,
            };
        case "Buffer":
            return {
                ...ResetStet,
                Buffer: !state.Buffer,
            };
        case "Routing":
            return {
                ...ResetStet,
                Routing: !state.Routing,
            };
        case "attribute":
            return {
                ...ResetStet,
                attribute: !state.attribute,
            };
        case "Print":
            return {
                ...ResetStet,
                Print: !state.Print,
            };
        case "Tools":
            return {
                ...ResetStet,
                Tools: !state.Tools,
                MeasureDistance: state.MeasureDistance,
                MeasureArea: state.MeasureArea,
                search: state.search,
                location: state.location,
            };
        case "MeasureDistance":
            return {
                MeasureDistance: !state.MeasureDistance,
                Tools: !state.Tools,
            };
        case "MeasureArea":
            return {
                MeasureArea: !state.MeasureArea,
                Tools: !state.Tools,
            };
        case "search":
            return {
                search: !state.search,
                Tools: !state.Tools,
            };
        case "location":
            return {
                location: !state.location,
                Tools: !state.Tools,
            };
        case "reset":
            return {
                ...ResetStet,
            };
        default:
            return new Error("Invalid action");
    }
}

const RightNavContext = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initState);
    return (
        <RightNavBarContext.Provider value={{ state, dispatch }}>
            {children}
        </RightNavBarContext.Provider>
    );
};

function useRightNavContext() {
    const context = useContext(RightNavBarContext);
    if (context === undefined)
        throw new Error("useSideBar must be used within a SideContextProvider");
    return context;
}

export { RightNavContext, useRightNavContext };

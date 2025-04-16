import React, { createContext, useContext, useReducer } from "react";

const NavBarContext = createContext();
const initState = {
    layers: false,
    BaseMap: false,
    legend: false,
    bookMark: false,
    view: "",
    viewRef: "",
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
        case "layers":
            return {
                ResetStet,
                layers: !state.layers,
                view: state.view,
                viewRef: state.viewRef,
            };
        case "BaseMap":
            return {
                ResetStet,
                BaseMap: !state.BaseMap,
                view: state.view,
                viewRef: state.viewRef,
            };
        case "legend":
            return {
                ResetStet,
                legend: !state.legend,
                view: state.view,
                viewRef: state.viewRef,
            };
        case "bookMark":
            return {
                ResetStet,
                bookMark: !state.bookMark,
                view: state.view,
                viewRef: state.viewRef,
            };
        case "reset":
            return {
                ResetStet,
                view: state.view,
                viewRef: state.viewRef,
            };
        case "view":
            return {
                ...state,
                view: action.payload.view,
                viewRef: action.payload.viewRef,
            };
        default:
            return new Error("Invalid action");
    }
}

const NavContext = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initState);
    return (
        <NavBarContext.Provider value={{ state, dispatch }}>
            {children}
        </NavBarContext.Provider>
    );
};

function useNavContext() {
    const context = useContext(NavBarContext);
    if (context === undefined)
        throw new Error("useSideBar must be used within a SideContextProvider");
    return context;
}

export { NavContext, useNavContext };

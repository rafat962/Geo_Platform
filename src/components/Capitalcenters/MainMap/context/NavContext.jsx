import React, { createContext, useContext, useReducer } from "react";

const NavBarContext = createContext();
const initState = {
    layers: false,
    BaseMap: false,
    legend: false,
    bookMark: false,
    addLayer: false,
    view: "",
    viewRef: "",
    selectedLayer: "",
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
        case "addLayer":
            return {
                ResetStet,
                addLayer: !state.addLayer,
                view: state.view,
                viewRef: state.viewRef,
                selectedLayer: state.selectedLayer,
            };
        case "layers":
            return {
                ResetStet,
                layers: !state.layers,
                view: state.view,
                viewRef: state.viewRef,
                selectedLayer: state.selectedLayer,
            };
        case "BaseMap":
            return {
                ResetStet,
                BaseMap: !state.BaseMap,
                view: state.view,
                viewRef: state.viewRef,
                selectedLayer: state.selectedLayer,
            };
        case "legend":
            return {
                ResetStet,
                legend: !state.legend,
                view: state.view,
                viewRef: state.viewRef,
                selectedLayer: state.selectedLayer,
            };
        case "bookMark":
            return {
                ResetStet,
                bookMark: !state.bookMark,
                view: state.view,
                viewRef: state.viewRef,
                selectedLayer: state.selectedLayer,
            };
        case "reset":
            return {
                ResetStet,
                view: state.view,
                viewRef: state.viewRef,
                selectedLayer: state.selectedLayer,
            };
        case "view":
            return {
                ...state,
                view: action.payload.view,
                viewRef: action.payload.viewRef,
            };
        case "selectLayer":
            return {
                ...state,
                selectedLayer: action.payload.selectedLayer,
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

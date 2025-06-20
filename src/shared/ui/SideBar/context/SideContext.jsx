import { createContext, useContext, useReducer } from "react";

const sideContext = createContext();

const initState = {
    wekala: false,
    billboards: false,
    investmentAssets: false,
    billboardsAssets: false,
    billboardsitself: false,
    openNav: true,
    NavWidth: "w-[13rem]",
};

function reducer(state, action) {
    switch (action.type) {
        case "wekala":
            return { ...state, wekala: !state.wekala, investmentAssets: false };
        case "billboards":
            return {
                ...state,
                billboards: !state.billboards,
                billboardsAssets: false,
            };
        case "investmentAssets":
            return { ...state, investmentAssets: !state.investmentAssets };
        case "billboardsAssets":
            return { ...state, billboardsAssets: !state.billboardsAssets };
        case "billboardsitself":
            return { ...state, billboardsitself: !state.billboardsitself };
        case "openNav":
            return { ...state, openNav: !state.openNav };
        case "NavWidth":
            return {
                ...state,
                NavWidth: `${
                    state.NavWidth === "w-[13rem]" ? "w-[3.2rem]" : "w-[13rem]"
                }`,
            };
        default:
            return new Error("INVALID Action");
    }
}

const SideContext = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initState);

    return (
        <sideContext.Provider value={{ dispatch, state }}>
            {children}
        </sideContext.Provider>
    );
};

function useSideBar() {
    const context = useContext(sideContext);
    if (context === undefined)
        throw new Error("useSideBar must be used within a SideContextProvider");
    return context;
}

export { SideContext, useSideBar };

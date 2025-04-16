import styled from "styled-components";
import AppLayout from "./shared/ui/AppLayout";
import {
    createBrowserRouter,
    Navigate,
    RouterProvider,
} from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import InvestmentReq from "./components/InvestmentReq/InvestmentReq";
import LandUses from "./components/LandUses/LandUses";
import LandMark from "./components/LandMark/LandMark";
import Settings from "./components/Settings/Settings";
import LogOut from "./components/LogOut/LogOut";
import AllCenters from "./components/Capitalcenters/AllCenters/AllCenters";
import AddCenter from "./components/Capitalcenters/AddCenter/AddCenter";
import CapitalLayout from "./components/Capitalcenters/shared/ui/CapitalLayout";
import { AssetsContext } from "./components/Capitalcenters/AllCenters/context/AssetsContext";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useGetDarkmode } from "./shared/hooks/useGetDarkmode";
import { useEffect, useMemo } from "react";
import MangerMap from "./components/Capitalcenters/MainMap/MangerMap";
import getToken from "./shared/helpers/GetToken";
const AppContainer = styled.div`
    box-sizing: border-box;
    padding: 0px;
    margin: 0px;
`;
const routs = createBrowserRouter([
    {
        path: "/",
        element: (
            <AppContainer>
                <AppLayout />
            </AppContainer>
        ),
        children: [
            {
                index: true,
                element: <Navigate to="/dashboard" replace />,
            },
            {
                path: "/CapitalCenter",
                element: (
                    <AssetsContext>
                        <CapitalLayout />
                    </AssetsContext>
                ),
                children: [
                    { path: "AllCenters", element: <AllCenters /> },
                    { path: "AddCenter", element: <AddCenter /> },
                ],
            },

            { path: "/dashboard", element: <Dashboard /> },
            { path: "/InvestmentReq", element: <InvestmentReq /> },
            { path: "/LandUses", element: <LandUses /> },
            { path: "/Landmark", element: <LandMark /> },
            { path: "/Settings", element: <Settings /> },
            { path: "/LogOut", element: <LogOut /> },
        ],
    },
    { path: "/MainMap", element: <MangerMap /> },
]);

function App() {
    useEffect(() => {
        getToken();
    }, []);
    const { mode } = useGetDarkmode();
    let currentMode = "dark";
    mode === "dark" ? (currentMode = "dark") : (currentMode = "light");
    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode: currentMode,
                },
            }),
        [currentMode]
    );
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <RouterProvider router={routs}></RouterProvider>
        </ThemeProvider>
    );
}

export default App;

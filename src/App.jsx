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
import Report from "./components/Report/Report";
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
import authRoutes from "./components/Auth/auth.route";
import ProtectedRouts from "./components/Auth/gurd/Protected.Routs";
import settingsRoutes from "./components/Settings/settings.routing";
import { useDispatch } from "react-redux";
import { ToggleAuthorization } from "./components/Auth/AuthSlice";
import { useQuery } from "@tanstack/react-query";
import ReportData from "./components/Report/ReportData/ReportData";
import billboardRoutes from "./components/billboards/billboard.routing.jsx";

const AppContainer = styled.div`
    box-sizing: border-box;
    padding: 0px;
    margin: 0px;
`;
const routs = createBrowserRouter([
    ...authRoutes,
    {
        element: <ProtectedRouts />,
        children: [
            {
                path: "/",
                element: (
                    <AppContainer>
                        <AppLayout />
                    </AppContainer>
                ),
                children: [
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
                    {
                        path: "/Report",
                        element: <Report />,
                        children: [
                            {
                                path: "reportData",
                                element: <ReportData />,
                            },
                        ],
                    },
                    ...settingsRoutes,
                    ...billboardRoutes,
                    { path: "/LogOut", element: <LogOut /> },
                ],
            },
            { path: "/MainMap", element: <MangerMap /> },
        ],
    },
]);

function App() {
    // authorization
    const dispatch = useDispatch();
    const { data: userData } = useQuery({
        queryKey: ["userData"],
        queryFn: () => Promise.resolve(), // required dummy function
        enabled: false, // disables actual fetching
    });
    useEffect(() => {
        dispatch(
            ToggleAuthorization({
                permissions: userData?.permissions || [],
                role: userData?.role || "",
            })
        );
    }, [userData, dispatch]);
    useEffect(() => {
        getToken();
        // set langage
        const curLan = JSON.parse(localStorage.getItem("lang"));
        if (!curLan) {
            localStorage.setItem("lang", JSON.stringify("ar"));
        }
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
    // lan
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <RouterProvider router={routs}></RouterProvider>
        </ThemeProvider>
    );
}

export default App;

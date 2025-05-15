/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useVerfyToken } from "../hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
const ProtectedRouts = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { verefytoken, isPending } = useVerfyToken();
    useEffect(() => {
        verefytoken();
    }, []);
    const verifiedUser = queryClient.getQueryData(["verifiedUser"]);
    if (isPending)
        return (
            <Backdrop
                sx={(theme) => ({
                    color: "#fff",
                    zIndex: theme.zIndex.drawer + 1,
                })}
                open={open}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        );
    if (!verifiedUser) {
        return (
            <Backdrop
                sx={(theme) => ({
                    color: "#fff",
                    zIndex: theme.zIndex.drawer + 1,
                })}
                open={open}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        );
    } else if (verifiedUser === 200) {
        return <Outlet />;
    } else if (verifiedUser?.status === "fail") {
        navigate("/");
    }
};

export default ProtectedRouts;

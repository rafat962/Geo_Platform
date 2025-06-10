/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useVerfyToken } from "../hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";

const ProtectedRoutes = () => {
    const navigate = useNavigate();
    const { verefytoken, isPending, data, error } = useVerfyToken();
    const [status, setStatus] = useState(null);
    useEffect(() => {
        verefytoken(); // Call once on mount
    }, []);

    useEffect(() => {
        if (data) {
            setStatus(data.status);
        }
    }, [data]);
    // Loading UI
    if (isPending || status === null) {
        return (
            <Backdrop
                open
                sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        );
    }
    // Failed verification
    if (status !== 200) {
        navigate("/");
        return null;
    }

    // Success
    return <Outlet />;
};

export default ProtectedRoutes;

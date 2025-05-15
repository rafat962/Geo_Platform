// src/routes/authRoutes.js

import { Navigate } from "react-router-dom";
import MangeAuth from "./mangeAuth";
import LogIn from "./LogIn/LogIn";
import Signup from "./Signup/Signup";
import OTP from "./Signup/utils/OTP";

const authRoutes = [
    {
        path: "/auth",
        element: <MangeAuth />,
        children: [
            {
                path: "login",
                element: <LogIn />,
            },
            {
                path: "Signup",
                element: <Signup />,
            },
            {
                path: "active/:token",
                element: <OTP />,
            },
        ],
    },
    {
        index: true,
        element: <Navigate to="/auth/login" replace />,
    },
];

export default authRoutes;

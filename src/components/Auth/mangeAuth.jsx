import React from "react";
import { Outlet } from "react-router-dom";
import { BackgroundBeams } from "./ui/Background";

const MangeAuth = () => {
    return (
        <div className="relative bg-slate-950 overflow-auto w-full h-full">
            {/* Background - not clickable, behind Outlet */}
            <div className="pointer-events-none z-0 absolute inset-0 bg-slate-950">
                <BackgroundBeams />
            </div>

            {/* Foreground - content layer */}
            <div className="relative z-10 w-full h-screen">
                <Outlet />
            </div>
        </div>
    );
};

export default MangeAuth;

import { CircularProgress } from "@mui/material";
import React from "react";

const Loader = () => {
    return (
        <div className="flex items-center justify-center w-full h-[100vh]">
            <CircularProgress size={100} />
        </div>
    );
};

export default Loader;

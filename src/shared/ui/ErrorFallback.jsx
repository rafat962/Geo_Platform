import { Button } from "@mui/material";
import React from "react";

const ErrorFallback = ({ error, resetErrorBoundary }) => {
    return (
        <div className="w-[100vw] h-[100vh] flex flex-col space-y-6 items-center justify-center">
            <h1 className="text-lg">Something went wrong 🧐</h1>
            <p className="text-2xl font-bold tracking-wide">{error.message}</p>
            <Button size="large" onClick={resetErrorBoundary}>
                Try again
            </Button>
        </div>
    );
};

export default ErrorFallback;

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App.jsx";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./shared/ui/ErrorFallback.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

const query = new QueryClient();

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <QueryClientProvider client={query}>
            <ErrorBoundary
                FallbackComponent={ErrorFallback}
                onReset={() => window.location.replace("/")}
            >
                <ReactQueryDevtools initialIsOpen={false} />
                <App />
                <Toaster />
            </ErrorBoundary>
        </QueryClientProvider>
    </StrictMode>
);

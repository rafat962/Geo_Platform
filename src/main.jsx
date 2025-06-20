import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App.jsx";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./shared/ui/ErrorFallback.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import "./i18n.js";
import store from "./shared/store.js";
import { Provider } from "react-redux";
const query = new QueryClient();

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <ErrorBoundary
            FallbackComponent={ErrorFallback}
            onReset={() => window.location.replace("/")}
        >
            <QueryClientProvider client={query}>
                <ReactQueryDevtools initialIsOpen={false} />
                <Provider store={store}>
                    <Theme>
                        <App />
                    </Theme>
                </Provider>
                <Toaster />
            </QueryClientProvider>
        </ErrorBoundary>
    </StrictMode>
);

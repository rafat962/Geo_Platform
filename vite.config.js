import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        eslint({
            include: ["src/**/*.js", "src/**/*.jsx"],
        }),
    ],
    server: {
        host: "0.0.0.0",
        port: 5173,
    },
});

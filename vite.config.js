import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        eslint({
            // Optional: show lint errors in terminal
            include: ["src/**/*.js", "src/**/*.jsx"],
        }),
    ],
});

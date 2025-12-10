import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Optional: Define base path if deploying to a subdirectory, but generally not needed for Netlify root deploy
  // base: '/',
});

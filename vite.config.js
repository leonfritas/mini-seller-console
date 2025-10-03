import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom", // 👈 enables document/window for React Testing Library
    globals: true,        // 👈 lets you use test/expect without imports
    setupFiles: "./src/setupTests.js", // 👈 optional, for global mocks
  },
});

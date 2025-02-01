import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://api.jsonserve.com/Uw5CrX", // Replace with your API base URL
        changeOrigin: true, // Ensures the origin is changed to match the target
        secure: false, // Set to true if your API uses HTTPS with a valid certificate
        rewrite: (path) => path.replace(/^\/api/, ""), // Removes "/api" from the request path
      },
    },
  },
});

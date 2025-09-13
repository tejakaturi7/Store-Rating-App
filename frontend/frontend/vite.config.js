import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
  build: {
    outDir: "dist",
  },
  // 👇 This is the fix: all unknown routes go to index.html
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  preview: {
    port: 4173,
  },
});

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: "0.0.0.0",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@components": path.resolve(__dirname, "src/components"),
      "@data": path.resolve(__dirname, "src/data"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@appTypes": path.resolve(__dirname, "src/types"),
      "@services": path.resolve(__dirname, "src/services"),
      "@config": path.resolve(__dirname, "src/config"),
      "@styles": path.resolve(__dirname, "src/styles"),
      "@features": path.resolve(__dirname, "src/features"),
      "@assets": path.resolve(__dirname, "src/assets"),
    },
  },
  plugins: [react(), tailwindcss()],
});

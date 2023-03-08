import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  server: { host: "127.0.0.1", port: 3010 },
  plugins: [react()],
});

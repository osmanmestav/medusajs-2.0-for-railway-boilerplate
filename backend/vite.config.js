import { defineConfig } from "vite";

export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 7000,
    strictPort: true,
    allowedHosts: ["fearless-unity-production.up.railway.app"],
    cors: {
      origin: ["https://fearless-unity-production.up.railway.app"],
      credentials: true
    }
  }
});

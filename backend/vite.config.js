import { defineConfig } from "vite";

export default defineConfig({
    server: {
        host: "0.0.0.0",
        port: 7000,
        strictPort: true,
        allowedHosts: ["http://localhost:7000", "fearless-unity-production.up.railway.app", "https://fearless-unity-production.up.railway.app"],
        cors: {
            origin: ["http://localhost:7000", "fearless-unity-production.up.railway.app", "https://fearless-unity-production.up.railway.app"],
            credentials: true
        }
    },
    preview: {
        port: 7000,
        strictPort: true,
        host: '0.0.0.0',
        allowedHosts: true,
    },
});

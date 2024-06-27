import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    assetsInclude: ["**/*.glb"],
  },
  server: {
    port: 8080,
  },
  assetsInclude: ["**/*.glb"],
});

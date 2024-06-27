import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    assetsInclude: ["**/*.glb"],
    rollupOptions: {
      input: {
        main: "index.html",
        bottle: "bottle.html",
        dagger: "dagger.html",
        jewerly: "jewerly.html",
        kibitka: "kibitka.html",
      },
    },
  },
  server: {
    port: 8080,
  },
  assetsInclude: ["**/*.glb"],
});

import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  base: "/animal-sound-guessr/",
  build: {
    outDir: "dist",
    assetsDir: "assets",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        testing: resolve(__dirname, "src/testing.html"),
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});

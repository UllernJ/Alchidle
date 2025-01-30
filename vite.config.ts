import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import * as path from "node:path";

const root = path.resolve(__dirname, "src");

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    minify: true,
    manifest: true,
    outDir: "dist",
  },
  resolve: {
    alias: {
      "@": root,
    },
  }
});
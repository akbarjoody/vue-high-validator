import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

export default defineConfig({
  plugins: [vue()],
  root: resolve(__dirname, "website"),
  base: "./",
  resolve: {
    alias: {
      "vue-high-validator": resolve(__dirname, "src/index.js"),
    },
  },
  server: {
    port: 5173,
    open: true,
  },
  preview: {
    port: 4173,
    open: true,
  },
  build: {
    outDir: resolve(__dirname, "docs-dist"),
    emptyOutDir: true,
  },
});

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

export default defineConfig(({ command }) => {
  const alias = {
    "vue-high-validator": resolve(__dirname, "src/index.js"),
  };

  if (command === "serve") {
    return {
      plugins: [vue()],
      resolve: { alias },
      server: {
        port: 5173,
        open: true,
      },
    };
  }

  return {
    plugins: [vue()],
    resolve: { alias },
    build: {
      lib: {
        entry: resolve(__dirname, "src/index.js"),
        name: "VueHighValidator",
        fileName: (format) =>
          `vue-high-validator.${format === "es" ? "es" : "umd"}.js`,
      },
      rollupOptions: {
        external: ["vue"],
        output: {
          globals: {
            vue: "Vue",
          },
          exports: "named",
        },
      },
    },
  };
});

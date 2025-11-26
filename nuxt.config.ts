import { fileURLToPath } from "url";
import svgLoader from "vite-svg-loader";

import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  ssr: true,
  compatibilityDate: "2024-11-22",
  devtools: { enabled: true },

  srcDir: "src/",
  serverDir: "./src/server",

  dir: {
    layouts: "app/layouts",
    middleware: "app/middleware",
    plugins: "app/plugins",
  },

  modules: ["@pinia/nuxt", "@nuxt/eslint", "@nuxt/test-utils/module"],

  alias: {
    "@": fileURLToPath(new URL("./src", import.meta.url)),
    "@app": fileURLToPath(new URL("./src/app", import.meta.url)),
    "@pages": fileURLToPath(new URL("./src/pages", import.meta.url)),
    "@widgets": fileURLToPath(new URL("./src/widgets", import.meta.url)),
    "@features": fileURLToPath(new URL("./src/features", import.meta.url)),
    "@entities": fileURLToPath(new URL("./src/entities", import.meta.url)),
    "@shared": fileURLToPath(new URL("./src/shared", import.meta.url)),
  },

  css: ["@app/styles/theme.scss", "@app/styles/main.scss"],

  vite: {
    plugins: [
      svgLoader({
        svgoConfig: {
          plugins: [
            {
              name: "preset-default",
              params: {
                overrides: {
                  removeViewBox: false,
                },
              },
            },
          ],
        },
      }),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData:
            '@use "@app/styles/_variables.scss" as *; @use "@/app/styles/breakpoints.scss" as *;',
        },
      },
    },
  },

  pinia: {
    storesDirs: ["./src/entities/**/model", "./src/stores/**"],
  },
  runtimeConfig: {
    marketApiBaseUrl: "",
    public: {},
  },

  build: {
    transpile: ["@tanstack/vue-query"],
  },

  routeRules: {
    "/": { redirect: "/market" },
  },
});

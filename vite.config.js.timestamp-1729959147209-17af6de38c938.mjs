// vite.config.js
import autoprefixer from "file:///Z:/Frontend/APP.C24B/node_modules/autoprefixer/lib/autoprefixer.js";
import path2 from "node:path";
import { defineConfig } from "file:///Z:/Frontend/APP.C24B/node_modules/vite/dist/node/index.js";
import VitePluginBrowserSync from "file:///Z:/Frontend/APP.C24B/node_modules/vite-plugin-browser-sync/dist/index.js";
import prefetchPlugin from "file:///Z:/Frontend/APP.C24B/node_modules/vite-plugin-bundle-prefetch/dist/vite-plugin-bundle-prefetch.js";
import { compression } from "file:///Z:/Frontend/APP.C24B/node_modules/vite-plugin-compression2/dist/index.mjs";
import { nodePolyfills } from "file:///Z:/Frontend/APP.C24B/node_modules/vite-plugin-node-polyfills/dist/index.js";
import { VitePWA } from "file:///Z:/Frontend/APP.C24B/node_modules/vite-plugin-pwa/dist/index.js";
import { viteStaticCopy } from "file:///Z:/Frontend/APP.C24B/node_modules/vite-plugin-static-copy/dist/index.js";

// webapp/https/certificate.mjs
import fs from "node:fs/promises";
import path from "node:path";
var __vite_injected_original_dirname = "Z:\\Frontend\\APP.C24B\\webapp\\https";
var probeDirectory = async (dirList, agr = "local/") => {
  for (const dir of dirList) {
    const check = await fs.stat(path.resolve(__vite_injected_original_dirname, dir + agr, "certificate.crt")).catch(() => false);
    if (check) {
      return path.resolve(__vite_injected_original_dirname, dir);
    }
  }
  return path.resolve(__vite_injected_original_dirname, dirList[0]);
};
var probe = await probeDirectory([
  "./",
  "./webapp/https/",
  "../webapp/https/"
], "local/");
var local = await probeDirectory([
  path.resolve(probe, "./private/"),
  path.resolve(probe, "./local/")
], "");
var loadFile = async (lfile) => {
  const fx = await fs.readFile(path.resolve(probe, lfile));
  return fx;
};
var certificate_default = {
  ca: await loadFile(path.resolve(local, "./certificate_ca.crt")),
  key: await loadFile(path.resolve(local, "./certificate.key")),
  cert: await loadFile(path.resolve(local, "./certificate.crt"))
};

// tsconfig.json
var tsconfig_default = {
  include: ["**/*.ts", "**/*.mjs", "**/*.js", "**/*.d.ts", "**/*.tsx"],
  exclude: ["./node_modules", "../node_modules"],
  compilerOptions: {
    types: ["./global.d.ts"],
    paths: {
      "@/*": ["*"],
      "@idc/*": ["src/*"],
      "@src/*": ["src/*"],
      "@unite/*": ["unite/*"],
      "@assets/*": ["assets/*"],
      "@ux-ts/*": ["unite/scripts/*"],
      "@ux-ss/*": ["unite/scss/*"]
    },
    baseUrl: "./",
    composite: true,
    lib: ["dom", "esnext", "webworker"],
    module: "ESNext",
    target: "ESNext",
    resolveJsonModule: true,
    allowSyntheticDefaultImports: true,
    moduleResolution: "Bundler",
    verbatimModuleSyntax: true,
    allowArbitraryExtensions: true,
    allowImportingTsExtensions: true,
    esModuleInterop: true,
    allowJs: true,
    noEmit: true,
    sourceMap: true,
    removeComments: false,
    noImplicitAny: false,
    noImplicitOverride: false,
    noImplicitReturns: false,
    noImplicitThis: false,
    noImplicitUseStrict: false,
    strictNullChecks: true,
    strictFunctionTypes: true,
    strictPropertyInitialization: false,
    strictBindCallApply: true,
    alwaysStrict: true,
    noUnusedLocals: true,
    noUnusedParameters: true,
    noFallthroughCasesInSwitch: true,
    allowUnusedLabels: true,
    allowUnreachableCode: true,
    forceConsistentCasingInFileNames: true,
    strict: true
  }
};

// vite.config.js
import vue from "file:///Z:/Frontend/APP.C24B/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { viteSingleFile } from "file:///Z:/Frontend/APP.C24B/node_modules/vite-plugin-singlefile/dist/esm/index.js";
import json5Plugin from "file:///Z:/Frontend/APP.C24B/node_modules/vite-plugin-json5/dist/index.js";
import VueI18n from "file:///Z:/Frontend/APP.C24B/node_modules/@intlify/unplugin-vue-i18n/lib/vite.mjs";
import cssnano from "file:///Z:/Frontend/APP.C24B/node_modules/cssnano/src/index.js";
import deduplicate from "file:///Z:/Frontend/APP.C24B/node_modules/postcss-discard-duplicates/src/index.js";
import postcssPresetEnv from "file:///Z:/Frontend/APP.C24B/node_modules/postcss-preset-env/dist/index.mjs";
var __vite_injected_original_dirname2 = "Z:\\Frontend\\APP.C24B";
var sourceMapsInProduction = true;
var __dirname = __vite_injected_original_dirname2;
var production = process.env.NODE_ENV === "production";
var config = defineConfig({
  root: "./",
  base: "./",
  resolve: {
    alias: {
      "vue-i18n": "vue-i18n/dist/vue-i18n.runtime.esm-bundler.js",
      "vue": "vue/dist/vue.esm-bundler.js",
      "@node_modules": path2.resolve("./node_modules"),
      "@culori": path2.resolve("./node_modules/culori"),
      "@material": path2.resolve("./node_modules/@material"),
      "happy-opfs": path2.resolve("./node_modules/happy-opfs"),
      "@": path2.resolve("./"),
      "@src": path2.resolve("src/"),
      "@idc": path2.resolve("src/"),
      "@unite": path2.resolve("unite/"),
      "@ux-ts": path2.resolve("unite/scripts/"),
      "@ux-ss": path2.resolve("unite/scss/"),
      "@assets": path2.resolve("assets/")
    }
  },
  plugins: [
    json5Plugin(),
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => [
            "css-doodle",
            "x-scrollbox",
            "x-focustext",
            "x-longtext"
          ].includes(tag)
        }
      }
    }),
    VueI18n({
      runtimeOnly: true
    }),
    viteSingleFile({
      useRecommendedBuildConfig: false,
      inlinePattern: ["!(service).mjs"]
    }),
    //analyzer(),
    nodePolyfills(),
    compression({
      algorithm: "brotliCompress"
    }),
    prefetchPlugin(),
    VitePluginBrowserSync(),
    VitePWA({
      injectRegister: null,
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
        resolveTempFolder: () => {
          return "./webapp/index";
        }
      },
      workbox: {
        clientsClaim: true,
        skipWaiting: true
      }
    }),
    viteStaticCopy({
      targets: [
        {
          src: "./assets/*",
          dest: "./assets"
          // 2️⃣
        },
        {
          src: "./copying/!(node_modules)",
          dest: "./"
          // 2️⃣
        },
        {
          src: "./webapp/https/*",
          dest: "./webapp/https/"
          // 2️⃣
        }
      ]
    })
  ],
  server: {
    origin: "",
    host: "0.0.0.0",
    port: 443,
    https: {
      ...certificate_default
    },
    cors: {
      allowedHeaders: "*",
      preflightContinue: true,
      credentials: true,
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      origin: "*"
    },
    headers: {
      "Content-Security-Policy": "upgrade-insecure-requests",
      "Service-Worker-Allowed": "/",
      "Permissions-Policy": "fullscreen=*, window-management=*",
      "Cross-Origin-Embedder-Policy": "require-corp",
      "Cross-Origin-Opener-Policy": "same-origin",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Request-Headers": "*"
    }
  },
  esbuild: {
    target: "esnext",
    minifySyntax: true,
    minifyWhitespace: true,
    minifyIdentifiers: true
  },
  build: {
    chunkSizeWarningLimit: 1e8,
    minify: "esbuild",
    cssMinify: true,
    modulePreload: true,
    target: ["esnext"],
    sourcemap: sourceMapsInProduction,
    outDir: "./webapp/index",
    emptyOutDir: true,
    cssCodeSplit: false,
    rollupOptions: {
      input: "./index.html",
      output: {
        inlineDynamicImports: true,
        manualChunks: false
      }
    }
  },
  css: {
    postcss: {
      plugins: [autoprefixer(), deduplicate(), cssnano({
        preset: ["default", {
          calc: false,
          discardComments: {
            removeAll: true
          }
        }]
      }), postcssPresetEnv({ stage: 0 })]
    }
  },
  optimizeDeps: {
    esbuildOptions: { target: "esnext", supported: { bigint: true } }
  }
});
var vite_config_default = config;
var aliases = tsconfig_default.compilerOptions.paths;
for (const alias in aliases) {
  const paths = aliases[alias].map((p) => path2.resolve(__dirname, p));
  const viteAlias = alias.replace(/(\\|\/)\*$/, "");
  const vitePaths = paths.map((p) => p.replace(/(\\|\/)\*$/, ""));
  if (!config.resolve) config.resolve = {};
  if (!config.resolve.alias) config.resolve.alias = {};
  if (config.resolve && config.resolve.alias && !(viteAlias in config.resolve.alias)) {
    config.resolve.alias[viteAlias] = vitePaths.length > 1 ? vitePaths : vitePaths[0];
  }
}
export {
  config,
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiLCAid2ViYXBwL2h0dHBzL2NlcnRpZmljYXRlLm1qcyIsICJ0c2NvbmZpZy5qc29uIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiWjpcXFxcRnJvbnRlbmRcXFxcQVBQLkMyNEJcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIlo6XFxcXEZyb250ZW5kXFxcXEFQUC5DMjRCXFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9aOi9Gcm9udGVuZC9BUFAuQzI0Qi92aXRlLmNvbmZpZy5qc1wiO1xuLy9cbmNvbnN0IHNvdXJjZU1hcHNJblByb2R1Y3Rpb24gPSB0cnVlO1xuXG4vL1xuaW1wb3J0IGF1dG9wcmVmaXhlciBmcm9tIFwiYXV0b3ByZWZpeGVyXCI7XG5pbXBvcnQgcGF0aCBmcm9tIFwibm9kZTpwYXRoXCI7XG5pbXBvcnQge2RlZmluZUNvbmZpZ30gZnJvbSBcInZpdGVcIjtcbmltcG9ydCBWaXRlUGx1Z2luQnJvd3NlclN5bmMgZnJvbSAndml0ZS1wbHVnaW4tYnJvd3Nlci1zeW5jJztcbmltcG9ydCBwcmVmZXRjaFBsdWdpbiBmcm9tICd2aXRlLXBsdWdpbi1idW5kbGUtcHJlZmV0Y2gnO1xuaW1wb3J0IHtjb21wcmVzc2lvbn0gZnJvbSBcInZpdGUtcGx1Z2luLWNvbXByZXNzaW9uMlwiO1xuaW1wb3J0IHtub2RlUG9seWZpbGxzfSBmcm9tIFwidml0ZS1wbHVnaW4tbm9kZS1wb2x5ZmlsbHNcIjtcbmltcG9ydCB7Vml0ZVBXQX0gZnJvbSBcInZpdGUtcGx1Z2luLXB3YVwiO1xuaW1wb3J0IHt2aXRlU3RhdGljQ29weX0gZnJvbSBcInZpdGUtcGx1Z2luLXN0YXRpYy1jb3B5XCI7XG5pbXBvcnQgY2VydGlmaWNhdGUgZnJvbSBcIi4vd2ViYXBwL2h0dHBzL2NlcnRpZmljYXRlLm1qc1wiO1xuaW1wb3J0IHBrZyBmcm9tIFwiLi9wYWNrYWdlLmpzb25cIiB3aXRoIHsgdHlwZTogXCJqc29uXCIgfTtcbmltcG9ydCB0c2NvbmZpZyBmcm9tIFwiLi90c2NvbmZpZy5qc29uXCIgd2l0aCB7IHR5cGU6IFwianNvblwiIH07XG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcbmltcG9ydCB7IHZpdGVTaW5nbGVGaWxlIH0gZnJvbSBcInZpdGUtcGx1Z2luLXNpbmdsZWZpbGVcIlxuaW1wb3J0IGpzb241UGx1Z2luIGZyb20gJ3ZpdGUtcGx1Z2luLWpzb241J1xuaW1wb3J0IFZ1ZUkxOG4gZnJvbSAnQGludGxpZnkvdW5wbHVnaW4tdnVlLWkxOG4vdml0ZSdcblxuaW1wb3J0IGNzc25hbm8gZnJvbSBcImNzc25hbm9cIjtcbmltcG9ydCBkZWR1cGxpY2F0ZSBmcm9tIFwicG9zdGNzcy1kaXNjYXJkLWR1cGxpY2F0ZXNcIjtcblxuaW1wb3J0IHBvc3Rjc3NQcmVzZXRFbnYgZnJvbSAncG9zdGNzcy1wcmVzZXQtZW52JztcblxuLy9cbmNvbnN0IF9fZGlybmFtZSA9IGltcG9ydC5tZXRhLmRpcm5hbWU7XG5cbi8vXG5jb25zdCByID0gKHMpID0+IHtcbiAgICByZXR1cm4gcztcbn07XG5cbi8qcHJvY2Vzcy5lbnYgPSB7XG4gICAgLi4ucHJvY2Vzcy5lbnYsXG4gICAgLi4ubG9hZEVudihtb2RlLCBwcm9jZXNzLmN3ZCgpKVxufTsqL1xuXG4vL1xuY29uc3QgcHJvZHVjdGlvbiA9IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbic7XG5jb25zdCBjb25maWcgPSBkZWZpbmVDb25maWcoe1xuICAgIHJvb3Q6IFwiLi9cIixcbiAgICBiYXNlOiAnLi8nLFxuICAgIHJlc29sdmU6IHtcbiAgICAgICAgYWxpYXM6IHtcbiAgICAgICAgICAgIFwidnVlLWkxOG5cIjogJ3Z1ZS1pMThuL2Rpc3QvdnVlLWkxOG4ucnVudGltZS5lc20tYnVuZGxlci5qcycsXG4gICAgICAgICAgICBcInZ1ZVwiOiAndnVlL2Rpc3QvdnVlLmVzbS1idW5kbGVyLmpzJyxcbiAgICAgICAgICAgIFwiQG5vZGVfbW9kdWxlc1wiOiBwYXRoLnJlc29sdmUoXCIuL25vZGVfbW9kdWxlc1wiKSxcbiAgICAgICAgICAgIFwiQGN1bG9yaVwiOiBwYXRoLnJlc29sdmUoXCIuL25vZGVfbW9kdWxlcy9jdWxvcmlcIiksXG4gICAgICAgICAgICBcIkBtYXRlcmlhbFwiOiBwYXRoLnJlc29sdmUoXCIuL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWxcIiksXG4gICAgICAgICAgICBcImhhcHB5LW9wZnNcIjogcGF0aC5yZXNvbHZlKFwiLi9ub2RlX21vZHVsZXMvaGFwcHktb3Bmc1wiKSxcblxuICAgICAgICAgICAgXCJAXCI6IHBhdGgucmVzb2x2ZShcIi4vXCIpLFxuICAgICAgICAgICAgXCJAc3JjXCI6IHBhdGgucmVzb2x2ZShcInNyYy9cIiksXG4gICAgICAgICAgICBcIkBpZGNcIjogcGF0aC5yZXNvbHZlKFwic3JjL1wiKSxcbiAgICAgICAgICAgIFwiQHVuaXRlXCI6IHBhdGgucmVzb2x2ZShcInVuaXRlL1wiKSxcbiAgICAgICAgICAgIFwiQHV4LXRzXCI6IHBhdGgucmVzb2x2ZShcInVuaXRlL3NjcmlwdHMvXCIpLFxuICAgICAgICAgICAgXCJAdXgtc3NcIjogcGF0aC5yZXNvbHZlKFwidW5pdGUvc2Nzcy9cIiksXG4gICAgICAgICAgICBcIkBhc3NldHNcIjogcGF0aC5yZXNvbHZlKFwiYXNzZXRzL1wiKVxuICAgICAgICB9LFxuICAgIH0sXG4gICAgcGx1Z2luczogW1xuICAgICAgICBqc29uNVBsdWdpbigpLFxuICAgICAgICB2dWUoe1xuICAgICAgICAgICAgdGVtcGxhdGU6IHtcbiAgICAgICAgICAgICAgICBjb21waWxlck9wdGlvbnM6IHtcbiAgICAgICAgICAgICAgICAgICAgaXNDdXN0b21FbGVtZW50OiAodGFnKSA9PiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAnY3NzLWRvb2RsZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAneC1zY3JvbGxib3gnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3gtZm9jdXN0ZXh0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICd4LWxvbmd0ZXh0J1xuICAgICAgICAgICAgICAgICAgICBdLmluY2x1ZGVzKHRhZyksXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KSxcbiAgICAgICAgVnVlSTE4bih7XG4gICAgICAgICAgICBydW50aW1lT25seTogdHJ1ZVxuICAgICAgICB9KSxcbiAgICAgICAgdml0ZVNpbmdsZUZpbGUoe1xuICAgICAgICAgICAgdXNlUmVjb21tZW5kZWRCdWlsZENvbmZpZzogZmFsc2UsXG4gICAgICAgICAgICBpbmxpbmVQYXR0ZXJuOiBbXCIhKHNlcnZpY2UpLm1qc1wiXVxuICAgICAgICB9KSxcbiAgICAgICAgLy9hbmFseXplcigpLFxuICAgICAgICBub2RlUG9seWZpbGxzKCksXG4gICAgICAgIGNvbXByZXNzaW9uKHtcbiAgICAgICAgICAgIGFsZ29yaXRobTogJ2Jyb3RsaUNvbXByZXNzJ1xuICAgICAgICB9KSxcbiAgICAgICAgcHJlZmV0Y2hQbHVnaW4oKSxcbiAgICAgICAgVml0ZVBsdWdpbkJyb3dzZXJTeW5jKCksXG4gICAgICAgIFZpdGVQV0Eoe1xuICAgICAgICAgICAgaW5qZWN0UmVnaXN0ZXI6IG51bGwsXG4gICAgICAgICAgICByZWdpc3RlclR5cGU6IFwiYXV0b1VwZGF0ZVwiLFxuICAgICAgICAgICAgZGV2T3B0aW9uczoge1xuICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgcmVzb2x2ZVRlbXBGb2xkZXI6ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiLi93ZWJhcHAvaW5kZXhcIjtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHdvcmtib3g6IHtcbiAgICAgICAgICAgICAgICBjbGllbnRzQ2xhaW06IHRydWUsXG4gICAgICAgICAgICAgICAgc2tpcFdhaXRpbmc6IHRydWUsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9KSxcbiAgICAgICAgdml0ZVN0YXRpY0NvcHkoe1xuICAgICAgICAgICAgdGFyZ2V0czogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgc3JjOiBcIi4vYXNzZXRzLypcIixcbiAgICAgICAgICAgICAgICAgICAgZGVzdDogXCIuL2Fzc2V0c1wiLCAvLyAyXHVGRTBGXHUyMEUzXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHNyYzogXCIuL2NvcHlpbmcvIShub2RlX21vZHVsZXMpXCIsXG4gICAgICAgICAgICAgICAgICAgIGRlc3Q6IFwiLi9cIiwgLy8gMlx1RkUwRlx1MjBFM1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBzcmM6IFwiLi93ZWJhcHAvaHR0cHMvKlwiLFxuICAgICAgICAgICAgICAgICAgICBkZXN0OiBcIi4vd2ViYXBwL2h0dHBzL1wiLCAvLyAyXHVGRTBGXHUyMEUzXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgIH0pXG4gICAgXSxcbiAgICBzZXJ2ZXI6IHtcbiAgICAgICAgb3JpZ2luOiBcIlwiLFxuICAgICAgICBob3N0OiBcIjAuMC4wLjBcIixcbiAgICAgICAgcG9ydDogNDQzLFxuICAgICAgICBodHRwczoge1xuICAgICAgICAgICAgLi4uY2VydGlmaWNhdGUsXG4gICAgICAgIH0sXG4gICAgICAgIGNvcnM6IHtcbiAgICAgICAgICAgIGFsbG93ZWRIZWFkZXJzOiBcIipcIixcbiAgICAgICAgICAgIHByZWZsaWdodENvbnRpbnVlOiB0cnVlLFxuICAgICAgICAgICAgY3JlZGVudGlhbHM6IHRydWUsXG4gICAgICAgICAgICBtZXRob2RzOiBcIkdFVCxIRUFELFBVVCxQQVRDSCxQT1NULERFTEVURVwiLFxuICAgICAgICAgICAgb3JpZ2luOiBcIipcIlxuICAgICAgICB9LFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICBcIkNvbnRlbnQtU2VjdXJpdHktUG9saWN5XCI6IFwidXBncmFkZS1pbnNlY3VyZS1yZXF1ZXN0c1wiLFxuICAgICAgICAgICAgXCJTZXJ2aWNlLVdvcmtlci1BbGxvd2VkXCI6IFwiL1wiLFxuICAgICAgICAgICAgXCJQZXJtaXNzaW9ucy1Qb2xpY3lcIjogXCJmdWxsc2NyZWVuPSosIHdpbmRvdy1tYW5hZ2VtZW50PSpcIixcbiAgICAgICAgICAgIFwiQ3Jvc3MtT3JpZ2luLUVtYmVkZGVyLVBvbGljeVwiOiBcInJlcXVpcmUtY29ycFwiLFxuICAgICAgICAgICAgXCJDcm9zcy1PcmlnaW4tT3BlbmVyLVBvbGljeVwiOiBcInNhbWUtb3JpZ2luXCIsXG4gICAgICAgICAgICBcIkFjY2Vzcy1Db250cm9sLUFsbG93LU1ldGhvZHNcIjogXCJHRVQsIFBPU1QsIFBVVCwgREVMRVRFLCBQQVRDSCwgT1BUSU9OU1wiLFxuICAgICAgICAgICAgXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW5cIjogXCIqXCIsXG4gICAgICAgICAgICBcIkFjY2Vzcy1Db250cm9sLUFsbG93LUhlYWRlcnNcIjogXCIqXCIsXG4gICAgICAgICAgICBcIkFjY2Vzcy1Db250cm9sLVJlcXVlc3QtSGVhZGVyc1wiOiBcIipcIlxuICAgICAgICB9XG4gICAgfSxcbiAgICBlc2J1aWxkOiB7XG4gICAgICAgIHRhcmdldDogXCJlc25leHRcIixcbiAgICAgICAgbWluaWZ5U3ludGF4OiB0cnVlLFxuICAgICAgICBtaW5pZnlXaGl0ZXNwYWNlOiB0cnVlLFxuICAgICAgICBtaW5pZnlJZGVudGlmaWVyczogdHJ1ZVxuICAgIH0sXG4gICAgYnVpbGQ6IHtcbiAgICAgICAgY2h1bmtTaXplV2FybmluZ0xpbWl0OiAxMDAwMDAwMDAsXG4gICAgICAgIG1pbmlmeTogJ2VzYnVpbGQnLFxuICAgICAgICBjc3NNaW5pZnk6IHRydWUsXG4gICAgICAgIG1vZHVsZVByZWxvYWQ6IHRydWUsXG4gICAgICAgIHRhcmdldDogW1wiZXNuZXh0XCJdLFxuICAgICAgICBzb3VyY2VtYXA6IHNvdXJjZU1hcHNJblByb2R1Y3Rpb24sXG4gICAgICAgIG91dERpcjogXCIuL3dlYmFwcC9pbmRleFwiLFxuICAgICAgICBlbXB0eU91dERpcjogdHJ1ZSxcbiAgICAgICAgY3NzQ29kZVNwbGl0OiBmYWxzZSxcbiAgICAgICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgICAgICAgaW5wdXQ6IFwiLi9pbmRleC5odG1sXCIsXG4gICAgICAgICAgICBvdXRwdXQ6IHtcbiAgICAgICAgICAgICAgICBpbmxpbmVEeW5hbWljSW1wb3J0czogdHJ1ZSxcbiAgICAgICAgICAgICAgICBtYW51YWxDaHVua3M6IGZhbHNlXG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgIH0sXG4gICAgY3NzOiB7XG4gICAgICAgIHBvc3Rjc3M6IHtcbiAgICAgICAgICAgIHBsdWdpbnM6IFthdXRvcHJlZml4ZXIoKSwgZGVkdXBsaWNhdGUoKSwgY3NzbmFubyh7XG4gICAgICAgICAgICAgICAgcHJlc2V0OiBbJ2RlZmF1bHQnLCB7XG4gICAgICAgICAgICAgICAgICAgIGNhbGM6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBkaXNjYXJkQ29tbWVudHM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbW92ZUFsbDogdHJ1ZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICB9KSwgcG9zdGNzc1ByZXNldEVudih7IHN0YWdlOiAwIH0pXSxcbiAgICAgICAgfSxcbiAgICB9LFxuICAgIG9wdGltaXplRGVwczoge1xuICAgICAgICBlc2J1aWxkT3B0aW9uczoge3RhcmdldDogXCJlc25leHRcIiwgc3VwcG9ydGVkOiB7YmlnaW50OiB0cnVlfX0sXG4gICAgfSxcbn0pO1xuXG4vL1xuZXhwb3J0IGRlZmF1bHQgY29uZmlnO1xuZXhwb3J0IHtjb25maWd9O1xuXG4vLyBMb2FkIHBhdGggYWxpYXNlcyBmcm9tIHRoZSB0c2NvbmZpZy5qc29uIGZpbGVcbmNvbnN0IGFsaWFzZXMgPSB0c2NvbmZpZy5jb21waWxlck9wdGlvbnMucGF0aHM7XG5cbmZvciAoY29uc3QgYWxpYXMgaW4gYWxpYXNlcykge1xuICAgIGNvbnN0IHBhdGhzID0gYWxpYXNlc1thbGlhc10ubWFwKChwKSA9PiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBwKSk7XG5cbiAgICAvLyBPdXIgdHNjb25maWcgdXNlcyBnbG9iIHBhdGggZm9ybWF0cywgd2hlcmVhcyB2aXRlIGp1c3Qgd2FudHMgZGlyZWN0b3JpZXNcbiAgICAvLyBXZSdsbCBuZWVkIHRvIHRyYW5zZm9ybSB0aGUgZ2xvYiBmb3JtYXQgaW50byBhIGZvcm1hdCBhY2NlcHRhYmxlIHRvIHZpdGVcblxuICAgIGNvbnN0IHZpdGVBbGlhcyA9IGFsaWFzLnJlcGxhY2UoLyhcXFxcfFxcLylcXCokLywgJycpO1xuICAgIGNvbnN0IHZpdGVQYXRocyA9IHBhdGhzLm1hcCgocCkgPT4gcC5yZXBsYWNlKC8oXFxcXHxcXC8pXFwqJC8sICcnKSk7XG5cbiAgICBpZiAoIWNvbmZpZy5yZXNvbHZlKSBjb25maWcucmVzb2x2ZSA9IHt9O1xuICAgIGlmICghY29uZmlnLnJlc29sdmUuYWxpYXMpIGNvbmZpZy5yZXNvbHZlLmFsaWFzID0ge307XG5cbiAgICBpZiAoY29uZmlnLnJlc29sdmUgJiYgY29uZmlnLnJlc29sdmUuYWxpYXMgJiYgISh2aXRlQWxpYXMgaW4gY29uZmlnLnJlc29sdmUuYWxpYXMpKSB7XG4gICAgICAgIGNvbmZpZy5yZXNvbHZlLmFsaWFzW3ZpdGVBbGlhc10gPSB2aXRlUGF0aHMubGVuZ3RoID4gMSA/IHZpdGVQYXRocyA6IHZpdGVQYXRoc1swXTtcbiAgICB9XG59XG5cbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiWjpcXFxcRnJvbnRlbmRcXFxcQVBQLkMyNEJcXFxcd2ViYXBwXFxcXGh0dHBzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJaOlxcXFxGcm9udGVuZFxcXFxBUFAuQzI0QlxcXFx3ZWJhcHBcXFxcaHR0cHNcXFxcY2VydGlmaWNhdGUubWpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9aOi9Gcm9udGVuZC9BUFAuQzI0Qi93ZWJhcHAvaHR0cHMvY2VydGlmaWNhdGUubWpzXCI7aW1wb3J0IGZzIGZyb20gXCJub2RlOmZzL3Byb21pc2VzXCJcbmltcG9ydCBwYXRoIGZyb20gXCJub2RlOnBhdGhcIlxuXG4vL1xuY29uc3QgcHJvYmVEaXJlY3RvcnkgPSBhc3luYyAoZGlyTGlzdCwgYWdyID0gXCJsb2NhbC9cIikgPT4ge1xuICAgIGZvciAoY29uc3QgZGlyIG9mIGRpckxpc3QpIHtcbiAgICAgICAgY29uc3QgY2hlY2sgPSBhd2FpdCBmc1xuICAgICAgICAgICAgLnN0YXQocGF0aC5yZXNvbHZlKGltcG9ydC5tZXRhLmRpcm5hbWUsIGRpciArIGFnciwgXCJjZXJ0aWZpY2F0ZS5jcnRcIikpXG4gICAgICAgICAgICAuY2F0Y2goKCkgPT4gZmFsc2UpO1xuICAgICAgICBpZiAoY2hlY2spIHtcbiAgICAgICAgICAgIHJldHVybiBwYXRoLnJlc29sdmUoaW1wb3J0Lm1ldGEuZGlybmFtZSwgZGlyKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcGF0aC5yZXNvbHZlKGltcG9ydC5tZXRhLmRpcm5hbWUsIGRpckxpc3RbMF0pO1xufTtcblxuLy9cbmNvbnN0IHByb2JlID0gYXdhaXQgcHJvYmVEaXJlY3RvcnkoW1xuICAgIFwiLi9cIixcbiAgICBcIi4vd2ViYXBwL2h0dHBzL1wiLFxuICAgIFwiLi4vd2ViYXBwL2h0dHBzL1wiLFxuXSwgXCJsb2NhbC9cIik7XG5cbi8vXG5jb25zdCBsb2NhbCA9IGF3YWl0IHByb2JlRGlyZWN0b3J5KFtcbiAgICBwYXRoLnJlc29sdmUocHJvYmUsIFwiLi9wcml2YXRlL1wiKSxcbiAgICBwYXRoLnJlc29sdmUocHJvYmUsIFwiLi9sb2NhbC9cIilcbl0sIFwiXCIpO1xuXG4vL1xuY29uc3QgbG9hZEZpbGUgPSBhc3luYyAobGZpbGUpPT57XG4gICAgY29uc3QgZnggPSBhd2FpdCBmcy5yZWFkRmlsZShwYXRoLnJlc29sdmUocHJvYmUsIGxmaWxlKSlcbiAgICByZXR1cm4gZng7XG59XG5cbi8vXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgY2E6IGF3YWl0IGxvYWRGaWxlKHBhdGgucmVzb2x2ZShsb2NhbCwgXCIuL2NlcnRpZmljYXRlX2NhLmNydFwiKSksXG4gICAga2V5OiBhd2FpdCBsb2FkRmlsZShwYXRoLnJlc29sdmUobG9jYWwsIFwiLi9jZXJ0aWZpY2F0ZS5rZXlcIikpLFxuICAgIGNlcnQ6IGF3YWl0IGxvYWRGaWxlKHBhdGgucmVzb2x2ZShsb2NhbCwgXCIuL2NlcnRpZmljYXRlLmNydFwiKSlcbn07XG4iLCAie1xuICAgIFwiaW5jbHVkZVwiOiBbXCIqKi8qLnRzXCIsIFwiKiovKi5tanNcIiwgXCIqKi8qLmpzXCIsIFwiKiovKi5kLnRzXCIsIFwiKiovKi50c3hcIl0sXG4gICAgXCJleGNsdWRlXCI6IFtcIi4vbm9kZV9tb2R1bGVzXCIsIFwiLi4vbm9kZV9tb2R1bGVzXCJdLFxuICAgIFwiY29tcGlsZXJPcHRpb25zXCI6IHtcbiAgICAgICAgXCJ0eXBlc1wiOiBbXCIuL2dsb2JhbC5kLnRzXCJdLFxuICAgICAgICBcInBhdGhzXCI6IHtcbiAgICAgICAgICAgIFwiQC8qXCI6IFtcIipcIl0sXG4gICAgICAgICAgICBcIkBpZGMvKlwiOiBbXCJzcmMvKlwiXSxcbiAgICAgICAgICAgIFwiQHNyYy8qXCI6IFtcInNyYy8qXCJdLFxuICAgICAgICAgICAgXCJAdW5pdGUvKlwiOiBbXCJ1bml0ZS8qXCJdLFxuICAgICAgICAgICAgXCJAYXNzZXRzLypcIjogW1wiYXNzZXRzLypcIl0sXG4gICAgICAgICAgICBcIkB1eC10cy8qXCI6IFtcInVuaXRlL3NjcmlwdHMvKlwiXSxcbiAgICAgICAgICAgIFwiQHV4LXNzLypcIjogW1widW5pdGUvc2Nzcy8qXCJdXG4gICAgICAgIH0sXG4gICAgICAgIFwiYmFzZVVybFwiOiBcIi4vXCIsXG4gICAgICAgIFwiY29tcG9zaXRlXCI6IHRydWUsXG4gICAgICAgIFwibGliXCI6IFtcImRvbVwiLCBcImVzbmV4dFwiLCBcIndlYndvcmtlclwiXSxcbiAgICAgICAgXCJtb2R1bGVcIjogXCJFU05leHRcIixcbiAgICAgICAgXCJ0YXJnZXRcIjogXCJFU05leHRcIixcbiAgICAgICAgXCJyZXNvbHZlSnNvbk1vZHVsZVwiOiB0cnVlLFxuICAgICAgICBcImFsbG93U3ludGhldGljRGVmYXVsdEltcG9ydHNcIjogdHJ1ZSxcbiAgICAgICAgXCJtb2R1bGVSZXNvbHV0aW9uXCI6IFwiQnVuZGxlclwiLFxuICAgICAgICBcInZlcmJhdGltTW9kdWxlU3ludGF4XCI6IHRydWUsXG4gICAgICAgIFwiYWxsb3dBcmJpdHJhcnlFeHRlbnNpb25zXCI6IHRydWUsXG4gICAgICAgIFwiYWxsb3dJbXBvcnRpbmdUc0V4dGVuc2lvbnNcIjogdHJ1ZSxcbiAgICAgICAgXCJlc01vZHVsZUludGVyb3BcIjogdHJ1ZSxcbiAgICAgICAgXCJhbGxvd0pzXCI6IHRydWUsXG4gICAgICAgIFwibm9FbWl0XCI6IHRydWUsXG4gICAgICAgIFwic291cmNlTWFwXCI6IHRydWUsXG4gICAgICAgIFwicmVtb3ZlQ29tbWVudHNcIjogZmFsc2UsXG4gICAgICAgIFwibm9JbXBsaWNpdEFueVwiOiBmYWxzZSxcbiAgICAgICAgXCJub0ltcGxpY2l0T3ZlcnJpZGVcIjogZmFsc2UsXG4gICAgICAgIFwibm9JbXBsaWNpdFJldHVybnNcIjogZmFsc2UsXG4gICAgICAgIFwibm9JbXBsaWNpdFRoaXNcIjogZmFsc2UsXG4gICAgICAgIFwibm9JbXBsaWNpdFVzZVN0cmljdFwiOiBmYWxzZSxcbiAgICAgICAgXCJzdHJpY3ROdWxsQ2hlY2tzXCI6IHRydWUsXG4gICAgICAgIFwic3RyaWN0RnVuY3Rpb25UeXBlc1wiOiB0cnVlLFxuICAgICAgICBcInN0cmljdFByb3BlcnR5SW5pdGlhbGl6YXRpb25cIjogZmFsc2UsXG4gICAgICAgIFwic3RyaWN0QmluZENhbGxBcHBseVwiOiB0cnVlLFxuICAgICAgICBcImFsd2F5c1N0cmljdFwiOiB0cnVlLFxuICAgICAgICBcIm5vVW51c2VkTG9jYWxzXCI6IHRydWUsXG4gICAgICAgIFwibm9VbnVzZWRQYXJhbWV0ZXJzXCI6IHRydWUsXG4gICAgICAgIFwibm9GYWxsdGhyb3VnaENhc2VzSW5Td2l0Y2hcIjogdHJ1ZSxcbiAgICAgICAgXCJhbGxvd1VudXNlZExhYmVsc1wiOiB0cnVlLFxuICAgICAgICBcImFsbG93VW5yZWFjaGFibGVDb2RlXCI6IHRydWUsXG4gICAgICAgIFwiZm9yY2VDb25zaXN0ZW50Q2FzaW5nSW5GaWxlTmFtZXNcIjogdHJ1ZSxcbiAgICAgICAgXCJzdHJpY3RcIjogdHJ1ZVxuICAgIH1cbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7QUFLQSxPQUFPLGtCQUFrQjtBQUN6QixPQUFPQSxXQUFVO0FBQ2pCLFNBQVEsb0JBQW1CO0FBQzNCLE9BQU8sMkJBQTJCO0FBQ2xDLE9BQU8sb0JBQW9CO0FBQzNCLFNBQVEsbUJBQWtCO0FBQzFCLFNBQVEscUJBQW9CO0FBQzVCLFNBQVEsZUFBYztBQUN0QixTQUFRLHNCQUFxQjs7O0FDYm9RLE9BQU8sUUFBUTtBQUNoVCxPQUFPLFVBQVU7QUFEakIsSUFBTSxtQ0FBbUM7QUFJekMsSUFBTSxpQkFBaUIsT0FBTyxTQUFTLE1BQU0sYUFBYTtBQUN0RCxhQUFXLE9BQU8s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UTtBQUFBLElBQ1IsY0FBYztBQUFBLElBQ2Qsa0JBQWtCO0FBQUEsSUFDbEIsbUJBQW1CO0FBQUEsRUFDdkI7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNILHVCQUF1QjtBQUFBLElBQ3ZCLFFBQVE7QUFBQSxJQUNSLFdBQVc7QUFBQSxJQUNYLGVBQWU7QUFBQSxJQUNmLFFBQVEsQ0FBQyxRQUFRO0FBQUEsSUFDakIsV0FBVztBQUFBLElBQ1gsUUFBUTtBQUFBLElBQ1IsYUFBYTtBQUFBLElBQ2IsY0FBYztBQUFBLElBQ2QsZUFBZTtBQUFBLE1BQ1gsT0FBTztBQUFBLE1BQ1AsUUFBUTtBQUFBLFFBQ0osc0JBQXNCO0FBQUEsUUFDdEIsY0FBYztBQUFBLE1BQ2xCO0FBQUEsSUFDSjtBQUFBLEVBQ0o7QUFBQSxFQUNBLEtBQUs7QUFBQSxJQUNELFNBQVM7QUFBQSxNQUNMLFNBQVMsQ0FBQyxhQUFhLEdBQUcsWUFBWSxHQUFHLFFBQVE7QUFBQSxRQUM3QyxRQUFRLENBQUMsV0FBVztBQUFBLFVBQ2hCLE1BQU07QUFBQSxVQUNOLGlCQUFpQjtBQUFBLFlBQ2IsV0FBVztBQUFBLFVBQ2Y7QUFBQSxRQUNKLENBQUM7QUFBQSxNQUNMLENBQUMsR0FBRyxpQkFBaUIsRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO0FBQUEsSUFDdEM7QUFBQSxFQUNKO0FBQUEsRUFDQSxjQUFjO0FBQUEsSUFDVixnQkFBZ0IsRUFBQyxRQUFRLFVBQVUsV0FBVyxFQUFDLFFBQVEsS0FBSSxFQUFDO0FBQUEsRUFDaEU7QUFDSixDQUFDO0FBR0QsSUFBTyxzQkFBUTtBQUlmLElBQU0sVUFBVSxpQkFBUyxnQkFBZ0I7QUFFekMsV0FBVyxTQUFTLFNBQVM7QUFDekIsUUFBTSxRQUFRLFFBQVEsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNQyxNQUFLLFFBQVEsV0FBVyxDQUFDLENBQUM7QUFLbEUsUUFBTSxZQUFZLE1BQU0sUUFBUSxjQUFjLEVBQUU7QUFDaEQsUUFBTSxZQUFZLE1BQU0sSUFBSSxDQUFDLE1BQU0sRUFBRSxRQUFRLGNBQWMsRUFBRSxDQUFDO0FBRTlELE1BQUksQ0FBQyxPQUFPLFFBQVMsUUFBTyxVQUFVLENBQUM7QUFDdkMsTUFBSSxDQUFDLE9BQU8sUUFBUSxNQUFPLFFBQU8sUUFBUSxRQUFRLENBQUM7QUFFbkQsTUFBSSxPQUFPLFdBQVcsT0FBTyxRQUFRLFNBQVMsRUFBRSxhQUFhLE9BQU8sUUFBUSxRQUFRO0FBQ2hGLFdBQU8sUUFBUSxNQUFNLFNBQVMsSUFBSSxVQUFVLFNBQVMsSUFBSSxZQUFZLFVBQVUsQ0FBQztBQUFBLEVBQ3BGO0FBQ0o7IiwKICAibmFtZXMiOiBbInBhdGgiLCAiX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUiLCAiX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUiLCAicGF0aCIsICJwYXRoIl0KfQo=


//
const sourceMapsInProduction = true;

//
import autoprefixer from "autoprefixer";
import path from "node:path";
import {defineConfig} from "vite";
import VitePluginBrowserSync from 'vite-plugin-browser-sync';
import prefetchPlugin from 'vite-plugin-bundle-prefetch';
import {compression} from "vite-plugin-compression2";
import {nodePolyfills} from "vite-plugin-node-polyfills";
import {VitePWA} from "vite-plugin-pwa";
import {viteStaticCopy} from "vite-plugin-static-copy";
import certificate from "./webapp/https/certificate.mjs";
import pkg from "./package.json" with { type: "json" };
import tsconfig from "./tsconfig.json" with { type: "json" };
import vue from '@vitejs/plugin-vue'
import { viteSingleFile } from "vite-plugin-singlefile"
import json5Plugin from 'vite-plugin-json5'
import VueI18n from '@intlify/unplugin-vue-i18n/vite'

import cssnano from "cssnano";
import deduplicate from "postcss-discard-duplicates";

import postcssPresetEnv from 'postcss-preset-env';

//
const __dirname = import.meta.dirname;

//
const r = (s) => {
    return s;
};

/*process.env = {
    ...process.env,
    ...loadEnv(mode, process.cwd())
};*/

//
const production = process.env.NODE_ENV === 'production';
const config = defineConfig({
    root: "./",
    base: './',
    resolve: {
        alias: {
            "vue-i18n": 'vue-i18n/dist/vue-i18n.runtime.esm-bundler.js',
            "vue": 'vue/dist/vue.esm-bundler.js',
            "@node_modules": path.resolve("./node_modules"),
            "@culori": path.resolve("./node_modules/culori"),
            "@material": path.resolve("./node_modules/@material"),
            "happy-opfs": path.resolve("./node_modules/happy-opfs"),

            "@": path.resolve("./"),
            "@src": path.resolve("src/"),
            "@idc": path.resolve("src/"),
            "@unite": path.resolve("unite/"),
            "@ux-ts": path.resolve("unite/scripts/"),
            "@ux-ss": path.resolve("unite/scss/"),
            "@assets": path.resolve("assets/")
        },
    },
    plugins: [
        json5Plugin(),
        vue({
            template: {
                compilerOptions: {
                    isCustomElement: (tag) => [
                        'css-doodle',
                        'x-scrollbox',
                        'x-focustext',
                        'x-longtext'
                    ].includes(tag),
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
            algorithm: 'brotliCompress'
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
                },
            },
            workbox: {
                clientsClaim: true,
                skipWaiting: true,
            },
        }),
        viteStaticCopy({
            targets: [
                {
                    src: "./assets/*",
                    dest: "./assets", // 2️⃣
                },
                {
                    src: "./copying/!(node_modules)",
                    dest: "./", // 2️⃣
                },
                {
                    src: "./webapp/https/*",
                    dest: "./webapp/https/", // 2️⃣
                },
            ],
        })
    ],
    server: {
        origin: "",
        host: "0.0.0.0",
        port: 443,
        https: {
            ...certificate,
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
        chunkSizeWarningLimit: 100000000,
        minify: 'esbuild',
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
            },
        },
    },
    css: {
        postcss: {
            plugins: [autoprefixer(), deduplicate(), cssnano({
                preset: ['default', {
                    calc: false,
                    discardComments: {
                        removeAll: true
                    }
                }],
            }), postcssPresetEnv({ stage: 0 })],
        },
    },
    optimizeDeps: {
        esbuildOptions: {target: "esnext", supported: {bigint: true}},
    },
});

//
export default config;
export {config};

// Load path aliases from the tsconfig.json file
const aliases = tsconfig.compilerOptions.paths;

for (const alias in aliases) {
    const paths = aliases[alias].map((p) => path.resolve(__dirname, p));

    // Our tsconfig uses glob path formats, whereas vite just wants directories
    // We'll need to transform the glob format into a format acceptable to vite

    const viteAlias = alias.replace(/(\\|\/)\*$/, '');
    const vitePaths = paths.map((p) => p.replace(/(\\|\/)\*$/, ''));

    if (!config.resolve) config.resolve = {};
    if (!config.resolve.alias) config.resolve.alias = {};

    if (config.resolve && config.resolve.alias && !(viteAlias in config.resolve.alias)) {
        config.resolve.alias[viteAlias] = vitePaths.length > 1 ? vitePaths : vitePaths[0];
    }
}


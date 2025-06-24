import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

const isProd = process.env.NODE_ENV === "production";

export default defineConfig({
    base: "/SEA-catering",
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
    build: {
        outDir: "dist",
        assetsDir: "assets",
        emptyOutDir: true,
        minify: isProd ? "esbuild" : false,
        target: "esnext",
    },
    server: {
        open: true,
        port: 3000,
    },
    plugins: [vue()],
});

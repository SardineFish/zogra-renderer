import process from "process";
import esbuild from "esbuild";

const dev = process.argv.includes("--dev");
const watch = process.argv.find(arg => arg === "-w" || arg === "--watch") !== undefined;

esbuild.build({
    entryPoints: [
        "./assets/index.ts",
    ],
    bundle: true,
    loader: {
        ".png": "binary",
        ".jpg": "binary",
        ".glsl": "text",
    },
    minify: !dev,
    watch: watch,
    sourcemap: true,
    outdir: "./src/assets",
    platform: "node",
    format: "esm",
})
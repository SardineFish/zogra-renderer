const process = require("process");

const dev = process.argv.includes("--dev");
const watch = process.argv.find(arg => arg === "-w" || arg === "--watch") !== undefined;

require("esbuild").build({
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
    outdir: "./src/builtin-assets/generated",
    platform: "node",
    format: "cjs",
})
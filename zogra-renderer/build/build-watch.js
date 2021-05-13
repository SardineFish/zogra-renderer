import { exec } from "child_process";
exec("node ./build/build-assets.js -w --dev").stdout.pipe(process.stdout);
exec("npx tsc -b ./assets/tsconfig.json -w").stdout.pipe(process.stdout);
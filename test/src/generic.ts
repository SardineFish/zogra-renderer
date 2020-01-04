import frag from "!!raw-loader!./shader/default-frag.glsl";
import vert from "!!raw-loader!./shader/default-vert.glsl";

const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");
ctx?.fillRect(0, 0, 100, 100);

console.log(frag);
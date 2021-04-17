import { Camera, Default2DRenderPipeline, InputManager, Projection, Tilemap, vec2, vec3, ZograEngine } from "zogra-engine";
import "../css/base.css";
import * as ZograRendererPackage from "zogra-renderer";
import * as ZograEnginePackage from "zogra-engine";
import noisejs = require("noisejs");
import { Snake } from "./snake";
import { loadMapAssets, NoiseChunk } from "./map";

(window as any).Noise = noisejs.Noise;
(window as any).ZograEngine = ZograEnginePackage;
(window as any).ZograRenderer = ZograRendererPackage;


const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
const engine = new ZograEngine(canvas, Default2DRenderPipeline);
const input = new InputManager();

engine.on("update", (time) =>
{
    input.update();
});
engine.start();

const scene = engine.scene;
(window as any).scene = scene;

async function init()
{
    await loadMapAssets();

    const tilemap = new Tilemap(NoiseChunk);
    scene.add(tilemap);

    const camera = new Camera();
    camera.position = vec3(0, 0, 20);
    camera.projection = Projection.Orthographic;
    camera.viewHeight = 10;
    scene.add(camera);
    (window as any).camera = camera;

    let snake: Snake;
    while (true)
    {
        let pos = vec2.math(Math.floor)(vec2.math(Math.random)().mul(1000)).plus(0.5);
        let bodies: vec2[] = [];
        for (let i = 0; i < 4; i++)
        {
            if (tilemap.getTile(pos.plus(vec2.right())) === NoiseChunk.tileGround)
                bodies.push(pos.clone());
            else
                break;
        }
        if (bodies.length == 4)
        {
            snake = new Snake(bodies, vec2.right(), camera, input);
            camera.position = camera.position.set(pos.toVec3(camera.position.z));
            break;
        }
    }
    scene.add(snake);
}
init();
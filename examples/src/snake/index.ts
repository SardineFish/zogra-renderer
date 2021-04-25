import { Camera, Color, Default2DRenderPipeline, InputManager, Physics2D, Projection, TextureFormat, Tilemap, vec2, vec3, ZograEngine } from "zogra-engine";
import "../css/base.css";
import * as ZograRendererPackage from "zogra-renderer";
import * as ZograEnginePackage from "zogra-engine";
import noisejs = require("noisejs");
import { Snake } from "./snake";
import { GameMap } from "./map";
import { loadSnakeAssets } from "./food";

(window as any).Noise = noisejs.Noise;
(window as any).ZograEngine = ZograEnginePackage;
(window as any).ZograRenderer = ZograRendererPackage;


const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
const engine = new ZograEngine(canvas, Default2DRenderPipeline);
engine.fixedDeltaTime = true;
engine.renderPipeline.ambientLightColor = new Color(0.3, .3, .3, 1);
engine.renderPipeline.msaa = 4;
engine.renderPipeline.renderFormat = TextureFormat.RGBA16F;
const input = new InputManager();

engine.on("update", (time) =>
{
    input.update();
});
engine.start();

const scene = engine.scene;
(window as any).scene = scene;
scene.physics = new Physics2D();

async function init()
{
    await GameMap.loadMapAssets();
    await loadSnakeAssets();

    const tilemap = new GameMap();
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
            if (tilemap.getTile(pos.plus(vec2.right())) === GameMap.tileGround)
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
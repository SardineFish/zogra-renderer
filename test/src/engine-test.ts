import "./css/base.css";
import { ZograEngine, Camera, vec3, RenderObject, quat } from "../..";

const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
const engine = new ZograEngine(canvas);

const camera = new Camera();
engine.scene.add(camera);
camera.position = vec3(0, 0, 10);

const cube = new RenderObject();
engine.scene.add(cube);
cube.meshes.push(engine.renderer.assets.meshes.cube);

engine.start();
engine.on("update", (time) =>
{
    cube.rotation = quat.normalize(quat.mul(cube.rotation, quat.axis(vec3(1, 1, 1), time.deltaTime * 0.5)));
});
import { Camera, Color, Default2DRenderPipeline, InputManager, Keys, Light2D, MeshBuilder, Projection, RenderObject, vec2, vec3, ZograEngine } from "zogra-engine";
import "./css/base.css";

const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
const engine = new ZograEngine(canvas, Default2DRenderPipeline);
engine.start();
const scene = engine.scene;

const input = new InputManager();

const camera = new Camera();
camera.position = vec3(0, 0, 20);
camera.projection = Projection.Orthographic;
camera.viewHeight = 10;
scene.add(camera);

const light = new Light2D();
scene.add(light);
light.position = vec3(0, 3, 0);

// const obj = new RenderObject();
// obj.meshes[0] = MeshBuilder.quad();
// scene.add(obj, light);


engine.on("update", (time) =>
{
    // light.updateShadowMesh();

    input.update();

    const speed = 15;
    const movement = vec2.zero();
    input.getKey(Keys.A) && movement.plus(vec2.left());
    input.getKey(Keys.D) && movement.plus(vec2.right());
    input.getKey(Keys.W) && movement.plus(vec2.up());
    input.getKey(Keys.S) && movement.plus(vec2.down());

    light.translate(movement.mul(speed * time.deltaTime).toVec3());
});
import "./css/base.css";
import { ZograEngine, Camera, vec3, RenderObject, quat, rgb, Entity, plus, InputManager, Keys, mat4, mul } from "../..";

const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
const engine = new ZograEngine(canvas);
const input = new InputManager();

initCamera();
initObjects();

engine.start();


function initCamera()
{
    const wrapper = new Entity();
    engine.scene.add(wrapper);
    wrapper.position = vec3(0, 0, 10);
    const camera = new Camera();
    engine.scene.add(camera, wrapper);
    camera.clearColor = rgb(.3, .3, .3);

    engine.on("update", (time) =>
    {
        let v = vec3.zero();
        let forward = mat4.mulVector(camera.localToWorldMatrix, vec3(0, 0, -1)).normalize();
        let right = mat4.mulVector(camera.localToWorldMatrix, vec3(1, 0, 0)).normalize();

        if (input.getKey(Keys.Shift))
            v.plus(vec3(0, 1 * time.deltaTime, 0));
        if (input.getKey(Keys.Control))
            v.plus(vec3(0, -1 * time.deltaTime, 0));
        if (input.getKey(Keys.W))
            v.plus(mul(forward, time.deltaTime));
        if (input.getKey(Keys.S))
            v.plus(mul(forward, -time.deltaTime));
        if (input.getKey(Keys.D))
            v.plus(mul(right, time.deltaTime));
        if (input.getKey(Keys.A))
            v.plus(mul(right, -time.deltaTime));
            
        wrapper.position = plus(wrapper.position, v);
        console.log(input.pointerPosition);
    });
}

function initObjects()
{
    const cube = new RenderObject();
    engine.scene.add(cube);
    cube.meshes.push(engine.renderer.assets.meshes.cube);

    engine.on("update", (time) =>
    {
        cube.rotation = quat.normalize(quat.mul(cube.rotation, quat.axis(vec3(1, 1, 1), time.deltaTime * 0.5)));
    });

}
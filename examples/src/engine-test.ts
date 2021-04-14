import "./css/base.css";
import { ZograEngine, Camera, vec3, RenderObject, quat, rgb, Entity, plus, InputManager, Keys, mat4, mul, PreviewRenderer, Projection, MaterialFromShader, Shader, Culling, DepthTest, MeshBuilder, Color, RenderTarget, Light, LightType, shaderProp, Texture } from "zogra-engine";
import frag from "./shader/default-frag.glsl";
import vert from "./shader/default-vert.glsl";

class LambertMaterial extends MaterialFromShader(new Shader(vert, frag, {
}))
{
    @shaderProp("uColor", "color")
    color: Color = Color.white;

    @shaderProp("uMainTex", "tex2d")
    texture: Texture | null = null;
}

const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
const engine = new ZograEngine(canvas, PreviewRenderer);
const input = new InputManager();

initCamera();
initObjects();

engine.start();
engine.on('update', () => input.update());



function initCamera()
{
    const wrapper = new Entity();
    engine.scene.add(wrapper);
    wrapper.position = vec3(0, 2, 20);

    const camera = new Camera();
    camera.clearColor = rgb(.3, .3, .3);
    camera.FOV = 60;
    engine.scene.add(camera, wrapper);

    engine.on("update", (time) =>
    {
        // engine.renderer.clear(Color.white, true);
        // engine.renderer.drawMesh(mesh, mat4.identity(), new Mat());
        const sensity = 0.0001 * 10;

        let v = vec3.zero();
        let forward = mat4.mulVector(camera.localToWorldMatrix, vec3(0, 0, -1));
        forward.y = 0;
        forward = forward.normalize();
        let right = mat4.mulVector(camera.localToWorldMatrix, vec3(1, 0, 0)).normalize();
        let up = vec3(0, 1, 0);
        

        if (input.getKey(Keys.Shift) || input.getKey(Keys.Space))
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
        if (input.getKeyDown(Keys.Mouse2))
            input.lockPointer();
        if (input.getKeyUp(Keys.Mouse2))
            input.releasePointer();
        
        let look = input.pointerDelta;
        let rotate = quat.normalize(quat.mul(quat.axis(right, -sensity * look.y), quat.axis(up, -sensity * look.x)));

        /*if (input.getKey(Keys.Space))
            rotate = quat.axis(right, -sensity * look.y);
        else
            rotate = quat.normalize(quat.axis(up, -sensity * look.x));*/
        wrapper.rotation = quat.mul(wrapper.rotation, quat.axis(up, -sensity * look.x));
        camera.localRotation = quat.mul(camera.localRotation, quat.axis(vec3(1, 0, 0), -sensity * look.y));
        wrapper.position = plus(wrapper.position, mul(v, 5));
        //input.pointerDelta.magnitude > 0 &&  console.log(input.pointerDelta);
    });
}

function initObjects()
{
    const cube = new RenderObject();
    engine.scene.add(cube);
    // cube.meshes.push(engine.renderer.assets.meshes.cube);
    cube.meshes[0] = engine.renderer.assets.meshes.cube;
    cube.materials[0] = new LambertMaterial();

    engine.on("update", (time) =>
    {
        cube.rotation = quat.normalize(quat.mul(cube.rotation, quat.axis(vec3(1, 1, 1), time.deltaTime * 0.5)));
    });

}
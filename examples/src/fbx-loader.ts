import fbx from "./asset/model/sphere.bin.fbx";
import { materialDefine, shaderProp, MaterialFromShader, Shader, Color, Texture, Culling } from "zogra-engine";
import { ZograEngine, Camera, vec3, RenderObject, quat, rgb, Entity, plus, InputManager, Keys, mat4, mul } from "zogra-engine";
import "./css/base.css";
import vert from "./shader/default-vert.glsl";
import frag from "./shader/pbr-frag.glsl";
import FBXImporter from "fbx-importer";


const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
const engine = new ZograEngine(canvas);
const input = new InputManager();

initCamera();
initObjects();
initMaterials();

engine.start();
engine.on('update', () => input.update());

function initCamera()
{
    const wrapper = new Entity();
    engine.scene.add(wrapper);
    wrapper.position = vec3(0, 2, 20);
    const camera = new Camera();
    engine.scene.add(camera, wrapper);
    camera.clearColor = rgb(.3, .3, .3);
    camera.FOV = 60;

    engine.on("update", (time) =>
    {
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
        let rotate = quat.normalize(quat.mul(quat.axisAngle(right, -sensity * look.y), quat.axisAngle(up, -sensity * look.x)));

        /*if (input.getKey(Keys.Space))
            rotate = quat.axis(right, -sensity * look.y);
        else
            rotate = quat.normalize(quat.axis(up, -sensity * look.x));*/
        wrapper.rotation = quat.mul(wrapper.rotation, quat.axisAngle(up, -sensity * look.x));
        camera.localRotation = quat.mul(camera.localRotation, quat.axisAngle(vec3(1, 0, 0), -sensity * look.y));
        wrapper.position = plus(wrapper.position, mul(v, 5));
        //input.pointerDelta.magnitude > 0 &&  console.log(input.pointerDelta);
    });
}

async function initObjects()
{

    const cube = new RenderObject();
    engine.scene.add(cube);
    cube.meshes.push(engine.renderer.assets.meshes.cube);

    engine.on("update", (time) =>
    {
        cube.rotation = quat.normalize(quat.mul(cube.rotation, quat.axisAngle(vec3(1, 1, 1), time.deltaTime * 0.5)));
    });


    // const blob = await (await fetch(fbx)).blob();
    const assets = await FBXImporter.url(fbx).then(r => r.fbx());
    
    // const assets = await plugins.AssetsImporter.url(fbx).then(r => r.fbx({}));// await plugins.AssetsImporter.blob(blob).fbx();
    (window as any).assets = assets;

    const obj = assets.mainAsset as Entity;
    engine.scene.add(obj);
    obj.localScaling = vec3(.1, .1, .1);

    // for (const obj of assets.getAll(RenderObject))
    // {
    //     engine.scene.add(obj);
    // }
}

function initMaterials()
{
    @materialDefine
    class PBRLit extends MaterialFromShader(new Shader(vert, frag, {
        cull: Culling.Disable
    }))
    {
        @shaderProp("uColor", "color")
        color: Color = Color.white;
        @shaderProp("uMainTex", "tex2d")
        mainTexture: Texture = engine.renderer.assets.textures.default;
        @shaderProp("uNormalTex", "tex2d")
        normalTexture: Texture = engine.renderer.assets.textures.defaultNormal;
        @shaderProp("uEmission", "color")
        emission: Color = Color.black;
        @shaderProp("uSpecular", "color")
        specular: Color = Color.white;
        @shaderProp("uMetallic", "float")
        metiallic: number = 0.023;
        @shaderProp("uSmoothness", "float")
        smoothness: number = 0.5;
        @shaderProp("uFresnel", "float")
        fresnel: number = 5;
    }

    const mat = new PBRLit();

    engine.renderPipeline.replaceMaterial(engine.renderer.assets.types.DefaultMaterial, mat);
}
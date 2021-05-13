import { Blending, Bloom, Camera, Chunk, BuiltinShaders, Color, Default2DMaterial, Default2DRenderPipeline, DepthTest, dot, Entity, InputManager, Keys, LineRenderer, MaterialFromShader, MathUtils, minus, mul, ParticleSystem, plus, Projection, RenderObject, Shader, SimpleTexturedMaterial, Sprite, Texture2D, TextureFormat, TextureImporter, TileData, Tilemap, Time, vec2, vec3, ZograEngine, Culling } from "zogra-engine";
import "./css/base.css";
import vert from "./shader/default-vert.glsl";
import frag from "./shader/circle.glsl";

class CircleMaterial extends MaterialFromShader(new Shader(BuiltinShaders.particle2D[0], frag, {
    vertexStructure: ParticleSystem.VertexStructure,
    attributes: ParticleSystem.AttributeNames,
    blend: [Blending.SrcAlpha, Blending.OneMinusSrcAlpha],
    depth: DepthTest.Disable,
})) { }

const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
const engine = new ZograEngine(canvas, Default2DRenderPipeline);
engine.fixedDeltaTime = true;
engine.renderPipeline.ambientLightColor = Color.white;
engine.renderPipeline.renderFormat = TextureFormat.RGBA16F;
const input = new InputManager({
});
engine.start();

const scene = engine.scene;
(window as any).scene = scene;

const camera = new Camera();
camera.position = vec3(0, 0, 20);
camera.projection = Projection.Orthographic;
camera.viewHeight = 10;
scene.add(camera);
(window as any).camera = camera;

const particleSystem = new ParticleSystem();
particleSystem.material = new CircleMaterial();
particleSystem.maxCount = 512;
particleSystem.duration = 5;
particleSystem.spawnRate = 0;
particleSystem.startSpeed = [3, 16];
particleSystem.startRotation = { x: 0, y: 0, z: () => Math.random() * 360 };
particleSystem.startColor = () => (Color.fromHSL(Math.random() * 360, 0.8, 0.7).mul(MathUtils.lerp(0.2, 2.0, Math.random())) as Color);
particleSystem.material.pipelineStateOverride.blendRGB = [Blending.SrcAlpha, Blending.OneMinusSrcAlpha];
particleSystem.material.pipelineStateOverride.depth = DepthTest.Disable;
scene.add(particleSystem);
particleSystem.play();

(window as any).particleSystem = particleSystem;


const bloom = new Bloom();
camera.postprocess.push(bloom);

engine.on("update", () =>
{
    input.update();

    if (input.getKeyDown(Keys.Mouse0))
    {
        const pos = camera.screenToWorld(input.pointerPosition);
        pos.z = 0;
        particleSystem.emit(100, pos);
    }
})
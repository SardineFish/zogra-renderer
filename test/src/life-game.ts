import { ZograRenderer, Mesh, vec3, vec2, vec4, mat4, MaterialFromShader, Shader } from "zogra-renderer";
import vert from "!!raw-loader!./shader/default-vert.glsl";
import frag from "!!raw-loader!./shader/life-game.glsl";
import blitFrag from "!!raw-loader!./shader/blit.glsl";
import "./css/base.css";
import seedTest from "./asset/img/p960_2c5gun.png";
import { RenderTexture, FilterMode, WrapMode, Texture2D } from "../../dist/core/texture";
import { TextureFormat } from "../../dist/core/texture-format";
import { RenderTarget } from "../../dist/core/render-target";
import { loadImage } from "./misc/util";

const Width = 1510;
const Height = 1441;
const BlockSize = 1;
const FPS = 100;

const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
const renderer = new ZograRenderer(canvas, Width, Height);

class LifeGameMaterial extends MaterialFromShader(new Shader(vert, frag))
{

}
class BlitMaterial extends MaterialFromShader(new Shader(vert, blitFrag)) { }
const material = new LifeGameMaterial();
const blitMat = new BlitMaterial();

renderer.clear();

const rts = [
    new RenderTexture(Width, Height, false, TextureFormat.RGBA, FilterMode.Nearest),
    new RenderTexture(Width, Height, false, TextureFormat.RGBA, FilterMode.Nearest),
] as [RenderTexture, RenderTexture];
rts[0].wrapMode = WrapMode.Clamp;
rts[1].wrapMode = WrapMode.Clamp;
rts[0].update();
rts[1].update();
const backBuffer = new RenderTexture(Width, Height, false);
const mesh = new Mesh();
mesh.verts = [
    vec3(-1, -1, 0),
    vec3(1, -1, 0),
    vec3(1, 1, 0),
    vec3(-1, 1, 0),
];
mesh.triangles = [
    0, 1, 3,
    1, 2, 3,
];
mesh.uvs = [
    vec2(0, 0),
    vec2(1, 0),
    vec2(1, 1),
    vec2(0, 1)
];
mesh.calculateNormals();


(async () =>
{
    let previousTime = 0;
    let startDelay = 0;

    const update = await lifeGame();

    const updateFrame = (delay: number) =>
    {
        if (previousTime === 0)
        {
            previousTime = delay;
            startDelay = delay;
        }
        
        const dt = (delay - previousTime) / 1000;
        previousTime = delay;

        update(dt, (delay - startDelay) / 1000);

        requestAnimationFrame(updateFrame);
    };
    requestAnimationFrame(updateFrame);
})();

async function lifeGame()
{
    let nextUpdate = 1 / FPS;
    let frameIdx = 0;

    const initial = new ImageData(Width, Height);
    const M = Width * Height;
    const N = 0.8 * M;
    for (let i = 0; i < N; i++)
    {
        const idx = Math.floor(Math.random() * M) * 4;
        initial.data[idx] = 255;
    }

    const seed = await loadImage(seedTest);
    //rts[0].setData(seed);
    const seedTex = new Texture2D();
    seedTex.setData(seed);
    renderer.blit(seedTex, rts[0]);
    

    return (dt: number, time: number) =>
    {
        if (time < nextUpdate)
            return;
        
        nextUpdate += 1 / FPS;
        const src = rts[frameIdx % 2];
        const dst = rts[(frameIdx + 1) % 2];
        frameIdx++;

        renderer.setGlobalTexture("uLastFrame", src);
        renderer.setGlobalUniform("uSize", "vec4", vec4(Width, Height, 1 / Width, 1 / Height));
        renderer.setGlobalUniform("uBlockSize", "float", BlockSize);
        renderer.setGlobalUniform("uRenderSize", "vec4", vec4(Width, Height, 1 / Width, 1 / Height));
        
        const target = new RenderTarget(Width, Height);
        target.addColorAttachment(dst);
        target.addColorAttachment(backBuffer);
        renderer.setRenderTarget(target);
        renderer.drawMesh(mesh, mat4.identity(), material);

        // renderer.setRenderTarget(RenderTarget.CanvasTarget);
        // renderer.setGlobalTexture("uMainTex", backBuffer);
        // renderer.drawMesh(mesh, mat4.identity(), blitMat);
        renderer.blit(backBuffer, RenderTarget.CanvasTarget);
    };
}
// TODO: R/W Render Texture
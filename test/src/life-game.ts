import { ZograRenderer, Mesh, vec3, vec2, vec4, mat4, MaterialFromShader, Shader } from "zogra-renderer";
import vert from "!!raw-loader!./shader/default-vert.glsl";
import frag from "!!raw-loader!./shader/life-game.glsl";
import blitFrag from "!!raw-loader!./shader/blit.glsl";
import "./css/base.css";
import { RenderTexture, FilterMode } from "../../dist/core/texture";
import { TextureFormat } from "../../dist/core/texture-format";
import { RenderTarget } from "../../dist/core/render-target";

const Width = 1280;
const Height = 720;
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


(() =>
{
    let previousTime = 0;
    let startDelay = 0;

    const update = lifeGame();

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

function lifeGame()
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
    rts[0].setData(initial);
    rts[1].setData(initial);

    return (dt: number, time: number) =>
    {
        if (time < nextUpdate)
            return;
        
        nextUpdate += 1 / FPS;
        frameIdx++;
        const src = rts[frameIdx % 2];
        const dst = rts[(frameIdx + 1) % 2];

        renderer.setGlobalTexture("uLastFrame", src);
        renderer.setGlobalUniform("uSize", "vec4", vec4(Width, Height, 1 / Width, 1 / Height));
        renderer.setGlobalUniform("uBlockSize", "float", BlockSize);
        renderer.setGlobalUniform("uRenderSize", "vec4", vec4(Width, Height, 1 / Width, 1 / Height));
        
        const target = new RenderTarget(Width, Height);
        target.addColorAttachment(dst);
        target.addColorAttachment(backBuffer);
        renderer.setRenderTarget(target);
        renderer.drawMesh(mesh, mat4.identity(), material);

        renderer.setRenderTarget(RenderTarget.CanvasTarget);
        renderer.setGlobalTexture("uMainTex", backBuffer);
        renderer.drawMesh(mesh, mat4.identity(), blitMat);
    };
}
// TODO: R/W Render Texture
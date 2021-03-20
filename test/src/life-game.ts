import { ZograRenderer, Mesh, vec3, vec2, vec4, mat4, minus, plus, MaterialFromShader, Shader, Material, Color, rgba, Blending, DepthTest } from "zogra-renderer";
import vert from "!!raw-loader!./shader/default-vert.glsl";
import frag from "!!raw-loader!./shader/life-game.glsl";
import blitFrag from "!!raw-loader!./shader/life-game-render.glsl";
import "./css/base.css";
import seedTest from "./asset/img/dual-gun.png";
import { RenderTexture, FilterMode, WrapMode, Texture2D } from "zogra-engine";
import { TextureFormat } from "zogra-engine";
import { RenderTarget } from "zogra-engine";
import { loadImage } from "./misc/util";

const Width = 2446;
const Height = 1840;
const BlockSize = 2;
const FPS = parseInt((/fps=(\d+)/.exec(window.location.search) ?? ["", "60"])[1]);
const Offset = vec2(650, 850);

const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
const renderer = new ZograRenderer(canvas, window.innerWidth, window.innerHeight);

class LifeGameMaterial extends MaterialFromShader(new Shader(vert, frag, {
    zWrite: false,
    depth: DepthTest.Always
}))
{
}
const material = new LifeGameMaterial();
const blitMat = new Material(new Shader(vert, blitFrag));
blitMat.setProp("uBlockSize", "float", BlockSize);
blitMat.setProp("uTexelSize", "vec4", vec4(Width, Height, 1 / Width, 1 / Height));
blitMat.setProp("uOffset", "vec2", Offset);
blitMat.setProp("uSize", "vec3", vec3(window.innerWidth, window.innerHeight, window.innerWidth / window.innerHeight));
blitMat.setProp("uBG", "color", Color.white);
blitMat.setProp("uFG", "color", rgba(0, 0, 0, 0.5));

renderer.clear();

const rts = [
    new RenderTexture(Width, Height, false, TextureFormat.RGBA, FilterMode.Nearest),
    new RenderTexture(Width, Height, false, TextureFormat.RGBA, FilterMode.Nearest),
] as [RenderTexture, RenderTexture];
rts[0].wrapMode = WrapMode.Clamp;
rts[1].wrapMode = WrapMode.Clamp;
// rts[0].update();
// rts[1].update();
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
    rts[0].setData(seed);
    
    setInterval(() =>
    {
        const src = rts[frameIdx % 2];
        const dst = rts[(frameIdx + 1) % 2];
        frameIdx++;

        // renderer.setGlobalTexture("uLastFrame", src);
        renderer.setGlobalUniform("uLastFrame", "tex2d", src);
        renderer.setGlobalUniform("uSize", "vec4", vec4(Width, Height, 1 / Width, 1 / Height));

        renderer.setRenderTarget(dst);
        renderer.drawMesh(mesh, mat4.identity(), material);
    }, 1000 / FPS);

    return (dt: number, time: number) =>
    {
        renderer.blit(rts[0], RenderTarget.CanvasTarget, blitMat);

    };
}
window.addEventListener("mousemove", (e) =>
{
    const pos = vec2(e.clientX, e.clientY);
    const center = vec2(window.innerWidth / 2, window.innerHeight / 2);
    const d = minus(pos, center);
    d.mul(vec2(-.2, .2));
    blitMat.setProp("uOffset", "vec2", plus(Offset, d));
});
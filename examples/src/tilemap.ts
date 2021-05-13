import { Camera, Chunk, Color, Default2DMaterial, Default2DRenderPipeline, dot, Entity, InputManager, Keys, LineRenderer, MathUtils, minus, mul, ParticleSystem, plus, Projection, RenderObject, Sprite, Texture2D, TextureImporter, TileData, Tilemap, Time, vec2, vec3, ZograEngine } from "zogra-engine";
import "./css/base.css";
import imgCheckBoard from "./asset/img/checkboard.png";
import * as ZograRendererPackage from "zogra-renderer";
import * as ZograEnginePackage from "zogra-engine";
import { Noise as noisejs } from "noisejs";
import { Debug } from "zogra-renderer/dist/core/global";

(window as any).Noise = noisejs;
(window as any).ZograEngine = ZograEnginePackage;
(window as any).ZograRenderer = ZograRendererPackage;
const Noise = new noisejs(Math.random());

let tileGround: TileData = {
    sprite: null,
    collide: false,
};
let tileWall: TileData = {
    sprite: null,
    collide: true,
}

class NoiseChunk extends Chunk
{
    constructor(basePos: vec2, chunkSize: number)
    {
        super(basePos, chunkSize);

        for (let x = 0; x < chunkSize; x++)
            for (let y = 0; y < chunkSize; y++)
            {
                this.genMap(x, y);
            }
    }

    genMap(x: number, y: number)
    {
        const threshold = .05;
        let scale = 1 / 8;
        const noise = Noise.perlin2.bind(Noise);
        const octave = 3;
        let n = 0;

        for (let i = 0; i < octave; i++)
        {
            n += noise((x + this.basePos.x) * scale, (y + this.basePos.y) * scale) * Math.pow(0.5, i + 1);
            scale *= 2;
        }

        if (n > threshold)
            this.setTile(vec2(x, y), tileWall);
        else
            this.setTile(vec2(x, y), tileGround);
    }
}


const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
const engine = new ZograEngine(canvas, Default2DRenderPipeline);
engine.renderPipeline.ambientLightColor = Color.white;
const input = new InputManager({
});
engine.start();

const scene = engine.scene;
(window as any).scene = scene;

async function init()
{
    const checkboard = await TextureImporter.url(imgCheckBoard).then(r => r.tex2d());

    tileGround.sprite = new Sprite(checkboard, vec2(4), vec2(0, 0));
    tileWall.sprite = new Sprite(checkboard, vec2(4), vec2(0, 1));

    const tilemap = new Tilemap(NoiseChunk);
    (tilemap.materials[0] as Default2DMaterial).texture = checkboard;
    scene.add(tilemap);

    const camera = new Camera();
    camera.position = vec3(0, 0, 20);
    camera.projection = Projection.Orthographic;
    camera.viewHeight = 10;
    scene.add(camera);
    (window as any).camera = camera;

    const lineRenderer = new LineRenderer();
    scene.add(lineRenderer);

    engine.on("update", (time) =>
    {
        input.update();

        const speed = 15;
        const movement = vec2.zero();
        input.getKey(Keys.A) && movement.plus(vec2.left());
        input.getKey(Keys.D) && movement.plus(vec2.right());
        input.getKey(Keys.W) && movement.plus(vec2.up());
        input.getKey(Keys.S) && movement.plus(vec2.down());

        camera.translate(movement.mul(speed * time.deltaTime).toVec3());

        if (input.getKeyDown(Keys.Mouse0))
        {
            const pos = camera.screenToWorld(input.pointerPosition);
            tilemap.setTile(pos.toVec2(), tileWall);
            console.log(input.pointerPosition, pos, camera.screenToViewport(input.pointerPosition));

        }

        let i = 0
        for (const chunk of (tilemap as any).chunks.values())
        {
            for (const polygon of chunk.getPolygons())
            {
                colors[i] = colors[i] || Color.fromHSL(Math.random() * 360, 1, 0.5);
                Debug().drawLines(polygon.points.map((p: vec2) => p.toVec3()), colors[i++]);
            }
        }
    });

}
init();

const colors: Color[] = [];
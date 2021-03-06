import { Camera, Chunk, Color, Default2DRenderPipeline, InputManager, Keys, Light2D, MathUtils, MeshBuilder, Physics2D, Projection, RenderObject, ShadowType, Sprite, TileData, Tilemap, TilemapCollider, vec2, vec3, ZograEngine } from "zogra-engine";
import "./css/base.css";
import './page-base';
import noisejs from "noisejs";
import { Debug } from "zogra-renderer/dist/core/global";
const Noise = new noisejs.Noise();


const tile: TileData = {
    collide: true,
    sprite: new Sprite(null as any, vec2.one(), vec2.zero()),
};
(tile.sprite as Sprite).color = Color.gray;

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
            this.setTile(vec2(x, y), tile);
    }
}

const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
const engine = new ZograEngine(canvas, Default2DRenderPipeline);
engine.renderPipeline.ambientIntensity = 0.2;
engine.renderPipeline.msaa = 0;
engine.start();
const scene = engine.scene;
scene.physics = new Physics2D();

const input = new InputManager();

const camera = new Camera();
camera.clearColor = Color.white;
camera.position = vec3(0, 0, 20);
camera.projection = Projection.Orthographic;
camera.viewHeight = 10;
scene.add(camera);

const light = new Light2D(ShadowType.Soft);
light.lightColor = Color.white;
light.intensity = 0.6;
light.attenuation = -0.8;
light.lightRange = 15;
scene.add(light);
light.position = vec3(0, 3, 0);

// const obj = new RenderObject();
// obj.meshes[0] = MeshBuilder.quad();
// scene.add(obj, light);
const tilemap = new Tilemap(NoiseChunk);
tilemap.collider = new TilemapCollider();
scene.add(tilemap);

let velocity = vec2.zero()
engine.on("update", (time) =>
{
    input.update();
    // light.updateShadowMesh();

    if (input.getKeyDown(Keys.Mouse0))
    {
        const pos = camera.screenToWorld(input.pointerPosition);
        const light = new Light2D();
        light.lightRange = 3;
        light.volumnRadius = 0;
        light.attenuation = -0.8;
        light.shadowType = false;
        light.position = pos.setZ(0);
        scene.add(light);
        // console.log(input.pointerPosition, pos, camera.screenToViewport(input.pointerPosition));

    }
    if (input.getKeyDown(Keys.Mouse2))
    {
        const pos = camera.screenToWorld(input.pointerPosition);
        tilemap.setTile(pos.toVec2(), tile);
    }

    const speed = 10;
    const movement = vec2.zero();
    input.getKey(Keys.A) && movement.plus(vec2.left());
    input.getKey(Keys.D) && movement.plus(vec2.right());
    input.getKey(Keys.W) && movement.plus(vec2.up());
    input.getKey(Keys.S) && movement.plus(vec2.down());
    velocity = vec2.math(MathUtils.lerp)(velocity, movement.mul(speed), vec2(0.1));

    light.translate(vec2.mul(velocity, time.deltaTime).toVec3());

    const z = camera.position.z;
    camera.position = vec3.math(MathUtils.lerp)(camera.position, light.position, vec3(0.1)).setZ(z);


    // let i = 0
    // for (const chunk of (tilemap as any).chunks.values())
    // {
    //     for (const polygon of chunk.getPolygons())
    //     {
    //         colors[i] = colors[i] || Color.fromHSL(Math.random() * 360, 1, 0.5);
    //         Debug().drawLines(polygon.points.map((p: vec2) => p.toVec3()), colors[i++]);
    //     }
    // }

});

const colors: Color[] = [];
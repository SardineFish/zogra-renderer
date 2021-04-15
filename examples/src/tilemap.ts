import { Camera, Chunk, Default2DMaterial, Default2DRenderPipeline, InputManager, Keys, Projection, Sprite, Texture2D, TextureImporter, TileData, Tilemap, vec2, vec3, ZograEngine } from "zogra-engine";
import "./css/base.css";
import imgCheckBoard from "./asset/img/checkboard.png";
import * as ZograRendererPackage from "zogra-renderer";
import * as ZograEnginePackage from "zogra-engine";
(window as any).ZograEngine = ZograEnginePackage;
(window as any).ZograRenderer = ZograRendererPackage;

let tileGround: TileData = {
    sprite: null,
    collide: false,
};
let tileWall: TileData = {
    sprite: null,
    collide: false,
}

class NoiseChunk extends Chunk
{
    constructor(basePos: vec2, chunkSize: number)
    {
        super(basePos, chunkSize);

        for (let x = 0; x < chunkSize; x++)
            for (let y = 0; y < chunkSize; y++)
            {
                this.setTile(vec2(x, y), tileGround);
            }
    }
}


const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
const engine = new ZograEngine(canvas, Default2DRenderPipeline);
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
    });

}
init();
import { Camera, Chunk, Color, Default2DMaterial, Default2DRenderPipeline, dot, Entity, InputManager, Keys, LineRenderer, MathUtils, minus, mul, plus, Projection, RenderObject, Sprite, Texture2D, TextureImporter, TileData, Tilemap, Time, vec2, vec3, ZograEngine } from "zogra-engine";
import "./css/base.css";
import imgCheckBoard from "./asset/img/checkboard.png";
import * as ZograRendererPackage from "zogra-renderer";
import * as ZograEnginePackage from "zogra-engine";
import noisejs = require("noisejs");

(window as any).Noise = noisejs.Noise;
(window as any).ZograEngine = ZograEnginePackage;
(window as any).ZograRenderer = ZograRendererPackage;
const Noise = new noisejs.Noise();

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
const input = new InputManager({
});
engine.start();

const scene = engine.scene;
(window as any).scene = scene;

class Snake extends LineRenderer
{
    headSpeed = 3;
    tailSpeed = 1;
    width = 0.6;
    inputCacheSize = 3;
    step = 1;
    color = Color.white;

    bodies: vec2[] = [];
    headDir: vec2 = vec2.right();
    inputQueue: vec2[] = [];
    headMoveDistance = 0;
    tailMoveDistance = 0;
    camera: Camera;

    constructor(bodies: vec2[], headDir: vec2, camera: Camera)
    {
        super();
        this.on("update", this.update.bind(this));
        this.bodies = bodies;
        this.headDir = headDir;
        this.camera = camera;
        camera.position = this.head.toVec3(camera.position.z);

        for (const body of this.bodies)
        {
            this.points.push({
                position: body.clone(),
                color: this.color,
                width: this.width,
            });
        }
        this.points.push({
            position: mul(headDir, this.width / 2).plus(this.head),
            color: this.color,
            width: this.width,
        });
        this.points[0].position = mul(this.tailDir, -this.width / 2).plus(this.tail);
    }
    update(_: Entity, time: Time)
    {
        // time = {
        //     deltaTime: 0.016,
        //     time: 0,
        // };
        if (input.getKeyDown(Keys.A) || input.getKeyDown(Keys.Left))
        {
            this.inputQueue.push(vec2.left());
        }
        if (input.getKeyDown(Keys.D) || input.getKeyDown(Keys.Right))
        {
            this.inputQueue.push(vec2.right());
        }
        if (input.getKeyDown(Keys.W) || input.getKeyDown(Keys.Up))
        {
            this.inputQueue.push(vec2.up());
        }
        if (input.getKeyDown(Keys.S) || input.getKeyDown(Keys.Down))
        {
            this.inputQueue.push(vec2.down());
        }
        if (this.inputQueue.length > this.inputCacheSize)
            this.inputQueue = this.inputQueue.slice(this.inputQueue.length - this.inputCacheSize);
        
        this.moveHead(time);
        this.moveTail(time);
        this.updateMesh();

        this.camera.position = vec2.math(MathUtils.lerp)(this.camera.position.toVec2(), this.head, vec2(0.7 * time.deltaTime, 0.5 * time.deltaTime)).toVec3(this.camera.position.z);
    }
    moveHead(time: Time)
    {
        this.headMoveDistance += this.headSpeed * time.deltaTime;
        if (this.headMoveDistance >= this.step)
        {
            this.bodies.push(mul(this.headDir, this.step).plus(this.head));

            while (this.inputQueue.length > 0)
            {
                if (dot(this.inputQueue[0], this.headDir) >= 0)
                {
                    this.headDir = this.inputQueue[0];
                    this.inputQueue = this.inputQueue.slice(1);
                    break;
                }
                this.inputQueue = this.inputQueue.slice(1);
            }

            this.points[this.points.length - 1].position = this.head.clone();
            this.points.push({
                position: mul(this.headDir, this.width / 2).plus(this.head),
                color: this.color,
                width: this.width,
            });
            this.headMoveDistance -= this.step;
        }

        const headPoint = this.points[this.points.length - 1];
        const startPos = mul(this.headDir, this.width / 2).plus(this.head);
        headPoint.position.set(this.headDir).mul(this.headMoveDistance).plus(startPos);
    }
    moveTail(time: Time)
    {
        this.tailMoveDistance += this.tailSpeed * time.deltaTime;
        if (this.tailMoveDistance >= this.step)
        {
            this.bodies = this.bodies.slice(1);
            this.points = this.points.slice(1);

            this.points[0].position = mul(this.tailDir, -this.width / 2).plus(this.tail);
            this.tailMoveDistance -= this.step;
        }

        const tailPoint = this.points[0];
        const startPos = mul(this.tailDir, -this.width / 2).plus(this.tail);
        tailPoint.position.set(this.tailDir).mul(this.tailMoveDistance).plus(startPos);
    }
    get head() { return this.bodies[this.bodies.length - 1] }
    get tail() { return this.bodies[0] }
    get tailDir()
    {
        return minus(this.bodies[1], this.bodies[0]).normalize();
    }
}

async function init()
{
    const checkboard = await TextureImporter.url(imgCheckBoard).then(r => r.tex2d());

    tileGround.sprite = new Sprite(checkboard, vec2(4), vec2(0, 0));
    tileGround.sprite.color = Color.fromString("#cccccc");
    tileWall.sprite = new Sprite(checkboard, vec2(4), vec2(0, 1));
    tileWall.sprite.color = Color.fromString("#eeeeee");

    const tilemap = new Tilemap(NoiseChunk);
    // (tilemap.materials[0] as Default2DMaterial).texture = checkboard;
    scene.add(tilemap);

    const camera = new Camera();
    camera.position = vec3(0, 0, 20);
    camera.projection = Projection.Orthographic;
    camera.viewHeight = 10;
    scene.add(camera);
    (window as any).camera = camera;

    const lineRenderer = new LineRenderer();
    scene.add(lineRenderer);

    let snake: Snake;
    while (true)
    {
        let pos = vec2.math(Math.floor)(vec2.math(Math.random)().mul(1000)).plus(0.5);
        let bodies: vec2[] = [];
        for (let i = 0; i < 4; i++)
        {
            if (tilemap.getTile(pos.plus(vec2.right())) === tileGround)
                bodies.push(pos.clone());
            else
                break;
        }
        if (bodies.length == 4)
        {
            snake = new Snake(bodies, vec2.right(), camera);
            camera.position = camera.position.set(pos.toVec3(camera.position.z));
            break;
        }
    }
    scene.add(snake);

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

            lineRenderer.points.push({
                position: pos.toVec2(),
                color: Color.white,
                width: 1
            });
            lineRenderer.updateMesh();
        }
    });

}
init();
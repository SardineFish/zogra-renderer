import noisejs from "noisejs";
import * as ZograEnginePackage from "zogra-engine";
import { Bloom, Default2DRenderPipeline, EventEmitter, EventKeys, InputManager, Keys, Physics2D, Projection, Scene, TextureFormat, vec2, vec3, ZograEngine } from "zogra-engine";
import * as ZograRendererPackage from "zogra-renderer";
import "./style.css";
import { loadAssets } from "./assets";
import { GameCamera } from "./game-camera";
import { GameMap } from "./map";
import { Snake } from "./snake";

(window as any).Noise = noisejs.Noise;
(window as any).ZograEngine = ZograEnginePackage;
(window as any).ZograRenderer = ZograRendererPackage;

const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
const rect = canvas.getBoundingClientRect();
canvas.width = rect.width;
canvas.height = rect.height;

interface GameEvents
{
    gameover(length: number): void,
}

export class SnakeGame
{
    static instance: SnakeGame;
    engine: ZograEngine<Default2DRenderPipeline>;
    input: InputManager;
    
    /** @internal */
    eventEmitter = new EventEmitter<GameEvents>();
    
    constructor(canvas: HTMLCanvasElement)
    {
        SnakeGame.instance = this;

        this.engine = new ZograEngine(canvas, Default2DRenderPipeline);
        this.engine.renderPipeline.ambientIntensity = 0.2;
        this.engine.renderPipeline.msaa = 4;
        this.engine.renderPipeline.renderFormat = TextureFormat.RGBA16F;

        this.input = new InputManager();
        this.engine.start();
        this.engine.on("update", () =>
        {
            this.input.update();

            if (this.input.getKeyDown(Keys.F2))
            {
                this.reload();
            }
        });

        window.onresize = () =>
        {
            const rect = canvas.getBoundingClientRect();
            this.engine.renderer.setSize(rect.width, rect.height);
        };
    }
    async loadAssets()
    {
        await GameMap.loadMapAssets();
        await loadAssets();
    }
    async reload()
    {
        this.engine.scene.destroy();
        const scene = new Scene(Physics2D);
        this.engine.scene = scene;

        const camera = new GameCamera();
        camera.position = vec3(0, 0, 20);
        camera.projection = Projection.Orthographic;
        camera.viewHeight = 10;
        scene.add(camera);

        const bloom = new Bloom();
        bloom.threshold = 1.0;
        bloom.softThreshold = 0.5;
        camera.postprocess.push(bloom);

        const tilemap = new GameMap(Math.random());
        scene.add(tilemap);

        let snake: Snake;
        while (true)
        {
            let pos = vec2.math(Math.floor)(vec2.math(Math.random)().mul(1000)).plus(0.5);
            let bodies: vec2[] = [];
            for (let i = 0; i < 10; i++)
            {
                if (tilemap.getTile(pos.plus(vec2.right())) === GameMap.tileGround)
                {
                    if (i < 4)
                        bodies.push(pos.clone());
                }
                else
                    bodies = [];
            }
            if (bodies.length == 4)
            {
                snake = new Snake(bodies, vec2.right(), camera, this.input);
                camera.position = camera.position.set(pos.toVec3(camera.position.z));
                break;
            }
        }
        scene.add(snake);

        camera.followTarget = snake.headEntity;
        camera.position = snake.headEntity.position.clone().setZ(20);
    }

    on<T extends EventKeys<GameEvents>>(event: T, listener: GameEvents[T])
    {
        this.eventEmitter.on(event, listener);
    }
    off<T extends EventKeys<GameEvents>>(event: T, listener: GameEvents[T])
    {
        this.eventEmitter.off(event, listener);
    }
}

(async () =>
{
    const game = new SnakeGame(canvas);
    await game.loadAssets();
    game.reload();
})();

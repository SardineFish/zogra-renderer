import { Scene } from "./scene";
import { PreviewRenderer, RenderContext } from "../render-pipeline";
import { Camera } from "./camera";
import { ZograRenderer } from "zogra-renderer";
import { EventEmitter } from "zogra-renderer";
import { UnknownPhysics } from "../physics/physics-generic";
export class ZograEngine {
    constructor(canvas, RenderPipeline = PreviewRenderer) {
        this.fixedDeltaTime = false;
        this._time = { deltaTime: 0, time: 0 };
        this.renderer = new ZograRenderer(canvas, canvas.width, canvas.height);
        this.renderPipeline = new RenderPipeline(this.renderer);
        this._scene = new Scene(UnknownPhysics);
        this.eventEmitter = new EventEmitter();
    }
    get time() { return this._time; }
    get scene() { return this._scene; }
    set scene(value) {
        const previous = this._scene;
        this._scene = value;
        value.engine = this;
        this.eventEmitter.emit("scene-change", value, previous);
    }
    renderScene() {
        const cameras = this.scene.getEntitiesOfType(Camera);
        this.renderPipeline.render(RenderContext.create(this.renderer), this.scene, cameras);
    }
    start() {
        let previousDelay = 0;
        let startDelay = 0;
        let currentTime = 0;
        const update = (delay) => {
            if (previousDelay === 0) {
                startDelay = previousDelay = delay;
                requestAnimationFrame(update);
                return;
            }
            if (this.fixedDeltaTime)
                currentTime += 16;
            else
                currentTime = delay;
            const time = (currentTime - startDelay) / 1000;
            const dt = (currentTime - previousDelay) / 1000;
            previousDelay = currentTime;
            const t = {
                time: time,
                deltaTime: dt
            };
            this._time = t;
            this.eventEmitter.emit("update", t);
            this.scene.__update(t);
            this.eventEmitter.emit("render", this.scene.getEntitiesOfType(Camera));
            this.renderScene();
            requestAnimationFrame(update);
        };
        requestAnimationFrame(update);
    }
    on(event, listener) {
        this.eventEmitter.on(event, listener);
    }
    off(event, listener) {
        this.eventEmitter.off(event, listener);
    }
}
//# sourceMappingURL=engine.js.map
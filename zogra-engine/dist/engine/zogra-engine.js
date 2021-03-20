"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZograEngine = void 0;
const scene_1 = require("./scene");
const rp_1 = require("../render-pipeline/rp");
const camera_1 = require("./camera");
const zogra_renderer_1 = require("zogra-renderer");
const zogra_renderer_2 = require("zogra-renderer");
class ZograEngine {
    constructor(canvas, RenderPipeline = rp_1.PreviewRenderer) {
        this._time = { deltaTime: 0, time: 0 };
        this.renderer = new zogra_renderer_1.ZograRenderer(canvas, canvas.width, canvas.height);
        this.renderPipeline = new RenderPipeline(this.renderer);
        this._scene = new scene_1.Scene();
        this.eventEmitter = new zogra_renderer_2.EventEmitter();
    }
    get time() { return this._time; }
    get scene() { return this._scene; }
    set scene(value) {
        const previous = this._scene;
        this._scene = value;
        this.eventEmitter.emit("scene-change", value, previous);
    }
    renderScene() {
        const cameras = this.scene.getEntitiesOfType(camera_1.Camera);
        this.renderPipeline.render({
            renderer: this.renderer,
            scene: this.scene
        }, cameras);
    }
    updateEntities(time) {
        const entities = this.scene.rootEntities();
        for (const entity of entities)
            entity.__updateRecursive(time);
    }
    start() {
        let previousDelay = 0;
        let startDelay = 0;
        const update = (delay) => {
            if (previousDelay === 0) {
                startDelay = previousDelay = delay;
                requestAnimationFrame(update);
                return;
            }
            const time = (delay - startDelay) / 1000;
            const dt = (delay - previousDelay) / 1000;
            previousDelay = delay;
            const t = {
                time: time,
                deltaTime: dt
            };
            this._time = t;
            this.eventEmitter.emit("update", t);
            this.updateEntities(t);
            this.eventEmitter.emit("render", this.scene.getEntitiesOfType(camera_1.Camera));
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
exports.ZograEngine = ZograEngine;
//# sourceMappingURL=zogra-engine.js.map
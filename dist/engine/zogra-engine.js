"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const scene_1 = require("./scene");
const preview_renderer_1 = require("../render-pipeline/preview-renderer");
const camera_1 = require("./camera");
const core_1 = require("../core/core");
const event_1 = require("./event");
class ZograEngine {
    constructor(canvas, RenderPipeline = preview_renderer_1.PreviewRenderer) {
        this.renderer = new core_1.ZograRenderer(canvas, canvas.width, canvas.height);
        this.renderPipeline = new RenderPipeline(this.renderer);
        this.scene = new scene_1.Scene();
        this.eventEmitter = new event_1.EventTrigger();
    }
    renderScene() {
        const cameras = this.scene.getEntitiesOfType(camera_1.Camera);
        this.renderPipeline.render({
            renderer: this.renderer,
            scene: this.scene
        }, cameras);
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
            this.emit("update", t);
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
    emit(event, ...args) {
        this.eventEmitter.emit(event, ...args);
    }
}
exports.ZograEngine = ZograEngine;
//# sourceMappingURL=zogra-engine.js.map
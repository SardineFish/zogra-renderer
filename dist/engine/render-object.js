"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const global_1 = require("../core/global");
const entity_1 = require("./entity");
class RenderObject extends entity_1.Entity {
    constructor(ctx = global_1.GlobalContext()) {
        super();
        this.meshes = [];
        this.materials = [];
        this.materials = [ctx.assets.materials.default];
    }
    on(event, listener) {
        this.eventEmitter.on(event, listener);
    }
    off(event, listener) {
        this.eventEmitter.off(event, listener);
    }
    __onRender(context, data) {
        this.eventEmitter.emit("render", this, context, data);
    }
}
exports.RenderObject = RenderObject;
//# sourceMappingURL=render-object.js.map
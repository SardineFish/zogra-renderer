"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenderObject = void 0;
const zogra_renderer_1 = require("zogra-renderer");
const entity_1 = require("./entity");
class RenderObject extends entity_1.Entity {
    constructor(ctx = zogra_renderer_1.GlobalContext()) {
        super();
        this.meshes = [];
        this.materials = [];
        this.materials = [ctx.assets.materials.default];
    }
    on(event, listener) {
        this.eventEmitter.with().on(event, listener);
    }
    off(event, listener) {
        this.eventEmitter.with().off(event, listener);
    }
    /** @internal */
    render(context, data) {
        this.eventEmitter.with().emit("render", this, context, data);
        for (let i = 0; i < this.meshes.length; i++) {
            context.renderer.drawMesh(this.meshes[i], this.localToWorldMatrix, this.materials[i]);
        }
    }
}
exports.RenderObject = RenderObject;
//# sourceMappingURL=render-object.js.map
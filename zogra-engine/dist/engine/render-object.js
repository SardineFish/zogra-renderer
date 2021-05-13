import { GlobalContext } from "zogra-renderer";
import { Entity } from "./entity";
export class RenderObject extends Entity {
    constructor(ctx = GlobalContext()) {
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
//# sourceMappingURL=render-object.js.map
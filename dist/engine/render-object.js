"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const global_1 = require("../core/global");
const entity_1 = require("./entity");
class RenderObject extends entity_1.Entity {
    constructor(ctx = global_1.GlobalContext()) {
        super();
        this.meshes = [];
        this.material = ctx.assets.materials.default;
    }
}
exports.RenderObject = RenderObject;
//# sourceMappingURL=render-object.js.map
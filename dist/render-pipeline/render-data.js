"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const render_object_1 = require("../engine/render-object");
const light_1 = require("../engine/light");
const mat4_1 = require("../types/mat4");
var RenderOrder;
(function (RenderOrder) {
    RenderOrder[RenderOrder["NearToFar"] = 0] = "NearToFar";
    RenderOrder[RenderOrder["FarToNear"] = 1] = "FarToNear";
})(RenderOrder = exports.RenderOrder || (exports.RenderOrder = {}));
class RenderData {
    constructor(camera, scene) {
        this.visibleObjects = [];
        this.visibleLights = [];
        this.camera = camera;
        this.visibleLights = scene.getEntitiesOfType(light_1.Light);
        this.visibleObjects = scene.getEntitiesOfType(render_object_1.RenderObject);
    }
    getVisibleObjects(renderOrder = RenderOrder.NearToFar) {
        const viewMat = this.camera.worldToLocalMatrix;
        let wrap = this.visibleObjects.map(obj => ({ pos: mat4_1.mat4.mulPoint(viewMat, obj.position), obj: obj }));
        if (renderOrder === RenderOrder.NearToFar)
            wrap = wrap.sort((a, b) => a.pos.z - b.pos.z);
        else
            wrap = wrap.sort((a, b) => b.pos.z - a.pos.z);
        return wrap.map(t => t.obj);
    }
    getVisibleLights() {
        return this.visibleLights;
    }
}
exports.RenderData = RenderData;
//# sourceMappingURL=render-data.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Light = exports.LightType = void 0;
const entity_1 = require("./entity");
const zogra_renderer_1 = require("zogra-renderer");
var LightType;
(function (LightType) {
    LightType[LightType["Directional"] = 0] = "Directional";
    LightType[LightType["Point"] = 1] = "Point";
})(LightType = exports.LightType || (exports.LightType = {}));
class Light extends entity_1.Entity {
    constructor(type = LightType.Directional) {
        super();
        this.intensity = 1;
        this.color = zogra_renderer_1.Color.white;
        this.type = type;
    }
}
exports.Light = Light;
//# sourceMappingURL=light.js.map
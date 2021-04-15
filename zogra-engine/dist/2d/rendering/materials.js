"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default2DMaterial = void 0;
const zogra_renderer_1 = require("zogra-renderer");
const assets_1 = require("../../assets");
class Default2DMaterial extends zogra_renderer_1.MaterialFromShader(new zogra_renderer_1.Shader(...assets_1.ShaderSource.default2D, {
    cull: zogra_renderer_1.Culling.Disable,
    depth: zogra_renderer_1.DepthTest.Disable,
    zWrite: false,
})) {
    constructor() {
        super(...arguments);
        this.texture = null;
        this.color = zogra_renderer_1.Color.white;
    }
}
__decorate([
    zogra_renderer_1.shaderProp("uMainTex", "tex2d")
], Default2DMaterial.prototype, "texture", void 0);
__decorate([
    zogra_renderer_1.shaderProp("uColor", "color")
], Default2DMaterial.prototype, "color", void 0);
exports.Default2DMaterial = Default2DMaterial;
//# sourceMappingURL=materials.js.map
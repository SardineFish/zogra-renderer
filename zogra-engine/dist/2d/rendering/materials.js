"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Light2DCompose = exports.Shadow2DMaterial = exports.Default2DMaterial = void 0;
const zogra_renderer_1 = require("zogra-renderer");
const assets_1 = require("../../assets");
const light_2d_1 = require("./light-2d");
class Default2DMaterial extends zogra_renderer_1.MaterialFromShader(new zogra_renderer_1.Shader(...assets_1.ShaderSource.default2D, {
    cull: zogra_renderer_1.Culling.Disable,
    depth: zogra_renderer_1.DepthTest.Disable,
    zWrite: false,
    blend: [zogra_renderer_1.Blending.SrcAlpha, zogra_renderer_1.Blending.OneMinusSrcAlpha],
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
class Shadow2DMaterial extends zogra_renderer_1.MaterialFromShader(new zogra_renderer_1.Shader(...assets_1.ShaderSource.shadow2D, {
    vertexStructure: light_2d_1.Shadow2DVertStruct,
    attributes: {
        p0: "aP0",
        p1: "aP1",
    },
    cull: zogra_renderer_1.Culling.Back,
})) {
    constructor() {
        super(...arguments);
        this.lightPos = zogra_renderer_1.vec2.zero();
        this.volumnSize = 1;
        this.lightRange = 10;
    }
}
__decorate([
    zogra_renderer_1.shaderProp("uLightPos", "vec2")
], Shadow2DMaterial.prototype, "lightPos", void 0);
__decorate([
    zogra_renderer_1.shaderProp("uVolumnSize", "float")
], Shadow2DMaterial.prototype, "volumnSize", void 0);
__decorate([
    zogra_renderer_1.shaderProp("uLightRange", "float")
], Shadow2DMaterial.prototype, "lightRange", void 0);
exports.Shadow2DMaterial = Shadow2DMaterial;
class Light2DCompose extends zogra_renderer_1.MaterialFromShader(new zogra_renderer_1.Shader(...assets_1.ShaderSource.light2D, {
    blend: [zogra_renderer_1.Blending.SrcColor, zogra_renderer_1.Blending.Zero],
})) {
    constructor() {
        super(...arguments);
        this.lightPosList = [];
        this.lightColorList = [];
        this.lightParamsList = [];
        this.shadowMapList = [];
        this.lightCount = 0;
        this.cameraParams = zogra_renderer_1.vec4.zero();
    }
}
__decorate([
    zogra_renderer_1.shaderProp("uLightPosList", "vec4[]")
], Light2DCompose.prototype, "lightPosList", void 0);
__decorate([
    zogra_renderer_1.shaderProp("uLightColorList", "color[]")
], Light2DCompose.prototype, "lightColorList", void 0);
__decorate([
    zogra_renderer_1.shaderProp("uLightParamsList", "vec4[]")
], Light2DCompose.prototype, "lightParamsList", void 0);
__decorate([
    zogra_renderer_1.shaderProp("uShadowMapList", "tex2d[]")
], Light2DCompose.prototype, "shadowMapList", void 0);
__decorate([
    zogra_renderer_1.shaderProp("uLightCount", "int")
], Light2DCompose.prototype, "lightCount", void 0);
__decorate([
    zogra_renderer_1.shaderProp("uCameraParams", "vec4")
], Light2DCompose.prototype, "cameraParams", void 0);
exports.Light2DCompose = Light2DCompose;
//# sourceMappingURL=materials.js.map
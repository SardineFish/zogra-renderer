"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const shader_1 = require("../core/shader");
const material_1 = require("../core/material");
const color_1 = require("../types/color");
const global_1 = require("../core/global");
const texture_1 = require("../core/texture");
const util_1 = require("../utils/util");
const texture_format_1 = require("../core/texture-format");
const DefaultShaderAttributes = {
    vert: "aPos",
    color: "aColor",
    uv: "aUV",
    normal: "aNormal",
};
const TransformUniforms = {
    matM: "uTransformM",
    matVP: "uTransformVP",
    matMVP: "uTransformMVP",
};
function makeDefaultMateiral(gl) {
    const shader = new shader_1.Shader(DefaultVert, DefaultFrag, DefaultShaderAttributes, gl);
    class DefaultMaterial extends material_1.MaterialFromShader(shader) {
        constructor() {
            super(...arguments);
            this.color = color_1.Color.white;
        }
    }
    __decorate([
        material_1.shaderProp("u_Color", "color")
    ], DefaultMaterial.prototype, "color", void 0);
    ;
    return DefaultMaterial;
}
exports.makeDefaultMateiral = makeDefaultMateiral;
const assetsMap = new Map();
function GlobalAssets(ctx = global_1.GlobalContext()) {
    return assetsMap.get(ctx.gl);
}
exports.GlobalAssets = GlobalAssets;
function initGlobalAssets(ctx) {
    assetsMap.set(ctx.gl, new BuiltinAssets(ctx.gl));
}
exports.initGlobalAssets = initGlobalAssets;
class BuiltinAssets {
    constructor(gl) {
        this.gl = gl;
        this.DefaultMaterial = null; // makeDefaultMateiral(gl);
        this.defaultTexture = new texture_1.Texture2D(0, 0, texture_format_1.TextureFormat.RGBA, texture_1.FilterMode.Nearest, gl);
        this.defaultTexture.wrapMode = texture_1.WrapMode.Repeat;
        this.defaultTexture.setData(makeDefaultTexture());
    }
}
function makeDefaultTexture() {
    var _a;
    const size = 64;
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;
    const ctx = (_a = canvas.getContext("2d"), (_a !== null && _a !== void 0 ? _a : util_1.panic("Failed to create default texture.")));
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = "cyan";
    ctx.fillRect(0, 0, size / 2, size / 2);
    ctx.fillRect(size / 2, size / 2, size / 2, size / 2);
    return canvas;
}
//# sourceMappingURL=asset.js.map
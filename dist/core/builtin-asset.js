"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const shader_1 = require("./shader");
const material_1 = require("./material");
const color_1 = require("../types/color");
const DefaultVert = `

`;
const DefaultFrag = `
`;
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
exports.DefaultShaderResources = {
    vertShader: DefaultVert,
    fragShader: DefaultFrag,
    attributes: DefaultShaderAttributes,
    uniforms: TransformUniforms
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
//# sourceMappingURL=builtin-asset.js.map
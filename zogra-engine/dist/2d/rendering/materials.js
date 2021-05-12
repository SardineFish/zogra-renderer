var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Blending, Color, Culling, DepthTest, MaterialFromShader, Shader, shaderProp } from "zogra-renderer";
import { ShaderSource } from "../../assets";
export class Default2DMaterial extends MaterialFromShader(new Shader(...ShaderSource.default2D, {
    cull: Culling.Disable,
    depth: DepthTest.Disable,
    zWrite: false,
    blend: [Blending.SrcAlpha, Blending.OneMinusSrcAlpha],
})) {
    constructor() {
        super(...arguments);
        this.texture = null;
        this.color = Color.white;
    }
}
__decorate([
    shaderProp("uMainTex", "tex2d")
], Default2DMaterial.prototype, "texture", void 0);
__decorate([
    shaderProp("uColor", "color")
], Default2DMaterial.prototype, "color", void 0);
//# sourceMappingURL=materials.js.map
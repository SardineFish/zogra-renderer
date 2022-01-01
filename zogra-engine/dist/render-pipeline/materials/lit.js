var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Color, MaterialFromShader, Shader, shaderProp } from "zogra-renderer";
import { ShaderSource } from "../../assets";
export class LitLambertian extends MaterialFromShader(new Shader(ShaderSource.defaultVert, ShaderSource.litLambert, {})) {
    constructor() {
        super(...arguments);
        this.color = Color.white;
        this.texture = null;
    }
}
__decorate([
    shaderProp("uColor", "color")
], LitLambertian.prototype, "color", void 0);
__decorate([
    shaderProp("uMainTex", "tex2d")
], LitLambertian.prototype, "texture", void 0);
//# sourceMappingURL=lit.js.map
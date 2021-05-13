var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { MaterialFromShader, materialDefine, shaderProp, Material } from "../core/material";
import { Color } from "../types/color";
import { MaterialType } from "../core/material-type";
import { vec2 } from "../types/vec2";
export function createBuiltinMaterial(gl, types, shaders, textures) {
    const errorMat = new Material(shaders.ErrorShader, gl);
    errorMat.setProp("uMainTex", "tex2d", textures.error);
    return {
        error: errorMat,
        default: new types.DefaultMaterial(gl),
        blitCopy: new types.BlitCopy(gl),
        ColoredLine: new Material(shaders.ColoredLine, gl),
    };
}
export function createBuiltinMaterialTypes(gl, builtinTexs, shaders) {
    let DefaultMaterial = class DefaultMaterial extends MaterialFromShader(shaders.DefaultShader) {
        constructor() {
            super(...arguments);
            this.color = Color.white;
            this.mainTexture = builtinTexs.default;
        }
    };
    __decorate([
        shaderProp("uColor", "color")
    ], DefaultMaterial.prototype, "color", void 0);
    __decorate([
        shaderProp("uMainTex", "tex2d")
    ], DefaultMaterial.prototype, "mainTexture", void 0);
    DefaultMaterial = __decorate([
        materialDefine
    ], DefaultMaterial);
    let BlitCopy = class BlitCopy extends MaterialFromShader(shaders.BlitCopy) {
        constructor() {
            super(...arguments);
            this.source = null;
            this.flip = vec2(0, 0);
        }
    };
    __decorate([
        shaderProp("uMainTex", "tex2d")
    ], BlitCopy.prototype, "source", void 0);
    __decorate([
        shaderProp("uFlip", "vec2")
    ], BlitCopy.prototype, "flip", void 0);
    BlitCopy = __decorate([
        materialDefine
    ], BlitCopy);
    let DefaultLit = class DefaultLit extends MaterialFromShader(shaders.DefaultShader) {
        constructor() {
            super(...arguments);
            this.color = Color.white;
            this.mainTexture = builtinTexs.default;
            this.normalTexture = builtinTexs.defaultNormal;
            this.emission = Color.black;
            this.specular = Color.white;
            this.metiallic = 0.023;
            this.smoothness = 0.5;
            this.fresnel = 5;
        }
    };
    __decorate([
        shaderProp("uColor", "color")
    ], DefaultLit.prototype, "color", void 0);
    __decorate([
        shaderProp("uMainTex", "tex2d")
    ], DefaultLit.prototype, "mainTexture", void 0);
    __decorate([
        shaderProp("uNormalTex", "tex2d")
    ], DefaultLit.prototype, "normalTexture", void 0);
    __decorate([
        shaderProp("uEmission", "color")
    ], DefaultLit.prototype, "emission", void 0);
    __decorate([
        shaderProp("uSpecular", "color")
    ], DefaultLit.prototype, "specular", void 0);
    __decorate([
        shaderProp("uMetallic", "float")
    ], DefaultLit.prototype, "metiallic", void 0);
    __decorate([
        shaderProp("uSmoothness", "float")
    ], DefaultLit.prototype, "smoothness", void 0);
    __decorate([
        shaderProp("uFresnel", "float")
    ], DefaultLit.prototype, "fresnel", void 0);
    DefaultLit = __decorate([
        materialDefine
    ], DefaultLit);
    return {
        DefaultMaterial: DefaultMaterial,
        BlitCopy: BlitCopy,
        DefaultLit: DefaultLit,
    };
}
//# sourceMappingURL=materials.js.map
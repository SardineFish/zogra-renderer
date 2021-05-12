var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { RenderTexture, MaterialFromShader, Shader, shaderProp, TextureFormat, Blending, DepthTest } from "zogra-renderer";
import { ShaderSource } from "../../assets";
import { DownsampleBlurRenderer } from "../../utils/blur-renderer";
import { PostProcess } from "./post-process";
class BloomFilterMaterial extends MaterialFromShader(new Shader(...ShaderSource.bloomFilter, {
    depth: DepthTest.Disable,
    zWrite: false,
})) {
    constructor() {
        super(...arguments);
        this.texture = null;
        this.threshold = 1;
        this.softThreshold = 0.5;
    }
}
__decorate([
    shaderProp("uMainTex", "tex2d")
], BloomFilterMaterial.prototype, "texture", void 0);
__decorate([
    shaderProp("uThreshold", "float")
], BloomFilterMaterial.prototype, "threshold", void 0);
__decorate([
    shaderProp("uSoftThreshold", "float")
], BloomFilterMaterial.prototype, "softThreshold", void 0);
class BloomComposeMaterial extends MaterialFromShader(new Shader(...ShaderSource.bloomCompose, {
    blendRGB: [Blending.One, Blending.One],
    blendAlpha: [Blending.Zero, Blending.One],
    depth: DepthTest.Disable,
    zWrite: false,
})) {
    constructor() {
        super(...arguments);
        this.intensity = 1;
    }
}
__decorate([
    shaderProp("uIntensity", "float")
], BloomComposeMaterial.prototype, "intensity", void 0);
export class Bloom extends PostProcess {
    constructor() {
        super(...arguments);
        this.intensity = 1;
        this.blurSteps = 4;
        this.threshold = 1;
        this.softThreshold = 0.25;
        this.materialFilter = new BloomFilterMaterial();
        this.materialCompose = new BloomComposeMaterial();
        this.blurRenderer = new DownsampleBlurRenderer();
        this.filterOutput = null;
    }
    create(context) {
        this.filterOutput = new RenderTexture(context.renderer.canvasSize.x, context.renderer.canvasSize.y, false, TextureFormat.RGBA16F);
        this.blurRenderer.upsampleMaterial.setPipelineStateOverride({
            blend: [Blending.One, Blending.One],
        });
    }
    render(context, src, dst) {
        // this.materialFilter.threshold = this.threshold;
        // this.materialFilter.softThreshold = this.threshold;
        // this.materialFilter.texture = src;
        context.renderer.blit(src, this.filterOutput, this.materialFilter);
        const blurOutput = this.blurRenderer.blur(this.filterOutput, this.blurSteps);
        this.materialCompose.intensity = this.intensity;
        context.renderer.blit(src, dst);
        context.renderer.blit(blurOutput, dst, this.materialCompose);
        // this.materialCompose.intensity = this.intensity;
        // context.renderer.blit(blurOutput, dst, this.materialCompose);
    }
}
//# sourceMappingURL=bloom.js.map
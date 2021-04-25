"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bloom = void 0;
const zogra_renderer_1 = require("zogra-renderer");
const assets_1 = require("../../assets");
const blur_renderer_1 = require("../../utils/blur-renderer");
const post_process_1 = require("./post-process");
class BloomFilterMaterial extends zogra_renderer_1.MaterialFromShader(new zogra_renderer_1.Shader(...assets_1.ShaderSource.bloomFilter, {
    depth: zogra_renderer_1.DepthTest.Disable,
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
    zogra_renderer_1.shaderProp("uMainTex", "tex2d")
], BloomFilterMaterial.prototype, "texture", void 0);
__decorate([
    zogra_renderer_1.shaderProp("uThreshold", "float")
], BloomFilterMaterial.prototype, "threshold", void 0);
__decorate([
    zogra_renderer_1.shaderProp("uSoftThreshold", "float")
], BloomFilterMaterial.prototype, "softThreshold", void 0);
class BloomComposeMaterial extends zogra_renderer_1.MaterialFromShader(new zogra_renderer_1.Shader(...assets_1.ShaderSource.bloomCompose, {
    blendRGB: [zogra_renderer_1.Blending.One, zogra_renderer_1.Blending.One],
    blendAlpha: [zogra_renderer_1.Blending.Zero, zogra_renderer_1.Blending.One],
    depth: zogra_renderer_1.DepthTest.Disable,
    zWrite: false,
})) {
    constructor() {
        super(...arguments);
        this.intensity = 1;
    }
}
__decorate([
    zogra_renderer_1.shaderProp("uIntensity", "float")
], BloomComposeMaterial.prototype, "intensity", void 0);
class Bloom extends post_process_1.PostProcess {
    constructor() {
        super(...arguments);
        this.intensity = 1;
        this.blurSteps = 4;
        this.threshold = 1;
        this.softThreshold = 0.25;
        this.materialFilter = new BloomFilterMaterial();
        this.materialCompose = new BloomComposeMaterial();
        this.blurRenderer = new blur_renderer_1.DownsampleBlurRenderer();
        this.filterOutput = null;
    }
    create(context) {
        this.filterOutput = new zogra_renderer_1.RenderTexture(context.renderer.canvasSize.x, context.renderer.canvasSize.y, false, zogra_renderer_1.TextureFormat.RGBA16F);
        this.blurRenderer.upsampleMaterial.setPipelineStateOverride({
            blend: [zogra_renderer_1.Blending.One, zogra_renderer_1.Blending.One],
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
exports.Bloom = Bloom;
//# sourceMappingURL=bloom.js.map
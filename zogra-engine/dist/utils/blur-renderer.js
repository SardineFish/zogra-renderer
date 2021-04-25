"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DownsampleBlurRenderer = void 0;
const zogra_renderer_1 = require("zogra-renderer");
const assets_1 = require("../assets");
class MaterialBlur extends zogra_renderer_1.MaterialFromShader(new zogra_renderer_1.Shader(...assets_1.ShaderSource.boxBlur)) {
    constructor() {
        super(...arguments);
        this.texture = null;
        this.textureSize = zogra_renderer_1.vec4.one();
        this.sampleOffset = 1;
    }
}
__decorate([
    zogra_renderer_1.shaderProp("uMainTex", "tex2d")
], MaterialBlur.prototype, "texture", void 0);
__decorate([
    zogra_renderer_1.shaderProp("uTexSize", "vec4")
], MaterialBlur.prototype, "textureSize", void 0);
__decorate([
    zogra_renderer_1.shaderProp("uSampleOffset", "float")
], MaterialBlur.prototype, "sampleOffset", void 0);
class DownsampleBlurRenderer {
    constructor() {
        this.steps = [];
        this.downsampleMaterial = new MaterialBlur();
        this.upsampleMaterial = new MaterialBlur();
    }
    init(texture) {
        if (!this.steps[0]) {
            this.steps[0] = new zogra_renderer_1.RenderTexture(texture.width, texture.height, false, texture.format, texture.filterMode);
            this.steps[0].wrapMode = zogra_renderer_1.WrapMode.Clamp;
            this.steps[0].updateParameters();
        }
        if (this.steps[0].width !== texture.width || this.steps[0].height !== texture.height)
            this.steps[0].resize(texture.width, texture.height, zogra_renderer_1.TextureResizing.Discard);
    }
    blur(texture, iteration = 4, output = this.steps[0], ctx = zogra_renderer_1.GlobalContext()) {
        if (!this.steps[0])
            this.steps[0] = new zogra_renderer_1.RenderTexture(texture.width, texture.height, false, texture.format, texture.filterMode);
        output = output || this.steps[0];
        ctx.renderer.setFramebuffer(output);
        ctx.renderer.clear(zogra_renderer_1.Color.black);
        if (this.steps[0].width !== texture.width || this.steps[0].height !== texture.height)
            this.steps[0].resize(texture.width, texture.height, zogra_renderer_1.TextureResizing.Discard);
        this.downSample(ctx.renderer, texture, iteration);
        return this.upSample(ctx.renderer, iteration, output);
    }
    downSample(renderer, input, iteration) {
        for (let i = 1; i <= iteration; i++) {
            const downSize = zogra_renderer_1.vec2.floor(zogra_renderer_1.div(input.size, zogra_renderer_1.vec2(2)));
            if (!this.steps[i]) {
                this.steps[i] = new zogra_renderer_1.RenderTexture(downSize.x, downSize.y, false, zogra_renderer_1.TextureFormat.RGBA, zogra_renderer_1.FilterMode.Linear);
                this.steps[i].wrapMode = zogra_renderer_1.WrapMode.Clamp;
                this.steps[i].updateParameters();
            }
            const output = this.steps[i];
            if (output.width !== downSize.x || output.height !== downSize.y)
                output.resize(downSize.x, downSize.y, zogra_renderer_1.TextureResizing.Discard);
            this.downsampleMaterial.texture = input;
            this.downsampleMaterial.textureSize = zogra_renderer_1.vec4(input.width, input.height, 1 / input.width, 1 / input.height);
            this.downsampleMaterial.sampleOffset = 1;
            renderer.blit(input, output, this.downsampleMaterial);
            input = output;
        }
    }
    upSample(renderer, iteration, finalOutput = this.steps[0]) {
        let input = this.steps[iteration];
        for (let i = iteration - 1; i >= 0; i--) {
            const upSize = zogra_renderer_1.mul(input.size, zogra_renderer_1.vec2(2));
            if (!this.steps[i]) {
                this.steps[i] = new zogra_renderer_1.RenderTexture(upSize.x, upSize.y, false, zogra_renderer_1.TextureFormat.RGBA, zogra_renderer_1.FilterMode.Linear);
                this.steps[i].wrapMode = zogra_renderer_1.WrapMode.Clamp;
                this.steps[i].updateParameters();
            }
            const output = i === 0 ? finalOutput : this.steps[i];
            this.upsampleMaterial.texture = input;
            this.upsampleMaterial.textureSize = zogra_renderer_1.vec4(input.width, input.height, 1 / input.width, 1 / input.height);
            this.upsampleMaterial.sampleOffset = 0.5;
            renderer.blit(input, output, this.upsampleMaterial);
            input = output;
        }
        return input;
    }
}
exports.DownsampleBlurRenderer = DownsampleBlurRenderer;
//# sourceMappingURL=blur-renderer.js.map
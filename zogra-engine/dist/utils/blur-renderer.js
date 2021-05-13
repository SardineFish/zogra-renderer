var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { div, FilterMode, MaterialFromShader, mul, RenderTexture, Shader, shaderProp, TextureResizing, vec2, vec4, WrapMode, TextureFormat, GlobalContext, Color } from "zogra-renderer";
import { ShaderSource } from "../assets";
class MaterialBlur extends MaterialFromShader(new Shader(...ShaderSource.boxBlur)) {
    constructor() {
        super(...arguments);
        this.texture = null;
        this.textureSize = vec4.one();
        this.sampleOffset = 1;
    }
}
__decorate([
    shaderProp("uMainTex", "tex2d")
], MaterialBlur.prototype, "texture", void 0);
__decorate([
    shaderProp("uTexSize", "vec4")
], MaterialBlur.prototype, "textureSize", void 0);
__decorate([
    shaderProp("uSampleOffset", "float")
], MaterialBlur.prototype, "sampleOffset", void 0);
export class DownsampleBlurRenderer {
    constructor() {
        this.steps = [];
        this.downsampleMaterial = new MaterialBlur();
        this.upsampleMaterial = new MaterialBlur();
    }
    init(texture) {
        if (!this.steps[0]) {
            this.steps[0] = new RenderTexture(texture.width, texture.height, false, texture.format, texture.filterMode);
            this.steps[0].wrapMode = WrapMode.Clamp;
            this.steps[0].updateParameters();
        }
        if (this.steps[0].width !== texture.width || this.steps[0].height !== texture.height)
            this.steps[0].resize(texture.width, texture.height, TextureResizing.Discard);
    }
    blur(texture, iteration = 4, output = this.steps[0], ctx = GlobalContext()) {
        if (output == this.steps[0]) {
            if (!this.steps[0])
                this.steps[0] = new RenderTexture(texture.width, texture.height, false, texture.format, texture.filterMode);
            this.init(texture);
            output = this.steps[0];
        }
        ctx.renderer.setFramebuffer(output);
        ctx.renderer.clear(Color.black);
        this.downSample(ctx.renderer, texture, iteration);
        return this.upSample(ctx.renderer, iteration, output);
    }
    downSample(renderer, input, iteration) {
        for (let i = 1; i <= iteration; i++) {
            const downSize = vec2.floor(div(input.size, vec2(2)));
            if (!this.steps[i]) {
                this.steps[i] = new RenderTexture(downSize.x, downSize.y, false, TextureFormat.RGBA, FilterMode.Linear);
                this.steps[i].wrapMode = WrapMode.Clamp;
                this.steps[i].updateParameters();
            }
            const output = this.steps[i];
            if (output.width !== downSize.x || output.height !== downSize.y)
                output.resize(downSize.x, downSize.y, TextureResizing.Discard);
            this.downsampleMaterial.texture = input;
            this.downsampleMaterial.textureSize = vec4(input.width, input.height, 1 / input.width, 1 / input.height);
            this.downsampleMaterial.sampleOffset = 1;
            renderer.blit(input, output, this.downsampleMaterial);
            input = output;
        }
    }
    upSample(renderer, iteration, finalOutput = this.steps[0]) {
        let input = this.steps[iteration];
        for (let i = iteration - 1; i >= 0; i--) {
            const upSize = mul(input.size, vec2(2));
            if (!this.steps[i]) {
                this.steps[i] = new RenderTexture(upSize.x, upSize.y, false, TextureFormat.RGBA, FilterMode.Linear);
                this.steps[i].wrapMode = WrapMode.Clamp;
                this.steps[i].updateParameters();
            }
            const output = i === 0 ? finalOutput : this.steps[i];
            this.upsampleMaterial.texture = input;
            this.upsampleMaterial.textureSize = vec4(input.width, input.height, 1 / input.width, 1 / input.height);
            this.upsampleMaterial.sampleOffset = 0.5;
            renderer.blit(input, output, this.upsampleMaterial);
            input = output;
        }
        return input;
    }
}
//# sourceMappingURL=blur-renderer.js.map
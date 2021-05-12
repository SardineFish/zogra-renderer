import { RenderTexture, FrameBuffer, Material, MaterialFromShader, Shader, shaderProp, Texture, TextureFormat, Blending, DepthTest, ZograRenderer, vec2, div, WrapMode, TextureResizing, FilterMode, vec4 } from "zogra-renderer";
import { ShaderSource } from "../../assets";
import { DownsampleBlurRenderer } from "../../utils/blur-renderer";
import { RenderContext } from "../render-pipeline";
import { PostProcess } from "./post-process";

class BloomFilterMaterial extends MaterialFromShader(new Shader(...ShaderSource.bloomFilter, {
    depth: DepthTest.Disable,
    zWrite: false,
}))
{
    @shaderProp("uMainTex", "tex2d")
    texture: Texture | null = null;
    @shaderProp("uThreshold", "float")
    threshold: number = 1;
    @shaderProp("uSoftThreshold", "float")
    softThreshold: number = 0.5;
}

class BloomComposeMaterial extends MaterialFromShader(new Shader(...ShaderSource.bloomCompose, {
    blendRGB: [Blending.One, Blending.One],
    blendAlpha: [Blending.Zero, Blending.One],
    depth: DepthTest.Disable,
    zWrite: false,
}))
{
    @shaderProp("uIntensity", "float")
    intensity: number = 1;
}

export class Bloom extends PostProcess
{
    intensity: number = 1;
    blurSteps: number = 4;
    threshold: number = 1;
    softThreshold: number = 0.25;

    private materialFilter = new BloomFilterMaterial();
    private materialCompose = new BloomComposeMaterial();
    private blurRenderer = new DownsampleBlurRenderer();
    private filterOutput: RenderTexture = null as any;

    create(context: RenderContext)
    {
        this.filterOutput = new RenderTexture(
            context.renderer.canvasSize.x,
            context.renderer.canvasSize.y,
            false,
            TextureFormat.RGBA16F
        );
        this.blurRenderer.upsampleMaterial.setPipelineStateOverride({
            blend: [Blending.One, Blending.One],
        })
    }

    render(context: RenderContext, src: RenderTexture, dst: FrameBuffer): void
    {
        if (!src.size.equals(this.filterOutput.size))
            this.filterOutput.resize(src.width, src.height, TextureResizing.Discard);
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
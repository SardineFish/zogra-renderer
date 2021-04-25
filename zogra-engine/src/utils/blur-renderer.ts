import { div, FilterMode, MaterialFromShader, mul, RenderTexture, Shader, shaderProp, Texture, Texture2D, TextureResizing, vec2, vec4, WrapMode, ZograRenderer, TextureFormat, GlobalContext, Color } from "zogra-renderer";
import { ShaderSource } from "../assets";


class MaterialBlur extends MaterialFromShader(new Shader(...ShaderSource.boxBlur))
{
    @shaderProp("uMainTex", "tex2d")
    texture: Texture | null = null;

    @shaderProp("uTexSize", "vec4")
    textureSize: vec4 = vec4.one();

    @shaderProp("uSampleOffset", "float")
    sampleOffset: number = 1;
}

export class DownsampleBlurRenderer
{
    steps: RenderTexture[] = [];
    downsampleMaterial = new MaterialBlur();
    upsampleMaterial = new MaterialBlur();

    init(texture: Texture)
    {
        if (!this.steps[0])
        {
            this.steps[0] = new RenderTexture(texture.width, texture.height, false, texture.format, texture.filterMode);
            this.steps[0].wrapMode = WrapMode.Clamp;
            this.steps[0].updateParameters();
        }
        if (this.steps[0].width !== texture.width || this.steps[0].height !== texture.height)
            this.steps[0].resize(texture.width, texture.height, TextureResizing.Discard);
    }

    blur(texture: Texture, iteration: number = 4, output = this.steps[0], ctx = GlobalContext())
    {
        if (!this.steps[0])
            this.steps[0] = new RenderTexture(texture.width, texture.height, false, texture.format, texture.filterMode);
        output = output || this.steps[0];

        ctx.renderer.setFramebuffer(output);
        ctx.renderer.clear(Color.black);

        if (this.steps[0].width !== texture.width || this.steps[0].height !== texture.height)
            this.steps[0].resize(texture.width, texture.height, TextureResizing.Discard);

        this.downSample(ctx.renderer, texture, iteration);

        return this.upSample(ctx.renderer, iteration, output);
    }

    downSample(renderer: ZograRenderer, input: Texture, iteration: number)
    {
        for (let i = 1; i <= iteration; i++)
        {
            const downSize = vec2.floor(div(input.size, vec2(2)));
            if (!this.steps[i])
            {
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

    upSample(renderer: ZograRenderer, iteration: number, finalOutput = this.steps[0])
    {
        let input = this.steps[iteration];
        for (let i = iteration - 1; i >= 0; i--)
        {
            const upSize = mul(input.size, vec2(2));
            if (!this.steps[i])
            {
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
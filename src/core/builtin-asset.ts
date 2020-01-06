import { ShaderAttributes, Shader } from "./shader";
import { MaterialFromShader, shaderProp, Material } from "./material";
import { Color } from "../types/color";
import { GL, GLContext, GlobalContext } from "./global";
import { DefaultMaterialType } from "./material-type";
import { Texture2D, FilterMode, WrapMode } from "./texture";
import { panic } from "../utils/util";
import { TextureFormat } from "./texture-format";


const DefaultVert = `

`;
const DefaultFrag = `
`;


const DefaultShaderAttributes: ShaderAttributes =
{
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

export const DefaultShaderResources = {
    vertShader: DefaultVert,
    fragShader: DefaultFrag,
    attributes: DefaultShaderAttributes,
    uniforms: TransformUniforms
};

export function makeDefaultMateiral(gl: WebGL2RenderingContext): typeof DefaultMaterialType
{
    const shader = new Shader(DefaultVert, DefaultFrag, DefaultShaderAttributes, gl);

    class DefaultMaterial extends MaterialFromShader(shader)
    {
        @shaderProp("u_Color", "color")
        color: Color = Color.white;
    };

    return DefaultMaterial;
}

const assetsMap = new Map<WebGL2RenderingContext, BuiltinAssets>();

export function GlobalAssets(ctx: GLContext = GlobalContext())
{
    return assetsMap.get(ctx.gl);
}

export function initGlobalAssets(ctx: GLContext)
{
    assetsMap.set(ctx.gl, new BuiltinAssets(ctx.gl));
}

class BuiltinAssets
{
    gl: WebGL2RenderingContext;
    DefaultMaterial: typeof DefaultMaterialType;
    defaultTexture: Texture2D;
    constructor(gl: WebGL2RenderingContext)
    {
        this.gl = gl;
        this.DefaultMaterial = null as any;// makeDefaultMateiral(gl);
        this.defaultTexture = new Texture2D(0, 0, TextureFormat.RGBA, FilterMode.Nearest, gl);
        this.defaultTexture.wrapMode = WrapMode.Repeat;
        this.defaultTexture.setData(makeDefaultTexture());
    }
}

function makeDefaultTexture()
{
    const size = 64;
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext("2d") ?? panic("Failed to create default texture.");
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = "cyan";
    ctx.fillRect(0, 0, size / 2, size / 2);
    ctx.fillRect(size / 2, size / 2, size / 2, size / 2);

    return canvas;
}
import { ShaderAttributes, Shader } from "./shader";
import { MaterialFromShader, shaderProp, Material } from "./material";
import { Color } from "./types/color";
import { GL } from "./global";
import { DefaultMaterialType } from "./material-type";


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
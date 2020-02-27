import { Shader, Blending, DepthTest, Culling } from "zogra-renderer";
import glslVert from "./vert.glsl";
import glslColor from "./color.glsl";
import glslRotationTool from "./rotation-tool.glsl";
import glslPBRLit from "./pbr-lit.glsl"


export function createEditorShaders()
{

    const shaderTools = new Shader(glslVert, glslColor, {
        blend: [Blending.SrcAlpha, Blending.OneMinusSrcAlpha],
        depth: DepthTest.Disable,
        zWrite: false,
        cull: Culling.Disable
    });
    const shaderRotationTool = new Shader(glslVert, glslRotationTool, {
        blend: [Blending.SrcAlpha, Blending.OneMinusSrcAlpha],
        depth: DepthTest.Disable,
        zWrite: false,
        cull: Culling.Disable
    });
    const pbrLit = new Shader(glslVert, glslPBRLit, {
        name: "DefaultLit",
        cull: Culling.Back
    });

    return {
        tools: shaderTools,
        color: shaderTools,
        rotationTool: shaderRotationTool,
        defaultLit: pbrLit,
    };

}
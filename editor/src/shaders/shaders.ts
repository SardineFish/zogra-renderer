import { Shader, Blending, DepthTest, Culling } from "zogra-renderer";
import glslVert from "./vert.glsl";
import glslColor from "./color.glsl";


export function createEditorShaders()
{

    const shaderTools = new Shader(glslVert, glslColor, {
        blend: [Blending.SrcAlpha, Blending.OneMinusSrcAlpha],
        depth: DepthTest.Disable,
        zWrite: false,
        cull: Culling.Disable
    });

    return {
        tools: shaderTools,
        color: shaderTools,
    };

}
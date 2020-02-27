import { ZograEditor } from "./zogra-editor";
import { ZograEngine, plugins, Entity, vec3, Scene, materialDefine, MaterialFromShader, shaderProp, Color, Texture } from "zogra-renderer";

export function initExampleAssets(editor: ZograEditor)
{
    @materialDefine
    class DefaultLit extends MaterialFromShader(editor.assets.internal.shaders.defaultLit)
    {
        @shaderProp("uColor", "color")
        color: Color = Color.white;
        @shaderProp("uMainTex", "tex2d")
        mainTexture: Texture | null = editor.engine.renderer.assets.textures.default;
        @shaderProp("uNormalTex", "tex2d")
        normalTexture: Texture = editor.engine.renderer.assets.textures.defaultNormal;
        @shaderProp("uEmission", "color")
        emission: Color = Color.black;
        @shaderProp("uSpecular", "color")
        specular: Color = Color.white;
        @shaderProp("uMetallic", "float")
        metiallic: number = 0.023;
        @shaderProp("uSmoothness", "float")
        smoothness: number = 0.5;
        @shaderProp("uFresnel", "float")
        fresnel: number = 5;
    }

    return { DefaultLit };
}
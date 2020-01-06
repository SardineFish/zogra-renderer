import { ShaderAttributes } from "./shader";
import { GLContext } from "./global";
import { DefaultMaterialType } from "./material-type";
import { Texture2D } from "./texture";
export declare const DefaultShaderResources: {
    vertShader: string;
    fragShader: string;
    attributes: ShaderAttributes;
    uniforms: {
        matM: string;
        matVP: string;
        matMVP: string;
    };
};
export declare function makeDefaultMateiral(gl: WebGL2RenderingContext): typeof DefaultMaterialType;
export declare function GlobalAssets(ctx?: GLContext): BuiltinAssets | undefined;
export declare function initGlobalAssets(ctx: GLContext): void;
declare class BuiltinAssets {
    gl: WebGL2RenderingContext;
    DefaultMaterial: typeof DefaultMaterialType;
    defaultTexture: Texture2D;
    constructor(gl: WebGL2RenderingContext);
}
export {};

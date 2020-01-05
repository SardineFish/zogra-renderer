import { ShaderAttributes } from "./shader";
import { DefaultMaterialType } from "./material-type";
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

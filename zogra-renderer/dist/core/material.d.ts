import { Shader } from "./shader";
import "reflect-metadata";
import { MaterialType, SimpleTexturedMaterialClass } from "./material-type";
import "reflect-metadata";
import { BindingData, NumericUnifromTypes, TextureUniformTypes, UniformValueType } from "./types";
import { UniformType } from "./types";
import { Asset } from "./asset";
interface FieldProperty {
    key: string;
    value?: never;
}
interface DynamicProperty<T extends UniformType> {
    key?: never;
    value: UniformValueType<T>;
}
declare type PropertyReference<T extends UniformType> = FieldProperty | DynamicProperty<T>;
declare type NumericProperty<T extends NumericUnifromTypes> = PropertyReference<T> & {
    type: T;
    location: WebGLUniformLocation | null;
    uploaded?: UniformValueType<T>;
};
declare type TextureProperty<T extends TextureUniformTypes> = PropertyReference<T> & {
    type: T;
    location: WebGLUniformLocation | null;
    textureUnit: number;
    uploaded?: UniformValueType<T> | null;
    uniformSet?: true;
};
declare type PropertyInfo = NumericProperty<NumericUnifromTypes> | TextureProperty<TextureUniformTypes>;
export interface MaterialProperties {
    [uniformName: string]: PropertyInfo;
}
export declare class Material extends Asset {
    [key: string]: any;
    private _shader;
    properties: MaterialProperties;
    gl: WebGL2RenderingContext;
    private textureCount;
    protected initialized: boolean;
    constructor(shader: Shader, gl?: WebGL2RenderingContext);
    get shader(): Shader<import("./mesh").DefaultVertexStruct>;
    upload(data: BindingData): void;
    setProp<T extends UniformType>(uniformName: string, type: T, value: Readonly<UniformValueType<T>>): void;
    /**
     * Unbind all render textures from active texture slot due to avoid
     * 'Feedback loop formed between Framebuffer and active Texture' in chrome since version 83
     */
    unbindRenderTextures(): void;
    protected tryInit(required?: boolean): boolean;
    setUniformDirectly<T extends UniformType>(uniformName: string, type: T, value: UniformValueType<T>): void;
    private getOrCreatePropInfo;
    private uploadUniform;
}
export declare function shaderProp(name: string, type: UniformType): {
    (target: Function): void;
    (target: Object, propertyKey: string | symbol): void;
};
export declare function MaterialFromShader(shader: Shader): typeof MaterialType;
export declare function SimpleTexturedMaterial(shader: Shader): typeof SimpleTexturedMaterialClass;
/**
 *
 * @deprecated
 */
export declare function materialDefine<T extends {
    new (...arg: any[]): Material;
}>(constructor: T): T;
export {};

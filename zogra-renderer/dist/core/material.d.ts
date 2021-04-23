import { Shader } from "./shader";
import "reflect-metadata";
import { MaterialType, SimpleTexturedMaterialClass } from "./material-type";
import "reflect-metadata";
import { BindingData, NumericUniformArrayTypes, NumericUnifromTypes, TextureArrayUniformTypes, TextureUniformTypes, UniformValueType } from "./types";
import { UniformType } from "./types";
import { Asset } from "./asset";
declare type UniformPropertyStorageType<T extends UniformType> = T extends TextureUniformTypes | NumericUnifromTypes ? UniformValueType<T> : T extends NumericUniformArrayTypes ? Float32Array : never;
interface FieldProperty {
    key: string;
    value?: never;
}
interface DynamicProperty<T extends UniformType> {
    key?: never;
    value: UniformValueType<T>;
}
declare type PropertyReference<T extends UniformType> = FieldProperty | DynamicProperty<T>;
declare type PropertyBase<T extends UniformType> = PropertyReference<T> & {
    type: T;
    location: WebGLUniformLocation | null;
};
declare type NumericProperty<T extends NumericUnifromTypes> = PropertyBase<T> & {
    uploaded?: UniformPropertyStorageType<T>;
};
declare type VectorArrayProperty<T extends NumericUniformArrayTypes> = PropertyBase<T> & {
    uploaded?: UniformValueType<T>;
    buffer: Float32Array;
};
declare type TextureProperty<T extends TextureUniformTypes> = PropertyBase<T> & {
    uploaded?: number;
};
declare type TextureArrayProperty<T extends TextureArrayUniformTypes> = PropertyBase<T> & {
    uploaded?: number[];
};
declare type PropertyInfo<T extends UniformType = UniformType> = T extends NumericUnifromTypes ? NumericProperty<T> : T extends NumericUniformArrayTypes ? VectorArrayProperty<T> : T extends TextureUniformTypes ? TextureProperty<T> : T extends TextureArrayUniformTypes ? TextureArrayProperty<T> : never;
export interface MaterialProperties {
    [uniformName: string]: PropertyInfo;
}
export declare class Material extends Asset {
    [key: string]: any;
    private _shader;
    properties: MaterialProperties;
    gl: WebGL2RenderingContext;
    private textureCount;
    private boundTextures;
    protected initialized: boolean;
    constructor(shader: Shader, gl?: WebGL2RenderingContext);
    get shader(): Shader<import("./mesh").DefaultVertexStruct>;
    upload(data: BindingData): void;
    setProp<T extends UniformType>(uniformName: string, type: T, value: UniformValueType<T>): void;
    /**
     * Unbind all render textures from active texture slot due to avoid
     * 'Feedback loop formed between Framebuffer and active Texture' in chrome since version 83
     */
    unbindRenderTextures(): void;
    protected tryInit(required?: boolean): boolean;
    setUniformDirectly<T extends UniformType>(uniformName: string, type: T, value: UniformValueType<T>): void;
    private getOrCreatePropInfo;
    private uploadUniform;
    private bindNextTexture;
    private setVectorUniformBuffer;
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

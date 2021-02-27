"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.materialDefine = exports.SimpleTexturedMaterial = exports.MaterialFromShader = exports.shaderProp = exports.Material = void 0;
const color_1 = require("../types/color");
require("reflect-metadata");
const global_1 = require("./global");
require("reflect-metadata");
const texture_1 = require("./texture");
const asset_1 = require("./asset");
const shaders_1 = require("../builtin-assets/shaders");
/**
 * Inicate where to get the value from material
 */
var ValueReference;
(function (ValueReference) {
    ValueReference[ValueReference["Field"] = 0] = "Field";
    ValueReference[ValueReference["Dynamic"] = 1] = "Dynamic";
})(ValueReference || (ValueReference = {}));
// export type MaterialProperties = Map<string, NumericProperty<NumericUnifromTypes> | TextureProperty<TextureUniformTypes>>;
class Material extends asset_1.Asset {
    constructor(shader, gl = global_1.GL()) {
        super();
        this.properties = {};
        this.textureCount = 0;
        this.initialized = false;
        this.name = `Material_${this.assetID}`;
        this.gl = gl;
        this._shader = shader;
    }
    get shader() { return this._shader; }
    // set shader(value)
    // {
    //     const gl = this.gl;
    //     if (value != this._shader)
    //     {
    //         this._shader = value;
    //         for (const uniformName in this.properties)
    //         {
    //             const loc = this._shader.uniformLocation(uniformName);
    //             this.properties[uniformName].location = loc;
    //         }
    //     }
    // }
    upload(data) {
        this.tryInit(true);
        for (const uniformName in this.properties) {
            const prop = this.properties[uniformName];
            const value = prop.key
                ? this[prop.key]
                : prop.value;
            this.uploadUniform(prop, value);
        }
    }
    // setProp<T extends UniformType>(key: string, uniformName: string, type: T, value: UniformValueType<T>): void
    // setProp<T extends UniformType>(name: string, type: T, value: UniformValueType<T>): void
    setProp(uniformName, type, value) {
        this.tryInit(true);
        const prop = this.getOrCreatePropInfo(uniformName, type);
        if (type !== prop.type) {
            console.warn("Uniform type missmatch");
            return;
        }
        if (prop.key)
            this[prop.key] = value;
        else
            prop.value = value;
    }
    /**
     * Unbind all render textures from active texture slot due to avoid
     * 'Feedback loop formed between Framebuffer and active Texture' in chrome since version 83
     */
    unbindRenderTextures() {
        this.tryInit(true);
        const gl = this.gl;
        for (const uniformName in this.properties) {
            const prop = this.properties[uniformName];
            if (prop.uploaded instanceof texture_1.RenderTexture) {
                prop.uploaded.unbind(prop.textureUnit);
                prop.uploaded = null;
            }
        }
    }
    tryInit(required = false) {
        if (this.initialized)
            return true;
        const gl = this.gl || global_1.GL();
        if (!gl) {
            if (required)
                throw new Error("Failed to intialize material without global GL context");
            return false;
        }
        this.gl = gl;
        for (const key in this) {
            const propInfo = getShaderProp(this, key);
            if (!propInfo)
                continue;
            const prop = this.getOrCreatePropInfo(propInfo.name, propInfo.type);
            prop.key = key;
        }
        this.initialized = true;
        return true;
    }
    setUniformDirectly(uniformName, type, value) {
        this.tryInit(true);
        const prop = this.getOrCreatePropInfo(uniformName, type);
        if (!prop.location)
            return;
        this.uploadUniform(prop, value);
    }
    getOrCreatePropInfo(uniformName, type) {
        let prop = this.properties[uniformName];
        if (prop)
            return prop;
        switch (type) {
            case "tex2d":
                prop = {
                    type: type,
                    uploaded: undefined,
                    location: this.shader.uniformLocation(uniformName),
                    textureUnit: this.textureCount++,
                };
                break;
            default:
                prop = {
                    type: type,
                    location: this.shader.uniformLocation(uniformName),
                    uploaded: undefined,
                };
        }
        this.properties[uniformName] = prop;
        return prop;
    }
    uploadUniform(prop, value) {
        const gl = this.gl;
        const ctx = global_1.GlobalContext();
        if (!prop.location)
            return false;
        let dirty = false;
        if (prop.uploaded === null && value === null)
            return false;
        // switch (prop.type)
        // {
        //     case "tex2d":
        //     case "float":
        //     case "int":
        //         dirty = prop.uploaded !== value;
        //         break;
        //     case "mat4":
        //         dirty = !mat4.exactEquals(prop.uploaded as mat4, value as mat4);
        //         break;
        //     default:
        //         dirty = !(prop.uploaded as Vector).equals(value);
        //         break;
        // }
        // if (!dirty)
        //     return false;
        switch (prop.type) {
            case "float":
                gl.uniform1f(prop.location, value);
                break;
            case "vec2":
                gl.uniform2fv(prop.location, value);
                break;
            case "vec3":
                gl.uniform3fv(prop.location, value);
                break;
            case "vec4":
                gl.uniform4fv(prop.location, value);
                break;
            case "color":
                gl.uniform4fv(prop.location, value);
                break;
            case "mat4":
                gl.uniformMatrix4fv(prop.location, false, value);
                break;
            case "tex2d":
                // Update texture to texture unit instead of update uniform1i
                // Due to performance issue mentioned in https://www.khronos.org/registry/webgl/specs/latest/1.0/#5.14.10
                value = value || ctx.renderer.assets.textures.default;
                value.bind(prop.textureUnit);
                if (!prop.uniformSet) {
                    gl.uniform1i(prop.location, prop.textureUnit);
                    prop.uniformSet = true;
                }
                break;
        }
        prop.uploaded = value;
    }
}
exports.Material = Material;
const shaderPropMetaKey = Symbol("shaderProp");
function shaderProp(name, type) {
    return Reflect.metadata(shaderPropMetaKey, { name: name, type: type });
}
exports.shaderProp = shaderProp;
function getShaderProp(target, propKey) {
    return Reflect.getMetadata(shaderPropMetaKey, target, propKey);
}
function MaterialFromShader(shader) {
    return class Mat extends Material {
        constructor(gl = global_1.GL()) {
            super(shader, gl);
        }
    };
}
exports.MaterialFromShader = MaterialFromShader;
function SimpleTexturedMaterial(shader) {
    class Mat extends MaterialFromShader(shader) {
        constructor() {
            super(...arguments);
            this.texture = null;
            this.color = new color_1.Color(1, 1, 1, 1);
        }
    }
    __decorate([
        shaderProp(shaders_1.BuiltinUniformNames.mainTex, "tex2d")
    ], Mat.prototype, "texture", void 0);
    __decorate([
        shaderProp(shaders_1.BuiltinUniformNames.color, "color")
    ], Mat.prototype, "color", void 0);
    return Mat;
}
exports.SimpleTexturedMaterial = SimpleTexturedMaterial;
/**
 *
 * @deprecated
 */
function materialDefine(constructor) {
    return class extends constructor {
        constructor(...arg) {
            super(...arg);
        }
    };
}
exports.materialDefine = materialDefine;
//# sourceMappingURL=material.js.map
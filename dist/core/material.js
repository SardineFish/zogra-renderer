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
    setup(data) {
        this.tryInit(true);
        const gl = data.gl;
        for (const uniformName in this.properties) {
            this.setUniform(uniformName);
        }
    }
    // setProp<T extends UniformType>(key: string, uniformName: string, type: T, value: UniformValueType<T>): void
    // setProp<T extends UniformType>(name: string, type: T, value: UniformValueType<T>): void
    setProp(uniformName, type, value) {
        this.tryInit(true);
        let prop = this.properties[uniformName];
        if (!prop) {
            // console.log("set new prop");
            switch (type) {
                case "tex2d":
                    this.properties[uniformName] = {
                        type: type,
                        textureUnit: this.textureCount++,
                        location: undefined,
                        uploaded: undefined,
                        value: value
                    };
                    break;
                default:
                    this.properties[uniformName] = {
                        type: type,
                        location: undefined,
                        uploaded: undefined,
                        value: value
                    };
            }
            return;
        }
        if (prop.key) {
            this[prop.key] = value;
        }
        else {
            prop.value = value;
        }
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
        const shader = this.shader;
        const properties = this.properties;
        // shader.use();
        for (const key in this) {
            const prop = getShaderProp(this, key);
            if (!prop)
                continue;
            const loc = shader.uniformLocation(prop === null || prop === void 0 ? void 0 : prop.name);
            if (!loc)
                continue;
            switch (prop.type) {
                case "tex2d":
                    properties[prop.name] = {
                        type: prop.type,
                        uploaded: undefined,
                        key: key,
                        location: loc,
                        textureUnit: this.textureCount++,
                    };
                    break;
                default:
                    properties[prop.name] = {
                        type: prop.type,
                        location: loc,
                        uploaded: undefined,
                        key: key
                    };
            }
        }
        this.properties = properties;
        this.initialized = true;
        return true;
    }
    setUniform(uniformName) {
        const prop = this.properties[uniformName];
        const gl = this.gl;
        const ctx = global_1.GlobalContext();
        if (prop.location === undefined) {
            // this.shader.use();
            prop.location = this.shader.uniformLocation(uniformName);
        }
        if (!prop.location)
            return false;
        let value = (prop.key
            ? this[prop.key]
            : prop.value);
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
    let Mat = class Mat extends MaterialFromShader(shader) {
        constructor() {
            super(...arguments);
            this.texture = null;
            this.color = new color_1.Color(1, 1, 1, 1);
        }
    };
    __decorate([
        shaderProp(shaders_1.BuiltinUniformNames.mainTex, "tex2d")
    ], Mat.prototype, "texture", void 0);
    __decorate([
        shaderProp(shaders_1.BuiltinUniformNames.color, "color")
    ], Mat.prototype, "color", void 0);
    Mat = __decorate([
        materialDefine
    ], Mat);
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
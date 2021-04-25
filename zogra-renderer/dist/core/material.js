"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.materialDefine = exports.SimpleTexturedMaterial = exports.MaterialFromShader = exports.shaderProp = exports.Material = void 0;
const shader_1 = require("./shader");
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
        this.boundTextures = [];
        this.initialized = false;
        this.name = `Material_${this.assetID}`;
        this.gl = gl;
        this._shader = shader;
        this.pipelineStateOverride = Object.assign({}, shader.pipelineStates);
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
        this.setupPipelineStateOverride();
        for (const uniformName in this.properties) {
            const prop = this.properties[uniformName];
            const value = prop.key
                ? this[prop.key]
                : prop.value;
            if (value !== undefined)
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
        for (let unit = 0; unit < this.boundTextures.length; unit++) {
            const texture = this.boundTextures[unit];
            if (texture instanceof texture_1.RenderTexture) {
                texture.unbind(unit);
            }
        }
        this.boundTextures.length = 0;
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
        if (value === undefined)
            throw new Error("");
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
        if (type === "tex2d") {
            prop = {
                type: type,
                value: undefined,
                uploaed: undefined,
                location: this.shader.uniformLocation(uniformName),
            };
        }
        else if (type === "tex2d[]") {
            prop = {
                type: type,
                value: undefined,
                uploaded: undefined,
                location: this.shader.uniformLocation(uniformName),
                buffer: new Array(),
            };
        }
        else if (type.endsWith("[]"))
            prop = {
                type: type,
                value: undefined,
                uploaded: undefined,
                location: this.shader.uniformLocation(uniformName),
                buffer: new Float32Array(),
            };
        else {
            prop = {
                type: type,
                value: undefined,
                uploaded: undefined,
                location: this.shader.uniformLocation(uniformName),
            };
        }
        this.properties[uniformName] = prop;
        return prop;
    }
    setPipelineStateOverride(settings) {
        let blend = false;
        let blendRGB = [shader_1.Blending.One, shader_1.Blending.Zero];
        let blendAlpha = [shader_1.Blending.One, shader_1.Blending.OneMinusSrcAlpha];
        if (typeof (settings.blend) === "number" && settings.blend !== shader_1.Blending.Disable) {
            blend = true;
            blendRGB = [settings.blend, settings.blend];
            blendAlpha = [settings.blend, settings.blend];
        }
        else if (settings.blend instanceof Array) {
            blend = true;
            blendRGB = settings.blend;
        }
        if (settings.blendRGB) {
            blend = settings.blend !== false && settings.blend !== shader_1.Blending.Disable;
            blendRGB = settings.blendRGB;
        }
        if (settings.blendAlpha) {
            blend = settings.blend !== false && settings.blend !== shader_1.Blending.Disable;
            blendAlpha = settings.blendAlpha;
        }
        this.pipelineStateOverride = {
            depth: settings.depth || shader_1.DepthTest.Less,
            blend,
            blendRGB,
            blendAlpha,
            zWrite: settings.zWrite === false ? false : true,
            cull: settings.cull || shader_1.Culling.Back
        };
    }
    setupPipelineStateOverride() {
        const gl = this.gl;
        if (this.pipelineStateOverride.depth === shader_1.DepthTest.Disable)
            gl.disable(gl.DEPTH_TEST);
        else {
            gl.enable(gl.DEPTH_TEST);
            gl.depthMask(this.pipelineStateOverride.zWrite);
            gl.depthFunc(this.pipelineStateOverride.depth);
        }
        if (!this.pipelineStateOverride.blend)
            gl.disable(gl.BLEND);
        else {
            const [srcRGB, dstRGB] = this.pipelineStateOverride.blendRGB;
            const [srcAlpha, dstAlpha] = this.pipelineStateOverride.blendAlpha;
            gl.enable(gl.BLEND);
            gl.blendFuncSeparate(srcRGB, dstRGB, srcAlpha, dstAlpha);
        }
        if (this.pipelineStateOverride.cull === shader_1.Culling.Disable)
            gl.disable(gl.CULL_FACE);
        else {
            gl.enable(gl.CULL_FACE);
            gl.cullFace(this.pipelineStateOverride.cull);
            gl.frontFace(gl.CCW);
        }
    }
    uploadUniform(prop, value) {
        var _a;
        const gl = this.gl;
        const ctx = global_1.GlobalContext();
        if (!prop.location)
            return false;
        let dirty = false;
        if (prop.uploaded === null && value === null && prop.type !== "tex2d")
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
        let uploaded = value;
        switch (prop.type) {
            case "int":
                gl.uniform1i(prop.location, value);
                break;
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
            case "int[]":
                value.length && gl.uniform1iv(prop.location, value);
                break;
            case "float[]":
                value.length && gl.uniform1fv(prop.location, value);
                break;
            case "vec2[]": {
                const length = this.setVectorUniformBuffer(prop, 2, value);
                length && gl.uniform2fv(prop.location, prop.buffer, 0, length);
                break;
            }
            case "vec3[]": {
                const length = this.setVectorUniformBuffer(prop, 3, value);
                length && gl.uniform3fv(prop.location, prop.buffer, 0, length);
                break;
            }
            case "color[]":
            case "vec4[]": {
                const length = this.setVectorUniformBuffer(prop, 4, value);
                length && gl.uniform4fv(prop.location, prop.buffer, 0, length);
                break;
            }
            case "mat4[]": {
                const length = this.setVectorUniformBuffer(prop, 16, value);
                length && gl.uniform4fv(prop.location, prop.buffer, 0, length);
                break;
            }
            case "tex2d": {
                // Update texture to texture unit instead of update uniform1i
                // Due to performance issue mentioned in https://www.khronos.org/registry/webgl/specs/latest/1.0/#5.14.10
                const texProp = prop;
                value = value || ctx.renderer.assets.textures.default;
                let unit = this.bindNextTexture(value);
                if (texProp.uploaded !== unit) {
                    gl.uniform1i(texProp.location, unit);
                    texProp.uploaded = unit;
                }
                uploaded = unit;
                break;
            }
            case "tex2d[]": {
                const texProp = prop;
                const texArray = value;
                let shouldUpload = false;
                const uniformValues = texProp.uploaded || [];
                for (let i = 0; i < texArray.length; i++) {
                    const tex = texArray[i] || ctx.renderer.assets.textures.default;
                    let unit = this.bindNextTexture(tex);
                    if (((_a = texProp.uploaded) === null || _a === void 0 ? void 0 : _a[i]) !== unit)
                        shouldUpload = true;
                    uniformValues[i] = unit;
                }
                if (shouldUpload) {
                    gl.uniform1iv(texProp.location, uniformValues, 0, texArray.length);
                    texProp.uploaded = uniformValues;
                }
                uploaded = uniformValues;
            }
        }
        prop.uploaded = uploaded;
    }
    bindNextTexture(texture) {
        texture.bind(this.boundTextures.length);
        return this.boundTextures.push(texture) - 1;
    }
    setVectorUniformBuffer(prop, elementSize, valueArray) {
        if (prop.buffer.length < elementSize * valueArray.length) {
            prop.buffer = new Float32Array(elementSize * valueArray.length);
        }
        for (let i = 0; i < valueArray.length; i++) {
            prop.buffer.set(valueArray[i], i * elementSize);
        }
        return elementSize * valueArray.length;
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
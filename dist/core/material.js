"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.materialDefine = exports.MaterialFromShader = exports.shaderProp = exports.Material = void 0;
require("reflect-metadata");
const global_1 = require("./global");
require("reflect-metadata");
const asset_1 = require("./asset");
class Material extends asset_1.Asset {
    constructor(shader, gl = global_1.GL()) {
        super();
        this.propertyBlock = {};
        this.initialized = false;
        this.name = `Material_${this.assetID}`;
        this.gl = gl;
        this._shader = shader;
    }
    get shader() { return this._shader; }
    set shader(value) {
        const gl = this.gl;
        if (value != this._shader) {
            this._shader = value;
            for (const key in this.propertyBlock) {
                const loc = this._shader.uniformLocation(this.propertyBlock[key].name);
                this.propertyBlock[key].location = loc;
            }
        }
    }
    setup(data) {
        var _a;
        this.tryInit(true);
        const gl = data.gl;
        for (const key in this.propertyBlock) {
            const prop = this.propertyBlock[key];
            switch (prop.type) {
                case "float":
                    gl.uniform1f(prop.location, this[key]);
                    break;
                case "vec2":
                    gl.uniform2fv(prop.location, this[key]);
                    break;
                case "vec3":
                    gl.uniform3fv(prop.location, this[key]);
                    break;
                case "vec4":
                    gl.uniform4fv(prop.location, this[key]);
                    break;
                case "color":
                    gl.uniform4fv(prop.location, this[key]);
                    break;
                case "mat4":
                    gl.uniformMatrix4fv(prop.location, false, this[key]);
                    break;
                case "tex2d":
                    if (!this[key])
                        data.assets.textures.default.bind(prop.location, data);
                    else
                        (_a = (this[key] || null)) === null || _a === void 0 ? void 0 : _a.bind(prop.location, data);
                    break;
            }
        }
    }
    setProp(keyOrName, nameOrType, typeOrValue, valueOrNot) {
        let key = keyOrName;
        let name = nameOrType;
        let type = typeOrValue;
        let value = valueOrNot;
        if (typeof (typeOrValue) !== "string") {
            key = name = keyOrName;
            type = nameOrType;
            value = typeOrValue;
        }
        if (this.propertyBlock[key]) {
            this.propertyBlock[key].type = type;
        }
        else {
            const loc = this.shader.uniformLocation(name);
            if (loc) {
                this.propertyBlock[key] = {
                    location: loc,
                    type: type,
                    name: name
                };
            }
        }
        this[key] = value;
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
        return true;
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
function materialDefine(constructor) {
    return class extends constructor {
        constructor(...arg) {
            super(...arg);
            this.tryInit(false);
        }
        tryInit(required = false) {
            if (super.initialized)
                return true;
            if (!super.tryInit(required))
                return false;
            const gl = this.gl;
            const shader = this.shader;
            const propertyBlock = this.propertyBlock;
            for (const key in this) {
                const prop = getShaderProp(this, key);
                if (!prop)
                    continue;
                const loc = shader.uniformLocation(prop === null || prop === void 0 ? void 0 : prop.name);
                if (!loc)
                    continue;
                propertyBlock[key] = {
                    type: prop.type,
                    location: loc,
                    name: prop.name
                };
            }
            this.propertyBlock = propertyBlock;
            return true;
        }
    };
}
exports.materialDefine = materialDefine;
//# sourceMappingURL=material.js.map
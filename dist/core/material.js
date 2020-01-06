"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const global_1 = require("./global");
require("reflect-metadata");
const builtin_asset_1 = require("./builtin-asset");
class Material {
    constructor(shader, gl = global_1.GL()) {
        this.propertyBlock = {};
        this.gl = gl;
        this.shader = shader;
    }
    setup(ctx) {
        var _a, _b;
        const gl = ctx.gl;
        gl.useProgram(this.shader.program);
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
                        (_a = builtin_asset_1.GlobalAssets(ctx)) === null || _a === void 0 ? void 0 : _a.defaultTexture.bind(prop.location, ctx.usedTextureUnit++, ctx);
                    else
                        (_b = (this[key] || null)) === null || _b === void 0 ? void 0 : _b.bind(prop.location, ctx.usedTextureUnit++, ctx);
                    break;
            }
        }
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
function materialType(constructor) {
    return class extends constructor {
        constructor(...arg) {
            var _a;
            super(...arg);
            const gl = this.gl;
            const shader = this.shader;
            const propertyBlock = this.propertyBlock;
            for (const key in this) {
                const prop = getShaderProp(this, key);
                if (!prop)
                    continue;
                const loc = gl.getUniformLocation(shader.program, (_a = prop) === null || _a === void 0 ? void 0 : _a.name);
                if (!loc)
                    continue;
                propertyBlock[key] = {
                    type: prop.type,
                    location: loc,
                };
            }
            this.propertyBlock = propertyBlock;
        }
    };
}
exports.materialType = materialType;
//# sourceMappingURL=material.js.map
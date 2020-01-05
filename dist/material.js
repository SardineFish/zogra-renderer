"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("./util");
require("reflect-metadata");
const global_1 = require("./global");
require("reflect-metadata");
class Material {
    constructor(shader, gl = global_1.GL()) {
        var _a;
        this.shader = shader;
        this.propertyBlock = {};
        for (const key in this) {
            const prop = getShaderProp(this, key);
            if (prop)
                this.propertyBlock[key] = {
                    type: prop.type,
                    location: (_a = gl.getUniformLocation(shader.program, prop.name), (_a !== null && _a !== void 0 ? _a : util_1.panic("Failed to get uniform location.")))
                };
        }
    }
    setup(gl) {
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
//# sourceMappingURL=material.js.map
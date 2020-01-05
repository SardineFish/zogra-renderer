"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("./util");
const global_1 = require("./global");
const builtin_asset_1 = require("./builtin-asset");
class Shader {
    constructor(vertexShader, fragmentShader, attributes = builtin_asset_1.DefaultShaderResources.attributes, gl = global_1.GL()) {
        this._compiled = false;
        this.gl = gl;
        this.program = util_1.panicNull(gl.createProgram(), "Failed to create shader program");
        this.vertexShaderSource = vertexShader;
        this.fragmentShaderSouce = fragmentShader;
        this.vertexShader = util_1.panicNull(gl.createShader(gl.VERTEX_SHADER), "Failed to create vertex shader");
        this.fragmentShader = util_1.panicNull(gl.createShader(gl.FRAGMENT_SHADER), "Failed to create fragment shader");
        this.compile();
        this.attributes = {
            vert: this.gl.getAttribLocation(this.program, attributes.vert),
            color: this.gl.getAttribLocation(this.program, attributes.color),
            uv: this.gl.getAttribLocation(this.program, attributes.uv),
            normal: this.gl.getAttribLocation(this.program, attributes.normal)
        };
    }
    get compiled() { return this._compiled; }
    compile() {
        this.gl.shaderSource(this.vertexShader, this.vertexShaderSource);
        this.gl.compileShader(this.vertexShader);
        if (!this.gl.getShaderParameter(this.vertexShader, this.gl.COMPILE_STATUS)) {
            //this.gl.deleteShader(this.vertexShader);
            throw new Error("Failed to compile vertex shader:\r\n" + this.gl.getShaderInfoLog(this.vertexShader));
        }
        this.gl.shaderSource(this.fragmentShader, this.fragmentShaderSouce);
        this.gl.compileShader(this.fragmentShader);
        if (!this.gl.getShaderParameter(this.fragmentShader, this.gl.COMPILE_STATUS)) {
            //this.gl.deleteShader(this.fragmentShader);
            throw new Error("Failed to compile fragment shader:\r\n" + this.gl.getShaderInfoLog(this.fragmentShader));
        }
        this.gl.attachShader(this.program, this.vertexShader);
        this.gl.attachShader(this.program, this.fragmentShader);
        this.gl.linkProgram(this.program);
        if (!this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS)) {
            throw new Error("Failed to link shader program:\r\n" + this.gl.getProgramInfoLog(this.program));
        }
    }
}
exports.Shader = Shader;
//# sourceMappingURL=shader.js.map
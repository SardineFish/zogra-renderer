"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Shader = exports.DefaultShaderAttributeNames = exports.Culling = exports.Blending = exports.DepthTest = void 0;
const util_1 = require("../utils/util");
const global_1 = require("./global");
const shaders_1 = require("../builtin-assets/shaders");
const util_2 = require("../utils/util");
const asset_1 = require("./asset");
var DepthTest;
(function (DepthTest) {
    DepthTest[DepthTest["Disable"] = -1] = "Disable";
    DepthTest[DepthTest["Always"] = WebGL2RenderingContext.ALWAYS] = "Always";
    DepthTest[DepthTest["Never"] = WebGL2RenderingContext.NEVER] = "Never";
    DepthTest[DepthTest["Less"] = WebGL2RenderingContext.LESS] = "Less";
    DepthTest[DepthTest["Equal"] = WebGL2RenderingContext.EQUAL] = "Equal";
    DepthTest[DepthTest["LEqual"] = WebGL2RenderingContext.LEQUAL] = "LEqual";
    DepthTest[DepthTest["Greater"] = WebGL2RenderingContext.GREATER] = "Greater";
    DepthTest[DepthTest["NotEqual"] = WebGL2RenderingContext.NOTEQUAL] = "NotEqual";
    DepthTest[DepthTest["GEqual"] = WebGL2RenderingContext.GEQUAL] = "GEqual";
})(DepthTest = exports.DepthTest || (exports.DepthTest = {}));
var Blending;
(function (Blending) {
    Blending[Blending["Disable"] = -1] = "Disable";
    Blending[Blending["Zero"] = WebGL2RenderingContext.ZERO] = "Zero";
    Blending[Blending["One"] = WebGL2RenderingContext.ONE] = "One";
    Blending[Blending["SrcColor"] = WebGL2RenderingContext.SRC_COLOR] = "SrcColor";
    Blending[Blending["OneMinusSrcColor"] = WebGL2RenderingContext.ONE_MINUS_SRC_COLOR] = "OneMinusSrcColor";
    Blending[Blending["DstColor"] = WebGL2RenderingContext.DST_COLOR] = "DstColor";
    Blending[Blending["OneMinusDstColor"] = WebGL2RenderingContext.ONE_MINUS_DST_COLOR] = "OneMinusDstColor";
    Blending[Blending["SrcAlpha"] = WebGL2RenderingContext.SRC_ALPHA] = "SrcAlpha";
    Blending[Blending["OneMinusSrcAlpha"] = WebGL2RenderingContext.ONE_MINUS_SRC_ALPHA] = "OneMinusSrcAlpha";
    Blending[Blending["DstAlpha"] = WebGL2RenderingContext.DST_ALPHA] = "DstAlpha";
    Blending[Blending["OneMinusDstAlpha"] = WebGL2RenderingContext.ONE_MINUS_DST_ALPHA] = "OneMinusDstAlpha";
})(Blending = exports.Blending || (exports.Blending = {}));
var Culling;
(function (Culling) {
    Culling[Culling["Disable"] = -1] = "Disable";
    Culling[Culling["Back"] = WebGL2RenderingContext.BACK] = "Back";
    Culling[Culling["Front"] = WebGL2RenderingContext.FRONT] = "Front";
    Culling[Culling["Both"] = WebGL2RenderingContext.FRONT_AND_BACK] = "Both";
})(Culling = exports.Culling || (exports.Culling = {}));
exports.DefaultShaderAttributeNames = {
    vert: "aPos",
    color: "aColor",
    uv: "aUV",
    uv2: "aUV2",
    normal: "aNormal",
};
class Shader extends asset_1.Asset {
    constructor(vertexShader, fragmentShader, options = {}, gl = global_1.GL()) {
        super(options.name);
        this.attributes = null;
        this.initialized = false;
        this.gl = null;
        this.program = null;
        this.vertexShader = null;
        this.fragmentShader = null;
        this.pipelineStates = null;
        this.builtinUniformLocations = null;
        this._compiled = false;
        if (!options.name)
            this.name = `Shader_${this.assetID}`;
        this.vertexShaderSource = vertexShader;
        this.fragmentShaderSouce = fragmentShader;
        this.options = options;
        this.gl = gl;
        this.tryInit();
    }
    get compiled() { return this._compiled; }
    uniformLocation(name) {
        this.tryInit(true);
        return this.gl.getUniformLocation(this.program, name);
    }
    use() {
        this.tryInit(true);
        this.gl.useProgram(this.program);
    }
    setupPipelineStates() {
        const gl = this.gl;
        if (this.pipelineStates.depth === DepthTest.Disable)
            gl.disable(gl.DEPTH_TEST);
        else {
            gl.enable(gl.DEPTH_TEST);
            gl.depthMask(this.pipelineStates.zWrite);
            gl.depthFunc(this.pipelineStates.depth);
        }
        if (!this.pipelineStates.blend)
            gl.disable(gl.BLEND);
        else {
            const [srcRGB, dstRGB] = this.pipelineStates.blendRGB;
            const [srcAlpha, dstAlpha] = this.pipelineStates.blendAlpha;
            gl.enable(gl.BLEND);
            gl.blendFuncSeparate(srcRGB, dstRGB, srcAlpha, dstAlpha);
        }
        if (this.pipelineStates.cull === Culling.Disable)
            gl.disable(gl.CULL_FACE);
        else {
            gl.enable(gl.CULL_FACE);
            gl.cullFace(this.pipelineStates.cull);
            gl.frontFace(gl.CCW);
        }
    }
    setupBuiltinUniform(params) {
        this.tryInit(true);
        const gl = this.gl;
        // gl.useProgram(this.program);
        // console.log(this.builtinUniformLocations.matMVP);
        this.builtinUniformLocations.matM && gl.uniformMatrix4fv(this.builtinUniformLocations.matM, false, params.matM);
        this.builtinUniformLocations.matVP && gl.uniformMatrix4fv(this.builtinUniformLocations.matVP, false, params.matVP);
        this.builtinUniformLocations.matMVP && gl.uniformMatrix4fv(this.builtinUniformLocations.matMVP, false, params.matMVP);
        this.builtinUniformLocations.matM_IT && gl.uniformMatrix4fv(this.builtinUniformLocations.matM_IT, false, params.matM_IT);
        this.builtinUniformLocations.matMV_IT && gl.uniformMatrix4fv(this.builtinUniformLocations.matMV_IT, false, params.matMV_IT);
    }
    setPipelineStates(settings) {
        this.options = Object.assign(Object.assign({}, this.options), settings);
        if (this.initialized)
            this.setPipelineStateInternal(settings);
    }
    setPipelineStateInternal(settings) {
        let blend = false;
        let blendRGB = [Blending.One, Blending.Zero];
        let blendAlpha = [Blending.One, Blending.OneMinusSrcAlpha];
        if (typeof (settings.blend) === "number" && settings.blend !== Blending.Disable) {
            blend = true;
            blendRGB = [settings.blend, settings.blend];
            blendAlpha = [settings.blend, settings.blend];
        }
        else if (settings.blend instanceof Array) {
            blend = true;
            blendRGB = settings.blend;
        }
        if (settings.blendRGB) {
            blend = settings.blend !== false && settings.blend !== Blending.Disable;
            blendRGB = settings.blendRGB;
        }
        if (settings.blendAlpha) {
            blend = settings.blend !== false && settings.blend !== Blending.Disable;
            blendAlpha = settings.blendAlpha;
        }
        this.pipelineStates = {
            depth: settings.depth || DepthTest.Less,
            blend,
            blendRGB,
            blendAlpha,
            zWrite: settings.zWrite === false ? false : true,
            cull: settings.cull || Culling.Back
        };
    }
    _internal() {
        this.tryInit(true);
        return {
            attributes: this.attributes,
            options: this.options,
        };
    }
    tryInit(required = false) {
        if (this.initialized)
            return true;
        const gl = this.gl || global_1.GL();
        if (!gl) {
            return required
                ? util_1.panic("Failed to init shader without a global GL context")
                : false;
        }
        this.gl = gl;
        this.program = util_1.panicNull(gl.createProgram(), "Failed to create shader program");
        this.vertexShader = util_1.panicNull(gl.createShader(gl.VERTEX_SHADER), "Failed to create vertex shader");
        this.fragmentShader = util_1.panicNull(gl.createShader(gl.FRAGMENT_SHADER), "Failed to create fragment shader");
        this.compile();
        gl.useProgram(this.program);
        // const attributes = this.options.attributes || DefaultShaderAttributes;
        const attributeNames = Object.assign(Object.assign({}, exports.DefaultShaderAttributeNames), this.options.attributes);
        this.attributes = {};
        for (const key in attributeNames) {
            this.attributes[key] = gl.getAttribLocation(this.program, attributeNames[key]);
        }
        this.setPipelineStateInternal(this.options);
        this.builtinUniformLocations = util_2.getUniformsLocation(gl, this.program, shaders_1.BuiltinUniformNames);
        this.initialized = true;
        return true;
    }
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
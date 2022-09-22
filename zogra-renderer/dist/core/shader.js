import { panic, panicNull } from "../utils/util";
import { GL } from "./global";
import { BuiltinUniformNames } from "../builtin-assets/shaders";
import { getUniformsLocation } from "../utils/util";
import { Asset } from "./asset";
import { BufferStructureInfo } from "./array-buffer";
import { DefaultVertexData } from "./mesh";
export var DepthTest;
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
})(DepthTest || (DepthTest = {}));
export var Blending;
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
})(Blending || (Blending = {}));
export var Culling;
(function (Culling) {
    Culling[Culling["Disable"] = -1] = "Disable";
    Culling[Culling["Back"] = WebGL2RenderingContext.BACK] = "Back";
    Culling[Culling["Front"] = WebGL2RenderingContext.FRONT] = "Front";
    Culling[Culling["Both"] = WebGL2RenderingContext.FRONT_AND_BACK] = "Both";
})(Culling || (Culling = {}));
export const DefaultShaderAttributeNames = {
    vert: "aPos",
    color: "aColor",
    uv: "aUV",
    uv2: "aUV2",
    normal: "aNormal",
};
export class Shader extends Asset {
    constructor(vertexShader, fragmentShader, options = {}, gl = GL()) {
        super(options.name);
        /** @internal */
        this.attributes = {};
        this.initialized = false;
        this.gl = null;
        this.program = null;
        this.vertexShader = null;
        this.fragmentShader = null;
        this.pipelineStates = {};
        this.builtinUniformLocations = null;
        this._compiled = false;
        if (!options.name)
            this.name = `Shader_${this.assetID}`;
        this.vertexShaderSource = vertexShader;
        this.fragmentShaderSouce = fragmentShader;
        this.options = options;
        this.gl = gl;
        this.vertexStruct = BufferStructureInfo.from(this.options.vertexStructure || DefaultVertexData);
        this.attributeNames = Object.assign(Object.assign({}, DefaultShaderAttributeNames), options.attributes);
        this.setPipelineStateInternal(this.options);
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
    setupBuiltinUniform(params) {
        this.tryInit(true);
        const gl = this.gl;
        // gl.useProgram(this.program);
        // console.log(this.builtinUniformLocations.matMVP);
        this.builtinUniformLocations.matM && gl.uniformMatrix4fv(this.builtinUniformLocations.matM, false, params.matM.asMut());
        this.builtinUniformLocations.matVP && gl.uniformMatrix4fv(this.builtinUniformLocations.matVP, false, params.matVP.asMut());
        this.builtinUniformLocations.matMVP && gl.uniformMatrix4fv(this.builtinUniformLocations.matMVP, false, params.matMVP.asMut());
        this.builtinUniformLocations.matM_IT && gl.uniformMatrix4fv(this.builtinUniformLocations.matM_IT, false, params.matM_IT.asMut());
        this.builtinUniformLocations.matMV_IT && gl.uniformMatrix4fv(this.builtinUniformLocations.matMV_IT, false, params.matMV_IT.asMut());
    }
    clone() {
        return new Shader(this.vertexShaderSource, this.fragmentShaderSouce, this.options);
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
            options: this.options,
        };
    }
    tryInit(required = false) {
        if (this.initialized)
            return true;
        const gl = this.gl || GL();
        if (!gl) {
            return required
                ? panic("Failed to init shader without a global GL context")
                : false;
        }
        this.gl = gl;
        this.program = panicNull(gl.createProgram(), "Failed to create shader program");
        this.vertexShader = panicNull(gl.createShader(gl.VERTEX_SHADER), "Failed to create vertex shader");
        this.fragmentShader = panicNull(gl.createShader(gl.FRAGMENT_SHADER), "Failed to create fragment shader");
        this.compile();
        gl.useProgram(this.program);
        // const attributes = this.options.attributes || DefaultShaderAttributes;
        const attributeNames = Object.assign(Object.assign({}, DefaultShaderAttributeNames), this.options.attributes);
        this.attributes = {};
        for (const key in attributeNames) {
            this.attributes[key] = gl.getAttribLocation(this.program, attributeNames[key]);
        }
        this.builtinUniformLocations = getUniformsLocation(gl, this.program, BuiltinUniformNames);
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
        for (const element of this.vertexStruct.elements) {
            if (this.attributeNames[element.key])
                this.gl.bindAttribLocation(this.program, element.location, this.attributeNames[element.key]);
        }
        this.gl.linkProgram(this.program);
        if (!this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS)) {
            throw new Error("Failed to link shader program:\r\n" + this.gl.getProgramInfoLog(this.program));
        }
    }
}
//# sourceMappingURL=shader.js.map
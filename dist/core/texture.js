"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const global_1 = require("./global");
const texture_format_1 = require("./texture-format");
const util_1 = require("../utils/util");
var FilterMode;
(function (FilterMode) {
    FilterMode[FilterMode["Linear"] = WebGL2RenderingContext.LINEAR] = "Linear";
    FilterMode[FilterMode["Nearest"] = WebGL2RenderingContext.NEAREST] = "Nearest";
})(FilterMode = exports.FilterMode || (exports.FilterMode = {}));
var WrapMode;
(function (WrapMode) {
    WrapMode[WrapMode["Repeat"] = WebGL2RenderingContext.REPEAT] = "Repeat";
    WrapMode[WrapMode["Clamp"] = WebGL2RenderingContext.CLAMP_TO_EDGE] = "Clamp";
    WrapMode[WrapMode["Mirror"] = WebGL2RenderingContext.MIRRORED_REPEAT] = "Mirror";
})(WrapMode = exports.WrapMode || (exports.WrapMode = {}));
class Texture {
    constructor(width, height, format = texture_format_1.TextureFormat.RGBA, filterMode = FilterMode.Linear, gl = global_1.GL()) {
        var _a;
        this.mipmapLevel = 0;
        this.wrapMode = WrapMode.Repeat;
        this.gl = gl;
        this.format = format;
        this.width = width;
        this.height = height;
        this.filterMode = filterMode;
        this.glTex = (_a = gl.createTexture(), (_a !== null && _a !== void 0 ? _a : util_1.panic("Failed to create texture.")));
    }
    setup() {
        const gl = this.gl;
        gl.bindTexture(gl.TEXTURE_2D, this.glTex);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, this.filterMode);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, this.wrapMode);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, this.wrapMode);
    }
}
exports.Texture = Texture;
class Texture2D extends Texture {
    constructor(width = 0, height = 0, format = texture_format_1.TextureFormat.RGBA, filterMode = FilterMode.Linear, gl = global_1.GL()) {
        super(width, height, format, filterMode, gl);
    }
    setData(pixels) {
        const gl = this.gl;
        gl.bindTexture(gl.TEXTURE_2D, this.glTex);
        const [internalFormat, format, type] = texture_format_1.mapGLFormat(gl, texture_format_1.TextureFormat.DEPTH_COMPONENT);
        if (pixels.hasOwnProperty("width") && pixels.hasOwnProperty("height")) {
            pixels = pixels;
            this.width = pixels.width;
            this.height = pixels.height;
            gl.texImage2D(gl.TEXTURE_2D, this.mipmapLevel, internalFormat, format, type, pixels);
        }
        else {
            pixels = pixels;
            gl.texImage2D(gl.TEXTURE_2D, this.mipmapLevel, internalFormat, this.width, this.height, 0, format, type, pixels);
        }
        super.setup();
    }
}
exports.Texture2D = Texture2D;
class DepthTexture extends Texture {
    constructor(width, height, gl = global_1.GL()) {
        super(width, height, texture_format_1.TextureFormat.DEPTH_COMPONENT, FilterMode.Nearest, gl);
    }
    create() {
        const gl = this.gl;
        gl.bindTexture(gl.TEXTURE_2D, this.glTex);
        const [internalFormat, format, type] = texture_format_1.mapGLFormat(gl, texture_format_1.TextureFormat.DEPTH_COMPONENT);
        gl.texImage2D(gl.TEXTURE_2D, this.mipmapLevel, internalFormat, this.width, this.height, 0, format, type, null);
        super.setup();
    }
}
exports.DepthTexture = DepthTexture;
class RenderTexture extends Texture {
    constructor(width, height, depth, format = texture_format_1.TextureFormat.RGBA, filterMode = FilterMode.Linear, gl = global_1.GL()) {
        super(width, height, format, filterMode, gl);
        this.depthTexture = null;
        if (depth) {
            this.depthTexture = new DepthTexture(width, height, gl);
        }
    }
    create() {
        const gl = this.gl;
        const [internalFormat, format, type] = texture_format_1.mapGLFormat(gl, this.format);
        gl.texImage2D(gl.TEXTURE_2D, this.mipmapLevel, internalFormat, this.width, this.height, 0, format, type, null);
        super.setup();
    }
}
exports.RenderTexture = RenderTexture;
//# sourceMappingURL=texture.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("../utils/util");
const texture_1 = require("../core/texture");
const texture_format_1 = require("../core/texture-format");
function createDefaultTextures(context) {
    var _a;
    const size = 64;
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;
    const ctx = (_a = canvas.getContext("2d"), (_a !== null && _a !== void 0 ? _a : util_1.panic("Failed to create default texture.")));
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = "cyan";
    ctx.fillRect(0, 0, size / 2, size / 2);
    ctx.fillRect(size / 2, size / 2, size / 2, size / 2);
    const defaultTex = new texture_1.Texture2D(size, size, texture_format_1.TextureFormat.RGBA, texture_1.FilterMode.Linear, context);
    defaultTex.setData(canvas);
    ctx.fillStyle = "blue";
    ctx.fillRect(0, 0, size, size);
    const defaultNormalTex = new texture_1.Texture2D(size, size, texture_format_1.TextureFormat.RGBA, texture_1.FilterMode.Linear, context);
    defaultNormalTex.setData(canvas);
    return {
        default: defaultTex,
        defaultNormal: defaultNormalTex,
    };
}
exports.createDefaultTextures = createDefaultTextures;
//# sourceMappingURL=textures.js.map
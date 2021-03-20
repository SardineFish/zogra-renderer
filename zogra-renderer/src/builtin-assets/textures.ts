import { panic } from "../utils/util";
import { Texture2D, FilterMode } from "../core/texture";
import { TextureFormat } from "../core/texture-format";
import { GLContext } from "../core/global";

export function createDefaultTextures(context: GLContext)
{
    const size = 64;
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext("2d") ?? panic("Failed to create default texture.");
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = "cyan";
    ctx.fillRect(0, 0, size / 2, size / 2);
    ctx.fillRect(size / 2, size / 2, size / 2, size / 2);

    const errorTex = new Texture2D(size, size, TextureFormat.RGBA, FilterMode.Linear, context);
    errorTex.setData(canvas);
    errorTex.name = "Texture-Error";

    ctx.fillStyle = "blue";
    ctx.fillRect(0, 0, size, size);
    const defaultNormalTex = new Texture2D(size, size, TextureFormat.RGBA, FilterMode.Linear, context);
    defaultNormalTex.setData(canvas);
    defaultNormalTex.name = "Default-Normal";

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, size, size);
    const defaultTex = new Texture2D(size, size, TextureFormat.RGBA, FilterMode.Linear, context);
    defaultTex.setData(canvas);
    defaultTex.name = "Default-White";

    return {
        default: defaultTex,
        defaultNormal: defaultNormalTex,
        error: errorTex
    };
}

export type BuiltinTextures = ReturnType<typeof createDefaultTextures>;
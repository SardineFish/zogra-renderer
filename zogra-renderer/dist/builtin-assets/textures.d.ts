import { Texture2D } from "../core/texture";
import { GLContext } from "../core/global";
export declare function createDefaultTextures(context: GLContext): {
    default: Texture2D;
    defaultNormal: Texture2D;
    error: Texture2D;
};
export declare type BuiltinTextures = ReturnType<typeof createDefaultTextures>;

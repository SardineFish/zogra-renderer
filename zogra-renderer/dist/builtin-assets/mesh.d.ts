import { Mesh } from "../core/mesh";
import { GLContext } from "../core/global";
export declare function createBuiltinMesh(ctx: GLContext): {
    quad: Mesh<import("..").DefaultVertexStruct>;
    screenQuad: Mesh<import("..").DefaultVertexStruct>;
    cube: Mesh<import("..").DefaultVertexStruct>;
};

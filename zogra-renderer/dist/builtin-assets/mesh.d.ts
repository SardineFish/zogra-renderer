import { Mesh } from "../core/mesh";
import { GLContext } from "../core/global";
export declare function createBuiltinMesh(ctx: GLContext): {
    quad: Mesh<import("../core/mesh").DefaultVertexStruct>;
    screenQuad: Mesh<import("../core/mesh").DefaultVertexStruct>;
    cube: Mesh<import("../core/mesh").DefaultVertexStruct>;
};

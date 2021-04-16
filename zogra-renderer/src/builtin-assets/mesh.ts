import { DefaultVertexData, Mesh } from "../core/mesh";
import { vec3 } from "../types/vec3";
import { vec2 } from "../types/vec2";
import { Color } from "../types/color";
import { GLContext, GlobalContext } from "../core/global";
import { MeshBuilder } from "../utils/mesh-builder";

export function createBuiltinMesh(ctx: GLContext)
{
    return {
        quad: MeshBuilder.quad(vec2.zero(), vec2.one(), ctx),
        screenQuad: MeshBuilder.ndcQuad(ctx),
        cube: MeshBuilder.cube(vec3.zero(), vec3.one(), ctx),
    };
}
import { vec3 } from "../types/vec3";
import { vec2 } from "../types/vec2";
import { MeshBuilder } from "../utils/mesh-builder";
export function createBuiltinMesh(ctx) {
    return {
        quad: MeshBuilder.quad(vec2.zero(), vec2.one(), ctx),
        screenQuad: MeshBuilder.ndcQuad(ctx),
        cube: MeshBuilder.cube(vec3.zero(), vec3.one(), ctx),
    };
}
//# sourceMappingURL=mesh.js.map
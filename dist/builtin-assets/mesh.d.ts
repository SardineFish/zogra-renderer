import { Mesh } from "../core/mesh";
import { vec3 } from "../types/vec3";
import { vec2 } from "../types/vec2";
export declare function createBuiltinMesh(gl: WebGL2RenderingContext): {
    quad: Mesh;
    screenQuad: Mesh;
    cube: Mesh;
};
export declare class MeshBuilder {
    private verts;
    private triangles;
    private uvs;
    private colors;
    private gl;
    constructor(capacity: number, gl?: WebGL2RenderingContext);
    addPolygon(verts: vec3[], uvs: vec2[]): void;
    toMesh(): Mesh;
}

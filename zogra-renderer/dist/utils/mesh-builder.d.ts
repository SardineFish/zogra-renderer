import { vec3, vec2, Color } from "../types/types";
import { Mesh } from "../core/mesh";
export declare class MeshBuilder {
    private verts;
    private triangles;
    private uvs;
    private colors;
    private gl;
    constructor(capacity?: number, gl?: WebGL2RenderingContext);
    addPolygon(verts: vec3[], uvs: vec2[]): void;
    addSubMesh(verts: vec3[], triangles: number[], colors?: Color[], uvs?: vec2[]): void;
    toMesh(): Mesh;
    static quad(center?: import("../types/vec2").Vector2, size?: import("../types/vec2").Vector2): Mesh;
    static ndcQuad(): Mesh;
    static ndcTriangle(): Mesh;
}

import { vec3, vec2, Color } from "../types/types";
import { DefaultVertexData, Mesh, MeshEx } from "../core/mesh";
import { BufferElementValue, BufferStructure } from "../core/buffer";
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
declare type VertexData<T extends BufferStructure> = {
    [key in keyof T]: BufferElementValue<T[key]>;
};
export declare class MeshBuilderEx<VertexStruct extends BufferStructure = typeof DefaultVertexData> {
    private mesh;
    private verticesCount;
    private indicesCount;
    constructor(verticesCapacity?: number, trianglesCapacity?: number, structure?: VertexStruct);
    addPolygon<T extends Partial<VertexData<VertexStruct>>>(...verts: T[]): void;
    getMesh(): MeshEx<VertexStruct>;
}
export {};

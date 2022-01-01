import { vec3, vec2, Color, Vector3 } from "../types";
import { GLContext } from "../core/global";
import { DefaultVertexData, DefaultVertexStruct, Mesh } from "../core/mesh";
import { BufferElementValue, BufferStructure } from "../core/array-buffer";
declare type VertexData<T extends BufferStructure> = {
    [key in keyof T]: BufferElementValue<T[key]>;
};
export declare class MeshBuilder<VertexStruct extends BufferStructure = typeof DefaultVertexData> {
    private mesh;
    private verticesCount;
    private indicesCount;
    constructor(verticesCapacity?: number, trianglesCapacity?: number, structure?: VertexStruct, ctx?: GLContext);
    addPolygon<T extends Partial<VertexData<VertexStruct>>>(...verts: T[]): void;
    toMesh(): Mesh<VertexStruct>;
    static quad(center?: import("../types").Vector2, size?: import("../types").Vector2, ctx?: GLContext): Mesh<DefaultVertexStruct>;
    static ndcQuad(ctx?: GLContext): Mesh<DefaultVertexStruct>;
    static ndcTriangle(ctx?: GLContext): Mesh<DefaultVertexStruct>;
    static cube(center?: Vector3, size?: Vector3, ctx?: GLContext): Mesh<DefaultVertexStruct>;
    static sphereNormalizedCube(center?: Vector3, radius?: number, segments?: number, ctx?: GLContext): Mesh<DefaultVertexStruct>;
}
/** @deprecated */
export declare class MeshBuilderLegacy {
    private verts;
    private triangles;
    private uvs;
    private colors;
    private ctx;
    constructor(capacity?: number, ctx?: GLContext);
    addPolygon(verts: vec3[], uvs: vec2[]): void;
    addSubMesh(verts: vec3[], triangles: number[], colors?: Color[], uvs?: vec2[]): void;
    toMesh(): Mesh<DefaultVertexStruct>;
    static quad(center?: import("../types").Vector2, size?: import("../types").Vector2): Mesh<DefaultVertexStruct>;
    static ndcQuad(): Mesh<DefaultVertexStruct>;
    static ndcTriangle(): Mesh<DefaultVertexStruct>;
}
export {};

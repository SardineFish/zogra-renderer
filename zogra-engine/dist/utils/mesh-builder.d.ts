import { vec3, vec2, Color } from "../types/types";
export declare class MeshBuilder {
    private verts;
    private triangles;
    private uvs;
    private colors;
    private gl;
    constructor(capacity?: number, gl?: any);
    addPolygon(verts: vec3[], uvs: vec2[]): void;
    addSubMesh(verts: vec3[], triangles: number[], colors?: Color[], uvs?: vec2[]): void;
    toMesh(): any;
    static quad(center?: any, size?: any): any;
    static ndcQuad(): any;
    static ndcTriangle(): any;
}

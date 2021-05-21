import { vec3 } from "../types/vec3";
import { vec2 } from "../types/vec2";
import { Color } from "../types/color";
import { GLContext } from "./global";
import { Shader } from "./shader";
import { Asset } from "./asset";
import { BufferStructure, BufferStructureInfo, GLArrayBuffer } from "./array-buffer";
export interface DefaultVertexStruct extends BufferStructure {
    vert: "vec3";
    color: "vec4";
    normal: "vec3";
    uv: "vec2";
    uv2: "vec2";
}
export declare const DefaultVertexData: DefaultVertexStruct;
export declare const DefaultVertexStructInfo: BufferStructureInfo<DefaultVertexStruct>;
export declare const VertexStruct: typeof BufferStructure;
export declare class Mesh<VertexStruct extends BufferStructure = typeof DefaultVertexData> extends Asset {
    vertices: GLArrayBuffer<VertexStruct>;
    indices: Uint32Array;
    private ctx;
    private initialized;
    private vertexArray;
    private elementBuffer;
    private dirty;
    constructor();
    constructor(ctx: GLContext);
    constructor(structure: VertexStruct);
    constructor(structure: VertexStruct, ctx: GLContext);
    /** @deprecated */
    get verts(): import("../types/vec3").Vector3[];
    /** @deprecated */
    set verts(verts: import("../types/vec3").Vector3[]);
    /** @deprecated */
    get uvs(): import("../types/vec2").Vector2[];
    /** @deprecated */
    set uvs(uvs: import("../types/vec2").Vector2[]);
    /** @deprecated */
    get colors(): Color[];
    /** @deprecated */
    set colors(colors: Color[]);
    /** @deprecated */
    get normals(): import("../types/vec3").Vector3[];
    /** @deprecated */
    set normals(normals: import("../types/vec3").Vector3[]);
    /** @deprecated */
    get uv2(): import("../types/vec2").Vector2[];
    /** @deprecated */
    set uv2(uv2: import("../types/vec2").Vector2[]);
    /** @deprecated */
    get triangles(): number[];
    /** @deprecated */
    set triangles(triangles: number[]);
    private getVertexDataArray;
    private setVertexDataArray;
    resize(vertices: number, indices: number, keepData?: boolean): void;
    update(upload?: boolean): void;
    upload(): boolean;
    bind(): number;
    unbind(): void;
    /**
     * Heavy cost
     * @param angleThreshold
     */
    calculateNormals(angleThreshold?: number): void;
    destroy(): void;
    private tryInit;
}
/** @deprecated */
export declare class MeshLegacy extends Asset {
    private _verts;
    private _triangles;
    private _uvs;
    private _uv2;
    private _colors;
    private _normals;
    private dirty;
    private uploaded;
    private vertices;
    private indices;
    private vertexStruct;
    VAO: WebGLVertexArrayObject;
    VBO: WebGLBuffer;
    EBO: WebGLBuffer;
    private gl;
    private initialized;
    constructor(gl?: WebGL2RenderingContext);
    get verts(): vec3[];
    set verts(verts: vec3[]);
    get triangles(): number[];
    set triangles(triangles: number[]);
    get uvs(): vec2[];
    set uvs(uvs: vec2[]);
    get uv2(): vec2[];
    set uv2(uv: vec2[]);
    get colors(): Color[];
    set colors(colors: Color[]);
    get normals(): vec3[];
    set normals(normals: vec3[]);
    clear(): void;
    calculateNormals(angleThreshold?: number): void;
    update(): void;
    setup(): WebGLBuffer[];
    bind(shader: Shader): void;
    unbind(): void;
    destroy(): void;
    private tryInit;
    private initVAO;
}

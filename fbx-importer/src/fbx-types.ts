import { vec3, quat, mat4, vec4, vec2 } from "gl-matrix";
import { mulPoint } from "./utils";

export interface FBXFile
{
    version: number;
    nodes: FBXNode[];
}
export type FBXID = bigint;
export type FBXPropertyType = number | FBXID | boolean | string | string | Uint8Array | Int32Array | BigInt64Array | Float32Array | Float64Array | boolean[];
export interface FBXNode
{
    name: string;
    properties: FBXPropertyType[];
    nestedNodes: FBXNode[];
}

export interface FBXAssets
{
    materials: FBXMaterial[];
    models: FBXModel[];
}
export interface FBXModel
{
    id: FBXID;
    name: string;
    transform: FBXTransform;
    materials: FBXMaterial[];
    meshes: FBXMesh[];
}
export interface FBXMesh
{
    id: FBXID;
    name: string;
    verts: vec3[];
    //polygons: number[];
    triangles: number[];
    uv0: vec2[];
    uv1: vec2[];
    normals: vec3[];
    colors: vec4[];
    mateiralId: number;
    material: FBXMaterial;
}
export interface FBXMaterial
{
    id: FBXID
    name: string;
    [key: string]: string | boolean | number | vec3 | vec4 | bigint;
}
export class FBXTransform
{
    readonly model: FBXModel;
    parent: FBXTransform | null = null;
    children: FBXTransform[] = [];

    localPosition: vec3 = vec3.create();
    localRotation: quat = quat.identity(quat.create());
    localScaling: vec3 = vec3.fromValues(0, 0, 0);

    constructor(model: FBXModel, parent: FBXTransform | null = null)
    {
        this.parent = parent;
        this.model = model;
    }

    get position()
    {
        if (!this.parent)
            return this.localPosition;
        let [x, y, z] = this.localPosition;
        [x, y, z] = vec4.transformMat4(vec4.create(), vec4.fromValues(x, y, z, 1), this.localToWorldMatrix);
        return vec3.fromValues(x, y, z);
    }
    set position(position: vec3)
    {
        if (!this.parent)
            this.localPosition = position;
        else
            this.localPosition = mulPoint(this.localPosition, this.parent.localToWorldMatrix, this.localPosition);
    }
    get rotation()
    {
        if (!this.parent)
            return this.localRotation;
        return quat.mul(quat.create(), this.parent.rotation, this.localRotation);
    }
    set rotation(rotation: quat)
    {
        if (!this.parent)
            this.localRotation = quat.normalize(this.localRotation, this.localRotation);
        else
            this.localRotation = quat.normalize(this.localRotation, quat.mul(this.localRotation, quat.invert(quat.create(), this.parent.rotation), rotation));
    }
    get scaling()
    {
        if (!this.parent)
            return this.localScaling;
        return vec3.mul(vec3.create(), this.parent.scaling, this.localScaling);
    }
    set scaling(scaling: vec3)
    {
        if (!this.parent)
            this.localScaling = scaling;
        else
            this.localScaling = vec3.div(this.localScaling, scaling, this.parent.scaling);
    }
    get localToWorldMatrix(): mat4
    {
        if (!this.parent)
            return mat4.fromRotationTranslationScale(mat4.create(), this.localRotation, this.localPosition, this.localScaling);
        const mat = mat4.fromRotationTranslationScale(mat4.create(), this.localRotation, this.localPosition, this.localScaling);
        return mat4.mul(mat, this.parent.localToWorldMatrix, mat);
    }
    get worldToLocalMatrix(): mat4
    {
        return mat4.invert(this.localToWorldMatrix, this.localToWorldMatrix) as mat4;
    }
}
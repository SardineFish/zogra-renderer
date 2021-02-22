import { FBXFile, FBXModel, FBXTransform, FBXNode, FBXMesh, FBXPropertyType, FBXMaterial, FBXAssets } from "./fbx-types";
import { vec3, quat, vec2, vec4 } from "gl-matrix";
import { panic } from "./utils";
import { assert } from "./utils";

type Resource = {
    type: "material" | "geometry" | "model" | "null",
    data?: FBXModel | FBXMaterial | FBXMesh[],
};

export function extractFBXAssets(fbx: FBXFile): FBXAssets
{
    const objsNode = fbx.nodes.find(node => node.name === "Objects");
    if (!objsNode)
        return { materials: [], models: [] };
    
    
    const resourceDict = new Map<bigint, Resource>();
    
    const models = objsNode.nestedNodes
        .filter(node => node.name === "Model")
        .map(importModel);
    
    const geometries = objsNode.nestedNodes
        .filter(node => node.name === "Geometry")
        .map(importGeometry);
    
    const materials = objsNode.nestedNodes
        .filter(node => node.name === "Material")
        .map(importMaterial);
    
    for (const model of models) {
        resourceDict.set(model.id, {
            type: "model",
            data: model
        });
    }
    for (const geo of geometries)
        resourceDict.set(geo[0].id, {
            type: "geometry",
            data: geo
        });
    for (const mat of materials)
        resourceDict.set(mat.id, {
            type: "material",
            data: mat
        });
    
    const connections = fbx.nodes.find(n => n.name === "Connections");
    resourceDict.set(BigInt(0), { type: "null" });
    if (connections)
        connectResources(connections, resourceDict);
    for (const model of models)
    {
        for (const mesh of model.meshes)
        {
            mesh.material = model.materials[mesh.mateiralId];
        }
    }
    
    return {
        materials: materials,
        models: models
    };
}

function importModel(node: FBXNode)
{
    const model: FBXModel = {
        id: node.properties[0] as bigint,
        name: (node.properties[1] as string).split("\0")[0],
        meshes: [],
        materials: [],
        transform: null as any,
    };
    model.transform = new FBXTransform(model);
    const props = node.nestedNodes.find(n => n.name === "Properties70");
    const translationNode = props?.nestedNodes.find(n => n.properties[0] === "Lcl Translation");
    const rotationNode = props?.nestedNodes.find(n => n.properties[0] === "Lcl Rotation");
    const scalingNode = props?.nestedNodes.find(n => n.properties[0] === "Lcl Scaling");
    const preRotation = props?.nestedNodes.find(n => n.properties[0] === "PreRotation");
    model.transform.localPosition = vec3.fromValues(
        (translationNode?.properties[4] ?? 0) as number,
        (translationNode?.properties[5] ?? 0) as number,
        (translationNode?.properties[6] ?? 0) as number
    );
    model.transform.localRotation = quat.fromEuler(
        quat.create(),
        (rotationNode?.properties[4] ?? 0) as number,
        (rotationNode?.properties[5] ?? 0) as number,
        (rotationNode?.properties[6] ?? 0) as number
    );
    model.transform.localScaling = vec3.fromValues(
        (scalingNode?.properties[4] ?? 1) as number,
        (scalingNode?.properties[5] ?? 1) as number,
        (scalingNode?.properties[6] ?? 1) as number
    );
    if (preRotation)
    {
        model.transform.localRotation = quat.mul(
            model.transform.localRotation,
            quat.fromEuler(
                quat.create(),
                preRotation.properties[4] as number ?? 0,
                preRotation.properties[5] as number ?? 0,
                preRotation.properties[6] as number ?? 0),
            model.transform.localRotation
        );
    }
    return model;
}

function importGeometry(node: FBXNode): FBXMesh[]
{
    const geometryID = node.properties[0] as bigint;
    const geometryName = (node.properties[1] as string).split("\0")[0];

    const vertsArr = (node.nestedNodes.find(n => n.name === "Vertices")?.properties[0] ?? new Float64Array()) as Float64Array;
    const polygonArr = (node.nestedNodes.find(n => n.name === "PolygonVertexIndex")?.properties[0] ?? new Int32Array()) as Int32Array;
    const normalNode = node.nestedNodes.find(n => n.name === "LayerElementNormal");
    const uv0Node = node.nestedNodes.find(n => n.name === "LayerElementUV" && n.properties[0] === 0);
    const uv1Node = node.nestedNodes.find(n => n.name === "LayerElementUV" && n.properties[0] === 1);
    const matNode = node.nestedNodes.find(n => n.name === "LayerElementMaterial");


    let polygons: number[][] = [];
    let polygonVertices: vec3[] = [];
    let polygonNormals: vec3[] = [];
    let polygonUV0: vec2[] = [];
    let polygonUV1: vec2[] = [];

    // Extract verts.
    if (vertsArr.length % 3 !== 0)
        throw new Error("Invalid vertices size.");
    const verts = vec3Wrapper(vertsArr);

    // Construct polygons.
    polygonVertices = Array.from(polygonArr).map(idx => verts[idx >= 0 ? idx : -1 ^ idx]);
    let polyginIdx = 0;
    for (let i = 0; i < polygonArr.length;)
    {
        // Construct a quad
        if (i + 3 < polygonArr.length && polygonArr[i + 3] < 0)
        {
            polygons[polyginIdx++] = [i, i + 1, i + 2, i + 3];
            i += 4;
        }
        // construct triangle.
        else if (i + 2 < polygonArr.length && polygonArr[i + 2] < 0)
        {
            polygons[polyginIdx++] = [i, i + 1, i + 2];
            i += 3;
        }
        else
            throw new Error("Invalid length of polygon index list.");
    }

    // Extract normals
    if (normalNode)
    {
        polygonNormals = extractVertexData(normalNode, "Normals", polygons, polygonVertices, vec3Wrapper);
    }

    if (uv0Node)
    {
        polygonUV0 = extractVertexData(uv0Node, "UV", polygons, polygonVertices, vec2Wrapper);
    }
    if (uv1Node)
    {
        polygonUV1 = extractVertexData(uv1Node, "UV", polygons, polygonVertices, vec2Wrapper);
    }

    // Set materials & split mesh.
    if (matNode)
    {
        const materialPolygons = new Map<number, number[]>();
        const mappingInfoType = prop(matNode, "MappingInformationType");
        const refInfoType = prop(matNode, "ReferenceInformationType");
        const materials = prop<Int32Array>(matNode, "Materials") ?? panic("Missing materials.");

        if (mappingInfoType === "AllSame")
        {
            return [{
                id: geometryID,
                name: geometryName,
                colors: [],
                verts: polygonVertices,
                normals: polygonNormals,
                triangles: flatTriangles(polygons),
                uv0: polygonUV0,
                uv1: polygonUV1,
                material: null as any,
                mateiralId: 0
            }];
        }
        if (mappingInfoType === "ByPolygon" && refInfoType === "IndexToDirect")
        {
            assert(materials.length === polygons.length, "length of Material list missmatch.");
            for (let i = 0; i < materials.length; i++)
            {
                if (!materialPolygons.has(materials[i]))
                    materialPolygons.set(materials[i], []);
                (materialPolygons.get(materials[i]) as number[]).push(i);
            }

        }
        else
            throw new Error(`Unsupported material info type '${mappingInfoType}', '${refInfoType}'.`);
        
        const meshes: FBXMesh[] = [];
        
        for (const [matId, subPolygonIdx] of materialPolygons)
        {
            const mesh: FBXMesh = {
                id: geometryID,
                name: geometryName,
                colors: [],
                verts: [],
                normals: [],
                triangles: [],
                uv0: [],
                uv1: [],
                material: null as any,
                mateiralId: matId
            };
            let vertIdx = 0;

            const subPolygons: number[][] = [];

            for (const polyIdx of subPolygonIdx)
            {
                subPolygons.push(polygons[polyIdx]);

                for (let i = 0; i < polygons[polyIdx].length; i++)
                {
                    const originalVertIdx = polygons[polyIdx][i];

                    mesh.verts[vertIdx] = polygonVertices[originalVertIdx];
                    //mesh.polygons[vertIdx] = vertIdx;
                    if (polygonNormals.length > 0)
                        mesh.normals[vertIdx] = polygonNormals[originalVertIdx];
                    if (polygonUV0.length > 0)
                        mesh.uv0[vertIdx] = polygonUV0[originalVertIdx];
                    if (polygonUV1.length > 0)
                        mesh.uv1[vertIdx] = polygonUV1[originalVertIdx];
                    vertIdx++;
                }
            }
            mesh.triangles = flatTriangles(subPolygons);
            meshes.push(mesh);
        }
        return meshes;
    }

    return [{
        id: geometryID,
        name: geometryName,
        colors: [],
        verts: polygonVertices,
        normals: polygonNormals,
        triangles: flatTriangles(polygons),
        uv0: polygonUV0,
        uv1: polygonUV1,
        material: null as any,
        mateiralId: 0
    }];
}

function extractVertexData<DataT extends number | vec2 | vec3 | boolean, PropT extends FBXPropertyType>(node: FBXNode, propName: string, polygons: number[][], verts: vec3[], dataWrapper: (data: PropT)=>DataT[])
{
    const dataProp = prop<PropT>(node, propName) ?? panic(`Invalid data format of '${propName}'.`);
    const dataSet = dataWrapper(dataProp);
    let vertexDataSet: DataT[] = new Array(verts.length);

    const mappingInfoType = prop<string>(node, "MappingInformationType");
    const refInfoType = prop<string>(node, "ReferenceInformationType");
    if (mappingInfoType === "ByPolygon")
    {
        if (refInfoType === "Direct")
        {
            assert(dataSet.length === polygons.length, "Invalid length of normal list.");
            for (let i = 0; i < dataSet.length; i++)
            {
                for (let j = 0; j < polygons.length; j++)
                    vertexDataSet[polygons[i][j]] = dataSet[i];
            }
        }
        else if (refInfoType === "IndexToDirect")
        {
            const dataIndex = prop<Int32Array>(node, `${propName}Index`) ?? panic(`${propName}Index missing.`);
            assert(dataIndex.length === verts.length, `Length of ${propName}Index missmatch.`);
            for (let i = 0; i < polygons.length; i++)
            {
                for (let j = 0; j < polygons[i].length; j++)
                    vertexDataSet[polygons[i][j]] = dataSet[dataIndex[i]];
            }
        }
    }
    else if (mappingInfoType === "ByPolygonVertex")
    {
        if (refInfoType === "Direct")
        {
            assert(dataSet.length === verts.length, `Invalid length of ${propName}`);
            vertexDataSet = dataSet;
        }
        else if (refInfoType === "IndexToDirect")
        {
            const dataIndex = prop<Int32Array>(node, `${propName}Index`) ?? panic(`${propName}Index missing.`);
            assert(dataIndex.length === verts.length, `Length of ${propName}Index missmatch.`);
            for (let i = 0; i < dataIndex.length; i++)
                vertexDataSet[i] = dataSet[dataIndex[i]];
        }
    }
    else if (mappingInfoType === "ByEdge")
    {
        throw new Error(`Mapping '${propName}' by edge is not supported.`);
    }
    else if (mappingInfoType === "AllSame")
    {
        for (let i = 0; i < vertexDataSet.length; i++)
        {
            vertexDataSet[i] = dataSet[0];
        }
    }
    else
    {
        throw new Error(`Unknown mapping type for '${propName}'.`)
    }
    return vertexDataSet;
}

function vec3Wrapper(data: Float64Array)
{
    assert(data.length % 3 === 0, "Invalid data length for vec3 array.");
    const list: vec3[] = new Array(data.length / 3);
    for (let i = 0; i < data.length; i += 3)
    {
        list[i / 3] = vec3.fromValues(data[i], data[i + 1], data[i + 2]);
    }
    return list;
}
function vec2Wrapper(data: Float64Array)
{
    assert(data.length % 2 === 0, "Invalid data length for vec2 array.");
    const list: vec2[] = new Array(data.length / 2);
    for (let i = 0; i < data.length; i += 2)
        list[i / 2] = vec2.fromValues(data[i], data[i + 1]);
    return list;
}

function flatTriangles(polygons: number[][])
{
    const triangles: number[] = [];
    for (const polygon of polygons)
    {
        if (polygon.length === 3)
            triangles.push(...polygon);
        else if (polygon.length === 4)
            triangles.push(polygon[0], polygon[1], polygon[2], polygon[0], polygon[2], polygon[3]);
        else
            throw new Error("Invalid polygon size.");
    }
    return triangles;
}

function importMaterial(materialNode: FBXNode)
{
    const material: FBXMaterial = {
        id: materialNode.properties[0] as bigint,
        name: (materialNode.properties[1] as string).split("\0")[0],
    };
    const props = materialNode.nestedNodes.find(n => n.name === "Properties70");
    if (props)
    {
        for (const property of props.nestedNodes)
        {
            const name = property.properties[0] as string;
            const type = property.properties[1] as string;
            switch (type)
            {
                case "KString":
                    material[name] = property.properties[4] as string;
                    break;
                case "double":
                case "Number":
                    material[name] = property.properties[4] as number;
                    break;
                case "Color":
                    const [, , , , r, g, b] = property.properties as number[];
                    material[name] = vec4.fromValues(r, g, b, 1);
                    break;
                case "Bool":
                    material[name] = property.properties[4] === 1;
                    break;
                case "Vector3D":
                    const [, , , , x, y, z] = property.properties as number[];
                    material[name] = vec3.fromValues(x, y, z);
                    break;
                default:
                    console.warn(`Unknown material property type '${type}'`);
            }
        }
    }
    return material;
}

function connectResources(node: FBXNode, resourceDict: Map<bigint, Resource>)
{
    for (const connect of node.nestedNodes)
    {
        const [, srcID, dstID] = connect.properties as bigint[];
        const src = resourceDict.get(srcID); //?? panic(`Resource with id '${srcID}' missing.`);
        const dst = resourceDict.get(dstID); //?? panic(`Resource with id '${dstID}' missing.`);
        if (!src)
        {
            console.warn(`Resource with id '${srcID}' is missing.`);
            continue;
        }
        if (!dst)
        {
            console.warn(`Resource with id '${dstID}' is missing.`);
            continue;
        }
        if (src.type === "model" && dst.type === "model")
        {
            (src.data as FBXModel).transform.parent = (dst.data as FBXModel).transform;
            (dst.data as FBXModel).transform.children.push((src.data as FBXModel).transform);
        }
        else if (src.type === "geometry" && dst.type === "model")
        {
            (dst.data as FBXModel).meshes = (src.data as FBXMesh[]);
        }
        else if (src.type === "material" && dst.type === "model")
        {
            (dst.data as FBXModel).materials.push(src.data as FBXMaterial);
        }
    }
}

function prop<T extends FBXPropertyType>(node: FBXNode, name: string, idx = 0)
{
    return node.nestedNodes.find(n => n.name === name)?.properties[idx] as (T | undefined);
}
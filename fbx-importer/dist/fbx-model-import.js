"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractFBXAssets = void 0;
const fbx_types_1 = require("./fbx-types");
const gl_matrix_1 = require("gl-matrix");
const utils_1 = require("./utils");
const utils_2 = require("./utils");
function extractFBXAssets(fbx) {
    const objsNode = fbx.nodes.find(node => node.name === "Objects");
    if (!objsNode)
        return { materials: [], models: [] };
    const resourceDict = new Map();
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
    for (const model of models) {
        for (const mesh of model.meshes) {
            mesh.material = model.materials[mesh.mateiralId];
        }
    }
    return {
        materials: materials,
        models: models
    };
}
exports.extractFBXAssets = extractFBXAssets;
function importModel(node) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    const model = {
        id: node.properties[0],
        name: node.properties[1].split("\0")[0],
        meshes: [],
        materials: [],
        transform: null,
    };
    model.transform = new fbx_types_1.FBXTransform(model);
    const props = node.nestedNodes.find(n => n.name === "Properties70");
    const translationNode = props === null || props === void 0 ? void 0 : props.nestedNodes.find(n => n.properties[0] === "Lcl Translation");
    const rotationNode = props === null || props === void 0 ? void 0 : props.nestedNodes.find(n => n.properties[0] === "Lcl Rotation");
    const scalingNode = props === null || props === void 0 ? void 0 : props.nestedNodes.find(n => n.properties[0] === "Lcl Scaling");
    const preRotation = props === null || props === void 0 ? void 0 : props.nestedNodes.find(n => n.properties[0] === "PreRotation");
    model.transform.localPosition = gl_matrix_1.vec3.fromValues(((_a = translationNode === null || translationNode === void 0 ? void 0 : translationNode.properties[4]) !== null && _a !== void 0 ? _a : 0), ((_b = translationNode === null || translationNode === void 0 ? void 0 : translationNode.properties[5]) !== null && _b !== void 0 ? _b : 0), ((_c = translationNode === null || translationNode === void 0 ? void 0 : translationNode.properties[6]) !== null && _c !== void 0 ? _c : 0));
    model.transform.localRotation = gl_matrix_1.quat.fromEuler(gl_matrix_1.quat.create(), ((_d = rotationNode === null || rotationNode === void 0 ? void 0 : rotationNode.properties[4]) !== null && _d !== void 0 ? _d : 0), ((_e = rotationNode === null || rotationNode === void 0 ? void 0 : rotationNode.properties[5]) !== null && _e !== void 0 ? _e : 0), ((_f = rotationNode === null || rotationNode === void 0 ? void 0 : rotationNode.properties[6]) !== null && _f !== void 0 ? _f : 0));
    model.transform.localScaling = gl_matrix_1.vec3.fromValues(((_g = scalingNode === null || scalingNode === void 0 ? void 0 : scalingNode.properties[4]) !== null && _g !== void 0 ? _g : 1), ((_h = scalingNode === null || scalingNode === void 0 ? void 0 : scalingNode.properties[5]) !== null && _h !== void 0 ? _h : 1), ((_j = scalingNode === null || scalingNode === void 0 ? void 0 : scalingNode.properties[6]) !== null && _j !== void 0 ? _j : 1));
    if (preRotation) {
        model.transform.localRotation = gl_matrix_1.quat.mul(model.transform.localRotation, gl_matrix_1.quat.fromEuler(gl_matrix_1.quat.create(), (_k = preRotation.properties[4]) !== null && _k !== void 0 ? _k : 0, (_l = preRotation.properties[5]) !== null && _l !== void 0 ? _l : 0, (_m = preRotation.properties[6]) !== null && _m !== void 0 ? _m : 0), model.transform.localRotation);
    }
    return model;
}
function importGeometry(node) {
    var _a, _b, _c, _d, _e;
    const geometryID = node.properties[0];
    const geometryName = node.properties[1].split("\0")[0];
    const vertsArr = ((_b = (_a = node.nestedNodes.find(n => n.name === "Vertices")) === null || _a === void 0 ? void 0 : _a.properties[0]) !== null && _b !== void 0 ? _b : new Float64Array());
    const polygonArr = ((_d = (_c = node.nestedNodes.find(n => n.name === "PolygonVertexIndex")) === null || _c === void 0 ? void 0 : _c.properties[0]) !== null && _d !== void 0 ? _d : new Int32Array());
    const normalNode = node.nestedNodes.find(n => n.name === "LayerElementNormal");
    const uv0Node = node.nestedNodes.find(n => n.name === "LayerElementUV" && n.properties[0] === 0);
    const uv1Node = node.nestedNodes.find(n => n.name === "LayerElementUV" && n.properties[0] === 1);
    const matNode = node.nestedNodes.find(n => n.name === "LayerElementMaterial");
    let polygons = [];
    let polygonVertices = [];
    let polygonNormals = [];
    let polygonUV0 = [];
    let polygonUV1 = [];
    // Extract verts.
    if (vertsArr.length % 3 !== 0)
        throw new Error("Invalid vertices size.");
    const verts = vec3Wrapper(vertsArr);
    // Construct polygons.
    polygonVertices = Array.from(polygonArr).map(idx => verts[idx >= 0 ? idx : -1 ^ idx]);
    let polyginIdx = 0;
    for (let i = 0; i < polygonArr.length;) {
        // Construct a quad
        if (i + 3 < polygonArr.length && polygonArr[i + 3] < 0) {
            polygons[polyginIdx++] = [i, i + 1, i + 2, i + 3];
            i += 4;
        }
        // construct triangle.
        else if (i + 2 < polygonArr.length && polygonArr[i + 2] < 0) {
            polygons[polyginIdx++] = [i, i + 1, i + 2];
            i += 3;
        }
        else
            throw new Error("Invalid length of polygon index list.");
    }
    // Extract normals
    if (normalNode) {
        polygonNormals = extractVertexData(normalNode, "Normals", polygons, polygonVertices, vec3Wrapper);
    }
    if (uv0Node) {
        polygonUV0 = extractVertexData(uv0Node, "UV", polygons, polygonVertices, vec2Wrapper);
    }
    if (uv1Node) {
        polygonUV1 = extractVertexData(uv1Node, "UV", polygons, polygonVertices, vec2Wrapper);
    }
    // Set materials & split mesh.
    if (matNode) {
        const materialPolygons = new Map();
        const mappingInfoType = prop(matNode, "MappingInformationType");
        const refInfoType = prop(matNode, "ReferenceInformationType");
        const materials = (_e = prop(matNode, "Materials")) !== null && _e !== void 0 ? _e : utils_1.panic("Missing materials.");
        if (mappingInfoType === "AllSame") {
            return [{
                    id: geometryID,
                    name: geometryName,
                    colors: [],
                    verts: polygonVertices,
                    normals: polygonNormals,
                    triangles: flatTriangles(polygons),
                    uv0: polygonUV0,
                    uv1: polygonUV1,
                    material: null,
                    mateiralId: 0
                }];
        }
        if (mappingInfoType === "ByPolygon" && refInfoType === "IndexToDirect") {
            utils_2.assert(materials.length === polygons.length, "length of Material list missmatch.");
            for (let i = 0; i < materials.length; i++) {
                if (!materialPolygons.has(materials[i]))
                    materialPolygons.set(materials[i], []);
                materialPolygons.get(materials[i]).push(i);
            }
        }
        else
            throw new Error(`Unsupported material info type '${mappingInfoType}', '${refInfoType}'.`);
        const meshes = [];
        for (const [matId, subPolygonIdx] of materialPolygons) {
            const mesh = {
                id: geometryID,
                name: geometryName,
                colors: [],
                verts: [],
                normals: [],
                triangles: [],
                uv0: [],
                uv1: [],
                material: null,
                mateiralId: matId
            };
            let vertIdx = 0;
            const subPolygons = [];
            for (const polyIdx of subPolygonIdx) {
                subPolygons.push(polygons[polyIdx]);
                for (let i = 0; i < polygons[polyIdx].length; i++) {
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
            material: null,
            mateiralId: 0
        }];
}
function extractVertexData(node, propName, polygons, verts, dataWrapper) {
    var _a, _b, _c;
    const dataProp = (_a = prop(node, propName)) !== null && _a !== void 0 ? _a : utils_1.panic(`Invalid data format of '${propName}'.`);
    const dataSet = dataWrapper(dataProp);
    let vertexDataSet = new Array(verts.length);
    const mappingInfoType = prop(node, "MappingInformationType");
    const refInfoType = prop(node, "ReferenceInformationType");
    if (mappingInfoType === "ByPolygon") {
        if (refInfoType === "Direct") {
            utils_2.assert(dataSet.length === polygons.length, "Invalid length of normal list.");
            for (let i = 0; i < dataSet.length; i++) {
                for (let j = 0; j < polygons.length; j++)
                    vertexDataSet[polygons[i][j]] = dataSet[i];
            }
        }
        else if (refInfoType === "IndexToDirect") {
            const dataIndex = (_b = prop(node, `${propName}Index`)) !== null && _b !== void 0 ? _b : utils_1.panic(`${propName}Index missing.`);
            utils_2.assert(dataIndex.length === verts.length, `Length of ${propName}Index missmatch.`);
            for (let i = 0; i < polygons.length; i++) {
                for (let j = 0; j < polygons[i].length; j++)
                    vertexDataSet[polygons[i][j]] = dataSet[dataIndex[i]];
            }
        }
    }
    else if (mappingInfoType === "ByPolygonVertex") {
        if (refInfoType === "Direct") {
            utils_2.assert(dataSet.length === verts.length, `Invalid length of ${propName}`);
            vertexDataSet = dataSet;
        }
        else if (refInfoType === "IndexToDirect") {
            const dataIndex = (_c = prop(node, `${propName}Index`)) !== null && _c !== void 0 ? _c : utils_1.panic(`${propName}Index missing.`);
            utils_2.assert(dataIndex.length === verts.length, `Length of ${propName}Index missmatch.`);
            for (let i = 0; i < dataIndex.length; i++)
                vertexDataSet[i] = dataSet[dataIndex[i]];
        }
    }
    else if (mappingInfoType === "ByEdge") {
        throw new Error(`Mapping '${propName}' by edge is not supported.`);
    }
    else if (mappingInfoType === "AllSame") {
        for (let i = 0; i < vertexDataSet.length; i++) {
            vertexDataSet[i] = dataSet[0];
        }
    }
    else {
        throw new Error(`Unknown mapping type for '${propName}'.`);
    }
    return vertexDataSet;
}
function vec3Wrapper(data) {
    utils_2.assert(data.length % 3 === 0, "Invalid data length for vec3 array.");
    const list = new Array(data.length / 3);
    for (let i = 0; i < data.length; i += 3) {
        list[i / 3] = gl_matrix_1.vec3.fromValues(data[i], data[i + 1], data[i + 2]);
    }
    return list;
}
function vec2Wrapper(data) {
    utils_2.assert(data.length % 2 === 0, "Invalid data length for vec2 array.");
    const list = new Array(data.length / 2);
    for (let i = 0; i < data.length; i += 2)
        list[i / 2] = gl_matrix_1.vec2.fromValues(data[i], data[i + 1]);
    return list;
}
function flatTriangles(polygons) {
    const triangles = [];
    for (const polygon of polygons) {
        if (polygon.length === 3)
            triangles.push(...polygon);
        else if (polygon.length === 4)
            triangles.push(polygon[0], polygon[1], polygon[2], polygon[0], polygon[2], polygon[3]);
        else
            throw new Error("Invalid polygon size.");
    }
    return triangles;
}
function importMaterial(materialNode) {
    const material = {
        id: materialNode.properties[0],
        name: materialNode.properties[1].split("\0")[0],
    };
    const props = materialNode.nestedNodes.find(n => n.name === "Properties70");
    if (props) {
        for (const property of props.nestedNodes) {
            const name = property.properties[0];
            const type = property.properties[1];
            switch (type) {
                case "KString":
                    material[name] = property.properties[4];
                    break;
                case "double":
                case "Number":
                    material[name] = property.properties[4];
                    break;
                case "Color":
                    const [, , , , r, g, b] = property.properties;
                    material[name] = gl_matrix_1.vec4.fromValues(r, g, b, 1);
                    break;
                case "Bool":
                    material[name] = property.properties[4] === 1;
                    break;
                case "Vector3D":
                    const [, , , , x, y, z] = property.properties;
                    material[name] = gl_matrix_1.vec3.fromValues(x, y, z);
                    break;
                default:
                    console.warn(`Unknown material property type '${type}'`);
            }
        }
    }
    return material;
}
function connectResources(node, resourceDict) {
    for (const connect of node.nestedNodes) {
        const [, srcID, dstID] = connect.properties;
        const src = resourceDict.get(srcID); //?? panic(`Resource with id '${srcID}' missing.`);
        const dst = resourceDict.get(dstID); //?? panic(`Resource with id '${dstID}' missing.`);
        if (!src) {
            console.warn(`Resource with id '${srcID}' is missing.`);
            continue;
        }
        if (!dst) {
            console.warn(`Resource with id '${dstID}' is missing.`);
            continue;
        }
        if (src.type === "model" && dst.type === "model") {
            src.data.transform.parent = dst.data.transform;
            dst.data.transform.children.push(src.data.transform);
        }
        else if (src.type === "geometry" && dst.type === "model") {
            dst.data.meshes = src.data;
        }
        else if (src.type === "material" && dst.type === "model") {
            dst.data.materials.push(src.data);
        }
    }
}
function prop(node, name, idx = 0) {
    var _a;
    return (_a = node.nestedNodes.find(n => n.name === name)) === null || _a === void 0 ? void 0 : _a.properties[idx];
}
//# sourceMappingURL=fbx-model-import.js.map
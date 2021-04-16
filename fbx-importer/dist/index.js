"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zogra_engine_1 = require("zogra-engine");
const zogra_engine_2 = require("zogra-engine");
const zogra_engine_3 = require("zogra-engine");
const zogra_engine_4 = require("zogra-engine");
const zogra_engine_5 = require("zogra-engine");
const zogra_engine_6 = require("zogra-engine");
const zogra_engine_7 = require("zogra-engine");
const zogra_engine_8 = require("zogra-engine");
const fbx_binary_parser_1 = require("./fbx-binary-parser");
const fbx_model_import_1 = require("./fbx-model-import");
function toManagedAssets(resource, ctx = zogra_engine_2.GlobalContext()) {
    const pack = new zogra_engine_1.AssetsPack();
    const resourceMap = new Map();
    const meshConverter = convertMesh(ctx);
    for (const fbxMat of resource.materials) {
        const mat = new ctx.assets.types.DefaultLit(ctx.gl);
        mat.name = fbxMat.name;
        mat.color = getColor(fbxMat, "DiffuseColor", mat.color);
        mat.emission = getColor(fbxMat, "Emissive", mat.emission);
        mat.specular = getColor(fbxMat, "Specular", mat.specular);
        mat.emission.mul(zogra_engine_4.vec4(getFloat(fbxMat, "EmissiveFactor", 1)));
        resourceMap.set(fbxMat.id, mat);
        pack.add(mat.name, mat);
    }
    for (const model of resource.models) {
        const obj = new zogra_engine_5.RenderObject(ctx);
        obj.name = model.name;
        obj.localPosition = zogra_engine_6.vec3.from(model.transform.localPosition);
        obj.localRotation = zogra_engine_1.quat(...model.transform.localRotation);
        obj.localScaling = zogra_engine_6.vec3.from(model.transform.localScaling);
        obj.meshes = model.meshes.map(meshConverter);
        obj.meshes.forEach((m, i) => pack.add(`${obj.name}_${i}`, m));
        obj.materials = model.meshes.map(mesh => { var _a; return ((_a = resourceMap.get(mesh.material.id)) !== null && _a !== void 0 ? _a : ctx.assets.materials.default); });
        resourceMap.set(model.id, obj);
    }
    const wrapper = new zogra_engine_5.Entity();
    wrapper.name = "FBX Model";
    pack.add("FBX Model", wrapper);
    pack.setMain(wrapper);
    for (const model of resource.models) {
        if (model.transform.parent) {
            var child = resourceMap.get(model.id);
            var parent = resourceMap.get(model.transform.parent.model.id);
            child.parent = parent;
        }
        else
            resourceMap.get(model.id).parent = wrapper;
    }
    for (const asset of resourceMap.values()) {
        pack.add(asset.name, asset);
    }
    return pack;
}
function getColor(fbxMat, name, defaultValue = zogra_engine_3.Color.white) {
    if (fbxMat[name] === undefined || fbxMat[name].length < 3)
        return defaultValue;
    if (fbxMat[name].length === 3) {
        const [r, g, b] = fbxMat[name];
        return new zogra_engine_3.Color(r, g, b);
    }
    const [r, g, b, a] = fbxMat[name];
    return new zogra_engine_3.Color(r, g, b, a);
}
function getFloat(fbxMat, name, defaultValue = 0) {
    if (fbxMat[name] === undefined)
        return defaultValue;
    if (isNaN(fbxMat[name]))
        return defaultValue;
    return fbxMat[name];
}
function convertMesh(ctx) {
    return (fbxMesh) => {
        const mesh = new zogra_engine_7.Mesh(ctx);
        mesh.verts = fbxMesh.verts.map(v => zogra_engine_6.vec3.from(v));
        mesh.normals = fbxMesh.normals.map(v => zogra_engine_6.vec3.from(v));
        mesh.uvs = fbxMesh.uv0.map(v => zogra_engine_8.vec2.from(v));
        mesh.triangles = fbxMesh.triangles;
        mesh.vertices.forEach(v => v.color.fill(1));
        mesh.colors = fbxMesh.colors.map(v => new zogra_engine_3.Color(...v));
        /*if (fbxMesh.type === "quad")
        {
            mesh.triangles = new Array(fbxMesh.polygons.length / 4 * 6);
            for (let i = 0; i < fbxMesh.polygons.length; i += 4)
            {
                const triangleIdx = i / 4 * 6;
                mesh.triangles[triangleIdx + 0] = fbxMesh.polygons[i + 0];
                mesh.triangles[triangleIdx + 1] = fbxMesh.polygons[i + 1];
                mesh.triangles[triangleIdx + 2] = fbxMesh.polygons[i + 2];
                mesh.triangles[triangleIdx + 3] = fbxMesh.polygons[i + 0];
                mesh.triangles[triangleIdx + 4] = fbxMesh.polygons[i + 2];
                mesh.triangles[triangleIdx + 5] = fbxMesh.polygons[i + 3];
            }
        }
        else
            mesh.triangles = Array.from(fbxMesh.polygons);*/
        mesh.update();
        return mesh;
    };
}
const FBXModelImporter = {
    async import(buffer, options, ctx = zogra_engine_2.GlobalContext()) {
        const data = fbx_binary_parser_1.parseFBX(buffer);
        const assets = fbx_model_import_1.extractFBXAssets(data);
        return toManagedAssets(assets, ctx);
    }
};
const importers = {
    fbx: FBXModelImporter
};
const FBXImporter = new zogra_engine_1.AssetsImporter(importers);
exports.default = FBXImporter;
//# sourceMappingURL=index.js.map
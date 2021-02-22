"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FBXImporter = void 0;
const zogra_renderer_1 = require("zogra-renderer");
const zogra_renderer_2 = require("zogra-renderer");
const zogra_renderer_3 = require("zogra-renderer");
const zogra_renderer_4 = require("zogra-renderer");
const zogra_renderer_5 = require("zogra-renderer");
const zogra_renderer_6 = require("zogra-renderer");
const zogra_renderer_7 = require("zogra-renderer");
const zogra_renderer_8 = require("zogra-renderer");
const fbx_binary_parser_1 = require("./fbx-binary-parser");
const fbx_model_import_1 = require("./fbx-model-import");
function toManagedAssets(resource, ctx = zogra_renderer_2.GlobalContext()) {
    const pack = new zogra_renderer_1.AssetsPack();
    const resourceMap = new Map();
    const meshConverter = convertMesh(ctx);
    for (const fbxMat of resource.materials) {
        const mat = new ctx.assets.types.DefaultLit(ctx.gl);
        mat.name = fbxMat.name;
        mat.color = getColor(fbxMat, "DiffuseColor", mat.color);
        mat.emission = getColor(fbxMat, "Emissive", mat.emission);
        mat.specular = getColor(fbxMat, "Specular", mat.specular);
        mat.emission.mul(zogra_renderer_4.vec4(getFloat(fbxMat, "EmissiveFactor", 1)));
        resourceMap.set(fbxMat.id, mat);
        pack.add(mat.name, mat);
    }
    for (const model of resource.models) {
        const obj = new zogra_renderer_5.RenderObject(ctx);
        obj.name = model.name;
        obj.localPosition = zogra_renderer_6.vec3.from(model.transform.localPosition);
        obj.localRotation = model.transform.localRotation;
        obj.localScaling = zogra_renderer_6.vec3.from(model.transform.localScaling);
        obj.meshes = model.meshes.map(meshConverter);
        obj.meshes.forEach((m, i) => pack.add(`${obj.name}_${i}`, m));
        obj.materials = model.meshes.map(mesh => { var _a; return ((_a = resourceMap.get(mesh.material.id)) !== null && _a !== void 0 ? _a : ctx.assets.materials.default); });
        resourceMap.set(model.id, obj);
    }
    const wrapper = new zogra_renderer_5.Entity();
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
function getColor(fbxMat, name, defaultValue = zogra_renderer_3.Color.white) {
    if (fbxMat[name] === undefined || fbxMat[name].length < 3)
        return defaultValue;
    if (fbxMat[name].length === 3) {
        const [r, g, b] = fbxMat[name];
        return new zogra_renderer_3.Color(r, g, b);
    }
    const [r, g, b, a] = fbxMat[name];
    return new zogra_renderer_3.Color(r, g, b, a);
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
        const mesh = new zogra_renderer_7.Mesh(ctx.gl);
        mesh.verts = fbxMesh.verts.map(v => zogra_renderer_6.vec3.from(v));
        mesh.normals = fbxMesh.normals.map(v => zogra_renderer_6.vec3.from(v));
        mesh.uvs = fbxMesh.uv0.map(v => zogra_renderer_8.vec2.from(v));
        mesh.triangles = fbxMesh.triangles;
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
exports.FBXImporter = {
    async import(buffer, options, ctx = zogra_renderer_2.GlobalContext()) {
        const data = fbx_binary_parser_1.parseFBX(buffer);
        const assets = fbx_model_import_1.extractFBXAssets(data);
        return toManagedAssets(assets, ctx);
    }
};
//# sourceMappingURL=index.js.map
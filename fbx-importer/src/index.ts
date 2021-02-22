import { FBXAssets, FBXMaterial, FBXID, FBXMesh } from "./fbx-types";
import { AssetsImporterPlugin } from "zogra-renderer";
import { AssetsPack, AssetImportOptions } from "zogra-renderer";
import { GlobalContext, GLContext } from "zogra-renderer";
import { Material } from "zogra-renderer";
import { Color } from "zogra-renderer";
import { vec4 } from "zogra-renderer";
import { Asset, IAsset } from "zogra-renderer";
import { RenderObject, Entity } from "zogra-renderer";
import { vec3 } from "zogra-renderer";
import { Mesh } from "zogra-renderer";
import { vec2 } from "zogra-renderer";
import { parseFBX } from "./fbx-binary-parser";
import { extractFBXAssets } from "./fbx-model-import";

function toManagedAssets(resource: FBXAssets, ctx = GlobalContext()): AssetsPack
{
    const pack = new AssetsPack();
    const resourceMap = new Map<FBXID, IAsset>();
    const meshConverter = convertMesh(ctx);

    for (const fbxMat of resource.materials)
    {
        const mat = new ctx.assets.types.DefaultLit(ctx.gl);
        mat.name = fbxMat.name;
        mat.color = getColor(fbxMat, "DiffuseColor", mat.color);
        mat.emission = getColor(fbxMat, "Emissive", mat.emission);
        mat.specular = getColor(fbxMat, "Specular", mat.specular);
        mat.emission.mul(vec4(getFloat(fbxMat, "EmissiveFactor", 1)));
        resourceMap.set(fbxMat.id, mat);
        pack.add(mat.name, mat);
    }
    for (const model of resource.models)
    {
        const obj = new RenderObject(ctx);
        obj.name = model.name;
        obj.localPosition = vec3.from(model.transform.localPosition);
        obj.localRotation = model.transform.localRotation;
        obj.localScaling = vec3.from(model.transform.localScaling);
        obj.meshes = model.meshes.map(meshConverter);
        obj.meshes.forEach((m, i) => pack.add(`${obj.name}_${i}`, m));
        obj.materials = model.meshes.map(mesh => (resourceMap.get(mesh.material.id) ?? ctx.assets.materials.default) as Material);
        resourceMap.set(model.id, obj);
    }

    const wrapper = new Entity();
    wrapper.name = "FBX Model";
    pack.add("FBX Model", wrapper);
    pack.setMain(wrapper);

    for (const model of resource.models)
    {
        if (model.transform.parent)
        {
            var child = resourceMap.get(model.id) as RenderObject;
            var parent = resourceMap.get(model.transform.parent.model.id) as RenderObject;
            child.parent = parent;
        }
        else
            (resourceMap.get(model.id) as RenderObject).parent = wrapper;
    }
    for (const asset of resourceMap.values())
    {
        pack.add(asset.name, asset);
    }
    return pack;
}

function getColor(fbxMat: FBXMaterial, name: string, defaultValue: Color = Color.white)
{
    if (fbxMat[name] === undefined || (fbxMat[name] as Float32Array).length < 3)
        return defaultValue;
    if ((fbxMat[name] as Float32Array).length === 3)
    {
        const [r, g, b] = fbxMat[name] as Iterable<number>;
        return new Color(r, g, b);
    }
    const [r, g, b, a] = fbxMat[name] as Iterable<number>;
    return new Color(r, g, b, a);
}

function getFloat(fbxMat: FBXMaterial, name: string, defaultValue = 0)
{
    if (fbxMat[name] === undefined)
        return defaultValue;
    if (isNaN(fbxMat[name] as number))
        return defaultValue;
    return fbxMat[name] as number;
}

function convertMesh(ctx: GLContext)
{
    return (fbxMesh: FBXMesh): Mesh =>
    {
        const mesh = new Mesh(ctx.gl);
        mesh.verts = fbxMesh.verts.map(v => vec3.from(v));
        mesh.normals = fbxMesh.normals.map(v => vec3.from(v));
        mesh.uvs = fbxMesh.uv0.map(v => vec2.from(v));
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

export const FBXImporter: AssetsImporterPlugin = {
    async import(buffer: ArrayBuffer, options?: AssetImportOptions, ctx: GLContext = GlobalContext())
    {
        const data = parseFBX(buffer);
        const assets = extractFBXAssets(data);
        return toManagedAssets(assets, ctx);
    }
}
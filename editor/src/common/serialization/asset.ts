import { Asset, Shader, Material, Texture, Mesh, RenderObject, Entity, Camera, Light, IAsset, RenderTexture, Texture2D, Scene } from "zogra-renderer";
import { UserAssetsManager } from "../assets/user-assets";
import { RenderTarget } from "../../../../dist/core/render-target";
import { serializeScene } from "./scene";


export interface SerializedAsset
{
    import: "built-in" | "fetch" | "local" | "unknown";
    assetID: number;
    name: string;
    path: string;
    type: AssetTypes;
    props: { [key: string]: any };
}
export interface SerializedAssetFolder
{
    name: string;
    children: (SerializedAssetFolder | number)[];
}
export function serializeAsset(asset: IAsset, manager: UserAssetsManager): SerializedAsset
{
    const type = typeOf(asset);
    const serialized: SerializedAsset = {
        assetID: asset.assetID,
        name: asset.name,
        type: type,
        import: "unknown",
        path: "",
        props: serializer[type](asset as any, manager)
    };
    if (manager.builtinAssets.hasValue(asset))
    {
        serialized.import = "built-in";
        serialized.path = manager.builtinAssets.getKey(asset) as string;
    }
    else if (manager.userAssets.has(asset.assetID))
    {
        if (manager.userAssets.get(asset.assetID)?.import === "import")
        {
            serialized.import = "fetch";
            serialized.path = manager.userAssets.get(asset.assetID)?.path ?? "";
        }
        else if (manager.userAssets.get(asset.assetID)?.import === "create")
        {
            serialized.import = "local";
            serialized.path = manager.userAssets.get(asset.assetID)?.path ?? "";
        }
    }
    return serialized;
}

const checkOrder: (keyof typeof types)[] = [
    "shader",
    "material",
    "texture-2d",
    "render-texture",
    "mesh",
    "render-object",
    "camera",
    "light",
    "entity",
    "scene"
];

const types = {
    "shader": Shader,
    "material": Material,
    "texture-2d": Texture2D,
    "render-texture": RenderTexture,
    "mesh": Mesh,
    "render-object": RenderObject,
    "camera": Camera,
    "light": Light,
    "entity": Entity,
    "scene": Scene,
};

type AssetTypes = keyof typeof types | "unknown";
type AssetInstanceType<T extends AssetTypes> = T extends "unknown" ? IAsset : InstanceType<typeof types[T & keyof typeof types]>;

type Serializers = {
    [key in AssetTypes]: (param: AssetInstanceType<key>, manager?: UserAssetsManager) => { [key: string]: any };
};

function typeOf(asset: IAsset): AssetTypes
{
    for (const type of checkOrder)
    {
        const AssetType = types[type];
        if (asset instanceof AssetType)
            return type;
    }
    return "unknown";
}

const serializer: Serializers = {
    "shader": (shader: Shader) =>
    {
        return serializeProps(shader, ["attributes", "vertexShaderSource", "fragmentShaderSouce", "settings"]);
    },
    "material": (material: Material) =>
    {
        const serialized = {
            shader: material.shader.assetID,
            props: {} as any
        }
        for (const key in material.propertyBlock)
        {
            serialized.props[key] = {
                type: material.propertyBlock[key].type,
                value: serializeProps(material[key])
            }
        }
        return serialized;
    },
    "texture-2d": (texture: Texture2D) =>
    {
        return serializeProps(texture, ["filterMode", "format", "width", "height", "wrapMode"]);
    },
    "render-texture": (rt: RenderTexture) =>
    {
        const serialized = serializeProps(rt, ["filterMode", "format", "width", "height", "wrapMode", "mipmapLevel"]);
        serialized.depth = rt.depthTexture === null;
        return serialized;
    },
    "mesh": (mesh: Mesh) =>
    {
        return {};
    },
    "entity": (entity: Entity) =>
    {
        const serialized = serializeProps(entity, ["localPosition", "localRotation", "localScaling"]);
        serialized.parent = entity.parent ? (entity.parent as Entity).assetID : null;
        return serialized;
    },
    "render-object": (obj: RenderObject) =>
    {
        const serialized = serializer["entity"](obj);
        serialized.meshs = obj.meshes.map(m => m.assetID);
        serialized.materials = obj.materials.map(m => m.assetID);
        return serialized;
    },
    "camera": (camera: Camera) =>
    {
        let serialized = serializer["entity"](camera);
        serialized = Object.assign(serialized, serializeProps(camera, ["FOV", "clearColor", "clearDepth", "far", "near", "projection", "viewHeight"]));
        serialized.output = camera.output === RenderTarget.CanvasTarget ? null : (camera.output as RenderTexture).assetID;
        return serialized;
    },
    "light": (light: Light) =>
    {
        let serialized = serializer["entity"](light);
        serialized = Object.assign(serialized, serializeProps(light, ["color", "intensity", "type"]));
        return serialized;
    },
    "scene": (scene, manager) =>
    {
        return serializeScene(scene, manager as UserAssetsManager);  
    },
    "unknown": (asset: IAsset) =>
    {
        return serializeProps(asset);
    }
}

function serializeProps<T>(obj: T, keys?: (keyof T)[]): any | null
{
    if (typeof (obj) === "number")
        return obj;
    else if (typeof (obj) === "string")
        return obj;
    else if (typeof (obj) === "boolean")
        return obj;
    else if (obj instanceof Array)
        return obj.map(element => serializeProps(element));
    
    if (keys)
    {
        const serialized = {} as any;
        for (const key of keys)
            serialized[key] = serializeProps(serialized[key] as any);
        return serialized;
    }
    try
    {
        return JSON.parse(JSON.stringify(obj));
    }
    catch
    {
        return null;
    }
    
}
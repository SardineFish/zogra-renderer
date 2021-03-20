import { Asset, Shader, Material, Texture, Mesh, RenderObject, Entity, Camera, Light, IAsset, RenderTexture, Texture2D, Scene, vec3, quat, vec2, Vector2, Vector3, Vector4, vec4, Color, rgba, PropertyBlock } from "zogra-renderer";
import { UserAssetsManager, AssetNode } from "../assets/user-assets";
import { RenderTarget } from "../../../../dist/core/render-target";
import { serializeScene, deserializeScene, SerializedScene } from "./scene";
import path from "path-browserify";
import { panic } from "../../../../dist/utils/util";

export interface SerializedAsset
{
    restore: "built-in" | "import" | "create" | "unknown";
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
    if (type === "scene")
        return serializeScene(asset as Scene, manager);
    const serialized: SerializedAsset = {
        assetID: asset.assetID,
        name: asset.name,
        type: type,
        restore: "unknown",
        path: "",
        props: serializer[type](asset as any, manager)
    };
    if (manager.builtinAssets.hasValue(asset))
    {
        serialized.restore = "built-in";
        serialized.path = manager.builtinAssets.getKey(asset) as string;
    }
    else if (manager.userAssets.has(asset.assetID))
    {
        if (manager.userAssets.get(asset.assetID)?.import === "import")
        {
            serialized.restore = "import";
            serialized.path = manager.userAssets.get(asset.assetID)?.path ?? "";
        }
        else if (manager.userAssets.get(asset.assetID)?.import === "create")
        {
            serialized.restore = "create";
            serialized.path = manager.userAssets.get(asset.assetID)?.path ?? "";
        }
    }
    else
    {
        serialized.restore = "create";
    }
    return serialized;
}

export function deserializeAsset(serializedAsset: SerializedAsset, manager: UserAssetsManager, restoredAssets: Map<number, IAsset>)
{
    switch (serializedAsset.restore)
    {
        case "built-in":
            return manager.builtinAssets.getValue(serializedAsset.path);
        case "create":
            const instance = instantiaters[serializedAsset.type](serializedAsset.props);
            instance.name = path.basename(serializedAsset.name);
            return instance;
        case "import":
            // const folder = path.dirname(serializedAsset.path);
            // const pack = manager.importedPacks.find(p => serializedAsset.path === p.path || folder === p.path)?.pack;
            // if (!pack)
            // {
            //     console.warn(`Missing imported asset at '${serializedAsset.path}'.`);
            //     return null;
            // }
            const asset = manager.root.find(serializedAsset.path) as AssetNode;
            if (!asset)
                console.warn(`Missing imported asset at '${serializedAsset.path}'.`);
            return asset.asset; // pack.assets.get(path.basename(serializedAsset.path));
    }
    console.warn(`Unknown asset '${serializedAsset.name}' with ID '${serializedAsset.assetID}'.`);
    return null;
}

export function restoreAssetProps(asset: IAsset, serializedAsset: SerializedAsset, manager: UserAssetsManager, restoredAssets: Map<number, IAsset>)
{
    if (serializedAsset.type === "scene")
        return deserializeScene(asset as Scene, serializedAsset as SerializedScene, manager, restoredAssets);
    deserializer[serializedAsset.type](asset as any, serializedAsset.props, restoredAssets);
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
type Instantiaters = {
    [key in AssetTypes]: (props: any) => AssetInstanceType<key>;
}
type Deserializers = {
    [key in AssetTypes]: (asset: AssetInstanceType<key>, props: any, restoredAssets: Map<number, IAsset>) => void;
}

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
                value: material.propertyBlock[key].type === "tex2d" ? ((material[key] as Texture2D)?.assetID ?? null) : serializeProps(material[key]),
                name: material.propertyBlock[key].name,
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
        serialized.meshes = obj.meshes.map(m => m.assetID);
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
            serialized[key] = serializeProps(obj[key] as any);
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

const instantiaters: Instantiaters = {
    "camera": () => new Camera(),
    "entity": () => new Entity(),
    "light": () => new Light(),
    "material": () => new Material(null as any as Shader),
    "render-object": () => new RenderObject(),
    "render-texture": (props) =>
    {
        const rt = props as RenderTexture;
        return new RenderTexture(rt.width, rt.height, props.depth === true, rt.format, rt.filterMode);
    },
    "texture-2d": () => new Texture2D(),
    "mesh": () => new Mesh(),
    "scene": () => new Scene(),
    "shader": (props) =>
    {
        const shader = props as Shader;
        return new Shader(shader.vertexShaderSource, shader.fragmentShaderSouce, shader.settings);
    },
    unknown: () => new Entity()
}

const deserializer: Deserializers = {
    "camera": (camera, props, restoredAssets) =>
    {
        const cmProp = props as Camera;
        deserializer["entity"](camera, props, restoredAssets);
        deserializeProps(camera, props, ["FOV", "clearColor", "clearDepth", "far", "near", "projection", "viewHeight"]);
        camera.output = cmProp.output ? (restoredAssets.get(cmProp.output as any) as RenderTexture ?? RenderTarget.CanvasTarget) : RenderTarget.CanvasTarget;
    },
    "render-object": (obj, props, restored) =>
    {
        deserializer["entity"](obj, props, restored);
        obj.meshes = props.meshes.map((id: number) => restored.get(id));
        obj.materials = props.materials.map((id: number) => restored.get(id));
    },
    "render-texture": () => { },
    "texture-2d": (tex, props) =>
    {
        deserializeProps(tex, props, ["filterMode", "format", "width", "height", "wrapMode"]);
    },
    "entity": (entity, props, restored) =>
    {
        entity.localPosition = deserializeVec[3](props.localPosition);
        entity.localRotation = props.localRotation;
        entity.localScaling = deserializeVec[3](props.localScaling);
        entity.parent = props.parent ? restored.get(props.parent) as Entity : null;
    },
    "light": (light, props, restored) =>
    {
        deserializer["entity"](light, props, restored);
        deserializeProps(light, props, ["color", "intensity", "type"])
    },
    material: (material, props, restored) =>
    {
        material.shader = restored.get(props.shader) as Shader ?? panic(`Missing shader id '${props.shader}'.`);
        const block = props.props;
        for (const key in block)
        {
            switch (block[key].type)
            {
                case "vec2":
                    material.setProp(key, block[key].name, block[key].type, deserializeVec[2](block[key].value));
                    break;
                case "vec3":
                    material.setProp(key, block[key].name, block[key].type, deserializeVec[3](block[key].value));
                    break;
                case "vec4":
                    material.setProp(key, block[key].name, block[key].type, deserializeVec[4](block[key].value));
                    break;
                case "color":
                    material.setProp(key, block[key].name, block[key].type, deserializeColor(block[key].value));
                    break;
                case "tex2d":
                    material.setProp(key, block[key].name, "tex2d", (restored.get(block[key].value) as Texture2D));
                    break;
                default:
                    material.setProp(key, block[key].name, block[key].type, block[key].value);

            }
        }
    },
    mesh: () => { },
    shader: () => { },
    unknown: () => { },
    scene: () => { },

}

function deserializeProps<T>(target: T, props: any, keys?: (keyof T)[])
{
    keys = keys || Object.keys(props) as (keyof T)[];
    for (const key of keys)
    {
        if (props[key] instanceof Array)
        {
            if (target[key] instanceof Vector2)
                (target[key] as any) = vec2(props[key][0], props[key][1]);
            else if (target[key] instanceof Vector3)
                (target[key] as any) = vec3(props[key][0], props[key][1], props[key][2]);
            else if (target[key] instanceof Color)
                (target[key] as any) = rgba(props[key][0], props[key][1], props[key][2], props[key][3]);
            else if (target[key] instanceof Vector4)
                (target[key] as any) = vec4(props[key][0], props[key][1], props[key][2], props[key][3]);
            else if (!(target[key] instanceof Array))
                target[key] = props[key];
            else
                for (let i = 0; i < props[key].length; i++)
                    (target[key] as any)[i] = props[key][i];
        }
        else
        {
            switch (typeof (props[key]))
            {
                case "boolean":
                case "number":
                case "string":
                    target[key] = props[key];
                    break;
                default:
                    target[key] = props[key];
            }
        }
    }
}

const deserializeVec: ((v: any) => any)[] = [t => t, t => t,
(v: any) => vec2(v[0], v[1]),
(v: any) => vec3(v[0], v[1], v[2]),
(v: any) => vec4(v[0], v[1], v[2], v[3])
];
const deserializeColor = (c: any) => rgba(c[0], c[1], c[2], c[3]);
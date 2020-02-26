import "reflect-metadata";

import "reflect-metadata";
import { IAsset, vec2, vec3, vec4, AssetManager } from "zogra-renderer";
import { panic } from "../../util/utils";

export type Serializer<TValue, TSerialized> = [(v: TValue, obj: any, key: string) => TSerialized, (s: TSerialized, obj: any, key: string) => TValue];

interface SerializableProp
{
    name: string;
    serializer: Serializer<any, any>;
};

const serializableMetaKey = Symbol("serializable");

export function serializable(): (target: Object, propertyKey: string | symbol) => void
export function serializable(name: string): (target: Object, propertyKey: string | symbol) => void
export function serializable<TValue, TSerialized>(serializer: Serializer<TValue, TSerialized>): (target: Object, propertyKey: string | symbol) => void
export function serializable<TValue, TSerialized>(name: string, serializer: Serializer<TValue, TSerialized>): (target: Object, propertyKey: string | symbol) => void
export function serializable<TValue, TSerialized>(name?: string | Serializer<TValue, TSerialized>, serializer?: Serializer<TValue, TSerialized>)
{
    return (target: Object, propertyKey: string | symbol) =>
    {
        if (typeof (propertyKey) === "symbol")
            return;

        if (!name)
        {
            name = propertyKey;
            serializer = defaultSerializer;
        }
        else if (typeof (name) !== "string")
        {
            serializer = name as Serializer<TValue, TSerialized>;
            name = propertyKey;
        }
        else if (typeof (name) === "string" && !serializer)
        {
            serializer = defaultSerializer;
        }

        const serializableProp: SerializableProp = {
            name: name,
            serializer: serializer as Serializer<any, any>,
        };

        return Reflect.metadata(serializableMetaKey, serializableProp)(target, propertyKey);
    }
}
function getSerializeProp(target: IAsset, key: string)
{
    return Reflect.getMetadata(serializableMetaKey, target, key) as SerializableProp;
}

const defaultSerializer: Serializer<any, any> = [t => t, t => t];
const vectorSerializer: Serializer<vec2 | vec3 | vec4, number[]> = [v => v, (v, obj, key) =>
{
    switch (v.length)
    {
        case 0:
        case 1:
            return obj[key];
        case 2:
            return vec2(v[0], v[1]);
        case 3:
            return vec3(v[0], v[1], v[2]);
        default:
            return vec4(v[0], v[1], v[2], v[3]);
    }
}];
const assetSerializer: Serializer<IAsset, number> = [asset => asset.assetID, id => AssetManager.find(id) ?? panic(`Missing asset with id '${id}'`)];

export const Serializer = {
    vector: vectorSerializer,
    default: defaultSerializer,
    asset: assetSerializer,
    get: getSerializeProp
};
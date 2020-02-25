import "reflect-metadata";

const serializableMetaKey = Symbol("serializable");
export function serializable(name?: string)
{
    return (target: Object, propertyKey: string | symbol) =>
        Reflect.metadata(serializableMetaKey, { name: name || propertyKey })(target, propertyKey);
}
export function getSerializable(target: Object, propKey: string): { name: string }
{
    return Reflect.getMetadata(serializableMetaKey, target, propKey);
}
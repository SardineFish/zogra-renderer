import "reflect-metadata";

export function panicNull<T>(t: T | null, msg?: string): T
{
    if (t === null)
        throw new Error(msg);
    return t;
}
export function panic(msg?: string): never
{
    throw new Error(msg);
}

type DecoratorFunc<T> = (value?: T) => {
    (target: Function): void;
    (target: Object, propertyKey: string | symbol): void;
};
type MetadataFunc<T, S> = (target: T, propKey?: string) => S | null;

export function decorator<T, TargetT = any, S = T>(name: string, defaultValue: T | undefined = undefined, dataWrapper: (value?: T) => S | T | undefined = v => v): [DecoratorFunc<T>, MetadataFunc<TargetT, S>]
{
    const metadataKey = Symbol(name);
    return [
        (value?: T) =>
        {
            if (value === undefined)
                value = defaultValue;
            return Reflect.metadata(metadataKey, dataWrapper(value));
        },
        (target: TargetT, propKey?: string) =>
        {
            if (propKey === undefined)
                return Reflect.getMetadata(metadataKey, target) as S;
            else
                return Reflect.getMetadata(metadataKey, target, propKey) as S;
        }
    ];
}

export function getUniformsLocation<U extends { [key: string]: string }>(gl: WebGL2RenderingContext, program: WebGLProgram, uniforms: U): { [key in keyof U]: WebGLUniformLocation | null }
{
    const out: { [key in keyof U]: WebGLUniformLocation | null } = {} as any;
    for (const key in uniforms)
    {
        out[key] = gl.getUniformLocation(program, uniforms[key]);
    }
    return out;
}

export function fillArray<T>(element: (idx: number)=>T, count :number): T[]
export function fillArray<T>(element: T, count: number): T[]
export function fillArray<T>(element: ((idx:number) => T) | T, count: number): T[]
{
    const arr = new Array<T>(count);
    for (let i = 0; i < count; i++)
        arr[i] = typeof (element) === "function" ? (element as ((idx: number) => T))(i) : element;
    return arr;
}
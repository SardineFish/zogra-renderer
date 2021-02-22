import { vec3, mat4, vec4 } from "gl-matrix";

export function mulPoint(out: vec3, m: mat4, v: vec3)
{
    let [x, y, z] = v;
    const v4 = vec4.fromValues(x, y, z, 1);
    [x, y, z] = vec4.transformMat4(vec4.create(), v4, m);
    vec3.set(out, x, y, z);
    return out;
}

export function mulVector(out: vec3, m: mat4, v: vec3)
{
    let [x, y, z] = v;
    const v4 = vec4.fromValues(x, y, z, 0);
    [x, y, z] = vec4.transformMat4(vec4.create(), v4, m);
    vec3.set(out, x, y, z);
    return out;
}

export function panic(msg?: string): never
{
    throw new Error(msg);
}

export async function readBlob(blob: Blob)
{
    return new Promise<ArrayBuffer>((resolve, reject) =>
    {
        const reader = new FileReader();
        reader.addEventListener("loadend", () =>
        {
            resolve(reader.result as ArrayBuffer);
        });
        reader.addEventListener("error", (e) =>
        {
            reject(reader.error);
        });
        reader.readAsArrayBuffer(blob);
    });
}

export function readString(buffer: ArrayBuffer, offset: number, length: number)
{
    const slice = buffer.slice(offset, offset + length);
    const decoder = new TextDecoder();
    return decoder.decode(slice);
}

export function assert<T extends boolean>(result: T, msg: string)
{
    if (!result)
        throw new Error(msg);
}
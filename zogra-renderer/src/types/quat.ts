import { quat as glQuat, ReadonlyQuat, vec3 as glVec3 } from "gl-matrix";
import { vec3 } from "./vec3";
import { Rad2Deg } from "./math";
import { ZograMatrix } from "./generic";
import { wrapGlMatrix } from "./utils";

export type quat = Quaternion;

const V4Constructor: new (...p: [number, number, number, number]) => [number, number, number, number] = Array as any;
export class Quaternion extends V4Constructor implements ZograMatrix
{
    static create()
    {
        return new Quaternion(0, 0, 0, 0);
    }
    equals(v: any): boolean
    {
        if (!v || !(v instanceof Array))
            return false;
        return glQuat.exactEquals(this, v as Quaternion);
    }
    clone(out: Quaternion = Quaternion.create()): Quaternion
    {
        return out.set(this);
    }
    set(value: Readonly<Quaternion>): this
    set(value: Readonly<number[]>): this
    set(value: Readonly<number[]> | Readonly<Quaternion>): this
    {
        this[0] = value[0] || 0;
        this[1] = value[1] || 0;
        this[2] = value[2] || 0;
        this[3] = value[3] || 0;
        return this;
    }
    setAll(value: number): this
    {
        this[0] = value;
        this[1] = value;
        this[2] = value;
        this[3] = value;
        return this;
    }
    
}

export function quat(v?: number): Quaternion
export function quat(x: number, y: number, z: number, w: number): Quaternion
export function quat(x = 0, y = x, z = x, w = x)
{
    return new Quaternion(x, y, z, w);
}
quat.create = () =>
{
    return quat(0);
}
quat.identity = wrapGlMatrix<quat, []>(glQuat.identity as any, 0, quat.create);
quat.axisAngle = wrapGlMatrix<quat, [vec3, number]>((out, axis, rad) => glQuat.setAxisAngle(out, axis, rad) as quat, 2, quat.create);
quat.mul = wrapGlMatrix<quat, [quat, quat]>(glQuat.mul as any, 2, quat.create);
quat.invert = wrapGlMatrix<quat, [quat]>(glQuat.invert as any, 1, quat.create);
quat.normalize = wrapGlMatrix<quat, [quat]>(glQuat.normalize as any, 1, quat.create);
quat.euler = wrapGlMatrix<vec3, [quat]>((out, q) =>
{
    out[0] = Math.atan2(2 * (q[3] * q[0] + q[1] * q[2]), (1 - 2 * (q[0] ** 2 + q[1] ** 2))) * Rad2Deg;
    out[1] = Math.asin(2 * (q[3] * q[1] - q[2] * q[0])) * Rad2Deg;
    out[2] = Math.atan2(2 * (q[3] * q[2] + q[0] * q[1]), 1 - 2 * (q[1] ** 2, q[2] ** 2)) * Rad2Deg;
    return out;
}, 1, vec3.zero);
quat.fromEuler = wrapGlMatrix<quat, [vec3]>((out, angles) => glQuat.fromEuler(out, angles[0], angles[1], angles[2]) as quat, 1, quat.create);
quat.rotate = wrapGlMatrix<vec3, [quat, vec3]>((out, q, v) => glVec3.transformQuat(out, v, q) as vec3, 2, vec3.zero);
quat.equals = (a: any, b: any) =>
{
    return glQuat.exactEquals(a, b);
}

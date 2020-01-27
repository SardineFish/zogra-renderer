import { quat as glQuat } from "gl-matrix";
import { vec3 } from "./vec3";

export type quat = glQuat;

export function Quaternion()
{
    const quat = glQuat.create();
    return quat;
}
Quaternion.identity = () =>
{
    const quat = glQuat.create();
    glQuat.identity(quat);
    return quat;
}
/**
 * @param axis - Axis to rotate around.
 * @param rad - Rotation angle in radians
 */
Quaternion.axis = (axis: vec3, rad: number) =>
{
    return glQuat.setAxisAngle(glQuat.create(), axis, rad);
}
Quaternion.mul = (a: quat, b: quat) =>
{
    const out = glQuat.create();
    return glQuat.mul(out, a, b);
}
Quaternion.invert = (q: quat) =>
{
    const out = glQuat.create();
    return glQuat.invert(out, q);
};
Quaternion.normalize = (q: quat) =>
{
    return glQuat.normalize(glQuat.create(), q);
}

export const quat = Quaternion;
quat.identity = Quaternion.identity;
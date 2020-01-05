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
    const quat = glQuat.create();
    glQuat.setAxisAngle(quat, axis, rad);
}

export const quat = Quaternion;
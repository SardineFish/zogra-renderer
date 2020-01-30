import { mat4 } from "../types/mat4";
import { vec3 } from "../types/vec3";
import { quat } from "../types/quat";
export declare class Transform {
    private _parent;
    children: Set<Transform>;
    localPosition: vec3;
    localRotation: quat;
    localScaling: vec3;
    get position(): vec3;
    set position(position: vec3);
    get rotation(): quat;
    set rotation(rotation: quat);
    get localToWorldMatrix(): mat4;
    get worldToLocalMatrix(): mat4;
    get parent(): Transform | null;
    set parent(p: Transform | null);
}

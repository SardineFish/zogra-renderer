import { mat4 } from "zogra-renderer";
import { vec3 } from "zogra-renderer";
import { quat } from "zogra-renderer";
import { Scene } from "./scene";
export declare class Transform {
    private _parent;
    children: Set<Transform>;
    localPosition: vec3;
    localRotation: quat;
    localScaling: vec3;
    private _scene;
    get scene(): Scene<import("../physics/physics-generic").IPhysicsSystem> | null;
    get position(): vec3;
    set position(position: vec3);
    get rotation(): quat;
    set rotation(rotation: quat);
    get localToWorldMatrix(): mat4;
    get worldToLocalMatrix(): mat4;
    get parent(): Transform | null;
    set parent(p: Transform | null);
}

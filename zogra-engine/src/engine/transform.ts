import { mat4 } from "zogra-renderer";
import { vec3, Vector3 } from "zogra-renderer";
import { quat } from "zogra-renderer";
import { Scene } from "./scene";
import { Time } from "./engine";

export class Transform
{

    private _parent: Transform | null = null;
    children: Set<Transform> = new Set();

    private _localPosition: vec3 = vec3.zero();
    private _localRotation: quat = quat.identity();
    private _localScaling: vec3 = vec3.one();

    private _rotation: quat = quat.identity();
    private _inv_rotation: quat = quat.identity();
    private _localToWorld: mat4 = mat4.identity();
    private _worldToLocal: mat4 = mat4.identity();


    get localPosition(): Readonly<vec3> { return this._localPosition }
    get localRotation(): Readonly<quat> { return this._localRotation }
    get localScaling(): Readonly<vec3> { return this._localScaling }

    set localPosition(position)
    {
        this._localPosition.set(position);
        this.updateTransformRecursive();
    }
    set localRotation(rotation)
    {
        this._localRotation.set(rotation);
        this.updateTransformRecursive();
    }
    set localScaling(scaling)
    {
        this._localScaling.set(scaling);
        this.updateTransformRecursive();
    }

    private _scene: Scene | null = null;
    get scene() { return this._scene }

    get position(): Readonly<vec3>
    {
        if (!this._parent)
            return this.localPosition;
        return mat4.mulPoint(this._parent.localToWorldMatrix, this.localPosition);
    }
    set position(position)
    {
        if (!this._parent)
            this.localPosition.set(position);
        else
            mat4.mulPoint(this._localPosition, this._parent.worldToLocalMatrix, position);
        this.updateTransformRecursive();
    }
    get rotation(): Readonly<quat>
    {
        return this._rotation;
    }
    set rotation(rotation)
    {
        if (!this._parent)
            quat.normalize(this._localRotation, rotation);
        else
        {
            quat.mul(this._localRotation, this._parent._inv_rotation, rotation);
            quat.normalize(this._localRotation, this._localRotation);
        }
        this.updateTransformRecursive();
    }
    // get scaling(): Readonly<vec3>
    // {
    //     if (!this._parent)
    //         return this.localScaling;
    //     return mat4.mulVector(this.localToWorldMatrix, vec3.one());
    // }
    // set scaling(scaling)
    // {
    //     if (!this._parent)
    //         this.localScaling.set(scaling);
    //     else
    //         this.localScaling = mat4.getScaling(this._parent.worldToLocalMatrix).mul(scaling);
    // }
    get localToWorldMatrix(): Readonly<mat4> { return this._localToWorld }
    get worldToLocalMatrix(): Readonly<mat4> { return this._worldToLocal }
    
    get parent() { return this._parent; }
    set parent(p: Transform | null)
    {
        this._parent = p;
        if (p)
        {
            p.children.add(this);
        }
        this.updateTransformRecursive();
    }

    translate(motion: Readonly<vec3>)
    {
        if (!this._parent)
            this.localPosition.plus(motion);
        else
            this.localPosition.plus(mat4.mulVector(this._parent.worldToLocalMatrix, motion));
        this.updateTransformRecursive();
    }

    /** @internal */
    __addToScene(scene: Scene)
    {
        this._scene = scene;
    }
    /** @internal */
    __removeFromScene(scene: Scene)
    {
        this._scene = null;
    }

    private updateTransformRecursive()
    {
        this._rotation.set(this._localRotation);
        mat4.rts(this._localToWorld, this._localRotation, this._localPosition, this._localScaling);
        if (this._parent)
        {
            mat4.mul(this._localToWorld, this._parent._localToWorld, this._localToWorld);
            quat.mul(this._rotation, this._parent._rotation, this._rotation);
        }

        mat4.invert(this._worldToLocal, this._localToWorld);
        quat.invert(this._inv_rotation, this._rotation);
        for (const child of this.children)
            child.updateTransformRecursive();
    }
}
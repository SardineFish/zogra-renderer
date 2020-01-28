import { mat4 } from "../types/mat4";
import { vec3, Vector3 } from "../types/vec3";
import { quat } from "../types/quat";

export class Transform
{
    // private mLoc2World = mat4.identity();
    // private mWorld2Loc = mat4.identity();
    // private mat = mat4.identity();
    // private matInv = mat4.identity();
    // get localPosition() { return mat4.getTranslation(this.mat); }
    // get localRotation() { return mat4.getRotation(this.mat); }
    // get localScaling() { return mat4.getScaling(this.mat); }
    // get position()
    // {
    //     return mat4.getTranslation(this.mLoc2World);
    // }
    // get rotation() { return mat4.getRotation(this.mWorld2Loc); }
    // get scale() { return mat4.getScaling(this.mLoc2World); }
    
    // set localPosition()
    // {
        
    // }

    private _parent: Transform | null = null;
    children: Transform[] = [];

    localPosition: vec3 = vec3.zero();
    localRotation: quat = quat.identity();
    localScaling: vec3 = vec3.one();

    get position()
    {
        if (!this._parent)
            return this.localPosition;
        return mat4.mulPoint(this._parent.localToWorldMatrix, this.localPosition);
    }
    set position(position: vec3)
    {
        if (!this._parent)
            this.localPosition = position;
        else
            this.localPosition = mat4.mulPoint(this._parent.worldToLocalMatrix, position);
    }
    get rotation()
    {
        if (!this._parent)
            return this.localRotation;
        return quat.mul(this._parent.rotation, this.localRotation);
    }
    set rotation(rotation: quat)
    {
        if (!this._parent)
            this.localRotation = rotation;
        else
            this.localRotation = quat.mul(quat.invert(this._parent.rotation), rotation);
    }
    /*get scaling()
    {
        if (!this._parent)
            return this.localScaling;
        return mat4.mulVector(this.localToWorldMatrix, vec3.one());
    }
    set scaling(scaling: vec3)
    {
        if (!this._parent)
            this.localScaling = scaling;
        else
            this.localScaling = mat4.mulVector(this.worldToLocalMatrix)
    }*/
    get localToWorldMatrix(): mat4
    {
        if (!this._parent)
            return mat4.rts(this.localRotation, this.localPosition, this.localScaling);
        const mat = mat4.rts(this.localRotation, this.localPosition, this.localScaling);
        return mat4.mul(mat, this._parent.localToWorldMatrix, mat);
    }
    get worldToLocalMatrix(): mat4
    {
        return mat4.invert(this.localToWorldMatrix);
    }
    
    get parent() { return this._parent; }
    set parent(p: Transform | null)
    {
        this._parent = p;
        if (p)
        {
            p.children.push(this);
        }
    }
}
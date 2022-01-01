import { Vector3 } from "zogra-renderer";
import { Contact } from "../collision/contact";
import { IPositionEntity } from "../entity";
import { solvePositionalXPBD, XPBDPositionalConstraint } from "./xpbd";

export class ContactConstraint implements XPBDPositionalConstraint<[Vector3, Vector3]>
{
    compliance: number = 0;
    multiplier: number = 0;
    contact: Readonly<Contact<IPositionEntity, IPositionEntity>>;
    entites: [IPositionEntity, IPositionEntity];
    
    constructor(contact: Readonly<Contact<IPositionEntity, IPositionEntity>>)
    {
        this.contact = contact;
        this.entites = contact.entites;
    }
    gradients: [(this: this) => Vector3, (this: this) => Vector3] = [this.gradientSelf, this.gradientOther];

    evaluate(): number
    {
        return -this.contact.seperation;
    }

    gradientSelf(): Vector3
    {
        return this.contact.normal.clone();
    }

    gradientOther(): Vector3
    {
        return this.contact.normal.negative;
    }


    solve(dt: number): void
    {
        solvePositionalXPBD(this);
    }
    
}
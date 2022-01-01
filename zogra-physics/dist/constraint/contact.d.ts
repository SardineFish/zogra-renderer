import { Vector3 } from "zogra-renderer";
import { Contact } from "../collision/contact";
import { IPositionEntity } from "../entity";
import { XPBDPositionalConstraint } from "./xpbd";
export declare class ContactConstraint implements XPBDPositionalConstraint<[Vector3, Vector3]> {
    compliance: number;
    multiplier: number;
    contact: Readonly<Contact<IPositionEntity, IPositionEntity>>;
    entites: [IPositionEntity, IPositionEntity];
    constructor(contact: Readonly<Contact<IPositionEntity, IPositionEntity>>);
    gradients: [(this: this) => Vector3, (this: this) => Vector3];
    evaluate(): number;
    gradientSelf(): Vector3;
    gradientOther(): Vector3;
    solve(dt: number): void;
}

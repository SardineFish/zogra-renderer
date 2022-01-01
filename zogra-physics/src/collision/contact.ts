import { Vector3 } from "zogra-renderer";
import { PhysicsEntity } from "../entity";

export interface Contact<Self extends PhysicsEntity = PhysicsEntity, Other extends PhysicsEntity = PhysicsEntity>
{
    entites: [Self, Other],

    point: Vector3,
    
    /** normal on contact point at other entity toward self */
    normal: Vector3,

    seperation: number,
}
import { IPhysicsSystem } from "../../physics/physics-generic";
import { Collider2D } from "./collider2d";
export declare class Physics2D<Collider extends Collider2D = Collider2D> implements IPhysicsSystem {
    private colliderList;
}

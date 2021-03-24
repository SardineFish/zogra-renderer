import { Scene } from "../../engine/scene";
import { ICollider, IPhysicsSystem } from "../../physics/physics-generic";
import { Collider2D } from "./collider2d";

export class Physics2D<Collider extends Collider2D = Collider2D> implements IPhysicsSystem
{
    private colliderList: Collider[] = [];

    /** @internal */
    __addCollider(collider: ICollider): void
    {
        this.colliderList.push(collider as Collider);
    }
}

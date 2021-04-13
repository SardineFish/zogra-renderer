import { vec2 } from "zogra-renderer";
import { Time } from "../../engine/zogra-engine";
import { IPhysicsSystem } from "../../physics/physics-generic";
import { Collider2D } from "./collider2d";
export declare class Physics2D<Collider extends Collider2D = Collider2D> implements IPhysicsSystem {
    gravity: Readonly<vec2>;
    private colliderList;
    update(time: Time): void;
    private updateMotion;
}

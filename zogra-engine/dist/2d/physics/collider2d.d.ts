import { EventKeys, IEventSource, vec2 } from "zogra-renderer";
import { ColliderBase } from "../../physics/physics-generic";
import { Physics2D } from "./physics-2d";
import { Rigidbody2D } from "./rigidbody2d";
interface Collider2DEvents {
    onCollide(collision: Readonly<CollisionInfo2D>): void;
    onContact(other: Collider2D): void;
}
export interface CollisionInfo2D {
    self: Collider2D;
    other: Collider2D;
    point: vec2;
    seperation: vec2;
}
export declare class Collider2D extends ColliderBase<Physics2D> implements IEventSource<Collider2DEvents> {
    rigidbody: Rigidbody2D | null;
    enabled: boolean;
    on<T extends EventKeys<Collider2DEvents>>(event: T, listener: Collider2DEvents[T]): void;
    off<T extends EventKeys<Collider2DEvents>>(event: T, listener: Collider2DEvents[T]): void;
    checkContact(other: Collider2D): boolean;
}
export {};

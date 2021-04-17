import { EventDefinitions, EventEmitter, EventKeys, EventListener, IEventSource, vec2, vec3 } from "zogra-renderer";
import { ColliderBase } from "../../physics/physics-generic";
import { Physics2D } from "./physics-2d";
import { Rigidbody2D } from "./rigidbody2d";

interface Collider2DEvents
{
    onCollide(collision: Readonly<CollisionInfo2D>): void;
    onContact(other: Collider2D): void;
}

export interface CollisionInfo2D
{
    self: Collider2D;
    other: Collider2D;
    point: vec2;
    seperation: vec2;
}

export abstract class Collider2D extends ColliderBase<Physics2D> implements IEventSource<Collider2DEvents>
{
    rigidbody: Rigidbody2D | null = null;
    enabled: boolean = true;
    /** @internal */
    __eventEmitter = new EventEmitter<Collider2DEvents>();
    /** @internal */
    __colliderIdx = -1;
    on<T extends EventKeys<Collider2DEvents>>(event: T, listener: Collider2DEvents[T]): void
    {
        this.__eventEmitter.on(event, listener);
    }
    off<T extends EventKeys<Collider2DEvents>>(event: T, listener: Collider2DEvents[T]): void
    {
        this.__eventEmitter.on(event, listener);
    }

    /** @internal */
    abstract checkCollision(other: Collider2D, otherMotoin: vec2): CollisionInfo2D | null;

    abstract checkContact(other: Collider2D): boolean
}
import { vec2 } from "zogra-renderer";
import { Collider2D } from "./collider2d";

export class Rigidbody2D
{
    collider: Collider2D;
    mass: number = 1;
    /** @internal */
    _velocity: vec2 = vec2.zero();
    /** @internal */
    _acceleration: vec2 = vec2.zero();

    /** @internal */
    _motion: vec2 = vec2.zero();

    get velocity(): Readonly<vec2> { return this._velocity }
    set velocity(v) { this._velocity.set(v) }
    get acceleration(): Readonly<vec2> { return this._acceleration; }

    constructor(collider: Collider2D)
    {
        this.collider = collider;
    }

    addForce(force: Readonly<vec2>)
    {
        this._acceleration.x += force.x / this.mass;
        this._acceleration.y += force.y / this.mass;
    }

    addAcceleration(acrl: Readonly<vec2>)
    {
        this._acceleration.plus(acrl);
    }

    setAcceleration(acrl: Readonly<vec2>)
    {
        this._acceleration.set(acrl);
    }

    setForce(force: Readonly<vec2>)
    {
        this._acceleration.x = force.x / this.mass;
        this._acceleration.y = force.y / this.mass;
    }

    clearForce()
    {
        this._acceleration.x = 0;
        this._acceleration.y = 0;
    }
}
import { vec2 } from "zogra-renderer";
export class Rigidbody2D {
    constructor(collider) {
        this.mass = 1;
        /** @internal */
        this._velocity = vec2.zero();
        /** @internal */
        this._acceleration = vec2.zero();
        /** @internal */
        this._motion = vec2.zero();
        this.collider = collider;
    }
    get velocity() { return this._velocity; }
    set velocity(v) { this._velocity.set(v); }
    get acceleration() { return this._acceleration; }
    addForce(force) {
        this._acceleration.x += force.x / this.mass;
        this._acceleration.y += force.y / this.mass;
    }
    addAcceleration(acrl) {
        this._acceleration.plus(acrl);
    }
    setAcceleration(acrl) {
        this._acceleration.set(acrl);
    }
    setForce(force) {
        this._acceleration.x = force.x / this.mass;
        this._acceleration.y = force.y / this.mass;
    }
    clearForce() {
        this._acceleration.x = 0;
        this._acceleration.y = 0;
    }
}
//# sourceMappingURL=rigidbody2d.js.map
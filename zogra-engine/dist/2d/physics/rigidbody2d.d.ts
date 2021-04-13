import { vec2 } from "zogra-renderer";
import { Collider2D } from "./collider2d";
export declare class Rigidbody2D {
    collider: Collider2D;
    mass: number;
    get velocity(): Readonly<vec2>;
    set velocity(v: Readonly<vec2>);
    get acceleration(): Readonly<vec2>;
    constructor(collider: Collider2D);
    addForce(force: Readonly<vec2>): void;
    addAcceleration(acrl: Readonly<vec2>): void;
    setAcceleration(acrl: Readonly<vec2>): void;
    setForce(force: Readonly<vec2>): void;
    clearForce(): void;
}

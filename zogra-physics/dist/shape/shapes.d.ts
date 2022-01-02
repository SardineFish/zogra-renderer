import { Vector3 } from "zogra-renderer";
export interface Shape {
}
export interface ShapeType<T extends Shape = Shape> {
    id: number;
}
export interface Sphere extends Shape {
    offset: Vector3;
    radius: number;
}
export declare const Sphere: ShapeType<Sphere>;
export interface Plane extends Shape {
    normal: Vector3;
    offset: number;
}
export declare const Plane: ShapeType<Plane>;
export declare const AllShapes: ShapeType<Sphere>[];

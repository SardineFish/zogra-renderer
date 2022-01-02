import { Vector3 } from "zogra-renderer";
import { PhysicsEntity } from "../entity";

export interface Shape
{
}

export interface ShapeType<T extends Shape = Shape>
{
    id: number,
}

function ShapeType<T extends Shape>(id: number): ShapeType<T>
{
    return {
        id,
    }
}

export interface Sphere extends Shape
{
    offset: Vector3,
    radius: number,
}

export const Sphere = ShapeType<Sphere>(0);

export interface Plane extends Shape
{
    normal: Vector3,
    offset: number,
}

export const Plane = ShapeType<Plane>(1);

export const AllShapes = [
    Sphere,
    Plane,
];
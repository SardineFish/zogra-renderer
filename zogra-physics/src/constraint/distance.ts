import { minus, Vector3, Debug, Color } from "zogra-renderer";
import { IConstraint } from "./interface";
import { IPositionEntity } from "../entity";
import { IXPBDConstraint, solvePositionalXPBD, XPBDPositionalConstraint } from "./xpbd";

export class DistanceConstraint implements XPBDPositionalConstraint<[Vector3, Vector3]>
{
    p0: IPositionEntity;
    p1: IPositionEntity;
    distance: number;
    compliance: number = 30;
    multiplier: number = 0;

    gradients: [(this: this) => Vector3, (this: this) => Vector3] = [this.gradientP0, this.gradientP1];
    entites: [IPositionEntity, IPositionEntity];

    constructor(p1: IPositionEntity, p2: IPositionEntity, distance: number, compliance = 0)
    {
        this.p0 = p1;
        this.p1 = p2;
        this.distance = distance;
        this.entites = [p1, p2];
        this.compliance = compliance;
    }

    gradientP0(): Vector3
    {
        const p0 = this.p0.position;
        const p1 = this.p1.position;
        const d = Math.sqrt((p0.x - p1.x) * (p0.x - p1.x) + (p0.y - p1.y) * (p0.y - p1.y) + (p0.z - p1.z) * (p0.z - p1.z));
        if (d > this.distance)
            return minus(p1, p0).div(d);
        else
            return minus(p0, p1).div(d);
    }

    gradientP1(): Vector3
    {
        const p0 = this.p0.position;
        const p1 = this.p1.position;
        const d = Math.sqrt((p0.x - p1.x) * (p0.x - p1.x) + (p0.y - p1.y) * (p0.y - p1.y) + (p0.z - p1.z) * (p0.z - p1.z));
        if (d > this.distance)
            return minus(p0, p1).div(d);
        else
            return minus(p1, p0).div(d);
    }

    evaluate(): number
    {
        const p0 = this.p0.position;
        const p1 = this.p1.position;
        const d = Math.sqrt((p0.x - p1.x) * (p0.x - p1.x) + (p0.y - p1.y) * (p0.y - p1.y) + (p0.z - p1.z) * (p0.z - p1.z));
        if (d > this.distance)
            return this.distance - d;
        return d - this.distance;
    }

    solve(dt: number): void
    {
        Debug().drawLine(this.p0.position, this.p1.position, Color.yellow);
        // const p0 = this.p0.position;
        // const p1 = this.p1.position;
        // const c = this.evaluate();

        // this.multiplier += (-c - this.compliance * this.multiplier) / (this.p0.invMass + this.p1.invMass + this.compliance);

        // const dp0 = this.gradientP0().mul(this.multiplier * this.p0.invMass);
        // const dp1 = this.gradientP1().mul(this.multiplier * this.p1.invMass);

        // this.p0.position.plus(dp0);
        // this.p1.position.plus(dp1);
        solvePositionalXPBD(this);
    }
} 
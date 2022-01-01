import { minus } from "zogra-renderer";
import { solvePositionalXPBD } from "./xpbd";
export class DistanceConstraint {
    constructor(p1, p2, distance) {
        this.compliance = 30;
        this.multiplier = 0;
        this.gradients = [this.gradientP0, this.gradientP1];
        this.p0 = p1;
        this.p1 = p2;
        this.distance = distance;
        this.entites = [p1, p2];
    }
    gradientP0() {
        const p0 = this.p0.position;
        const p1 = this.p1.position;
        const d = Math.sqrt((p0.x - p1.x) * (p0.x - p1.x) + (p0.y - p1.y) * (p0.y - p1.y) + (p0.z - p1.z) * (p0.z - p1.z));
        if (d > this.distance)
            return minus(p1, p0).div(d);
        else
            return minus(p0, p1).div(d);
    }
    gradientP1() {
        const p0 = this.p0.position;
        const p1 = this.p1.position;
        const d = Math.sqrt((p0.x - p1.x) * (p0.x - p1.x) + (p0.y - p1.y) * (p0.y - p1.y) + (p0.z - p1.z) * (p0.z - p1.z));
        if (d > this.distance)
            return minus(p0, p1).div(d);
        else
            return minus(p1, p0).div(d);
    }
    evaluate() {
        const p0 = this.p0.position;
        const p1 = this.p1.position;
        const d = Math.sqrt((p0.x - p1.x) * (p0.x - p1.x) + (p0.y - p1.y) * (p0.y - p1.y) + (p0.z - p1.z) * (p0.z - p1.z));
        if (d > this.distance)
            return this.distance - d;
        return d - this.distance;
    }
    solve(dt) {
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
//# sourceMappingURL=distance.js.map
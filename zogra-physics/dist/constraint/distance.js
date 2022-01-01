import { minus, Debug, Color } from "zogra-renderer";
export class DistanceConstraint {
    constructor(p1, p2, distance) {
        this.gradients = [
            (p0, p1) => {
                const d = Math.sqrt((p0.x - p1.x) * (p0.x - p1.x) + (p0.y - p1.y) * (p0.y - p1.y) + (p0.z - p1.z) * (p0.z - p1.z));
                if (d > this.distance)
                    return minus(p1, p0).div(d);
                else
                    return minus(p0, p1).div(d);
            },
            (p0, p1) => {
                const d = Math.sqrt((p0.x - p1.x) * (p0.x - p1.x) + (p0.y - p1.y) * (p0.y - p1.y) + (p0.z - p1.z) * (p0.z - p1.z));
                if (d > this.distance)
                    return minus(p0, p1).div(d);
                else
                    return minus(p1, p0).div(d);
            }
        ];
        this.p0 = p1;
        this.p1 = p2;
        this.distance = distance;
    }
    evaluate(p0, p1) {
        const d = Math.sqrt((p0.x - p1.x) * (p0.x - p1.x) + (p0.y - p1.y) * (p0.y - p1.y) + (p0.z - p1.z) * (p0.z - p1.z));
        if (d > this.distance)
            return this.distance - d;
        return d - this.distance;
    }
    solve(dt) {
        const p0 = this.p0.position;
        const p1 = this.p1.position;
        const c = this.evaluate(this.p0.position, this.p1.position);
        let s = c / (this.p0.invMass + this.p1.invMass);
        const dp0 = this.gradients[0](p0, p1).mul(-s * this.p0.invMass);
        const dp1 = this.gradients[1](p0, p1).mul(-s * this.p1.invMass);
        Debug().drawRay(p0, this.gradients[0](p0, p1), 1, Color.green);
        Debug().drawRay(p1, this.gradients[1](p0, p1), 1, Color.red);
        this.p0.position.plus(dp0);
        this.p1.position.plus(dp1);
    }
}
//# sourceMappingURL=distance.js.map
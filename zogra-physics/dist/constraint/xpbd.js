import { vec3 } from "zogra-renderer";
export function solvePositionalXPBD(constraint, dt) {
    const c = constraint.evaluate();
    if (c >= 0)
        return;
    const compliance = constraint.compliance / (dt * dt);
    const gradients = constraint.gradients.map(g => g.call(constraint));
    const deltaMultiplier = (-c - compliance * constraint.multiplier)
        / (compliance + sum(constraint.entites, (entity, idx) => constraint.gradients[idx].call(constraint).magnitudeSqr * entity.invMass));
    constraint.multiplier += deltaMultiplier;
    const corrections = gradients.map((g, idx) => g.mul(constraint.entites[idx].invMass * deltaMultiplier));
    constraint.entites.forEach((entity, idx) => entity.center.plus(corrections[idx]));
}
export function solveDampedPositionalXPBD(constraint, dt) {
    const c = constraint.evaluate();
    if (c >= 0)
        return;
    const dt2 = dt * dt;
    const compliance = constraint.compliance / dt2;
    const damping = constraint.damping * dt2;
    const gamma = compliance * damping / dt;
    // Can simplify as sum of inv-mass
    const totalInvMass = sum(constraint.entites, (entity, idx) => constraint.gradients[idx].call(constraint).magnitudeSqr * entity.invMass);
    const gradients = constraint.gradients.map(g => g.call(constraint));
    const deltaMultiplier = constraint.multipliers.map((multiplier, i) => {
        const x = constraint.entites[i].center;
        const x0 = constraint.entites[i].prevCenter;
        return (-c - compliance * multiplier - gamma * gradients[i].dot(vec3.minus(x, x0)))
            / ((1 + gamma) * totalInvMass + compliance);
    });
    constraint.accumulateMultipliers(deltaMultiplier);
    const corrections = gradients.map((g, i) => g.mul(constraint.entites[i].invMass * deltaMultiplier[i]));
    constraint.entites.forEach((entity, idx) => entity.center.plus(corrections[idx]));
}
function sum(arr, selector) {
    return arr.reduce((value, curent, idx) => {
        return value + selector(curent, idx);
    }, 0);
}
//# sourceMappingURL=xpbd.js.map
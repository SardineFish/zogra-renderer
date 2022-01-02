export function solvePositionalXPBD(constraint, dt) {
    const c = constraint.evaluate();
    if (c >= 0)
        return;
    const compliance = constraint.compliance / (dt * dt);
    const gradients = constraint.gradients.map(g => g.call(constraint));
    constraint.multiplier += (-c - compliance * constraint.multiplier)
        / (compliance + sum(constraint.entites, (entity, idx) => constraint.gradients[idx].call(constraint).magnitudeSqr * entity.invMass));
    const dPos = gradients.map((g, idx) => g.mul(constraint.entites[idx].invMass * constraint.multiplier));
    constraint.entites.forEach((entity, idx) => entity.position.plus(dPos[idx]));
}
function sum(arr, selector) {
    return arr.reduce((value, curent, idx) => {
        return value + selector(curent, idx);
    }, 0);
}
//# sourceMappingURL=xpbd.js.map
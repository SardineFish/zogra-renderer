export function solvePositionalXPBD(constraint) {
    const gradients = constraint.gradients.map(g => g.call(constraint));
    const c = constraint.evaluate();
    constraint.multiplier += (-c - constraint.compliance * constraint.multiplier)
        / (constraint.compliance + sum(constraint.entites, (entity, idx) => constraint.gradients[idx].call(constraint).magnitudeSqr * entity.invMass));
    const dPos = gradients.map((g, idx) => g.mul(constraint.entites[idx].invMass * constraint.multiplier));
    constraint.entites.forEach((entity, idx) => entity.position.plus(dPos[idx]));
}
function sum(arr, selector) {
    return arr.reduce((value, curent, idx) => {
        return value + selector(curent, idx);
    }, 0);
}
//# sourceMappingURL=xpbd.js.map
import { solvePositionalXPBD } from "./xpbd";
export class ContactConstraint {
    constructor(contact) {
        this.compliance = 0;
        this.multiplier = 0;
        this.gradients = [this.gradientSelf, this.gradientOther];
        this.contact = contact;
        this.entites = contact.entites;
    }
    evaluate() {
        return -this.contact.separation;
    }
    gradientSelf() {
        return this.contact.normal.clone();
    }
    gradientOther() {
        return this.contact.normal.negative;
    }
    solve(dt) {
        solvePositionalXPBD(this, dt);
    }
    resetMultiplier() {
        this.multiplier = 0;
    }
}
//# sourceMappingURL=contact.js.map
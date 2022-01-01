export interface IConstraint
{
    solve(dt: number): void;
}

export interface IXPBDConstraint
{
    compliance: number,
    multiplier: number,
}
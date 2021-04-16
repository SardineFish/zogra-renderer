export interface Vector {
    magnitude: number;
    normalized: ThisType<this>;
}
interface IEqual {
    equals(v: any): boolean;
}
interface IClone {
    clone(out?: ThisType<this>): ThisType<this>;
}
interface ISet {
    set(value: Readonly<ThisType<this>>): ThisType<this>;
    set(value: Readonly<ArrayLike<number>>): ThisType<this>;
    fill(value: number): ThisType<this>;
}
export interface ZograMatrix extends IEqual, IClone, ISet {
    asMut(): this;
}
export {};

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
    set(value: Readonly<number[]>): ThisType<this>;
    setAll(value: number): ThisType<this>;
}
export interface ZograMatrix extends IEqual, IClone, ISet {
}
export {};

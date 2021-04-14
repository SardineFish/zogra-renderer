export interface Vector
{
    magnitude: number;
    normalized: ThisType<this>;
}

export interface IEqual
{
    equals(v: any): boolean;
}

export interface IClone
{
    clone(out?: ThisType<this>): ThisType<this>;
}

export interface ISet
{
    set(value: Readonly<ThisType<this>>): ThisType<this>;
}

export interface ZograMatrix extends IEqual, IClone, ISet
{

}
export declare class DataReader {
    buffer: ArrayBuffer;
    dataView: DataView;
    position: number;
    constructor(buffer: ArrayBuffer, start?: number);
    readSlice(length: number): ArrayBuffer;
    readUInt8(): number;
    readInt8(): number;
    readUInt16(): number;
    readInt16(): number;
    readUInt32(): number;
    readInt32(): number;
    readUInt64(): bigint;
    readInt64(): bigint;
    readBoolean(): boolean;
    readFloat32(): number;
    readFloat64(): number;
    readChar(): string;
    readString(byteLength: number): string;
    readBytes(length: number): Uint8Array;
}

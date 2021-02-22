"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataReader = void 0;
const utils_1 = require("./utils");
class DataReader {
    constructor(buffer, start = 0) {
        this.buffer = buffer;
        this.dataView = new DataView(buffer);
        this.position = start;
    }
    readSlice(length) {
        const data = this.buffer.slice(this.position, this.position + length);
        this.position += length;
        return data;
    }
    readUInt8() {
        const v = this.dataView.getUint8(this.position);
        this.position += 1;
        return v;
    }
    readInt8() {
        const v = this.dataView.getInt8(this.position);
        this.position += 1;
        return v;
    }
    readUInt16() {
        const v = this.dataView.getUint16(this.position, true);
        this.position += 2;
        return v;
    }
    readInt16() {
        const v = this.dataView.getInt16(this.position, true);
        this.position += 2;
        return v;
    }
    readUInt32() {
        const v = this.dataView.getUint32(this.position, true);
        this.position += 4;
        return v;
    }
    readInt32() {
        const v = this.dataView.getInt32(this.position, true);
        this.position += 4;
        return v;
    }
    readUInt64() {
        const v = this.dataView.getBigUint64(this.position, true);
        this.position += 8;
        return v;
    }
    readInt64() {
        const v = this.dataView.getBigInt64(this.position, true);
        this.position += 8;
        return v;
    }
    readBoolean() {
        const v = this.readUInt8();
        return v === 1;
    }
    readFloat32() {
        const v = this.dataView.getFloat32(this.position, true);
        this.position += 4;
        return v;
    }
    readFloat64() {
        const v = this.dataView.getFloat64(this.position, true);
        this.position += 8;
        return v;
    }
    readChar() {
        const chr = this.readUInt8();
        return String.fromCharCode(chr);
    }
    readString(byteLength) {
        const str = utils_1.readString(this.buffer, this.position, byteLength);
        this.position += byteLength;
        return str;
    }
    readBytes(length) {
        const data = new Uint8Array(this.buffer, this.position, length);
        this.position += length;
        return data;
    }
}
exports.DataReader = DataReader;
//# sourceMappingURL=data-reader.js.map
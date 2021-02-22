"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseFBX = void 0;
const data_reader_1 = require("./data-reader");
const pako_1 = __importDefault(require("pako"));
// See https://code.blender.org/2013/08/fbx-binary-file-format-specification/
// See https://banexdevblog.wordpress.com/2014/06/23/a-quick-tutorial-about-the-fbx-ascii-format/
function parseFBX(buffer) {
    const data = {
        version: 0,
        nodes: []
    };
    const reader = new data_reader_1.DataReader(buffer);
    const header = reader.readString(20);
    if (header === "Kaydara FBX Binary  ") {
        // parse as binary format
        reader.position = 23;
        const verNum = reader.readUInt32();
        data.version = verNum;
        reader.position = 27; // Start of content.
        data.nodes = readNodeList(reader, 0);
    }
    else {
        // parse as ascii format
    }
    return data;
}
exports.parseFBX = parseFBX;
function readNodeList(reader, upperEndpoint) {
    const nodes = [];
    while (true) {
        const node = readNode(reader);
        if (node === null)
            break;
        nodes.push(node);
    }
    if (upperEndpoint > 0 && reader.position !== upperEndpoint) {
        throw new Error("Unexpectly end of nodes.");
    }
    return nodes;
}
function readNode(reader) {
    const endOffset = reader.readUInt32();
    const numProps = reader.readUInt32();
    const propListLength = reader.readUInt32();
    const nameLength = reader.readUInt8();
    if (endOffset === 0 && numProps === 0 && propListLength === 0 && nameLength === 0) {
        return null;
    }
    const node = {
        name: reader.readString(nameLength),
        properties: new Array(numProps),
        nestedNodes: [],
    };
    const typeReader = {
        "Y": () => reader.readInt16(),
        "C": () => reader.readBoolean(),
        "I": () => reader.readInt32(),
        "F": () => reader.readFloat32(),
        "D": () => reader.readFloat64(),
        "L": () => reader.readUInt64(),
        "f": () => new Float32Array(readArrayData(reader, 4)),
        "d": () => new Float64Array(readArrayData(reader, 8)),
        "l": () => new BigInt64Array(readArrayData(reader, 8)),
        "i": () => new Int32Array(readArrayData(reader, 4)),
        "b": () => Array.from(new Uint8Array(readArrayData(reader, 1))).map(v => v === 1),
        "S": () => reader.readString(reader.readUInt32()),
        "R": () => reader.readBytes(reader.readUInt32()),
    };
    const startOffset = reader.position;
    for (let i = 0; i < numProps; i++) {
        const type = reader.readChar();
        const data = typeReader[type]();
        node.properties[i] = data;
    }
    if (reader.position !== startOffset + propListLength)
        throw new Error("Unexpectly end of property list.");
    // Nested Node List
    if (reader.position < endOffset) {
        node.nestedNodes = readNodeList(reader, endOffset);
    }
    return node;
}
function readArrayData(reader, elementSize) {
    const length = reader.readUInt32();
    const encoding = reader.readUInt32();
    const compressedLength = reader.readUInt32();
    if (encoding === 0) {
        return reader.readSlice(elementSize * length);
    }
    else {
        const data = reader.readSlice(compressedLength);
        const decompressed = pako_1.default.inflate(new Uint8Array(data));
        return decompressed.buffer;
    }
}
//# sourceMappingURL=fbx-binary-parser.js.map
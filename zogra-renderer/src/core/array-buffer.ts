import { mat4 } from "../types/mat4";
import { vec2 } from "../types/vec2";
import { vec3 } from "../types/vec3";
import { vec4 } from "../types/vec4";
import { panic } from "../utils/util";
import { AssetManager, GPUAsset, IAsset } from "./asset";
import { GLContext, GlobalContext } from "./global";
import { AttributeLocations, Shader } from "./shader";


type IntTypes = "int" | "ivec2" | "ivec3" | "ivec4";
type FloatTypes = "float" | "vec2" | "vec3" | "vec4" | "mat4";
type BufferElementType = IntTypes | FloatTypes;

type BufferElementViewType<T extends BufferElementType> =
    T extends IntTypes ? Int32Array
    : T extends FloatTypes ? Float32Array
    : never;


export type BufferElementView<T extends BufferStructure> = {
    [key in keyof T]: BufferElementViewType<T[key]>;
};

export type BufferElementValue<T extends BufferElementType> =
    T extends "float" ? [number]
    : T extends "vec2" ? vec2
    : T extends "vec3" ? vec3
    : T extends "vec4" ? vec4
    : T extends "mat4" ? mat4
    : never;
export interface BufferStructure
{
    [key: string]: BufferElementType;
}
export function BufferStructure<T extends BufferStructure>(structure: T): T
{
    return structure;
}

const ElementLength: Record<BufferElementType, number> = {
    float: 1,
    vec2: 2,
    vec3: 3,
    vec4: 4,
    mat4: 16,
    int: 1,
    ivec2: 2,
    ivec3: 3,
    ivec4: 4
};

export type BufferElementInfo<Structure extends BufferStructure> = {
    key: keyof Structure,
    type: BufferElementType,
    location: number,
    offset: number,
    /** Float length */
    length: number,
    byteOffset: number,
    byteLength: number,
};

export interface BufferStructureInfo<Structure extends BufferStructure>
{
    elements: BufferElementInfo<Structure>[];
    /** total count of floats */
    totalSize: number;
    byteSize: number;
}

export const BufferStructureInfo = {
    from<T extends BufferStructure>(structure: T)
    {
        const structInfo: BufferStructureInfo<T> = {
            elements: [],
            byteSize: 0,
            totalSize: 0,
        };
        let location = 0;
        for (const key in structure)
        {
            const element: BufferElementInfo<T> = {
                key,
                type: structure[key],
                location: location,
                length: ElementLength[structure[key]],
            } as any;
            element.byteLength = element.length * 4;
            element.offset = structInfo.totalSize;
            element.byteOffset = structInfo.byteSize;

            structInfo.totalSize += element.length;
            structInfo.byteSize += element.byteLength;
            structInfo.elements.push(element);
            location += structure[key] === "mat4" ? 4 : 1;
        }
        return structInfo;
    }
};

export class GLArrayBuffer<T extends BufferStructure> extends Array<BufferElementView<T>> implements IAsset
{
    public static = true;
    public Data: BufferElementView<T> = null as any;

    private structure: BufferStructureInfo<T>;
    private innerBuffer: Float32Array;
    private dirty = false;
    private ctx: GLContext;
    private initialized = false;
    private destroyed = false;


    assetID: number;
    name: string;
    
    protected glBuf: WebGLBuffer = null as any;

    get byteLength() { return this.length * this.structure.byteSize }

    constructor(structure: T & BufferStructure, items: number, createElementView = true, ctx = GlobalContext())
    {
        super(items);
        this.structure = BufferStructureInfo.from(structure);
        // this.structure = structure;
        this.ctx = ctx;
        
        this.innerBuffer = null as any;


        this.resize(items, createElementView);
        
        this.tryInit(false);

        this.assetID = AssetManager.newAssetID(this);
        this.name = `GLArrayBuffer_${this.assetID}`;
    }

    resize(length: number, keepContent = true, createElementView = true)
    {
        const oldBuffer = this.innerBuffer;
        this.innerBuffer = new Float32Array(this.structure.totalSize * length);
        if (keepContent && oldBuffer)
        {
            if (oldBuffer.length > this.innerBuffer.length)
            {
                this.innerBuffer.set(new Float32Array(oldBuffer.buffer, 0, this.innerBuffer.length));
            }
            else
                this.innerBuffer.set(oldBuffer, 0);
        }

        this.length = length;

        if (createElementView)
        {
            for (let i = 0; i < this.length; i++)
            {
                const elementView = {} as any as BufferElementView<T>;
                for (const element of this.structure.elements)
                {
                    const bufferOffset = i * this.structure.byteSize + element.byteOffset;
                    switch (element.type)
                    {
                        case "float":
                        case "vec2":
                        case "vec3":
                        case "vec4":
                        case "mat4":
                            (elementView[element.key] as Float32Array) = new Float32Array(this.innerBuffer.buffer, bufferOffset, ElementLength[element.type]);
                            break;
                        case "int":
                        case "ivec2":
                        case "ivec3":
                        case "ivec4":
                            (elementView[element.key] as Int32Array) = new Int32Array(this.innerBuffer.buffer, bufferOffset, ElementLength[element.type]);
                            break;
                        default:
                            console.warn(`Unknown element type '${element.type}'`);
                    }
                }
                this[i] = elementView;
            }
        }

        this.dirty = true;
    }

    copyFrom(source: GLArrayBuffer<T>, selfElementOffset = 0, sourceElementOffset = 0, sourceElementLength = source.length)
    {
        const byteOffset = selfElementOffset * this.structure.byteSize;
        const maxWriteSize = this.innerBuffer.buffer.byteLength - byteOffset;
        const srcByteOffset = sourceElementOffset * source.structure.byteSize;
        const srcSize = (sourceElementLength - sourceElementOffset) * source.structure.byteSize;
        const writeSize = Math.min(maxWriteSize, srcSize);
        const dstView = new Uint8Array(this.innerBuffer.buffer, byteOffset, writeSize);
        const srcView = new Uint8Array(source.innerBuffer.buffer, srcByteOffset, writeSize);
        dstView.set(srcView);
    }

    private swapBuffer: Float32Array | null = null;
    swapVertices(a: number, b: number)
    {
        if (!this.swapBuffer)
            this.swapBuffer = new Float32Array(this.structure.totalSize);
        const offsetI = a * this.structure.byteSize;
        const offsetJ = b * this.structure.byteSize;
        let temp = this.swapBuffer;
        let viewA = new Float32Array(this.innerBuffer.buffer, offsetI, this.structure.totalSize);
        temp.set(viewA);
        const viewB = new Float32Array(this.innerBuffer.buffer, offsetJ, this.structure.totalSize);
        this.innerBuffer.set(viewB, a * this.structure.totalSize);
        this.innerBuffer.set(temp, b * this.structure.totalSize);
    }

    markDirty()
    {
        this.dirty = true;
    }

    upload(force = false)
    {
        this.tryInit(true);
        if (!this.dirty && !force && this.static)
            return false;
        
        const gl = this.ctx.gl;

        gl.bindBuffer(gl.ARRAY_BUFFER, this.glBuf);
        gl.bufferData(gl.ARRAY_BUFFER, this.innerBuffer, this.static ? gl.STATIC_DRAW : gl.DYNAMIC_DRAW);

        this.dirty = false;
        return true;
    }

    bind()
    {
        this.tryInit(true);

        const gl = this.ctx.gl;
        this.upload();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.glBuf);
    }

    bindVertexArray<K extends keyof T>(instancing = false, attributes?: AttributeLocations<Pick<T, K>>)
    {
        this.tryInit(true);
        const gl = this.ctx.gl;

        this.upload();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.glBuf);

        for (const element of this.structure.elements)
        {
            const location = attributes
                ? (attributes as AttributeLocations<T>)[element.key] || -1
                : element.location;
            
            if (location < 0)
                continue;
            switch (element.type)
            {
                case "float":
                case "vec2":
                case "vec3":
                case "vec4":
                    gl.enableVertexAttribArray(location);
                    gl.vertexAttribPointer(location, element.length, gl.FLOAT, false, this.structure.byteSize, element.byteOffset);
                    instancing && gl.vertexAttribDivisor(location, 1);
                    break;
                case "int":
                case "ivec2":
                case "ivec3":
                case "ivec4":
                    gl.enableVertexAttribArray(location);
                    gl.vertexAttribIPointer(location, element.length, gl.INT, this.structure.byteSize, element.byteOffset);
                    instancing && gl.vertexAttribDivisor(location, 1);
                    break;
                case "mat4":
                    gl.enableVertexAttribArray(location + 0);
                    gl.enableVertexAttribArray(location + 1);
                    gl.enableVertexAttribArray(location + 2);
                    gl.enableVertexAttribArray(location + 3);
                    gl.vertexAttribPointer(location + 0, 4, gl.FLOAT, false, this.structure.byteSize, element.byteOffset + 0);
                    gl.vertexAttribPointer(location + 1, 4, gl.FLOAT, false, this.structure.byteSize, element.byteOffset + 1);
                    gl.vertexAttribPointer(location + 2, 4, gl.FLOAT, false, this.structure.byteSize, element.byteOffset + 2);
                    gl.vertexAttribPointer(location + 3, 4, gl.FLOAT, false, this.structure.byteSize, element.byteOffset + 3);
                    if (instancing)
                    {
                        gl.vertexAttribDivisor(location + 0, 1);
                        gl.vertexAttribDivisor(location + 1, 1);
                        gl.vertexAttribDivisor(location + 2, 1);
                        gl.vertexAttribDivisor(location + 3, 1);
                    }
                    break;
                default:
                    console.warn(`Unknown attribute type '${element.type}'`)

            }
        }
    }

    unbindVertexArray<K extends keyof T>(instancing = false, attributes?: AttributeLocations<Pick<T, K>>)
    {
        this.tryInit(true);
        const gl = this.ctx.gl;

        for (const element of this.structure.elements)
        {
            const location = attributes
                ? (attributes as AttributeLocations<T>)[element.key] || -1
                : element.location;

            if (location < 0)
                continue;
            if (element.type === "mat4")
            {
                gl.disableVertexAttribArray(location + 0);
                gl.disableVertexAttribArray(location + 1);
                gl.disableVertexAttribArray(location + 2);
                gl.disableVertexAttribArray(location + 3);
                if (instancing)
                {
                    gl.vertexAttribDivisor(location + 0, 0);
                    gl.vertexAttribDivisor(location + 1, 0);
                    gl.vertexAttribDivisor(location + 2, 0);
                    gl.vertexAttribDivisor(location + 3, 0);
                }
            }
            else
            {
                gl.disableVertexAttribArray(location);
                instancing && gl.vertexAttribDivisor(location, 0);
            }
        }
    }

    unbind()
    {
        this.tryInit(true);

        const gl = this.ctx.gl;
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        gl.bindVertexArray(null);
    }

    destroy(): void
    {
        if (this.destroyed)
            return;
        if (!this.initialized)
            return;

        const gl = this.ctx.gl;
        this.length = 0;
        gl.deleteBuffer(this.glBuf);
        this.destroyed = true;
        this.initialized = false;
    }

    private tryInit(required = false)
    {
        if (this.destroyed)
            throw new Error("Attempt to use destroyed array buffer.");
        if (this.initialized)
            return true;

        const ctx = this.ctx || GlobalContext();
        if (!ctx)
        {
            if (required)
                throw new Error("Failed to init render buffer without a global GL context.");
            return false;
        }
        this.ctx = ctx;
        const gl = ctx.gl;

        this.glBuf = gl.createBuffer() ?? panic("Failed to create render buffer");
        gl.bindBuffer(gl.ARRAY_BUFFER, this.glBuf);
        gl.bufferData(gl.ARRAY_BUFFER, this.byteLength, this.static ? gl.STATIC_DRAW : gl.DYNAMIC_DRAW);

        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        this.initialized = true;
        return true;
    }

}
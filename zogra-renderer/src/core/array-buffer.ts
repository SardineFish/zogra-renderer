import { mat4 } from "../types/mat4";
import { vec2 } from "../types/vec2";
import { vec3 } from "../types/vec3";
import { vec4 } from "../types/vec4";
import { panic } from "../utils/util";
import { GLContext, GlobalContext } from "./global";
import { AttributeLocations, Shader } from "./shader";

export type BufferElementView<T extends BufferStructure> = {
    [key in keyof T]: Float32Array;
};
type BufferElementType = "float" | "vec2" | "vec3" | "vec4" | "mat4";
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
        const valueLength = {
            float: 1,
            vec2: 2,
            vec3: 3,
            vec4: 4,
            mat4: 16,
        }
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
                length: valueLength[structure[key]],
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

export class GLArrayBuffer<T extends BufferStructure> extends Array<BufferElementView<T>>
{
    public static = true;
    public Data: BufferElementView<T> = null as any;

    private structure: BufferStructureInfo<T>;
    private buffer: Float32Array;
    private dirty = false;
    private ctx: GLContext;
    private initialized = false;
    
    protected glBuf: WebGLBuffer = null as any;

    get byteLength() { return this.length * this.structure.byteSize }

    constructor(structure: T & BufferStructure, items: number, ctx = GlobalContext())
    {
        super(items);
        this.structure = BufferStructureInfo.from(structure);
        // this.structure = structure;
        this.ctx = ctx;
        
        this.buffer = null as any;


        this.resize(items);
        
        this.tryInit(false);

    }

    resize(length: number, keepContent = true)
    {
        const oldBuffer = this.buffer;
        this.buffer = new Float32Array(this.structure.totalSize * length);
        if (keepContent && oldBuffer)
        {
            if (oldBuffer.length > this.buffer.length)
            {
                this.buffer.set(new Float32Array(oldBuffer.buffer, 0, this.buffer.length));
            }
            else
                this.buffer.set(oldBuffer, 0);
        }

        this.length = length;

        for (let i = 0; i < this.length; i++)
        {
            const elementView = {} as any as BufferElementView<T>;
            for (const element of this.structure.elements)
            {
                const bufferOffset = i * this.structure.byteSize + element.byteOffset;
                switch (element.type)
                {
                    case "float":
                        elementView[element.key] = new Float32Array(this.buffer.buffer, bufferOffset, 1);
                        break;
                    case "vec2":
                        elementView[element.key] = new Float32Array(this.buffer.buffer, bufferOffset, 2);
                        break;
                    case "vec3":
                        elementView[element.key] = new Float32Array(this.buffer.buffer, bufferOffset, 3);
                        break;
                    case "vec4":
                        elementView[element.key] = new Float32Array(this.buffer.buffer, bufferOffset, 4);
                        break;
                    case "mat4":
                        elementView[element.key] = new Float32Array(this.buffer.buffer, bufferOffset, 16);
                        break;
                }
            }
            this[i] = elementView;
        }

        this.dirty = true;
    }

    private swapBuffer: Float32Array | null = null;
    swapVertices(a: number, b: number)
    {
        if (!this.swapBuffer)
            this.swapBuffer = new Float32Array(this.structure.totalSize);
        const offsetI = a * this.structure.byteSize;
        const offsetJ = b * this.structure.byteSize;
        let temp = this.swapBuffer;
        let viewA = new Float32Array(this.buffer.buffer, offsetI, this.structure.totalSize);
        temp.set(viewA);
        const viewB = new Float32Array(this.buffer.buffer, offsetJ, this.structure.totalSize);
        this.buffer.set(viewB, a * this.structure.totalSize);
        this.buffer.set(temp, b * this.structure.totalSize);
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
        gl.bufferData(gl.ARRAY_BUFFER, this.buffer, this.static ? gl.STATIC_DRAW : gl.DYNAMIC_DRAW);

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

    bindVertexArray(instancing = false, attributes?: AttributeLocations<T>)
    {
        this.tryInit(true);
        const gl = this.ctx.gl;

        this.upload();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.glBuf);

        for (const element of this.structure.elements)
        {
            const location = attributes
                ? attributes[element.key] || -1
                : element.location;
            
            if (location < 0)
                continue;
            if (element.type === "mat4")
            {
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
            }
            else
            {
                gl.enableVertexAttribArray(location);
                gl.vertexAttribPointer(location, element.length, gl.FLOAT, false, this.structure.byteSize, element.byteOffset);
                instancing && gl.vertexAttribDivisor(location, 1);
            }
        }
    }

    unbindVertexArray(instancing = false, attributes?: AttributeLocations<T>)
    {
        this.tryInit(true);
        const gl = this.ctx.gl;

        for (const element of this.structure.elements)
        {
            const location = attributes
                ? attributes[element.key] || -1
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

    private tryInit(required = false)
    {
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
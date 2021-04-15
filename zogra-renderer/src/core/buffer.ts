import { panic } from "../utils/util";
import { GLContext, GlobalContext } from "./global";
import { AttributeLocations, Shader } from "./shader";

export type BufferElementView<T extends BufferStructure> = {
    [key in keyof T]: Float32Array;
};
type BufferElementType = "float" | "vec2" | "vec3" | "vec4" | "mat4";
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

export class RenderBuffer<T extends BufferStructure> extends Array<BufferElementView<T>>
{
    public static = false;
    public instancing = false;

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
        this.upload() || gl.bindBuffer(gl.ARRAY_BUFFER, this.glBuf);
    }

    bindVertexArray(attributes?: AttributeLocations<T>)
    {
        this.tryInit(true);
        const gl = this.ctx.gl;

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
                gl.enableVertexAttribArray(element.location + 0);
                gl.enableVertexAttribArray(element.location + 1);
                gl.enableVertexAttribArray(element.location + 2);
                gl.enableVertexAttribArray(element.location + 3);
                gl.vertexAttribPointer(element.location + 0, 4, gl.FLOAT, false, this.structure.byteSize, element.byteOffset + 0);
                gl.vertexAttribPointer(element.location + 1, 4, gl.FLOAT, false, this.structure.byteSize, element.byteOffset + 1);
                gl.vertexAttribPointer(element.location + 2, 4, gl.FLOAT, false, this.structure.byteSize, element.byteOffset + 2);
                gl.vertexAttribPointer(element.location + 3, 4, gl.FLOAT, false, this.structure.byteSize, element.byteOffset + 3);
                if (this.instancing)
                {
                    gl.vertexAttribDivisor(element.location + 0, 1);
                    gl.vertexAttribDivisor(element.location + 1, 1);
                    gl.vertexAttribDivisor(element.location + 2, 1);
                    gl.vertexAttribDivisor(element.location + 3, 1);
                }
            }
            else
            {
                gl.enableVertexAttribArray(element.location);
                gl.vertexAttribPointer(element.location, element.length, gl.FLOAT, false, this.structure.byteSize, element.byteOffset);
                this.instancing && gl.vertexAttribDivisor(element.location, 1);
            }
        }
    }

    unbindVertexArray(attributes?: AttributeLocations<T>)
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
                gl.disableVertexAttribArray(element.location + 0);
                gl.disableVertexAttribArray(element.location + 1);
                gl.disableVertexAttribArray(element.location + 2);
                gl.disableVertexAttribArray(element.location + 3);
                if (this.instancing)
                {
                    gl.vertexAttribDivisor(element.location + 0, 0);
                    gl.vertexAttribDivisor(element.location + 1, 0);
                    gl.vertexAttribDivisor(element.location + 2, 0);
                    gl.vertexAttribDivisor(element.location + 3, 0);
                }
            }
            else
            {
                gl.disableVertexAttribArray(element.location);
                this.instancing && gl.vertexAttribDivisor(element.location, 0);
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
import { vec3 } from "../types/vec3";
import { vec2 } from "../types/vec2";
import { Color } from "../types/color";
import { GL, GLContext, GlobalContext } from "./global";
import { panicNull, panic, fillArray } from "../utils/util";
import { Shader } from "./shader";
import { minus, cross } from "../types/math";
import { Asset } from "./asset";
import { BufferStructure, BufferStructureInfo, RenderBuffer } from "./buffer";
import { ZograMatrix } from "../types/generic";

const VertDataFloatCount = 14;

export interface DefaultVertexStruct extends BufferStructure {
    vert: "vec3",
    color: "vec4",
    normal: "vec3",
    uv: "vec2",
    uv2: "vec2",
}

export const DefaultVertexData: DefaultVertexStruct =
{
    vert: "vec3",
    color: "vec4",
    normal: "vec3",
    uv: "vec2",
    uv2: "vec2",
};

export const DefaultVertexStructInfo = BufferStructureInfo.from(DefaultVertexData);

export class MeshLegacy extends Asset
{
    private _verts: vec3[] = [];
    private _triangles: number[] = [];
    private _uvs: vec2[] = [];
    private _uv2: vec2[] = [];
    private _colors: Color[] = [];
    private _normals: vec3[] = [];

    private dirty = true;
    private uploaded = false;

    private vertices = new Float32Array(0);
    private indices = new Uint32Array(0);

    private vertexStruct: BufferStructureInfo<typeof DefaultVertexData>;

    VAO: WebGLVertexArrayObject = null as any;
    VBO: WebGLBuffer = null as any;
    EBO: WebGLBuffer = null as any;

    private gl: WebGL2RenderingContext;

    private initialized = false;

    constructor(gl = GL())
    {
        super();
        this.name = `Mesh_${this.assetID}`;
        this.vertexStruct = DefaultVertexStructInfo;
        this.gl = gl;

        this.tryInit(false);
    }

    get verts() { return this._verts; }
    set verts(verts: vec3[])
    {
        this._verts = verts;
        this.dirty = true;
    }
    get triangles() { return this._triangles; }
    set triangles(triangles: number[])
    {
        this._triangles = triangles;
        this.dirty = true;
    }
    get uvs() { return this._uvs; }
    set uvs(uvs: vec2[])
    {
        this._uvs = uvs;
        this.dirty = true;
    }
    get uv2() { return this._uv2; }
    set uv2(uv: vec2[])
    {
        this._uv2 = uv;
        this.dirty = true;
    }
    get colors() { return this._colors; }
    set colors(colors: Color[])
    {
        this._colors = colors;
        this.dirty = true;
    }
    get normals() { return this._normals; }
    set normals(normals: vec3[])
    {
        this._normals = normals;
        this.dirty = true;
    }

    clear()
    {
        this.verts = [];
        this.uvs = [];
        this.triangles = [];
        this.colors = [];
        this.normals = [];
    }

    // https://schemingdeveloper.com/2014/10/17/better-method-recalculate-normals-unity/
    calculateNormals(angleThreshold: number = 0)
    {
        if (this.triangles.length % 3 !== 0)
            throw new Error("Invalid triangles.");
        
        this.normals = fillArray(() => vec3(0, 0, 0), this.verts.length);
        for (let i = 0; i < this.triangles.length; i+=3)
        {
            const a = this.verts[this.triangles[i]];
            const b = this.verts[this.triangles[i + 1]];
            const c = this.verts[this.triangles[i + 2]];
            const u = minus(b, a);
            const v = minus(c, a);
            const normal = cross(u, v).normalize();

            this.normals[this.triangles[i + 0]].plus(normal);
            this.normals[this.triangles[i + 1]].plus(normal);
            this.normals[this.triangles[i + 2]].plus(normal);
        }
        for (let i = 0; i < this.normals.length; i++)
            this.normals[i] = this.normals[i].normalize();
    }

    update()
    {
        if (this.dirty)
        {
            if (this.triangles.length % 3 !== 0)
                throw new Error("Invalid triangles.");
            if (this.colors.length !== this.verts.length)
                this.colors = [...this.colors, ...fillArray(Color.white, this.verts.length - this.colors.length)];
            if (this.uvs.length !== this.verts.length)
                this.uvs = [...this.uvs, ...fillArray(vec2(0, 0), this.verts.length - this.uvs.length)];
            if (this.uv2.length !== this.verts.length)
                this.uv2 = [...this.uv2, ...fillArray(vec2(0, 0), this.verts.length - this.uv2.length)];
            if (this.normals.length !== this.verts.length)
                this.normals = [...this.normals, ...fillArray(vec3(0, 0, 0), this.verts.length - this.normals.length)];
                
            this.vertices = new Float32Array(this.verts.flatMap((vert, idx) => [
                ...vert,
                ...this.colors[idx],
                ...this.normals[idx],
                ...this.uvs[idx],
                ...this.uv2[idx],
                ]));
            if (this.vertices.length != this.verts.length * VertDataFloatCount)
                throw new Error("Buffer with invalid length.");
            this.indices = new Uint32Array(this.triangles.flat());

            this.dirty = false;
            this.uploaded = false;
        }
    }

    setup()
    {
        this.update();

        this.tryInit(true);

        const gl = this.gl;

        if (!this.uploaded)
        {
            gl.bindBuffer(gl.ARRAY_BUFFER, this.VBO);
            gl.bufferData(gl.ARRAY_BUFFER, this.vertices, gl.STATIC_DRAW);

            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.EBO);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.indices, gl.STATIC_DRAW);
            this.uploaded = true;
        }

        return [this.VBO, this.EBO];
    }

    bind(shader: Shader)
    {
        this.setup();

        const gl = this.gl;

        // const attributes = shader._internal().attributes;

        // // Setup VAO
        // const stride = VertDataFloatCount * 4;
        // gl.bindBuffer(gl.ARRAY_BUFFER, this.VBO);
        // // vert: vec3
        // if (attributes.vert >= 0)
        // {
        //     gl.vertexAttribPointer(attributes.vert, 3, gl.FLOAT, false, stride, 0);
        //     gl.enableVertexAttribArray(attributes.vert);
        // }
        // // color: vec4
        // if (attributes.color >= 0)
        // {
        //     gl.vertexAttribPointer(attributes.color, 4, gl.FLOAT, false, stride, 3 * 4);
        //     gl.enableVertexAttribArray(attributes.color);
        // }
        // // uv: vec2
        // if (attributes.uv >= 0)
        // {
        //     gl.vertexAttribPointer(attributes.uv, 2, gl.FLOAT, false, stride, 7 * 4);
        //     gl.enableVertexAttribArray(attributes.uv);
        // }
        // // uv2: vec2
        // if (attributes.uv2 >= 0)
        // {
        //     gl.vertexAttribPointer(attributes.uv2, 2, gl.FLOAT, false, stride, 9 * 4);
        //     gl.enableVertexAttribArray(attributes.uv2);
        // }
        // if (attributes.uv)
        // // normal: vec3
        // if (attributes.normal >= 0)
        // {
        //     gl.vertexAttribPointer(attributes.normal, 3, gl.FLOAT, true, stride, 11 * 4);
        //     gl.enableVertexAttribArray(attributes.normal);
        // }

        // gl.bindBuffer(gl.ARRAY_BUFFER, this.VBO);
        gl.bindVertexArray(this.VAO);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.EBO);
        // gl.bindVertexArray(shader.vertexArray);
    }

    unbind()
    {
        const gl = this.gl;
        // gl.bindBuffer(gl.ARRAY_BUFFER, null);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
        gl.bindVertexArray(null);
    }

    destroy()
    {
        if (!this.initialized)
            return;
        if (this.destroyed)
            return;
        this.gl.deleteBuffer(this.VBO);
        this.gl.deleteBuffer(this.EBO);
        super.destroy();
    }

    private tryInit(required = false): boolean
    {
        if (this.initialized)
            return true;

        const gl = this.gl || GL();


        if (!gl)
        {
            if (required)
                throw new Error("Failed to init mesh without global GL context");
            return false;
        }
        
        this.gl = gl;
        this.VBO = gl.createBuffer() ?? panic("Failed to create vertex buffer.");
        this.EBO = gl.createBuffer() ?? panic("Failed to create element buffer.");
        this.initVAO();


        this.initialized = true;

        return true;
    }


    private initVAO()
    {
        const gl = this.gl;
        this.VAO = gl.createVertexArray() ?? panic("Failed to create vertex array object.");

        gl.bindVertexArray(this.VAO);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.VBO);
        for (const element of this.vertexStruct.elements)
        {
            gl.enableVertexAttribArray(element.location);
            gl.vertexAttribPointer(element.location, element.length, gl.FLOAT, false, this.vertexStruct.byteSize, element.byteOffset);
        }

        gl.bindVertexArray(null);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
    }
}


export class Mesh<VertexStruct extends BufferStructure = typeof DefaultVertexData> extends Asset
{
    vertices: RenderBuffer<VertexStruct>;
    indices: Uint32Array;
    private ctx: GLContext = null as any;
    private initialized = false;
    private vertexArray: WebGLVertexArrayObject = null as any;
    private elementBuffer: WebGLBuffer = null as any;
    private dirty = true;

    constructor()
    constructor(ctx: GLContext)
    constructor(structure: VertexStruct)
    constructor(structure: VertexStruct, ctx: GLContext)
    constructor(...args: [VertexStruct?, GLContext?])
    {
        super("Mesh");

        this.indices = new Uint32Array();
        if (args.length === 0)
        {
            this.ctx = GlobalContext();
            this.vertices = new RenderBuffer(DefaultVertexData as unknown as VertexStruct, 0, this.ctx);
        }
        else if (args.length === 1)
        {
            if (args[0] instanceof GLContext)
            {
                this.ctx = args[0];
                this.vertices = new RenderBuffer(DefaultVertexData as unknown as VertexStruct, 0, this.ctx);
            }
            else
            {
                this.ctx = GlobalContext();
                this.vertices = new RenderBuffer(args[0] as VertexStruct, 0, this.ctx);
            }
        }
        else
        {
            this.ctx = args[1] as GLContext || GlobalContext();
            this.vertices = new RenderBuffer(args[0] as VertexStruct, 0, this.ctx);
        }

        this.tryInit(false);
    }

    /** @deprecated */
    get verts()
    {
        return this.getVertexDataArray("vert", vec3.zero);
    }
    /** @deprecated */
    set verts(verts)
    {
        this.setVertexDataArray("vert", verts);
    }
    /** @deprecated */
    get uvs()
    {
        return this.getVertexDataArray("uv", vec2.zero);
    }
    /** @deprecated */
    set uvs(uvs)
    {
        this.setVertexDataArray("uv", uvs);
    }
    /** @deprecated */
    get colors()
    {
        return this.getVertexDataArray<Color>("color", () => Color.black);
    }
    /** @deprecated */
    set colors(colors)
    {
        this.setVertexDataArray("color", colors);
    }
    /** @deprecated */
    get normals()
    {
        return this.getVertexDataArray("uv2", vec3.zero);
    }
    /** @deprecated */
    set normals(normals)
    {
        this.setVertexDataArray("normal", normals);
    }
    /** @deprecated */
    get uv2()
    {
        return this.getVertexDataArray("uv2", vec2.zero);
    }
    /** @deprecated */
    set uv2(uv2)
    {
        this.setVertexDataArray("uv2", uv2);
    }
    /** @deprecated */
    get triangles()
    {
        return Array.from(this.indices);
    }
    /** @deprecated */
    set triangles(triangles)
    {
        if (triangles.length > this.indices.length)
            this.indices = new Uint32Array(triangles.length);
        this.indices.set(triangles);
    }

    private getVertexDataArray<T extends ZograMatrix>(key: string, allocator: () => T): T[]
    {
        return this.vertices.map(vert => allocator().set(vert[key]) as T);
    }
    private setVertexDataArray<T extends number[]>(key: string, values: T[])
    {
        const vertices = this.vertices as unknown as RenderBuffer<typeof DefaultVertexData>;
        if (values.length >= this.vertices.length)
            this.vertices.resize(values.length);
        values.forEach((value, i) => this.vertices[i][key].set(value));
    }


    resize(vertices: number, indices: number, keepData = false)
    {
        this.vertices.resize(vertices, keepData);
        let oldTriangles = this.indices;
        this.indices = new Uint32Array(indices);
        
        if (keepData)
        {
            if (indices < oldTriangles.length)
            {
                oldTriangles = new Uint32Array(oldTriangles.buffer, 0, indices);
            }
            this.indices.set(oldTriangles, 0);
        }

        this.dirty = true;
    }

    update(upload = false)
    {
        this.dirty = true;
        this.vertices.markDirty();
        if (upload)
            this.upload();
    }

    upload()
    {
        this.tryInit(true);
        if (!this.dirty)
            return false;
        const gl = this.ctx.gl;
        
        this.vertices.upload();
        
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.elementBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.indices, gl.STATIC_DRAW);

        this.dirty = false;
        return true;
    }

    bind()
    {
        this.upload();
        const gl = this.ctx.gl;

        gl.bindVertexArray(this.vertexArray);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.elementBuffer);
        
        return this.indices.length;
    }

    unbind()
    {
        this.tryInit(true);
        const gl = this.ctx.gl;

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
        gl.bindVertexArray(null);
    }

    // https://schemingdeveloper.com/2014/10/17/better-method-recalculate-normals-unity/
    /**
     * Heavy cost
     * @param angleThreshold 
     */
    calculateNormals(angleThreshold: number = 0)
    {
        if (this.triangles.length % 3 !== 0)
            throw new Error("Invalid triangles.");

        // this.normals = fillArray(() => vec3(0, 0, 0), this.verts.length);
        for (let i = 0; i < this.triangles.length; i += 3)
        {
            const a = this.vertices[this.triangles[i + 0]].vert;
            const b = this.vertices[this.triangles[i + 1]].vert;
            const c = this.vertices[this.triangles[i + 2]].vert;
            const u = minus(b, a);
            const v = minus(c, a);
            const normal = cross(u, v).normalize();

            
            vec3.plus(this.vertices[this.triangles[i + 0]].normal, this.vertices[this.triangles[i + 0]].normal, normal);
            vec3.plus(this.vertices[this.triangles[i + 1]].normal, this.vertices[this.triangles[i + 1]].normal, normal);
            vec3.plus(this.vertices[this.triangles[i + 2]].normal, this.vertices[this.triangles[i + 2]].normal, normal);
        }
        for (let i = 0; i < this.vertices.length; i++)
        {
            vec3.normalize(this.vertices[i].normal, this.vertices[i].normal);
        }
    }

    private tryInit(required = false)
    {
        if (this.initialized)
            return true;
        
        this.ctx = this.ctx || GlobalContext();
        if (!this.ctx)
        {
            if (required)
                throw new Error("Failed to init mesh without global GL context");
            return false;
        }
        const gl = this.ctx.gl;

        this.elementBuffer = gl.createBuffer() ?? panic("Failed to create element buffer object.");
        this.vertexArray = gl.createVertexArray() ?? panic("Failed to create vertex array object.");
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.elementBuffer);

        gl.bindVertexArray(this.vertexArray);
        this.vertices.bindVertexArray();
        gl.bindVertexArray(null);

        this.initialized = true;
        return true;
    }

}

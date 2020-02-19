import { vec3 } from "../types/vec3";
import { vec2 } from "../types/vec2";
import { Color } from "../types/color";
import { GL } from "./global";
import { panicNull, panic, fillArray } from "../utils/util";
import { Shader } from "./shader";
import { minus, cross } from "../types/math";
import { Asset } from "./asset";

export class Mesh extends Asset
{
    private _verts: vec3[] = [];
    private _triangles: number[] = [];
    private _uvs: vec2[] = [];
    private _colors: Color[] = [];
    private _normals: vec3[] = [];

    private dirty = true;
    private uploaded = false;

    private vertices = new Float32Array(0);
    private indices = new Uint32Array(0);
    public VBO: WebGLBuffer;
    private EBO: WebGLBuffer;
    private gl: WebGL2RenderingContext;

    constructor(gl = GL())
    {
        super();
        this.name = `Mesh_${this.assetID}`;
        this.gl = gl;
        this.VBO = gl.createBuffer() ?? panic("Failed to create vertex buffer.");
        this.EBO = gl.createBuffer() ?? panic("Failed to create element buffer.");
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
            if (this.normals.length !== this.verts.length)
                this.normals = [...this.normals, ...fillArray(vec3(0, 0, 0), this.verts.length - this.normals.length)];
                
            this.vertices = new Float32Array(this.verts.flatMap((vert, idx) => [
                ...vert,
                ...this.colors[idx],
                ...this.uvs[idx],
                ...this.normals[idx]]));
            if (this.vertices.length != this.verts.length * 12)
                throw new Error("Buffer with invalid length.");
            this.indices = new Uint32Array(this.triangles.flat());

            this.dirty = false;
            this.uploaded = false;
        }
    }

    setup(gl: WebGL2RenderingContext)
    {
        this.update();
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

    bind(shader: Shader, gl:WebGL2RenderingContext)
    {
        this.setup(gl);

        const attributes = shader.attributes;

        // Setup VAO
        const stride = 12 * 4;
        gl.bindBuffer(gl.ARRAY_BUFFER, this.VBO);
        // vert: vec3
        if (attributes.vert >= 0)
        {
            gl.vertexAttribPointer(attributes.vert, 3, gl.FLOAT, false, stride, 0);
            gl.enableVertexAttribArray(attributes.vert);
        }
        // color: vec4
        if (attributes.color >= 0)
        {
            gl.vertexAttribPointer(attributes.color, 4, gl.FLOAT, false, stride, 3 * 4);
            gl.enableVertexAttribArray(attributes.color);
        }
        // uv: vec2
        if (attributes.uv >= 0)
        {
            gl.vertexAttribPointer(attributes.uv, 2, gl.FLOAT, false, stride, 7 * 4);
            gl.enableVertexAttribArray(attributes.uv);
        }
        // normal: vec3
        if (attributes.normal >= 0)
        {
            gl.vertexAttribPointer(attributes.normal, 3, gl.FLOAT, true, stride, 9 * 4);
            gl.enableVertexAttribArray(attributes.normal);
        }

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.EBO);

    }

    destroy()
    {
        if (this.destroyed)
            return;
        this.gl.deleteBuffer(this.VBO);
        this.gl.deleteBuffer(this.EBO);
        super.destroy();
    }
}
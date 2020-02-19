import { vec3 } from "../types/vec3";
import { Color } from "../types/color";
import { GL } from "./global";
import { panic, fillArray } from "../utils/util";
import { Shader } from "./shader";
import { BindingData } from "./types";
import { Asset } from "./asset";

export class Lines extends Asset
{
    private _verts: vec3[] = [];
    private _colors: Color[] = [];
    private _lines: number[] = [];
    
    private dirty = true;

    private vertices = new Float32Array(0);
    private indices = new Uint32Array(0);
    public VBO: WebGLBuffer;
    public EBO: WebGLBuffer;
    private gl: WebGL2RenderingContext;

    constructor(gl = GL())
    {
        super();
        this.name = `Lines_${this.assetID}`;
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
    get colors() { return this._colors; }
    set colors(colors: Color[])
    {
        this._colors = colors;
        this.dirty = true;
    }
    get lines() { return this._lines; }
    set lines(lines: number[])
    {
        this._lines = lines;
        this.dirty = true;
    }

    clear()
    {
        this.verts = [];
        this.colors = [];
        this.lines = [];
    }

    update()
    {
        if (this.dirty)
        {
            const gl = this.gl;
            // Prepare VBO data.
            if (this.lines.length % 2 !== 0)
                throw new Error("Invalid lines.");
            if (this.colors.length !== this.verts.length)
                this.colors = [...this.colors, ...fillArray(Color.white, this.verts.length - this.colors.length)];
            this.vertices = new Float32Array(this.verts.flatMap((vert, idx) => [
                ...vert,
                ...this.colors[idx],
            ]));
            if (this.vertices.length != this.verts.length * 7)
                throw new Error("Buffer with invalid length.");
            this.indices = new Uint32Array(this.lines.flat());

            gl.bindBuffer(gl.ARRAY_BUFFER, this.VBO);
            gl.bufferData(gl.ARRAY_BUFFER, this.vertices, gl.DYNAMIC_DRAW);

            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.EBO);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.indices, gl.DYNAMIC_DRAW);

            this.dirty = false;
        }
    }

    bind(shader: Shader)
    {
        const gl = this.gl;
        this.update();

        const attributes = shader.attributes;

        // Setup VAO
        const stride = 7 * 4;
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

export class LineBuilder
{
    private verts: vec3[] = [];
    private colors: Color[] = [];
    private lines: number[] = [];
    private gl: WebGL2RenderingContext;
    constructor(capacity: number = 0, gl = GL())
    {
        this.gl = gl;
    }
    addLine(line: [vec3, vec3], color: Color = Color.white)
    {
        const base = this.verts.length;
        const [u, v] = line;
        this.verts.push(u, v);
        this.colors.push(color, color);
        this.lines.push(base, base + 1);
    }
    toLines()
    {
        const line = new Lines(this.gl);
        line.verts = this.verts;
        line.colors = this.colors;
        line.lines = this.lines;
        line.update();
        return line;
    }
}
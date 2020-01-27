import { Mesh } from "../core/mesh";
import { vec3 } from "../types/vec3";
import { vec2 } from "../types/vec2";
import { Color } from "../types/color";
import { GlobalContext } from "../core/global";

export function createBuiltinMesh(gl: WebGL2RenderingContext)
{
    return {
        quad: quad(gl),
        screenQuad: screenQuad(gl),
        cube: cube(gl),
    };
}

function quad(gl: WebGL2RenderingContext)
{
    const quad = new Mesh(gl);
    quad.verts = [
        vec3(-.5, -.5, 0),
        vec3(.5, -.5, 0),
        vec3(.5, .5, 0),
        vec3(-.5, .5, 0),
    ];
    quad.triangles = [
        0, 1, 3,
        1, 2, 3,
    ];
    quad.uvs = [
        vec2(0, 0),
        vec2(1, 0),
        vec2(1, 1),
        vec2(0, 1)
    ];
    quad.calculateNormals();
    return quad;
}

function screenQuad(gl: WebGL2RenderingContext)
{
    const screenQuad = new Mesh(gl);
    screenQuad.verts = [
        vec3(-1, -1, 0),
        vec3(1, -1, 0),
        vec3(1, 1, 0),
        vec3(-1, 1, 0),
    ];
    screenQuad.triangles = [
        0, 1, 3,
        1, 2, 3,
    ];
    screenQuad.uvs = [
        vec2(0, 0),
        vec2(1, 0),
        vec2(1, 1),
        vec2(0, 1)
    ];
    screenQuad.calculateNormals();
    return screenQuad;
}

function cube(gl: WebGL2RenderingContext)
{
    const verts = [
        vec3(-.5, -.5, -.5),
        vec3(.5, -.5, -.5),
        vec3(.5, .5, -.5),
        vec3(-.5, .5, -.5),
        vec3(-.5, -.5, .5),
        vec3(.5, -.5, .5),
        vec3(.5, .5, .5),
        vec3(-.5, .5, .5),
    ];
    const uvs = [
        vec2(0, 0),
        vec2(1, 0),
        vec2(1, 1),
        vec2(0, 1)
    ];
    const mb = new MeshBuilder(24, gl);
    mb.addPolygon([
        verts[1],
        verts[0],
        verts[3],
        verts[2],
    ],
        [
            uvs[0],
            uvs[1],
            uvs[2],
            uvs[3]
        ]);
    mb.addPolygon([
        verts[5],
        verts[1],
        verts[2],
        verts[6],
    ],
        [
            uvs[0],
            uvs[1],
            uvs[2],
            uvs[3]
        ]);
    mb.addPolygon([
        verts[4],
        verts[5],
        verts[6],
        verts[7],
    ],
        [
            uvs[0],
            uvs[1],
            uvs[2],
            uvs[3]
        ]);
    mb.addPolygon([
        verts[0],
        verts[4],
        verts[7],
        verts[3],
    ],
        [
            uvs[0],
            uvs[1],
            uvs[2],
            uvs[3]
        ]);
    mb.addPolygon([
        verts[7],
        verts[6],
        verts[2],
        verts[3],
    ],
        [
            uvs[0],
            uvs[1],
            uvs[2],
            uvs[3]
        ]);
    mb.addPolygon([
        verts[0],
        verts[1],
        verts[5],
        verts[4],
    ],
        [
            uvs[0],
            uvs[1],
            uvs[2],
            uvs[3]
        ]);
    return mb.toMesh();
}

export class MeshBuilder 
{
    private verts: vec3[] = [];
    private triangles: number[] = [];
    private uvs: vec2[] = [];
    private colors: Color[] = [];
    private gl: WebGL2RenderingContext;

    constructor(capacity: number, gl = GlobalContext().gl)
    {
        this.gl = gl;
    }
    addPolygon(verts: vec3[], uvs: vec2[])
    {
        const base = this.verts.length;
        for (let i = 0; i < verts.length; i++)
        {
            this.verts.push(verts[i]);
            this.uvs.push(uvs[i]);
            this.colors.push(Color.white);
        }
        for (let i = 2; i < verts.length; i++)
        {
            this.triangles.push(
                base + 0,
                base + i - 1,
                base + i
            );
        }
    }
    toMesh()
    {
        const mesh = new Mesh(this.gl);
        mesh.verts = this.verts;
        mesh.triangles = this.triangles;
        mesh.colors = this.colors;
        mesh.uvs = this.uvs;
        mesh.calculateNormals();
        return mesh;
    }
}
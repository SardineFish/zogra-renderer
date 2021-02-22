import { vec3, vec2, Color, Vector3 } from "../types/types";
import { GlobalContext } from "../core/global";
import { Mesh } from "../core/mesh";

export class MeshBuilder 
{
    private verts: vec3[] = [];
    private triangles: number[] = [];
    private uvs: vec2[] = [];
    private colors: Color[] = [];
    private gl: WebGL2RenderingContext;

    constructor(capacity: number = 0, gl = GlobalContext().gl)
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
    addSubMesh(verts: vec3[], triangles: number[], colors: Color[] = [Color.white], uvs: vec2[] = [vec2(0, 0)])
    {
        const base = this.verts.length;
        if (triangles.length % 3 !== 0)
            throw new Error("Invalid number of triangles.");
        for (let i = 0; i < verts.length; i++)
        {
            this.verts.push(verts[i]);
            this.uvs.push(i >= uvs.length ? uvs[uvs.length - 1] : uvs[i]);
            this.colors.push(i >= colors.length ? colors[colors.length - 1] : colors[i]);
        }
        for (let i = 0; i < triangles.length; i++)
        {
            this.triangles.push(base + triangles[i]);
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

    static quad()
    {
        const quad = new Mesh();
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
        quad.normals = [
            vec3(0, 0, 1),
            vec3(0, 0, 1),
            vec3(0, 0, 1),
            vec3(0, 0, 1),
        ];
        // quad.calculateNormals();
        quad.name = "mesh_quad";
        return quad;
    }
}
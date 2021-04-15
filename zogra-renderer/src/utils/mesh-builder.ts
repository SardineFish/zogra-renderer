import { vec3, vec2, Color, Vector3, mul } from "../types/types";
import { GlobalContext } from "../core/global";
import { DefaultVertexData, DefaultVertexStruct, Mesh, MeshEx } from "../core/mesh";
import { BufferElementValue, BufferElementView, BufferStructure } from "../core/buffer";
import { UniformValueType } from "../core/types";

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

    static quad(center = vec2.zero(), size = vec2.one())
    {
        const halfSize = mul(size, vec2(0.5));

        const quad = new Mesh();
        quad.verts = [
            vec3(center.x - halfSize.x, center.y - halfSize.y, 0),
            vec3(center.x + halfSize.x, center.y - halfSize.y, 0),
            vec3(center.x + halfSize.x, center.y + halfSize.y, 0),
            vec3(center.x - halfSize.x, center.y + halfSize.y, 0),
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

    static ndcQuad()
    {
        return this.quad(vec2.zero(), vec2(2, 2));
    }

    static ndcTriangle()
    {
        const mesh = new Mesh();
        mesh.verts = [
            vec3(-1, -1, 0),
            vec3(3, -1, 0),
            vec3(-1, 3, 0),
        ];
        mesh.triangles = [0, 1, 2];
        mesh.uvs = [
            vec2(0, 0),
            vec2(2, 0),
            vec2(0, 2),
        ];
        mesh.normals = [
            vec3(0, 0, 1),
            vec3(0, 0, 1),
            vec3(0, 0, 1),
        ];
        mesh.name = "mesh_ndc_triangle";
        return mesh;
    }
}

type VertexData<T extends BufferStructure> = {
    [key in keyof T]: BufferElementValue<T[key]>
}

export class MeshBuilderEx<VertexStruct extends BufferStructure = typeof DefaultVertexData>
{
    private mesh: MeshEx<VertexStruct>;
    private verticesCount = 0;
    private indicesCount = 0;
    constructor(verticesCapacity: number = 16, trianglesCapacity: number = verticesCapacity * 3, structure: VertexStruct = DefaultVertexData as unknown as VertexStruct)
    {
        this.mesh = new MeshEx(structure);

        this.mesh.resize(verticesCapacity, trianglesCapacity);
    }

    addPolygon<T extends Partial<VertexData<VertexStruct>>>(...verts: T[])
    {
        if (verts.length <= 0)
            return;
        if (this.verticesCount + verts.length > this.mesh.vertices.length)
        {
            this.mesh.resize(this.mesh.vertices.length * 2, this.mesh.triangles.length * 2, true);
        }
        
        const base = this.verticesCount;
        for (const key in verts[0])
        {
            for (let i = 0; i < verts.length; i++)
            {
                this.mesh.vertices[base + i][key].set(verts[i][key] as unknown as number[]);
            }
        }
        for (let i = 0; i < verts.length - 2; i++)
        {
            this.mesh.triangles[this.indicesCount + i * 3 + 0] = base + 0;
            this.mesh.triangles[this.indicesCount + i * 3 + 1] = base + i + 1;
            this.mesh.triangles[this.indicesCount + i * 3 + 2] = base + i + 2;
        }
        this.verticesCount += verts.length;
        this.indicesCount += (verts.length - 2) * 3;
    }

    getMesh()
    {
        if (this.mesh.triangles.length != this.indicesCount)
            this.mesh.resize(this.verticesCount, this.indicesCount, true);
        else if (this.mesh.vertices.length != this.verticesCount)
            this.mesh.vertices.resize(this.verticesCount, true);
        
        
        return this.mesh;
    }
}
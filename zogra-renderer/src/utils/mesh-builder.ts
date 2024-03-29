import { vec3, vec2, Color, Vector3, mul } from "../types";
import { GLContext, GlobalContext } from "../core/global";
import { DefaultVertexData, DefaultVertexStruct, Mesh} from "../core/mesh";
import { BufferElementValue, BufferElementView, BufferStructure } from "../core/array-buffer";
import { UniformValueType } from "../core/types";

type VertexData<T extends BufferStructure> = {
    [key in keyof T]: BufferElementValue<T[key]>
}

export class MeshBuilder<VertexStruct extends BufferStructure = typeof DefaultVertexData>
{
    private mesh: Mesh<VertexStruct>;
    private verticesCount = 0;
    private indicesCount = 0;
    constructor(verticesCapacity: number = 16, trianglesCapacity: number = verticesCapacity * 3, structure: VertexStruct = DefaultVertexData as unknown as VertexStruct, ctx = GlobalContext())
    {
        this.mesh = new Mesh(structure, ctx);

        this.mesh.resize(verticesCapacity, trianglesCapacity);
    }

    addPolygon<T extends Partial<VertexData<VertexStruct>>>(...verts: T[])
    {
        if (verts.length <= 0)
            return;
        if (this.verticesCount + verts.length > this.mesh.vertices.length)
        {
            this.mesh.resize(this.mesh.vertices.length * 2, this.mesh.indices.length * 2, true);
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
            this.mesh.indices[this.indicesCount + i * 3 + 0] = base + 0;
            this.mesh.indices[this.indicesCount + i * 3 + 1] = base + i + 1;
            this.mesh.indices[this.indicesCount + i * 3 + 2] = base + i + 2;
        }
        this.verticesCount += verts.length;
        this.indicesCount += (verts.length - 2) * 3;
    }

    toMesh()
    {
        if (this.mesh.indices.length != this.indicesCount)
            this.mesh.resize(this.verticesCount, this.indicesCount, true);
        else if (this.mesh.vertices.length != this.verticesCount)
            this.mesh.vertices.resize(this.verticesCount, true);
        
        
        return this.mesh;
    }

    static quad(center = vec2.zero(), size = vec2.one(), ctx = GlobalContext())
    {
        const halfSize = vec2.mul(size, 0.5);
        const mesh = new Mesh(ctx);
        mesh.resize(4, 6);
        mesh.vertices[0].vert.set([center.x - halfSize.x, center.y - halfSize.y, 0]);
        mesh.vertices[1].vert.set([center.x + halfSize.x, center.y - halfSize.y, 0]);
        mesh.vertices[2].vert.set([center.x + halfSize.x, center.y + halfSize.y, 0]);
        mesh.vertices[3].vert.set([center.x - halfSize.x, center.y + halfSize.y, 0]);
        mesh.vertices[0].uv.set([0, 0]);
        mesh.vertices[1].uv.set([1, 0]);
        mesh.vertices[2].uv.set([1, 1]);
        mesh.vertices[3].uv.set([0, 1]);
        mesh.vertices[0].normal.set([0, 0, 1]);
        mesh.vertices[1].normal.set([0, 0, 1]);
        mesh.vertices[2].normal.set([0, 0, 1]);
        mesh.vertices[3].normal.set([0, 0, 1]);
        mesh.vertices[0].color.fill(1);
        mesh.vertices[1].color.fill(1);
        mesh.vertices[2].color.fill(1);
        mesh.vertices[3].color.fill(1);
        mesh.indices.set([0, 1, 2, 0, 2, 3]);
        return mesh;
    }

    static ndcQuad(ctx = GlobalContext())
    {
        return this.quad(vec2.zero(), vec2(2, 2), ctx);
    }
    static ndcTriangle(ctx = GlobalContext())
    {
        const mesh = new Mesh(ctx);
        mesh.resize(3, 3);
        mesh.vertices[0].vert.set([-1, -1, 0]);
        mesh.vertices[1].vert.set([3, -1, 0]);
        mesh.vertices[2].vert.set([-1, 3, 0]);
        mesh.vertices[0].uv.set([0, 0]);
        mesh.vertices[1].uv.set([2, 0]);
        mesh.vertices[2].uv.set([0, 2]);
        mesh.vertices[0].normal.set([0, 0, 1]);
        mesh.vertices[1].normal.set([0, 0, 1]);
        mesh.vertices[2].normal.set([0, 0, 1]);
        mesh.vertices[0].color.fill(1);
        mesh.vertices[1].color.fill(1);
        mesh.vertices[2].color.fill(1);

        mesh.indices.set([0, 1, 2]);
        mesh.name = "mesh_ndc_triangle";
        return mesh;
    }

    static cube(center = vec3.zero(), size = vec3.one(), ctx: GLContext = GlobalContext())
    {
        const verts = [
            vec3(-.5, -.5, -.5).mul(size).plus(center),
            vec3(.5, -.5, -.5).mul(size).plus(center),
            vec3(.5, .5, -.5).mul(size).plus(center),
            vec3(-.5, .5, -.5).mul(size).plus(center),
            vec3(-.5, -.5, .5).mul(size).plus(center),
            vec3(.5, -.5, .5).mul(size).plus(center),
            vec3(.5, .5, .5).mul(size).plus(center),
            vec3(-.5, .5, .5).mul(size).plus(center),
        ];
        const uvs = [
            vec2(0, 0),
            vec2(1, 0),
            vec2(1, 1),
            vec2(0, 1)
        ];
        const mb = new MeshBuilder(24, 36, DefaultVertexData, ctx);
        mb.addPolygon(
            {
                vert: verts[1],
                uv: uvs[0],
                normal: vec3(0, 0, -1),
            },
            {
                vert: verts[0],
                uv: uvs[1],
                normal: vec3(0, 0, -1),
            },
            {
                vert: verts[3],
                uv: uvs[2],
                normal: vec3(0, 0, -1),
            },
            {
                vert: verts[2],
                uv: uvs[3],
                normal: vec3(0, 0, -1),
            }
        );
        mb.addPolygon(
            {
                vert: verts[5],
                uv: uvs[0],
                normal: vec3(1, 0, 0),
            },
            {
                vert: verts[1],
                uv: uvs[1],
                normal: vec3(1, 0, 0),
            },
            {
                vert: verts[2],
                uv: uvs[2],
                normal: vec3(1, 0, 0),
            },
            {
                vert: verts[6],
                uv: uvs[3],
                normal: vec3(1, 0, 0),
            },
        );
        mb.addPolygon(
            {
                vert: verts[4],
                uv: uvs[0],
                normal: vec3(0, 0, 1),
            },
            {
                vert: verts[5],
                uv: uvs[1],
                normal: vec3(0, 0, 1),
            },
            {
                vert: verts[6],
                uv: uvs[2],
                normal: vec3(0, 0, 1),
            },
            {
                vert: verts[7],
                uv: uvs[3],
                normal: vec3(0, 0, 1),
            },
        );
        mb.addPolygon(
            {
                vert: verts[0],
                uv: uvs[0],
                normal: vec3(-1, 0, 0),
            },
            {
                vert: verts[4],
                uv: uvs[1],
                normal: vec3(-1, 0, 0),
            },
            {
                vert: verts[7],
                uv: uvs[2],
                normal: vec3(-1, 0, 0),
            },
            {
                vert: verts[3],
                uv: uvs[3],
                normal: vec3(-1, 0, 0),
            },
        );
        mb.addPolygon(
            {
                vert: verts[7],
                uv: uvs[0],
                normal: vec3(0, 1, 0),
            },
            {
                vert: verts[6],
                uv: uvs[1],
                normal: vec3(0, 1, 0),
            },
            {
                vert: verts[2],
                uv: uvs[2],
                normal: vec3(0, 1, 0),
            },
            {
                vert: verts[3],
                uv: uvs[3],
                normal: vec3(0, 1, 0),
            },
        );
        mb.addPolygon(
            {
                vert: verts[0],
                uv: uvs[0],
                normal: vec3(0, -1, 0),
            },
            {
                vert: verts[1],
                uv: uvs[1],
                normal: vec3(0, -1, 0),
            },
            {
                vert: verts[5],
                uv: uvs[2],
                normal: vec3(0, -1, 0),
            },
            {
                vert: verts[4],
                uv: uvs[3],
                normal: vec3(0, -1, 0),
            },
        );
        const mesh = mb.toMesh();
        mesh.vertices.forEach(vert => vert.color.fill(1));
        mesh.name = "mesh_cube";
        return mesh;
    }

    static sphereNormalizedCube(center = vec3.zero(), radius = 0.5, segments: number = 12, ctx = GlobalContext())
    {
        // There are actually duplicated vertices at the edge of each surface
        const totalVerts = 6 * (segments + 1) * (segments + 1);
        const totalIndices = segments * segments * 3 * 2 * 6;
        let mesh = new Mesh();
        mesh.resize(totalVerts, totalIndices);
        let indexIdx = 0;
        const uniqueVerts: Vector3[] = [];
        const uniqueVertsMap: number[][][] = [];

        // first we build a cube surface, each vertex is unique at location (x, y, z)
        // Map from cube surface location to sphere vertex
        for (let f = 0; f < 6; ++f)
        {
            for (let i = 0; i <= segments; ++i)
            {
                for (let j = 0; j <= segments; ++j)
                {
                    let idx = [
                        () => vec3(0,           i,          j),
                        () => vec3(segments,    i,          j),
                        () => vec3(i,           j,          0),
                        () => vec3(i,           j,          segments),
                        () => vec3(i,           0,          j),
                        () => vec3(i,           segments,   j),
                    ][f]();

                    let x = uniqueVertsMap[idx.x] || (uniqueVertsMap[idx.x] = []);
                    let y = x[idx.y] || (x[idx.y] = []);
                    let z = y[idx.z];
                    if (z === undefined)
                    {
                        y[idx.z] = uniqueVerts.length;
                        uniqueVerts.push(idx);
                    }
                }
            }
        }
        mesh.resize(uniqueVerts.length, totalIndices);
        uniqueVerts.forEach((vertIdx, idx) =>
        {
            let normal = vec3.div(vertIdx, segments).mul(2).minus(1).normalize();
            let pos = vec3.mul(normal, radius);

            const [_, theta, phi] = sphericalCoord(pos);
            const uv = [phi / (Math.PI * 2), theta / Math.PI];

            mesh.vertices[idx].vert.set(pos);
            mesh.vertices[idx].normal.set(normal);
            mesh.vertices[idx].color.set(Color.white);
            mesh.vertices[idx].uv.set(uv);
            mesh.vertices[idx].uv2.set(uv);
        });

        const usedVerts: number[] = [];
        for (let f = 0; f < 6; ++f)
        {
            for (let i = 0; i <= segments; ++i)
            {
                for (let j = 0; j <= segments; ++j)
                {
                    let vertIdx = [
                        () => vec3(segments, i, j),
                        () => vec3(0, i, segments - j),
                        () => vec3(i, j, segments),
                        () => vec3(i, segments - j, 0),
                        () => vec3(i, segments, segments - j),
                        () => vec3(i, 0, j),
                    ][f]();

                    usedVerts.push(uniqueVertsMap[vertIdx.x][vertIdx.y][vertIdx.z]);
                }
            }

            for (let i = 0; i < segments; ++i)
            {
                for (let j = 0; j < segments; ++j)
                {
                    let u = (f * (segments + 1) * (segments + 1) + i * (segments + 1) + j);
                    let v = u + (segments + 1);

                    mesh.indices[indexIdx++] = usedVerts[v + 0];
                    mesh.indices[indexIdx++] = usedVerts[u + 1];
                    mesh.indices[indexIdx++] = usedVerts[u + 0];

                    mesh.indices[indexIdx++] = usedVerts[v + 0];
                    mesh.indices[indexIdx++] = usedVerts[v + 1];
                    mesh.indices[indexIdx++] = usedVerts[u + 1];
                }
            }
        }

        return mesh;
    }
}

function sphericalCoord(p: Readonly<Vector3>) : [number, number, number] // (r, theta, phi)
{
    const r = p.magnitude;
    const theta = Math.acos(p.y / r);
    const phi = Math.atan2(p.z, p.x);
    return [r, theta, phi];
}

/** @deprecated */
export class MeshBuilderLegacy
{
    private verts: vec3[] = [];
    private triangles: number[] = [];
    private uvs: vec2[] = [];
    private colors: Color[] = [];
    private ctx: GLContext;

    constructor(capacity: number = 0, ctx = GlobalContext())
    {
        this.ctx = ctx;
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
        const mesh = new Mesh(this.ctx);
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

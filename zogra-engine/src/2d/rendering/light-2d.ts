import { Color, Culling, DefaultVertexData, FilterMode, mat4, MaterialFromShader, Mesh, minus, mul, plus, RenderTarget, RenderTexture, Shader, shaderProp, TextureFormat, vec2, vec3, Vector2, VertexStruct } from "zogra-renderer";
import { Debug } from "zogra-renderer/dist/core/global";
import { ShaderSource } from "../../assets";
import { Entity } from "../../engine/entity";
import { RenderData } from "../../render-pipeline/render-data";
import { RenderContext } from "../../render-pipeline/render-pipeline";
import { Collider2D } from "../physics/collider2d";
import { TilemapCollider } from "../physics/tilemap-collider";
import { Shadow2DMaterial } from "./materials";
import { Tilemap } from "./tilemap";

export enum ShadowType
{
    Soft = "soft",
    Hard = "hard",
};

export const Shadow2DVertStruct = VertexStruct({
    ...DefaultVertexData,
    p0: "vec2",
    p1: "vec2",
});

export class Light2D extends Entity
{
    shadowType: ShadowType | false = ShadowType.Hard;
    volumnRadius: number = 1;
    lightRange: number = 10;
    lightColor: Color = Color.white;
    /** In range [-1..1] */
    attenuation: number = 0;

    private shadowMesh = new Mesh(Shadow2DVertStruct);
    private shadowMap?: RenderTexture;
    private shadowMat = new Shadow2DMaterial();

    constructor()
    {
        super();
        this.shadowMesh.resize(50, 90);
    }

    getShadowMap(context: RenderContext, data: RenderData)
    {
        if (!this.shadowMap)
            this.shadowMap = new RenderTexture(context.renderer.canvasSize.x, context.renderer.canvasSize.y, false, TextureFormat.R8, FilterMode.Linear);
        this.updateShadowMesh(context);
        
        context.renderer.setRenderTarget(this.shadowMap);
        context.renderer.clear(Color.black);
        this.shadowMat.lightPos.set(this.position);
        this.shadowMat.lightRange = this.lightRange;
        this.shadowMat.volumnSize = this.volumnRadius;
        context.renderer.drawMesh(this.shadowMesh, this.localToWorldMatrix, this.shadowMat);
        // context.renderer.blit(this.shadowMap, RenderTarget.CanvasTarget);
        return this.shadowMap;
    }

    updateShadowMesh(context: RenderContext)
    {
        this.shadowMesh.indices.fill(0);
        const bound: [vec2, vec2] = [vec2(-this.lightRange).plus(this.position.toVec2()), vec2(this.lightRange).plus(this.position.toVec2())];
        const colliderToLight = mat4.identity();
        let vertOfset = 0;
        let indexOffset = 0;
        for (const collider of context.scene.physics.__getColliders<Collider2D>())
        {
            if (collider instanceof TilemapCollider)
            {
                const polygons = collider.getPolygons(...bound);
                if (!polygons)
                    continue;
                colliderToLight.set((collider.tilemap as Tilemap).localToWorldMatrix);
                mat4.mul(colliderToLight, colliderToLight, this.worldToLocalMatrix);
                for (const polygon of polygons)
                {
                    for (let i = 0; i < polygon.points.length; i++)
                    {
                        const [verts, indices] = this.appendLineShadow(
                            polygon.points[i],
                            polygon.points[(i + 1) % polygon.points.length],
                            colliderToLight,
                            vertOfset,
                            indexOffset);
                        vertOfset += verts;
                        indexOffset += indices;
                    }
                }
            }
        }
        // this.appendLineShadow(vec2(1, 0), vec2(0, 0), this.worldToLocalMatrix, 0, 0);
        this.shadowMesh.update();
    }

    private __tempVectors = Array.from(new Array(32)).map(() => vec2.zero());
    // https://www.geogebra.org/m/keskajgx
    private appendLineShadow(pointA: Readonly<vec2>, pointB: Readonly<vec2>, objToLight: Readonly<mat4>, vertOffset: number, indexOffset: number): [number, number]
    {
        let temp = 0;
        if (this.shadowMesh.vertices.length <= vertOffset + 5 || this.shadowMesh.indices.length <= indexOffset + 9)
        {
            this.shadowMesh.resize(this.shadowMesh.vertices.length * 2, this.shadowMesh.indices.length * 2, true);
        }
        const r2 = this.volumnRadius * this.volumnRadius;
        const R2 = this.lightRange * this.lightRange;
        const p0 = mat4.mulPoint2(this.__tempVectors[temp++], objToLight, pointA);
        const p1 = mat4.mulPoint2(this.__tempVectors[temp++], objToLight, pointB);

        vec2.set(this.shadowMesh.vertices[vertOffset + 0].vert, p0);
        vec2.set(this.shadowMesh.vertices[vertOffset + 1].vert, p1);

        const dir = vec2.minus(this.__tempVectors[temp++], p1, p0).normalize();

        // Debug().drawCircle(this.position, this.volumnRadius);
        // Debug().drawCircle(this.position, this.lightRange, Color.yellow);


        let tangentP0 = circleTangentThroughPoint(p0, this.volumnRadius, [this.__tempVectors[temp++], this.__tempVectors[temp++]]);
        let tangentP1 = circleTangentThroughPoint(p1, this.volumnRadius, [this.__tempVectors[temp++], this.__tempVectors[temp++]]);
        // Debug().drawLines([mat4.mulPoint(this.localToWorldMatrix, tangentP0[0].toVec3()),
        //     mat4.mulPoint(this.localToWorldMatrix, tangentP0[1].toVec3()),
        //     mat4.mulPoint(this.localToWorldMatrix, p0.toVec3())
        // ])
        tangentP0 = [tangentP0[1], tangentP0[0]];
        const shadowA = this.shadowMesh.vertices[vertOffset + 4].vert;
        const shadowB = this.shadowMesh.vertices[vertOffset + 2].vert;
        const tan0 = [
            vec2.minus(this.__tempVectors[temp++], p0, tangentP0[0]).normalize(),
            vec2.minus(this.__tempVectors[temp++], p0, tangentP0[1]).normalize()
        ];
        const tan1 = [
            vec2.minus(this.__tempVectors[temp++], p1, tangentP1[0]).normalize(),
            vec2.minus(this.__tempVectors[temp++], p1, tangentP1[1]).normalize()
        ];

        let meshType = 0;
        if (vec2.cross(dir, tan0[0]) <= 0)
        {
            meshType |= 1;
            shadowA.set(tan1[1].mul(Math.sqrt(R2 - r2)).plus(tangentP1[1]));
        }
        else
            shadowA.set(tan0[0].mul(Math.sqrt(R2 - r2)).plus(tangentP0[0]));
        if (vec2.cross(dir, tan1[0]) <= 0)
        {
            meshType |= 2;
            shadowB.set(tan0[1].mul(Math.sqrt(R2 - r2)).plus(tangentP0[1]));
        }
        else
            shadowB.set(tan1[0].mul(Math.sqrt(R2 - r2)).plus(tangentP1[0]));
        
        // console.log(meshType);
            
        const OC = vec2.plus(this.__tempVectors[temp++], shadowA, shadowB).mul(0.5);
        const shadowR = vec2.mul(this.shadowMesh.vertices[vertOffset + 3].vert, OC, R2 / OC.magnitudeSqr);


        vec2.set(this.shadowMesh.vertices[vertOffset + 0].p0, p0);
        vec2.set(this.shadowMesh.vertices[vertOffset + 0].p1, p1);
        vec2.set(this.shadowMesh.vertices[vertOffset + 1].p0, p0);
        vec2.set(this.shadowMesh.vertices[vertOffset + 1].p1, p1);
        vec2.set(this.shadowMesh.vertices[vertOffset + 2].p0, p0);
        vec2.set(this.shadowMesh.vertices[vertOffset + 2].p1, p1);
        vec2.set(this.shadowMesh.vertices[vertOffset + 3].p0, p0);
        vec2.set(this.shadowMesh.vertices[vertOffset + 3].p1, p1);
        vec2.set(this.shadowMesh.vertices[vertOffset + 4].p0, p0);
        vec2.set(this.shadowMesh.vertices[vertOffset + 4].p1, p1);

        switch (meshType)
        {
            case 0:
                this.shadowMesh.indices.set([
                    vertOffset + 0,
                    vertOffset + 3,
                    vertOffset + 4,
                    vertOffset + 0,
                    vertOffset + 1,
                    vertOffset + 3,
                    vertOffset + 1,
                    vertOffset + 2,
                    vertOffset + 3,
                ], indexOffset);
                // Debug().drawLines([
                //     mat4.mulPoint(this.localToWorldMatrix, p0.toVec3()),
                //     mat4.mulPoint(this.localToWorldMatrix, p1.toVec3()),
                //     mat4.mulPoint(this.localToWorldMatrix, vec3.set(shadowB)),
                //     mat4.mulPoint(this.localToWorldMatrix, vec3.set(shadowR)),
                //     mat4.mulPoint(this.localToWorldMatrix, vec3.set(shadowA))
                // ]);
                break;
            case 1: // merge shadowA->p0 & p0->p1
                this.shadowMesh.indices.set([
                    vertOffset + 1,
                    vertOffset + 2,
                    vertOffset + 3,
                    vertOffset + 1,
                    vertOffset + 3,
                    vertOffset + 4,
                    vertOffset + 1,
                    vertOffset + 1,
                    vertOffset + 1,
                ], indexOffset);
                // return [5, 9];
                // Debug().drawLines([
                //     mat4.mulPoint(this.localToWorldMatrix, p1.toVec3()),
                //     mat4.mulPoint(this.localToWorldMatrix, shadowB.toVec3()),
                //     mat4.mulPoint(this.localToWorldMatrix, shadowR.toVec3()),
                //     mat4.mulPoint(this.localToWorldMatrix, shadowA.toVec3())
                // ]);
                break;
            case 2: // merge p0->p1 & p1 -> shadowB
                this.shadowMesh.indices.set([
                    vertOffset + 0,
                    vertOffset + 2,
                    vertOffset + 3,
                    vertOffset + 0,
                    vertOffset + 3,
                    vertOffset + 4,
                    vertOffset + 1,
                    vertOffset + 1,
                    vertOffset + 1,
                ], indexOffset);
                // return [5, 6];
                // Debug().drawLines([
                //     mat4.mulPoint(this.localToWorldMatrix, p0.toVec3()),
                //     mat4.mulPoint(this.localToWorldMatrix, shadowB.toVec3()),
                //     mat4.mulPoint(this.localToWorldMatrix, shadowR.toVec3()),
                //     mat4.mulPoint(this.localToWorldMatrix, shadowA.toVec3())
                // ]);
                break;
            case 3: // cross
                this.shadowMesh.indices.set([
                    vertOffset + 1,
                    vertOffset + 3,
                    vertOffset + 4,
                    vertOffset + 1,
                    vertOffset + 0,
                    vertOffset + 3,
                    vertOffset + 0,
                    vertOffset + 2,
                    vertOffset + 3,
                ], indexOffset);
                // Debug().drawLines([
                //     mat4.mulPoint(this.localToWorldMatrix, p1.toVec3()),
                //     mat4.mulPoint(this.localToWorldMatrix, p0.toVec3()),
                //     mat4.mulPoint(this.localToWorldMatrix, shadowB.toVec3()),
                //     mat4.mulPoint(this.localToWorldMatrix, shadowR.toVec3()),
                //     mat4.mulPoint(this.localToWorldMatrix, shadowA.toVec3())
                // ]);
                break;
        }
        return [5, 9];
    }

    private appendVerts()
    {

    }

}



const _temp1 = vec2.zero(), _temp2 = vec2.zero();
// Ref: https://en.wikipedia.org/wiki/Tangent_lines_to_circles#With_analytic_geometry
function circleTangentThroughPoint(point: Readonly <vec2>, radius: number, out: [vec2, vec2] = [vec2.zero(), vec2.zero()]): [vec2, vec2]
{
    const r2 = radius * radius;
    const d2 = point.magnitudeSqr;
    const t = _temp1;
    t.x = -point.y;
    t.y = point.x;
    t.mul(radius / d2 * Math.sqrt(d2 - r2));
    vec2.mul(_temp2, point, r2 / d2);

    // const t = vec2(-point.y, point.x).mul(radius / d2 * Math.sqrt(d2 - r2));
    out[0].set(_temp2).plus(t);
    out[1].set(_temp2).minus(t);
    return out;
}
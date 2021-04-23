import { Color, Culling, DefaultVertexData, FilterMode, mat4, MaterialFromShader, Mesh, minus, mul, plus, RenderTarget, RenderTexture, Shader, shaderProp, TextureFormat, vec2, Vector2, VertexStruct } from "zogra-renderer";
import { Debug } from "zogra-renderer/dist/core/global";
import { ShaderSource } from "../../assets";
import { Entity } from "../../engine/entity";
import { RenderData } from "../../render-pipeline/render-data";
import { RenderContext } from "../../render-pipeline/render-pipeline";
import { Shadow2DMaterial } from "./materials";

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
        this.shadowMesh.resize(100, 100);
    }

    getShadowMap(context: RenderContext, data: RenderData)
    {
        if (!this.shadowMap)
            this.shadowMap = new RenderTexture(context.renderer.canvasSize.x, context.renderer.canvasSize.y, false, TextureFormat.R8, FilterMode.Linear);
        this.updateShadowMesh();
        
        context.renderer.setRenderTarget(this.shadowMap);
        context.renderer.clear(Color.black);
        this.shadowMat.lightPos.set(this.position);
        this.shadowMat.lightRange = this.lightRange;
        this.shadowMat.volumnSize = this.volumnRadius;
        context.renderer.drawMesh(this.shadowMesh, this.localToWorldMatrix, this.shadowMat);
        context.renderer.blit(this.shadowMap, RenderTarget.CanvasTarget);
        return this.shadowMap;
    }

    updateShadowMesh()
    {
        this.appendLineShadow(vec2(1, 0), vec2(0, 0), this.worldToLocalMatrix, 0, 0);
        this.shadowMesh.update();
    }

    // https://www.geogebra.org/m/keskajgx
    private appendLineShadow(pointA: Readonly<vec2>, pointB: Readonly<vec2>, objToLight: Readonly<mat4>, vertOffset: number, indexOffset: number): [number, number]
    {
        const r2 = this.volumnRadius * this.volumnRadius;
        const R2 = this.lightRange * this.lightRange;
        const p0 = mat4.mulPoint2(objToLight, pointA);
        const p1 = mat4.mulPoint2(objToLight, pointB);
        const dir = minus(p1, p0).normalize();

        Debug().drawCircle(this.position, this.volumnRadius);
        Debug().drawCircle(this.position, this.lightRange, Color.yellow);


        let tangentP0 = this.circleTangentThroughPoint(p0, this.volumnRadius);
        let tangentP1 = this.circleTangentThroughPoint(p1, this.volumnRadius);
        tangentP0 = [tangentP0[1], tangentP0[0]];
        let shadowA: vec2;
        let shadowB: vec2;
        const tan0 = [minus(p0, tangentP0[0]).normalize(), minus(p0, tangentP0[1]).normalize()];
        const tan1 = [minus(p1, tangentP1[0]).normalize(), minus(p1, tangentP1[1]).normalize()];

        let meshType = 0;
        if (vec2.cross(dir, tan0[0]) <= 0)
        {
            meshType |= 1;
            shadowA = tan1[1].mul(Math.sqrt(R2 - r2)).plus(tangentP1[1]);
        }
        else
            shadowA = tan0[0].mul(Math.sqrt(R2 - r2)).plus(tangentP0[0]);
        if (vec2.cross(dir, tan1[0]) <= 0)
        {
            meshType |= 2;
            shadowB = tan0[1].mul(Math.sqrt(R2 - r2)).plus(tangentP0[1]);
        }
        else
            shadowB = tan1[0].mul(Math.sqrt(R2 - r2)).plus(tangentP1[0]);
            
        const OC = plus(shadowA, shadowB).mul(0.5);
        const shadowR = OC.mul(R2 / OC.magnitudeSqr);

        switch (meshType)
        {
            case 0:
                this.shadowMesh.vertices[vertOffset + 0].vert.set(p0);
                this.shadowMesh.vertices[vertOffset + 1].vert.set(p1);
                this.shadowMesh.vertices[vertOffset + 2].vert.set(shadowB);
                this.shadowMesh.vertices[vertOffset + 3].vert.set(shadowR);
                this.shadowMesh.vertices[vertOffset + 4].vert.set(shadowA);
                this.shadowMesh.vertices[vertOffset + 0].p0.set(p0);
                this.shadowMesh.vertices[vertOffset + 0].p1.set(p1);
                this.shadowMesh.vertices[vertOffset + 1].p0.set(p0);
                this.shadowMesh.vertices[vertOffset + 1].p1.set(p1);
                this.shadowMesh.vertices[vertOffset + 2].p0.set(p0);
                this.shadowMesh.vertices[vertOffset + 2].p1.set(p1);
                this.shadowMesh.vertices[vertOffset + 3].p0.set(p0);
                this.shadowMesh.vertices[vertOffset + 3].p1.set(p1);
                this.shadowMesh.vertices[vertOffset + 4].p0.set(p0);
                this.shadowMesh.vertices[vertOffset + 4].p1.set(p1);
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
                ]);
                Debug().drawLines([
                    mat4.mulPoint(this.localToWorldMatrix, p0.toVec3()),
                    mat4.mulPoint(this.localToWorldMatrix, p1.toVec3()),
                    mat4.mulPoint(this.localToWorldMatrix, shadowB.toVec3()),
                    mat4.mulPoint(this.localToWorldMatrix, shadowR.toVec3()),
                    mat4.mulPoint(this.localToWorldMatrix, shadowA.toVec3())
                ]);
                return [5, 9];
            case 1: // merge shadowA->p0 & p0->p1
                this.shadowMesh.vertices[vertOffset + 0].vert.set(p1);
                this.shadowMesh.vertices[vertOffset + 1].vert.set(shadowB);
                this.shadowMesh.vertices[vertOffset + 2].vert.set(shadowR);
                this.shadowMesh.vertices[vertOffset + 3].vert.set(shadowA);
                this.shadowMesh.vertices[vertOffset + 0].p0.set(p0);
                this.shadowMesh.vertices[vertOffset + 0].p1.set(p1);
                this.shadowMesh.vertices[vertOffset + 1].p0.set(p0);
                this.shadowMesh.vertices[vertOffset + 1].p1.set(p1);
                this.shadowMesh.vertices[vertOffset + 2].p0.set(p0);
                this.shadowMesh.vertices[vertOffset + 2].p1.set(p1);
                this.shadowMesh.vertices[vertOffset + 3].p0.set(p0);
                this.shadowMesh.vertices[vertOffset + 3].p1.set(p1);
                this.shadowMesh.indices.set([
                    vertOffset + 0,
                    vertOffset + 1,
                    vertOffset + 2,
                    vertOffset + 0,
                    vertOffset + 2,
                    vertOffset + 3,
                ]);
                Debug().drawLines([
                    mat4.mulPoint(this.localToWorldMatrix, p1.toVec3()),
                    mat4.mulPoint(this.localToWorldMatrix, shadowB.toVec3()),
                    mat4.mulPoint(this.localToWorldMatrix, shadowR.toVec3()),
                    mat4.mulPoint(this.localToWorldMatrix, shadowA.toVec3())
                ]);
                return [4, 6];
            case 2: // merge p0->p1 & p1 -> shadowB
                this.shadowMesh.vertices[vertOffset + 0].vert.set(p0);
                this.shadowMesh.vertices[vertOffset + 1].vert.set(shadowB);
                this.shadowMesh.vertices[vertOffset + 2].vert.set(shadowR);
                this.shadowMesh.vertices[vertOffset + 3].vert.set(shadowA);
                this.shadowMesh.vertices[vertOffset + 0].p0.set(p0);
                this.shadowMesh.vertices[vertOffset + 0].p1.set(p1);
                this.shadowMesh.vertices[vertOffset + 1].p0.set(p0);
                this.shadowMesh.vertices[vertOffset + 1].p1.set(p1);
                this.shadowMesh.vertices[vertOffset + 2].p0.set(p0);
                this.shadowMesh.vertices[vertOffset + 2].p1.set(p1);
                this.shadowMesh.vertices[vertOffset + 3].p0.set(p0);
                this.shadowMesh.vertices[vertOffset + 3].p1.set(p1);
                this.shadowMesh.indices.set([
                    vertOffset + 0,
                    vertOffset + 1,
                    vertOffset + 2,
                    vertOffset + 0,
                    vertOffset + 2,
                    vertOffset + 3,
                ]);
                Debug().drawLines([
                    mat4.mulPoint(this.localToWorldMatrix, p0.toVec3()),
                    mat4.mulPoint(this.localToWorldMatrix, shadowB.toVec3()),
                    mat4.mulPoint(this.localToWorldMatrix, shadowR.toVec3()),
                    mat4.mulPoint(this.localToWorldMatrix, shadowA.toVec3())
                ]);
                return [4, 6];
            case 3: // cross
                this.shadowMesh.vertices[vertOffset + 0].vert.set(p1);
                this.shadowMesh.vertices[vertOffset + 1].vert.set(p0);
                this.shadowMesh.vertices[vertOffset + 2].vert.set(shadowB);
                this.shadowMesh.vertices[vertOffset + 3].vert.set(shadowR);
                this.shadowMesh.vertices[vertOffset + 4].vert.set(shadowA);
                this.shadowMesh.vertices[vertOffset + 0].p0.set(p0);
                this.shadowMesh.vertices[vertOffset + 0].p1.set(p1);
                this.shadowMesh.vertices[vertOffset + 1].p0.set(p0);
                this.shadowMesh.vertices[vertOffset + 1].p1.set(p1);
                this.shadowMesh.vertices[vertOffset + 2].p0.set(p0);
                this.shadowMesh.vertices[vertOffset + 2].p1.set(p1);
                this.shadowMesh.vertices[vertOffset + 3].p0.set(p0);
                this.shadowMesh.vertices[vertOffset + 3].p1.set(p1);
                this.shadowMesh.vertices[vertOffset + 4].p0.set(p0);
                this.shadowMesh.vertices[vertOffset + 4].p1.set(p1);
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
                ]);
                Debug().drawLines([
                    mat4.mulPoint(this.localToWorldMatrix, p1.toVec3()),
                    mat4.mulPoint(this.localToWorldMatrix, p0.toVec3()),
                    mat4.mulPoint(this.localToWorldMatrix, shadowB.toVec3()),
                    mat4.mulPoint(this.localToWorldMatrix, shadowR.toVec3()),
                    mat4.mulPoint(this.localToWorldMatrix, shadowA.toVec3())
                ]);
                return [5, 9];
        }
        return [0, 0];
    }

    // Ref: https://en.wikipedia.org/wiki/Tangent_lines_to_circles#With_analytic_geometry
    private circleTangentThroughPoint(point: Readonly<vec2>, radius: number): [vec2, vec2]
    {
        const r2 = radius * radius;
        const d2 = point.magnitudeSqr;
        const t = vec2(-point.y, point.x).mul(radius / d2 * Math.sqrt(d2 - r2));
        const p1 = mul(point, r2 / d2).plus(t);
        const p2 = mul(point, r2 / d2).minus(t);
        return [p1, p2];
    }

}
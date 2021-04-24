"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Light2D = exports.Shadow2DVertStruct = exports.ShadowType = void 0;
const zogra_renderer_1 = require("zogra-renderer");
const entity_1 = require("../../engine/entity");
const tilemap_collider_1 = require("../physics/tilemap-collider");
const materials_1 = require("./materials");
var ShadowType;
(function (ShadowType) {
    ShadowType["Soft"] = "soft";
    ShadowType["Hard"] = "hard";
})(ShadowType = exports.ShadowType || (exports.ShadowType = {}));
;
exports.Shadow2DVertStruct = zogra_renderer_1.VertexStruct(Object.assign(Object.assign({}, zogra_renderer_1.DefaultVertexData), { p0: "vec2", p1: "vec2" }));
class Light2D extends entity_1.Entity {
    constructor() {
        super();
        this.shadowType = ShadowType.Hard;
        this.volumnRadius = 1;
        this.lightRange = 10;
        this.lightColor = zogra_renderer_1.Color.white;
        this.intensity = 1;
        /** In range [-1..1] */
        this.attenuation = 0;
        this.shadowMesh = new zogra_renderer_1.Mesh(exports.Shadow2DVertStruct);
        this.shadowMat = new materials_1.Shadow2DMaterial();
        this.__tempVectors = Array.from(new Array(32)).map(() => zogra_renderer_1.vec2.zero());
        this.shadowMesh.resize(50, 90);
    }
    getShadowMap(context, data) {
        if (!this.shadowMap)
            this.shadowMap = new zogra_renderer_1.RenderTexture(context.renderer.canvasSize.x, context.renderer.canvasSize.y, false, zogra_renderer_1.TextureFormat.R8, zogra_renderer_1.FilterMode.Linear);
        this.updateShadowMesh(context);
        context.renderer.setRenderTarget(this.shadowMap);
        context.renderer.clear(zogra_renderer_1.Color.black);
        this.shadowMat.lightPos.set(this.position);
        this.shadowMat.lightRange = this.lightRange;
        this.shadowMat.volumnSize = this.volumnRadius;
        context.renderer.drawMesh(this.shadowMesh, this.localToWorldMatrix, this.shadowMat);
        // context.renderer.blit(this.shadowMap, RenderTarget.CanvasTarget);
        return this.shadowMap;
    }
    updateShadowMesh(context) {
        this.shadowMesh.indices.fill(0);
        const bound = [zogra_renderer_1.vec2(-this.lightRange).plus(this.position.toVec2()), zogra_renderer_1.vec2(this.lightRange).plus(this.position.toVec2())];
        const colliderToLight = zogra_renderer_1.mat4.identity();
        let vertOfset = 0;
        let indexOffset = 0;
        for (const collider of context.scene.physics.__getColliders()) {
            if (collider instanceof tilemap_collider_1.TilemapCollider) {
                const polygons = collider.getPolygons(...bound);
                if (!polygons)
                    continue;
                colliderToLight.set(collider.tilemap.localToWorldMatrix);
                zogra_renderer_1.mat4.mul(colliderToLight, colliderToLight, this.worldToLocalMatrix);
                for (const polygon of polygons) {
                    for (let i = 0; i < polygon.points.length; i++) {
                        const [verts, indices] = this.appendLineShadow(polygon.points[i], polygon.points[(i + 1) % polygon.points.length], colliderToLight, vertOfset, indexOffset);
                        vertOfset += verts;
                        indexOffset += indices;
                    }
                }
            }
        }
        // this.appendLineShadow(vec2(1, 0), vec2(0, 0), this.worldToLocalMatrix, 0, 0);
        this.shadowMesh.update();
    }
    // https://www.geogebra.org/m/keskajgx
    appendLineShadow(pointA, pointB, objToLight, vertOffset, indexOffset) {
        let temp = 0;
        if (this.shadowMesh.vertices.length <= vertOffset + 5 || this.shadowMesh.indices.length <= indexOffset + 9) {
            this.shadowMesh.resize(this.shadowMesh.vertices.length * 2, this.shadowMesh.indices.length * 2, true);
        }
        const r2 = this.volumnRadius * this.volumnRadius;
        const R2 = this.lightRange * this.lightRange;
        const p0 = zogra_renderer_1.mat4.mulPoint2(this.__tempVectors[temp++], objToLight, pointA);
        const p1 = zogra_renderer_1.mat4.mulPoint2(this.__tempVectors[temp++], objToLight, pointB);
        zogra_renderer_1.vec2.set(this.shadowMesh.vertices[vertOffset + 0].vert, p0);
        zogra_renderer_1.vec2.set(this.shadowMesh.vertices[vertOffset + 1].vert, p1);
        const dir = zogra_renderer_1.vec2.minus(this.__tempVectors[temp++], p1, p0).normalize();
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
            zogra_renderer_1.vec2.minus(this.__tempVectors[temp++], p0, tangentP0[0]).normalize(),
            zogra_renderer_1.vec2.minus(this.__tempVectors[temp++], p0, tangentP0[1]).normalize()
        ];
        const tan1 = [
            zogra_renderer_1.vec2.minus(this.__tempVectors[temp++], p1, tangentP1[0]).normalize(),
            zogra_renderer_1.vec2.minus(this.__tempVectors[temp++], p1, tangentP1[1]).normalize()
        ];
        let meshType = 0;
        if (zogra_renderer_1.vec2.cross(dir, tan0[0]) <= 0) {
            meshType |= 1;
            shadowA.set(tan1[1].mul(Math.sqrt(R2 - r2)).plus(tangentP1[1]));
        }
        else
            shadowA.set(tan0[0].mul(Math.sqrt(R2 - r2)).plus(tangentP0[0]));
        if (zogra_renderer_1.vec2.cross(dir, tan1[0]) <= 0) {
            meshType |= 2;
            shadowB.set(tan0[1].mul(Math.sqrt(R2 - r2)).plus(tangentP0[1]));
        }
        else
            shadowB.set(tan1[0].mul(Math.sqrt(R2 - r2)).plus(tangentP1[0]));
        // console.log(meshType);
        const OC = zogra_renderer_1.vec2.plus(this.__tempVectors[temp++], shadowA, shadowB).mul(0.5);
        const shadowR = zogra_renderer_1.vec2.mul(this.shadowMesh.vertices[vertOffset + 3].vert, OC, R2 / OC.magnitudeSqr);
        zogra_renderer_1.vec2.set(this.shadowMesh.vertices[vertOffset + 0].p0, p0);
        zogra_renderer_1.vec2.set(this.shadowMesh.vertices[vertOffset + 0].p1, p1);
        zogra_renderer_1.vec2.set(this.shadowMesh.vertices[vertOffset + 1].p0, p0);
        zogra_renderer_1.vec2.set(this.shadowMesh.vertices[vertOffset + 1].p1, p1);
        zogra_renderer_1.vec2.set(this.shadowMesh.vertices[vertOffset + 2].p0, p0);
        zogra_renderer_1.vec2.set(this.shadowMesh.vertices[vertOffset + 2].p1, p1);
        zogra_renderer_1.vec2.set(this.shadowMesh.vertices[vertOffset + 3].p0, p0);
        zogra_renderer_1.vec2.set(this.shadowMesh.vertices[vertOffset + 3].p1, p1);
        zogra_renderer_1.vec2.set(this.shadowMesh.vertices[vertOffset + 4].p0, p0);
        zogra_renderer_1.vec2.set(this.shadowMesh.vertices[vertOffset + 4].p1, p1);
        switch (meshType) {
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
    appendVerts() {
    }
}
exports.Light2D = Light2D;
const _temp1 = zogra_renderer_1.vec2.zero(), _temp2 = zogra_renderer_1.vec2.zero();
// Ref: https://en.wikipedia.org/wiki/Tangent_lines_to_circles#With_analytic_geometry
function circleTangentThroughPoint(point, radius, out = [zogra_renderer_1.vec2.zero(), zogra_renderer_1.vec2.zero()]) {
    const r2 = radius * radius;
    const d2 = point.magnitudeSqr;
    const t = _temp1;
    t.x = -point.y;
    t.y = point.x;
    t.mul(radius / d2 * Math.sqrt(d2 - r2));
    zogra_renderer_1.vec2.mul(_temp2, point, r2 / d2);
    // const t = vec2(-point.y, point.x).mul(radius / d2 * Math.sqrt(d2 - r2));
    out[0].set(_temp2).plus(t);
    out[1].set(_temp2).minus(t);
    return out;
}
//# sourceMappingURL=light-2d.js.map
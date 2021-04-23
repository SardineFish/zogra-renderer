"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Light2D = exports.Shadow2DVertStruct = exports.ShadowType = void 0;
const zogra_renderer_1 = require("zogra-renderer");
const global_1 = require("zogra-renderer/dist/core/global");
const entity_1 = require("../../engine/entity");
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
        /** In range [-1..1] */
        this.attenuation = 0;
        this.shadowMesh = new zogra_renderer_1.Mesh(exports.Shadow2DVertStruct);
        this.shadowMat = new materials_1.Shadow2DMaterial();
        this.shadowMesh.resize(100, 100);
    }
    getShadowMap(context, data) {
        if (!this.shadowMap)
            this.shadowMap = new zogra_renderer_1.RenderTexture(context.renderer.canvasSize.x, context.renderer.canvasSize.y, false, zogra_renderer_1.TextureFormat.R8, zogra_renderer_1.FilterMode.Linear);
        this.updateShadowMesh();
        context.renderer.setRenderTarget(this.shadowMap);
        context.renderer.clear(zogra_renderer_1.Color.black);
        this.shadowMat.lightPos.set(this.position);
        this.shadowMat.lightRange = this.lightRange;
        this.shadowMat.volumnSize = this.volumnRadius;
        context.renderer.drawMesh(this.shadowMesh, this.localToWorldMatrix, this.shadowMat);
        context.renderer.blit(this.shadowMap, zogra_renderer_1.RenderTarget.CanvasTarget);
        return this.shadowMap;
    }
    updateShadowMesh() {
        this.appendLineShadow(zogra_renderer_1.vec2(1, 0), zogra_renderer_1.vec2(0, 0), this.worldToLocalMatrix, 0, 0);
        this.shadowMesh.update();
    }
    // https://www.geogebra.org/m/keskajgx
    appendLineShadow(pointA, pointB, objToLight, vertOffset, indexOffset) {
        const r2 = this.volumnRadius * this.volumnRadius;
        const R2 = this.lightRange * this.lightRange;
        const p0 = zogra_renderer_1.mat4.mulPoint2(objToLight, pointA);
        const p1 = zogra_renderer_1.mat4.mulPoint2(objToLight, pointB);
        const dir = zogra_renderer_1.minus(p1, p0).normalize();
        global_1.Debug().drawCircle(this.position, this.volumnRadius);
        global_1.Debug().drawCircle(this.position, this.lightRange, zogra_renderer_1.Color.yellow);
        let tangentP0 = this.circleTangentThroughPoint(p0, this.volumnRadius);
        let tangentP1 = this.circleTangentThroughPoint(p1, this.volumnRadius);
        tangentP0 = [tangentP0[1], tangentP0[0]];
        let shadowA;
        let shadowB;
        const tan0 = [zogra_renderer_1.minus(p0, tangentP0[0]).normalize(), zogra_renderer_1.minus(p0, tangentP0[1]).normalize()];
        const tan1 = [zogra_renderer_1.minus(p1, tangentP1[0]).normalize(), zogra_renderer_1.minus(p1, tangentP1[1]).normalize()];
        let meshType = 0;
        if (zogra_renderer_1.vec2.cross(dir, tan0[0]) <= 0) {
            meshType |= 1;
            shadowA = tan1[1].mul(Math.sqrt(R2 - r2)).plus(tangentP1[1]);
        }
        else
            shadowA = tan0[0].mul(Math.sqrt(R2 - r2)).plus(tangentP0[0]);
        if (zogra_renderer_1.vec2.cross(dir, tan1[0]) <= 0) {
            meshType |= 2;
            shadowB = tan0[1].mul(Math.sqrt(R2 - r2)).plus(tangentP0[1]);
        }
        else
            shadowB = tan1[0].mul(Math.sqrt(R2 - r2)).plus(tangentP1[0]);
        const OC = zogra_renderer_1.plus(shadowA, shadowB).mul(0.5);
        const shadowR = OC.mul(R2 / OC.magnitudeSqr);
        switch (meshType) {
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
                global_1.Debug().drawLines([
                    zogra_renderer_1.mat4.mulPoint(this.localToWorldMatrix, p0.toVec3()),
                    zogra_renderer_1.mat4.mulPoint(this.localToWorldMatrix, p1.toVec3()),
                    zogra_renderer_1.mat4.mulPoint(this.localToWorldMatrix, shadowB.toVec3()),
                    zogra_renderer_1.mat4.mulPoint(this.localToWorldMatrix, shadowR.toVec3()),
                    zogra_renderer_1.mat4.mulPoint(this.localToWorldMatrix, shadowA.toVec3())
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
                global_1.Debug().drawLines([
                    zogra_renderer_1.mat4.mulPoint(this.localToWorldMatrix, p1.toVec3()),
                    zogra_renderer_1.mat4.mulPoint(this.localToWorldMatrix, shadowB.toVec3()),
                    zogra_renderer_1.mat4.mulPoint(this.localToWorldMatrix, shadowR.toVec3()),
                    zogra_renderer_1.mat4.mulPoint(this.localToWorldMatrix, shadowA.toVec3())
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
                global_1.Debug().drawLines([
                    zogra_renderer_1.mat4.mulPoint(this.localToWorldMatrix, p0.toVec3()),
                    zogra_renderer_1.mat4.mulPoint(this.localToWorldMatrix, shadowB.toVec3()),
                    zogra_renderer_1.mat4.mulPoint(this.localToWorldMatrix, shadowR.toVec3()),
                    zogra_renderer_1.mat4.mulPoint(this.localToWorldMatrix, shadowA.toVec3())
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
                global_1.Debug().drawLines([
                    zogra_renderer_1.mat4.mulPoint(this.localToWorldMatrix, p1.toVec3()),
                    zogra_renderer_1.mat4.mulPoint(this.localToWorldMatrix, p0.toVec3()),
                    zogra_renderer_1.mat4.mulPoint(this.localToWorldMatrix, shadowB.toVec3()),
                    zogra_renderer_1.mat4.mulPoint(this.localToWorldMatrix, shadowR.toVec3()),
                    zogra_renderer_1.mat4.mulPoint(this.localToWorldMatrix, shadowA.toVec3())
                ]);
                return [5, 9];
        }
        return [0, 0];
    }
    // Ref: https://en.wikipedia.org/wiki/Tangent_lines_to_circles#With_analytic_geometry
    circleTangentThroughPoint(point, radius) {
        const r2 = radius * radius;
        const d2 = point.magnitudeSqr;
        const t = zogra_renderer_1.vec2(-point.y, point.x).mul(radius / d2 * Math.sqrt(d2 - r2));
        const p1 = zogra_renderer_1.mul(point, r2 / d2).plus(t);
        const p2 = zogra_renderer_1.mul(point, r2 / d2).minus(t);
        return [p1, p2];
    }
}
exports.Light2D = Light2D;
//# sourceMappingURL=light-2d.js.map
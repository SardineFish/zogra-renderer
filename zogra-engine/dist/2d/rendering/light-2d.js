var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Color, Culling, DefaultVertexData, FilterMode, mat4, MaterialFromShader, Mesh, RenderTexture, Shader, shaderProp, TextureFormat, vec2, VertexStruct, Blending, TextureResizing } from "zogra-renderer";
import { ShaderSource } from "../../assets";
import { Entity } from "../../engine/entity";
import { TilemapCollider } from "../physics/tilemap-collider";
export var ShadowType;
(function (ShadowType) {
    ShadowType["Soft"] = "soft";
    ShadowType["Hard"] = "hard";
})(ShadowType || (ShadowType = {}));
;
export const Shadow2DVertStruct = VertexStruct(Object.assign(Object.assign({}, DefaultVertexData), { p0: "vec2", p1: "vec2" }));
export class Light2D extends Entity {
    constructor(shadowType = false) {
        super();
        this.shadowType = false;
        this.volumnRadius = 1;
        this.lightRange = 10;
        this.lightColor = Color.white;
        this.intensity = 1;
        /** In range [-1..1] */
        this.attenuation = 0;
        this.shadowMesh = null;
        this.shadowMat = new Shadow2DMaterial();
        this.__tempVectors = Array.from(new Array(32)).map(() => vec2.zero());
        this.shadowType = shadowType;
        if (shadowType === ShadowType.Soft)
            this.shadowMesh = new Mesh(Shadow2DVertStruct);
        if (this.shadowMesh)
            this.shadowMesh.resize(5000, 9000);
    }
    getShadowMap(context, data) {
        if (!this.shadowMesh)
            this.shadowMesh = new Mesh(Shadow2DVertStruct);
        if (this.shadowMesh.vertices.length <= 0)
            this.shadowMesh.resize(50, 90);
        // if (this.shadowType === false)
        //     return null;
        if (!this.shadowMap)
            this.shadowMap = new RenderTexture(context.renderer.canvasSize.x, context.renderer.canvasSize.y, false, TextureFormat.R8, FilterMode.Linear);
        if (!this.shadowMap.size.equals(data.cameraOutput.size))
            this.shadowMap.resize(data.cameraOutput.width, data.cameraOutput.height, TextureResizing.Discard);
        this.updateShadowMesh(context, data);
        context.renderer.setFramebuffer(this.shadowMap);
        context.renderer.clear(Color.black);
        this.shadowMat.lightPos.set(this.position);
        this.shadowMat.lightRange = this.lightRange;
        this.shadowMat.volumnSize = this.volumnRadius;
        context.renderer.drawMesh(this.shadowMesh, this.localToWorldMatrix, this.shadowMat);
        // context.renderer.blit(this.shadowMap, FrameBuffer.CanvasBuffer);
        return this.shadowMap;
    }
    updateShadowMesh(context, data) {
        this.shadowMesh.indices.fill(0);
        const bound = [vec2(-this.lightRange).plus(this.position.toVec2()), vec2(this.lightRange).plus(this.position.toVec2())];
        const colliderToLight = mat4.identity();
        let vertOfset = 0;
        let indexOffset = 0;
        for (const collider of data.scene.physics.__getColliders()) {
            if (collider instanceof TilemapCollider) {
                const polygons = collider.getPolygons(...bound);
                if (!polygons)
                    continue;
                colliderToLight.set(collider.tilemap.localToWorldMatrix);
                mat4.mul(colliderToLight, colliderToLight, this.worldToLocalMatrix);
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
        if (vec2.cross(dir, tan0[0]) <= 0) {
            meshType |= 1;
            shadowA.set(tan1[1].mul(Math.sqrt(R2 - r2)).plus(tangentP1[1]));
        }
        else
            shadowA.set(tan0[0].mul(Math.sqrt(R2 - r2)).plus(tangentP0[0]));
        if (vec2.cross(dir, tan1[0]) <= 0) {
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
    destroy() {
        var _a, _b;
        if (this.destroyed)
            return;
        super.destroy();
        (_a = this.shadowMesh) === null || _a === void 0 ? void 0 : _a.destroy();
        (_b = this.shadowMap) === null || _b === void 0 ? void 0 : _b.destroy();
    }
}
const _temp1 = vec2.zero(), _temp2 = vec2.zero();
// Ref: https://en.wikipedia.org/wiki/Tangent_lines_to_circles#With_analytic_geometry
function circleTangentThroughPoint(point, radius, out = [vec2.zero(), vec2.zero()]) {
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
export class Shadow2DMaterial extends MaterialFromShader(new Shader(...ShaderSource.shadow2D, {
    vertexStructure: Shadow2DVertStruct,
    attributes: {
        p0: "aP0",
        p1: "aP1",
    },
    cull: Culling.Back,
    blend: [Blending.One, Blending.One]
})) {
    constructor() {
        super(...arguments);
        this.lightPos = vec2.zero();
        this.volumnSize = 1;
        this.lightRange = 10;
    }
}
__decorate([
    shaderProp("uLightPos", "vec2")
], Shadow2DMaterial.prototype, "lightPos", void 0);
__decorate([
    shaderProp("uVolumnSize", "float")
], Shadow2DMaterial.prototype, "volumnSize", void 0);
__decorate([
    shaderProp("uLightRange", "float")
], Shadow2DMaterial.prototype, "lightRange", void 0);
//# sourceMappingURL=light-2d.js.map
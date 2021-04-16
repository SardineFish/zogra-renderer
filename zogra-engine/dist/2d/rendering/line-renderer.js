"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LineRenderer = void 0;
const zogra_renderer_1 = require("zogra-renderer");
const render_object_1 = require("../../engine/render-object");
class LineRenderer extends render_object_1.RenderObject {
    constructor() {
        super(...arguments);
        this.mesh = new zogra_renderer_1.Mesh();
        this.dirty = false;
        this.points = [];
    }
    updateMesh() {
        this.dirty = true;
    }
    render(context, data) {
        this.rebuildMesh();
        context.renderer.drawMesh(this.mesh, zogra_renderer_1.mat4.identity(), this.materials[0]);
    }
    rebuildMesh() {
        if (!this.dirty)
            return;
        const lineCount = this.points.length - 1;
        if (lineCount < 1)
            this.mesh.resize(this.mesh.vertices.length, 0);
        this.mesh.resize(lineCount * 4, lineCount * 6, false);
        const dir = zogra_renderer_1.vec2.zero();
        const normal = zogra_renderer_1.vec2.zero();
        const p0 = zogra_renderer_1.vec2.zero();
        const p1 = zogra_renderer_1.vec2.zero();
        const p2 = zogra_renderer_1.vec2.zero();
        const p3 = zogra_renderer_1.vec2.zero();
        for (let i = 0; i < this.points.length - 1; i++) {
            const endpointA = this.points[i];
            const endpointB = this.points[i + 1];
            zogra_renderer_1.vec2.minus(dir, endpointB.position, endpointA.position);
            dir.normalize();
            if (dir.isZero)
                continue;
            zogra_renderer_1.vec2.perpendicular(normal, dir);
            if (i > 0) {
                intersectPoints([p0, p1], this.points[i - 1], this.points[i], this.points[i + 1]);
            }
            else {
                // p0 = epA + normal * w
                p0.set(normal).mul(endpointA.width / 2).plus(endpointA.position);
                // p1 = epA - nromal * w
                p1.set(normal).mul(-endpointA.width / 2).plus(endpointA.position);
            }
            if (i < this.points.length - 2) {
                intersectPoints([p2, p3], this.points[i], this.points[i + 1], this.points[i + 2]);
            }
            else {
                p2.set(normal).mul(endpointB.width / 2).plus(endpointB.position);
                p3.set(normal).mul(-endpointB.width / 2).plus(endpointB.position);
            }
            const vertBase = i * 4;
            this.mesh.vertices[vertBase + 0].vert.set(p0);
            this.mesh.vertices[vertBase + 1].vert.set(p1);
            this.mesh.vertices[vertBase + 2].vert.set(p2);
            this.mesh.vertices[vertBase + 3].vert.set(p3);
            this.mesh.vertices[vertBase + 0].color.set(endpointA.color);
            this.mesh.vertices[vertBase + 1].color.set(endpointA.color);
            this.mesh.vertices[vertBase + 2].color.set(endpointB.color);
            this.mesh.vertices[vertBase + 3].color.set(endpointB.color);
            this.mesh.vertices[vertBase + 0].uv.set([0, 1]);
            this.mesh.vertices[vertBase + 1].uv.set([0, 0]);
            this.mesh.vertices[vertBase + 2].uv.set([1, 1]);
            this.mesh.vertices[vertBase + 3].uv.set([1, 0]);
            const indexBase = i * 6;
            this.mesh.indices[indexBase + 0] = vertBase + 0;
            this.mesh.indices[indexBase + 1] = vertBase + 1;
            this.mesh.indices[indexBase + 2] = vertBase + 3;
            this.mesh.indices[indexBase + 3] = vertBase + 0;
            this.mesh.indices[indexBase + 4] = vertBase + 3;
            this.mesh.indices[indexBase + 5] = vertBase + 2;
        }
        this.dirty = false;
    }
}
exports.LineRenderer = LineRenderer;
// See: https://www.geogebra.org/geometry/bhhyyttg
function intersectPoints(out, epA, center, epB) {
    const [dirA, dirB] = out;
    zogra_renderer_1.vec2.minus(dirA, epA.position, center.position).normalize();
    zogra_renderer_1.vec2.minus(dirB, epB.position, center.position).normalize();
    const halfDir = zogra_renderer_1.plus(dirA, dirB).div(2);
    let sinBeta = 0;
    if (zogra_renderer_1.vec2.dot(halfDir, halfDir) <= 1e-7) {
        zogra_renderer_1.vec2.perpendicular(halfDir, dirB);
        sinBeta = 1;
    }
    else if (dirA.isZero) {
        zogra_renderer_1.vec2.perpendicular(halfDir, dirB);
        sinBeta = 1;
    }
    else if (dirB.isZero) {
        zogra_renderer_1.vec2.perpendicular(halfDir, dirA);
        sinBeta = -1;
    }
    else {
        halfDir.normalize();
        sinBeta = Math.sign(zogra_renderer_1.vec2.cross(dirB, dirA)) * Math.sqrt((1 - zogra_renderer_1.dot(dirA, dirB)) / 2);
    }
    const length = center.width / 2 / sinBeta;
    const p0 = dirA.set(halfDir).mul(length).plus(center.position);
    const p1 = dirB.set(halfDir).mul(-length).plus(center.position);
    if (isNaN(p0.x) || isNaN(p0.y) || isNaN(p1.x) || isNaN(p1.y))
        console.log(p0, p1);
    return [p0, p1];
}
//# sourceMappingURL=line-renderer.js.map
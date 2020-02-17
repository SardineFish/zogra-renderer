import { Mesh, Lines, ZograEngine, vec3, quat, plus, MeshBuilder, Color, ZograRenderer, Material, mat4, LineBuilder, cross, dot, minus, mul, ray, Keys, vec4 } from "zogra-renderer";
import { ZograEditor } from "./zogra-editor";
import { debug } from "./debug";


export function initTools(editor: ZograEditor)
{

    return {
        position: positionTool(editor),
        toolSize: toolSize(editor),
    };
}

function toolSize(editor: ZograEditor)
{
    return (pos: vec3) =>
    {
        const matVP = editor.camera.viewProjectionMatrix;
        const matVPInv = mat4.invert(matVP);
        const size = .15;
        const v = mat4.mulVector(editor.camera.localToWorldMatrix, vec3(1, 0, 0));
        let p = mat4.mulVec4(matVP, vec4(pos.x, pos.y, pos.z, 1));
        p.x += size * p.w;
        p = mat4.mulVec4(matVPInv, p);
        return dot(v, minus(vec3(p.x, p.y, p.z), pos));
    };
}

function positionTool(editor: ZograEditor)
{
    const mb = new MeshBuilder();
    const lb = new LineBuilder();
    let [verts, triangles] = cone(vec3(.7, 0, 0), vec3(0, 0, .1), vec3(.3, 0, 0))
    mb.addSubMesh(verts, triangles, [Color.red]);
    [verts, triangles] = cone(vec3(0, .7, 0), vec3(.1, 0, 0), vec3(0, .3, 0));
    mb.addSubMesh(verts, triangles, [Color.green]);
    [verts, triangles] = cone(vec3(0, 0, .7), vec3(0, .1, 0), vec3(0, 0, .3));
    mb.addSubMesh(verts, triangles, [Color.blue]);
    lb.addLine([vec3.zero(), vec3(1, 0, 0)], Color.red);
    lb.addLine([vec3.zero(), vec3(0, 1, 0)], Color.green);
    lb.addLine([vec3.zero(), vec3(0, 0, 1)], Color.blue);
    const mesh = mb.toMesh();
    const lines = lb.toLines();
    const renderer = toolRenderer(editor, mesh, lines);

    let controled = "none" as number | "xz" | "xy" | "yz" | "none";

    return (pos: vec3, rotate: quat, size: number) =>
    {
        renderer(pos, rotate, size);

        const m = mat4.rts(rotate, pos, vec3(size, size, size));
        const view = editor.camera.screenToRay(editor.input.pointerPosition);
        const axis = [
            vec3(1, 0, 0),
            vec3(0, 1, 0),
            vec3(0, 0, 1)
        ];

        for (let i = 0; i < 3; i++)
        {
            const currentAxis = mat4.mulVector(m, axis[i]).normalized;
            const { distance, p1: point, p2 } = linesIntersect(ray(pos, currentAxis), view);
            const len = dot(minus(point, pos), currentAxis);
            if (distance < 0.15 * size && 0 < len && len < size)
            {
                debug.drawLine(point, p2, Color.magenta);
            }
        }

        if (editor.input.getKeyDown(Keys.Mouse0))
        {
            for (let i = 0; i < 3; i++)
            {
                const currentAxis = mat4.mulVector(m, axis[i]).normalized;
                const { distance, p1: point, p2 } = linesIntersect(ray(pos, currentAxis), view);
                const len = dot(minus(point, pos), currentAxis); 
                if (distance < 0.15 * size && 0 < len && len < size)
                {
                    controled = i;
                    break;   
                }
            }

        }
        if (editor.input.getKey(Keys.Mouse0))
        {
            if (typeof (controled) === "number")
            {
                const currentAxis = mat4.mulVector(m, axis[controled]).normalized;
                const prevView = editor.camera.screenToRay(minus(editor.input.pointerPosition, editor.input.pointerDelta));
                const { p1: point } = linesIntersect(ray(pos, currentAxis), view);
                const { p2: prevPoint } = linesIntersect(ray(pos, currentAxis), prevView);
                const delta = mul(currentAxis, dot(minus(point, pos), currentAxis) - dot(minus(prevPoint, pos), currentAxis));
                return plus(pos, delta);
            }
        }
        else
            controled = "none";
        return pos;
    };
}

function scalingTool(editor: ZograEditor)
{
    
}

function cone(pos: vec3, tangent: vec3, normal: vec3): [vec3[], number[]]
{
    const N = 12;
    const circleVerts = [] as vec3[];
    const topVert = plus(pos, normal);
    for (let i = 0; i < N; i++)
    {
        const rotate = quat.axis(normal.normalize(), 2 * Math.PI / N * i);
        circleVerts.push(plus(quat.rotate(rotate, tangent), pos));
    }
    const verts = [...circleVerts, topVert];
    const triangles = [] as number[];
    for (let i = 0; i < N; i++)
    {
        triangles.push(i, N, (i + 1) % N);
        if (i > 1 && i < N - 1)
        {
            triangles.push(0, i, i + 1);
        }
    }
    return [verts, triangles];
}

function toolRenderer(editor: ZograEditor, mesh: Mesh, lines: Lines)
{
    const mat = new Material(editor.assets.shaders.tools);
    mat.setProp("uColor", "color", Color.white);
    return (pos: vec3, rotate: quat, size: number) =>
    {
        const m = mat4.rts(rotate, pos, vec3(size, size, size));
        editor.engine.renderer.drawMesh(mesh, m, mat);
        editor.engine.renderer.drawLines(lines, m, mat);

        // const axis = ray(pos, quat.rotate(rotate, vec3(1, 0, 0)));
        // const view = editor.camera.screenToRay(editor.input.pointerPosition);

        // const [distance, point, hasNearestPoint] = linesIntersect(axis,view);
        /*if (hasNearestPoint)
        {
            const n = cross(mat4.mulVector(editor.camera.localToWorldMatrix, vec3(0, 0, -1)), quat.rotate(rotate, vec3(1, 0, 0))).normalized;
            editor.gl.drawLine(pos, plus(pos, mul(n, distance)));
        }*/
    };
}

interface NearestPoint
{
    invalid: boolean;
    p1: vec3;
    p2: vec3;
    distance: number;
}

function linesIntersect(a: ray, b: ray): NearestPoint
{
    const axisZ = cross(b.direction, a.direction).normalized;

    let distance = 0;

    if (axisZ.magnitude == 0 || axisZ.magnitude == NaN)
    {
        const v = cross(minus(b.origin, a.origin), a.direction).normalized;
        if (v.magnitude == 0 || v.magnitude == NaN)
        {
            return {
                invalid: false,
                p1: vec3.zero(),
                p2: vec3.zero(),
                distance: 0
            };
        }
        const u = cross(a.direction, v).normalized;
        distance = dot(minus(b.origin, a.origin), u);
        return {
            invalid: false,
            p1: vec3.zero(),
            p2: vec3.zero(),
            distance: Math.abs(distance)
        };
    }
    else
    {
        distance = dot(axisZ, minus(b.origin, a.origin));
    }
    const axisX = a.direction.normalize();
    const axisY = cross(axisZ, axisX).normalized;
    let m = mat4.transpose(mat4([
        ...axisX, 0,
        ...axisY, 0,
        ...axisZ, 0,
        0, 0, 0, 1
    ]));

    // debug.drawRay(a.origin, axisX, 5, Color.red);
    // debug.drawRay(a.origin, axisY, 5, Color.green);
    // debug.drawRay(a.origin, axisZ, 5, Color.blue);

    m = mat4.mul(m, m, mat4.translate(a.origin.negative));
    const castedB = ray(
        mat4.mulPoint(m, b.origin),
        mat4.mulVector(m, b.direction)
    );
    const tb = -castedB.origin.y / castedB.direction.y;
    const ta = castedB.origin.x + castedB.direction.x * tb;
    //const distance = dot(minus(b.origin, a.origin), axisZ);
    const point = plus(a.origin, mul(a.direction, ta));
    //debug.drawRay(point, axisZ, distance, Color.magenta);

    return {
        invalid: true,
        p1: point,
        p2: plus(point, mul(axisZ, distance)),
        distance: Math.abs(distance)
    };
}
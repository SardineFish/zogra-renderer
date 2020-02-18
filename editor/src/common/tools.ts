import { Mesh, Lines, ZograEngine, vec3, quat, plus, MeshBuilder, Color, ZograRenderer, Material, mat4, LineBuilder, cross, dot, minus, mul, ray, Keys, vec4, rgb } from "zogra-renderer";
import { ZograEditor } from "./zogra-editor";
import { debug } from "./debug";


export function initTools(editor: ZograEditor)
{
    editor.engine.on("update", (time) =>
    {
        if (editor.input.getKey(Keys.Mouse0) || editor.input.getKey(Keys.Mouse2))
            return;
        if (editor.input.getKeyDown(Keys.W))
            editor.tools.current.tool = "position";
        else if (editor.input.getKeyDown(Keys.E))
            editor.tools.current.tool = "rotation";
        else if (editor.input.getKeyDown(Keys.R))
            editor.tools.current.tool = "scaling";
        editor.eventEmitter.emit("toolchange", editor);
    }); 
    return {
        position: positionTool(editor),
        scaling: scalingTool(editor),
        rotation: rotationTool(editor),
        toolSize: toolSize(editor),
        current: <EditorToolsState>{
            tool: "none",
            pivot: "pivot",
            space: "world"
        },
    };
}

export interface EditorToolsState
{
    tool: "none" | "position" | "rotation" | "scaling";
    pivot: "center" | "pivot";
    space: "local" | "world";
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
    const cube = editor.engine.renderer.assets.meshes.cube;
    const axis = [
        vec3(1, 0, 0),
        vec3(0, 1, 0),
        vec3(0, 0, 1)
    ];
    const colors = [
        Color.red,
        Color.green,
        Color.blue
    ];
    const renderer = editor.engine.renderer;
    const mat = new Material(editor.assets.shaders.tools);
    mat.setProp("uColor", "color", Color.white);
    let controled = -1;
    let baseValue = vec3(0);
    let controlStretch = 1;

    return (center: vec3, rotation: quat, value: vec3, size: number) =>
    {
        const m = mat4.rts(rotation, center, vec3(size, size, size));
        const view = editor.camera.screenToRay(editor.input.pointerPosition);
        let delta = 0;

        let output = value;

        if (controled >= 0 && editor.input.getKey(Keys.Mouse0))
        {
            const currentAxis = mat4.mulVector(m, axis[controled]).normalized;
            const prevView = editor.camera.screenToRay(minus(editor.input.pointerPosition, editor.input.pointerDelta));
            const { p1: point } = linesIntersect(ray(center, currentAxis), view);
            const { p2: prevPoint } = linesIntersect(ray(center, currentAxis), prevView);
            delta = dot(minus(point, center), currentAxis) - dot(minus(prevPoint, center), currentAxis)
            output = plus(value, mul(mul(axis[controled], delta * 0.3), baseValue));
        }
        else
            controled = -1;

        for (let i = 0; i < 3; i++)
        {
            const currentAxis = mat4.mulVector(m, axis[i]);

            const { distance, p1: point, p2 } = linesIntersect(ray(center, currentAxis), view);
            const len = dot(minus(point, center), currentAxis.normalized);
            let color = colors[i];
            let axisLength = 1;
            if (distance < 0.15 * size && 0 < len && len < size)
            {
                debug.drawLine(point, p2, Color.magenta);
                color = mul(colors[i], rgb(.8, .8, .8)) as Color;

                if (controled < 0 && editor.input.getKeyDown(Keys.Mouse0))
                {
                    controled = i;
                    baseValue = value;
                }
            }

            if (controled == i)
            {
                color = mul(colors[i], rgb(.6, .6, .6)) as Color;
                controlStretch = delta == 0 ? controlStretch : Math.sign(delta) * .2 + 1;
                axisLength = controlStretch;
            }

            mat.setProp("uColor", "color", color);
            renderer.drawMesh(cube, mat4.mul(m, mat4.rts(quat.identity(), mul(axis[i], axisLength - 0.05), vec3(.1))), mat);
            editor.gl.drawLine(center, plus(mul(currentAxis, axisLength), center), color );
        }

        return output;
    };
}

function rotationTool(editor: ZograEditor)
{
    const N = 72;
    const lb = new LineBuilder();
    const verts = [] as vec3[];
    for (let i = 0; i < N; i++)
    {
        const rad = 2 * Math.PI * i / N;
        verts[i] = vec3(0, Math.cos(rad), Math.sin(rad));
    }
    for (let i = 0; i < N; i++)
        lb.addLine([verts[i], verts[(i + 1) % N]], Color.white);
    const circle = lb.toLines();
    const axis = [
        vec3(1, 0, 0),
        vec3(0, 1, 0),
        vec3(0, 0, 1)
    ];
    const rotAxis = [
        vec3(1, 0, 0),
        vec3(0, 0, 1),
        vec3(0, 1, 0)
    ];
    const colors = [
        Color.red,
        Color.green,
        Color.blue
    ];
    const mat = new Material(editor.assets.shaders.rotationTool);
    const renderer = editor.engine.renderer;

    let controled = -1;
    let tangentLine = ray(vec3(0), vec3(1));
    return (center: vec3, rotation: quat, value: quat, size: number) =>
    {
        const view = editor.camera.screenToRay(editor.input.pointerPosition);
        const m = mat4.rts(rotation, center, vec3(size));
        const mInv = mat4.invert(mat4.rts(rotation, center, vec3(1)));
        const viewObj = ray(mat4.mulPoint(mInv, view.origin), mat4.mulVector(mInv, view.direction));
        for (let i = 0; i < 3; i++)
        {
        }

        for (let i = 0; i < 3; i++)
        {
            const t = (-dot(viewObj.origin, viewObj.direction) - .5 * Math.sqrt(4 * dot(viewObj.origin, viewObj.direction) ** 2 - 4 * (viewObj.direction.magnitude) ** 2 * ((viewObj.origin.magnitude) ** 2 - size ** 2))) / (viewObj.direction.magnitude ** 2);
            const point = plus(viewObj.origin, mul(viewObj.direction, t));
            let sphereDir = minus(point, vec3(0)).normalized;
            const pointWorld = plus(view.origin, mul(view.direction, t));

            if (Math.abs(dot(sphereDir, axis[i])) < 0.1)
            {
            
                if (editor.input.getKeyDown(Keys.Mouse0))
                {
                    sphereDir = sphereDir.mul(minus(vec3(1), axis[i])).normalized;
                    const tangent = cross(axis[i], sphereDir);
                    const tangentWorld = mat4.mulVector(m, tangent);
                    const pointWorld = mat4.mulPoint(m, mul(sphereDir, 1));

                    tangentLine = ray(pointWorld, tangentWorld);
                    controled = i;
                }
            }

        }
        for (let i = 0; i < 3; i++)
        {
            let color = colors[i];
            if (controled === i)
            {
                color = mul(color, rgb(.8, .8, .8)) as Color;
                debug.drawRay(tangentLine.origin, tangentLine.direction, size, Color.yellow);
                debug.drawRay(tangentLine.origin, tangentLine.direction, -size, Color.yellow);
            }
            const transform = mat4.rotate(m, rotAxis[i], Math.PI / 2);
            mat.setProp("uColor", "color", color);
            mat.setProp("uCenter", "vec3", center);
            mat.setProp("uZDir", "vec3", mat4.mulVector(editor.camera.localToWorldMatrix, vec3(0, 0, -1)));
            renderer.drawLines(circle, transform, mat);
        }
        
        if (controled >= 0 && editor.input.getKey(Keys.Mouse0))
        {
            const currentAxis = mat4.mulVector(m, axis[controled]).normalized;
            const prevView = editor.camera.screenToRay(minus(editor.input.pointerPosition, editor.input.pointerDelta));
            const { p1: point, p2 } = linesIntersect(tangentLine, view);
            const { p1: prevPoint } = linesIntersect(tangentLine, prevView);
            debug.drawLine(point, p2, Color.magenta);
            const delta = dot(minus(point, prevPoint), tangentLine.direction);
            console.log(delta);
            return quat.mul(quat.axis(currentAxis, delta * 0.5), value);
        }
        else
            controled = -1;
        
        return value;
    };
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
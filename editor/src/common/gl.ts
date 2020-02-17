import { ZograRenderer, vec3, Lines, Color, mat4, Material } from "zogra-renderer";
import { ZograEditor } from "./zogra-editor";

export type EditorGLUtils = ReturnType<typeof initGLUtils>;
export function initGLUtils(editor: ZograEditor)
{
    return {
        drawLine: drawLine(editor)
    };
}

function drawLine(editor: ZograEditor)
{
    const m = mat4.identity();
    const mat = new Material(editor.assets.shaders.color);
    mat.setProp("uColor", "color", Color.white);
    return (p1: vec3, p2: vec3, color = Color.white) =>
    {
        const lines = new Lines();
        lines.verts = [p1, p2];
        lines.colors = [color, color];
        lines.lines = [0, 1];
        lines.update();
        editor.engine.renderer.drawLines(lines, m, mat);
        lines.destroy();
    }
} 
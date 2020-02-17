import { vec3, Color, plus, mul } from "zogra-renderer";
import { ZograEditor } from "./zogra-editor";

export const debug = {
    drawLine(p1: vec3, p2: vec3, color = Color.white) { },
    drawRay(origin: vec3, direction: vec3, length = 1, color = Color.white){ }
}

export function initDebug(editor: ZograEditor)
{
    debug.drawLine = (p1: vec3, p2: vec3, color = Color.white) =>
    {
        editor.gl.drawLine(p1, p2, color);  
    };
    debug.drawRay = (origin: vec3, direction: vec3, length = direction.magnitude, color = Color.white) =>
    {
        editor.gl.drawLine(origin, plus(origin, mul(direction, length)), color);
    }
}
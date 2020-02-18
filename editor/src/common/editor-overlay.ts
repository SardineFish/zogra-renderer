import { ZograEditor } from "./zogra-editor";
import { mat4 } from "../../../dist";

export function drawEditorOverlay(editor: ZograEditor)
{
    const selected = editor.selectedEntities[0];
    if (!selected)
        return;
    const m = mat4.identity();
    if (editor.tools.current.space === "local")
        mat4.mul(m, m, selected.localToWorldMatrix);
    const mInv = mat4.invert(m);
    switch (editor.tools.current.tool)
    {
        case "position":
            {
                let pos = mat4.mulPoint(m, selected.localPosition);
                pos = editor.tools.position(pos, mat4.getRotation(m), editor.tools.toolSize(pos));
                selected.localPosition = mat4.mulPoint(mInv, pos);
                break;
            }
        case "rotation":
            {
                const pos = mat4.mulPoint(m, selected.localPosition);
                const rot = mat4.getRotation(m);
                selected.localRotation = editor.tools.rotation(pos, rot, selected.localRotation, editor.tools.toolSize(pos));
                break;
            }
        case "scaling":
            {
                const pos = mat4.mulPoint(m, selected.localPosition);
                selected.localScaling = editor.tools.scaling(pos, selected.rotation, selected.localScaling, editor.tools.toolSize(pos));
                break;
            }
    }
}
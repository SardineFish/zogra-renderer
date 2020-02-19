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
                pos = editor.tools.position(selected.position, mat4.getRotation(m), editor.tools.toolSize(selected.position));
                selected.position = pos;// mat4.mulPoint(mInv, pos);
                editor.reloadPropertiesEditor(selected, "localPosition");
                break;
            }
        case "rotation":
            {
                const rot = mat4.getRotation(m);
                selected.localRotation = editor.tools.rotation(selected.position, rot, selected.localRotation, editor.tools.toolSize(selected.position));
                editor.reloadPropertiesEditor(selected, "localRotation");
                break;
            }
        case "scaling":
            {
                selected.localScaling = editor.tools.scaling(selected.position, selected.rotation, selected.localScaling, editor.tools.toolSize(selected.position));
                editor.reloadPropertiesEditor(selected, "localScaling");
                break;
            }
    }
}
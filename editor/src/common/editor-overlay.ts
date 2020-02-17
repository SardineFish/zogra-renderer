import { ZograEditor } from "./zogra-editor";

export function drawEditorOverlay(editor: ZograEditor)
{
    const selected = editor.selectedEntities[0];
    if (selected)
    {
        selected.position = editor.tools.position(selected.position, selected.rotation, editor.tools.toolSize(selected.position));
    }
}
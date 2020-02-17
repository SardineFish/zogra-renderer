import { InputManager, Time } from "zogra-renderer";
import { ZograEditor } from "./zogra-editor";

export function initEditorInput(editor: ZograEditor)
{
    const input = new InputManager({ bound: editor.engine.renderer.canvas });
    editor.engine.on("update", (time) =>
    {
        input.update(); 
    });
    return input;
}
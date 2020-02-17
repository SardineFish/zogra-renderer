import { createEditorShaders } from "../shaders/shaders";

export function initEditorAssets()
{
    return {
        shaders: createEditorShaders()
    };
}
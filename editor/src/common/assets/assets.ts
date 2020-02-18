import { createEditorShaders } from "../../shaders/shaders";
import { Asset, IEventSource, EventDefinitions, EventKeys, EventEmitter } from "zogra-renderer";

export function initEditorAssets()
{
    return {
        shaders: createEditorShaders()
    };
}

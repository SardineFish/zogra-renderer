import { } from "zogra-renderer";
import { ZograEditor } from "./zogra-editor";
import { ZograEngine, Camera, vec3, Entity, rgb } from "zogra-renderer";

export function initCamera(editor: ZograEditor)
{
    const wrapper = new Entity();
    editor.engine.scene.add(wrapper);
    wrapper.position = vec3(0, 2, 20);
    const camera = new Camera();
    editor.engine.scene.add(camera, wrapper);
    camera.clearColor = rgb(.3, .3, .3);
    camera.FOV = 60;
}
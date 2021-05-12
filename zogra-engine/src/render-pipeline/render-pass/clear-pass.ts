import { Camera } from "../../engine/camera";
import { RenderData } from "../render-data";
import { RenderPass } from "./render-pass";
import { RenderContext } from "../render-pipeline";

export class ClearPass extends RenderPass
{
    render(context: RenderContext, data: RenderData)
    {
        const camera = data.camera;
        context.renderer.setFramebuffer(data.cameraOutput);
        context.renderer.clear(camera.clearColor, camera.clearDepth);
    }
}
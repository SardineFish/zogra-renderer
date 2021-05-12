import { RenderPass } from "./render-pass";
export class ClearPass extends RenderPass {
    render(context, data) {
        const camera = data.camera;
        context.renderer.setFramebuffer(data.cameraOutput);
        context.renderer.clear(camera.clearColor, camera.clearDepth);
    }
}
//# sourceMappingURL=clear-pass.js.map
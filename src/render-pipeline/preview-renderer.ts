import { ZograRenderPipeline, RenderContext } from "./render-pipeline";
import { Camera, Projection } from "../engine/camera";
import { mat4 } from "../types/mat4";
import { ZograRenderer } from "../core/core";
import { RenderObject } from "../engine/render-object";
import { Entity } from "../engine/entity";
import { RenderData, RenderOrder } from "./render-data";
import { Color } from "../types/color";
import { RenderTarget } from "../core/render-target";
import { RenderTexture } from "../core/texture";

export class PreviewRenderer implements ZograRenderPipeline
{
    render(context: RenderContext, cameras: Camera[])
    {
        for (let i = 0; i < cameras.length; i++)
        {
            const data = new RenderData(cameras[i], context.scene);
            this.renderCamera(context, data);
        }
    }

    setupLight(context: RenderContext, data: RenderData)
    {
        context.renderer.setGlobalUniform("uLightPos", "vec3", data.camera.position);
        context.renderer.setGlobalUniform("uLightColor", "color", Color.white);
    }

    renderCamera(context: RenderContext, data: RenderData)
    {

        const camera = data.camera;
        var mat = mat4;

        if (camera.output === RenderTarget.CanvasTarget)
            context.renderer.setRenderTarget(RenderTarget.CanvasTarget);
        else
            context.renderer.setRenderTarget(camera.output as RenderTexture);
        context.renderer.clear(Color.black, true);
        context.renderer.viewProjectionMatrix = camera.viewProjectionMatrix;

        this.setupLight(context, data);
        
        const objs = data.getVisibleObjects(RenderOrder.NearToFar);
        for (const obj of objs)
        {
            const modelMatrix = obj.localToWorldMatrix;
            for (const mesh of obj.meshes)
            {
                context.renderer.drawMesh(mesh, modelMatrix, obj.material);       
            }
        }
    }

}
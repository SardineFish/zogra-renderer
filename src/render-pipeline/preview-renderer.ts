import { ZograRenderPipeline, RenderContext } from "./render-pipeline";
import { Camera, Projection } from "../engine/camera";
import { mat4 } from "../types/mat4";
import { ZograRenderer } from "../core/core";
import { RenderObject } from "../engine/render-object";
import { Entity } from "../engine/entity";
import { RenderData, RenderOrder } from "./render-data";
import { Color, rgba } from "../types/color";
import { RenderTarget } from "../core/render-target";
import { RenderTexture } from "../core/texture";
import { Lines, LineBuilder } from "../core/lines";
import { vec3 } from "../types/vec3";

export class PreviewRenderer implements ZograRenderPipeline
{
    renderer: ZograRenderer;
    grid: Lines;
    constructor(renderer: ZograRenderer)
    {
        this.renderer = renderer;

        const lineColor = rgba(1, 1, 1, 0.1);
        const lb = new LineBuilder(0, renderer.gl);
        const Size = 10;
        const Grid = 1;
        for (let i = -Size; i <= Size; i+=Grid)
        {
            lb.addLine([
                vec3(i, 0, -Size),
                vec3(i, 0, Size),
            ], lineColor);
            lb.addLine([
                vec3(-Size, 0, i),
                vec3(Size, 0, i)
            ], lineColor);
        }
        this.grid = lb.toLines();
    }
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
            
        context.renderer.clear(camera.clearColor, camera.clearDepth);
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

        this.renderGrid(context, data);
    }

    renderGrid(context: RenderContext, data: RenderData)
    {
        this.renderer.drawLines(this.grid, mat4.identity(), this.renderer.assets.materials.ColoredLine);
    }

}
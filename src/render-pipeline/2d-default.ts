import { ZograRenderPipeline, RenderContext, MaterialReplacer } from "./render-pipeline";
import { Camera, Projection } from "../engine/camera";
import { mat4 } from "../types/mat4";
import { ZograRenderer, Material, Mesh } from "../core/core";
import { RenderObject } from "../engine/render-object";
import { Entity } from "../engine/entity";
import { RenderData, RenderOrder } from "./render-data";
import { Color, rgba, rgb } from "../types/color";
import { RenderTarget } from "../core/render-target";
import { RenderTexture } from "../core/texture";
import { Lines, LineBuilder } from "../core/lines";
import { vec3 } from "../types/vec3";
import { ConstructorType } from "../utils/util";
import { mul } from "../types/math";
import { vec4 } from "../types/vec4";
import { DebugLayerRenderer } from "./debug-layer";


export class Default2DRenderPipeline implements ZograRenderPipeline
{
    debuglayer = new DebugLayerRenderer();

    render(renderer: RenderContext, cameras: Camera[]): void
    {
        for (const camera of cameras)
        {
            const data = new RenderData(camera, renderer.scene);
            this.renderCamera(renderer, data);
        }
    }
    replaceMaterial<T extends Material>(MaterialType: ConstructorType<T>, material: Material): void
    {
        throw new Error("Method not implemented.");
    }

    renderCamera(context: RenderContext, data: RenderData)
    {
        const camera = data.camera;
        camera.__preRender(context);

        if (camera.output === RenderTarget.CanvasTarget)
            context.renderer.setRenderTarget(RenderTarget.CanvasTarget);
        else
            context.renderer.setRenderTarget(camera.output as RenderTexture);

        context.renderer.clear(camera.clearColor, camera.clearDepth);

        context.renderer.setViewProjection(camera.worldToLocalMatrix, camera.projectionMatrix);
        // context.renderer.setGlobalUniform("uCameraPos", "vec3", camera.position);

        const objs = data.getVisibleObjects(RenderOrder.FarToNear);
        for (const obj of objs)
        {
            obj.__onRender(context, data);
            const modelMatrix = obj.localToWorldMatrix;

            for (let i = 0; i < obj.meshes.length; i++)
            {
                if (!obj.meshes[i])
                    continue;
                const mat = obj.materials[i] || context.renderer.assets.materials.default;
                mat.setProp("uCameraPos", "vec3", camera.position);
                context.renderer.drawMesh(obj.meshes[i], modelMatrix, mat);
            }
        }

        this.debuglayer.render(context, data);
        camera.__postRender(context);
    }

}
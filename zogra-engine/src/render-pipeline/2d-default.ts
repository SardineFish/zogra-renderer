import { ZograRenderPipeline, RenderContext, MaterialReplacer } from "./render-pipeline";
import { Camera, Projection } from "../engine/engine";
import { mat4 } from "zogra-renderer";
import { ZograRenderer, Material, Mesh } from "zogra-renderer";
import { RenderObject } from "../engine/engine";
import { Entity } from "../engine/engine";
import { RenderData, RenderOrder } from "./render-data";
import { Color, rgba, rgb } from "zogra-renderer";
import { RenderTarget } from "zogra-renderer";
import { RenderTexture } from "zogra-renderer";
import { Lines, LineBuilder } from "zogra-renderer";
import { vec3 } from "zogra-renderer";
import { ConstructorType } from "../utils/util";
import { mul } from "zogra-renderer";
import { vec4 } from "zogra-renderer";
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
            obj.render(context, data);
            // const modelMatrix = obj.localToWorldMatrix;

            // for (let i = 0; i < obj.meshes.length; i++)
            // {
            //     if (!obj.meshes[i])
            //         continue;
            //     const mat = obj.materials[i] || context.renderer.assets.materials.default;
            //     mat.setProp("uCameraPos", "vec3", camera.position);
            //     context.renderer.drawMesh(obj.meshes[i], modelMatrix, mat);
            // }
        }

        this.debuglayer.render(context, data);
        camera.__postRender(context);
    }

}
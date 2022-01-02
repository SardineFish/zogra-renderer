import { FrameBuffer, DefaultVertexStruct, Material, Lines, LineBuilder, vec3, rgba, mat4 } from "zogra-renderer";
import { RenderPass } from ".";
import { RenderData } from "..";
import { Camera, Scene, RenderObject } from "../../engine";
import { IPhysicsSystem } from "../../physics/physics-generic";
import { UnlitColor } from "../materials/unlit";
import { RenderOrder } from "../render-data";
import { RenderContext } from "../render-pipeline";

export class GridRenderer extends RenderPass
{
    grid: Lines;
    material = new UnlitColor();

    constructor(Size = 10, Grid = 1, color = rgba(1, 1, 1, 0.1))
    {
        super();

        const lb = new LineBuilder();
        for (let i = -Size; i <= Size; i += Grid)
        {
            lb.addLine([
                vec3(i, 0, -Size),
                vec3(i, 0, Size),
            ], color);
            lb.addLine([
                vec3(-Size, 0, i),
                vec3(Size, 0, i)
            ], color);
        }

        this.grid = lb.toLines();
    }

    render(context: RenderContext, data: RenderData): void
    {
        context.renderer.drawLines(this.grid, mat4.identity(), this.material);
    }
    
}
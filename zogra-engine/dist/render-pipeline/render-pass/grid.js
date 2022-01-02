import { LineBuilder, vec3, rgba, mat4 } from "zogra-renderer";
import { RenderPass } from ".";
import { UnlitColor } from "../materials/unlit";
export class GridRenderer extends RenderPass {
    constructor(Size = 10, Grid = 1, color = rgba(1, 1, 1, 0.1)) {
        super();
        this.material = new UnlitColor();
        const lb = new LineBuilder();
        for (let i = -Size; i <= Size; i += Grid) {
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
    render(context, data) {
        context.renderer.drawLines(this.grid, mat4.identity(), this.material);
    }
}
//# sourceMappingURL=grid.js.map
import { DownsampleBlurRenderer } from "../../utils/blur-renderer";
import { PostProcess } from "./post-process";
export var BlurMethod;
(function (BlurMethod) {
    BlurMethod[BlurMethod["Downsample"] = 0] = "Downsample";
    BlurMethod[BlurMethod["Gussian"] = 1] = "Gussian";
})(BlurMethod || (BlurMethod = {}));
export class Blur extends PostProcess {
    constructor(method = BlurMethod.Downsample) {
        super();
        this.radius = 64;
        this.blurRenderer = new DownsampleBlurRenderer();
        this.method = method;
    }
    render(context, src, dst) {
        if (this.radius > 0) {
            this.blurRenderer.blur(src, Math.log2(this.radius), dst);
        }
        else {
            context.renderer.blit(src, dst);
        }
    }
}
//# sourceMappingURL=blur.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Blur = exports.BlurMethod = void 0;
const blur_renderer_1 = require("../../utils/blur-renderer");
const post_process_1 = require("./post-process");
var BlurMethod;
(function (BlurMethod) {
    BlurMethod[BlurMethod["Downsample"] = 0] = "Downsample";
    BlurMethod[BlurMethod["Gussian"] = 1] = "Gussian";
})(BlurMethod = exports.BlurMethod || (exports.BlurMethod = {}));
class Blur extends post_process_1.PostProcess {
    constructor(method = BlurMethod.Downsample) {
        super();
        this.radius = 64;
        this.blurRenderer = new blur_renderer_1.DownsampleBlurRenderer();
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
exports.Blur = Blur;
//# sourceMappingURL=blur.js.map
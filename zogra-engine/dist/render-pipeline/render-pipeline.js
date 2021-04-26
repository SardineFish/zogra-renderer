"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenderContext = void 0;
exports.RenderContext = {
    create(renderer) {
        return {
            renderer,
            screen: {
                width: renderer.canvas.width,
                height: renderer.canvas.height
            },
        };
    }
};
//# sourceMappingURL=render-pipeline.js.map
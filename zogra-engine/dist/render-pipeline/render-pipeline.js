export const RenderContext = {
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
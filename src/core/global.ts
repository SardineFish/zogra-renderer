

export interface GLContext
{
    gl: WebGL2RenderingContext;
    width: number;
    height: number;
    usedTextureUnit: number;
}

let ctx: GLContext;

export const setGlobalContext = (_ctx: GLContext) => ctx = _ctx;
export const GlobalContext = () => ctx;
export const GL = () => GlobalContext().gl;
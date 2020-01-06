import { panicNull, getUniformsLocation } from "../utils/util";
import { DefaultMaterialType } from "./material-type";
import { makeDefaultMateiral, DefaultShaderResources, initGlobalAssets } from "./builtin-asset";
import { GL, setGlobalContext, GLContext, GlobalContext } from "./global";
import { Mesh } from "./mesh";
import { vec3 } from "../types/vec3";
import { quat} from "gl-matrix";
import { Material } from "./material";
import { Color } from "../types/color";
import { mat4 } from "../types/mat4";
import { RenderTarget } from "./render-target";
import { RenderTexture, DepthTexture } from "./texture";

export class ZograRenderer
{
    canvas: HTMLCanvasElement;
    readonly width: number;
    readonly height: number;
    gl: WebGL2RenderingContext;
    DefaultMaterial: typeof DefaultMaterialType;
    ctx: GLContext;

    viewProjectionMatrix = mat4.identity();

    private target: RenderTarget = RenderTarget.CanvasTarget;

    constructor(canvasElement: HTMLCanvasElement, width?: number, height?: number)
    {
        this.canvas = canvasElement;
        this.width = width === undefined ? canvasElement.width : width;
        this.height = height === undefined ? canvasElement.height : height;
        this.canvas.width = this.width;
        this.canvas.height = this.height;

        this.gl = panicNull(this.canvas.getContext("webgl2"), "WebGL2 is not support on current device.");
        
        this.DefaultMaterial = null as any;// makeDefaultMateiral(this.gl);
        this.ctx = {
            gl: this.gl,
            width: this.width,
            height: this.height,
            usedTextureUnit: 0,
        };

        initGlobalAssets(this.ctx);
        if (!GlobalContext())
            this.use();
    }

    use()
    {
        setGlobalContext(this.ctx);
    }

    setViewProjection(mat: mat4)
    {
        this.viewProjectionMatrix = mat;
    }

    setRenderTarget(rt: RenderTarget) : void
    setRenderTarget(colorAttachments: RenderTexture, depthAttachment?: DepthTexture):void
    setRenderTarget(colorAttachments: RenderTexture[], depthAttachment?: DepthTexture):void
    setRenderTarget(colorAttachments: RenderTexture[] | RenderTexture | RenderTarget, depthAttachment?: DepthTexture)
    {
        if (colorAttachments instanceof RenderTarget)
        {
            if (this.target !== colorAttachments)
                this.target.release();
            this.target = colorAttachments;
            
        }
        else if (colorAttachments instanceof Array)
        {
            this.target.release();
            this.target = new RenderTarget(colorAttachments[0].width, colorAttachments[0].height, this.ctx);
            for (let i = 0; i < colorAttachments.length; i++)
                this.target.addColorAttachment(colorAttachments[i]);
        }
        else if (colorAttachments instanceof RenderTexture)
        {
            this.target.release();
            this.target = new RenderTarget(colorAttachments.width, colorAttachments.height, this.ctx);
            this.target.addColorAttachment(colorAttachments);
        }

        if (depthAttachment)
            this.target.setDepthAttachment(depthAttachment);
        
        this.target.bind(this.ctx);
    }

    clear(color = Color.black, clearDepth = true)
    {
        this.gl.clearColor(color.r, color.g, color.b, color.a);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | (clearDepth ? this.gl.DEPTH_BUFFER_BIT : 0));
    }

    drawMesh(mesh: Mesh, transform: mat4, mateiral: Material)
    {
        const gl = this.gl;
        
        mateiral.setup(this.ctx);

        const program = mateiral.shader.program;
        const attributes = mateiral.shader.attributes;
        const locations = getUniformsLocation(gl, program, DefaultShaderResources.uniforms);


        // Setup transforms
        const mvp = mat4.mul(transform, this.viewProjectionMatrix);
        locations.matM && gl.uniformMatrix4fv(locations.matM, false, transform);
        locations.matVP && gl.uniformMatrix4fv(locations.matVP, false, this.viewProjectionMatrix);
        locations.matMVP && gl.uniformMatrix4fv(locations.matMVP, false, mvp);
        
        const [vertBuffer, elementBuffer] = mesh.setup(gl);

        // Setup VAO
        const stride = 12 * 4;
        gl.bindBuffer(gl.ARRAY_BUFFER, vertBuffer);
        // vert: vec3
        if (attributes.vert >= 0)
        {
            gl.vertexAttribPointer(attributes.vert, 3, gl.FLOAT, false, stride, 0);
            gl.enableVertexAttribArray(attributes.vert);
        }
        // color: vec4
        if (attributes.color >= 0)
        {
            gl.vertexAttribPointer(attributes.color, 4, gl.FLOAT, false, stride, 3 * 4);
            gl.enableVertexAttribArray(attributes.color);
        }
        // uv: vec2
        if (attributes.uv >= 0)
        {
            gl.vertexAttribPointer(attributes.uv, 2, gl.FLOAT, false, stride, 7 * 4);
            gl.enableVertexAttribArray(attributes.uv);
        }
        // normal: vec3
        if (attributes.normal >= 0)
        {
            gl.vertexAttribPointer(attributes.normal, 3, gl.FLOAT, true, stride, 9 * 4);
            gl.enableVertexAttribArray(attributes.uv);
        }

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, elementBuffer);

        gl.drawElements(gl.TRIANGLE_STRIP, mesh.triangles.length, gl.UNSIGNED_INT, 0);
    }
}
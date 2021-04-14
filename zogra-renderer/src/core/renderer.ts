import { panicNull, getUniformsLocation, cloneUniformValue } from "../utils/util";
import { DefaultMaterialType } from "./material-type";
import { GL, setGlobalContext, GLContext, GlobalContext } from "./global";
import { Mesh } from "./mesh";
import { vec3, Vector3 } from "../types/vec3";
import { Material } from "./material";
import { Color } from "../types/color";
import { mat4 } from "../types/mat4";
import { IRenderTarget, RenderTarget } from "./render-target";
import { RenderTexture, DepthTexture, Texture, Texture2D } from "./texture";
import { vec4 } from "../types/vec4";
import { vec2, Vector2 } from "../types/vec2";
import { BuiltinAssets } from "../builtin-assets/assets";
import { quat } from "../types/quat";
import { BindingData, UniformType, UniformValueType } from "./types";
import { Shader, DepthTest, Blending, Culling } from "./shader";
import { Lines } from "./lines";
import { Rect } from "../types/rect";
import { MeshBuilder } from "../utils/mesh-builder";
import { div } from "../types/math";
import { BuiltinUniformNames } from "../builtin-assets/shaders";
import { BufferStructure, RenderBuffer } from "./buffer";

export class ZograRenderer
{
    canvas: HTMLCanvasElement;
    gl: WebGL2RenderingContext;
    ctx: GLContext;
    assets: BuiltinAssets;

    private width: number;
    private height: number;

    viewProjectionMatrix = mat4.identity();
    viewMatrix = mat4.identity();
    projectionMatrix = mat4.identity();

    private target: IRenderTarget = RenderTarget.CanvasTarget;
    private shader: Shader | null = null;
    private scissor: Rect;
    private globalUniforms = new Map<string, GlobalUniform>();
    private globalTextures = new Map<string, GlobalTexture>();

    private helperAssets: {
        clipBlitMesh: Mesh,
        blitMesh: Mesh,
    };

    constructor(canvasElement: HTMLCanvasElement, width?: number, height?: number)
    {
        this.canvas = canvasElement;
        this.width = width === undefined ? canvasElement.width : width;
        this.height = height === undefined ? canvasElement.height : height;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.scissor = new Rect(vec2.zero(), vec2(this.width, this.height));

        this.gl = panicNull(this.canvas.getContext("webgl2"), "WebGL2 is not support on current device.");

        this.assets = new BuiltinAssets(this.gl);
        
        this.ctx = {
            gl: this.gl,
            width: this.width,
            height: this.height,
            assets: this.assets,
            renderer: this,
        };

        if (!GlobalContext())
            this.use();
        
        this.helperAssets = {
            clipBlitMesh: MeshBuilder.ndcQuad(),
            blitMesh: MeshBuilder.ndcTriangle(),
        };
    }

    use()
    {
        setGlobalContext(this.ctx);
    }

    setSize(width: number, height: number)
    {
        this.canvas.width = width;
        this.canvas.height = height;
        this.width = width;
        this.height = height;
        this.ctx.width = width;
        this.ctx.height = height;
    }

    get canvasSize(): vec2 { return vec2(this.width, this.height) }
    

    setViewProjection(view: Readonly<mat4>, projection: Readonly<mat4>)
    {
        mat4.mul(this.viewProjectionMatrix, projection, view);
    }

    setRenderTarget(rt: IRenderTarget) : void
    setRenderTarget(colorAttachments: RenderTexture, depthAttachment?: DepthTexture):void
    setRenderTarget(colorAttachments: RenderTexture[], depthAttachment?: DepthTexture):void
    setRenderTarget(colorAttachments: RenderTexture[] | RenderTexture | IRenderTarget, depthAttachment?: DepthTexture)
    {
        if (colorAttachments === RenderTarget.CanvasTarget)
        {
            if (this.target !== colorAttachments)
                this.target.release();
            this.target = colorAttachments;
        }
        else if (colorAttachments instanceof RenderTarget)
        {
            if (this.target !== colorAttachments)
                this.target.release();
            this.target = colorAttachments;

            if (depthAttachment)
            {
                (this.target as RenderTarget).setDepthAttachment(depthAttachment);
            }
        }
        else
        {
            let target: RenderTarget;
            if (colorAttachments instanceof Array)
            {
                this.target.release();
                target = new RenderTarget(colorAttachments[0].width, colorAttachments[0].height, this.ctx);
                for (let i = 0; i < colorAttachments.length; i++)
                    target.addColorAttachment(colorAttachments[i]);
            }
            else if (colorAttachments instanceof RenderTexture)
            {
                this.target.release();
                target = new RenderTarget(colorAttachments.width, colorAttachments.height, this.ctx);
                target.addColorAttachment(colorAttachments);
            }
            else
                throw new Error("Invalid render target");

            if (depthAttachment)
                target.setDepthAttachment(depthAttachment);
            
            this.target = target;
        }
        

        this.scissor = new Rect(vec2.zero(), this.target.size);
        this.target.bind();
    }

    clear(color = Color.black, clearDepth = true)
    {
        this.gl.clearColor(color.r, color.g, color.b, color.a);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | (clearDepth ? this.gl.DEPTH_BUFFER_BIT : 0));
    }

    blit(
        src: Texture | null,
        dst: IRenderTarget | RenderTexture | RenderTexture[],
        material: Material = this.assets.materials.blitCopy,
        srcRect?: Rect,
        dstRect?: Rect)
    {
        
        if (dst instanceof RenderTexture)
        {
            const target = new RenderTarget(dst.width, dst.height, this.ctx);
            target.addColorAttachment(dst);
            dst = target;
        }
        else if (dst instanceof Array)
        {
            const target = new RenderTarget(0, 0, this.ctx);
            for (let i = 0; i < dst.length; i++)
            {
                target.addColorAttachment(dst[i]);
            }
            dst = target;
        }

        const prevVP = this.viewProjectionMatrix;
        const prevTarget = this.target;
        let mesh = this.helperAssets.blitMesh;
        let viewport = dst === RenderTarget.CanvasTarget ? new Rect(vec2.zero(), this.canvasSize) : new Rect(vec2.zero(), dst.size);

        if (src && (srcRect || dstRect))
        {
            viewport = dstRect || viewport;
            if (srcRect)
            {
                mesh = this.helperAssets.clipBlitMesh;
                let uvMin = div(srcRect.min, src.size);
                let uvMax = div(srcRect.max, src.size);
                mesh.uvs = [
                    vec2(uvMin.x, uvMin.y),
                    vec2(uvMax.x, uvMin.y),
                    vec2(uvMax.x, uvMax.y),
                    vec2(uvMin.x, uvMax.y),
                ];
                mesh.update();
            }
        }

        this.target = dst;
        this.scissor = viewport;
        this.viewProjectionMatrix = mat4.identity();
        if (src)
            material.setProp(BuiltinUniformNames.mainTex, "tex2d", src);

        this.drawMesh(mesh, mat4.identity(), material);

        // this.unsetGlobalTexture(BuiltinUniformNames.mainTex);

        this.setRenderTarget(prevTarget);
        this.viewProjectionMatrix = prevVP;
    }

    private useShader(shader: Shader)
    {
        // Shader state may be modified by flip texure.
        // if (shader === this.shader)
        //     return;
        
        const gl = this.gl;
        
        this.shader = shader;
        shader.use();
        shader.setupPipelineStates();
        
    }

    private setupTransforms(shader: Shader, transformModel: Readonly<mat4>)
    {
        const gl = this.gl;
        
        const mvp = mat4.mul(this.viewProjectionMatrix, transformModel);
        const mit = mat4.transpose(mat4.invert(transformModel));
        const mvit = mat4.transpose(mat4.invert(mat4.mul(this.viewMatrix, transformModel)));
        shader.setupBuiltinUniform({
            matM: transformModel,
            matVP: this.viewProjectionMatrix,
            matMVP: mvp,
            matM_IT: mit,
            matMV_IT: mvit,
        });
    }

    private setupGlobalUniforms(material: Material)
    {
        for (const val of this.globalUniforms.values())
        {
            material.setUniformDirectly(val.name, val.type, val.value);
        }
    }

    drawMeshInstance<T extends BufferStructure>(mesh: Mesh, buffer: RenderBuffer<T>, material: Material, count: number)
    {
        if (!material)
            material = this.assets.materials.error;
        const gl = this.gl;
        const data: BindingData = {
            assets: this.assets,
            gl: gl,
            nextTextureUnit: 0,
            size: vec2(this.width, this.height),
        };

        this.target.bind();
        this.setupScissor();

        this.useShader(material.shader);

        material.upload(data);
        this.setupTransforms(material.shader, mat4.identity());
        mesh.bind(material.shader);
        buffer.bindInstanceDraw(material.shader);

        gl.drawElementsInstanced(gl.TRIANGLES, mesh.triangles.length, gl.UNSIGNED_INT, 0, count);

        buffer.cleanupInstanceDraw(material.shader);
        material.unbindRenderTextures();
    }

    drawMeshProceduralInstance(mesh: Mesh, material: Material, count: number)
    {
        if (!material)
            material = this.assets.materials.error;
        const gl = this.gl;
        const data: BindingData = {
            assets: this.assets,
            gl: gl,
            nextTextureUnit: 0,
            size: vec2(this.width, this.height),
        };

        this.target.bind();
        this.setupScissor();

        this.useShader(material.shader);

        material.upload(data);
        this.setupTransforms(material.shader, mat4.identity());
        mesh.bind(material.shader);

        gl.drawElementsInstanced(gl.TRIANGLES, mesh.triangles.length, gl.UNSIGNED_INT, 0, count);

        material.unbindRenderTextures();
    }

    drawMesh(mesh: Mesh, transform: Readonly<mat4>, material: Material)
    {
        if (!material)
            material = this.assets.materials.error;
        const gl = this.gl;
        const data: BindingData = {
            assets: this.assets,
            gl: gl,
            nextTextureUnit: 0,
            size: vec2(this.width, this.height),
        };
        
        this.target.bind();
        this.setupScissor();
        
        this.useShader(material.shader);
        
        material.upload(data);
        this.setupTransforms(material.shader, transform);
        this.setupGlobalUniforms(material);
        mesh.bind(material.shader);

        gl.drawElements(gl.TRIANGLES, mesh.triangles.length, gl.UNSIGNED_INT, 0);

        material.unbindRenderTextures();
    }

    drawLines(lines: Lines, transform: mat4, material: Material)
    {
        const gl = this.gl;
        const data: BindingData = {
            assets: this.assets,
            gl: gl,
            nextTextureUnit: 0,
            size: vec2(this.width, this.height),
        };

        this.target.bind();
        this.setupScissor();

        this.useShader(material.shader);

        material.upload(data);
        this.setupTransforms(material.shader, transform);
        // this.setupGlobalUniforms(material.shader, data);
        lines.bind(material.shader);

        gl.drawElements(gl.LINES, lines.lines.length, gl.UNSIGNED_INT, 0);

    }

    setGlobalUniform<T extends UniformType>(name: string, type: T, value: Readonly<UniformValueType<T>>)
    {
        this.globalUniforms.set(name, {
            name: name,
            type: type,
            value: cloneUniformValue(value),
        });
    }
    unsetGlobalUniform(name: string)
    {
        this.globalUniforms.delete(name);
    }

    private setupScissor()
    {
        const gl = this.gl;
        gl.viewport(this.scissor.xMin, this.scissor.yMin, this.scissor.size.x, this.scissor.size.y);
    }
    
}

interface GlobalUniform
{
    name: string;
    type: UniformType;
    value: UniformValueType<UniformType>;
}

interface GlobalTexture
{
    name: string;
    texture: Texture;
}

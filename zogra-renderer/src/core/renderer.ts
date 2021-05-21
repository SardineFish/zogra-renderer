import { panicNull, getUniformsLocation, cloneUniformValue } from "../utils/util";
import { DefaultMaterialType } from "./material-type";
import { GL, setGlobalContext, GLContext, GlobalContext } from "./global";
import { Mesh } from "./mesh";
import { vec3, Vector3 } from "../types/vec3";
import { Material } from "./material";
import { Color } from "../types/color";
import { mat4 } from "../types/mat4";
import { IFrameBuffer, FrameBuffer, ColorAttachment, DepthAttachment } from "./frame-buffer";
import { RenderTexture, DepthTexture, Texture, Texture2D } from "./texture";
import { vec4 } from "../types/vec4";
import { vec2, Vector2 } from "../types/vec2";
import { BuiltinAssets } from "../builtin-assets/assets";
import { quat } from "../types/quat";
import { BindingData, UniformType, UniformValueType } from "./types";
import { Shader, DepthTest, Blending, Culling, ShaderAttributeNames, AttributeLocations } from "./shader";
import { Lines } from "./lines";
import { Rect } from "../types/rect";
import { MeshBuilder } from "../utils/mesh-builder";
import { div } from "../types/math";
import { BuiltinUniformNames } from "../builtin-assets/shaders";
import { BufferStructure, GLArrayBuffer } from "./array-buffer";
import { ObjectPool } from "../utils/object-pool";
import { RenderBuffer } from "./render-buffer";

interface TempFramebuffer extends FrameBuffer
{
    __isTemp: true;
}

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

    private target: IFrameBuffer = FrameBuffer.CanvasBuffer;
    private shader: Shader | null = null;
    private scissor: Rect;
    private globalUniforms = new Map<string, GlobalUniform>();
    private globalTextures = new Map<string, GlobalTexture>();
    private framebufferPool = new ObjectPool<FrameBuffer, [number, number]>((w, h) => new FrameBuffer(w, h));
    private blitFramebuffer = [new FrameBuffer(), new FrameBuffer()];

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
        this.gl.getExtension("EXT_color_buffer_float");
        this.gl.getExtension("EXT_color_buffer_half_float");


        this.ctx = new GLContext();
        Object.assign(this.ctx, {
            gl: this.gl,
            width: this.width,
            height: this.height,
            assets: {} as any,
            renderer: this,
        });

        this.assets = new BuiltinAssets(this.ctx);
        this.ctx.assets = this.assets;

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
        width = Math.floor(width);
        height = Math.floor(height);
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

    setFramebuffer(rt: IFrameBuffer) : void
    setFramebuffer(colorAttachments: ColorAttachment, depthAttachment?: DepthAttachment):void
    setFramebuffer(colorAttachments: ColorAttachment[], depthAttachment?: DepthAttachment):void
    setFramebuffer(colorAttachments: ColorAttachment[] | ColorAttachment | IFrameBuffer, depthAttachment?: DepthAttachment)
    {
        let newFramebuffer: IFrameBuffer;
        if (colorAttachments === FrameBuffer.CanvasBuffer)
            newFramebuffer = FrameBuffer.CanvasBuffer;
        else if (colorAttachments instanceof FrameBuffer)
        {
            newFramebuffer = colorAttachments;
        }
        else
        {
            if (colorAttachments instanceof Array)
            {
                let width = 0, height = 0;
                if (colorAttachments.length > 0)
                {
                    width = colorAttachments[0].width;
                    height = colorAttachments[0].height;
                }
                else if (depthAttachment)
                {
                    width = depthAttachment.width;
                    height = depthAttachment.height;
                }
                const framebuffer = this.getTempFramebuffer(width, height);
                for (let i = 0; i < colorAttachments.length; i++)
                    framebuffer.addColorAttachment(colorAttachments[i], i);
                if (depthAttachment)
                    framebuffer.setDepthAttachment(depthAttachment);
                newFramebuffer = framebuffer;
            }
            else
            {
                const colorAttachment = colorAttachments as ColorAttachment;
                const framebuffer = this.getTempFramebuffer(colorAttachment.width, colorAttachment.height);
                framebuffer.addColorAttachment(colorAttachment, 0);
                if (depthAttachment)
                    framebuffer.setDepthAttachment(depthAttachment);
                newFramebuffer = framebuffer;
            }
            
        }
        if (newFramebuffer !== this.target)
        {
            this.detachCurrentFramebuffer();
            this.target = newFramebuffer;
        }
        
        this.scissor.min.set([0, 0]);
        this.scissor.max.set(this.target.size);
        this.target.bind();
    }

    private detachCurrentFramebuffer()
    {
        if ((this.target as TempFramebuffer).__isTemp)
        {
            this.framebufferPool.release(this.target as FrameBuffer);
        }
    }

    private getTempFramebuffer(width: number, height: number)
    {
        const framebuffer = this.framebufferPool.get(width, height);
        (framebuffer as TempFramebuffer).__isTemp = true;
        framebuffer.reset(width, height);
        return framebuffer;
    }

    blitCopy(src: RenderBuffer | RenderTexture, dst: RenderBuffer | RenderTexture)
    {
        const gl = this.gl;
        const [readBuffer, writeBuffer] = this.blitFramebuffer;
        readBuffer.reset(src.width, src.height);
        readBuffer.addColorAttachment(src);
        readBuffer.bind();
        writeBuffer.reset(src.width, src.height);

        // gl.bindFramebuffer(gl.FRAMEBUFFER, readBuffer.glFBO());
        // gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.RENDERBUFFER, renderBuffer.glBuf());
        // gl.bindFramebuffer(gl.FRAMEBUFFER, writeBuffer.glFBO());
        // gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture.glTex(), 0);
        gl.bindFramebuffer(gl.READ_FRAMEBUFFER, readBuffer.glFBO());
        src instanceof RenderTexture
            ? gl.framebufferTexture2D(gl.READ_FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.RENDERBUFFER, src.glTex(), 0)
            : gl.framebufferRenderbuffer(gl.READ_FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.RENDERBUFFER, src.glBuf());
        gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, writeBuffer.glFBO());
        dst instanceof RenderTexture
            ? gl.framebufferTexture2D(gl.DRAW_FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, dst.glTex(), 0)
            : gl.framebufferRenderbuffer(gl.DRAW_FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, dst.glBuf());


        gl.blitFramebuffer(
            0, 0, src.width, src.height,
            0, 0, dst.width, dst.height,
            gl.COLOR_BUFFER_BIT,
            gl.NEAREST
        );

        gl.bindFramebuffer(gl.READ_FRAMEBUFFER, null);
        gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, null);
    }


    clear(color = Color.black, clearDepth = true)
    {
        this.gl.clearColor(color.r, color.g, color.b, color.a);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | (clearDepth ? this.gl.DEPTH_BUFFER_BIT : 0));
    }

    blit(
        src: Texture | null,
        dst: IFrameBuffer | RenderTexture | RenderTexture[],
        material: Material = this.assets.materials.blitCopy,
        srcRect?: Rect,
        dstRect?: Rect)
    {
        const prevTarget = this.target;
        this.setFramebuffer(dst as IFrameBuffer);
        dst = this.target;

        const prevVP = this.viewProjectionMatrix;
        // const prevTarget = this.target;
        let mesh = this.helperAssets.blitMesh;
        let viewport = dst === FrameBuffer.CanvasBuffer ? new Rect(vec2.zero(), this.canvasSize) : new Rect(vec2.zero(), dst.size.clone());

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

        this.setFramebuffer(prevTarget);
        this.viewProjectionMatrix = prevVP;
    }

    private useShader<T extends BufferStructure>(shader: Shader<T>)
    {
        // Shader state may be modified by flip texure.
        // if (shader === this.shader)
        //     return;
        
        const gl = this.gl;
        
        (this.shader as unknown as Shader<T>) = shader;
        shader.use();
        // shader.setupPipelineStates();
        
    }

    private setupTransforms<T extends BufferStructure>(shader: Shader<T>, transformModel: Readonly<mat4>)
    {
        const gl = this.gl;
        
        const mvp = mat4.mul(this.viewProjectionMatrix, transformModel);
        const mit = mat4.create();
        if (mat4.invert(mit, transformModel))
            mat4.transpose(mit, mit);
        else
            mit.fill(0);
        
        const mvit = mat4.mul(this.viewMatrix, transformModel);
        if (mat4.invert(mvit, mvit))
            mat4.transpose(mvit, mvit);
        else
            mvit.fill(0);
        
        shader.setupBuiltinUniform({
            matM: transformModel,
            matVP: this.viewProjectionMatrix,
            matMVP: mvp,
            matM_IT: mit,
            matMV_IT: mvit,
        });
    }

    private setupGlobalUniforms<T extends BufferStructure, TMat extends Material<T>>(material: TMat)
    {
        for (const val of this.globalUniforms.values())
        {
            material.setUniformDirectly(val.name, val.type, val.value);
        }
    }

    drawMeshInstance<
        TMesh extends BufferStructure,
        TInstance extends BufferStructure,
        KM extends keyof TMesh,
        KI extends keyof TInstance,
        TMat extends Material<Pick<TMesh & TInstance, KM | KI>>
    > (mesh: Mesh<TMesh>, buffer: GLArrayBuffer<TInstance>, material: TMat, count: number)
    {
        if (!material)
            material = this.assets.materials.error as unknown as TMat;
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
        const elementCount = mesh.bind();
        buffer.bindVertexArray(true, material.shader.attributes as AttributeLocations<Pick<TInstance, KI>>);

        gl.drawElementsInstanced(gl.TRIANGLES, elementCount, gl.UNSIGNED_INT, 0, count);

        buffer.unbindVertexArray(true, material.shader.attributes as AttributeLocations<Pick<TInstance, KI>>);
        mesh.unbind();
        material.unbindRenderTextures();
    }

    drawMeshProceduralInstance<T extends BufferStructure, TMat extends Material<T>>(mesh: Mesh<T>, material: TMat, count: number)
    {
        if (!material)
            material = this.assets.materials.error as unknown as TMat;
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
        const elementCount = mesh.bind();

        gl.drawElementsInstanced(gl.TRIANGLES, elementCount, gl.UNSIGNED_INT, 0, count);

        material.unbindRenderTextures();
    }

    drawMesh<T extends BufferStructure, TMat extends Material<T>>(mesh: Mesh<T>, transform: Readonly<mat4>, material: TMat)
    {
        if (!material)
            material = this.assets.materials.error as unknown as TMat;
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
        this.setupGlobalUniforms<T, TMat>(material);
        let elementCount = mesh.bind();

        gl.drawElements(gl.TRIANGLES, elementCount, gl.UNSIGNED_INT, 0);

        mesh.unbind();
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

    setGlobalUniform<T extends UniformType>(name: string, type: T, value: UniformValueType<T>)
    {
        this.globalUniforms.set(name, {
            name: name,
            type: type,
            value: value,
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

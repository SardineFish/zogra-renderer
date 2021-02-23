import { panicNull, getUniformsLocation } from "../utils/util";
import { DefaultMaterialType } from "./material-type";
import { GL, setGlobalContext, GLContext, GlobalContext } from "./global";
import { Mesh } from "./mesh";
import { vec3, Vector3 } from "../types/vec3";
import { Material } from "./material";
import { Color } from "../types/color";
import { mat4 } from "../types/mat4";
import { RenderTarget } from "./render-target";
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

    private target: RenderTarget = RenderTarget.CanvasTarget;
    private shader: Shader | null = null;
    private viewport: Rect;
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
        this.viewport = new Rect(vec2.zero(), vec2(this.width, this.height));

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
            blitMesh: MeshBuilder.ndcQuad(),
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
    

    setViewProjection(view: mat4, projection: mat4)
    {
        this.viewProjectionMatrix = mat4.mul(projection, view);
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
        

        this.viewport = new Rect(vec2.zero(), this.target.size);
        this.target.bind(this.ctx);
    }

    clear(color = Color.black, clearDepth = true)
    {
        this.gl.clearColor(color.r, color.g, color.b, color.a);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | (clearDepth ? this.gl.DEPTH_BUFFER_BIT : 0));
    }

    blit(
        src: Texture,
        dst: RenderTarget | RenderTexture | RenderTexture[],
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
        let viewport = new Rect(vec2.zero(), dst.size);

        if (srcRect || dstRect)
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
        this.viewport = new Rect(vec2.zero(), dst.size);
        this.viewProjectionMatrix = mat4.identity();
        this.setGlobalTexture("uMainTex", src);

        this.drawMesh(this.assets.meshes.quad, mat4.rts(quat.identity(), vec3(0, 0, 0), vec3(2, 2, 1)), material);

        this.unsetGlobalTexture("uMainTex");

        this.setRenderTarget(prevTarget);
        this.viewProjectionMatrix = prevVP;
    }

    private useShader(shader: Shader)
    {
        /*if (shader === this.shader)
            return;*/
        
        const gl = this.gl;
        
        this.shader = shader;
        shader.use();

        
    }

    private setupTransforms(shader: Shader, transformModel: mat4)
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

    private setupGlobalUniforms(shader: Shader, data: BindingData)
    {
        const gl = this.gl;

        for (const val of this.globalUniforms.values())
        {
            const location = shader.uniformLocation(val.name);
            if (!location)
                continue;
            switch (val.type)
            {
                case "int":
                    gl.uniform1i(location, val.value as number);
                    break;
                case "float":
                    gl.uniform1f(location, val.value as number);
                    break;
                case "vec2":
                    gl.uniform2fv(location, val.value as vec2, 0, 2);
                    break;
                case "vec3":
                    gl.uniform3fv(location, val.value as vec3, 0, 3);
                    break;
                case "vec4":
                    gl.uniform4fv(location, val.value as vec4, 0, 4);
                    break;
                case "color":
                    gl.uniform4fv(location, val.value as Color, 0, 4);
                    break;
            }
        }

        for (const tex of this.globalTextures.values())
        {
            const location = shader.uniformLocation(tex.name);
            if (!location)
                continue;
            tex.texture.bind(location, data);
        }
    }

    drawMesh(mesh: Mesh, transform: mat4, material: Material)
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
        
        this.target.bind(this.ctx);
        this.setupViewport();
        this.useShader(material.shader);
        
        material.setup(data);
        this.setupTransforms(material.shader, transform);
        this.setupGlobalUniforms(material.shader, data);
        mesh.bind(material.shader);

        gl.drawElements(gl.TRIANGLES, mesh.triangles.length, gl.UNSIGNED_INT, 0);
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

        this.target.bind(this.ctx);
        this.setupViewport();

        this.useShader(material.shader);

        material.setup(data);
        this.setupTransforms(material.shader, transform);
        this.setupGlobalUniforms(material.shader, data);
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

    setGlobalTexture(name: string, texture: Texture)
    {
        this.globalTextures.set(name, {
            name: name,
            texture: texture,
        });
    }
    unsetGlobalTexture(name: string)
    {
        this.globalTextures.delete(name);   
    }

    private setupViewport()
    {
        const gl = this.gl;
        gl.viewport(this.viewport.xMin, this.viewport.yMin, this.viewport.size.x, this.viewport.size.y);
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

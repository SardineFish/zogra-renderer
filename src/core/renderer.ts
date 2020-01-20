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

export class ZograRenderer
{
    canvas: HTMLCanvasElement;
    readonly width: number;
    readonly height: number;
    gl: WebGL2RenderingContext;
    ctx: GLContext;
    assets: BuiltinAssets;

    viewProjectionMatrix = mat4.identity();

    private target: RenderTarget = RenderTarget.CanvasTarget;
    private globalUniforms = new Map<string, GlobalUniform>();
    private globalTextures = new Map<string, GlobalTexture>();

    constructor(canvasElement: HTMLCanvasElement, width?: number, height?: number)
    {
        this.canvas = canvasElement;
        this.width = width === undefined ? canvasElement.width : width;
        this.height = height === undefined ? canvasElement.height : height;
        this.canvas.width = this.width;
        this.canvas.height = this.height;

        this.gl = panicNull(this.canvas.getContext("webgl2"), "WebGL2 is not support on current device.");

        this.assets = new BuiltinAssets(this.gl);
        
        this.ctx = {
            gl: this.gl,
            width: this.width,
            height: this.height,
            usedTextureUnit: 0,
            assets: this.assets,
        };

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

    blit(src: Texture, dst: RenderTarget | RenderTexture | RenderTexture[], material: Material = this.assets.materials.blitCopy)
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

        dst.bind(this.ctx);
        this.viewProjectionMatrix = mat4.identity();
        this.setGlobalTexture("uMainTex", src);

        this.drawMesh(this.assets.meshes.quad, mat4.rts(quat.identity(), vec3(0, 0, 0), vec3(2, 2, 1)), material);

        this.unsetGlobalTexture("uMainTex");
        this.target.bind();
        this.viewProjectionMatrix = prevVP;
    }

    drawMesh(mesh: Mesh, transform: mat4, mateiral: Material)
    {
        const gl = this.gl;

        this.ctx.usedTextureUnit = this.globalTextures.size;
        
        mateiral.setup(this.ctx);

        const program = mateiral.shader.program;
        const attributes = mateiral.shader.attributes;
        const transformLocations = getUniformsLocation(gl, program, this.assets.BuiltinUniforms);


        // Setup transforms
        const mvp = mat4.mul(transform, this.viewProjectionMatrix);
        transformLocations.matM && gl.uniformMatrix4fv(transformLocations.matM, false, transform);
        transformLocations.matVP && gl.uniformMatrix4fv(transformLocations.matVP, false, this.viewProjectionMatrix);
        transformLocations.matMVP && gl.uniformMatrix4fv(transformLocations.matMVP, false, mvp);

        // Setup global uniforms
        {
            for (const val of this.globalUniforms.values()) {
                const location = gl.getUniformLocation(program, val.name);
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
        }
        // Setup global textures
        {
            for (const tex of this.globalTextures.values())
            {
                const location = gl.getUniformLocation(program, tex.name);
                if (!location)
                    continue;
                tex.texture.bind(location, this.ctx.usedTextureUnit++, this.ctx);
            }
        }
        
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
        this.ctx.usedTextureUnit = 0;
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
}

interface GlobalUniform
{
    name: string;
    type: "int" | "float" | "vec4" | "vec3" | "vec2" | "tex2d" | "color";
    value: number | vec4 | vec3 | vec2 | Texture;
}

interface GlobalTexture
{
    name: string;
    texture: Texture;
}

type UniformType = "int" | "float" | "vec4" | "vec3" | "vec2" | "tex2d" | "color";
type UniformValueType<T extends UniformType> = (
    T extends "int" ? number
    : T extends "float" ? number
    : T extends "vec4" ? vec4
    : T extends "vec3" ? vec3
    : T extends "vec2" ? vec2
    : T extends "color" ? Color
    : Texture);
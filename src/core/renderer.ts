import { panicNull, getUniformsLocation } from "../utils/util";
import { DefaultMaterialType } from "./material-type";
import { makeDefaultMateiral, DefaultShaderResources } from "./builtin-asset";
import { setGL, GL } from "./global";
import { Mesh } from "./mesh";
import { vec3 } from "../types/vec3";
import { quat} from "gl-matrix";
import { Material } from "./material";
import { Color } from "../types/color";
import { mat4 } from "../types/mat4";

export class ZograRenderer
{
    canvas: HTMLCanvasElement;
    width: number;
    height: number;
    gl: WebGL2RenderingContext;
    DefaultMaterial: typeof DefaultMaterialType;

    viewProjectionMatrix = mat4.identity();

    constructor(canvasElement: HTMLCanvasElement, width?: number, height?: number)
    {
        this.canvas = canvasElement;
        this.width = width === undefined ? canvasElement.width : width;
        this.height = height === undefined ? canvasElement.height : height;
        this.canvas.width = this.width;
        this.canvas.height = this.height;

        this.gl = panicNull(this.canvas.getContext("webgl2"), "WebGL2 is not support on current device.");
        
        this.DefaultMaterial = null as any;// makeDefaultMateiral(this.gl);

        if (!GL())
            this.use();
    }

    use()
    {
        setGL(this.gl);
    }

    setViewProjection(mat: mat4)
    {
        this.viewProjectionMatrix = mat;
    }

    clear(color = Color.black, clearDepth = true)
    {
        this.gl.clearColor(color.r, color.g, color.b, color.a);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | (clearDepth ? this.gl.DEPTH_BUFFER_BIT : 0));
    }

    drawMesh(mesh: Mesh, transform: mat4, mateiral: Material)
    {
        const gl = this.gl;
        mateiral.setup(gl);

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
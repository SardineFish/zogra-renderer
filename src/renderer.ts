import { Shader } from "./shader";
import { panicNull, getUniformsLocation } from "./util";
import { DefaultMaterialType } from "./material-type";
import { makeDefaultMateiral, DefaultShaderResources } from "./builtin-asset";
import { setGL, GL } from "./global";
import { Mesh } from "./mesh";
import { vec3 } from "./types/vec3";
import { quat, mat4 } from "gl-matrix";
import { Material } from "./material";

export class ZograRenderer
{
    canvas: HTMLCanvasElement;
    width: number;
    height: number;
    gl: WebGL2RenderingContext;
    DefaultMaterial: typeof DefaultMaterialType;

    viewProjectionMatrix = mat4.create();

    constructor(canvasElement: HTMLCanvasElement, width?: number, height?: number)
    {
        this.canvas = canvasElement;
        this.width = width === undefined ? canvasElement.width : width;
        this.height = height === undefined ? canvasElement.height : height;
        this.gl = panicNull(this.canvas.getContext("webgl2"), "WebGL2 is not support on current device.");
        
        this.DefaultMaterial = makeDefaultMateiral(this.gl);
        mat4.identity(this.viewProjectionMatrix);

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

    drawMesh(mesh: Mesh, transform: mat4, mateiral: Material)
    {
        const gl = this.gl;
        mateiral.setup(gl);

        const program = mateiral.shader.program;
        const attributes = mateiral.shader.attributes;
        const locations = getUniformsLocation(gl, program, DefaultShaderResources.uniforms);

        const mvp = mat4.create();
        mat4.mul(mvp, transform, this.viewProjectionMatrix);

        // Setup transforms
        gl.uniformMatrix4fv(locations.matM, false, transform);
        gl.uniformMatrix4fv(locations.matVP, false, this.viewProjectionMatrix);
        gl.uniformMatrix4fv(locations.matMVP, false, mvp);
        
        const [vertBuffer, elementBuffer] = mesh.setup(gl);

        // Setup VAO
        const stride = 12 * 4;
        gl.bindBuffer(gl.ARRAY_BUFFER, vertBuffer);
        // vert: vec3
        gl.vertexAttribPointer(attributes.vert, 3, gl.FLOAT, false, stride, 0);
        gl.enableVertexAttribArray(attributes.vert);
        // color: vec4
        gl.vertexAttribPointer(attributes.color, 4, gl.FLOAT, false, stride, 3 * 4);
        gl.enableVertexAttribArray(attributes.color);
        // uv: vec2
        gl.vertexAttribPointer(attributes.uv, 2, gl.FLOAT, false, stride, 7 * 4);
        gl.enableVertexAttribArray(attributes.uv);
        // normal: vec3
        gl.vertexAttribPointer(attributes.normal, 3, gl.FLOAT, true, stride, 9 * 4);
        gl.enableVertexAttribArray(attributes.uv);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, elementBuffer);
        gl.drawElements(gl.TRIANGLES, mesh.triangles.length, gl.UNSIGNED_INT, 0);
    }
}
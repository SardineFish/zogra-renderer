import { panicNull } from "./util";

export class Shader
{
    gl: WebGL2RenderingContext;
    program: WebGLProgram;

    vertexShader: WebGLShader;
    fragmentShader: WebGLShader;

    private _compiled = false;

    get compiled() { return this._compiled; }
    
    constructor(gl: WebGL2RenderingContext, vertexShader: string, fragmentShader: string)
    {
        this.gl = gl;
        this.program = panicNull(gl.createProgram(), "Failed to create shader program");
        this.vertexShader = panicNull(gl.createShader(gl.VERTEX_SHADER), "Failed to create vertex shader");
        this.fragmentShader = panicNull(gl.createShader(gl.FRAGMENT_SHADER), "Failed to create fragment shader");
        gl.shaderSource(this.vertexShader, vertexShader);
        gl.shaderSource(this.fragmentShader, fragmentShader);
    }

    compile()
    {
        this.gl.compileShader(this.vertexShader);
        if (!this.gl.getShaderParameter(this.vertexShader, this.gl.COMPILE_STATUS))
        {
            throw new Error("Failed to compile vertex shader:\r\n" + this.gl.getShaderInfoLog(this.vertexShader));    
        }
        this.gl.compileShader(this.fragmentShader);
        if (!this.gl.getShaderParameter(this.vertexShader, this.gl.COMPILE_STATUS))
        {
            throw new Error("Failed to compile fragment shader:\r\n" + this.gl.getShaderInfoLog(this.fragmentShader));  
        }

        this.gl.attachShader(this.program, this.vertexShader);
        this.gl.attachShader(this.program, this.fragmentShader);
        this.gl.linkProgram(this.program);

        if (!this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS))
        {
            throw new Error("Failed to link shader program:\r\n" + this.gl.getProgramInfoLog(this.program));    
        }
    }
}
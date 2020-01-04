import { panicNull } from "./util";
import { GL } from "./global";
import { DefaultShaderResources } from "./builtin-asset";

interface AttributeBlock
{
    vert: number;
    color: number;
    uv: number;
    normal: number;
}

export interface ShaderAttributes
{
    [key: string]: string;
    vert: string;
    color: string;
    uv: string;
    normal: string;
}


export class Shader
{
    gl: WebGL2RenderingContext;
    program: WebGLProgram;

    vertexShader: WebGLShader;
    fragmentShader: WebGLShader;

    attributes: AttributeBlock;

    private _compiled = false;

    get compiled() { return this._compiled; }
    
    constructor(vertexShader: string, fragmentShader: string, attributes = DefaultShaderResources.attributes , gl = GL())
    {
        this.gl = gl;
        this.program = panicNull(gl.createProgram(), "Failed to create shader program");
        this.vertexShader = panicNull(gl.createShader(gl.VERTEX_SHADER), "Failed to create vertex shader");
        this.fragmentShader = panicNull(gl.createShader(gl.FRAGMENT_SHADER), "Failed to create fragment shader");
        gl.shaderSource(this.vertexShader, vertexShader);
        gl.shaderSource(this.fragmentShader, fragmentShader);
        this.compile();

        this.attributes = {
            vert: this.gl.getAttribLocation(this.program, attributes.vert),
            color: this.gl.getAttribLocation(this.program, attributes.color),
            uv: this.gl.getAttribLocation(this.program, attributes.uv),
            normal: this.gl.getAttribLocation(this.program, attributes.normal)
        };
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

import { vec3 } from "../types/vec3";
import { Color } from "../types/color";
import { Shader } from "./shader";
import { Asset } from "./asset";
export declare class Lines extends Asset {
    private _verts;
    private _colors;
    private _lines;
    private dirty;
    private vertices;
    private indices;
    VBO: WebGLBuffer;
    EBO: WebGLBuffer;
    private gl;
    constructor(gl?: WebGL2RenderingContext);
    get verts(): vec3[];
    set verts(verts: vec3[]);
    get colors(): Color[];
    set colors(colors: Color[]);
    get lines(): number[];
    set lines(lines: number[]);
    clear(): void;
    update(): void;
    bind(shader: Shader): void;
    destroy(): void;
}
export declare class LineBuilder {
    private verts;
    private colors;
    private lines;
    private gl;
    constructor(capacity?: number, gl?: WebGL2RenderingContext);
    addLine(line: [vec3, vec3], color?: Color): void;
    toLines(): Lines;
}

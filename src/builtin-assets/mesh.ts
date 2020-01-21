import { Mesh } from "../core/mesh";
import { vec3 } from "../types/vec3";
import { vec2 } from "../types/vec2";

export function createBuiltinMesh(gl: WebGL2RenderingContext)
{
    const quad = new Mesh(gl);
    quad.verts = [
        vec3(-.5, -.5, 0),
        vec3(.5, -.5, 0),
        vec3(.5, .5, 0),
        vec3(-.5, .5, 0),
    ];
    quad.triangles = [
        0, 1, 3,
        1, 2, 3,
    ];
    quad.uvs = [
        vec2(0, 0),
        vec2(1, 0),
        vec2(1, 1),
        vec2(0, 1)
    ];
    quad.calculateNormals();

    const screenQuad = new Mesh(gl);
    screenQuad.verts = [
        vec3(-1, -1, 0),
        vec3(1, -1, 0),
        vec3(1, 1, 0),
        vec3(-1, 1, 0),
    ];
    screenQuad.triangles = [
        0, 1, 3,
        1, 2, 3,
    ];
    screenQuad.uvs = [
        vec2(0, 0),
        vec2(1, 0),
        vec2(1, 1),
        vec2(0, 1)
    ];
    screenQuad.calculateNormals();

    return {
        quad: quad,
        screenQuad: screenQuad
    };
}
import frag from "!!raw-loader!./shader/default-frag.glsl";
import vert from "!!raw-loader!./shader/default-vert.glsl";
import { ZograRenderer, Mesh, vec3, MaterialFromShader, Shader, mat4, Color, shaderProp, rgb, materialType } from "zogra-renderer";
import "./css/base.css";

const canvas = document.querySelector("#canvas") as HTMLCanvasElement;

const renderer = new ZograRenderer(canvas, 1280, 720);

@materialType
class TestMaterial extends MaterialFromShader(new Shader(vert, frag))
{
    @shaderProp("uColor", "color")
    color = Color.white;
}
const material = new TestMaterial();
material.color = rgb(1, .5, .25);
const mesh = new Mesh();
mesh.verts = [
    vec3(0, 0, 0),
    vec3(1, 0, 0),
    vec3(1, 1, 0),
    vec3(0, 1, 0)
];
mesh.triangles = [
    0, 1, 2,
    2, 3, 0
];
mesh.calculateNormals(0);
renderer.clear();
renderer.drawMesh(mesh, mat4.identity(), material);
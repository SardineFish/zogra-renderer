import frag from "!!raw-loader!./shader/default-frag.glsl";
import vert from "!!raw-loader!./shader/default-vert.glsl";
import { ZograRenderer, Mesh, vec3, MaterialFromShader, Shader, mat4, Color, shaderProp, rgb, quat, vec2, materialDefine } from "zogra-renderer";
import "./css/base.css";
import { RenderTexture, Texture } from "zogra-engine";
import { FrameBuffer } from "zogra-engine";

const canvas = document.querySelector("#canvas") as HTMLCanvasElement;

const renderer = new ZograRenderer(canvas, 1280, 720);

@materialDefine
class TestMaterial extends MaterialFromShader(new Shader(vert, frag))
{
    @shaderProp("uColor", "color")
    color = Color.white;
    @shaderProp("uMainTex", "tex2d")
    texture: Texture | null = null;
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
mesh.uvs = [
    vec2(0, 0),
    vec2(1, 0),
    vec2(1, 1),
    vec2(0, 1)
];
mesh.triangles = [
    0, 1, 2,
    2, 3, 0
];
mesh.calculateNormals(0);

const rt = new RenderTexture(canvas.width, canvas.height, false);

renderer.setFramebuffer(rt);

renderer.setGlobalUniform("uColor", "color", Color.green);

renderer.clear();
renderer.drawMesh(mesh, mat4.rts(quat.identity(), vec3(-.5, -.5, 0), vec3(1, 1, 1)), material);

renderer.setFramebuffer(FrameBuffer.CanvasBuffer);

material.texture = rt;

renderer.clear();
renderer.drawMesh(mesh, mat4.rts(quat.identity(), vec3(-.5, -.5, 0), vec3(1, 1, 1)), material);
attribute vec3 aPos;
attribute vec3 aColor;
attribute vec2 aUV;

varying vec4 vColor;

uniform mat4 mvp;

void main()
{
    gl_Position = mul(mvp, vec4(aPos, 1.0));
    vColor = gl_Position.xy;
}
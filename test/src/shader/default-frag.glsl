#version 300 es
precision mediump float;

in vec4 vColor;
in vec4 vPos;
in vec2 vUV;

uniform mat4 uTransformMVP;

out vec4 fragColor;

void main()
{
    fragColor = vec4(vUV.xy, 0, 1);
}
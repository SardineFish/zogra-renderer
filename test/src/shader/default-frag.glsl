#version 300 es
precision mediump float;

in vec4 vColor;
in vec4 vPos;

uniform mat4 uTransformMVP;

out vec4 fragColor;

void main()
{
    fragColor = vColor;
}
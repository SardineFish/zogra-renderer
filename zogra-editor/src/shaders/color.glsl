#version 300 es
precision mediump float;

in vec4 vColor;
in vec4 vPos;
in vec2 vUV;

uniform vec4 uColor;

out vec4 fragColor;

void main()
{
    fragColor = vColor * uColor;
}
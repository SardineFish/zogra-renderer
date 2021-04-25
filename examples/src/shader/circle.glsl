#version 300 es
precision mediump float;

in vec4 vColor;
in vec2 vUV;

uniform sampler2D uMainTex;

out vec4 fragColor;

void main()
{
    float r = length(vUV.xy * vec2(2) - vec2(1));
    float c = smoothstep(1.0, 0.5, r);
    fragColor = vec4(c) * vColor;
}
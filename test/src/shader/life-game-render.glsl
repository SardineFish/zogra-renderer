#version 300 es
precision mediump float;

in vec4 vColor;
in vec4 vPos;
in vec2 vUV;
in vec3 vNormal;

uniform sampler2D uMainTex;
uniform vec2 uFlip;

out vec4 fragColor;

void main()
{
    vec2 uv = (uFlip * (vec2(1) - vUV)) + ((vec2(1) - uFlip) * vUV);
    fragColor = texture(uMainTex, uv).rgba;
}
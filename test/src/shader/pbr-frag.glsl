#version 300 es
precision mediump float;

in vec4 vColor;
in vec4 vPos;
in vec2 vUV;
in vec3 vNormal;

uniform sampler2D uMainTex;
uniform sampler2D uNormalTex;

uniform vec4 uColor;
uniform vec4 uEmission;
uniform vec4 uSpecular;
uniform float uMetallic;
uniform float uSmoothness;
uniform float uFresnel;

out vec4 fragColor;

void main()
{
    vec3 color = texture(uMainTex, vUV.xy).rgb;
    color = color * uColor.rgb;
    fragColor = vec4(vUV.xy, 0, 1.0f);
}
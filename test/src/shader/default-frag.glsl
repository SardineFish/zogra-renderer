#version 300 es
precision mediump float;

in vec4 vColor;
in vec4 vPos;
in vec2 vUV;

uniform mat4 uTransformMVP;
uniform sampler2D uMainTex;

out vec4 fragColor;

void main()
{
    vec3 color = texture(uMainTex, vUV.xy).rgb;
    color = 1. - color;
    fragColor = vec4(color, 1.0f);
}
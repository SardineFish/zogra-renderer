#version 300 es
precision mediump float;

in vec4 vColor;
in vec4 vPos;
in vec2 vUV;

uniform sampler2D uMainTex;
uniform vec4 uColor;

out vec4 fragColor;

void main()
{
    vec3 color = texture(uMainTex, vUV.xy).rgb;
    color = color * uColor;
    fragColor = vec4(color, 1.0f);
}
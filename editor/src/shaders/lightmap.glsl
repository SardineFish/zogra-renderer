#version 300 es
precision mediump float;

in vec4 vColor;
in vec4 vPos;
in vec2 vUV;

uniform vec4 uColor;
uniform sampler2D uLightMap;

out vec4 fragColor;

void main()
{
    fragColor = vec4(texture(uLightMap, vUV).rgb, 1);
}
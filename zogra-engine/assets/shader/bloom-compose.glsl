#version 300 es
precision mediump float;

in vec2 vUV;

uniform sampler2D uMainTex;
uniform float uIntensity;

out vec4 fragColor;

void main()
{
    fragColor = vec4(texture(uMainTex, vUV).rgb * vec3(uIntensity), 1.0);
}
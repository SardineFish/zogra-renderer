#version 300 es
precision mediump float;

in vec2 vUV;
uniform sampler2D uMainTex;

out vec4 fragColor;

void main()
{
    fragColor = texture(uMainTex, vUV).rgba;
}
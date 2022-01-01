#version 300 es
precision mediump float;

in vec4 vColor;
in vec4 vPos;
in vec2 vUV;
in vec3 vNormal;

uniform sampler2D uMainTex;
uniform vec4 uColor;
uniform vec3 uLightDir;
uniform vec3 uLightColor;

out vec4 fragColor;

void main()
{
    vec3 color = texture(uMainTex, vUV.xy).rgb;
    float lambertian = dot(vNormal, uLightDir);
    color = color * vec3(lambertian);

    fragColor = vec4(color, 1);
}
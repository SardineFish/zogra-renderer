#version 300 es
precision mediump float;

#define MAX_LIGHTS 8

in vec4 vColor;
in vec4 vPos;
in vec2 vUV;
in vec3 vNormal;
in vec3 vWorldPos;

uniform sampler2D uMainTex;
uniform vec4 uColor;
uniform vec4 uLightDir[MAX_LIGHTS];
uniform int uLightCount;
uniform vec4 uLightColor[MAX_LIGHTS];

out vec4 fragColor;

void main()
{
    vec4 color = uColor * vColor * texture(uMainTex, vUV.xy).rgba;

    vec3 light = vec3(0);
    for (int i = 0; i < uLightCount; ++i)
    {
        vec3 lightDir = normalize(uLightDir[i].xyz - vWorldPos.xyz * vec3(uLightDir[i].w));
        float lambertian = max(dot(vNormal, lightDir), 0.0);
        light += vec3(lambertian) * uLightColor[i].rgb;
    }

    color.rgb *= light.rgb;

    fragColor = color;
}
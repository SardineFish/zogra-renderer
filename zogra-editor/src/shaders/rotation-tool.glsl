#version 300 es
precision mediump float;

in vec4 vColor;
in vec4 vPos;
in vec2 vUV;
in vec3 vWorldPos;

uniform vec4 uColor;
uniform vec3 uCenter;
uniform vec3 uZDir;

out vec4 fragColor;

void main()
{
    float d = dot(uZDir, vWorldPos - uCenter);
    if(d > 0.3)
        fragColor = vec4(0);
    else
        fragColor = vColor * uColor;
}
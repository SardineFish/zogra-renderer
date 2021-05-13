#version 300 es
precision mediump float;

in vec3 aPos;
in vec2 aUV;
in vec4 aLightColor;
in vec4 aLightParams; // (volumn, range, attenuation, intensity)
in vec3 aLightPos;

uniform mat4 uTransformMVP;

out vec4 vLightColor;
out vec4 vLightParams; 
out vec3 vLightPos;
out vec4 vPos;
out vec2 vUV;

void main()
{
    gl_Position = uTransformMVP * vec4(aPos.xy * vec2(aLightParams.y) + aLightPos.xy, 0, 1);
    vPos = gl_Position;
    vUV = aUV;
    vLightParams = aLightParams;
    vLightColor = aLightColor;
    vLightPos = aLightPos;
}
#version 300 es
precision mediump float;

in vec3 aPos;
in vec2 aUV;
in vec4 aLightColor;
in vec4 aLightParams; // (volumn, range, attenuation, intensity)

uniform mat4 uTransformMVP;

out vec4 vLightColor;
out vec4 vLightParams; 
out vec4 vPos;
out vec2 vUV;

void main()
{
    gl_Position = uTransformMVP * vec4(aPos, 1);
    vPos = gl_Position;
    vColor = aColor;
    vUV = aUV;
    vLightParams = aLightParams;
    vLightColor = aLightColor;
}
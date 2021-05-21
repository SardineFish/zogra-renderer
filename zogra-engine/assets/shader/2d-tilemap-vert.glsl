#version 300 es
precision mediump float;

// Mesh data
in ivec2 aPos;
in vec2 aUV;
in vec3 aNormal;

// Instancing data
in vec4 aTileColor;
in vec4 aTileUV;
in ivec2 aTilePos;

uniform mat4 uTransformM;
uniform mat4 uTransformVP;
uniform mat4 uTransformMVP;
uniform mat4 uTransformM_IT;

out vec4 vPos;
out vec4 vColor;
out vec2 vUV;
out vec3 vNormal;
out vec3 vWorldPos;

void main()
{
    vec4 vertPos = vec4(aPos.xy + aTilePos.xy, 0, 1);
    gl_Position = uTransformMVP * vertPos;
    vPos = gl_Position;
    vColor = aTileColor;
    vUV = aTileUV.zw * aUV + aTileUV.xy;
    vNormal = (uTransformM_IT *  vec4(aNormal, 0)).xyz;
    vWorldPos = (uTransformM * vertPos).xyz;
}
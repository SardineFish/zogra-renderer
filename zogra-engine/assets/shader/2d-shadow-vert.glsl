#version 300 es
precision mediump float;

in vec3 aPos;
in vec4 aColor;
in vec2 aUV;
in vec3 aNormal;
in vec2 aP0;
in vec2 aP1;

uniform mat4 uTransformM;
uniform mat4 uTransformVP;
uniform mat4 uTransformMVP;
uniform mat4 uTransformM_IT;

out vec4 vColor;
out vec4 vPos;
out vec2 vUV;
out vec3 vNormal;
out vec3 vP;
out vec2 vP0;
out vec2 vP1;

void main()
{
    gl_Position = uTransformMVP * vec4(aPos, 1);
    vPos = gl_Position;
    vColor = aColor;
    vUV = aUV;
    vNormal = (uTransformM_IT *  vec4(aNormal, 0)).xyz;
    vP = aPos;
    vP0 = aP0;
    vP1 = aP1;
    
}
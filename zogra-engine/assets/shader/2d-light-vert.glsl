// #version 300 es
precision highp float;

attribute vec3 aPos;
attribute vec4 aColor;
attribute vec2 aUV;
attribute vec3 aNormal;

uniform mat4 uTransformM;
uniform mat4 uTransformVP;
uniform mat4 uTransformMVP;
uniform mat4 uTransformM_IT;

varying vec4 vColor;
varying vec4 vPos;
varying vec2 vUV;
varying vec3 vNormal;
varying vec3 vWorldPos;

void main()
{
    gl_Position = uTransformMVP * vec4(aPos, 1);
    vPos = gl_Position;
    vColor = aColor;
    vUV = aUV;
    vNormal = (uTransformM_IT *  vec4(aNormal, 0)).xyz;
    vWorldPos = (uTransformM * vec4(aPos, 1)).xyz;
    
}
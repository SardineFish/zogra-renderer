#version 300 es

in vec3 aPos;
in vec4 aColor;
in vec2 aUV;
in vec3 aNormal;

uniform mat4 uTransformM;
uniform mat4 uTransformVP;
uniform mat4 uTransformMVP;

out vec4 vColor;

uniform mat4 mvp;

void main()
{
    gl_Position = vec4(aPos, 1.0);
    vColor = vec4(1, 1, 1, 1);
}
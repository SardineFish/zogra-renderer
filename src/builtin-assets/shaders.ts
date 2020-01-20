import { ShaderAttributes } from "../core/shader";

const defaultVert = `#version 300 es
precision mediump float;

in vec3 aPos;
in vec4 aColor;
in vec2 aUV;
in vec3 aNormal;

uniform mat4 uTransformM;
uniform mat4 uTransformVP;
uniform mat4 uTransformMVP;

uniform vec4 uColor;
uniform vec2 uFlipUV;

out vec4 vColor;
out vec4 vPos;
out vec2 vUV;
out vec3 vNormal;

void main()
{
    gl_Position = uTransformMVP * vec4(aPos, 1);
    vColor = aColor * uColor;
    vUV = (uFlipUV * (vec2(1) - aUV)) + ((vec2(1) - uFlipUV) * aUV);
    vNormal = aNormal;
}
`;

const defaultFrag = `#version 300 es
precision mediump float;

in vec4 vColor;
in vec4 vPos;
in vec2 vUV;

uniform sampler2D uMainTex;
uniform vec4 uColor;

out vec4 fragColor;

void main()
{
    vec4 color = texture(uMainTex, vUV.xy).rgba;
    color = color * uColor;
    fragColor = color;
}
`;


const blitCopy = `#version 300 es
precision mediump float;

in vec4 vColor;
in vec4 vPos;
in vec2 vUV;
in vec3 vNormal;

uniform sampler2D uMainTex;

out vec4 fragColor;

void main()
{
    fragColor = texture(uMainTex, vUV).rgba;
}
`;


const DefaultShaderAttributes: ShaderAttributes =
{
    vert: "aPos",
    color: "aColor",
    uv: "aUV",
    normal: "aNormal",
};

export const BuiltinShaders = {
    DefaultVert: defaultVert,
    DefaultFrag: defaultFrag,
    BlitCopy: blitCopy,
    DefaultShaderAttributes: DefaultShaderAttributes
};

export const BuiltinUniforms = {
    matM: "uTransformM",
    matVP: "uTransformVP",
    matMVP: "uTransformMVP",
    flipUV: "uFlipUV",
};

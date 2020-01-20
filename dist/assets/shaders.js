"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const defaultVert = `
#version 300 es
precision mediump float;

in vec3 aPos;
in vec4 aColor;
in vec2 aUV;
in vec3 aNormal;

uniform mat4 uTransformM;
uniform mat4 uTransformVP;
uniform mat4 uTransformMVP;

uniform vec4 uColor;

out vec4 vColor;
out vec4 vPos;
out vec2 vUV;
out vec3 vNormal;

void main()
{
    gl_Position = uTransformMVP * vec4(aPos, 1);
    vColor = aColor * uColor;
    vUV = aUV;
    vNormal = aNormal;
}
`;
const defaultFrag = `
#version 300 es
precision mediump float;

in vec4 vColor;
in vec4 vPos;
in vec2 vUV;

uniform sampler2D uMainTex;
uniform vec4 uColor;

out vec4 fragColor;

void main()
{
    vec3 color = texture(uMainTex, vUV.xy).rgb;
    color = color * uColor;
    fragColor = vec4(color, 1.0f);
}
`;
const blitCopy = `
#version 300 es
precision mediump float;

in vec4 vColor;
in vec4 vPos;
in vec2 vUV;
in vec3 vNormal;

uniform sampler2D uMainTex;
uniform vec2 uFlip;

out vec4 fragColor;

void main()
{
    vec2 uv = uFlip * (vec2(1) - vUV) + (vec2(1) - uFlip) * vUV;
    fragColor = texture(uMainTex, uv).rgba;
}
`;
const DefaultShaderAttributes = {
    vert: "aPos",
    color: "aColor",
    uv: "aUV",
    normal: "aNormal",
};
exports.BuiltinShaders = {
    DefaultVert: defaultVert,
    DefaultFrag: defaultFrag,
    BlitCopy: blitCopy,
    DefaultShaderAttributes: DefaultShaderAttributes
};
//# sourceMappingURL=shaders.js.map
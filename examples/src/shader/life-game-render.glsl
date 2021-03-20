#version 300 es
precision mediump float;

in vec4 vColor;
in vec4 vPos;
in vec2 vUV;
in vec3 vNormal;

uniform sampler2D uMainTex;
uniform vec4 uTexelSize;
uniform float uBlockSize;
uniform vec2 uOffset;
uniform vec3 uSize;
uniform vec4 uBG;
uniform vec4 uFG;

out vec4 fragColor;

void main()
{
    vec2 uv = uOffset * uTexelSize.zw + vUV * uSize.xy / uBlockSize * uTexelSize.zw;
    float alpha = texture(uMainTex, uv).r;
    alpha *= uFG.a;

    fragColor = vec4(uBG.rgb * vec3(1.0 - alpha) + uFG.rgb * vec3(alpha), uBG.a);
}
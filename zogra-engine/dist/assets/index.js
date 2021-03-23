"use strict";
var a = Object.defineProperty;
var m = o => a(o, "__esModule", { value: !0 });
var s = (o, r) => { for (var e in r)
    a(o, e, { get: r[e], enumerable: !0 }); };
m(exports);
s(exports, { ShaderSource: () => n });
var v = `#version 300 es\r
precision mediump float;\r
\r
in vec3 aPos;\r
in vec4 aColor;\r
in vec2 aUV;\r
in vec3 aNormal;\r
\r
uniform mat4 uTransformM;\r
uniform mat4 uTransformVP;\r
uniform mat4 uTransformMVP;\r
uniform mat4 uTransformM_IT;\r
\r
out vec4 vColor;\r
out vec4 vPos;\r
out vec2 vUV;\r
out vec3 vNormal;\r
out vec3 vWorldPos;\r
\r
void main()\r
{\r
    gl_Position = uTransformMVP * vec4(aPos, 1);\r
    vPos = gl_Position;\r
    vColor = aColor;\r
    vUV = aUV;\r
    vNormal = (uTransformM_IT *  vec4(aNormal, 0)).xyz;\r
    vWorldPos = (uTransformM * vec4(aPos, 1)).xyz;\r
    \r
}`;
var i = `#version 300 es\r
precision mediump float;\r
\r
in vec4 vColor;\r
in vec4 vPos;\r
in vec2 vUV;\r
\r
uniform sampler2D uMainTex;\r
uniform vec4 uColor;\r
\r
out vec4 fragColor;\r
\r
void main()\r
{\r
    vec4 color = texture(uMainTex, vUV.xy).rgba;\r
    // color = color * vec3(uColor);\r
    fragColor = color.rgba;\r
}`;
var n = { default2D: [v, i] };
0 && (module.exports = { ShaderSource });
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map
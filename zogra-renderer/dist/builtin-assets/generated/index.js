"use strict";
var i = Object.defineProperty;
var u = o => i(o, "__esModule", { value: !0 });
var f = (o, r) => { for (var e in r)
    i(o, e, { get: r[e], enumerable: !0 }); };
u(exports);
f(exports, { BuiltinShaderSources: () => c });
var a = `#version 300 es\r
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
\r
out vec4 vColor;\r
out vec4 vPos;\r
out vec2 vUV;\r
out vec3 vNormal;\r
\r
void main()\r
{\r
    gl_Position = uTransformMVP * vec4(aPos, 1);\r
    vColor = aColor;\r
    vUV = aUV;\r
    vNormal = aNormal;\r
}`;
var v = `#version 300 es\r
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
    color = color * vColor * uColor;\r
    fragColor = color;\r
}`;
var l = `#version 300 es\r
precision mediump float;\r
\r
in vec4 vColor;\r
in vec4 vPos;\r
in vec2 vUV;\r
in vec3 vNormal;\r
\r
uniform sampler2D uMainTex;\r
\r
out vec4 fragColor;\r
\r
void main()\r
{\r
    fragColor = texture(uMainTex, vUV).rgba;\r
}`;
var n = `#version 300 es\r
precision mediump float;\r
\r
in vec4 vColor;\r
in vec4 vPos;\r
\r
out vec4 fragColor;\r
\r
void main()\r
{\r
    fragColor = vColor;\r
}`;
var m = `#version 300 es\r
precision mediump float;\r
\r
in vec3 aPos;\r
in vec4 aColor;\r
\r
uniform mat4 uTransformM;\r
uniform mat4 uTransformVP;\r
uniform mat4 uTransformMVP;\r
\r
out vec4 vColor;\r
out vec4 vPos;\r
\r
void main()\r
{\r
    gl_Position = uTransformMVP * vec4(aPos, 1);\r
    vColor = aColor;\r
}`;
var s = `#version 300 es\r
precision mediump float;\r
\r
in vec3 aPos;\r
in vec2 aUV;\r
\r
out vec2 vUV;\r
\r
void main()\r
{\r
    gl_Position = vec4(aPos, 1);\r
    vUV = vec2(aUV.x, vec2(1) - aUV.y);\r
}`;
var t = `#version 300 es\r
precision mediump float;\r
\r
in vec4 vPos;\r
in vec2 vUV;\r
\r
uniform sampler2D uMainTex;\r
\r
out vec4 fragColor;\r
\r
void main()\r
{\r
    fragColor = texture(uMainTex, vUV).rgba;\r
}`;
var c = { defaultVert: a, defaultFrag: v, blitCopy: l, colorFrag: n, colorVert: m, flipVert: s, texFrag: t };
0 && (module.exports = { BuiltinShaderSources });
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map
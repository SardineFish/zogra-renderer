"use strict";
var __defProp = Object.defineProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
    for (var name in all)
        __defProp(target, name, { get: all[name], enumerable: true });
};
// assets/index.ts
__markAsModule(exports);
__export(exports, {
    ShaderSource: () => ShaderSource
});
// assets/shader/2d-vert.glsl
var d_vert_default = "#version 300 es\r\nprecision mediump float;\r\n\r\nin vec3 aPos;\r\nin vec4 aColor;\r\nin vec2 aUV;\r\nin vec3 aNormal;\r\n\r\nuniform mat4 uTransformM;\r\nuniform mat4 uTransformVP;\r\nuniform mat4 uTransformMVP;\r\nuniform mat4 uTransformM_IT;\r\n\r\nout vec4 vColor;\r\nout vec4 vPos;\r\nout vec2 vUV;\r\nout vec3 vNormal;\r\nout vec3 vWorldPos;\r\n\r\nvoid main()\r\n{\r\n    gl_Position = uTransformMVP * vec4(aPos, 1);\r\n    vPos = gl_Position;\r\n    vColor = aColor;\r\n    vUV = aUV;\r\n    vNormal = (uTransformM_IT *  vec4(aNormal, 0)).xyz;\r\n    vWorldPos = (uTransformM * vec4(aPos, 1)).xyz;\r\n    \r\n}";
// assets/shader/2d-frag.glsl
var d_frag_default = "#version 300 es\r\nprecision mediump float;\r\n\r\nin vec4 vColor;\r\nin vec4 vPos;\r\nin vec2 vUV;\r\n\r\nuniform sampler2D uMainTex;\r\nuniform vec4 uColor;\r\n\r\nout vec4 fragColor;\r\n\r\nvoid main()\r\n{\r\n    vec4 color = texture(uMainTex, vUV.xy).rgba;\r\n    // color = color * vec3(uColor);\r\n    fragColor = color.rgba * vColor.rgba * uColor.rgba;\r\n    // fragColor = vec4(vUV.xy, 0, 1);\r\n}";
// assets/shader/particle-vert.glsl
var particle_vert_default = "#version 300 es\r\nprecision mediump float;\r\n\r\nin vec3 aPos;\r\nin vec4 aColor;\r\nin vec2 aUV;\r\nin vec3 aNormal;\r\n\r\nin vec3 particlePos;\r\nin vec3 particleRotation;\r\nin float particleSize;\r\n\r\nuniform mat4 uTransformM;\r\nuniform mat4 uTransformVP;\r\nuniform mat4 uTransformMVP;\r\nuniform mat4 uTransformM_IT;\r\n\r\nout vec4 vColor;\r\nout vec4 vPos;\r\nout vec2 vUV;\r\nout vec3 vNormal;\r\nout vec3 vWorldPos;\r\n\r\n#define PI (3.14159265358979323846264338327950288419716939937510)\r\n\r\nvec4 from_euler(float x, float y, float z)\r\n{\r\n    float halfToRad = PI / 360.0;\r\n    x *= halfToRad;\r\n    z *= halfToRad;\r\n    y *= halfToRad;\r\n\r\n    float sx = sin(x);\r\n    float cx = cos(x);\r\n    float sy = sin(y);\r\n    float cy = cos(y);\r\n    float sz = sin(z);\r\n    float cz = cos(z);\r\n\r\n    vec4 q;\r\n    q[0] = sx * cy * cz - cx * sy * sz;\r\n    q[1] = cx * sy * cz + sx * cy * sz;\r\n    q[2] = cx * cy * sz - sx * sy * cz;\r\n    q[3] = cx * cy * cz + sx * sy * sz;\r\n    return q;\r\n}\r\n\r\nmat4 from_rts(vec4 q, vec3 v, vec3 s)\r\n{\r\n    mat4 m;\r\n    float x = q[0];\r\n    float y = q[1];\r\n    float z = q[2];\r\n    float w = q[3];\r\n    float x2 = x + x;\r\n    float y2 = y + y;\r\n    float z2 = z + z;\r\n\r\n    float xx = x * x2;\r\n    float xy = x * y2;\r\n    float xz = x * z2;\r\n    float yy = y * y2;\r\n    float yz = y * z2;\r\n    float zz = z * z2;\r\n    float wx = w * x2;\r\n    float wy = w * y2;\r\n    float wz = w * z2;\r\n    float sx = s[0];\r\n    float sy = s[1];\r\n    float sz = s[2];\r\n\r\n    m[0][0] = (1.0 - (yy + zz)) * sx;\r\n    m[0][1] = (xy + wz) * sx;\r\n    m[0][2] = (xz - wy) * sx;\r\n    m[0][3] = 0.0;\r\n    m[1][0] = (xy - wz) * sy;\r\n    m[1][1] = (1.0 - (xx + zz)) * sy;\r\n    m[1][2] = (yz + wx) * sy;\r\n    m[1][3] = 0.0;\r\n    m[2][0] = (xz + wy) * sz;\r\n    m[2][1] = (yz - wx) * sz;\r\n    m[2][2] = (1.0 - (xx + yy)) * sz;\r\n    m[2][3] = 0.0;\r\n    m[3][0] = v[0];\r\n    m[3][1] = v[1];\r\n    m[3][2] = v[2];\r\n    m[3][3] = 1.0;\r\n\r\n    return m;\r\n}\r\n\r\nvoid main()\r\n{\r\n    vec4 rotation = from_euler(particleRotation.x, particleRotation.y, particleRotation.z);\r\n    mat4 rts = from_rts(rotation, particlePos, vec3(particleSize));\r\n    mat4 mvp = uTransformMVP * rts;\r\n    gl_Position = mvp * vec4(aPos, 1);\r\n    vPos = gl_Position;\r\n    vColor = aColor;\r\n    vUV = aUV;\r\n    vNormal = (uTransformM_IT *  vec4(aNormal, 0)).xyz;\r\n    vWorldPos = (uTransformM * vec4(aPos, 1)).xyz;\r\n    \r\n}";
// assets/shader/shader.ts
var ShaderSource = {
    default2D: [d_vert_default, d_frag_default],
    particle2D: [particle_vert_default, d_frag_default]
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
    ShaderSource
});
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map
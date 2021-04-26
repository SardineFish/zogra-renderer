var __defProp = Object.defineProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {get: all[name], enumerable: true});
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

// assets/shader/2d-shadow-vert.glsl
var d_shadow_vert_default = "#version 300 es\r\nprecision mediump float;\r\n\r\nin vec3 aPos;\r\nin vec4 aColor;\r\nin vec2 aUV;\r\nin vec3 aNormal;\r\nin vec2 aP0;\r\nin vec2 aP1;\r\n\r\nuniform mat4 uTransformM;\r\nuniform mat4 uTransformVP;\r\nuniform mat4 uTransformMVP;\r\nuniform mat4 uTransformM_IT;\r\n\r\nout vec4 vColor;\r\nout vec4 vPos;\r\nout vec2 vUV;\r\nout vec3 vNormal;\r\nout vec3 vP;\r\nout vec2 vP0;\r\nout vec2 vP1;\r\n\r\nvoid main()\r\n{\r\n    gl_Position = uTransformMVP * vec4(aPos, 1);\r\n    vPos = gl_Position;\r\n    vColor = aColor;\r\n    vUV = aUV;\r\n    vNormal = (uTransformM_IT *  vec4(aNormal, 0)).xyz;\r\n    vP = aPos;\r\n    vP0 = aP0;\r\n    vP1 = aP1;\r\n    \r\n}";

// assets/shader/2d-shadow-frag.glsl
var d_shadow_frag_default = "#version 300 es\r\nprecision mediump float;\r\n\r\nin vec4 vPos;\r\nin vec2 vP0;\r\nin vec2 vP1;\r\nin vec3 vP;\r\n\r\nuniform vec2 uLightPos;\r\nuniform float uVolumnSize;\r\nuniform float uLightRange;\r\n\r\nout float fragColor;\r\n\r\n#define PI (3.14)\r\n\r\n// See: https://www.geogebra.org/geometry/ysvegxsz\r\n\r\nbool circleTangent(vec2 p, vec2 center, float radius, out vec2 p1, out vec2 p2)\r\n{\r\n    float r2 = radius * radius;\r\n    float d2 = (p.x - center.x) * (p.x - center.x) + (p.y - center.y) * (p.y - center.y);\r\n    if (d2 < r2)\r\n        return false;\r\n\r\n    vec2 p0 = p - center;\r\n    p1 = vec2(r2 / d2) * p0 + vec2(radius / d2 * sqrt(d2 - r2)) * vec2(-p0.y, p0.x);\r\n    p2 = vec2(r2 / d2) * p0 - vec2(radius / d2 * sqrt(d2 - r2)) * vec2(-p0.y, p0.x);\r\n    p1 += center;\r\n    p2 += center;\r\n    return true;\r\n}\r\n\r\nfloat cross2(vec2 u, vec2 v)\r\n{\r\n	return cross(vec3(u, 0.0), vec3(v, 0.0)).z;\r\n}\r\nfloat saturate(float x)\r\n{\r\n    return clamp(x, 0.0, 1.0);\r\n    // return min(max(x, 0.0), 1.0);\r\n    if (x <= 0.0)\r\n        return 0.0;\r\n    else if (x >= 1.0)\r\n        return 1.0;\r\n    return x;\r\n}\r\n// Fix undefined result when x > 1\r\nfloat fixacos(float x) {\r\n    if (x >= 1.0)\r\n        return 0.0;\r\n    return acos(x);\r\n}\r\n\r\nvoid main()\r\n{\r\n    vec2 p = vP.xy;\r\n    vec2 p1, p2;\r\n    // p1 = uLightPos.xy;\r\n    // p2 = uLightPos.xy;\r\n    circleTangent(p, vec2(0), uVolumnSize, p1, p2);\r\n    vec2 right = normalize(p1 - p);\r\n    vec2 left = normalize(p2 - p);\r\n    vec2 u = normalize(vP1 - p);\r\n    vec2 v = normalize(vP0 - p);\r\n    if(cross2(v, u) < 0.0)\r\n    {\r\n        vec2 t = v;\r\n        v = u;\r\n        u = t;\r\n    }\r\n    \r\n	float leftLeak = saturate(sign(cross2(u, left))) * fixacos(dot(u, left));\r\n	float rightLeak = saturate(sign(cross2(right, v))) * fixacos(dot(right, v));\r\n    float total = acos(dot(right, left));\r\n\r\n\r\n    fragColor = 1.0 - (leftLeak + rightLeak) / total;\r\n}";

// assets/shader/2d-light-vert.glsl
var d_light_vert_default = "// #version 300 es\r\nprecision mediump float;\r\n\r\nattribute vec3 aPos;\r\nattribute vec4 aColor;\r\nattribute vec2 aUV;\r\nattribute vec3 aNormal;\r\n\r\nuniform mat4 uTransformM;\r\nuniform mat4 uTransformVP;\r\nuniform mat4 uTransformMVP;\r\nuniform mat4 uTransformM_IT;\r\n\r\nvarying vec4 vColor;\r\nvarying vec4 vPos;\r\nvarying vec2 vUV;\r\nvarying vec3 vNormal;\r\nvarying vec3 vWorldPos;\r\n\r\nvoid main()\r\n{\r\n    gl_Position = uTransformMVP * vec4(aPos, 1);\r\n    vPos = gl_Position;\r\n    vColor = aColor;\r\n    vUV = aUV;\r\n    vNormal = (uTransformM_IT *  vec4(aNormal, 0)).xyz;\r\n    vWorldPos = (uTransformM * vec4(aPos, 1)).xyz;\r\n    \r\n}";

// assets/shader/2d-light-frag.glsl
var d_light_frag_default = "// #version 300 es\r\nprecision mediump float;\r\n\r\n#define MAX_LIGHT 4\r\n\r\nvarying vec2 vUV;\r\n\r\nuniform vec4 uLightPosList[MAX_LIGHT];\r\nuniform vec4 uLightColorList[MAX_LIGHT];\r\nuniform vec4 uLightParamsList[MAX_LIGHT]; // (volumn, range, attenuation, intensity)\r\nuniform sampler2D uShadowMapList[MAX_LIGHT];\r\nuniform int uLightCount;\r\nuniform vec4 uCameraParams; // (pos.x, pos.y, viewWidth, viewHgith)\r\nuniform vec4 uAmbientLightColor;\r\n\r\n// out vec4 fragColor;\r\n\r\nfloat lightAttenuation(float r, float attenuation)\r\n{\r\n    if(attenuation <= -1.0)\r\n        return 0.0;\r\n    else if (attenuation <= 0.0)\r\n    {\r\n        float t = 1.0 / (attenuation + 1.0) - 1.0;\r\n        return exp(-r * t) - exp(-t) * r;\r\n    }\r\n    else if (attenuation < 1.0)\r\n    {\r\n        float t = 1.0 / (1.0 - attenuation) - 1.0;\r\n        r = 1.0 - r;\r\n        return 1.0 - (exp(-r * t) - exp(-t) * r);\r\n    }\r\n    else {\r\n        return r >= 1.0 ? 0.0 : 1.0;\r\n    }\r\n}\r\n\r\nvoid main()\r\n{\r\n    vec2 worldPos = (vUV - vec2(0.5)) * uCameraParams.zw + uCameraParams.xy;\r\n    for (int i = 0; i < MAX_LIGHT; i++)\r\n    {\r\n        float r = distance(uLightPosList[i].xy, worldPos);\r\n        r -= uLightParamsList[i].x;\r\n        r = r / (uLightParamsList[i].y -  uLightParamsList[i].x);\r\n        float light = lightAttenuation(clamp(r, 0.0, 1.0), uLightParamsList[i].z);\r\n        light *= uLightParamsList[i].w;\r\n        float shadow = texture2D(uShadowMapList[i], vUV.xy).r;\r\n        light *= 1.0 - shadow;\r\n        \r\n        gl_FragColor += vec4(light) * uLightColorList[i].rgba;\r\n    }\r\n    gl_FragColor += uAmbientLightColor;\r\n    \r\n}";

// assets/shader/box-blur.glsl
var box_blur_default = "#version 300 es\r\nprecision mediump float;\r\n\r\nin vec4 vColor;\r\nin vec4 vPos;\r\nin vec2 vUV;\r\n\r\nuniform sampler2D uMainTex;\r\nuniform vec4 uTexSize; // (w, h, 1/w, 1/h)\r\nuniform float uSampleOffset;\r\n\r\nout vec4 fragColor;\r\n\r\nvoid main()\r\n{\r\n    vec2 delta = vec2(-uSampleOffset, uSampleOffset);\r\n    vec4 color = \r\n      texture(uMainTex, clamp(vUV.xy + uTexSize.zw * delta.xx, vec2(0), vec2(1)))\r\n    + texture(uMainTex, clamp(vUV.xy + uTexSize.zw * delta.yx, vec2(0), vec2(1)))\r\n    + texture(uMainTex, clamp(vUV.xy + uTexSize.zw * delta.yy, vec2(0), vec2(1)))\r\n    + texture(uMainTex, clamp(vUV.xy + uTexSize.zw * delta.xy, vec2(0), vec2(1)));\r\n\r\n    color /= vec4(4.0);\r\n\r\n    fragColor = color.rgba;\r\n}";

// assets/shader/bloom-filter.glsl
var bloom_filter_default = "#version 300 es\r\nprecision mediump float;\r\n\r\nin vec2 vUV;\r\nuniform sampler2D uMainTex;\r\nuniform float uThreshold;\r\nuniform float uSoftThreshold;\r\n\r\nout vec4 fragColor;\r\n\r\n// Ref: https://catlikecoding.com/unity/tutorials/advanced-rendering/bloom/\r\nvoid main()\r\n{\r\n    vec3 color =  texture(uMainTex, vUV).rgb;\r\n    float brightness = max(color.r, max(color.g, color.b));\r\n    float knee = uThreshold * uSoftThreshold;\r\n    float soft = brightness - uThreshold + knee;\r\n    soft = clamp(soft, 0.0, 2.0 * knee);\r\n    soft = soft * soft / (4.0 * knee + 0.00001);\r\n\r\n    float contribution = max(soft, brightness - uThreshold);\r\n	contribution /= max(brightness, 0.00001);\r\n\r\n    color = contribution * color;\r\n\r\n\r\n\r\n    fragColor = vec4(color.rgb, 1.0);\r\n}";

// assets/shader/blit-copy.glsl
var blit_copy_default = "#version 300 es\r\nprecision mediump float;\r\n\r\nin vec2 vUV;\r\nuniform sampler2D uMainTex;\r\n\r\nout vec4 fragColor;\r\n\r\nvoid main()\r\n{\r\n    fragColor = texture(uMainTex, vUV).rgba;\r\n}";

// assets/shader/bloom-compose.glsl
var bloom_compose_default = "#version 300 es\r\nprecision mediump float;\r\n\r\nin vec2 vUV;\r\n\r\nuniform sampler2D uMainTex;\r\nuniform float uIntensity;\r\n\r\nout vec4 fragColor;\r\n\r\nvoid main()\r\n{\r\n    fragColor = vec4(texture(uMainTex, vUV).rgb * vec3(uIntensity), 1.0);\r\n}";

// assets/shader/shader.ts
var ShaderSource = {
  default2D: [d_vert_default, d_frag_default],
  particle2D: [particle_vert_default, d_frag_default],
  shadow2D: [d_shadow_vert_default, d_shadow_frag_default],
  light2D: [d_light_vert_default, d_light_frag_default],
  boxBlur: [d_vert_default, box_blur_default],
  bloomFilter: [d_vert_default, bloom_filter_default],
  bloomCompose: [d_vert_default, bloom_compose_default],
  blitCopy: [d_vert_default, blit_copy_default]
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ShaderSource
});
//# sourceMappingURL=index.js.map

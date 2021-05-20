var o = `#version 300 es\r
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
var r = `#version 300 es\r
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
    fragColor = color.rgba * vColor.rgba * uColor.rgba;\r
    // fragColor = vec4(vUV.xy, 0, 1);\r
}`;
var t = `#version 300 es\r
precision mediump float;\r
\r
in vec3 aPos;\r
in vec4 aColor;\r
in vec2 aUV;\r
in vec3 aNormal;\r
\r
in vec3 particlePos;\r
in vec3 particleRotation;\r
in float particleSize;\r
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
#define PI (3.14159265358979323846264338327950288419716939937510)\r
\r
vec4 from_euler(float x, float y, float z)\r
{\r
    float halfToRad = PI / 360.0;\r
    x *= halfToRad;\r
    z *= halfToRad;\r
    y *= halfToRad;\r
\r
    float sx = sin(x);\r
    float cx = cos(x);\r
    float sy = sin(y);\r
    float cy = cos(y);\r
    float sz = sin(z);\r
    float cz = cos(z);\r
\r
    vec4 q;\r
    q[0] = sx * cy * cz - cx * sy * sz;\r
    q[1] = cx * sy * cz + sx * cy * sz;\r
    q[2] = cx * cy * sz - sx * sy * cz;\r
    q[3] = cx * cy * cz + sx * sy * sz;\r
    return q;\r
}\r
\r
mat4 from_rts(vec4 q, vec3 v, vec3 s)\r
{\r
    mat4 m;\r
    float x = q[0];\r
    float y = q[1];\r
    float z = q[2];\r
    float w = q[3];\r
    float x2 = x + x;\r
    float y2 = y + y;\r
    float z2 = z + z;\r
\r
    float xx = x * x2;\r
    float xy = x * y2;\r
    float xz = x * z2;\r
    float yy = y * y2;\r
    float yz = y * z2;\r
    float zz = z * z2;\r
    float wx = w * x2;\r
    float wy = w * y2;\r
    float wz = w * z2;\r
    float sx = s[0];\r
    float sy = s[1];\r
    float sz = s[2];\r
\r
    m[0][0] = (1.0 - (yy + zz)) * sx;\r
    m[0][1] = (xy + wz) * sx;\r
    m[0][2] = (xz - wy) * sx;\r
    m[0][3] = 0.0;\r
    m[1][0] = (xy - wz) * sy;\r
    m[1][1] = (1.0 - (xx + zz)) * sy;\r
    m[1][2] = (yz + wx) * sy;\r
    m[1][3] = 0.0;\r
    m[2][0] = (xz + wy) * sz;\r
    m[2][1] = (yz - wx) * sz;\r
    m[2][2] = (1.0 - (xx + yy)) * sz;\r
    m[2][3] = 0.0;\r
    m[3][0] = v[0];\r
    m[3][1] = v[1];\r
    m[3][2] = v[2];\r
    m[3][3] = 1.0;\r
\r
    return m;\r
}\r
\r
void main()\r
{\r
    vec4 rotation = from_euler(particleRotation.x, particleRotation.y, particleRotation.z);\r
    mat4 rts = from_rts(rotation, particlePos, vec3(particleSize));\r
    mat4 mvp = uTransformMVP * rts;\r
    gl_Position = mvp * vec4(aPos, 1);\r
    vPos = gl_Position;\r
    vColor = aColor;\r
    vUV = aUV;\r
    vNormal = (uTransformM_IT *  vec4(aNormal, 0)).xyz;\r
    vWorldPos = (uTransformM * vec4(aPos, 1)).xyz;\r
    \r
}`;
var a = `#version 300 es\r
precision mediump float;\r
\r
in vec3 aPos;\r
in vec4 aColor;\r
in vec2 aUV;\r
in vec3 aNormal;\r
in vec2 aP0;\r
in vec2 aP1;\r
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
out vec3 vP;\r
out vec2 vP0;\r
out vec2 vP1;\r
\r
void main()\r
{\r
    gl_Position = uTransformMVP * vec4(aPos, 1);\r
    vPos = gl_Position;\r
    vColor = aColor;\r
    vUV = aUV;\r
    vNormal = (uTransformM_IT *  vec4(aNormal, 0)).xyz;\r
    vP = aPos;\r
    vP0 = aP0;\r
    vP1 = aP1;\r
    \r
}`;
var e = `#version 300 es\r
precision mediump float;\r
\r
in vec4 vPos;\r
in vec2 vP0;\r
in vec2 vP1;\r
in vec3 vP;\r
\r
uniform vec2 uLightPos;\r
uniform float uVolumnSize;\r
uniform float uLightRange;\r
\r
out float fragColor;\r
\r
#define PI (3.14)\r
\r
// See: https://www.geogebra.org/geometry/ysvegxsz\r
\r
bool circleTangent(vec2 p, vec2 center, float radius, out vec2 p1, out vec2 p2)\r
{\r
    float r2 = radius * radius;\r
    float d2 = (p.x - center.x) * (p.x - center.x) + (p.y - center.y) * (p.y - center.y);\r
    if (d2 < r2)\r
        return false;\r
\r
    vec2 p0 = p - center;\r
    p1 = vec2(r2 / d2) * p0 + vec2(radius / d2 * sqrt(d2 - r2)) * vec2(-p0.y, p0.x);\r
    p2 = vec2(r2 / d2) * p0 - vec2(radius / d2 * sqrt(d2 - r2)) * vec2(-p0.y, p0.x);\r
    p1 += center;\r
    p2 += center;\r
    return true;\r
}\r
\r
float cross2(vec2 u, vec2 v)\r
{\r
	return cross(vec3(u, 0.0), vec3(v, 0.0)).z;\r
}\r
float saturate(float x)\r
{\r
    return clamp(x, 0.0, 1.0);\r
    // return min(max(x, 0.0), 1.0);\r
    if (x <= 0.0)\r
        return 0.0;\r
    else if (x >= 1.0)\r
        return 1.0;\r
    return x;\r
}\r
// Fix undefined result when x > 1\r
float fixacos(float x) {\r
    if (x >= 1.0)\r
        return 0.0;\r
    return acos(x);\r
}\r
\r
void main()\r
{\r
    vec2 p = vP.xy;\r
    vec2 p1, p2;\r
    // p1 = uLightPos.xy;\r
    // p2 = uLightPos.xy;\r
    circleTangent(p, vec2(0), uVolumnSize, p1, p2);\r
    vec2 right = normalize(p1 - p);\r
    vec2 left = normalize(p2 - p);\r
    vec2 u = normalize(vP1 - p);\r
    vec2 v = normalize(vP0 - p);\r
    if(cross2(v, u) < 0.0)\r
    {\r
        vec2 t = v;\r
        v = u;\r
        u = t;\r
    }\r
    \r
	float leftLeak = saturate(sign(cross2(u, left))) * fixacos(dot(u, left));\r
	float rightLeak = saturate(sign(cross2(right, v))) * fixacos(dot(right, v));\r
    float total = acos(dot(right, left));\r
\r
\r
    fragColor = 1.0 - (leftLeak + rightLeak) / total;\r
}`;
var i = `// #version 300 es\r
precision mediump float;\r
\r
attribute vec3 aPos;\r
attribute vec4 aColor;\r
attribute vec2 aUV;\r
attribute vec3 aNormal;\r
\r
uniform mat4 uTransformM;\r
uniform mat4 uTransformVP;\r
uniform mat4 uTransformMVP;\r
uniform mat4 uTransformM_IT;\r
\r
varying vec4 vColor;\r
varying vec4 vPos;\r
varying vec2 vUV;\r
varying vec3 vNormal;\r
varying vec3 vWorldPos;\r
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
var n = `// #version 300 es\r
precision mediump float;\r
\r
#define MAX_LIGHT 4\r
\r
varying vec2 vUV;\r
\r
uniform vec4 uLightPosList[MAX_LIGHT];\r
uniform vec4 uLightColorList[MAX_LIGHT];\r
uniform vec4 uLightParamsList[MAX_LIGHT]; // (volumn, range, attenuation, intensity)\r
uniform sampler2D uShadowMapList[MAX_LIGHT];\r
uniform int uLightCount;\r
uniform vec4 uCameraParams; // (pos.x, pos.y, viewWidth, viewHgith)\r
uniform vec4 uAmbientLightColor;\r
\r
// out vec4 fragColor;\r
\r
float lightAttenuation(float r, float attenuation)\r
{\r
    if(attenuation <= -1.0)\r
        return 0.0;\r
    else if (attenuation <= 0.0)\r
    {\r
        float t = 1.0 / (attenuation + 1.0) - 1.0;\r
        return exp(-r * t) - exp(-t) * r;\r
    }\r
    else if (attenuation < 1.0)\r
    {\r
        float t = 1.0 / (1.0 - attenuation) - 1.0;\r
        r = 1.0 - r;\r
        return 1.0 - (exp(-r * t) - exp(-t) * r);\r
    }\r
    else {\r
        return r >= 1.0 ? 0.0 : 1.0;\r
    }\r
}\r
\r
void main()\r
{\r
    vec2 worldPos = (vUV - vec2(0.5)) * uCameraParams.zw + uCameraParams.xy;\r
    for (int i = 0; i < MAX_LIGHT; i++)\r
    {\r
        float r = distance(uLightPosList[i].xy, worldPos);\r
        r -= uLightParamsList[i].x;\r
        r = r / (uLightParamsList[i].y -  uLightParamsList[i].x);\r
        float light = lightAttenuation(clamp(r, 0.0, 1.0), uLightParamsList[i].z);\r
        light *= uLightParamsList[i].w;\r
        float shadow = texture2D(uShadowMapList[i], vUV.xy).r;\r
        light *= 1.0 - shadow;\r
        \r
        gl_FragColor += vec4(light) * uLightColorList[i].rgba;\r
    }\r
    gl_FragColor += uAmbientLightColor;\r
    \r
}`;
var l = `#version 300 es\r
precision mediump float;\r
\r
in vec4 vColor;\r
in vec4 vPos;\r
in vec2 vUV;\r
\r
uniform sampler2D uMainTex;\r
uniform vec4 uTexSize; // (w, h, 1/w, 1/h)\r
uniform float uSampleOffset;\r
\r
out vec4 fragColor;\r
\r
void main()\r
{\r
    vec2 delta = vec2(-uSampleOffset, uSampleOffset);\r
    vec4 color = \r
      texture(uMainTex, clamp(vUV.xy + uTexSize.zw * delta.xx, vec2(0), vec2(1)))\r
    + texture(uMainTex, clamp(vUV.xy + uTexSize.zw * delta.yx, vec2(0), vec2(1)))\r
    + texture(uMainTex, clamp(vUV.xy + uTexSize.zw * delta.yy, vec2(0), vec2(1)))\r
    + texture(uMainTex, clamp(vUV.xy + uTexSize.zw * delta.xy, vec2(0), vec2(1)));\r
\r
    color /= vec4(4.0);\r
\r
    fragColor = color.rgba;\r
}`;
var s = `#version 300 es\r
precision mediump float;\r
\r
in vec2 vUV;\r
uniform sampler2D uMainTex;\r
uniform float uThreshold;\r
uniform float uSoftThreshold;\r
\r
out vec4 fragColor;\r
\r
// Ref: https://catlikecoding.com/unity/tutorials/advanced-rendering/bloom/\r
void main()\r
{\r
    vec3 color =  texture(uMainTex, vUV).rgb;\r
    float brightness = max(color.r, max(color.g, color.b));\r
    float knee = uThreshold * uSoftThreshold;\r
    float soft = brightness - uThreshold + knee;\r
    soft = clamp(soft, 0.0, 2.0 * knee);\r
    soft = soft * soft / (4.0 * knee + 0.00001);\r
\r
    float contribution = max(soft, brightness - uThreshold);\r
	contribution /= max(brightness, 0.00001);\r
\r
    color = contribution * color;\r
\r
\r
\r
    fragColor = vec4(color.rgb, 1.0);\r
}`;
var v = `#version 300 es\r
precision mediump float;\r
\r
in vec2 vUV;\r
uniform sampler2D uMainTex;\r
\r
out vec4 fragColor;\r
\r
void main()\r
{\r
    fragColor = texture(uMainTex, vUV).rgba;\r
}`;
var m = `#version 300 es\r
precision mediump float;\r
\r
in vec2 vUV;\r
\r
uniform sampler2D uMainTex;\r
uniform float uIntensity;\r
\r
out vec4 fragColor;\r
\r
void main()\r
{\r
    fragColor = vec4(texture(uMainTex, vUV).rgb * vec3(uIntensity), 1.0);\r
}`;
var u = `#version 300 es\r
precision mediump float;\r
\r
in vec3 aPos;\r
in vec2 aUV;\r
in vec4 aLightColor;\r
in vec4 aLightParams; // (volumn, range, attenuation, intensity)\r
in vec3 aLightPos;\r
\r
uniform mat4 uTransformMVP;\r
\r
out vec4 vLightColor;\r
out vec4 vLightParams; \r
out vec3 vLightPos;\r
out vec4 vPos;\r
out vec2 vUV;\r
\r
void main()\r
{\r
    gl_Position = uTransformMVP * vec4(aPos.xy * vec2(aLightParams.y) + aLightPos.xy, 0, 1);\r
    vPos = gl_Position;\r
    vUV = aUV;\r
    vLightParams = aLightParams;\r
    vLightColor = aLightColor;\r
    vLightPos = aLightPos;\r
}`;
var c = `#version 300 es\r
precision mediump float;\r
\r
in vec4 vLightColor;\r
in vec4 vLightParams; // (volumn, range, attenuation, intensity)\r
in vec4 vPos;\r
in vec2 vUV;\r
\r
out vec4 fragColor;\r
\r
float lightAttenuation(float r, float range, float volumn, float attenuation)\r
{\r
    r -= volumn;\r
    r /= range - volumn;\r
    if(attenuation <= -1.0)\r
        return 0.0;\r
    else if (attenuation <= 0.0)\r
    {\r
        float t = 1.0 / (attenuation + 1.0) - 1.0;\r
        return exp(-r * t) - exp(-t) * r;\r
    }\r
    else if (attenuation < 1.0)\r
    {\r
        float t = 1.0 / (1.0 - attenuation) - 1.0;\r
        r = 1.0 - r;\r
        return 1.0 - (exp(-r * t) - exp(-t) * r);\r
    }\r
    else {\r
        return r >= 1.0 ? 0.0 : 1.0;\r
    }\r
}\r
\r
void main()\r
{\r
    float r = length(vUV * vec2(2) - vec2(1)) * vLightParams.y;\r
    float attenuation = lightAttenuation(r, vLightParams.y, vLightParams.x, vLightParams.z);\r
    attenuation = max(attenuation, 0.0);\r
    attenuation *= vLightParams.w;\r
    vec3 color = vLightColor.rgb * vec3(attenuation);\r
\r
    fragColor = vec4(color, 1);\r
    // fragColor = vec4(1);\r
}`;
var f = { default2D: [o, r], particle2D: [t, r], shadow2D: [a, e], light2D: [i, n], light2DSimple: [u, c], boxBlur: [o, l], bloomFilter: [o, s], bloomCompose: [o, m], blitCopy: [o, v] };
export { f as ShaderSource };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map
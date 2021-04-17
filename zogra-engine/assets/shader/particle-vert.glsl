#version 300 es
precision mediump float;

in vec3 aPos;
in vec4 aColor;
in vec2 aUV;
in vec3 aNormal;

in vec3 particlePos;
in vec3 particleRotation;
in float particleSize;

uniform mat4 uTransformM;
uniform mat4 uTransformVP;
uniform mat4 uTransformMVP;
uniform mat4 uTransformM_IT;

out vec4 vColor;
out vec4 vPos;
out vec2 vUV;
out vec3 vNormal;
out vec3 vWorldPos;

#define PI (3.14159265358979323846264338327950288419716939937510)

vec4 from_euler(float x, float y, float z)
{
    float halfToRad = PI / 360.0;
    x *= halfToRad;
    z *= halfToRad;
    y *= halfToRad;

    float sx = sin(x);
    float cx = cos(x);
    float sy = sin(y);
    float cy = cos(y);
    float sz = sin(z);
    float cz = cos(z);

    vec4 q;
    q[0] = sx * cy * cz - cx * sy * sz;
    q[1] = cx * sy * cz + sx * cy * sz;
    q[2] = cx * cy * sz - sx * sy * cz;
    q[3] = cx * cy * cz + sx * sy * sz;
    return q;
}

mat4 from_rts(vec4 q, vec3 v, vec3 s)
{
    mat4 m;
    float x = q[0];
    float y = q[1];
    float z = q[2];
    float w = q[3];
    float x2 = x + x;
    float y2 = y + y;
    float z2 = z + z;

    float xx = x * x2;
    float xy = x * y2;
    float xz = x * z2;
    float yy = y * y2;
    float yz = y * z2;
    float zz = z * z2;
    float wx = w * x2;
    float wy = w * y2;
    float wz = w * z2;
    float sx = s[0];
    float sy = s[1];
    float sz = s[2];

    m[0][0] = (1.0 - (yy + zz)) * sx;
    m[0][1] = (xy + wz) * sx;
    m[0][2] = (xz - wy) * sx;
    m[0][3] = 0.0;
    m[1][0] = (xy - wz) * sy;
    m[1][1] = (1.0 - (xx + zz)) * sy;
    m[1][2] = (yz + wx) * sy;
    m[1][3] = 0.0;
    m[2][0] = (xz + wy) * sz;
    m[2][1] = (yz - wx) * sz;
    m[2][2] = (1.0 - (xx + yy)) * sz;
    m[2][3] = 0.0;
    m[3][0] = v[0];
    m[3][1] = v[1];
    m[3][2] = v[2];
    m[3][3] = 1.0;

    return m;
}

void main()
{
    vec4 rotation = from_euler(particleRotation.x, particleRotation.y, particleRotation.z);
    mat4 rts = from_rts(rotation, particlePos, vec3(particleSize));
    mat4 mvp = uTransformMVP * rts;
    gl_Position = mvp * vec4(aPos, 1);
    vPos = gl_Position;
    vColor = aColor;
    vUV = aUV;
    vNormal = (uTransformM_IT *  vec4(aNormal, 0)).xyz;
    vWorldPos = (uTransformM * vec4(aPos, 1)).xyz;
    
}
#version 300 es
precision highp float;

in vec4 vPos;
in vec2 vP0;
in vec2 vP1;
in vec3 vP;

uniform vec2 uLightPos;
uniform float uVolumnSize;
uniform float uLightRange;

out float fragColor;

#define PI (3.14)

// See: https://www.geogebra.org/geometry/ysvegxsz

bool circleTangent(vec2 p, vec2 center, float radius, out vec2 p1, out vec2 p2)
{
    float r2 = radius * radius;
    float d2 = (p.x - center.x) * (p.x - center.x) + (p.y - center.y) * (p.y - center.y);
    if (d2 < r2)
        return false;

    vec2 p0 = p - center;
    p1 = vec2(r2 / d2) * p0 + vec2(radius / d2 * sqrt(d2 - r2)) * vec2(-p0.y, p0.x);
    p2 = vec2(r2 / d2) * p0 - vec2(radius / d2 * sqrt(d2 - r2)) * vec2(-p0.y, p0.x);
    p1 += center;
    p2 += center;
    return true;
}

float cross2(vec2 u, vec2 v)
{
	return cross(vec3(u, 0.0), vec3(v, 0.0)).z;
}
float saturate(float x)
{
    return clamp(x, 0.0, 1.0);
    // return min(max(x, 0.0), 1.0);
    if (x <= 0.0)
        return 0.0;
    else if (x >= 1.0)
        return 1.0;
    return x;
}
// Fix undefined result when x > 1
float fixacos(float x) {
    if (x >= 1.0)
        return 0.0;
    return acos(x);
}

void main()
{
    vec2 p = vP.xy;
    vec2 p1, p2;
    // p1 = uLightPos.xy;
    // p2 = uLightPos.xy;
    circleTangent(p, vec2(0), uVolumnSize, p1, p2);
    vec2 right = normalize(p1 - p);
    vec2 left = normalize(p2 - p);
    vec2 u = normalize(vP1 - p);
    vec2 v = normalize(vP0 - p);
    if(cross2(v, u) < 0.0)
    {
        vec2 t = v;
        v = u;
        u = t;
    }
    
	float leftLeak = saturate(sign(cross2(u, left))) * fixacos(dot(u, left));
	float rightLeak = saturate(sign(cross2(right, v))) * fixacos(dot(right, v));
    float total = acos(dot(right, left));


    fragColor = 1.0 - (leftLeak + rightLeak) / total;
}
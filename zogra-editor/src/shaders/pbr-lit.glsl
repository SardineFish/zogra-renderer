#version 300 es
precision mediump float;

#define PI (3.14159265358979323846264338327950288419716939937510)

in vec4 vColor;
in vec4 vPos;
in vec2 vUV;
in vec3 vNormal;
in vec3 vWorldPos;

uniform sampler2D uMainTex;
uniform sampler2D uNormalTex;

uniform vec4 uColor;
uniform vec4 uEmission;
uniform vec4 uSpecular;
uniform float uMetallic;
uniform float uSmoothness;
uniform float uFresnel;

uniform vec4 uAmbientSky;
uniform vec4 uLightColor;
uniform vec3 uLightPos;
uniform vec3 uLightDir;
uniform vec3 uCameraPos;

out vec4 fragColor;

// --------- Diffuse ----------

vec3 lambert(vec3 baseColor)
{
    return baseColor / vec3(PI);
}

vec3 disney(vec3 baseColor, float roughness, float hl, float nl, float nv)
{
    float fd90 = 0.5 + 2.0 * pow(hl, 2.0) * roughness;
    return baseColor / vec3(PI * (1.0 + (fd90 - 1.0) * pow(1.0 - nl, 5.0)) * (1.0 + (fd90 - 1.0) * pow(1.0 - nv, 5.0)));
}

vec3 orenNayar(vec3 albedo, float sigma, float nl, float nv, float lv)
{
    float sigma_2 = pow(sigma, 2.0);
	vec3 A = vec3(1.0 - 0.5 * sigma_2 / (sigma_2 + 0.33)) + albedo * vec3(0.17 * sigma_2 / (sigma_2 + 0.13));
	vec3 B = vec3(0.45 * sigma_2 / (sigma_2 + 0.09));
	float s = lv - nl * nv;
	vec3 t = s <= 0.0
		? vec3(1.0)
		: vec3(max(nl, nv));
    return albedo / vec3(PI * (A + B * vec3(s) / t));
}

// --------- Specular ---------

float schlick(float f0, float hl)
{
    return f0 + (1.0 - f0) * pow(1.0 - hl, 5.0);
}
float normalDistrGGX(float roughness, float nh)
{
    float alpha_2 = pow(roughness, 4.0);
    return alpha_2 / (PI * pow(pow(nh, 2.0) * (alpha_2 - 1.0) + 1.0, 2.0));
}
float smithGGX(float roughness, float nv)
{
    float alpha_2 = pow(roughness, 4.0);
    return 2.0 / (nv + sqrt(alpha_2 + (1.0 - alpha_2) * pow(nv, 2.0)));
}
float specularGGX(float roughness, float f0, float nh, float nl, float nv, float hl)
{
    float F = schlick(f0, hl);
    float D = normalDistrGGX(roughness, nh);
    float G = smithGGX(roughness, nl) * smithGGX(roughness, nv);
    return max(0.0, F * G * D / 4.0);
}

float fresnelFunc(float f0, float nv, float p)
{
    return f0 + (1.0 - f0) * pow(1.0 - nv, p);
}

float saturate(float v)
{
    return clamp(v, 0.0, 1.0);
}

void main()
{
    float roughness = 1.0 - uSmoothness;
    float f0 = uMetallic;
    vec3 albedo = vColor.rgb;
    vec3 ambient = uAmbientSky.rgb;
    vec3 normal = normalize(vNormal);
    vec3 lightDir = normalize(uLightDir);
    vec3 viewDir = normalize(uCameraPos - vWorldPos);

    vec3 halfDir = normalize(lightDir + viewDir);
    float nv = saturate(dot(normal, viewDir));
    float nl = saturate(dot(normal, lightDir));
	float nh = saturate(dot(normal, halfDir));
	float lv = saturate(dot(lightDir, viewDir));
	float hl = saturate(dot(halfDir, lightDir));

    vec3 light = uLightColor.rgb;

    vec3 diffuse = disney(albedo.rgb, roughness, hl, nl, nv) * vec3(PI * nl) * light + ambient;
    vec3 specular = specularGGX(roughness, f0, nh, nl, nv, hl) * vec3(PI * nl) * light * uSpecular.rgb;
    vec3 fresnel = vec3(1.0 - f0);
    vec3 color = diffuse * fresnel + specular;
    
    fragColor = vec4(color.rgb, 1.0);
}
#version 300 es
precision mediump float;

in vec4 vLightColor;
in vec4 vLightParams; // (volumn, range, attenuation, intensity)
in vec4 vPos;
in vec2 vUV;

out vec4 fragColor;

float lightAttenuation(float r, float range, float volumn, float attenuation)
{
    r -= volumn;
    r /= range - volumn;
    if(attenuation <= -1.0)
        return 0.0;
    else if (attenuation <= 0.0)
    {
        float t = 1.0 / (attenuation + 1.0) - 1.0;
        return exp(-r * t) - exp(-t) * r;
    }
    else if (attenuation < 1.0)
    {
        float t = 1.0 / (1.0 - attenuation) - 1.0;
        r = 1.0 - r;
        return 1.0 - (exp(-r * t) - exp(-t) * r);
    }
    else {
        return r >= 1.0 ? 0.0 : 1.0;
    }
}

void main()
{
    float r = length(vUV * vec2(2) - vec2(1)) * vLightParams.y;
    float attenuation = lightAttenuation(r, vLightParams.y, vLightParams.x, vLightParams.z);
    attenuation = max(attenuation, 0.0);
    attenuation *= vLightParams.w;
    vec3 color = vLightColor.rgb * vec3(attenuation);

    fragColor = vec4(color, 1);
    // fragColor = vec4(1);
}
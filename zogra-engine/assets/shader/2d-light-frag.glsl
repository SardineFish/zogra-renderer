// #version 300 es
precision mediump float;

#define MAX_LIGHT 4

varying vec2 vUV;

uniform vec4 uLightPosList[MAX_LIGHT];
uniform vec4 uLightColorList[MAX_LIGHT];
uniform vec4 uLightParamsList[MAX_LIGHT]; // (volumn, range, attenuation)
uniform sampler2D uShadowMapList[MAX_LIGHT];
uniform int uLightCount;
uniform vec4 uCameraParams; // (pos.x, pos.y, viewWidth, viewHgith)

// out vec4 fragColor;

float lightAttenuation(float r, float range, float volumn, float attenuation)
{
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
    vec2 worldPos = (vUV - vec2(0.5)) * uCameraParams.zw + uCameraParams.xy;
    for (int i = 0; i < 4; i++)
    {
        float r = distance(uLightPosList[i].xy, worldPos);
        r = r / uLightParamsList[i].y;
        float light = lightAttenuation(clamp(r, 0.0, 1.0), uLightParamsList[i].y, uLightParamsList[i].x, uLightParamsList[i].z);
        float shadow = texture2D(uShadowMapList[i], vUV.xy).r;
        light *= 1.0 - shadow;
        
        gl_FragColor += vec4(light) * uLightColorList[i].rgba;
    }
    
}
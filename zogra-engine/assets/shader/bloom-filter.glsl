#version 300 es
precision mediump float;

in vec2 vUV;
uniform sampler2D uMainTex;
uniform float uThreshold;
uniform float uSoftThreshold;

out vec4 fragColor;

// Ref: https://catlikecoding.com/unity/tutorials/advanced-rendering/bloom/
void main()
{
    vec3 color =  texture(uMainTex, vUV).rgb;
    float brightness = max(color.r, max(color.g, color.b));
    float knee = uThreshold * uSoftThreshold;
    float soft = brightness - uThreshold + knee;
    soft = clamp(soft, 0.0, 2.0 * knee);
    soft = soft * soft / (4.0 * knee + 0.00001);

    float contribution = max(soft, brightness - uThreshold);
	contribution /= max(brightness, 0.00001);

    color = contribution * color;



    fragColor = vec4(color.rgb, 1.0);
}
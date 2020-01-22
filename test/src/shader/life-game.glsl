#version 300 es
precision mediump float;

in vec4 vColor;
in vec4 vPos;
in vec2 vUV;

uniform vec4 uSize;
uniform sampler2D uLastFrame;

layout (location = 0) out vec4 nextFrame;
//layout (location = 1) out vec4 fragColor;

float clampTex(vec2 pos)
{
    float col = texture(uLastFrame, pos).r;
    vec2 clmp = step(vec2(0), pos) * (vec2(1) - step(vec2(1), pos));
    return clmp.x * clmp.y * col;
}

int neighbors(vec2 pos)
{
    int n = 0;
    vec3 delta = vec3(-1, 0, 1);
    n += int(step(.5, clampTex(pos + uSize.zw * delta.xx)));
    n += int(step(.5, clampTex(pos + uSize.zw * delta.xy)));
    n += int(step(.5, clampTex(pos + uSize.zw * delta.xz)));
    n += int(step(.5, clampTex(pos + uSize.zw * delta.yx)));
    n += int(step(.5, clampTex(pos + uSize.zw * delta.yz)));
    n += int(step(.5, clampTex(pos + uSize.zw * delta.zx)));
    n += int(step(.5, clampTex(pos + uSize.zw * delta.zy)));
    n += int(step(.5, clampTex(pos + uSize.zw * delta.zz)));
    return n;
}

void main()
{
    float current = step(.5, texture(uLastFrame, vUV).r);
    int n = neighbors(vUV);
    if(current == 1.0)
    {
        if(n < 2)
            nextFrame = vec4(0);
        else if (n > 3)
            nextFrame = vec4(0);
        else
            nextFrame = vec4(current);
    }
    else
    {
        if(n == 3)
            nextFrame = vec4(1);
    }
    //nextFrame = vec4(1.0 - current);
    // vec2 pos = vUV;
    // vec3 color = vec3(texture(uLastFrame, vUV).rrr);
    // color = vec3(vUV, 0);
    // fragColor = vec4(current, current, current, 1);
}
#version 300 es
precision mediump float;

in vec4 vColor;
in vec4 vPos;
in vec2 vUV;

uniform vec4 uSize;
uniform float uBlockSize;
uniform sampler2D uLastFrame;

layout (location = 0) out vec4 nextFrame;
layout (location = 1) out vec4 fragColor;

int neighbors(vec2 pos)
{
    int n = 0;
    vec3 delta = vec3(-1, 0, 1);
    n += int(step(.5, texture(uLastFrame, pos + uSize.zw * delta.xx).r));
    n += int(step(.5, texture(uLastFrame, pos + uSize.zw * delta.xy).r));
    n += int(step(.5, texture(uLastFrame, pos + uSize.zw * delta.xz).r));
    n += int(step(.5, texture(uLastFrame, pos + uSize.zw * delta.yx).r));
    n += int(step(.5, texture(uLastFrame, pos + uSize.zw * delta.yz).r));
    n += int(step(.5, texture(uLastFrame, pos + uSize.zw * delta.zx).r));
    n += int(step(.5, texture(uLastFrame, pos + uSize.zw * delta.zy).r));
    n += int(step(.5, texture(uLastFrame, pos + uSize.zw * delta.zz).r));
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
    vec2 pos = vUV;
    vec3 color = vec3(texture(uLastFrame, vUV).rrr);
    color = vec3(vUV, 0);
    fragColor = vec4(current, current, current, 1);
}
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Light2DPass = void 0;
const zogra_renderer_1 = require("zogra-renderer");
const light_2d_1 = require("../2d/rendering/light-2d");
const assets_1 = require("../assets");
const render_pass_1 = require("./render-pass");
class Light2DPass extends render_pass_1.RenderPass {
    constructor(context, pipelineSettings) {
        super();
        this.light2DShadowMaterial = new Light2DWithShadow();
        this.lightComposeMaterial = new Light2DCompose();
        this.settings = pipelineSettings;
        this.lightmap = new zogra_renderer_1.RenderTexture(context.screen.width, context.screen.height, false, zogra_renderer_1.TextureFormat.RGBA16F, zogra_renderer_1.FilterMode.Linear);
    }
    render(context, data) {
        const lightList = data.scene.getEntitiesOfType(light_2d_1.Light2D);
        const shadowLights = lightList.filter(light => light.shadowType === light_2d_1.ShadowType.Hard || light.shadowType === light_2d_1.ShadowType.Soft);
        const simpleLights = lightList.filter(light => light.shadowType === false);
        context.renderer.setFramebuffer(this.lightmap);
        context.renderer.clear(zogra_renderer_1.Color.black);
        this.drawShadowLights(context, data, shadowLights);
        // this.drawSimpleLights(context, data, simpleLights);
        context.renderer.blit(this.lightmap, data.cameraOutput, this.lightComposeMaterial);
    }
    drawSimpleLights(context, data, simpleLights) {
    }
    drawShadowLights(context, data, shadowLights) {
        for (let i = 0; i < this.light2DShadowMaterial.lightParamsList.length; i++)
            this.light2DShadowMaterial.lightParamsList[i].fill(0);
        for (let i = 0; i < shadowLights.length; i++) {
            const light = shadowLights[i];
            this.light2DShadowMaterial.lightPosList[i] = this.light2DShadowMaterial.lightPosList[i] || zogra_renderer_1.vec4.zero();
            zogra_renderer_1.vec4.set(this.light2DShadowMaterial.lightPosList[i], light.position);
            this.light2DShadowMaterial.lightPosList[i].w = 1;
            this.light2DShadowMaterial.lightParamsList[i] = this.light2DShadowMaterial.lightParamsList[i] || zogra_renderer_1.vec4.zero();
            this.light2DShadowMaterial.lightParamsList[i].x = light.volumnRadius;
            this.light2DShadowMaterial.lightParamsList[i].y = light.lightRange;
            this.light2DShadowMaterial.lightParamsList[i].z = light.attenuation;
            this.light2DShadowMaterial.lightParamsList[i].w = light.intensity;
            this.light2DShadowMaterial.lightColorList[i] = this.light2DShadowMaterial.lightColorList[i] || zogra_renderer_1.Color.white;
            this.light2DShadowMaterial.lightColorList[i].set(light.lightColor);
            this.light2DShadowMaterial.shadowMapList[i] = light.getShadowMap(context, data);
        }
        this.light2DShadowMaterial.lightCount = shadowLights.length;
        this.light2DShadowMaterial.cameraParams.x = data.camera.position.x;
        this.light2DShadowMaterial.cameraParams.y = data.camera.position.y;
        this.light2DShadowMaterial.cameraParams.z = data.camera.viewHeight * 2 * data.camera.aspectRatio;
        this.light2DShadowMaterial.cameraParams.w = data.camera.viewHeight * 2;
        this.light2DShadowMaterial.ambientLightColor = this.settings.ambientLightColor;
        context.renderer.blit(null, this.lightmap, this.light2DShadowMaterial);
    }
}
exports.Light2DPass = Light2DPass;
class Light2DWithShadow extends zogra_renderer_1.MaterialFromShader(new zogra_renderer_1.Shader(...assets_1.ShaderSource.light2D, {
    blend: [zogra_renderer_1.Blending.One, zogra_renderer_1.Blending.Zero],
    depth: zogra_renderer_1.DepthTest.Disable,
    zWrite: false,
})) {
    constructor() {
        super(...arguments);
        this.lightPosList = [];
        this.lightColorList = [];
        this.lightParamsList = [];
        this.shadowMapList = [];
        this.lightCount = 0;
        this.cameraParams = zogra_renderer_1.vec4.zero();
        this.ambientLightColor = zogra_renderer_1.Color.white;
    }
}
__decorate([
    zogra_renderer_1.shaderProp("uLightPosList", "vec4[]")
], Light2DWithShadow.prototype, "lightPosList", void 0);
__decorate([
    zogra_renderer_1.shaderProp("uLightColorList", "color[]")
], Light2DWithShadow.prototype, "lightColorList", void 0);
__decorate([
    zogra_renderer_1.shaderProp("uLightParamsList", "vec4[]")
], Light2DWithShadow.prototype, "lightParamsList", void 0);
__decorate([
    zogra_renderer_1.shaderProp("uShadowMapList", "tex2d[]")
], Light2DWithShadow.prototype, "shadowMapList", void 0);
__decorate([
    zogra_renderer_1.shaderProp("uLightCount", "int")
], Light2DWithShadow.prototype, "lightCount", void 0);
__decorate([
    zogra_renderer_1.shaderProp("uCameraParams", "vec4")
], Light2DWithShadow.prototype, "cameraParams", void 0);
__decorate([
    zogra_renderer_1.shaderProp("uAmbientLightColor", "color")
], Light2DWithShadow.prototype, "ambientLightColor", void 0);
class Light2DCompose extends zogra_renderer_1.MaterialFromShader(new zogra_renderer_1.Shader(...assets_1.ShaderSource.blitCopy, {
    blend: [zogra_renderer_1.Blending.DstColor, zogra_renderer_1.Blending.Zero],
    depth: zogra_renderer_1.DepthTest.Disable,
    zWrite: false,
})) {
}
//# sourceMappingURL=2d-light-pass.js.map
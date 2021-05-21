var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Blending, Color, DefaultVertexData, DepthTest, FilterMode, GLArrayBuffer, MaterialFromShader, MeshBuilder, RenderTexture, Shader, shaderProp, TextureFormat, TextureResizing, vec2, vec3, vec4, VertexStruct } from "zogra-renderer";
import { Light2D, ShadowType } from "../../2d/rendering/light-2d";
import { ShaderSource } from "../../assets";
import { RenderPass } from "./render-pass";
export class Light2DPass extends RenderPass {
    constructor(context, pipelineSettings) {
        super();
        this.light2DShadowMaterial = new Light2DWithShadow();
        this.lightComposeMaterial = new Light2DCompose();
        this.lightInstancingMaterial = new Light2DSimpleInstancing();
        this.lightInstancingBuffer = new GLArrayBuffer(Light2DInstancingStruct, 64);
        this.settings = pipelineSettings;
        this.lightmap = new RenderTexture(context.screen.width, context.screen.height, false, TextureFormat.RGBA16F, FilterMode.Linear);
        this.simpleLightMesh = MeshBuilder.quad(vec2.zero(), vec2(2));
        this.lightInstancingBuffer.static = false;
    }
    render(context, data) {
        if (!data.cameraOutput.size.equals(this.lightmap.size))
            this.lightmap.resize(data.cameraOutput.width, data.cameraOutput.height, TextureResizing.Discard);
        const lightList = data.scene.getEntitiesOfType(Light2D);
        const shadowLights = lightList.filter(light => light.shadowType === ShadowType.Hard || light.shadowType === ShadowType.Soft);
        const simpleLights = lightList.filter(light => light.shadowType === false);
        context.renderer.setFramebuffer(this.lightmap);
        context.renderer.clear(Color.black);
        this.drawShadowLights(context, data, shadowLights);
        this.drawSimpleLights(context, data, simpleLights);
        context.renderer.blit(this.lightmap, data.cameraOutput, this.lightComposeMaterial);
    }
    drawSimpleLights(context, data, simpleLights) {
        if (simpleLights.length > this.lightInstancingBuffer.length)
            this.lightInstancingBuffer.resize(this.lightInstancingBuffer.length * 2);
        for (let i = 0; i < simpleLights.length; i++) {
            vec4.set(this.lightInstancingBuffer[i].lightColor, simpleLights[i].lightColor);
            vec3.set(this.lightInstancingBuffer[i].lightPos, simpleLights[i].position);
            this.lightInstancingBuffer[i].lightParams[0] = simpleLights[i].volumnRadius;
            this.lightInstancingBuffer[i].lightParams[1] = simpleLights[i].lightRange;
            this.lightInstancingBuffer[i].lightParams[2] = simpleLights[i].attenuation;
            this.lightInstancingBuffer[i].lightParams[3] = simpleLights[i].intensity;
        }
        context.renderer.drawMeshInstance(this.simpleLightMesh, this.lightInstancingBuffer, this.lightInstancingMaterial, simpleLights.length);
    }
    drawShadowLights(context, data, shadowLights) {
        for (let i = 0; i < this.light2DShadowMaterial.lightParamsList.length; i++)
            this.light2DShadowMaterial.lightParamsList[i].fill(0);
        for (let i = 0; i < shadowLights.length; i++) {
            const light = shadowLights[i];
            this.light2DShadowMaterial.lightPosList[i] = this.light2DShadowMaterial.lightPosList[i] || vec4.zero();
            vec4.set(this.light2DShadowMaterial.lightPosList[i], light.position);
            this.light2DShadowMaterial.lightPosList[i].w = 1;
            this.light2DShadowMaterial.lightParamsList[i] = this.light2DShadowMaterial.lightParamsList[i] || vec4.zero();
            this.light2DShadowMaterial.lightParamsList[i].x = light.volumnRadius;
            this.light2DShadowMaterial.lightParamsList[i].y = light.lightRange;
            this.light2DShadowMaterial.lightParamsList[i].z = light.attenuation;
            this.light2DShadowMaterial.lightParamsList[i].w = light.intensity;
            this.light2DShadowMaterial.lightColorList[i] = this.light2DShadowMaterial.lightColorList[i] || Color.white;
            this.light2DShadowMaterial.lightColorList[i].set(light.lightColor);
            this.light2DShadowMaterial.shadowMapList[i] = light.getShadowMap(context, data);
        }
        this.light2DShadowMaterial.lightCount = shadowLights.length;
        this.light2DShadowMaterial.cameraParams.x = data.camera.position.x;
        this.light2DShadowMaterial.cameraParams.y = data.camera.position.y;
        this.light2DShadowMaterial.cameraParams.z = data.camera.viewHeight * 2 * data.camera.aspectRatio;
        this.light2DShadowMaterial.cameraParams.w = data.camera.viewHeight * 2;
        vec4.mul(this.light2DShadowMaterial.ambientLightColor, this.settings.ambientLightColor, this.settings.ambientIntensity);
        context.renderer.blit(null, this.lightmap, this.light2DShadowMaterial);
    }
}
class Light2DWithShadow extends MaterialFromShader(new Shader(...ShaderSource.light2D, {
    blend: [Blending.One, Blending.Zero],
    depth: DepthTest.Disable,
    zWrite: false,
})) {
    constructor() {
        super(...arguments);
        this.lightPosList = [];
        this.lightColorList = [];
        this.lightParamsList = [];
        this.shadowMapList = [];
        this.lightCount = 0;
        this.cameraParams = vec4.zero();
        this.ambientLightColor = Color.white;
    }
}
__decorate([
    shaderProp("uLightPosList", "vec4[]")
], Light2DWithShadow.prototype, "lightPosList", void 0);
__decorate([
    shaderProp("uLightColorList", "color[]")
], Light2DWithShadow.prototype, "lightColorList", void 0);
__decorate([
    shaderProp("uLightParamsList", "vec4[]")
], Light2DWithShadow.prototype, "lightParamsList", void 0);
__decorate([
    shaderProp("uShadowMapList", "tex2d[]")
], Light2DWithShadow.prototype, "shadowMapList", void 0);
__decorate([
    shaderProp("uLightCount", "int")
], Light2DWithShadow.prototype, "lightCount", void 0);
__decorate([
    shaderProp("uCameraParams", "vec4")
], Light2DWithShadow.prototype, "cameraParams", void 0);
__decorate([
    shaderProp("uAmbientLightColor", "color")
], Light2DWithShadow.prototype, "ambientLightColor", void 0);
class Light2DCompose extends MaterialFromShader(new Shader(...ShaderSource.blitCopy, {
    blend: [Blending.DstColor, Blending.Zero],
    depth: DepthTest.Disable,
    zWrite: false,
})) {
}
const Light2DInstancingStruct = VertexStruct({
    lightPos: "vec3",
    lightParams: "vec4",
    lightColor: "vec4",
});
class Light2DSimpleInstancing extends MaterialFromShader(new Shader(...ShaderSource.light2DSimple, {
    vertexStructure: Object.assign(Object.assign({}, DefaultVertexData), Light2DInstancingStruct),
    attributes: {
        lightPos: "aLightPos",
        lightColor: "aLightColor",
        lightParams: "aLightParams",
    },
    blend: [Blending.One, Blending.One],
})) {
}
//# sourceMappingURL=2d-light-pass.js.map
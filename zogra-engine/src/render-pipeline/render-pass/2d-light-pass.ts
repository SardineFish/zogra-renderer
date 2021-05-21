import { Blending, Color, DefaultVertexData, DepthTest, FilterMode, FrameBuffer, GLArrayBuffer, MaterialFromShader, Mesh, MeshBuilder, RenderTexture, Shader, shaderProp, Texture, TextureFormat, TextureResizing, vec2, vec3, vec4, VertexStruct } from "zogra-renderer";
import { Light2D, ShadowType } from "../../2d/rendering/light-2d";
import { ShaderSource } from "../../assets";
import { Camera } from "../../engine/camera";
import { RenderObject } from "../../engine/render-object";
import { Scene } from "../../engine/scene";
import { IPhysicsSystem } from "../../physics/physics-generic";
import { Default2DRenderPipeline } from "../2d-default";
import { RenderData, RenderOrder } from "../render-data";
import { RenderPass } from "./render-pass";
import { RenderContext } from "../render-pipeline";

export class Light2DPass extends RenderPass
{
    lightmap: RenderTexture;
    light2DShadowMaterial = new Light2DWithShadow();
    lightComposeMaterial = new Light2DCompose();
    lightInstancingMaterial = new Light2DSimpleInstancing();
    settings: Default2DRenderPipeline;
    lightInstancingBuffer = new GLArrayBuffer(Light2DInstancingStruct, 64);
    simpleLightMesh: Mesh;

    constructor(context: RenderContext, pipelineSettings: Default2DRenderPipeline)
    {
        super();

        this.settings = pipelineSettings;
        this.lightmap = new RenderTexture(
            context.screen.width,
            context.screen.height,
            false,
            TextureFormat.RGBA16F,
            FilterMode.Linear
        );
        this.simpleLightMesh = MeshBuilder.quad(vec2.zero(), vec2(2));
        this.lightInstancingBuffer.static = false;
    }

    render(context: RenderContext, data: RenderData): void
    {
        if (!data.cameraOutput.size.equals(this.lightmap.size))
            this.lightmap.resize(data.cameraOutput.width, data.cameraOutput.height, TextureResizing.Discard);
        
        const lightList = data.scene.getEntitiesOfType(Light2D);
        const shadowLights = lightList.filter(light => light.shadowType === ShadowType.Hard || light.shadowType === ShadowType.Soft);
        const simpleLights = lightList.filter(light => light.shadowType === false);

        context.renderer.setFramebuffer(this.lightmap);
        context.renderer.clear(Color.black);

        this.drawShadowLights(context, data, shadowLights);
        // this.drawSimpleLights(context, data, simpleLights);

        context.renderer.blit(this.lightmap, data.cameraOutput, this.lightComposeMaterial);
    }

    private drawSimpleLights(context: RenderContext, data: RenderData, simpleLights: Light2D[])
    {
        if (simpleLights.length > this.lightInstancingBuffer.length)
            this.lightInstancingBuffer.resize(this.lightInstancingBuffer.length * 2);
        for (let i = 0; i < simpleLights.length; i++)
        {
            vec4.set(this.lightInstancingBuffer[i].lightColor, simpleLights[i].lightColor);
            vec3.set(this.lightInstancingBuffer[i].lightPos, simpleLights[i].position);
            this.lightInstancingBuffer[i].lightParams[0] = simpleLights[i].volumnRadius;
            this.lightInstancingBuffer[i].lightParams[1] = simpleLights[i].lightRange;
            this.lightInstancingBuffer[i].lightParams[2] = simpleLights[i].attenuation;
            this.lightInstancingBuffer[i].lightParams[3] = simpleLights[i].intensity;
        }

        context.renderer.drawMeshInstance(this.simpleLightMesh, this.lightInstancingBuffer, this.lightInstancingMaterial, simpleLights.length);

    }

    private drawShadowLights(context: RenderContext, data: RenderData, shadowLights: Light2D[])
    {
        for (let i = 0; i < this.light2DShadowMaterial.lightParamsList.length; i++)
            this.light2DShadowMaterial.lightParamsList[i].fill(0);
        for (let i = 0; i < shadowLights.length; i++)
        {
            const light = shadowLights[i];

            this.light2DShadowMaterial.lightPosList[i] = this.light2DShadowMaterial.lightPosList[i] || vec4.zero();
            vec4.set(this.light2DShadowMaterial.lightPosList[i], light.position as unknown as vec4);
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
}))
{
    @shaderProp("uLightPosList", "vec4[]")
    lightPosList: vec4[] = [];

    @shaderProp("uLightColorList", "color[]")
    lightColorList: Color[] = [];

    @shaderProp("uLightParamsList", "vec4[]")
    lightParamsList: vec4[] = [];

    @shaderProp("uShadowMapList", "tex2d[]")
    shadowMapList: Array<Texture | null> = [];

    @shaderProp("uLightCount", "int")
    lightCount: number = 0;

    @shaderProp("uCameraParams", "vec4")
    cameraParams: vec4 = vec4.zero();

    @shaderProp("uAmbientLightColor", "color")
    ambientLightColor = Color.white;
}

class Light2DCompose extends MaterialFromShader(new Shader(...ShaderSource.blitCopy, {
    blend: [Blending.DstColor, Blending.Zero],
    depth: DepthTest.Disable,
    zWrite: false,
}))
{

}

const Light2DInstancingStruct = VertexStruct({
    lightPos: "vec3",
    lightParams: "vec4",
    lightColor: "vec4",
});

class Light2DSimpleInstancing extends MaterialFromShader(new Shader(...ShaderSource.light2DSimple, {
    vertexStructure: {
        ...DefaultVertexData,
        ...Light2DInstancingStruct,
    },
    attributes: {
        lightPos: "aLightPos",
        lightColor: "aLightColor",
        lightParams: "aLightParams",
    },
    blend: [Blending.One, Blending.One],
}))
{

}
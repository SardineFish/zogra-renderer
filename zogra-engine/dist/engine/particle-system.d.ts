import { Color, Material, Mesh, Texture, vec2, vec3, vec4, Vector3, ShaderAttributeNames } from "zogra-renderer";
import { RenderObject } from "./render-object";
import { Time } from "./engine";
declare const ParticleVertStruct: {
    vert: "vec3";
    color: "vec4";
    normal: "vec3";
    uv: "vec2";
    uv2: "vec2";
    pos: "vec3";
    rotation: "vec3";
    size: "float";
};
declare const ParticleMaterial_base: new (gl?: WebGL2RenderingContext | undefined) => Material<{
    vert: "vec3";
    color: "vec4";
    normal: "vec3";
    uv: "vec2";
    uv2: "vec2";
    pos: "vec3";
    rotation: "vec3";
    size: "float";
}>;
export declare class ParticleMaterial extends ParticleMaterial_base {
    color: Color;
    texture: Texture | null;
}
export interface Particle {
    pos: vec3;
    rotation: vec3;
    velocity: vec3;
    size: number;
    color: Color;
}
export declare type ParticleScalarGenerator = ((system: ParticleSystem) => number) | [number, number] | number;
export declare type ParticleScalarModifier = null | [number, number] | ((lifetime: number) => number);
export declare type ParticleEmitter = (system: ParticleSystem, center: Readonly<vec3>, dirOut: vec3, posOut: vec3) => void;
export declare type ParticlePropertySettings<T, U> = T extends Color ? {
    r: U;
    g: U;
    b: U;
    a: U;
} | ((lifetime: number, system: ParticleSystem) => Color) : T extends vec4 ? {
    x: U;
    y: U;
    z: U;
    w: U;
} | ((lifetime: number, system: ParticleSystem) => vec4) : T extends vec3 ? {
    x: U;
    y: U;
    z: U;
} | ((lifetime: number, system: ParticleSystem) => vec3) : T extends vec2 ? {
    x: U;
    y: U;
    z: U;
} | ((lifetime: number, system: ParticleSystem) => vec2) : T extends number ? U | ((lifetime: number, system: ParticleSystem) => number) : never;
export declare class ParticleSystem extends RenderObject<typeof ParticleVertStruct> {
    static VertexStructure: {
        vert: "vec3";
        color: "vec4";
        normal: "vec3";
        uv: "vec2";
        uv2: "vec2";
        pos: "vec3";
        rotation: "vec3";
        size: "float";
    };
    static AttributeNames: ShaderAttributeNames<{
        vert: "vec3";
        color: "vec4";
        normal: "vec3";
        uv: "vec2";
        uv2: "vec2";
        pos: "vec3";
        rotation: "vec3";
        size: "float";
    }>;
    mesh: Mesh;
    material: Material<typeof ParticleVertStruct>;
    duration: ParticleScalarGenerator;
    lifetime: ParticleScalarGenerator;
    spawnRate: ParticleScalarGenerator;
    startSize: ParticleScalarGenerator;
    startColor: ParticlePropertySettings<Color, ParticleScalarGenerator>;
    startRotation: ParticlePropertySettings<vec3, ParticleScalarGenerator>;
    startSpeed: ParticleScalarGenerator;
    startAcceleration: ParticlePropertySettings<vec3, ParticleScalarGenerator>;
    emitter: ParticleEmitter;
    lifeSize: ParticleScalarModifier;
    lifeColor: ParticlePropertySettings<Color, ParticleScalarModifier>;
    lifeRotation: ParticlePropertySettings<vec3, ParticleScalarModifier>;
    lifeSpeed: ParticleScalarModifier;
    lifeAcceleration: ParticlePropertySettings<vec3, ParticleScalarModifier>;
    private particlesBuffer;
    private particleCount;
    private spawnedTime;
    private state;
    constructor();
    get maxCount(): number;
    set maxCount(count: number);
    play(): void;
    protected update(time: Time): void;
    emit(count: number, position?: Readonly<Vector3>): void;
    private updateParticles;
    private updateParticleProperty;
    private emitOne;
    private getScalarValue;
    private updateScalarValue;
    static boxEmitter(size: vec2): ParticleEmitter;
    static circleEmitter(radius: number): ParticleEmitter;
}
export {};

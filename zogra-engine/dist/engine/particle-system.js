"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParticleSystem = exports.ParticleMaterial = void 0;
const zogra_renderer_1 = require("zogra-renderer");
const assets_1 = require("../assets");
const render_object_1 = require("./render-object");
class ParticleMaterial extends zogra_renderer_1.MaterialFromShader(new zogra_renderer_1.Shader(...assets_1.ShaderSource.particle2D, {
    vertexStructure: {
        vert: "vec3",
        color: "vec4",
        normal: "vec3",
        uv: "vec2",
        uv2: "vec2",
        pos: "vec3",
        rotation: "vec3",
        size: "float",
    },
    attributes: {
        pos: "particlePos",
        rotation: "particleRotation",
        size: "particleSize",
    }
})) {
    constructor() {
        super(...arguments);
        this.color = zogra_renderer_1.Color.white;
        this.texture = null;
    }
}
__decorate([
    zogra_renderer_1.shaderProp("uColor", "color")
], ParticleMaterial.prototype, "color", void 0);
__decorate([
    zogra_renderer_1.shaderProp("uMainTex", "tex2d")
], ParticleMaterial.prototype, "texture", void 0);
exports.ParticleMaterial = ParticleMaterial;
class ParticleSystem extends render_object_1.RenderObject {
    constructor() {
        super();
        this.mesh = zogra_renderer_1.MeshBuilder.quad();
        this.material = new ParticleMaterial();
        this.duration = 1;
        this.lifetime = 1;
        this.spawnRate = 30;
        this.startSize = [0.2, 0.4];
        this.startColor = { r: 1, g: 1, b: 1, a: 1 };
        this.startRotation = { x: 0, y: 0, z: 0 };
        this.startSpeed = [5, 10];
        this.startAcceleration = { x: 0, y: -20, z: 0 };
        this.emitter = ParticleSystem.boxEmitter(zogra_renderer_1.vec2.one());
        this.lifeSize = null;
        this.lifeColor = { r: null, g: null, b: null, a: null };
        this.lifeRotation = { x: null, y: null, z: null };
        this.lifeSpeed = null;
        this.lifeAcceleration = { x: null, y: null, z: null };
        this.particlesBuffer = new zogra_renderer_1.RenderBuffer({
            pos: "vec3",
            color: "vec4",
            rotation: "vec3",
            size: "float",
            velocity: "vec4",
            lifetime: "vec2",
            acceleration: "vec3",
        }, 0);
        this.particleCount = 0;
        this.spawnedTime = 0;
        this.state = "stopped";
        this.particlesBuffer.static = false;
    }
    get maxCount() { return this.particlesBuffer.length; }
    set maxCount(count) { this.particlesBuffer.resize(count); }
    play() {
        this.state = "pending";
    }
    update(time) {
        switch (this.state) {
            case "stopped":
                break;
            case "pending":
                this.state = "running";
                this.spawnedTime = time.time;
            case "running":
                const spawnInterval = 1 / this.getScalarValue(this.spawnRate);
                while (this.spawnedTime + spawnInterval <= time.time) {
                    this.spawnedTime += spawnInterval;
                    this.emitOne(this.position);
                }
                break;
        }
        this.updateParticles(time);
    }
    /** @internal */
    render(context, data) {
        context.renderer.drawMeshInstance(this.mesh, this.particlesBuffer, this.material, this.particleCount);
    }
    emit(count, position = this.position) {
        for (let i = 0; i < count; i++)
            this.emitOne(position);
    }
    updateParticles(time) {
        for (let i = 0; i < this.particleCount; i++) {
            const particle = this.particlesBuffer[i];
            const lifetime = particle.lifetime[0] / particle.lifetime[1];
            if (lifetime >= 1) {
                if (i < this.particleCount - 1) {
                    this.particlesBuffer.swapVertices(i, this.particleCount - 1);
                    i--;
                }
                this.particleCount--;
                continue;
            }
            particle.lifetime[0] += time.deltaTime;
            if (this.lifeColor) {
                if (typeof (this.lifeColor) === "function")
                    particle.color.set(this.lifeColor(lifetime, this));
                else {
                    particle.color[0] = this.updateScalarValue(this.lifeColor.r, lifetime, particle.color[0]);
                    particle.color[1] = this.updateScalarValue(this.lifeColor.g, lifetime, particle.color[1]);
                    particle.color[2] = this.updateScalarValue(this.lifeColor.b, lifetime, particle.color[2]);
                    particle.color[3] = this.updateScalarValue(this.lifeColor.a, lifetime, particle.color[3]);
                }
            }
            if (this.lifeSize) {
                if (typeof (this.lifeSize) === "function")
                    particle.size[0] = this.lifeSize(lifetime);
                else {
                    particle.size[0] = this.updateScalarValue(this.lifeSize, lifetime, particle.size[0]);
                }
            }
            if (this.lifeAcceleration) {
                if (typeof (this.lifeAcceleration) === "function")
                    particle.acceleration.set(this.lifeAcceleration(lifetime, this));
                else {
                    particle.acceleration[0] = this.updateScalarValue(this.lifeAcceleration.x, lifetime, particle.acceleration[0]);
                    particle.acceleration[1] = this.updateScalarValue(this.lifeAcceleration.y, lifetime, particle.acceleration[1]);
                    particle.acceleration[2] = this.updateScalarValue(this.lifeAcceleration.z, lifetime, particle.acceleration[2]);
                }
            }
            // const velocity = vec3.set(particle.velocity) as vec3;
            // vec3.mul(particle.velocity, particle.velocity[3]);
            let vx = particle.velocity[0];
            let vy = particle.velocity[1];
            let vz = particle.velocity[2];
            vx *= particle.velocity[3];
            vy *= particle.velocity[3];
            vz *= particle.velocity[3];
            vx += particle.acceleration[0] * time.deltaTime;
            vy += particle.acceleration[1] * time.deltaTime;
            vz += particle.acceleration[2] * time.deltaTime;
            particle.velocity[3] = Math.sqrt(vx * vx
                + vy * vy
                + vz * vz);
            particle.velocity[0] = vx / particle.velocity[3];
            particle.velocity[1] = vy / particle.velocity[3];
            particle.velocity[2] = vz / particle.velocity[3];
            if (this.lifeSpeed) {
                if (typeof (this.lifeSpeed) === "function")
                    particle.velocity[3] = this.lifeSpeed(lifetime);
                else
                    particle.velocity[3] = this.updateScalarValue(this.lifeSpeed, lifetime, particle.velocity[3]);
            }
            particle.pos[0] += particle.velocity[0] * particle.velocity[3] * time.deltaTime;
            particle.pos[1] += particle.velocity[1] * particle.velocity[3] * time.deltaTime;
            particle.pos[2] += particle.velocity[2] * particle.velocity[3] * time.deltaTime;
            if (this.lifeRotation) {
                if (typeof (this.lifeRotation) === "function")
                    particle.rotation.set(this.lifeRotation(lifetime, this));
                else {
                    particle.rotation[0] = this.updateScalarValue(this.lifeRotation.x, lifetime, particle.rotation[0]);
                    particle.rotation[1] = this.updateScalarValue(this.lifeRotation.y, lifetime, particle.rotation[1]);
                    particle.rotation[2] = this.updateScalarValue(this.lifeRotation.z, lifetime, particle.rotation[2]);
                }
            }
            // Debug().drawLine((vec3.set(particle.pos) as vec3).minus(particle.size[0]), (vec3.set(particle.pos) as vec3).plus(particle.size[0]));
        }
    }
    updateParticleProperty(time, modifier, accessor) {
    }
    emitOne(position) {
        if (this.particleCount >= this.maxCount)
            return;
        let particle = this.particlesBuffer[this.particleCount++];
        let velocity = zogra_renderer_1.vec3.zero();
        let pos = zogra_renderer_1.vec3.zero();
        this.emitter(this, position, velocity, pos);
        const lifetime = this.getScalarValue(this.lifetime);
        let speed = this.getScalarValue(this.startSpeed);
        // velocity.mul(speed);
        particle.velocity.set(velocity);
        particle.velocity[3] = speed;
        particle.pos.set(pos);
        particle.size[0] = this.getScalarValue(this.startSize);
        particle.lifetime[0] = 0;
        particle.lifetime[1] = lifetime;
        if (typeof (this.startColor) === "function") {
            let color = this.startColor(0, this);
            particle.color.set(color);
        }
        else {
            particle.color[0] = this.getScalarValue(this.startColor.r);
            particle.color[1] = this.getScalarValue(this.startColor.g);
            particle.color[2] = this.getScalarValue(this.startColor.b);
            particle.color[3] = this.getScalarValue(this.startColor.a);
        }
        if (typeof (this.startRotation) === "function") {
            particle.rotation.set(this.startRotation(0, this));
        }
        else {
            particle.rotation[0] = this.getScalarValue(this.startRotation.x);
            particle.rotation[1] = this.getScalarValue(this.startRotation.y);
            particle.rotation[2] = this.getScalarValue(this.startRotation.z);
        }
        if (typeof (this.startAcceleration) === "function")
            particle.acceleration.set(this.startAcceleration(0, this));
        else {
            particle.acceleration[0] = this.getScalarValue(this.startAcceleration.x);
            particle.acceleration[1] = this.getScalarValue(this.startAcceleration.y);
            particle.acceleration[2] = this.getScalarValue(this.startAcceleration.z);
        }
    }
    getScalarValue(settings) {
        if (typeof (settings) === "number")
            return settings;
        else if (typeof (settings) === "function")
            return settings(this);
        else if (settings instanceof Array)
            return zogra_renderer_1.MathUtils.lerp(...settings, Math.random());
        console.warn("Unknown property generator: ", settings);
        return 0;
    }
    updateScalarValue(settings, lifetime, value) {
        if (settings === null)
            return value;
        else if (typeof (settings) === "number")
            return settings;
        else if (typeof (settings) === "function")
            return settings(lifetime);
        else if (settings instanceof Array)
            return zogra_renderer_1.MathUtils.lerp(...settings, lifetime);
        console.log("Unknown property modifier:", settings);
        return value;
    }
    static boxEmitter(size) {
        return (particleSystem, center, dirOut, posOut) => {
            posOut[0] = (Math.random() - 0.5) * size.x;
            posOut[1] = (Math.random() - 0.5) * size.y;
            posOut[2] = 0;
            posOut.plus(center);
            zogra_renderer_1.vec3.minus(dirOut, posOut, center).normalize();
        };
    }
}
exports.ParticleSystem = ParticleSystem;
//# sourceMappingURL=particle-system.js.map
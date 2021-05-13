import { Timeline, Animator, Time, Entity, BoxCollider, Light2D, ParticleSystem } from "zogra-engine";
import { vec2, vec3, Color } from "zogra-renderer";


export class BlackHole extends Entity
{
    light: Light2D;
    particle: ParticleSystem;
    animator = new Animator<unknown, BlackHole>();

    static timelineSpawn = Timeline({
        duration: 2,
        frames: {
            [0]: {
                size: 0,
                intensity: 0,
                rate: 0
            },
            [0.5]: {
                size: 0.5,
                intensity: 0.5,
                rate: 5
            },
            [1]: {
                size: 1,
                intensity: 1,
                rate: 10,
            },
            [2]: {
                size: 1,
                intensity: 1,
                rate: 30,
            }
        }
    });
    static timelineExit = Timeline({
        duration: 2,
        frames: {
            [0]: {
                size: 1,
                intensity: 1,
                rate: 30,
            },
            [0.5]: {
                size: 1,
                intensity: 1,
                rate: 5
            },
            [1]: {
                size: 0,
                intensity: 0,
                rate: 0
            },
        }
    });

    constructor()
    {
        super();

        this.light = new Light2D();
        this.light.lightColor = new Color(-1, -1, -1, 1);
        this.light.lightRange = 0;
        this.light.volumnRadius = 0;
        this.light.attenuation = 0;
        this.light.intensity = 0;
        this.light.shadowType = false;

        this.particle = new ParticleSystem();
        this.particle.maxCount = 32;
        this.particle.startSpeed = [-1, -1.6];
        this.particle.startAcceleration = { x: 0, y: 0, z: 0 };
        this.particle.startColor = Color.black;
        this.particle.lifetime = 0.3;
        this.particle.lifeSize = [0.2, 0.05];
        this.particle.spawnRate = 0;
        this.particle.emitter = ParticleSystem.circleEmitter(1);

        const collider = new BoxCollider();
        collider.size = vec2(0.1);
        this.collider = new BoxCollider();
    }
    async start()
    {
        this.scene?.add(this.light, this);
        this.scene?.add(this.particle, this);
        this.light.localPosition = vec3.zero();
        this.particle.localPosition = vec3.zero();
        this.particle.play();
        await this.animator.play(BlackHole.timelineSpawn, this, 15, (state) =>
        {
            this.light.lightRange = state.frame.size * 0.3;
            this.light.intensity = state.frame.intensity;
            this.particle.spawnRate = state.frame.rate;
        });
        await this.animator.play(BlackHole.timelineExit, this, 2, (state) =>
        {
            this.light.lightRange = state.frame.size * 0.3;
            this.light.intensity = state.frame.intensity;
            this.particle.spawnRate = state.frame.rate;
        });
        this.destroy();
    }
    update(time: Time)
    {
        this.animator.update(time.deltaTime);
    }
}

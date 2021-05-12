import { Animator, Time, Entity, BoxCollider, Light2D } from "zogra-engine";
import { vec2, MathUtils, vec3, Color } from "zogra-renderer";
import noisejs from "noisejs";
const { Noise } = noisejs;

export class ColorFood extends Entity
{
    foodSize = 0.3;
    lights: Light2D[] = [];
    noise = new Noise(Math.random());
    color: Color;
    animator = new Animator();
    shakeRange = 0;
    constructor()
    {
        super();
        this.color = Color.fromHSL(360 * Math.random(), 1, 0.5);
        const collider = new BoxCollider();
        collider.size = vec2(this.foodSize);
        this.collider = new BoxCollider();
    }
    async start()
    {
        for (let i = 0; i < 3; i++)
        {
            this.lights[i] = new Light2D();
            this.lights[i].lightRange = MathUtils.lerp(0.1, 0.2, Math.random());
            this.lights[i].volumnRadius = 0;
            this.lights[i].shadowType = false;
            this.lights[i].intensity = 0;
            this.lights[i].attenuation = 0.9;
            this.lights[i].lightColor = this.color;
            this.scene?.add(this.lights[i], this);
        }

        await this.animator.playProcedural(1, (t) =>
        {
            this.lights.forEach(light => light.intensity = t * 0.4);
            this.shakeRange = t * 0.4;
        });
        await this.animator.playProcedural(10);
        await this.animator.playProcedural(1, (t) =>
        {
            this.lights.forEach(light => light.intensity = (1 - t) * 0.4);
            this.shakeRange = MathUtils.lerp(0.4, 1, t);
        });
        this.destroy();
    }

    update(time: Time)
    {
        this.animator.update(time.deltaTime);
        const speed = 1;
        for (let i = 0; i < 3; i++)
        {
            this.lights[i].localPosition = vec3(this.noise.perlin2(i, time.time * speed), this.noise.perlin2(time.time * speed, i), 0).mul(this.shakeRange);
        }
    }
}

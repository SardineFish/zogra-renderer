import { Timeline, SpriteObject, Sprite, Animator, Default2DMaterial, Time, Entity, BoxCollider, Light2D, ShadowType, ParticleSystem } from "zogra-engine";
import { vec2, MathUtils, vec3, TextureImporter, Vector2, Color } from "zogra-renderer";
import imgFood from "../asset/img/snake-food.png";
import { GameMap } from "./map";
import { Snake } from "./snake";
import noisejs = require("noisejs");
import { probability } from "./utils";
const { Noise } = noisejs;

export class FoodGenerator extends Entity
{
    spawnInterval: [number, number] = [2, 3];
    spawnCount = 2;
    spawnRadius = 10;
    foodSize = 0.5;
    foodDistance = 3;
    foodLimit = 6;
    snake: Snake;
    foods: Entity[] = [];

    constructor(snake: Snake)
    {
        super();
        this.snake = snake;
    }

    start()
    {
        this.spawnFood();
    }

    update()
    {
        this.foods = this.foods.filter(food => !food.destroyed);
    }

    spawnFood()
    {
        const count = Math.round(MathUtils.lerp(1, 3, Math.pow(Math.random(), 2)));
        for (let i = 0; i < count; i++)
        {
            this.spawnOne();
        }

        setTimeout(this.spawnFood.bind(this), MathUtils.lerp(...this.spawnInterval, Math.random()) * 1000);
    }

    private spawnOne()
    {
        if (this.foods.length >= this.foodLimit)
            return;
            
        if (Math.random() < 0.9)
        {
            const pos = this.getSpawnPos(this.spawnRadius);
            if (pos)
            {
                const food = new Food(pos);
                this.snake.scene?.add(food);
                this.foods.push(food);
            }
        }
        else if (Math.random() < 0.8)
        {
            const pos = this.getSpawnPos(this.spawnRadius);
            if (pos)
            {
                GameMap.instance.setTile(pos, GameMap.tileFood);
                const food = new ColorFood();
                food.position = pos.toVec3();
                this.snake.scene?.add(food);
                this.foods.push(food);
            }
        }
        else
        {
            const pos = this.getSpawnPos(5);
            if (pos)
            {
                GameMap.instance.setTile(pos, GameMap.tileFood);
                const food = new BlackHole();
                food.position = pos.toVec3();
                this.snake.scene?.add(food);
                this.foods.push(food);
            }
        }
    }

    private getSpawnPos(distance: number): vec2 | null
    {
        let pos = vec2.zero();
        for (let i = 0; i < 64; i++)
        {
            pos = vec2.math(Math.floor)(
                vec2.math(Math.random)()
                    .minus(0.5)
                    .mul(2)
                    .mul(distance)
                    .plus(this.snake.head))
                .plus(.5);
            if (this.foods.some(food => Vector2.distance(food.position.toVec2(), pos) < this.foodDistance))
                continue;

            if (GameMap.instance.getTile(pos) === GameMap.tileGround)
            {
                return pos
            }
        }
        return null;
    }
}

const timelineCountdown = Timeline({
    loop: true,
    duration: 1,
    frames: {
        [0]: {
            opacity: 1
        },
        [0.5]: {
            opacity: 1,
        },
        [0.8]: {
            opacity: 0,
        },
    }
});

const timelineLeave = Timeline({
    duration: 0.2,
    frames: {
        [0]: {
            size: 1,
            opacity: 1,
        },
        [1]: {
            size: 0,
            opacity: 0
        }
    }
});

const timelineSpawn = Timeline({
    duration: 0.5,
    frames: {
        [0]: {
            size: 0,
        },
        [0.5]: {
            size: 1,
        }
    }
});

export class Food extends SpriteObject
{
    static foodSprite: Sprite = null as any;
    foodSize = 0.5;
    animator = new Animator();

    constructor(pos: vec2)
    {
        super();
        this.sprite = Food.foodSprite;
        this.position = pos.toVec3(1);
        this.localScaling = vec3(this.foodSize);
        const collider = new BoxCollider();
        collider.size = vec2(this.foodSize);
        this.collider = collider;
    }

    async start()
    {
        await this.animator.play(timelineSpawn, state =>
        {
            this.localScaling = vec3(state.frame.size * this.foodSize)
        }, 5);
        await this.animator.play(timelineCountdown, state =>
        {
            (this.materials[0] as Default2DMaterial).color.a = state.frame.opacity;
        }, 5);
        await this.animator.play(timelineLeave, state =>
        {
            this.localScaling = vec3(state.frame.size * this.foodSize);
            (this.materials[0] as Default2DMaterial).color.a = state.frame.opacity;
        });
        this.destroy();
    }

    update(time: Time)
    {
        this.animator.update(time.deltaTime);
    }
}

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
        console.log(this.color);
        const collider = new BoxCollider();
        collider.size = vec2(this.foodSize);
        this.collider = new BoxCollider()
    }
    async start()
    {
        console.log(this.position);
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


export class BlackHole extends Entity
{
    light: Light2D;
    particle: ParticleSystem;
    animator = new Animator();

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
        collider.size = vec2(0.3);
        this.collider = new BoxCollider()
    }
    async start()
    {
        this.scene?.add(this.light, this);
        this.scene?.add(this.particle, this);
        this.light.localPosition = vec3.zero();
        this.particle.localPosition = vec3.zero();
        this.particle.play();
        await this.animator.play(BlackHole.timelineSpawn, (state) =>
        {
            this.light.lightRange = state.frame.size * 0.3;
            this.light.intensity = state.frame.intensity;
            this.particle.spawnRate = state.frame.rate;
        }, 15);
        await this.animator.play(BlackHole.timelineExit, (state) =>
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

export async function loadSnakeAssets()
{
    const textureFood = await TextureImporter.url(imgFood).then(r => r.tex2d());
    // textureFood.filterMode = FilterMode.Nearest;
    textureFood.updateParameters();
    textureFood.generateMipmap();
    Food.foodSprite = new Sprite(textureFood, vec2.one(), vec2.zero());
    Food.foodSprite.color = new Color(2, 2, 2, 1);
}
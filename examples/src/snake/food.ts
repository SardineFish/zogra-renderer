import { Timeline, SpriteObject, Sprite, Animator, Default2DMaterial, Time, Entity, BoxCollider, Light2D, ShadowType } from "zogra-engine";
import { vec2, MathUtils, vec3, TextureImporter, Vector2, Color } from "zogra-renderer";
import imgFood from "../asset/img/snake-food.png";
import { GameMap } from "./map";
import { Snake } from "./snake";
import noisejs = require("noisejs");
const { Noise } = noisejs;

export class FoodGenerator extends Entity
{
    spawnInterval: [number, number] = [1, 2];
    spawnRadius = 15;
    foodLifetime = 5;
    foodSize = 0.5;
    foodDistance = 5;
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
        let pos = vec2.zero();
        for (let i = 0; i < 64; i++)
        {
            pos = vec2.math(Math.floor)(
                vec2.math(Math.random)()
                    .minus(0.5)
                    .mul(2)
                    .mul(this.spawnRadius)
                    .plus(this.snake.head))
                .plus(.5);
            if (this.foods.some(food => Vector2.distance(food.position.toVec2(), pos) < this.foodDistance))
                continue;
            
            if (GameMap.instance.getTile(pos) === GameMap.tileGround)
            {
                GameMap.instance.setTile(pos, GameMap.tileFood);

                if (Math.random() < 0.5)
                {
                    const food = new ColorFood();
                    food.position = pos.toVec3();
                    this.snake.scene?.add(food);
                    this.foods.push(food);
                }
                else
                {
                    const food = new Food(pos);
                    this.snake.scene?.add(food);
                    this.foods.push(food);
                }

                break;
            }
        }

        setTimeout(this.spawnFood.bind(this), MathUtils.lerp(...this.spawnInterval, Math.random()) * 1000);
    }
}

const foodTimeline: Timeline<{ state: "spawn" | "idle" | "leaving" }> = [
    {
        time: 0,
        keyframe: {
            state: "spawn",
        }
    },
    {
        time: 0.5,
        keyframe: {
            state: "idle",
        }
    },
    {
        time: 10,
        keyframe: {
            state: "leaving",
        }
    }
];

const timelineLeaving: Timeline<{ opacity: number }> = [
    {
        time: 0,
        keyframe: {
            opacity: 1
        }
    },
    {
        time: 0.3,
        keyframe: {
            opacity: 1
        }
    },
    {
        time: 0.8,
        keyframe: {
            opacity: 0
        }
    },
];

const timelineSpawn: Timeline<{ size: number }> = [
    {
        time: 0,
        keyframe: {
            size: 0
        },
    },
    {
        time: 0.5,
        keyframe: {
            size: 1
        }
    }
];

export class Food extends SpriteObject
{
    static foodSprite: Sprite = null as any;
    foodSize = 0.5;
    animator = new Animator(15, foodTimeline);
    animatorSpawn = new Animator(0.5, timelineSpawn);
    animatorLeaving = new Animator(1, timelineLeaving);

    constructor(pos: vec2)
    {
        super();
        this.sprite = Food.foodSprite;
        this.position = pos.toVec3(1);
        this.localScaling = vec3(this.foodSize);
        const collider = new BoxCollider();
        collider.size = vec2(this.foodSize);
        this.collider = collider;

        this.animator = new Animator(15, foodTimeline);
        this.animator.callback = (state) =>
        {
            switch (state.frame.state)
            {
                case "spawn":
                    !this.animatorSpawn.playing && this.animatorSpawn.play();
                    break;
                case "leaving":
                    !this.animatorLeaving.playing && this.animatorLeaving.play();
                    break;
            }
        };
        this.animatorLeaving.loop = true;
        this.animatorSpawn.callback = (state) =>
        {
            this.localScaling = vec3(state.frame.size * this.foodSize);
        };
        this.animatorLeaving.callback = (state) =>
        {
            (this.materials[0] as Default2DMaterial).color.a = state.frame.opacity;
        };
    }

    start()
    {
        this.animator.play();
    }

    update(time: Time)
    {
        this.animator.update(time.deltaTime);
        this.animatorSpawn.update(time.deltaTime);
        this.animatorLeaving.update(time.deltaTime);

        if (this.animator.finished)
        {
            this.destroy();
        }
    }
}

export class ColorFood extends Entity
{
    foodSize = 0.3;
    lights: Light2D[] = [];
    noise = new Noise(Math.random());
    color: Color;
    constructor()
    {
        super();
        this.color = Color.fromHSL(360 * Math.random(), 1, 0.5);
        const collider = new BoxCollider();
        collider.size = vec2(this.foodSize);
        this.collider = new BoxCollider()
    }
    start()
    {
        console.log(this.position);
        for (let i = 0; i < 3; i++)
        {
            this.lights[i] = new Light2D();
            this.lights[i].lightRange = MathUtils.lerp(0.1, 0.2, Math.random())
            this.lights[i].volumnRadius = 0;
            this.lights[i].shadowType = false;
            this.lights[i].intensity = 0.4;
            this.lights[i].attenuation = 0.9;
            this.lights[i].lightColor = this.color;
            this.scene?.add(this.lights[i], this);
        }
    }

    update(time: Time)
    {
        const speed = 1;
        for (let i = 0; i < 3; i++)
        {
            this.lights[i].localPosition = vec3(this.noise.perlin2(i, time.time * speed), this.noise.perlin2(time.time * speed, i), 0).mul(0.4);
        }
    }
}

export class BlackHole extends Entity
{
    light: Light2D;
    constructor()
    {
        super();

        this.light = new Light2D();
        this.light.lightColor = new Color(-1, -1, -1, 1);
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
import { Timeline, SpriteObject, Sprite, Animator, Default2DMaterial, Time, Entity, BoxCollider } from "zogra-engine";
import { vec2, MathUtils, vec3, TextureImporter, Vector2, Color } from "zogra-renderer";
import imgFood from "../asset/img/snake-food.png";
import { GameMap } from "./map";
import { Snake } from "./snake";


export class FoodGenerator extends Entity
{
    spawnInterval: [number, number] = [1, 2];
    spawnRadius = 15;
    foodLifetime = 5;
    foodSize = 0.5;
    foodDistance = 5;
    snake: Snake;
    foods: Food[] = [];

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
                const food = new Food(pos);
                this.snake.scene?.add(food);
                this.foods.push(food);
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

export async function loadSnakeAssets()
{
    const textureFood = await TextureImporter.url(imgFood).then(r => r.tex2d());
    // textureFood.filterMode = FilterMode.Nearest;
    textureFood.updateParameters();
    textureFood.generateMipmap();
    Food.foodSprite = new Sprite(textureFood, vec2.one(), vec2.zero());
    Food.foodSprite.color = new Color(2, 2, 2, 1);
}
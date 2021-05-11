import { Timeline, Sprite, Entity, ShadowType } from "zogra-engine";
import { vec2, MathUtils, TextureImporter, Vector2, Color } from "zogra-renderer";

import { GameMap } from "./map";
import { Snake } from "./snake";
import { probability } from "./utils";
import { Food } from "./food";
import { ColorFood } from "./color-food";
import noisejs = require("noisejs");
import { BlackHole } from "./black-hole";
import { BoostFood } from "./boost-food";
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
            
        if (Math.random() < 0.6)
        {
            const pos = this.getSpawnPos(this.spawnRadius);
            if (pos)
            {
                const food = new Food(pos);
                this.snake.scene?.add(food);
                this.foods.push(food);
            }
        }
        else if (Math.random() < 0.1)
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
        else if (Math.random() < 0.5)
        {
            const pos = this.getSpawnPos(this.spawnRadius);
            if (pos)
            {
                GameMap.instance.setTile(pos, GameMap.tileFood);
                const food = new BoostFood();
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

import { Entity } from "zogra-engine";
import { MathUtils, vec2, Vector2 } from "zogra-renderer";
import { BlackHole } from "./black-hole";
import { BoostFood } from "./boost-food";
import { ColorFood } from "./color-food";
import { Food } from "./food";
import { GameMap } from "./map";
import { Snake } from "./snake";
import { WeightedRandom } from "./utils";


const genFood = WeightedRandom([
    {
        weight: 3,
        value: (generator: FoodGenerator, pos: vec2) =>
        {
            const food = new Food(pos);
            generator.snake.scene?.add(food);
            return food as Entity;
        }
    },
    {
        weight: 0.5,
        value: (generator, pos) =>
        {
            GameMap.instance.setTile(pos, GameMap.tileFood);
            const food = new ColorFood();
            food.position = pos.toVec3();
            generator.snake.scene?.add(food);
            return food;
        }
    },
    {
        weight: 0.8,
        value: (generator, pos) =>
        {
            GameMap.instance.setTile(pos, GameMap.tileFood);
            const food = new BoostFood();
            food.position = pos.toVec3();
            generator.snake.scene?.add(food);
            return food;
        }
    },
    {
        weight: 0.3,
        value: (generator, pos) =>
        {
            GameMap.instance.setTile(pos, GameMap.tileFood);
            const food = new BlackHole();
            food.position = pos.toVec3();
            generator.snake.scene?.add(food);
            return food;
        }
    }
]);

export class FoodGenerator extends Entity
{
    spawnInterval: [number, number] = [1, 2];
    spawnRadius = 15;
    foodSize = 0.5;
    foodDistance = 3;
    perChunkFoodLimit = 12;
    foods: Set<Entity> = new Set();
    snake: Snake;

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
    }

    spawnFood()
    {
        if (this.snake.isDead)
            return;
        const count = Math.round(MathUtils.lerp(1, 3, Math.pow(Math.random(), 2)));
        for (let i = 0; i < count; i++)
        {
            this.spawnOne();
        }

        setTimeout(this.spawnFood.bind(this), MathUtils.lerp(...this.spawnInterval, Math.random()) * 1000);
    }

    private spawnOne()
    {
        const pos = this.getSpawnPos(this.spawnRadius);
        if (pos)
        {
            const food = genFood(Math.random())(this, pos);
            food.on("exit", () =>
            {
                this.foods.delete(food);
                GameMap.instance.getChunkAt(pos).foodCount--;
            });
            GameMap.instance.getChunkAt(pos).foodCount++;
            this.foods.add(food);
        }
    }

    private getSpawnPos(distance: number): vec2 | null
    {
        let pos = vec2.zero();
        for (let i = 0; i < 32; i++)
        {
            pos = vec2.math(Math.floor)(
                vec2.math(Math.random)()
                    .minus(0.5)
                    .mul(2)
                    .mul(distance)
                    .plus(this.snake.head))
                .plus(.5);
            
            let spawnable = true;
            for (const food of this.foods)
            {
                if (Vector2.distance(food.position.toVec2(), pos) < this.foodDistance)
                {
                    spawnable = false;
                    break;
                }
            }
            if (!spawnable)
                continue;
            if (GameMap.instance.getChunkAt(pos).foodCount >= this.perChunkFoodLimit)
                continue;

            if (GameMap.instance.getTile(pos) === GameMap.tileGround)
            {
                // console.log(i);
                return pos;
            }
        }
        return null;
    }
}

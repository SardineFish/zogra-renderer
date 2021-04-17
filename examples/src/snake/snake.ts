import { BoxCollider, Camera, Collider2D, CollisionInfo2D, Color, dot, InputManager, Keys, LineRenderer, MathUtils, minus, mul, plus, Time, vec2 } from "zogra-engine";
import { Food, FoodGenerator } from "./food";
import { GameMap } from "./map";

interface TailGrowing
{
    time: number,
    speed: number,
    duration: number,
}

export class Snake extends LineRenderer
{
    headSpeed = 3;
    tailSpeed = 3;
    width = 0.6;
    inputCacheSize = 3;
    step = 1;
    color = Color.white;

    bodies: vec2[] = [];
    headDir: vec2 = vec2.right();
    inputQueue: vec2[] = [];
    headMoveDistance = 0;
    tailMoveDistance = 0;
    camera: Camera;
    input: InputManager;
    foodGenerator: FoodGenerator;
    growingTail: TailGrowing[] = [];

    constructor(bodies: vec2[], headDir: vec2, camera: Camera, input: InputManager)
    {
        super();
        this.bodies = bodies;
        this.headDir = headDir;
        this.camera = camera;
        camera.position = this.head.toVec3(camera.position.z);
        this.input = input;
        this.foodGenerator = new FoodGenerator(this);
        const collider = new BoxCollider();
        collider.size = vec2(this.width);
        this.collider = collider;
        collider.on("onContact", this.onContact.bind(this));

        for (const body of this.bodies)
        {
            this.points.push({
                position: body.clone(),
                color: this.color,
                width: this.width,
            });
        }
        this.points.push({
            position: mul(headDir, this.width / 2).plus(this.head),
            color: this.color,
            width: this.width,
        });
        this.points[0].position = mul(this.tailDir, -this.width / 2).plus(this.tail);
    }
    onContact(other: Collider2D)
    {
        // console.log(other);
        if (other.entity instanceof GameMap)
        {
            this.headSpeed = 0;
        }
        else if (other.entity instanceof Food)
        {
            this.growTail(1, 3);
            other.entity.destroy();
        }
    }
    start()
    {
        this.scene?.add(this.foodGenerator);
    }
    update(time: Time)
    {
        console.log(this.bodies.length);
        const collider = this.collider as BoxCollider;
        collider.offset = mul(this.headDir, -this.width / 2).plus(this.points[this.points.length - 1].position);
        
        if (this.input.getKeyDown(Keys.A) || this.input.getKeyDown(Keys.Left))
        {
            this.inputQueue.push(vec2.left());
        }
        if (this.input.getKeyDown(Keys.D) || this.input.getKeyDown(Keys.Right))
        {
            this.inputQueue.push(vec2.right());
        }
        if (this.input.getKeyDown(Keys.W) || this.input.getKeyDown(Keys.Up))
        {
            this.inputQueue.push(vec2.up());
        }
        if (this.input.getKeyDown(Keys.S) || this.input.getKeyDown(Keys.Down))
        {
            this.inputQueue.push(vec2.down());
        }
        if (this.inputQueue.length > this.inputCacheSize)
            this.inputQueue = this.inputQueue.slice(this.inputQueue.length - this.inputCacheSize);

        this.moveHead(time);
        this.moveTail(time);
        this.updateMesh();

        this.camera.position = vec2.math(MathUtils.lerp)(this.camera.position.toVec2(), this.head, vec2(0.5 * time.deltaTime, 0.7 * time.deltaTime)).toVec3(this.camera.position.z);
    }
    moveHead(time: Time)
    {
        this.headMoveDistance += this.headSpeed * time.deltaTime;
        if (this.headMoveDistance >= this.step)
        {
            this.bodies.push(mul(this.headDir, this.step).plus(this.head));

            while (this.inputQueue.length > 0)
            {
                if (dot(this.inputQueue[0], this.headDir) >= 0)
                {
                    this.headDir = this.inputQueue[0];
                    this.inputQueue = this.inputQueue.slice(1);
                    break;
                }
                this.inputQueue = this.inputQueue.slice(1);
            }
            let nextPos = plus(this.head, this.headDir);
            if (GameMap.instance.getTile(nextPos) === GameMap.tileGround)
                GameMap.instance.setTile(plus(this.head, this.headDir), GameMap.tileSnake);

            this.points[this.points.length - 1].position = this.head.clone();
            this.points.push({
                position: mul(this.headDir, this.width / 2).plus(this.head),
                color: this.color,
                width: this.width,
            });
            this.headMoveDistance -= this.step;
        }

        const headPoint = this.points[this.points.length - 1];
        const startPos = mul(this.headDir, this.width / 2).plus(this.head);
        headPoint.position.set(this.headDir).mul(this.headMoveDistance).plus(startPos);
    }
    moveTail(time: Time)
    {
        let moveDistance = this.tailSpeed * time.deltaTime;
        if (this.growingTail.length > 0)
        {
            const state = this.growingTail[0];
            moveDistance = (this.tailSpeed * state.speed) * time.deltaTime;
            state.time += time.deltaTime;
            if (state.time>= state.duration)
            {
                this.growingTail = this.growingTail.slice(1);
            }
        }

        this.tailMoveDistance += moveDistance;
        if (this.tailMoveDistance >= this.step)
        {
            GameMap.instance.setTile(this.tail, GameMap.tileGround);
            this.bodies = this.bodies.slice(1);
            this.points = this.points.slice(1);

            this.points[0].position = mul(this.tailDir, -this.width / 2).plus(this.tail);
            this.tailMoveDistance -= this.step;
        }

        const tailPoint = this.points[0];
        const startPos = mul(this.tailDir, -this.width / 2).plus(this.tail);
        tailPoint.position.set(this.tailDir).mul(this.tailMoveDistance).plus(startPos);
    }
    growTail(length: number, steps: number)
    {
        this.growingTail.push({
            speed: (steps - length) / steps,
            time: 0,
            duration: steps / this.tailSpeed
        })
    }
    get head() { return this.bodies[this.bodies.length - 1] }
    get tail() { return this.bodies[0] }
    get tailDir()
    {
        return minus(this.bodies[1], this.bodies[0]).normalize();
    }
}
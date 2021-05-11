import { Animator, BoxCollider, boxRaycast, Camera, Collider2D, CollisionInfo2D, Color, dot, Entity, InputManager, Keys, Light2D, LineRenderer, MathUtils, minus, mul, ParticleSystem, plus, ShadowType, Time, Timeline, vec2, vec4, Vector2 } from "zogra-engine";
import { GameGlobals } from ".";
import { FoodGenerator } from "./food-generator";
import { BlackHole } from "./black-hole";
import { ColorFood } from "./color-food";
import { Food } from "./food";
import { GameMap } from "./map";
import { BoostFood } from "./boost-food";
import { GameCamera } from "./game-camera";
import { Debug } from "zogra-renderer/dist/core/global";

interface SnakeGrowing
{
    length: number;
    headSpeed: number;
    tailSpeed: number;
}

interface SnakeBoost
{
    speed: number;
    duration: number;
}

export class Snake extends LineRenderer
{
    headEntity: Entity;
    initialLightRange = 15;
    initialLightIntensity = 0.4;
    initialAmbient = 0.2;
    maxLightIntensity = 0.6;
    intensityDropRate = this.maxLightIntensity / 30;
    lightRangeDropRate = this.initialLightRange / 20;
    ambientDropRate = this.initialAmbient / 40;
    speed = 3;
    // headSpeed = 3;
    // tailSpeed = 3;
    width = 0.6;
    inputCacheSize = 3;
    step = 1;
    color = Color.white;

    bodies: vec2[] = [];
    headDir: vec2 = vec2.right();
    inputQueue: vec2[] = [];
    headMoveDistance = 0;
    tailMoveDistance = 0;
    camera: GameCamera;
    input: InputManager;
    foodGenerator: FoodGenerator;
    growingQueue: SnakeGrowing[] = [];
    foodParticle = new ParticleSystem();
    light = new Light2D();
    animator = new Animator();
    boostAnimator = new Animator<unknown, Snake>(this);
    cameraAnimator = new Animator<unknown, GameCamera>();
    boostTimeout = -1;

    currentLength: number;
    actualLength: number;

    get ambientIntensity() { return GameGlobals().renderPipeline.ambientIntensity }
    set ambientIntensity(v) { GameGlobals().renderPipeline.ambientIntensity = v }

    constructor(bodies: vec2[], headDir: vec2, camera: GameCamera, input: InputManager)
    {
        super();
        this.currentLength = bodies.length;
        this.actualLength = bodies.length;
        this.color = new Color(1.8, 1.8, 1.8, 1);
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

        this.headEntity = new Entity();

        this.foodParticle.maxCount = 256;
        this.foodParticle.startColor = () => new Color(1, 1, 1, 1).mul(MathUtils.lerp(1, 3, Math.random())) as Color;
        this.foodParticle.startAcceleration = { x: 0, y: 0, z: 0 };
        this.foodParticle.lifeSpeed = [10, 0];
        this.foodParticle.lifetime = [0.3, 0.4];
        this.foodParticle.lifeSize = [0.3, 0];

        this.light.shadowType = ShadowType.Soft;
        this.light.lightRange = 15;
        this.light.intensity = 0.4;
        this.light.lightColor = new Color(1, 1, 1, 1);
        this.light.volumnRadius = this.width / 3;
        this.light.attenuation = -0.8;

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


        this.headEntity.position = vec2.mul(this.headDir, -this.width / 2).plus(this.points[this.points.length - 1].position).toVec3(0);
    }
    onContact(other: Collider2D)
    {
        // console.log(other);
        if (other.entity instanceof GameMap)
        {
            this.dead();
        }
        else if (other.entity instanceof Food)
        {
            this.growTail(1, 2);
            // this.actualLength += 1;
            this.foodParticle.emit(9, other.entity.position);
            other.entity.destroy();

            const range = MathUtils.lerp(this.light.lightRange, this.initialLightRange, 0.5);
            let intensity = MathUtils.lerp(this.light.intensity, this.maxLightIntensity, 0.5);
            intensity = Math.min(intensity, this.maxLightIntensity - this.ambientIntensity);
            this.animator.playProcedural(2, t =>
            {
                this.light.lightRange = MathUtils.lerp(this.light.lightRange, range, t);
                this.light.intensity = MathUtils.lerp(this.light.intensity, intensity, t);
            })
        }
        else if (other.entity instanceof ColorFood)
        {
            this.growTail(3, 4);
            // this.actualLength += 3;
            const colorFood = other.entity as ColorFood;
            const originalColor = this.foodParticle.startColor;
            // this.light.lightColor.plus(colorFood.color).mul(0.5);
            this.foodParticle.startColor = () => vec4.mul(Color.white, colorFood.color, MathUtils.lerp(0.3, 2, Math.random())) as Color;
            this.foodParticle.emit(16, other.entity.position);
            this.foodParticle.startColor = originalColor;
            other.entity.destroy();

            const range = this.initialLightRange;
            const intensity = this.initialLightIntensity;
            const ambient = this.initialAmbient;
            // console.log("eat",colorFood.color);
            const color = colorFood.color.plus(this.light.lightColor).mul(0.5);
            // console.log(range, intensity, ambient, color);
            this.animator.playProcedural(2, t =>
            {
                this.light.lightRange = MathUtils.lerp(this.light.lightRange, range, t);
                this.light.intensity = Math.min(this.maxLightIntensity-  this.ambientIntensity, MathUtils.lerp(this.light.intensity, intensity, t));
                this.light.lightColor = vec4.mathNonAlloc(MathUtils.lerp)(this.light.lightColor, this.light.lightColor, color, vec4(t)) as Color;
                GameGlobals().renderPipeline.ambientIntensity = MathUtils.lerp(GameGlobals().renderPipeline.ambientIntensity, ambient, t);
                // console.log(this.light.lightRange, this.light.intensity, this.light.lightColor, this.ambientIntensity);
            })
        }
        else if (other.entity instanceof BoostFood)
        {
            if (this.boostTimeout > 0)
                clearTimeout(this.boostTimeout);
            this.foodParticle.emit(9, other.entity.position);
            other.entity.destroy();

            const boostSpeed = Math.sqrt(this.speed ** 2 + 10);
            this.boostAnimator.clear();
            this.boostAnimator.play(Timeline({
                duration: 10,
                frames: {
                    [0]: {
                        speed: this.speed,
                    },
                    [1]: {
                        speed: boostSpeed,
                    },
                    [8]: {
                        speed: boostSpeed,
                    },
                    [10]: {
                        speed: 3,
                    }
                },
                updater: (frame, target: Snake) =>
                {
                    target.speed = frame.speed;
                    // console.log(target.speed);
                }
            }));
            this.cameraAnimator.clear();
            this.cameraAnimator.play(Timeline({
                duration: 0.9,
                frames: {
                    [0]: {
                        shake: 5,
                        amplitude: 0.6,
                    },
                    [0.9]: {
                        shake: 0,
                        amplitude: 0
                    },
                },
                updater: (frame, camera: GameCamera) =>
                {
                    camera.shake = frame.shake;
                    camera.shakeAmplitude = frame.amplitude;
                }
            }), this.camera);
        }
        else if (other.entity instanceof BlackHole)
        {
            // this.growTail(2 - this.currentLength, 2);
            // this.growTail(this.currentLength - 2, this.currentLength - 2);
            const shrinkTime = 1;
            this.growingQueue = [];
            this.enqueueGrowing({
                length: 2,
                headSpeed: 0,
                tailSpeed: (this.actualLength - 2) / shrinkTime / this.speed,
            });
            this.enqueueGrowing({
                length: this.actualLength,
                headSpeed: 1,
                tailSpeed: 0
            });
            this.cameraAnimator.clear();
            this.cameraAnimator.play(Timeline({
                duration: 1.5,
                frames: {
                    [0]: {
                        shake: 0,
                        amplitude: 0,
                    },
                    [0.2]: {
                        shake: 10,
                        amplitude: 0.3,
                    },
                    [1]: {
                        shake: 10,
                        amplitude: 0.3
                    },
                    [1.5]: {
                        shake: 0,
                        amplitude: 0,
                    }
                },
                updater: (frame, camera: GameCamera) =>
                {
                    camera.shake = frame.shake;
                    camera.shakeAmplitude = frame.amplitude;
                }
            }), this.camera);
            const colorFood = other.entity as BlackHole;
            const originalColor = this.foodParticle.startColor;
            this.foodParticle.startColor = () => Color.black;
            this.foodParticle.emit(16, other.entity.position);
            this.foodParticle.startColor = originalColor;
            other.entity.destroy();

            const range = this.light.lightRange * 0.8;
            const intensity = this.light.intensity * 0.8;
            const ambient = GameGlobals().renderPipeline.ambientIntensity * 0.2;
            this.animator.playProcedural(2, t =>
            {
                this.light.lightRange = MathUtils.lerp(this.light.lightRange, range, t);
                this.light.intensity = MathUtils.lerp(this.light.intensity, intensity, t);
                GameGlobals().renderPipeline.ambientIntensity = MathUtils.lerp(GameGlobals().renderPipeline.ambientIntensity, ambient, t);
            })
        }
    }
    start()
    {
        this.scene?.add(this.foodGenerator);
        this.scene?.add(this.foodParticle);
        this.scene?.add(this.headEntity);
        this.scene?.add(this.light, this.headEntity);
    }
    update(time: Time)
    {
        this.light.intensity = Math.max(0, this.light.intensity - this.intensityDropRate * time.deltaTime);
        this.light.lightRange = Math.max(this.light.volumnRadius, this.light.lightRange - this.lightRangeDropRate * time.deltaTime);
        this.ambientIntensity = Math.max(0, this.ambientIntensity - this.ambientDropRate * time.deltaTime);
        this.animator.update(time.deltaTime);
        this.boostAnimator.update(time.deltaTime);
        this.cameraAnimator.update(time.deltaTime);
        // console.log(this.bodies.length);
        
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

        let headMovement = this.speed * time.deltaTime;
        let tailMovement = this.speed * time.deltaTime;
        let isGrowing = false;
        if (this.growingQueue.length > 0)
        {
            isGrowing = true;
            const growing = this.growingQueue[0];
            headMovement =growing.headSpeed * this.speed * time.deltaTime;
            tailMovement =growing.tailSpeed * this.speed * time.deltaTime;
            let totalMovement = headMovement - tailMovement;
            if (Math.sign(growing.length - (this.currentLength + totalMovement)) !== Math.sign(totalMovement))
            {
                const dt = Math.abs(growing.length - this.currentLength) / Math.abs(totalMovement) * time.deltaTime;
                this.growingQueue = this.growingQueue.slice(1);
                if (this.growingQueue.length > 0)
                {
                    headMovement = growing.headSpeed * this.speed * dt + (time.deltaTime - dt) * this.growingQueue[0].headSpeed * this.speed;
                    tailMovement = growing.tailSpeed * this.speed * dt + (time.deltaTime - dt) * this.growingQueue[0].tailSpeed * this.speed;
                }
                else
                {
                    headMovement = growing.headSpeed * this.speed * dt + (time.deltaTime - dt) * this.speed;
                    tailMovement = growing.tailSpeed * this.speed * dt + (time.deltaTime - dt) * this.speed;
                }
            }
        }
        
        this.moveHead(headMovement);
        this.moveTail(tailMovement);
        this.updateMesh();
        this.checkHitSelf();

        {
            const headSpeed = headMovement / time.deltaTime;
            const viewHeight = MathUtils.mapClamped(0, 6, 7, 13, headSpeed);
            const damping = headSpeed <= 3.1 ? 2 : 0.5;
            this.camera.viewHeight = MathUtils.damp(this.camera.viewHeight, viewHeight, damping, time.deltaTime);
        }

        // if (isGrowing)
        //     console.log(this.currentLength);

        this.headEntity.position = vec2.mul(this.headDir, -this.width / 2).plus(this.points[this.points.length - 1].position).toVec3(0);
        Debug().drawCircle(this.headEntity.position, this.width / 2);

        const collider = this.collider as BoxCollider;
        collider.offset = this.headEntity.position.toVec2();

        // this.camera.position = vec2.math(MathUtils.lerp)(
        //     this.camera.position.toVec2(),
        //     this.head,
        //     vec2(0.5 * time.deltaTime, 0.7 * time.deltaTime)
        // ).toVec3(this.camera.position.z);
    }
    moveHead(distance: number)
    {
        this.headMoveDistance += distance;
        this.currentLength += distance;
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
    moveTail(distance: number)
    {
        this.currentLength -= distance;

        while (distance > 0)
        {
            if (this.tailMoveDistance + distance >= this.step)
            {
                distance -= this.step - this.tailMoveDistance;
                this.tailMoveDistance = this.step;
                GameMap.instance.setTile(this.tail, GameMap.tileGround);
                this.bodies = this.bodies.slice(1);
                this.points = this.points.slice(1);

                this.points[0].position = mul(this.tailDir, -this.width / 2).plus(this.tail);
                this.tailMoveDistance -= this.step;
            }
            else
            {
                this.tailMoveDistance += distance;
                distance -= distance;
            }
            
            const tailPoint = this.points[0];
            const startPos = mul(this.tailDir, -this.width / 2).plus(this.tail);
            tailPoint.position.set(this.tailDir).mul(this.tailMoveDistance).plus(startPos);
        }
    }
    checkHitSelf()
    {
        for (let i = 0; i < this.bodies.length - 1; i++)
        {
            if (Vector2.distance(this.points[this.points.length - 1].position, this.bodies[i]) < this.width / 2)
            {
                this.dead();
                return;
            }
        }
    }
    enqueueGrowing(growing: SnakeGrowing)
    {
        this.growingQueue.push(growing);
    }
    growTail(length: number, steps: number)
    {
        this.actualLength += length;
        this.growingQueue.push({
            length: this.actualLength,
            headSpeed: 1,
            tailSpeed: (steps - length) / steps
        });
    }
    dead()
    {
        this.speed = 0;
        for (const body of this.bodies)
        {
            this.foodParticle.emit(10, body.toVec3());
        }
        this.destroy();
        this.light.destroy();
    }
    get head() { return this.bodies[this.bodies.length - 1] }
    get tail() { return this.bodies[0] }
    get tailDir()
    {
        if (this.bodies.length > 1)
            return minus(this.bodies[1], this.bodies[0]).normalize();
        return this.headDir;
    }
}
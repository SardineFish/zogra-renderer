import { Animator, BoxCollider, SpriteObject, Time, Timeline } from "zogra-engine";
import { vec2, vec3 } from "zogra-renderer";
import { GameAssets } from "./assets";


export const foodCountdownTimeline = Timeline({
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
    },
    updater: (frame, target: SpriteObject) =>
    {
        const color = target.color.asMut();
        color.a = frame.opacity;
        target.color = color;
    }
});

export const foodLeaveTimeline = Timeline({
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
    },
    updater: (frame, target: SpriteObject) =>
    {
        target.localScaling = vec3(frame.size);
        const color = target.color.asMut();
        color.a = frame.opacity;
        target.color = color;
    }
});

export const foodSpawnTimeline = Timeline({
    duration: 0.5,
    frames: {
        [0]: {
            size: 0,
        },
        [0.5]: {
            size: 1,
        }
    },
    updater: (frame, target: SpriteObject) =>
    {
        target.localScaling = vec3(frame.size);
    }
});

export class Food extends SpriteObject
{
    foodSize = 0.5;
    animator = new Animator();

    constructor(pos: vec2)
    {
        super();
        this.sprite = GameAssets.foodSprite;
        this.position = pos.toVec3(1);
        this.localScaling = vec3(this.foodSize);
        const collider = new BoxCollider();
        collider.size = vec2(this.foodSize);
        this.collider = collider;
        this.size = vec2(this.foodSize);
    }

    async start()
    {
        await this.animator.play(foodSpawnTimeline, this, 5);
        await this.animator.play(foodCountdownTimeline, this, 5);
        await this.animator.play(foodLeaveTimeline, this);
        this.destroy();
    }

    update(time: Time)
    {
        this.animator.update(time.deltaTime);
    }
}

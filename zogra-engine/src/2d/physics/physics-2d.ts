import { minus, mul, vec2 } from "zogra-renderer";
import { Scene } from "../../engine/scene";
import { Time } from "../../engine/zogra-engine";
import { ICollider, IPhysicsSystem } from "../../physics/physics-generic";
import { Collider2D } from "./collider2d";

export class Physics2D<Collider extends Collider2D = Collider2D> implements IPhysicsSystem
{
    gravity: Readonly<vec2> = vec2.zero();
    private colliderList: Collider[] = [];

    /** @internal */
    __addCollider(collider: ICollider): void
    {
        collider = collider as Collider;

        (collider as Collider).__colliderIdx = this.colliderList.push(collider as Collider) - 1;
    }

    /** @internal */
    __removeCollider(collider: ICollider)
    {
        // Swap tail collider and remove
        const coll = collider as Collider;
        if (coll.__colliderIdx >= 0)
        {
            if (this.colliderList.length > 1)
            {
                const tailCollider = this.colliderList[this.colliderList.length - 1];
                tailCollider.__colliderIdx = coll.__colliderIdx;
                this.colliderList[coll.__colliderIdx] = tailCollider;
            }
            this.colliderList.length--;
        }
    }

    update(time: Time)
    {
        this.updateMotion(time);
        for (let i = 0; i < this.colliderList.length; i++)
        {
            const colliderA = this.colliderList[i];
            for (let j = 0; j < this.colliderList.length; j++)
            {
                if (i === j)
                    continue;
                const colliderB = this.colliderList[j];
                if (!colliderA.rigidbody && !colliderB.rigidbody)
                    continue;
                
                const [self, other] = (!colliderB.rigidbody) ? [colliderB, colliderA] : [colliderA, colliderB];
                const relativeMotion = minus(other.rigidbody?._motion ?? vec2.zero(), self.rigidbody?._motion ?? vec2.zero());
                const collision = self.checkCollision(other, relativeMotion);
                if (collision)
                {
                    if (self.rigidbody && other.rigidbody)
                    {
                        console.warn("Collision between two rigidbody is not implement");
                        continue;
                    }
                    other.entity?.translate(collision.seperation.toVec3());
                    self.__eventEmitter.emit("onCollide", collision);
                    collision.self = other;
                    collision.other = self;
                    other.__eventEmitter.emit("onCollide", collision);
                }
            }
        }
    }

    private updateMotion(time: Time)
    {
        const gravity = this.gravity;
        const applyGravity = gravity.x !== 0 && gravity.y !== 0;
        for (let i = 0; i < this.colliderList.length; i++)
        {
            const rigidbody = this.colliderList[i].rigidbody;
            if (!rigidbody)
                continue;
        
            if (applyGravity)
                rigidbody.addAcceleration(gravity);
            
            rigidbody._velocity.x += rigidbody._acceleration.x * time.deltaTime;
            rigidbody._velocity.y += rigidbody._acceleration.y * time.deltaTime;

            const motion = mul(rigidbody._velocity, time.deltaTime);
            rigidbody.collider.entity?.translate(motion.toVec3());
            rigidbody._motion = motion;
        }
    }
}

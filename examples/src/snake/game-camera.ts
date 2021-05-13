import noisejs from "noisejs";
import { Camera, Entity, mat4, Rect, Time, vec2, vec3 } from "zogra-engine";
import { noise_fbm } from "./utils";
const Noise = new noisejs.Noise();

const EPSLON = 0.01;
const LOG_EPSLON = -Math.log(EPSLON);

export class GameCamera extends Camera
{
    private _followTarget?: Entity;
    get followTarget() { return this._followTarget }
    set followTarget(value)
    {
        this._followTarget = value;
    }
    followOffset: vec2 = vec2.zero();
    followStart: vec2 = vec2.zero();
    deadZoneOffset: vec2 = vec2.zero();
    deadZoneSize: vec2 = vec2(0.5, 0.5);
    damping: vec2 = vec2(5, 5);

    shake = 0;
    shakeOctave = 1;
    shakeAmplitude = 1;
    private shakeMatrix = mat4.identity();
    private shakeInverse = mat4.identity();
    private shakedLocalToWorld = mat4.identity();
    private shakedWorldToLocal = mat4.identity();

    get worldToLocalMatrix()
    {
        return mat4.mul(this.shakedWorldToLocal, this.shakeInverse, super.worldToLocalMatrix);
    }

    get localToWorldMatrix()
    {
        return mat4.mul(this.shakedLocalToWorld, super.localToWorldMatrix, this.shakeMatrix);
    }

    update(time: Time)
    {
        if (this.followTarget && this.followTarget.scene)
            this.updateFollow(this.followTarget, time);
        this.updateShaking(time);
    }

    private updateFollow(target: Entity, time: Time)
    {
        const screenOffset = mat4.mulPoint2(super.worldToLocalMatrix, target.position);
        
        const delta = vec2.div(screenOffset, vec2(this.viewHeight * this.aspectRatio, this.viewHeight))
            .minus(this.followOffset)
            .minus(this.followStart);

        const deadZone = new Rect(vec2.minus(this.deadZoneOffset, this.deadZoneSize), vec2.mul(this.deadZoneSize, 2));

        if (delta.x > 0)
            delta.x = delta.x / (deadZone.xMax - this.followStart.x);
        else
            delta.x = delta.x / (deadZone.xMin + this.followStart.x);
        
        if (delta.y > 0)
            delta.y = delta.y / (deadZone.yMax - this.followStart.y);
        else
            delta.y = delta.y / (deadZone.yMin + this.followStart.x);
        
        if (delta.x > 1 || delta.x < 0)
            delta.x = 1;
        else if (delta.y > 1 || delta.y < 0)
            delta.y = 1;
        
        const deltaTime = vec2(LOG_EPSLON)
            .div(this.damping)
            .mul(time.deltaTime)
            .mul(delta)
            .negate();
        
        const offset = vec2.exp(deltaTime).oneMinus().mul(screenOffset);
        this.translate(offset.toVec3(0));
    }

    private updateShaking(time: Time)
    {
        if (this.shake > 0)
        {
            const noiseX = noise_fbm(this.shakeOctave, t => Noise.perlin2(t, 0));
            const noiseY = noise_fbm(this.shakeOctave, t => Noise.perlin2(0, t));
            const translate = vec3(
                noiseX(time.time * this.shake) * this.shakeAmplitude,
                noiseY(time.time * this.shake) * this.shakeAmplitude,
                0);
            
            mat4.fromTranslation(this.shakeMatrix, translate);
            translate.negate();
            mat4.fromTranslation(this.shakeInverse, translate);
        }
    }
}

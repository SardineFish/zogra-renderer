import { RenderObject } from "../../engine/render-object";
import { Sprite } from "./sprite";
export declare class SpriteObject extends RenderObject {
    private mesh;
    private material;
    private _sprite;
    constructor();
    get sprite(): Sprite | null;
    set sprite(sprite: Sprite | null);
}

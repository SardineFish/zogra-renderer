import { Color } from "zogra-renderer";
import { RenderObject } from "../../engine/render-object";
import { RenderData } from "../../render-pipeline/render-data";
import { RenderContext } from "../../render-pipeline/render-pipeline";
import { Sprite } from "./sprite";
export declare class SpriteObject extends RenderObject {
    private mesh;
    private material;
    private _sprite;
    private _size;
    private _color;
    constructor();
    get size(): Readonly<import("zogra-renderer").Vector2>;
    set size(value: Readonly<import("zogra-renderer").Vector2>);
    get color(): Readonly<Color>;
    set color(value: Readonly<Color>);
    get sprite(): Sprite | null;
    set sprite(sprite: Sprite | null);
    render(context: RenderContext, data: RenderData): void;
}

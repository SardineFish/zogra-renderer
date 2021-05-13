import { Sprite } from "zogra-engine";
import { Color, TextureImporter, vec2 } from "zogra-renderer";
import imgFood from "../asset/img/snake-food.png";
import imgBoost from "../asset/img/snake-food-boost.png";


export async function loadAssets()
{
    const assets = {
        foodSprite: new Sprite(await TextureImporter.url(imgFood).then(r => r.tex2d()), vec2.one(), vec2.zero()),
        boostSprite: new Sprite(await TextureImporter.url(imgBoost).then(r=>r.tex2d()), vec2.one(), vec2.zero()),
    };
    assets.foodSprite.color = new Color(2, 2, 2, 1);
    assets.boostSprite.color = new Color(3, 3, 3, 1);

    Object.assign(GameAssets, assets);
    return assets;
}

type PromiseResult<T> = T extends Promise<infer U> ? U : never;

export type GameAssets = PromiseResult<ReturnType<typeof loadAssets>>;
export let GameAssets: GameAssets = {} as any;
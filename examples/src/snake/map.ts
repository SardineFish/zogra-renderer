import { Chunk, Color, Sprite, TextureImporter, TileData, Tilemap, TilemapCollider, vec2 } from "zogra-engine";
import imgCheckBoard from "../asset/img/checkboard.png";
import noisejs = require("noisejs");

let Noise = new noisejs.Noise();

export class NoiseChunk extends Chunk
{
    foodCount = 0;
    constructor(basePos: vec2, chunkSize: number)
    {
        super(basePos, chunkSize);

        for (let x = 0; x < chunkSize; x++)
            for (let y = 0; y < chunkSize; y++)
            {
                this.genMap(x, y);
            }
    }

    genMap(x: number, y: number)
    {
        const threshold = .05;
        let scale = 1 / 8;
        const noise = Noise.perlin2.bind(Noise);
        const octave = 3;
        let n = 0;

        for (let i = 0; i < octave; i++)
        {
            n += noise((x + this.basePos.x) * scale, (y + this.basePos.y) * scale) * Math.pow(0.5, i + 1);
            scale *= 2;
        }

        if (n > threshold)
            this.setTile(vec2(x, y), GameMap.tileWall);
        else
            this.setTile(vec2(x, y), GameMap.tileGround);
    }
}

interface GameTile extends TileData
{
    name: string,
}

export class GameMap extends Tilemap<NoiseChunk>
{
    static instance: GameMap = null as any;
    static tileGround: GameTile = {
        sprite: null,
        collide: false,
        name: "ground",
    };
    static tileWall: GameTile = {
        sprite: null,
        collide: true,
        name: "wall",
    };
    static tileSnake: GameTile = {
        sprite: null,
        collide: false,
        name: "snake",
    };
    static tileFood: GameTile = {
        sprite: null,
        collide: false,
        name: "food",
    }


    constructor(seed: number)
    {
        Noise = new noisejs.Noise(seed);
        super(NoiseChunk);
        GameMap.instance = this;
        this.collider = new TilemapCollider();
    }

    static async loadMapAssets()
    {
        const checkboard = await TextureImporter.url(imgCheckBoard).then(r => r.tex2d());
        GameMap.tileGround.sprite = new Sprite(checkboard, vec2(4), vec2(0, 0));
        GameMap.tileGround.sprite.color = Color.fromString("#eeeeee");
        GameMap.tileWall.sprite = new Sprite(checkboard, vec2(4), vec2(0, 1));
        GameMap.tileWall.sprite.color = Color.fromString("#cccccc");
        GameMap.tileSnake.sprite = new Sprite(checkboard, vec2(4), vec2(0, 2));
        GameMap.tileSnake.sprite.color = Color.fromString("#eeeeee");
        GameMap.tileFood.sprite = new Sprite(checkboard, vec2(4), vec2(0, 3));
        GameMap.tileFood.sprite.color = Color.fromString("#eeeeee");
    }
}
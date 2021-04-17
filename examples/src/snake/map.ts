import { Chunk, Color, Sprite, TextureImporter, TileData, vec2 } from "zogra-engine";
import imgCheckBoard from "../asset/img/checkboard.png";
import noisejs = require("noisejs");

const Noise = new noisejs.Noise();

export class NoiseChunk extends Chunk
{
    static tileGround: TileData = {
        sprite: null,
        collide: false,
    };
    static tileWall: TileData = {
        sprite: null,
        collide: false,
    }
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
            this.setTile(vec2(x, y), NoiseChunk.tileWall);
        else
            this.setTile(vec2(x, y), NoiseChunk.tileGround);
    }
}

export async function loadMapAssets()
{
    const checkboard = await TextureImporter.url(imgCheckBoard).then(r => r.tex2d());
    NoiseChunk.tileGround.sprite = new Sprite(checkboard, vec2(4), vec2(0, 0));
    NoiseChunk.tileGround.sprite.color = Color.fromString("#cccccc");
    NoiseChunk.tileWall.sprite = new Sprite(checkboard, vec2(4), vec2(0, 1));
    NoiseChunk.tileWall.sprite.color = Color.fromString("#eeeeee");
}
import { ZograEngine, Camera, vec3, Entity, rgb } from "zogra-renderer";
import { initCamera } from "./camera-controller";

export class ZograEditor
{
    engine: ZograEngine;
    constructor(engine: ZograEngine)
    {
        this.engine = engine;
    }
    init()
    {
        this.engine.start();
        initCamera(this);

    }
}

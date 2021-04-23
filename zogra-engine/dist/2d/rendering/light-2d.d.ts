import { Entity } from "../../engine/entity";
export declare enum ShadowType {
    Soft = "soft",
    Hard = "hard"
}
export declare class Light2D extends Entity {
    shadowType: ShadowType | false;
    volumnRadius: number;
    lightRange: number;
    private shadowMesh;
    constructor();
    updateShadowMesh(): void;
    private appendLineShadow;
    private circleTangentThroughPoint;
}

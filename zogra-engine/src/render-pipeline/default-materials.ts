import { Default2DMaterial } from "../2d/rendering/materials";
import { ParticleMaterial } from "../engine/particle-system";

export const BuiltinMaterials = {
    spriteDefault: new Default2DMaterial(),
    tilemapDefault: new Default2DMaterial(),
    particleDefault: new ParticleMaterial(),
}
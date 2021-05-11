"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuiltinMaterials = void 0;
const materials_1 = require("../2d/rendering/materials");
const particle_system_1 = require("../engine/particle-system");
exports.BuiltinMaterials = {
    spriteDefault: new materials_1.Default2DMaterial(),
    tilemapDefault: new materials_1.Default2DMaterial(),
    particleDefault: new particle_system_1.ParticleMaterial(),
};
//# sourceMappingURL=default-materials.js.map
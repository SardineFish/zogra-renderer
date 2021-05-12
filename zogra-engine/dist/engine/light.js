import { Entity } from "./entity";
import { Color } from "zogra-renderer";
export var LightType;
(function (LightType) {
    LightType[LightType["Directional"] = 0] = "Directional";
    LightType[LightType["Point"] = 1] = "Point";
})(LightType || (LightType = {}));
export class Light extends Entity {
    constructor(type = LightType.Directional) {
        super();
        this.intensity = 1;
        this.color = Color.white;
        this.type = type;
    }
}
//# sourceMappingURL=light.js.map
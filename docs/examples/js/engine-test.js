/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/engine-test.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../zogra-engine/dist/2d/index.js":
/*!****************************************!*\
  !*** ../zogra-engine/dist/2d/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(__webpack_require__(/*! ./physics/box-collider */ "../zogra-engine/dist/2d/physics/box-collider.js"), exports);
__exportStar(__webpack_require__(/*! ./physics/collider2d */ "../zogra-engine/dist/2d/physics/collider2d.js"), exports);
__exportStar(__webpack_require__(/*! ./physics/physics-2d */ "../zogra-engine/dist/2d/physics/physics-2d.js"), exports);
__exportStar(__webpack_require__(/*! ./physics/rigidbody2d */ "../zogra-engine/dist/2d/physics/rigidbody2d.js"), exports);
__exportStar(__webpack_require__(/*! ./physics/tilemap-collider */ "../zogra-engine/dist/2d/physics/tilemap-collider.js"), exports);
__exportStar(__webpack_require__(/*! ./rendering/sprite */ "../zogra-engine/dist/2d/rendering/sprite.js"), exports);
__exportStar(__webpack_require__(/*! ./rendering/sprite-object */ "../zogra-engine/dist/2d/rendering/sprite-object.js"), exports);
__exportStar(__webpack_require__(/*! ./rendering/tilemap */ "../zogra-engine/dist/2d/rendering/tilemap.js"), exports);
__exportStar(__webpack_require__(/*! ./rendering/materials */ "../zogra-engine/dist/2d/rendering/materials.js"), exports);
__exportStar(__webpack_require__(/*! ./rendering/line-renderer */ "../zogra-engine/dist/2d/rendering/line-renderer.js"), exports);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../zogra-engine/dist/2d/physics/box-collider.js":
/*!*******************************************************!*\
  !*** ../zogra-engine/dist/2d/physics/box-collider.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.BoxCollider = void 0;
const zogra_renderer_1 = __webpack_require__(/*! zogra-renderer */ "../zogra-renderer/dist/index.js");
const collider2d_1 = __webpack_require__(/*! ./collider2d */ "../zogra-engine/dist/2d/physics/collider2d.js");
const box_box_1 = __webpack_require__(/*! ./collision/box-box */ "../zogra-engine/dist/2d/physics/collision/box-box.js");
const tilemap_box_1 = __webpack_require__(/*! ./collision/tilemap-box */ "../zogra-engine/dist/2d/physics/collision/tilemap-box.js");
const tilemap_collider_1 = __webpack_require__(/*! ./tilemap-collider */ "../zogra-engine/dist/2d/physics/tilemap-collider.js");
class BoxCollider extends collider2d_1.Collider2D {
    constructor() {
        super(...arguments);
        this.offset = zogra_renderer_1.vec2.zero();
        this.size = zogra_renderer_1.vec2.one();
    }
    /** @internal */
    checkCollision(other, otherMotion) {
        if (other instanceof tilemap_collider_1.TilemapCollider)
            return tilemap_box_1.checkCollisionTilemapBox(other, this, otherMotion.negative);
        console.warn("Unimplemented collision check");
        return null;
    }
    /** @internal */
    checkContact(other) {
        if (other instanceof tilemap_collider_1.TilemapCollider)
            return tilemap_box_1.checkContactTilemapBox(other, this);
        else if (other instanceof BoxCollider)
            return box_box_1.checkContactBoxBox(this, other);
        console.warn("Unimplemented collision check");
        return false;
    }
}
exports.BoxCollider = BoxCollider;
//# sourceMappingURL=box-collider.js.map

/***/ }),

/***/ "../zogra-engine/dist/2d/physics/collider2d.js":
/*!*****************************************************!*\
  !*** ../zogra-engine/dist/2d/physics/collider2d.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Collider2D = void 0;
const zogra_renderer_1 = __webpack_require__(/*! zogra-renderer */ "../zogra-renderer/dist/index.js");
const physics_generic_1 = __webpack_require__(/*! ../../physics/physics-generic */ "../zogra-engine/dist/physics/physics-generic.js");
class Collider2D extends physics_generic_1.ColliderBase {
    constructor() {
        super(...arguments);
        this.rigidbody = null;
        this.enabled = true;
        /** @internal */
        this.__eventEmitter = new zogra_renderer_1.EventEmitter();
        /** @internal */
        this.__colliderIdx = -1;
    }
    on(event, listener) {
        this.__eventEmitter.on(event, listener);
    }
    off(event, listener) {
        this.__eventEmitter.on(event, listener);
    }
}
exports.Collider2D = Collider2D;
//# sourceMappingURL=collider2d.js.map

/***/ }),

/***/ "../zogra-engine/dist/2d/physics/collision/box-box.js":
/*!************************************************************!*\
  !*** ../zogra-engine/dist/2d/physics/collision/box-box.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.checkContactBoxBox = void 0;
const zogra_renderer_1 = __webpack_require__(/*! zogra-renderer */ "../zogra-renderer/dist/index.js");
function checkContactBoxBox(self, other) {
    if (!self.entity || !other.entity)
        return false;
    const selfCenter = self.entity.position.toVec2().plus(self.offset);
    const otherCenter = other.entity.position.toVec2().plus(other.offset);
    const offset = zogra_renderer_1.vec2.math(Math.abs)(zogra_renderer_1.vec2.minus(otherCenter, selfCenter));
    if (offset.x <= (self.size.x + other.size.x) / 2 && offset.y <= (self.size.y + other.size.y) / 2)
        return true;
    return false;
}
exports.checkContactBoxBox = checkContactBoxBox;
//# sourceMappingURL=box-box.js.map

/***/ }),

/***/ "../zogra-engine/dist/2d/physics/collision/tilemap-box.js":
/*!****************************************************************!*\
  !*** ../zogra-engine/dist/2d/physics/collision/tilemap-box.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.checkCollisionTilemapBox = exports.checkContactTilemapBox = void 0;
const zogra_renderer_1 = __webpack_require__(/*! zogra-renderer */ "../zogra-renderer/dist/index.js");
const global_1 = __webpack_require__(/*! zogra-renderer/dist/core/global */ "../zogra-renderer/dist/core/global.js");
function checkContactTilemapBox(tilemap, box) {
    var _a;
    if (!tilemap.entity || !box.entity)
        return false;
    const center = box.entity.position.toVec2().plus(box.offset);
    const centerTile = zogra_renderer_1.vec2.math(Math.floor)(center).plus(0.5);
    const tileDistance = zogra_renderer_1.vec2.math(Math.ceil)(zogra_renderer_1.vec2.mul(box.size, 0.5));
    for (var y = -tileDistance.y; y <= tileDistance.y; y++)
        for (var x = -tileDistance.x; x <= tileDistance.x; x++) {
            const tileCenter = zogra_renderer_1.vec2(x, y).plus(centerTile);
            const tile = (_a = tilemap.tilemap) === null || _a === void 0 ? void 0 : _a.getTile(tileCenter);
            if (tile === null || tile === void 0 ? void 0 : tile.collide) {
                if (Math.abs(center.x - tileCenter.x) <= box.size.x / 2 + 0.5 && Math.abs(center.y - tileCenter.y) <= box.size.y / 2 + 0.5)
                    return true;
            }
        }
    return false;
}
exports.checkContactTilemapBox = checkContactTilemapBox;
function checkCollisionTilemapBox(tilemap, box, boxMotion) {
    if (!box.entity || !tilemap.tilemap)
        return null;
    const halfSize = zogra_renderer_1.div(box.size, 2); // colliderSize / 2
    const center = box.entity.position.toVec2().plus(box.offset);
    const centerBeforeMotion = zogra_renderer_1.minus(center, boxMotion); // this.position + this.colliderOffset
    const tileDistance = zogra_renderer_1.vec2.math(Math.ceil)(halfSize);
    const centerFloor = zogra_renderer_1.vec2.math(Math.floor)(centerBeforeMotion);
    const motionDistance = boxMotion.magnitude;
    let everHit = false;
    let hitNormal = zogra_renderer_1.vec2.zero();
    let nearestHit = Number.MAX_VALUE;
    for (var y = -tileDistance.y; y <= tileDistance.y; y++)
        for (var x = -tileDistance.x; x <= tileDistance.x; x++) {
            const rect = new zogra_renderer_1.Rect(zogra_renderer_1.vec2(x, y).plus(centerFloor), zogra_renderer_1.plus(box.size, 1));
            global_1.Debug().drawRect(rect);
            const [hit, distance, normal] = zogra_renderer_1.boxRaycast(rect, centerBeforeMotion, boxMotion);
            if (hit && distance > 0 && distance <= motionDistance && zogra_renderer_1.dot(normal, boxMotion) < 0) {
                if (distance < nearestHit) {
                    everHit = true;
                    hitNormal = normal;
                }
            }
        }
    if (everHit) {
        const hitPoint = boxMotion.normalized.mul(nearestHit).plus(centerBeforeMotion);
        return {
            self: tilemap,
            other: box,
            point: hitPoint,
            seperation: zogra_renderer_1.minus(hitPoint, center),
        };
    }
    return null;
}
exports.checkCollisionTilemapBox = checkCollisionTilemapBox;
//# sourceMappingURL=tilemap-box.js.map

/***/ }),

/***/ "../zogra-engine/dist/2d/physics/physics-2d.js":
/*!*****************************************************!*\
  !*** ../zogra-engine/dist/2d/physics/physics-2d.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Physics2D = void 0;
const zogra_renderer_1 = __webpack_require__(/*! zogra-renderer */ "../zogra-renderer/dist/index.js");
class Physics2D {
    constructor() {
        this.gravity = zogra_renderer_1.vec2.zero();
        this.colliderList = [];
    }
    /** @internal */
    __addCollider(collider) {
        collider = collider;
        collider.__colliderIdx = this.colliderList.push(collider) - 1;
    }
    /** @internal */
    __removeCollider(collider) {
        // Swap tail collider and remove
        const coll = collider;
        if (coll.__colliderIdx >= 0) {
            if (this.colliderList.length > 1) {
                const tailCollider = this.colliderList[this.colliderList.length - 1];
                tailCollider.__colliderIdx = coll.__colliderIdx;
                this.colliderList[coll.__colliderIdx] = tailCollider;
            }
            this.colliderList.length--;
        }
    }
    update(time) {
        var _a, _b, _c, _d, _e;
        this.updateMotion(time);
        for (let i = 0; i < this.colliderList.length; i++) {
            const colliderA = this.colliderList[i];
            for (let j = i + 1; j < this.colliderList.length; j++) {
                if (i === j)
                    continue;
                const colliderB = this.colliderList[j];
                if (colliderA.checkContact(colliderB)) {
                    colliderA.__eventEmitter.emit("onContact", colliderB);
                    colliderB.__eventEmitter.emit("onContact", colliderA);
                }
                else
                    continue;
                if (!colliderA.rigidbody && !colliderB.rigidbody)
                    continue;
                const [self, other] = (!colliderB.rigidbody) ? [colliderB, colliderA] : [colliderA, colliderB];
                const relativeMotion = zogra_renderer_1.minus((_b = (_a = other.rigidbody) === null || _a === void 0 ? void 0 : _a._motion) !== null && _b !== void 0 ? _b : zogra_renderer_1.vec2.zero(), (_d = (_c = self.rigidbody) === null || _c === void 0 ? void 0 : _c._motion) !== null && _d !== void 0 ? _d : zogra_renderer_1.vec2.zero());
                const collision = self.checkCollision(other, relativeMotion);
                if (collision) {
                    if (self.rigidbody && other.rigidbody) {
                        console.warn("Collision between two rigidbody is not implement");
                        continue;
                    }
                    (_e = other.entity) === null || _e === void 0 ? void 0 : _e.translate(collision.seperation.toVec3());
                    self.__eventEmitter.emit("onCollide", collision);
                    collision.self = other;
                    collision.other = self;
                    other.__eventEmitter.emit("onCollide", collision);
                }
            }
        }
    }
    updateMotion(time) {
        var _a;
        const gravity = this.gravity;
        const applyGravity = gravity.x !== 0 && gravity.y !== 0;
        for (let i = 0; i < this.colliderList.length; i++) {
            const rigidbody = this.colliderList[i].rigidbody;
            if (!rigidbody)
                continue;
            if (applyGravity)
                rigidbody.addAcceleration(gravity);
            rigidbody._velocity.x += rigidbody._acceleration.x * time.deltaTime;
            rigidbody._velocity.y += rigidbody._acceleration.y * time.deltaTime;
            const motion = zogra_renderer_1.mul(rigidbody._velocity, time.deltaTime);
            (_a = rigidbody.collider.entity) === null || _a === void 0 ? void 0 : _a.translate(motion.toVec3());
            rigidbody._motion = motion;
        }
    }
}
exports.Physics2D = Physics2D;
//# sourceMappingURL=physics-2d.js.map

/***/ }),

/***/ "../zogra-engine/dist/2d/physics/rigidbody2d.js":
/*!******************************************************!*\
  !*** ../zogra-engine/dist/2d/physics/rigidbody2d.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Rigidbody2D = void 0;
const zogra_renderer_1 = __webpack_require__(/*! zogra-renderer */ "../zogra-renderer/dist/index.js");
class Rigidbody2D {
    constructor(collider) {
        this.mass = 1;
        /** @internal */
        this._velocity = zogra_renderer_1.vec2.zero();
        /** @internal */
        this._acceleration = zogra_renderer_1.vec2.zero();
        /** @internal */
        this._motion = zogra_renderer_1.vec2.zero();
        this.collider = collider;
    }
    get velocity() { return this._velocity; }
    set velocity(v) { this._velocity.set(v); }
    get acceleration() { return this._acceleration; }
    addForce(force) {
        this._acceleration.x += force.x / this.mass;
        this._acceleration.y += force.y / this.mass;
    }
    addAcceleration(acrl) {
        this._acceleration.plus(acrl);
    }
    setAcceleration(acrl) {
        this._acceleration.set(acrl);
    }
    setForce(force) {
        this._acceleration.x = force.x / this.mass;
        this._acceleration.y = force.y / this.mass;
    }
    clearForce() {
        this._acceleration.x = 0;
        this._acceleration.y = 0;
    }
}
exports.Rigidbody2D = Rigidbody2D;
//# sourceMappingURL=rigidbody2d.js.map

/***/ }),

/***/ "../zogra-engine/dist/2d/physics/tilemap-collider.js":
/*!***********************************************************!*\
  !*** ../zogra-engine/dist/2d/physics/tilemap-collider.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.TilemapCollider = void 0;
const tilemap_1 = __webpack_require__(/*! ../rendering/tilemap */ "../zogra-engine/dist/2d/rendering/tilemap.js");
const box_collider_1 = __webpack_require__(/*! ./box-collider */ "../zogra-engine/dist/2d/physics/box-collider.js");
const collider2d_1 = __webpack_require__(/*! ./collider2d */ "../zogra-engine/dist/2d/physics/collider2d.js");
const tilemap_box_1 = __webpack_require__(/*! ./collision/tilemap-box */ "../zogra-engine/dist/2d/physics/collision/tilemap-box.js");
class TilemapCollider extends collider2d_1.Collider2D {
    constructor() {
        super(...arguments);
        this._tilemap = null;
    }
    get tilemap() { return this._tilemap; }
    /** @internal */
    __bind(entity, scene) {
        super.__bind(entity, scene);
        if (entity instanceof tilemap_1.Tilemap)
            this._tilemap = entity;
    }
    /** @internal */
    checkCollision(other, otherMotion) {
        if (other instanceof box_collider_1.BoxCollider)
            return tilemap_box_1.checkCollisionTilemapBox(this, other, otherMotion);
        console.warn("Unimplemented collision check");
        return null;
    }
    /** @internal */
    checkContact(other) {
        if (other instanceof box_collider_1.BoxCollider)
            return tilemap_box_1.checkContactTilemapBox(this, other);
        console.warn("Unimplemented contact check");
        return false;
    }
}
exports.TilemapCollider = TilemapCollider;
//# sourceMappingURL=tilemap-collider.js.map

/***/ }),

/***/ "../zogra-engine/dist/2d/rendering/line-renderer.js":
/*!**********************************************************!*\
  !*** ../zogra-engine/dist/2d/rendering/line-renderer.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.LineRenderer = void 0;
const zogra_renderer_1 = __webpack_require__(/*! zogra-renderer */ "../zogra-renderer/dist/index.js");
const render_object_1 = __webpack_require__(/*! ../../engine/render-object */ "../zogra-engine/dist/engine/render-object.js");
class LineRenderer extends render_object_1.RenderObject {
    constructor() {
        super(...arguments);
        this.mesh = new zogra_renderer_1.Mesh();
        this.dirty = false;
        this.points = [];
    }
    updateMesh() {
        this.dirty = true;
    }
    render(context, data) {
        this.rebuildMesh();
        context.renderer.drawMesh(this.mesh, zogra_renderer_1.mat4.identity(), this.materials[0]);
    }
    rebuildMesh() {
        if (!this.dirty)
            return;
        const lineCount = this.points.length - 1;
        if (lineCount < 1)
            this.mesh.resize(this.mesh.vertices.length, 0);
        this.mesh.resize(lineCount * 4, lineCount * 6, false);
        const dir = zogra_renderer_1.vec2.zero();
        const normal = zogra_renderer_1.vec2.zero();
        const p0 = zogra_renderer_1.vec2.zero();
        const p1 = zogra_renderer_1.vec2.zero();
        const p2 = zogra_renderer_1.vec2.zero();
        const p3 = zogra_renderer_1.vec2.zero();
        for (let i = 0; i < this.points.length - 1; i++) {
            const endpointA = this.points[i];
            const endpointB = this.points[i + 1];
            zogra_renderer_1.vec2.minus(dir, endpointB.position, endpointA.position);
            dir.normalize();
            if (dir.isZero)
                continue;
            zogra_renderer_1.vec2.perpendicular(normal, dir);
            if (i > 0) {
                intersectPoints([p0, p1], this.points[i - 1], this.points[i], this.points[i + 1]);
            }
            else {
                // p0 = epA + normal * w
                p0.set(normal).mul(endpointA.width / 2).plus(endpointA.position);
                // p1 = epA - nromal * w
                p1.set(normal).mul(-endpointA.width / 2).plus(endpointA.position);
            }
            if (i < this.points.length - 2) {
                intersectPoints([p2, p3], this.points[i], this.points[i + 1], this.points[i + 2]);
            }
            else {
                p2.set(normal).mul(endpointB.width / 2).plus(endpointB.position);
                p3.set(normal).mul(-endpointB.width / 2).plus(endpointB.position);
            }
            const vertBase = i * 4;
            this.mesh.vertices[vertBase + 0].vert.set(p0);
            this.mesh.vertices[vertBase + 1].vert.set(p1);
            this.mesh.vertices[vertBase + 2].vert.set(p2);
            this.mesh.vertices[vertBase + 3].vert.set(p3);
            this.mesh.vertices[vertBase + 0].color.set(endpointA.color);
            this.mesh.vertices[vertBase + 1].color.set(endpointA.color);
            this.mesh.vertices[vertBase + 2].color.set(endpointB.color);
            this.mesh.vertices[vertBase + 3].color.set(endpointB.color);
            this.mesh.vertices[vertBase + 0].uv.set([0, 1]);
            this.mesh.vertices[vertBase + 1].uv.set([0, 0]);
            this.mesh.vertices[vertBase + 2].uv.set([1, 1]);
            this.mesh.vertices[vertBase + 3].uv.set([1, 0]);
            const indexBase = i * 6;
            this.mesh.indices[indexBase + 0] = vertBase + 0;
            this.mesh.indices[indexBase + 1] = vertBase + 1;
            this.mesh.indices[indexBase + 2] = vertBase + 3;
            this.mesh.indices[indexBase + 3] = vertBase + 0;
            this.mesh.indices[indexBase + 4] = vertBase + 3;
            this.mesh.indices[indexBase + 5] = vertBase + 2;
        }
        this.dirty = false;
    }
}
exports.LineRenderer = LineRenderer;
// See: https://www.geogebra.org/geometry/bhhyyttg
function intersectPoints(out, epA, center, epB) {
    const [dirA, dirB] = out;
    zogra_renderer_1.vec2.minus(dirA, epA.position, center.position).normalize();
    zogra_renderer_1.vec2.minus(dirB, epB.position, center.position).normalize();
    const halfDir = zogra_renderer_1.plus(dirA, dirB).div(2);
    let sinBeta = 0;
    if (zogra_renderer_1.vec2.dot(halfDir, halfDir) <= 1e-7) {
        zogra_renderer_1.vec2.perpendicular(halfDir, dirB);
        sinBeta = 1;
    }
    else if (dirA.isZero) {
        zogra_renderer_1.vec2.perpendicular(halfDir, dirB);
        sinBeta = 1;
    }
    else if (dirB.isZero) {
        zogra_renderer_1.vec2.perpendicular(halfDir, dirA);
        sinBeta = -1;
    }
    else {
        halfDir.normalize();
        sinBeta = Math.sign(zogra_renderer_1.vec2.cross(dirB, dirA)) * Math.sqrt((1 - zogra_renderer_1.dot(dirA, dirB)) / 2);
    }
    const length = center.width / 2 / sinBeta;
    const p0 = dirA.set(halfDir).mul(length).plus(center.position);
    const p1 = dirB.set(halfDir).mul(-length).plus(center.position);
    if (isNaN(p0.x) || isNaN(p0.y) || isNaN(p1.x) || isNaN(p1.y))
        console.log(p0, p1);
    return [p0, p1];
}
//# sourceMappingURL=line-renderer.js.map

/***/ }),

/***/ "../zogra-engine/dist/2d/rendering/materials.js":
/*!******************************************************!*\
  !*** ../zogra-engine/dist/2d/rendering/materials.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default2DMaterial = void 0;
const zogra_renderer_1 = __webpack_require__(/*! zogra-renderer */ "../zogra-renderer/dist/index.js");
const assets_1 = __webpack_require__(/*! ../../assets */ "../zogra-engine/dist/assets/index.js");
class Default2DMaterial extends zogra_renderer_1.MaterialFromShader(new zogra_renderer_1.Shader(...assets_1.ShaderSource.default2D, {
    cull: zogra_renderer_1.Culling.Disable,
    depth: zogra_renderer_1.DepthTest.Disable,
    zWrite: false,
    blend: [zogra_renderer_1.Blending.SrcAlpha, zogra_renderer_1.Blending.OneMinusSrcAlpha],
})) {
    constructor() {
        super(...arguments);
        this.texture = null;
        this.color = zogra_renderer_1.Color.white;
    }
}
__decorate([
    zogra_renderer_1.shaderProp("uMainTex", "tex2d")
], Default2DMaterial.prototype, "texture", void 0);
__decorate([
    zogra_renderer_1.shaderProp("uColor", "color")
], Default2DMaterial.prototype, "color", void 0);
exports.Default2DMaterial = Default2DMaterial;
//# sourceMappingURL=materials.js.map

/***/ }),

/***/ "../zogra-engine/dist/2d/rendering/sprite-object.js":
/*!**********************************************************!*\
  !*** ../zogra-engine/dist/2d/rendering/sprite-object.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.SpriteObject = void 0;
const zogra_renderer_1 = __webpack_require__(/*! zogra-renderer */ "../zogra-renderer/dist/index.js");
const render_object_1 = __webpack_require__(/*! ../../engine/render-object */ "../zogra-engine/dist/engine/render-object.js");
const materials_1 = __webpack_require__(/*! ./materials */ "../zogra-engine/dist/2d/rendering/materials.js");
class SpriteObject extends render_object_1.RenderObject {
    constructor() {
        super();
        this.mesh = zogra_renderer_1.MeshBuilder.quad();
        this.material = new materials_1.Default2DMaterial();
        this._sprite = null;
        this.meshes[0] = this.mesh;
        this.materials[0] = this.material;
    }
    get sprite() { return this._sprite; }
    set sprite(sprite) {
        this._sprite = sprite;
        if (sprite) {
            this.material.texture = sprite.texture;
            this.mesh.vertices[0].uv.set([sprite.uvRect.xMin, sprite.uvRect.yMin]);
            this.mesh.vertices[1].uv.set([sprite.uvRect.xMax, sprite.uvRect.yMin]);
            this.mesh.vertices[2].uv.set([sprite.uvRect.xMax, sprite.uvRect.yMax]);
            this.mesh.vertices[3].uv.set([sprite.uvRect.xMin, sprite.uvRect.yMax]);
            this.mesh.vertices[0].color.set(sprite.color);
            this.mesh.vertices[1].color.set(sprite.color);
            this.mesh.vertices[2].color.set(sprite.color);
            this.mesh.vertices[3].color.set(sprite.color);
            this.mesh.update();
        }
        else {
            this.material.texture = null;
        }
    }
}
exports.SpriteObject = SpriteObject;
//# sourceMappingURL=sprite-object.js.map

/***/ }),

/***/ "../zogra-engine/dist/2d/rendering/sprite.js":
/*!***************************************************!*\
  !*** ../zogra-engine/dist/2d/rendering/sprite.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Sprite = void 0;
const zogra_renderer_1 = __webpack_require__(/*! zogra-renderer */ "../zogra-renderer/dist/index.js");
class Sprite {
    constructor(texture, cellCount, cell) {
        this.color = zogra_renderer_1.Color.white;
        this.texture = texture;
        this.uvRect = new zogra_renderer_1.Rect(zogra_renderer_1.div(cell, cellCount), zogra_renderer_1.div(1, cellCount));
    }
}
exports.Sprite = Sprite;
//# sourceMappingURL=sprite.js.map

/***/ }),

/***/ "../zogra-engine/dist/2d/rendering/tilemap.js":
/*!****************************************************!*\
  !*** ../zogra-engine/dist/2d/rendering/tilemap.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Chunk = exports.Tilemap = void 0;
const zogra_renderer_1 = __webpack_require__(/*! zogra-renderer */ "../zogra-renderer/dist/index.js");
const render_object_1 = __webpack_require__(/*! ../../engine/render-object */ "../zogra-engine/dist/engine/render-object.js");
const materials_1 = __webpack_require__(/*! ./materials */ "../zogra-engine/dist/2d/rendering/materials.js");
class Tilemap extends render_object_1.RenderObject {
    constructor(...args) {
        super();
        this.chunks = new Map();
        this.materials[0] = new materials_1.Default2DMaterial();
        if (args.length === 0) {
            this.chunkSize = 16;
            this.ChunkType = Chunk;
        }
        else if (args.length === 1) {
            if (typeof (args[0]) === "number") {
                this.chunkSize = args[0];
                this.ChunkType = Chunk;
            }
            else {
                this.chunkSize = 16;
                this.ChunkType = args[0];
            }
        }
        else {
            [this.chunkSize, this.ChunkType] = args;
        }
    }
    render(context, data) {
        this.eventEmitter.with().emit("render", this, context, data);
        let screenSize = zogra_renderer_1.vec2(data.camera.viewHeight * data.camera.aspectRatio, data.camera.viewHeight);
        let [minCorner] = this.chunkPos(zogra_renderer_1.minus(data.camera.position.toVec2(), screenSize));
        let [maxCorner] = this.chunkPos(zogra_renderer_1.plus(data.camera.position.toVec2(), screenSize));
        // context.renderer.drawMesh(this.mesh, mat4.translate(vec3(0, 0, 0)), this.materials[0]);
        // return;
        for (let chunkY = minCorner.y; chunkY <= maxCorner.y; chunkY++)
            for (let chunkX = minCorner.x; chunkX <= maxCorner.x; chunkX++) {
                const chunk = this.getOrCreateChunk(zogra_renderer_1.vec2(chunkX, chunkY));
                // chunk.mesh.update();
                context.renderer.drawMesh(chunk.mesh, this.localToWorldMatrix, this.materials[0]);
            }
    }
    getTile(pos) {
        let [chunkPos, offset] = this.chunkPos(zogra_renderer_1.vec2.math(Math.floor)(pos));
        let chunk = this.getOrCreateChunk(chunkPos);
        return chunk.getTile(offset);
    }
    setTile(pos, tile) {
        let [chunkPos, offset] = this.chunkPos(zogra_renderer_1.vec2.math(Math.floor)(pos));
        let chunk = this.getOrCreateChunk(chunkPos);
        return chunk.setTile(offset, tile);
    }
    getChunkAt(pos) {
        let [chunkPos, _] = this.chunkPos(zogra_renderer_1.vec2.math(Math.floor)(pos));
        return this.getOrCreateChunk(chunkPos);
    }
    visibleChunkRange(camera) {
        let screenSize = zogra_renderer_1.vec2(camera.viewHeight * camera.aspectRatio, camera.viewHeight);
        let [minCorner] = this.chunkPos(zogra_renderer_1.minus(camera.position.toVec2(), screenSize));
        let [maxCorner] = this.chunkPos(zogra_renderer_1.plus(camera.position.toVec2(), screenSize));
        return [minCorner, zogra_renderer_1.plus(maxCorner, 1)];
    }
    getOrCreateChunk(chunkPos) {
        const idx = this.calcChunkID(chunkPos);
        let chunk = this.chunks.get(idx);
        if (!chunk) {
            chunk = new this.ChunkType(chunkPos.mul(this.chunkSize), this.chunkSize);
            this.chunks.set(idx, chunk);
            return chunk;
        }
        return chunk;
    }
    getChunk(chunkPos) {
        const idx = this.calcChunkID(chunkPos);
        return this.chunks.get(idx);
    }
    calcChunkID(chunkPos) {
        let x = chunkPos.x;
        let y = chunkPos.y;
        if (chunkPos.x == -0)
            x = 0;
        if (chunkPos.y == -0)
            y = 0;
        const signX = x >= 0 ? 0 : 1;
        const signY = y >= 0 ? 0 : 1;
        return (signX << 31) | (Math.abs(Math.floor(x)) << 16) | (signY << 15) | Math.abs(Math.floor(y));
    }
    /**
     * floor in callee
     * @param pos No need to floor
     * @returns
     */
    chunkPos(pos) {
        let floorPos = zogra_renderer_1.vec2.math(Math.floor)(pos);
        // const floorOffset = vec2(
        //     floorPos.x < 0 ? /*1*/ 0 : 0,
        //     floorPos.y < 0 ? /*1*/ 0 : 0,
        // );
        return [zogra_renderer_1.vec2.math(Math.floor)(zogra_renderer_1.div(floorPos, this.chunkSize)),
            zogra_renderer_1.vec2.math(floorReminder)(floorPos, zogra_renderer_1.vec2(this.chunkSize))];
    }
}
exports.Tilemap = Tilemap;
class Chunk {
    constructor(basePos, chunkSize) {
        this.dirty = false;
        this.chunkSize = chunkSize;
        this.basePos = basePos;
        this.tiles = 5(chunkSize * chunkSize);
        this.mesh = createChunkMesh(basePos, chunkSize);
    }
    /**
     *
     * @param offset Tile offset relative to chunk base position
     * @returns
     */
    getTile(offset) {
        const idx = offset.y * this.chunkSize + offset.x;
        return this.tiles[idx];
    }
    /**
     *
     * @param offset Tile offset relative to chunk base position
     * @param tile
     */
    setTile(offset, tile) {
        // if (tile)
        //     tile = {
        //         collide: tile.collide,
        //         texture_offset: tile.texture_offset.clone()
        //     };
        let idx = offset.y * this.chunkSize + offset.x;
        this.tiles[idx] = tile;
        // let uv = this.mesh.uvs;
        idx *= 4;
        if (tile === null || tile === void 0 ? void 0 : tile.sprite) {
            this.mesh.vertices[idx + 0].uv.set([tile.sprite.uvRect.xMin, tile.sprite.uvRect.yMin]);
            this.mesh.vertices[idx + 1].uv.set([tile.sprite.uvRect.xMax, tile.sprite.uvRect.yMin]);
            this.mesh.vertices[idx + 2].uv.set([tile.sprite.uvRect.xMax, tile.sprite.uvRect.yMax]);
            this.mesh.vertices[idx + 3].uv.set([tile.sprite.uvRect.xMin, tile.sprite.uvRect.yMax]);
            this.mesh.vertices[idx + 0].color.set(tile.sprite.color);
            this.mesh.vertices[idx + 1].color.set(tile.sprite.color);
            this.mesh.vertices[idx + 2].color.set(tile.sprite.color);
            this.mesh.vertices[idx + 3].color.set(tile.sprite.color);
            this.mesh.update();
        }
        // this.mesh.uvs = uv;
    }
}
exports.Chunk = Chunk;
function floorReminder(x, m) {
    return x >= 0
        ? x % m
        : (m + x % m) % m;
}
function createChunkMesh(basePos, chunkSize) {
    const builder = new zogra_renderer_1.MeshBuilder(chunkSize * chunkSize * 4, chunkSize * chunkSize * 6);
    const quad = [
        {
            vert: zogra_renderer_1.vec3(0),
            uv: zogra_renderer_1.vec2(0, 0),
        },
        {
            vert: zogra_renderer_1.vec3(0),
            uv: zogra_renderer_1.vec2(1, 0),
        },
        {
            vert: zogra_renderer_1.vec3(0),
            uv: zogra_renderer_1.vec2(1, 1),
        },
        {
            vert: zogra_renderer_1.vec3(0),
            uv: zogra_renderer_1.vec2(0, 1),
        }
    ];
    for (let y = 0; y < chunkSize; y++)
        for (let x = 0; x < chunkSize; x++) {
            quad[0].vert.set([x + basePos.x, y + basePos.y, 0]);
            quad[1].vert.set([x + 1 + basePos.x, y + basePos.y, 0]);
            quad[2].vert.set([x + 1 + basePos.x, y + 1 + basePos.y, 0]);
            quad[3].vert.set([x + basePos.x, y + 1 + basePos.y, 0]);
            builder.addPolygon(...quad);
        }
    return builder.toMesh();
}
//# sourceMappingURL=tilemap.js.map

/***/ }),

/***/ "../zogra-engine/dist/assets/index.js":
/*!********************************************!*\
  !*** ../zogra-engine/dist/assets/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __defProp = Object.defineProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
    for (var name in all)
        __defProp(target, name, { get: all[name], enumerable: true });
};
// assets/index.ts
__markAsModule(exports);
__export(exports, {
    ShaderSource: () => ShaderSource
});
// assets/shader/2d-vert.glsl
var d_vert_default = "#version 300 es\r\nprecision mediump float;\r\n\r\nin vec3 aPos;\r\nin vec4 aColor;\r\nin vec2 aUV;\r\nin vec3 aNormal;\r\n\r\nuniform mat4 uTransformM;\r\nuniform mat4 uTransformVP;\r\nuniform mat4 uTransformMVP;\r\nuniform mat4 uTransformM_IT;\r\n\r\nout vec4 vColor;\r\nout vec4 vPos;\r\nout vec2 vUV;\r\nout vec3 vNormal;\r\nout vec3 vWorldPos;\r\n\r\nvoid main()\r\n{\r\n    gl_Position = uTransformMVP * vec4(aPos, 1);\r\n    vPos = gl_Position;\r\n    vColor = aColor;\r\n    vUV = aUV;\r\n    vNormal = (uTransformM_IT *  vec4(aNormal, 0)).xyz;\r\n    vWorldPos = (uTransformM * vec4(aPos, 1)).xyz;\r\n    \r\n}";
// assets/shader/2d-frag.glsl
var d_frag_default = "#version 300 es\r\nprecision mediump float;\r\n\r\nin vec4 vColor;\r\nin vec4 vPos;\r\nin vec2 vUV;\r\n\r\nuniform sampler2D uMainTex;\r\nuniform vec4 uColor;\r\n\r\nout vec4 fragColor;\r\n\r\nvoid main()\r\n{\r\n    vec4 color = texture(uMainTex, vUV.xy).rgba;\r\n    // color = color * vec3(uColor);\r\n    fragColor = color.rgba * vColor.rgba * uColor.rgba;\r\n    // fragColor = vec4(vUV.xy, 0, 1);\r\n}";
// assets/shader/particle-vert.glsl
var particle_vert_default = "#version 300 es\r\nprecision mediump float;\r\n\r\nin vec3 aPos;\r\nin vec4 aColor;\r\nin vec2 aUV;\r\nin vec3 aNormal;\r\n\r\nin vec3 particlePos;\r\nin vec3 particleRotation;\r\nin float particleSize;\r\n\r\nuniform mat4 uTransformM;\r\nuniform mat4 uTransformVP;\r\nuniform mat4 uTransformMVP;\r\nuniform mat4 uTransformM_IT;\r\n\r\nout vec4 vColor;\r\nout vec4 vPos;\r\nout vec2 vUV;\r\nout vec3 vNormal;\r\nout vec3 vWorldPos;\r\n\r\n#define PI (3.14159265358979323846264338327950288419716939937510)\r\n\r\nvec4 from_euler(float x, float y, float z)\r\n{\r\n    float halfToRad = PI / 360.0;\r\n    x *= halfToRad;\r\n    z *= halfToRad;\r\n    y *= halfToRad;\r\n\r\n    float sx = sin(x);\r\n    float cx = cos(x);\r\n    float sy = sin(y);\r\n    float cy = cos(y);\r\n    float sz = sin(z);\r\n    float cz = cos(z);\r\n\r\n    vec4 q;\r\n    q[0] = sx * cy * cz - cx * sy * sz;\r\n    q[1] = cx * sy * cz + sx * cy * sz;\r\n    q[2] = cx * cy * sz - sx * sy * cz;\r\n    q[3] = cx * cy * cz + sx * sy * sz;\r\n    return q;\r\n}\r\n\r\nmat4 from_rts(vec4 q, vec3 v, vec3 s)\r\n{\r\n    mat4 m;\r\n    float x = q[0];\r\n    float y = q[1];\r\n    float z = q[2];\r\n    float w = q[3];\r\n    float x2 = x + x;\r\n    float y2 = y + y;\r\n    float z2 = z + z;\r\n\r\n    float xx = x * x2;\r\n    float xy = x * y2;\r\n    float xz = x * z2;\r\n    float yy = y * y2;\r\n    float yz = y * z2;\r\n    float zz = z * z2;\r\n    float wx = w * x2;\r\n    float wy = w * y2;\r\n    float wz = w * z2;\r\n    float sx = s[0];\r\n    float sy = s[1];\r\n    float sz = s[2];\r\n\r\n    m[0][0] = (1.0 - (yy + zz)) * sx;\r\n    m[0][1] = (xy + wz) * sx;\r\n    m[0][2] = (xz - wy) * sx;\r\n    m[0][3] = 0.0;\r\n    m[1][0] = (xy - wz) * sy;\r\n    m[1][1] = (1.0 - (xx + zz)) * sy;\r\n    m[1][2] = (yz + wx) * sy;\r\n    m[1][3] = 0.0;\r\n    m[2][0] = (xz + wy) * sz;\r\n    m[2][1] = (yz - wx) * sz;\r\n    m[2][2] = (1.0 - (xx + yy)) * sz;\r\n    m[2][3] = 0.0;\r\n    m[3][0] = v[0];\r\n    m[3][1] = v[1];\r\n    m[3][2] = v[2];\r\n    m[3][3] = 1.0;\r\n\r\n    return m;\r\n}\r\n\r\nvoid main()\r\n{\r\n    vec4 rotation = from_euler(particleRotation.x, particleRotation.y, particleRotation.z);\r\n    mat4 rts = from_rts(rotation, particlePos, vec3(particleSize));\r\n    mat4 mvp = uTransformMVP * rts;\r\n    gl_Position = mvp * vec4(aPos, 1);\r\n    vPos = gl_Position;\r\n    vColor = aColor;\r\n    vUV = aUV;\r\n    vNormal = (uTransformM_IT *  vec4(aNormal, 0)).xyz;\r\n    vWorldPos = (uTransformM * vec4(aPos, 1)).xyz;\r\n    \r\n}";
// assets/shader/shader.ts
var ShaderSource = {
    default2D: [d_vert_default, d_frag_default],
    particle2D: [particle_vert_default, d_frag_default]
};
// Annotate the CommonJS export names for ESM import in node:
0 && (false);
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../zogra-engine/dist/engine/animation.js":
/*!************************************************!*\
  !*** ../zogra-engine/dist/engine/animation.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Animator = void 0;
const zogra_renderer_1 = __webpack_require__(/*! zogra-renderer */ "../zogra-renderer/dist/index.js");
class Animator {
    constructor(duration, timeline = null, time = 0) {
        this.timeScale = 1;
        this.callback = null;
        this.loop = false;
        this.state = "stopped";
        this.currentFrame = {};
        this.duration = duration;
        this.time = time;
        this.timeline = timeline;
    }
    get playing() { return this.state === "playing" || this.state === "pending"; }
    get finished() { return this.state === "stopped"; }
    play(time = 0) {
        this.time = time;
        this.state = "pending";
        if (this.timeline && this.timeline.length > 0)
            Object.assign(this.currentFrame, this.timeline[0].keyframe);
    }
    stop() {
        this.state = "stopped";
    }
    update(dt) {
        switch (this.state) {
            case "stopped":
                return;
            case "pending":
                this.state = "playing";
                this.checkEnd();
                this.updateAnimation(dt);
                break;
            case "playing":
                this.time += dt * this.timeScale;
                this.checkEnd();
                this.updateAnimation(dt);
                break;
        }
    }
    updateAnimation(dt) {
        if (!this.callback)
            return;
        this.updateFrame();
        this.callback({
            deltaTime: dt,
            frame: this.currentFrame,
            animator: this,
            time: this.time,
            progress: this.time / this.duration
        });
    }
    updateFrame() {
        if (this.timeline && this.timeline.length > 0) {
            for (let i = 0; i < this.timeline.length; i++) {
                if (this.timeline[i].time >= this.time) {
                    if (i === 0 || this.timeline[i].time === this.time)
                        Object.assign(this.currentFrame, this.timeline[i].keyframe);
                    else {
                        this.interpolate(this.currentFrame, this.timeline[i - 1], this.timeline[i]);
                    }
                    return this.currentFrame;
                }
            }
            if (this.loop) {
                this.interpolate(this.currentFrame, this.timeline[this.timeline.length - 1], this.timeline[0]);
            }
            else {
                Object.assign(this.currentFrame, this.timeline[this.timeline.length - 1].keyframe);
            }
        }
    }
    interpolate(frame, previous, next) {
        let t = (this.time - previous.time) / (next.time - previous.time);
        if (next.time < previous.time)
            t = (this.time - previous.time) / (this.duration - previous.time + next.time);
        for (const key in previous.keyframe) {
            frame[key] = previous.keyframe[key];
            if (typeof (previous.keyframe[key]) === "number" && typeof (next.keyframe[key]) === "number") {
                frame[key] = zogra_renderer_1.MathUtils.lerp(previous.keyframe[key], next.keyframe[key], t);
            }
        }
        return frame;
    }
    checkEnd() {
        if (this.time >= this.duration) {
            if (this.loop) {
                this.time %= this.duration;
            }
            else {
                this.time = this.duration;
                this.state = "stopped";
            }
        }
    }
}
exports.Animator = Animator;
//# sourceMappingURL=animation.js.map

/***/ }),

/***/ "../zogra-engine/dist/engine/camera.js":
/*!*********************************************!*\
  !*** ../zogra-engine/dist/engine/camera.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Camera = exports.Projection = void 0;
const zogra_renderer_1 = __webpack_require__(/*! zogra-renderer */ "../zogra-renderer/dist/index.js");
const zogra_renderer_2 = __webpack_require__(/*! zogra-renderer */ "../zogra-renderer/dist/index.js");
const zogra_renderer_3 = __webpack_require__(/*! zogra-renderer */ "../zogra-renderer/dist/index.js");
const zogra_renderer_4 = __webpack_require__(/*! zogra-renderer */ "../zogra-renderer/dist/index.js");
const entity_1 = __webpack_require__(/*! ./entity */ "../zogra-engine/dist/engine/entity.js");
const zogra_renderer_5 = __webpack_require__(/*! zogra-renderer */ "../zogra-renderer/dist/index.js");
const zogra_renderer_6 = __webpack_require__(/*! zogra-renderer */ "../zogra-renderer/dist/index.js");
const zogra_renderer_7 = __webpack_require__(/*! zogra-renderer */ "../zogra-renderer/dist/index.js");
const zogra_renderer_8 = __webpack_require__(/*! zogra-renderer */ "../zogra-renderer/dist/index.js");
const zogra_renderer_9 = __webpack_require__(/*! zogra-renderer */ "../zogra-renderer/dist/index.js");
const zogra_renderer_10 = __webpack_require__(/*! zogra-renderer */ "../zogra-renderer/dist/index.js");
var Projection;
(function (Projection) {
    Projection[Projection["Perspective"] = 0] = "Perspective";
    Projection[Projection["Orthographic"] = 1] = "Orthographic";
})(Projection = exports.Projection || (exports.Projection = {}));
class Camera extends entity_1.Entity {
    constructor(ctx = zogra_renderer_3.GlobalContext()) {
        super();
        this.output = zogra_renderer_2.RenderTarget.CanvasTarget;
        this.FOV = 30;
        this.near = 0.3;
        this.far = 1000;
        this.viewHeight = 1;
        this.projection = Projection.Perspective;
        this.clearColor = zogra_renderer_7.Color.black;
        this.clearDepth = true;
        this.ctx = ctx;
    }
    get pixelSize() {
        if (this.output instanceof zogra_renderer_1.RenderTexture)
            return zogra_renderer_4.vec2(this.output.width, this.output.height);
        else
            return zogra_renderer_4.vec2(this.ctx.width, this.ctx.height);
    }
    get aspectRatio() { return this.pixelSize.x / this.pixelSize.y; }
    get viewProjectionMatrix() {
        const matView = this.worldToLocalMatrix;
        const matProjection = this.projectionMatrix;
        return zogra_renderer_5.mat4.mul(matProjection, matView);
    }
    get projectionMatrix() {
        return this.projection === Projection.Perspective
            ? zogra_renderer_5.mat4.perspective(this.FOV * zogra_renderer_6.Deg2Rad, this.aspectRatio, this.near, this.far)
            : zogra_renderer_5.mat4.ortho(this.viewHeight, this.aspectRatio, this.near, this.far);
    }
    on(event, listener) {
        this.eventEmitter.with().on(event, listener);
    }
    off(event, listener) {
        this.eventEmitter.with().on(event, listener);
    }
    __preRender(context) {
        this.eventEmitter.with().emit("prerender", this, context);
    }
    __postRender(contect) {
        this.eventEmitter.with().emit("postrender", this, contect);
    }
    screenToRay(pos) {
        const p = this.screenToWorld(pos);
        return zogra_renderer_9.ray(this.position.clone(), zogra_renderer_6.minus(zogra_renderer_8.vec3(p.x, p.y, p.z), this.position));
    }
    screenToWorld(pos) {
        const w = this.projection == Projection.Perspective
            ? this.near
            : 1;
        const ndcXY = this.screenToViewport(pos).mul(zogra_renderer_4.vec2(2, -2)).minus(zogra_renderer_4.vec2(1, -1));
        const clip = zogra_renderer_6.mul(zogra_renderer_10.vec4(ndcXY.x, ndcXY.y, -1, 1), w);
        const matVPInv = zogra_renderer_5.mat4.invert(this.viewProjectionMatrix);
        const p = zogra_renderer_5.mat4.mulVec4(matVPInv, clip);
        return zogra_renderer_8.vec3(p[0], p[1], p[2]);
    }
    screenToViewport(pos) {
        if (this.output === zogra_renderer_2.RenderTarget.CanvasTarget)
            return zogra_renderer_6.div(pos, zogra_renderer_4.vec2(this.ctx.width, this.ctx.height));
        else if (this.output instanceof zogra_renderer_1.RenderTexture) {
            return zogra_renderer_6.div(pos, zogra_renderer_4.vec2(this.output.width, this.output.height));
        }
        else
            return zogra_renderer_4.vec2.zero();
    }
}
exports.Camera = Camera;
//# sourceMappingURL=camera.js.map

/***/ }),

/***/ "../zogra-engine/dist/engine/engine.js":
/*!*********************************************!*\
  !*** ../zogra-engine/dist/engine/engine.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(__webpack_require__(/*! ./camera */ "../zogra-engine/dist/engine/camera.js"), exports);
__exportStar(__webpack_require__(/*! ./render-object */ "../zogra-engine/dist/engine/render-object.js"), exports);
__exportStar(__webpack_require__(/*! ./light */ "../zogra-engine/dist/engine/light.js"), exports);
__exportStar(__webpack_require__(/*! ./entity */ "../zogra-engine/dist/engine/entity.js"), exports);
__exportStar(__webpack_require__(/*! ./scene */ "../zogra-engine/dist/engine/scene.js"), exports);
__exportStar(__webpack_require__(/*! ./transform */ "../zogra-engine/dist/engine/transform.js"), exports);
__exportStar(__webpack_require__(/*! ./zogra-engine */ "../zogra-engine/dist/engine/zogra-engine.js"), exports);
__exportStar(__webpack_require__(/*! ./input */ "../zogra-engine/dist/engine/input.js"), exports);
__exportStar(__webpack_require__(/*! ./animation */ "../zogra-engine/dist/engine/animation.js"), exports);
__exportStar(__webpack_require__(/*! ./particle-system */ "../zogra-engine/dist/engine/particle-system.js"), exports);
//# sourceMappingURL=engine.js.map

/***/ }),

/***/ "../zogra-engine/dist/engine/entity.js":
/*!*********************************************!*\
  !*** ../zogra-engine/dist/engine/entity.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityManager = exports.Entity = void 0;
const transform_1 = __webpack_require__(/*! ./transform */ "../zogra-engine/dist/engine/transform.js");
const zogra_renderer_1 = __webpack_require__(/*! zogra-renderer */ "../zogra-renderer/dist/index.js");
const zogra_renderer_2 = __webpack_require__(/*! zogra-renderer */ "../zogra-renderer/dist/index.js");
class Entity extends transform_1.Transform {
    constructor() {
        super(...arguments);
        this.assetID = zogra_renderer_1.AssetManager.newAssetID(this);
        this.name = `Entity_${this.assetID}`;
        this.eventEmitter = new zogra_renderer_2.EventEmitter();
        this._destroyed = false;
        this._collider = null;
    }
    get collider() { return this._collider; }
    set collider(value) {
        if (this.scene && value)
            value.__bind(this, this.scene);
        if (this._collider && this._collider !== value)
            this._collider.__unbind();
        this._collider = value;
    }
    get destroyed() { return this._destroyed; }
    ;
    on(event, listener) {
        return this.eventEmitter.on(event, listener);
    }
    off(event, listener) {
        this.eventEmitter.off(event, listener);
    }
    destroy() {
        this._destroyed = true;
        if (this.scene)
            this.scene.remove(this);
        else
            zogra_renderer_1.AssetManager.destroy(this.assetID);
    }
    start(time) { }
    update(time) { }
    exit(time) { }
    /** @internal */
    __updateRecursive(time) {
        this.update(time);
        this.eventEmitter.emit("update", this, time);
        for (const entity of this.children)
            entity.__updateRecursive(time);
    }
    /** @internal */
    __addToScene(scene) {
        var _a;
        super.__addToScene(scene);
        (_a = this._collider) === null || _a === void 0 ? void 0 : _a.__bind(this, scene);
    }
    /** @internal */
    __removeFromScene(scene) {
        var _a;
        super.__removeFromScene(scene);
        (_a = this._collider) === null || _a === void 0 ? void 0 : _a.__unbindPhysics();
    }
    /** @internal */
    __start(time) {
        this.start(time);
        this.eventEmitter.with().emit("start", this, time);
    }
    /** @internal */
    __exit(time) {
        this.exit(time);
        this.eventEmitter.with().emit("exit", this, time);
        if (this._destroyed)
            zogra_renderer_1.AssetManager.destroy(this.assetID);
    }
}
exports.Entity = Entity;
class EntityManager {
    constructor() {
        this.entityMap = new Map();
        this._entities = [];
    }
    get entities() { return this._entities; }
    add(entity) {
        this.entityMap.set(entity.assetID, entity);
        this._entities = Array.from(this.entityMap.values());
    }
    removeRecursive(entity) {
        this.entityMap.delete(entity.assetID);
        for (const child of entity.children)
            this.removeRecursive(child);
    }
    remove(entity) {
        this.removeRecursive(entity);
        if (entity.parent) {
            entity.parent.children.delete(entity);
        }
        this._entities = Array.from(this.entityMap.values());
    }
}
exports.EntityManager = EntityManager;
//# sourceMappingURL=entity.js.map

/***/ }),

/***/ "../zogra-engine/dist/engine/input.js":
/*!********************************************!*\
  !*** ../zogra-engine/dist/engine/input.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Keys = exports.InputManager = exports.KeyState = void 0;
const zogra_renderer_1 = __webpack_require__(/*! zogra-renderer */ "../zogra-renderer/dist/index.js");
const zogra_renderer_2 = __webpack_require__(/*! zogra-renderer */ "../zogra-renderer/dist/index.js");
const util_1 = __webpack_require__(/*! ../utils/util */ "../zogra-engine/dist/utils/util.js");
var KeyState;
(function (KeyState) {
    KeyState[KeyState["Pressed"] = 1] = "Pressed";
    KeyState[KeyState["Released"] = 0] = "Released";
})(KeyState = exports.KeyState || (exports.KeyState = {}));
;
// interface InputManagerEvents extends EventDefinitions
// {
//     keydown: (key: Keys) => void;
//     keyup: (key: Keys) => void;
//     keypressed: (key: Keys) => void;
//     mousemove: ()
// }
const windowBound = {
    getBoundingClientRect() {
        return {
            x: 0,
            y: 0,
            left: 0,
            top: 0,
            right: document.documentElement.clientWidth || window.innerWidth,
            bottom: document.documentElement.clientHeight || window.innerHeight,
            width: document.documentElement.clientWidth || window.innerWidth,
            height: document.documentElement.clientHeight || window.innerHeight,
        };
    }
};
class InputStates {
    constructor() {
        this.keyStates = new Map();
        this.keyStatesThisFrame = new Map();
        this.mousePos = zogra_renderer_1.vec2.zero();
        this.mouseDelta = zogra_renderer_1.vec2.zero();
        this.wheelDelta = 0;
    }
}
class InputManager {
    constructor(options = {}) {
        var _a, _b, _c;
        this.preventBrowserShortcut = true;
        this.bound = null;
        this.states = new util_1.DoubleBuffer(() => new InputStates);
        this.renderer = null;
        this.eventTarget = options.target || window;
        this.pointerLockElement = (_a = options.pointerLockElement) !== null && _a !== void 0 ? _a : document.body;
        this.renderer = options.renderer || zogra_renderer_1.GlobalContext().renderer;
        if (options.bound)
            this.bound = options.bound;
        else if ((_b = options.target) === null || _b === void 0 ? void 0 : _b.getBoundingClientRect)
            this.bound = options.target;
        else
            this.bound = (_c = this.renderer) === null || _c === void 0 ? void 0 : _c.canvas;
        this.eventTarget.addEventListener("keydown", (e) => {
            this.states.back.keyStates.set(e.keyCode, KeyState.Pressed);
            if (this.states.current.keyStates.get(e.keyCode) !== KeyState.Pressed)
                this.states.back.keyStatesThisFrame.set(e.keyCode, KeyState.Pressed);
            if (this.preventBrowserShortcut && e.ctrlKey && (e.keyCode == Keys.S || e.keyCode == Keys.W)) {
                e.preventDefault();
                e.stopPropagation();
            }
        });
        this.eventTarget.addEventListener("keyup", e => {
            this.states.back.keyStates.set(e.keyCode, KeyState.Released);
            this.states.back.keyStatesThisFrame.set(e.keyCode, KeyState.Released);
        });
        this.eventTarget.addEventListener("mousedown", e => {
            var _a;
            const rect = (_a = this.bound) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect();
            if (rect) {
                const offset = zogra_renderer_1.vec2(rect.left, rect === null || rect === void 0 ? void 0 : rect.top);
                const pos = zogra_renderer_2.minus(zogra_renderer_1.vec2(e.clientX, e.clientY), offset);
                if (pos.x < 0 || pos.y < 0 || pos.x > rect.width || pos.y > rect.height)
                    return;
            }
            this.states.back.keyStates.set(Keys.Mouse0 + e.button, KeyState.Pressed);
            if (this.states.current.keyStates.get(Keys.Mouse0 + e.button) !== KeyState.Pressed)
                this.states.back.keyStatesThisFrame.set(Keys.Mouse0 + e.button, KeyState.Pressed);
        });
        this.eventTarget.addEventListener("mouseup", e => {
            var _a;
            const rect = (_a = this.bound) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect();
            if (rect) {
                const offset = zogra_renderer_1.vec2(rect.left, rect === null || rect === void 0 ? void 0 : rect.top);
                const pos = zogra_renderer_2.minus(zogra_renderer_1.vec2(e.clientX, e.clientY), offset);
                if (pos.x < 0 || pos.y < 0 || pos.x > rect.width || pos.y > rect.height)
                    return;
            }
            this.states.back.keyStates.set(Keys.Mouse0 + e.button, KeyState.Released);
            this.states.back.keyStatesThisFrame.set(Keys.Mouse0 + e.button, KeyState.Released);
        });
        this.eventTarget.addEventListener("mousemove", e => {
            var _a;
            if (!this.renderer)
                this.renderer = zogra_renderer_1.GlobalContext().renderer;
            const bound = this.bound || ((_a = this.renderer) === null || _a === void 0 ? void 0 : _a.canvas) || windowBound;
            const rect = bound.getBoundingClientRect();
            const pos = zogra_renderer_2.minus(zogra_renderer_1.vec2(e.clientX, e.clientY), zogra_renderer_1.vec2(rect.left, rect.top));
            if (this.renderer) {
                pos.mul(this.renderer.canvasSize).div(zogra_renderer_1.vec2(rect.width, rect.height));
            }
            this.states.back.mouseDelta.plus(zogra_renderer_1.vec2(e.movementX, e.movementY));
            // if (this.mouseDelta.magnitude > 100)
            //     console.log(e);
            this.states.back.mousePos = pos;
        });
        this.eventTarget.addEventListener("wheel", e => {
            this.states.back.wheelDelta = e.deltaY;
        });
        for (const key in Keys) {
            if (!isNaN(key))
                continue;
            if (Keys.hasOwnProperty(key)) {
                this.states.back.keyStates.set(Keys[key], KeyState.Released);
            }
        }
        window.addEventListener("beforeunload", (e) => {
            if (this.preventBrowserShortcut && (this.states.back.keyStates.get(Keys.W) === KeyState.Pressed || this.states.back.keyStates.get(Keys.Control) === KeyState.Pressed)) {
                e.preventDefault();
                e.returnValue = "Really want to quit?";
            }
        });
    }
    get pointerPosition() { return this.states.current.mousePos; }
    get pointerDelta() { return this.states.current.mouseDelta; }
    get wheelDelta() { return this.states.current.wheelDelta; }
    getKey(key) {
        return this.states.current.keyStates.get(key) === KeyState.Pressed ? true : false;
    }
    getKeyDown(key) {
        return this.states.current.keyStatesThisFrame.get(key) === KeyState.Pressed ? true : false;
    }
    getKeyUp(key) {
        return this.states.current.keyStatesThisFrame.get(key) === KeyState.Released ? true : false;
    }
    update() {
        this.states.update();
        this.states.back.keyStatesThisFrame.clear();
        this.states.back.mouseDelta = zogra_renderer_1.vec2.zero();
        this.states.back.wheelDelta = 0;
        for (const [key, value] of this.states.current.keyStates) {
            this.states.back.keyStates.set(key, value);
        }
        this.states.back.mousePos = this.states.current.mousePos;
    }
    lockPointer() {
        this.pointerLockElement.requestPointerLock();
    }
    releasePointer() {
        document.exitPointerLock();
    }
}
exports.InputManager = InputManager;
function createPointerLockElement() {
    const element = document.createElement("div");
    element.classList.add("pointer-lock-element");
    return element;
}
var Keys;
(function (Keys) {
    Keys[Keys["BackSpace"] = 8] = "BackSpace";
    Keys[Keys["Tab"] = 9] = "Tab";
    Keys[Keys["Clear"] = 12] = "Clear";
    Keys[Keys["Enter"] = 13] = "Enter";
    Keys[Keys["Shift"] = 16] = "Shift";
    Keys[Keys["Control"] = 17] = "Control";
    Keys[Keys["Alt"] = 18] = "Alt";
    Keys[Keys["Pause"] = 19] = "Pause";
    Keys[Keys["CapsLock"] = 20] = "CapsLock";
    Keys[Keys["Escape"] = 27] = "Escape";
    Keys[Keys["Space"] = 32] = "Space";
    Keys[Keys["Prior"] = 33] = "Prior";
    Keys[Keys["Next"] = 34] = "Next";
    Keys[Keys["End"] = 35] = "End";
    Keys[Keys["Home"] = 36] = "Home";
    Keys[Keys["Left"] = 37] = "Left";
    Keys[Keys["Up"] = 38] = "Up";
    Keys[Keys["Right"] = 39] = "Right";
    Keys[Keys["Down"] = 40] = "Down";
    Keys[Keys["Select"] = 41] = "Select";
    Keys[Keys["Print"] = 42] = "Print";
    Keys[Keys["Execute"] = 43] = "Execute";
    Keys[Keys["Insert"] = 45] = "Insert";
    Keys[Keys["Delete"] = 46] = "Delete";
    Keys[Keys["Help"] = 47] = "Help";
    Keys[Keys["Num0"] = 48] = "Num0";
    Keys[Keys["Num1"] = 49] = "Num1";
    Keys[Keys["Num2"] = 50] = "Num2";
    Keys[Keys["Num3"] = 51] = "Num3";
    Keys[Keys["Num4"] = 52] = "Num4";
    Keys[Keys["Num5"] = 53] = "Num5";
    Keys[Keys["Num6"] = 54] = "Num6";
    Keys[Keys["Num7"] = 55] = "Num7";
    Keys[Keys["Num8"] = 56] = "Num8";
    Keys[Keys["Num9"] = 57] = "Num9";
    Keys[Keys["A"] = 65] = "A";
    Keys[Keys["B"] = 66] = "B";
    Keys[Keys["C"] = 67] = "C";
    Keys[Keys["D"] = 68] = "D";
    Keys[Keys["E"] = 69] = "E";
    Keys[Keys["F"] = 70] = "F";
    Keys[Keys["G"] = 71] = "G";
    Keys[Keys["H"] = 72] = "H";
    Keys[Keys["I"] = 73] = "I";
    Keys[Keys["J"] = 74] = "J";
    Keys[Keys["K"] = 75] = "K";
    Keys[Keys["L"] = 76] = "L";
    Keys[Keys["M"] = 77] = "M";
    Keys[Keys["N"] = 78] = "N";
    Keys[Keys["O"] = 79] = "O";
    Keys[Keys["P"] = 80] = "P";
    Keys[Keys["Q"] = 81] = "Q";
    Keys[Keys["R"] = 82] = "R";
    Keys[Keys["S"] = 83] = "S";
    Keys[Keys["T"] = 84] = "T";
    Keys[Keys["U"] = 85] = "U";
    Keys[Keys["V"] = 86] = "V";
    Keys[Keys["W"] = 87] = "W";
    Keys[Keys["X"] = 88] = "X";
    Keys[Keys["Y"] = 89] = "Y";
    Keys[Keys["Z"] = 90] = "Z";
    Keys[Keys["KP0"] = 96] = "KP0";
    Keys[Keys["KP1"] = 97] = "KP1";
    Keys[Keys["KP2"] = 98] = "KP2";
    Keys[Keys["KP3"] = 99] = "KP3";
    Keys[Keys["KP4"] = 100] = "KP4";
    Keys[Keys["KP5"] = 101] = "KP5";
    Keys[Keys["KP6"] = 102] = "KP6";
    Keys[Keys["KP7"] = 103] = "KP7";
    Keys[Keys["KP8"] = 104] = "KP8";
    Keys[Keys["KP9"] = 105] = "KP9";
    Keys[Keys["KPMultiply"] = 106] = "KPMultiply";
    Keys[Keys["KPAdd"] = 107] = "KPAdd";
    Keys[Keys["KPSeparator"] = 108] = "KPSeparator";
    Keys[Keys["KPSubtract"] = 109] = "KPSubtract";
    Keys[Keys["KPDecimal"] = 110] = "KPDecimal";
    Keys[Keys["KPDivide"] = 111] = "KPDivide";
    Keys[Keys["F1"] = 112] = "F1";
    Keys[Keys["F2"] = 113] = "F2";
    Keys[Keys["F3"] = 114] = "F3";
    Keys[Keys["F4"] = 115] = "F4";
    Keys[Keys["F5"] = 116] = "F5";
    Keys[Keys["F6"] = 117] = "F6";
    Keys[Keys["F7"] = 118] = "F7";
    Keys[Keys["F8"] = 119] = "F8";
    Keys[Keys["F9"] = 120] = "F9";
    Keys[Keys["F10"] = 121] = "F10";
    Keys[Keys["F11"] = 122] = "F11";
    Keys[Keys["F12"] = 123] = "F12";
    Keys[Keys["F13"] = 124] = "F13";
    Keys[Keys["F14"] = 125] = "F14";
    Keys[Keys["F15"] = 126] = "F15";
    Keys[Keys["F16"] = 127] = "F16";
    Keys[Keys["F17"] = 128] = "F17";
    Keys[Keys["F18"] = 129] = "F18";
    Keys[Keys["F19"] = 130] = "F19";
    Keys[Keys["F20"] = 131] = "F20";
    Keys[Keys["F21"] = 132] = "F21";
    Keys[Keys["F22"] = 133] = "F22";
    Keys[Keys["F23"] = 134] = "F23";
    Keys[Keys["F24"] = 135] = "F24";
    Keys[Keys["NumLock"] = 136] = "NumLock";
    Keys[Keys["ScrollLock"] = 137] = "ScrollLock";
    Keys[Keys["Mouse0"] = 256] = "Mouse0";
    Keys[Keys["Mouse1"] = 257] = "Mouse1";
    Keys[Keys["Mouse2"] = 258] = "Mouse2";
    Keys[Keys["Mouse3"] = 259] = "Mouse3";
    Keys[Keys["Mouse4"] = 260] = "Mouse4";
    Keys[Keys["Mouse5"] = 261] = "Mouse5";
    Keys[Keys["Mouse6"] = 262] = "Mouse6";
})(Keys = exports.Keys || (exports.Keys = {}));
//# sourceMappingURL=input.js.map

/***/ }),

/***/ "../zogra-engine/dist/engine/light.js":
/*!********************************************!*\
  !*** ../zogra-engine/dist/engine/light.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Light = exports.LightType = void 0;
const entity_1 = __webpack_require__(/*! ./entity */ "../zogra-engine/dist/engine/entity.js");
const zogra_renderer_1 = __webpack_require__(/*! zogra-renderer */ "../zogra-renderer/dist/index.js");
var LightType;
(function (LightType) {
    LightType[LightType["Directional"] = 0] = "Directional";
    LightType[LightType["Point"] = 1] = "Point";
})(LightType = exports.LightType || (exports.LightType = {}));
class Light extends entity_1.Entity {
    constructor(type = LightType.Directional) {
        super();
        this.intensity = 1;
        this.color = zogra_renderer_1.Color.white;
        this.type = type;
    }
}
exports.Light = Light;
//# sourceMappingURL=light.js.map

/***/ }),

/***/ "../zogra-engine/dist/engine/particle-system.js":
/*!******************************************************!*\
  !*** ../zogra-engine/dist/engine/particle-system.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParticleSystem = exports.ParticleMaterial = void 0;
const zogra_renderer_1 = __webpack_require__(/*! zogra-renderer */ "../zogra-renderer/dist/index.js");
const assets_1 = __webpack_require__(/*! ../assets */ "../zogra-engine/dist/assets/index.js");
const render_object_1 = __webpack_require__(/*! ./render-object */ "../zogra-engine/dist/engine/render-object.js");
class ParticleMaterial extends zogra_renderer_1.MaterialFromShader(new zogra_renderer_1.Shader(...assets_1.ShaderSource.particle2D, {
    vertexStructure: {
        vert: "vec3",
        color: "vec4",
        normal: "vec3",
        uv: "vec2",
        uv2: "vec2",
        pos: "vec3",
        rotation: "vec3",
        size: "float",
    },
    attributes: {
        pos: "particlePos",
        rotation: "particleRotation",
        size: "particleSize",
    }
})) {
    constructor() {
        super(...arguments);
        this.color = zogra_renderer_1.Color.white;
        this.texture = null;
    }
}
__decorate([
    zogra_renderer_1.shaderProp("uColor", "color")
], ParticleMaterial.prototype, "color", void 0);
__decorate([
    zogra_renderer_1.shaderProp("uMainTex", "tex2d")
], ParticleMaterial.prototype, "texture", void 0);
exports.ParticleMaterial = ParticleMaterial;
class ParticleSystem extends render_object_1.RenderObject {
    constructor() {
        super();
        this.mesh = zogra_renderer_1.MeshBuilder.quad();
        this.material = new ParticleMaterial();
        this.duration = 1;
        this.lifetime = 1;
        this.spawnRate = 30;
        this.startSize = [0.2, 0.4];
        this.startColor = { r: 1, g: 1, b: 1, a: 1 };
        this.startRotation = { x: 0, y: 0, z: 0 };
        this.startSpeed = [5, 10];
        this.startAcceleration = { x: 0, y: -20, z: 0 };
        this.emitter = ParticleSystem.boxEmitter(zogra_renderer_1.vec2.one());
        this.lifeSize = null;
        this.lifeColor = { r: null, g: null, b: null, a: null };
        this.lifeRotation = { x: null, y: null, z: null };
        this.lifeSpeed = null;
        this.lifeAcceleration = { x: null, y: null, z: null };
        this.particlesBuffer = new zogra_renderer_1.RenderBuffer({
            pos: "vec3",
            color: "vec4",
            rotation: "vec3",
            size: "float",
            velocity: "vec4",
            lifetime: "vec2",
            acceleration: "vec3",
        }, 0);
        this.particleCount = 0;
        this.spawnedTime = 0;
        this.state = "stopped";
        this.particlesBuffer.static = false;
    }
    get maxCount() { return this.particlesBuffer.length; }
    set maxCount(count) { this.particlesBuffer.resize(count); }
    play() {
        this.state = "pending";
    }
    update(time) {
        switch (this.state) {
            case "stopped":
                break;
            case "pending":
                this.state = "running";
                this.spawnedTime = time.time;
            case "running":
                const spawnInterval = 1 / this.getScalarValue(this.spawnRate);
                while (this.spawnedTime + spawnInterval <= time.time) {
                    this.spawnedTime += spawnInterval;
                    this.emitOne(this.position);
                }
                break;
        }
        this.updateParticles(time);
    }
    /** @internal */
    render(context, data) {
        context.renderer.drawMeshInstance(this.mesh, this.particlesBuffer, this.material, this.particleCount);
    }
    emit(count, position = this.position) {
        for (let i = 0; i < count; i++)
            this.emitOne(position);
    }
    updateParticles(time) {
        for (let i = 0; i < this.particleCount; i++) {
            const particle = this.particlesBuffer[i];
            const lifetime = particle.lifetime[0] / particle.lifetime[1];
            if (lifetime >= 1) {
                if (i < this.particleCount - 1) {
                    this.particlesBuffer.swapVertices(i, this.particleCount - 1);
                    i--;
                }
                this.particleCount--;
                continue;
            }
            particle.lifetime[0] += time.deltaTime;
            if (this.lifeColor) {
                if (typeof (this.lifeColor) === "function")
                    particle.color.set(this.lifeColor(lifetime, this));
                else {
                    particle.color[0] = this.updateScalarValue(this.lifeColor.r, lifetime, particle.color[0]);
                    particle.color[1] = this.updateScalarValue(this.lifeColor.g, lifetime, particle.color[1]);
                    particle.color[2] = this.updateScalarValue(this.lifeColor.b, lifetime, particle.color[2]);
                    particle.color[3] = this.updateScalarValue(this.lifeColor.a, lifetime, particle.color[3]);
                }
            }
            if (this.lifeSize) {
                if (typeof (this.lifeSize) === "function")
                    particle.size[0] = this.lifeSize(lifetime);
                else {
                    particle.size[0] = this.updateScalarValue(this.lifeSize, lifetime, particle.size[0]);
                }
            }
            if (this.lifeAcceleration) {
                if (typeof (this.lifeAcceleration) === "function")
                    particle.acceleration.set(this.lifeAcceleration(lifetime, this));
                else {
                    particle.acceleration[0] = this.updateScalarValue(this.lifeAcceleration.x, lifetime, particle.acceleration[0]);
                    particle.acceleration[1] = this.updateScalarValue(this.lifeAcceleration.y, lifetime, particle.acceleration[1]);
                    particle.acceleration[2] = this.updateScalarValue(this.lifeAcceleration.z, lifetime, particle.acceleration[2]);
                }
            }
            // const velocity = vec3.set(particle.velocity) as vec3;
            // vec3.mul(particle.velocity, particle.velocity[3]);
            let vx = particle.velocity[0];
            let vy = particle.velocity[1];
            let vz = particle.velocity[2];
            vx *= particle.velocity[3];
            vy *= particle.velocity[3];
            vz *= particle.velocity[3];
            vx += particle.acceleration[0] * time.deltaTime;
            vy += particle.acceleration[1] * time.deltaTime;
            vz += particle.acceleration[2] * time.deltaTime;
            particle.velocity[3] = Math.sqrt(vx * vx
                + vy * vy
                + vz * vz);
            particle.velocity[0] = vx / particle.velocity[3];
            particle.velocity[1] = vy / particle.velocity[3];
            particle.velocity[2] = vz / particle.velocity[3];
            if (this.lifeSpeed) {
                if (typeof (this.lifeSpeed) === "function")
                    particle.velocity[3] = this.lifeSpeed(lifetime);
                else
                    particle.velocity[3] = this.updateScalarValue(this.lifeSpeed, lifetime, particle.velocity[3]);
            }
            particle.pos[0] += particle.velocity[0] * particle.velocity[3] * time.deltaTime;
            particle.pos[1] += particle.velocity[1] * particle.velocity[3] * time.deltaTime;
            particle.pos[2] += particle.velocity[2] * particle.velocity[3] * time.deltaTime;
            if (this.lifeRotation) {
                if (typeof (this.lifeRotation) === "function")
                    particle.rotation.set(this.lifeRotation(lifetime, this));
                else {
                    particle.rotation[0] = this.updateScalarValue(this.lifeRotation.x, lifetime, particle.rotation[0]);
                    particle.rotation[1] = this.updateScalarValue(this.lifeRotation.y, lifetime, particle.rotation[1]);
                    particle.rotation[2] = this.updateScalarValue(this.lifeRotation.z, lifetime, particle.rotation[2]);
                }
            }
            // Debug().drawLine((vec3.set(particle.pos) as vec3).minus(particle.size[0]), (vec3.set(particle.pos) as vec3).plus(particle.size[0]));
        }
    }
    updateParticleProperty(time, modifier, accessor) {
    }
    emitOne(position) {
        if (this.particleCount >= this.maxCount)
            return;
        let particle = this.particlesBuffer[this.particleCount++];
        let velocity = zogra_renderer_1.vec3.zero();
        let pos = zogra_renderer_1.vec3.zero();
        this.emitter(this, position, velocity, pos);
        const lifetime = this.getScalarValue(this.lifetime);
        let speed = this.getScalarValue(this.startSpeed);
        // velocity.mul(speed);
        particle.velocity.set(velocity);
        particle.velocity[3] = speed;
        particle.pos.set(pos);
        particle.size[0] = this.getScalarValue(this.startSize);
        particle.lifetime[0] = 0;
        particle.lifetime[1] = lifetime;
        if (typeof (this.startColor) === "function") {
            let color = this.startColor(0, this);
            particle.color.set(color);
        }
        else {
            particle.color[0] = this.getScalarValue(this.startColor.r);
            particle.color[1] = this.getScalarValue(this.startColor.g);
            particle.color[2] = this.getScalarValue(this.startColor.b);
            particle.color[3] = this.getScalarValue(this.startColor.a);
        }
        if (typeof (this.startRotation) === "function") {
            particle.rotation.set(this.startRotation(0, this));
        }
        else {
            particle.rotation[0] = this.getScalarValue(this.startRotation.x);
            particle.rotation[1] = this.getScalarValue(this.startRotation.y);
            particle.rotation[2] = this.getScalarValue(this.startRotation.z);
        }
        if (typeof (this.startAcceleration) === "function")
            particle.acceleration.set(this.startAcceleration(0, this));
        else {
            particle.acceleration[0] = this.getScalarValue(this.startAcceleration.x);
            particle.acceleration[1] = this.getScalarValue(this.startAcceleration.y);
            particle.acceleration[2] = this.getScalarValue(this.startAcceleration.z);
        }
    }
    getScalarValue(settings) {
        if (typeof (settings) === "number")
            return settings;
        else if (typeof (settings) === "function")
            return settings(this);
        else if (settings instanceof Array)
            return zogra_renderer_1.MathUtils.lerp(...settings, Math.random());
        console.warn("Unknown property generator: ", settings);
        return 0;
    }
    updateScalarValue(settings, lifetime, value) {
        if (settings === null)
            return value;
        else if (typeof (settings) === "number")
            return settings;
        else if (typeof (settings) === "function")
            return settings(lifetime);
        else if (settings instanceof Array)
            return zogra_renderer_1.MathUtils.lerp(...settings, lifetime);
        console.log("Unknown property modifier:", settings);
        return value;
    }
    static boxEmitter(size) {
        return (particleSystem, center, dirOut, posOut) => {
            posOut[0] = (Math.random() - 0.5) * size.x;
            posOut[1] = (Math.random() - 0.5) * size.y;
            posOut[2] = 0;
            posOut.plus(center);
            zogra_renderer_1.vec3.minus(dirOut, posOut, center).normalize();
        };
    }
}
exports.ParticleSystem = ParticleSystem;
//# sourceMappingURL=particle-system.js.map

/***/ }),

/***/ "../zogra-engine/dist/engine/render-object.js":
/*!****************************************************!*\
  !*** ../zogra-engine/dist/engine/render-object.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.RenderObject = void 0;
const zogra_renderer_1 = __webpack_require__(/*! zogra-renderer */ "../zogra-renderer/dist/index.js");
const entity_1 = __webpack_require__(/*! ./entity */ "../zogra-engine/dist/engine/entity.js");
class RenderObject extends entity_1.Entity {
    constructor(ctx = zogra_renderer_1.GlobalContext()) {
        super();
        this.meshes = [];
        this.materials = [];
        this.materials = [ctx.assets.materials.default];
    }
    on(event, listener) {
        this.eventEmitter.with().on(event, listener);
    }
    off(event, listener) {
        this.eventEmitter.with().off(event, listener);
    }
    /** @internal */
    render(context, data) {
        this.eventEmitter.with().emit("render", this, context, data);
        for (let i = 0; i < this.meshes.length; i++) {
            context.renderer.drawMesh(this.meshes[i], this.localToWorldMatrix, this.materials[i]);
        }
    }
}
exports.RenderObject = RenderObject;
//# sourceMappingURL=render-object.js.map

/***/ }),

/***/ "../zogra-engine/dist/engine/scene.js":
/*!********************************************!*\
  !*** ../zogra-engine/dist/engine/scene.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Scene = void 0;
const entity_1 = __webpack_require__(/*! ./entity */ "../zogra-engine/dist/engine/entity.js");
const zogra_renderer_1 = __webpack_require__(/*! zogra-renderer */ "../zogra-renderer/dist/index.js");
const zogra_renderer_2 = __webpack_require__(/*! zogra-renderer */ "../zogra-renderer/dist/index.js");
class Scene extends entity_1.EntityManager {
    constructor(PhysicsSystem) {
        super();
        //private managers = new Map<Function, EntityManager>();
        this.eventEmitter = new zogra_renderer_1.EventEmitter();
        this.addsNextFrame = new Map();
        this.removesNextFrame = new Set();
        this.assetID = zogra_renderer_2.AssetManager.newAssetID(this);
        this.name = `Scene_${this.assetID}`;
        this.physics = new PhysicsSystem();
    }
    add(entity, parent = null) {
        this.addsNextFrame.set(entity, parent);
        for (const child of entity.children)
            this.add(child, entity);
    }
    remove(entity) {
        this.removesNextFrame.add(entity);
    }
    rootEntities() {
        return this._entities.filter(entity => entity.parent === null);
    }
    getEntities() {
        return this._entities;
    }
    getEntitiesOfType(type) {
        return this.entities.filter(entity => entity instanceof type);
        // return (this.managers.get(type)?.entities ?? []) as any as T[];
    }
    on(event, listener) {
        this.eventEmitter.on(event, listener);
    }
    off(event, listener) {
        this.eventEmitter.off(event, listener);
    }
    destroy() {
        this._entities = [];
        this.entityMap.clear();
        throw new Error("Method not implemented.");
    }
    /** @internal */
    __update(time) {
        var _a;
        this.addPendingEntities(time);
        this.removePendingEntites(time);
        const entities = this.rootEntities();
        for (const entity of entities)
            entity.__updateRecursive(time);
        (_a = this.physics) === null || _a === void 0 ? void 0 : _a.update(time);
    }
    addPendingEntities(time) {
        const adds = this.addsNextFrame;
        this.addsNextFrame = new Map();
        for (const [entity, parent] of adds) {
            super.add(entity);
            entity.__addToScene(this);
            const type = entity.constructor;
            // if (!this.managers.has(type))
            //     this.managers.set(type, new EntityManager());
            // this.managers.get(type)?.add(entity);
            if (parent)
                entity.parent = parent;
            this.eventEmitter.emit("entity-add", entity, parent ? parent : null);
        }
        for (const [entity, _] of adds)
            entity.__start(time);
    }
    removePendingEntites(time) {
        const removes = this.removesNextFrame;
        this.removesNextFrame = new Set();
        for (const entity of removes) {
            super.remove(entity);
            entity.__removeFromScene(this);
            this.eventEmitter.emit("entity-remove", entity, entity.parent);
        }
        for (const entity of removes)
            entity.__exit(time);
    }
}
exports.Scene = Scene;
//# sourceMappingURL=scene.js.map

/***/ }),

/***/ "../zogra-engine/dist/engine/transform.js":
/*!************************************************!*\
  !*** ../zogra-engine/dist/engine/transform.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Transform = void 0;
const zogra_renderer_1 = __webpack_require__(/*! zogra-renderer */ "../zogra-renderer/dist/index.js");
const zogra_renderer_2 = __webpack_require__(/*! zogra-renderer */ "../zogra-renderer/dist/index.js");
const zogra_renderer_3 = __webpack_require__(/*! zogra-renderer */ "../zogra-renderer/dist/index.js");
class Transform {
    constructor() {
        this._parent = null;
        this.children = new Set();
        this._localPosition = zogra_renderer_2.vec3.zero();
        this._localRotation = zogra_renderer_3.quat.identity();
        this._localScaling = zogra_renderer_2.vec3.one();
        this._rotation = zogra_renderer_3.quat.identity();
        this._inv_rotation = zogra_renderer_3.quat.identity();
        this._localToWorld = zogra_renderer_1.mat4.identity();
        this._worldToLocal = zogra_renderer_1.mat4.identity();
        this._scene = null;
    }
    get localPosition() { return this._localPosition; }
    get localRotation() { return this._localRotation; }
    get localScaling() { return this._localScaling; }
    set localPosition(position) {
        this._localPosition.set(position);
        this.updateTransformRecursive();
    }
    set localRotation(rotation) {
        this._localRotation.set(rotation);
        this.updateTransformRecursive();
    }
    set localScaling(scaling) {
        this._localScaling.set(scaling);
        this.updateTransformRecursive();
    }
    get scene() { return this._scene; }
    get position() {
        if (!this._parent)
            return this.localPosition;
        return zogra_renderer_1.mat4.mulPoint(this._parent.localToWorldMatrix, this.localPosition);
    }
    set position(position) {
        if (!this._parent)
            this.localPosition.set(position);
        else
            zogra_renderer_1.mat4.mulPoint(this._localPosition, this._parent.worldToLocalMatrix, position);
        this.updateTransformRecursive();
    }
    get rotation() {
        return this._rotation;
    }
    set rotation(rotation) {
        if (!this._parent)
            zogra_renderer_3.quat.normalize(this._localRotation, rotation);
        else {
            zogra_renderer_3.quat.mul(this._localRotation, this._parent._inv_rotation, rotation);
            zogra_renderer_3.quat.normalize(this._localRotation, this._localRotation);
        }
        this.updateTransformRecursive();
    }
    // get scaling(): Readonly<vec3>
    // {
    //     if (!this._parent)
    //         return this.localScaling;
    //     return mat4.mulVector(this.localToWorldMatrix, vec3.one());
    // }
    // set scaling(scaling)
    // {
    //     if (!this._parent)
    //         this.localScaling.set(scaling);
    //     else
    //         this.localScaling = mat4.getScaling(this._parent.worldToLocalMatrix).mul(scaling);
    // }
    get localToWorldMatrix() { return this._localToWorld; }
    get worldToLocalMatrix() { return this._worldToLocal; }
    get parent() { return this._parent; }
    set parent(p) {
        this._parent = p;
        if (p) {
            p.children.add(this);
        }
        this.updateTransformRecursive();
    }
    translate(motion) {
        if (!this._parent)
            this.localPosition.plus(motion);
        else
            this.localPosition.plus(zogra_renderer_1.mat4.mulVector(this._parent.worldToLocalMatrix, motion));
        this.updateTransformRecursive();
    }
    /** @internal */
    __addToScene(scene) {
        this._scene = scene;
    }
    /** @internal */
    __removeFromScene(scene) {
        this._scene = null;
    }
    updateTransformRecursive() {
        this._rotation.set(this._localRotation);
        zogra_renderer_1.mat4.rts(this._localToWorld, this._localRotation, this._localPosition, this._localScaling);
        if (this._parent) {
            zogra_renderer_1.mat4.mul(this._localToWorld, this._parent._localToWorld, this._localToWorld);
            zogra_renderer_3.quat.mul(this._rotation, this._parent._rotation, this._rotation);
        }
        zogra_renderer_1.mat4.invert(this._worldToLocal, this._localToWorld);
        zogra_renderer_3.quat.invert(this._inv_rotation, this._rotation);
        for (const child of this.children)
            child.updateTransformRecursive();
    }
}
exports.Transform = Transform;
//# sourceMappingURL=transform.js.map

/***/ }),

/***/ "../zogra-engine/dist/engine/zogra-engine.js":
/*!***************************************************!*\
  !*** ../zogra-engine/dist/engine/zogra-engine.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ZograEngine = void 0;
const scene_1 = __webpack_require__(/*! ./scene */ "../zogra-engine/dist/engine/scene.js");
const rp_1 = __webpack_require__(/*! ../render-pipeline/rp */ "../zogra-engine/dist/render-pipeline/rp.js");
const camera_1 = __webpack_require__(/*! ./camera */ "../zogra-engine/dist/engine/camera.js");
const zogra_renderer_1 = __webpack_require__(/*! zogra-renderer */ "../zogra-renderer/dist/index.js");
const zogra_renderer_2 = __webpack_require__(/*! zogra-renderer */ "../zogra-renderer/dist/index.js");
const physics_generic_1 = __webpack_require__(/*! ../physics/physics-generic */ "../zogra-engine/dist/physics/physics-generic.js");
class ZograEngine {
    constructor(canvas, RenderPipeline = rp_1.PreviewRenderer) {
        this.fixedDeltaTime = false;
        this._time = { deltaTime: 0, time: 0 };
        this.renderer = new zogra_renderer_1.ZograRenderer(canvas, canvas.width, canvas.height);
        this.renderPipeline = new RenderPipeline(this.renderer);
        this._scene = new scene_1.Scene(physics_generic_1.UnknownPhysics);
        this.eventEmitter = new zogra_renderer_2.EventEmitter();
    }
    get time() { return this._time; }
    get scene() { return this._scene; }
    set scene(value) {
        const previous = this._scene;
        this._scene = value;
        this.eventEmitter.emit("scene-change", value, previous);
    }
    renderScene() {
        const cameras = this.scene.getEntitiesOfType(camera_1.Camera);
        this.renderPipeline.render({
            renderer: this.renderer,
            scene: this.scene
        }, cameras);
    }
    start() {
        let previousDelay = 0;
        let startDelay = 0;
        let currentTime = 0;
        const update = (delay) => {
            if (previousDelay === 0) {
                startDelay = previousDelay = delay;
                requestAnimationFrame(update);
                return;
            }
            if (this.fixedDeltaTime)
                currentTime += 16;
            else
                currentTime = delay;
            const time = (currentTime - startDelay) / 1000;
            const dt = (currentTime - previousDelay) / 1000;
            previousDelay = currentTime;
            const t = {
                time: time,
                deltaTime: dt
            };
            this._time = t;
            this.eventEmitter.emit("update", t);
            this.scene.__update(t);
            this.eventEmitter.emit("render", this.scene.getEntitiesOfType(camera_1.Camera));
            this.renderScene();
            requestAnimationFrame(update);
        };
        requestAnimationFrame(update);
    }
    on(event, listener) {
        this.eventEmitter.on(event, listener);
    }
    off(event, listener) {
        this.eventEmitter.off(event, listener);
    }
}
exports.ZograEngine = ZograEngine;
//# sourceMappingURL=zogra-engine.js.map

/***/ }),

/***/ "../zogra-engine/dist/index.js":
/*!*************************************!*\
  !*** ../zogra-engine/dist/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(__webpack_require__(/*! zogra-renderer */ "../zogra-renderer/dist/index.js"), exports);
__exportStar(__webpack_require__(/*! ./engine/engine */ "../zogra-engine/dist/engine/engine.js"), exports);
__exportStar(__webpack_require__(/*! ./render-pipeline/rp */ "../zogra-engine/dist/render-pipeline/rp.js"), exports);
__exportStar(__webpack_require__(/*! ./2d */ "../zogra-engine/dist/2d/index.js"), exports);
__exportStar(__webpack_require__(/*! ./utils */ "../zogra-engine/dist/utils/index.js"), exports);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../zogra-engine/dist/physics/physics-generic.js":
/*!*******************************************************!*\
  !*** ../zogra-engine/dist/physics/physics-generic.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ColliderBase = exports.UnknownPhysics = void 0;
class UnknownPhysics {
    /** @internal */
    __addCollider() { }
    /** @internal */
    __removeCollider() { }
    update() { }
}
exports.UnknownPhysics = UnknownPhysics;
class ColliderBase {
    constructor() {
        this._physicsSystem = null;
        this._entity = null;
    }
    get physics() { return this._physicsSystem; }
    get entity() { return this._entity; }
    /** @internal */
    __bind(entity, scene) {
        if (this.entity && this.entity !== entity)
            throw new Error("Collider should only be bound to single entity.");
        this._entity = entity;
        this._physicsSystem = scene.physics;
        this._physicsSystem.__addCollider(this);
    }
    /** @internal */
    __unbind() {
        this._entity = null;
        this.__unbindPhysics();
    }
    /** @internal */
    __unbindPhysics() {
        var _a;
        (_a = this._physicsSystem) === null || _a === void 0 ? void 0 : _a.__removeCollider(this);
        this._physicsSystem = null;
    }
}
exports.ColliderBase = ColliderBase;
//# sourceMappingURL=physics-generic.js.map

/***/ }),

/***/ "../zogra-engine/dist/render-pipeline/2d-default.js":
/*!**********************************************************!*\
  !*** ../zogra-engine/dist/render-pipeline/2d-default.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Default2DRenderPipeline = void 0;
const render_data_1 = __webpack_require__(/*! ./render-data */ "../zogra-engine/dist/render-pipeline/render-data.js");
const zogra_renderer_1 = __webpack_require__(/*! zogra-renderer */ "../zogra-renderer/dist/index.js");
const debug_layer_1 = __webpack_require__(/*! ./debug-layer */ "../zogra-engine/dist/render-pipeline/debug-layer.js");
const global_1 = __webpack_require__(/*! zogra-renderer/dist/core/global */ "../zogra-renderer/dist/core/global.js");
class Default2DRenderPipeline {
    constructor() {
        this.debuglayer = new debug_layer_1.DebugLayerRenderer();
        global_1.Debug(this.debuglayer);
    }
    render(renderer, cameras) {
        for (const camera of cameras) {
            const data = new render_data_1.RenderData(camera, renderer.scene);
            this.renderCamera(renderer, data);
        }
    }
    replaceMaterial(MaterialType, material) {
        throw new Error("Method not implemented.");
    }
    renderCamera(context, data) {
        const camera = data.camera;
        camera.__preRender(context);
        if (camera.output === zogra_renderer_1.RenderTarget.CanvasTarget)
            context.renderer.setRenderTarget(zogra_renderer_1.RenderTarget.CanvasTarget);
        else
            context.renderer.setRenderTarget(camera.output);
        context.renderer.clear(camera.clearColor, camera.clearDepth);
        context.renderer.setViewProjection(camera.worldToLocalMatrix, camera.projectionMatrix);
        // context.renderer.setGlobalUniform("uCameraPos", "vec3", camera.position);
        const objs = data.getVisibleObjects(render_data_1.RenderOrder.FarToNear);
        for (const obj of objs) {
            obj.render(context, data);
            // const modelMatrix = obj.localToWorldMatrix;
            // for (let i = 0; i < obj.meshes.length; i++)
            // {
            //     if (!obj.meshes[i])
            //         continue;
            //     const mat = obj.materials[i] || context.renderer.assets.materials.default;
            //     mat.setProp("uCameraPos", "vec3", camera.position);
            //     context.renderer.drawMesh(obj.meshes[i], modelMatrix, mat);
            // }
        }
        this.debuglayer.render(context, data);
        camera.__postRender(context);
    }
}
exports.Default2DRenderPipeline = Default2DRenderPipeline;
//# sourceMappingURL=2d-default.js.map

/***/ }),

/***/ "../zogra-engine/dist/render-pipeline/debug-layer.js":
/*!***********************************************************!*\
  !*** ../zogra-engine/dist/render-pipeline/debug-layer.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.DebugLayerRenderer = void 0;
const zogra_renderer_1 = __webpack_require__(/*! zogra-renderer */ "../zogra-renderer/dist/index.js");
const zogra_renderer_2 = __webpack_require__(/*! zogra-renderer */ "../zogra-renderer/dist/index.js");
const zogra_renderer_3 = __webpack_require__(/*! zogra-renderer */ "../zogra-renderer/dist/index.js");
class DebugLayerRenderer extends zogra_renderer_1.DebugProvider {
    constructor() {
        super(...arguments);
        this.lines = new zogra_renderer_1.Lines();
    }
    drawLine(from, to, color = zogra_renderer_2.Color.white) {
        const verts = this.lines.verts;
        const lines = this.lines.lines;
        const colors = this.lines.colors;
        const base = verts.length;
        verts.push(from, to);
        colors.push(color, color);
        lines.push(base, base + 1);
        this.lines.verts = verts;
        this.lines.colors = colors;
        this.lines.lines = lines;
    }
    render(context, data) {
        context.renderer.drawLines(this.lines, zogra_renderer_3.mat4.identity(), context.renderer.assets.materials.ColoredLine);
        this.lines.clear();
    }
}
exports.DebugLayerRenderer = DebugLayerRenderer;
//# sourceMappingURL=debug-layer.js.map

/***/ }),

/***/ "../zogra-engine/dist/render-pipeline/preview-renderer.js":
/*!****************************************************************!*\
  !*** ../zogra-engine/dist/render-pipeline/preview-renderer.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.PreviewRenderer = void 0;
const zogra_renderer_1 = __webpack_require__(/*! zogra-renderer */ "../zogra-renderer/dist/index.js");
const render_data_1 = __webpack_require__(/*! ./render-data */ "../zogra-engine/dist/render-pipeline/render-data.js");
const zogra_renderer_2 = __webpack_require__(/*! zogra-renderer */ "../zogra-renderer/dist/index.js");
const zogra_renderer_3 = __webpack_require__(/*! zogra-renderer */ "../zogra-renderer/dist/index.js");
const zogra_renderer_4 = __webpack_require__(/*! zogra-renderer */ "../zogra-renderer/dist/index.js");
const zogra_renderer_5 = __webpack_require__(/*! zogra-renderer */ "../zogra-renderer/dist/index.js");
const debug_layer_1 = __webpack_require__(/*! ./debug-layer */ "../zogra-engine/dist/render-pipeline/debug-layer.js");
class PreviewRenderer {
    constructor(renderer) {
        this.materialReplaceMap = new Map();
        this.debugLayer = new debug_layer_1.DebugLayerRenderer();
        this.renderer = renderer;
        const lineColor = zogra_renderer_2.rgba(1, 1, 1, 0.1);
        const lb = new zogra_renderer_4.LineBuilder(0, renderer.gl);
        const Size = 10;
        const Grid = 1;
        for (let i = -Size; i <= Size; i += Grid) {
            lb.addLine([
                zogra_renderer_5.vec3(i, 0, -Size),
                zogra_renderer_5.vec3(i, 0, Size),
            ], lineColor);
            lb.addLine([
                zogra_renderer_5.vec3(-Size, 0, i),
                zogra_renderer_5.vec3(Size, 0, i)
            ], lineColor);
        }
        this.grid = lb.toLines();
    }
    render(context, cameras) {
        for (let i = 0; i < cameras.length; i++) {
            const data = new render_data_1.RenderData(cameras[i], context.scene);
            this.renderCamera(context, data);
        }
    }
    setupLight(context, data) {
        context.renderer.setGlobalUniform("uLightDir", "vec3", zogra_renderer_5.vec3(-1, 1, 0).normalize());
        context.renderer.setGlobalUniform("uAmbientSky", "color", zogra_renderer_2.rgb(.2, .2, .2));
        context.renderer.setGlobalUniform("uLightPos", "vec3", data.camera.position);
        context.renderer.setGlobalUniform("uLightColor", "color", zogra_renderer_2.rgb(.8, .8, .8));
    }
    renderCamera(context, data) {
        context.renderer.clear(zogra_renderer_2.rgb(.3, .3, .3), true);
        const camera = data.camera;
        camera.__preRender(context);
        if (camera.output === zogra_renderer_3.RenderTarget.CanvasTarget)
            context.renderer.setRenderTarget(zogra_renderer_3.RenderTarget.CanvasTarget);
        else
            context.renderer.setRenderTarget(camera.output);
        context.renderer.clear(camera.clearColor, camera.clearDepth);
        context.renderer.setViewProjection(camera.worldToLocalMatrix, camera.projectionMatrix);
        context.renderer.setGlobalUniform("uCameraPos", "vec3", camera.position);
        this.setupLight(context, data);
        const objs = data.getVisibleObjects(render_data_1.RenderOrder.NearToFar);
        for (const obj of objs) {
            obj.render(context, data);
            // const modelMatrix = obj.localToWorldMatrix;
            // for (let i = 0; i < obj.meshes.length; i++)
            // {
            //     if (!obj.meshes[i])
            //         continue;
            //     const mat = obj.materials[i] || context.renderer.assets.materials.default;
            //     this.drawWithMaterial(obj.meshes[i], modelMatrix, mat);
            // }
        }
        // this.debugLayer.render(context, data);
        this.renderGrid(context, data);
        camera.__postRender(context);
    }
    renderGrid(context, data) {
        this.renderer.drawLines(this.grid, zogra_renderer_1.mat4.identity(), this.renderer.assets.materials.ColoredLine);
    }
    drawWithMaterial(mesh, transform, material) {
        if (this.materialReplaceMap.has(material.constructor))
            this.renderer.drawMesh(mesh, transform, this.materialReplaceMap.get(material.constructor));
        else
            this.renderer.drawMesh(mesh, transform, material);
    }
    replaceMaterial(MaterialType, material) {
        this.materialReplaceMap.set(MaterialType, material);
    }
}
exports.PreviewRenderer = PreviewRenderer;
//# sourceMappingURL=preview-renderer.js.map

/***/ }),

/***/ "../zogra-engine/dist/render-pipeline/render-data.js":
/*!***********************************************************!*\
  !*** ../zogra-engine/dist/render-pipeline/render-data.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.RenderData = exports.RenderOrder = void 0;
const engine_1 = __webpack_require__(/*! ../engine/engine */ "../zogra-engine/dist/engine/engine.js");
const engine_2 = __webpack_require__(/*! ../engine/engine */ "../zogra-engine/dist/engine/engine.js");
const zogra_renderer_1 = __webpack_require__(/*! zogra-renderer */ "../zogra-renderer/dist/index.js");
var RenderOrder;
(function (RenderOrder) {
    RenderOrder[RenderOrder["NearToFar"] = 0] = "NearToFar";
    RenderOrder[RenderOrder["FarToNear"] = 1] = "FarToNear";
})(RenderOrder = exports.RenderOrder || (exports.RenderOrder = {}));
class RenderData {
    constructor(camera, scene) {
        this.visibleObjects = [];
        this.visibleLights = [];
        this.camera = camera;
        this.visibleLights = scene.getEntitiesOfType(engine_2.Light);
        this.visibleObjects = scene.getEntitiesOfType(engine_1.RenderObject);
    }
    getVisibleObjects(renderOrder = RenderOrder.NearToFar) {
        const viewMat = this.camera.worldToLocalMatrix;
        let wrap = this.visibleObjects.map(obj => ({ pos: zogra_renderer_1.mat4.mulPoint(viewMat, obj.position), obj: obj }));
        if (renderOrder === RenderOrder.NearToFar)
            wrap = wrap.sort((a, b) => b.pos.z - a.pos.z);
        else
            wrap = wrap.sort((a, b) => a.pos.z - b.pos.z);
        return wrap.map(t => t.obj);
    }
    getVisibleLights() {
        return this.visibleLights;
    }
}
exports.RenderData = RenderData;
//# sourceMappingURL=render-data.js.map

/***/ }),

/***/ "../zogra-engine/dist/render-pipeline/render-pipeline.js":
/*!***************************************************************!*\
  !*** ../zogra-engine/dist/render-pipeline/render-pipeline.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=render-pipeline.js.map

/***/ }),

/***/ "../zogra-engine/dist/render-pipeline/rp.js":
/*!**************************************************!*\
  !*** ../zogra-engine/dist/render-pipeline/rp.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(__webpack_require__(/*! ./preview-renderer */ "../zogra-engine/dist/render-pipeline/preview-renderer.js"), exports);
__exportStar(__webpack_require__(/*! ./render-data */ "../zogra-engine/dist/render-pipeline/render-data.js"), exports);
__exportStar(__webpack_require__(/*! ./render-pipeline */ "../zogra-engine/dist/render-pipeline/render-pipeline.js"), exports);
__exportStar(__webpack_require__(/*! ./debug-layer */ "../zogra-engine/dist/render-pipeline/debug-layer.js"), exports);
__exportStar(__webpack_require__(/*! ./2d-default */ "../zogra-engine/dist/render-pipeline/2d-default.js"), exports);
//# sourceMappingURL=rp.js.map

/***/ }),

/***/ "../zogra-engine/dist/utils/index.js":
/*!*******************************************!*\
  !*** ../zogra-engine/dist/utils/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../zogra-engine/dist/utils/util.js":
/*!******************************************!*\
  !*** ../zogra-engine/dist/utils/util.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.DoubleBuffer = void 0;
class DoubleBuffer {
    constructor(init) {
        this.currentIdx = 0;
        this.buffers = [init(), init()];
    }
    get current() { return this.buffers[this.currentIdx % 2]; }
    set current(value) { this.buffers[this.currentIdx % 2] = value; }
    get back() { return this.buffers[(this.currentIdx + 1) % 2]; }
    set back(value) { this.buffers[(this.currentIdx + 1) % 2] = value; }
    update() {
        this.currentIdx++;
    }
}
exports.DoubleBuffer = DoubleBuffer;
//# sourceMappingURL=util.js.map

/***/ }),

/***/ "../zogra-renderer/dist/builtin-assets/assets.js":
/*!*******************************************************!*\
  !*** ../zogra-renderer/dist/builtin-assets/assets.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.BuiltinAssets = void 0;
const materials_1 = __webpack_require__(/*! ./materials */ "../zogra-renderer/dist/builtin-assets/materials.js");
const shaders_1 = __webpack_require__(/*! ./shaders */ "../zogra-renderer/dist/builtin-assets/shaders.js");
const textures_1 = __webpack_require__(/*! ./textures */ "../zogra-renderer/dist/builtin-assets/textures.js");
const mesh_1 = __webpack_require__(/*! ./mesh */ "../zogra-renderer/dist/builtin-assets/mesh.js");
class BuiltinAssets {
    constructor(ctx) {
        const gl = ctx.gl;
        this.gl = gl;
        ctx.assets = this;
        this.BuiltinUniforms = shaders_1.BuiltinUniformNames;
        this.shaderSources = shaders_1.BuiltinShaderSources;
        this.shaders = shaders_1.compileBuiltinShaders(gl);
        this.meshes = mesh_1.createBuiltinMesh(ctx);
        this.textures = textures_1.createDefaultTextures(ctx);
        this.types = materials_1.createBuiltinMaterialTypes(gl, this.textures, this.shaders);
        this.materials = materials_1.createBuiltinMaterial(gl, this.types, this.shaders, this.textures);
    }
}
exports.BuiltinAssets = BuiltinAssets;
//# sourceMappingURL=assets.js.map

/***/ }),

/***/ "../zogra-renderer/dist/builtin-assets/generated/index.js":
/*!****************************************************************!*\
  !*** ../zogra-renderer/dist/builtin-assets/generated/index.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var i = Object.defineProperty;
var u = o => i(o, "__esModule", { value: !0 });
var f = (o, r) => { for (var e in r)
    i(o, e, { get: r[e], enumerable: !0 }); };
u(exports);
f(exports, { BuiltinShaderSources: () => c });
var a = `#version 300 es\r
precision mediump float;\r
\r
in vec3 aPos;\r
in vec4 aColor;\r
in vec2 aUV;\r
in vec3 aNormal;\r
\r
uniform mat4 uTransformM;\r
uniform mat4 uTransformVP;\r
uniform mat4 uTransformMVP;\r
\r
out vec4 vColor;\r
out vec4 vPos;\r
out vec2 vUV;\r
out vec3 vNormal;\r
\r
void main()\r
{\r
    gl_Position = uTransformMVP * vec4(aPos, 1);\r
    vColor = aColor;\r
    vUV = aUV;\r
    vNormal = aNormal;\r
}`;
var v = `#version 300 es\r
precision mediump float;\r
\r
in vec4 vColor;\r
in vec4 vPos;\r
in vec2 vUV;\r
\r
uniform sampler2D uMainTex;\r
uniform vec4 uColor;\r
\r
out vec4 fragColor;\r
\r
void main()\r
{\r
    vec4 color = texture(uMainTex, vUV.xy).rgba;\r
    color = color * vColor * uColor;\r
    fragColor = color;\r
}`;
var l = `#version 300 es\r
precision mediump float;\r
\r
in vec4 vColor;\r
in vec4 vPos;\r
in vec2 vUV;\r
in vec3 vNormal;\r
\r
uniform sampler2D uMainTex;\r
\r
out vec4 fragColor;\r
\r
void main()\r
{\r
    fragColor = texture(uMainTex, vUV).rgba;\r
}`;
var n = `#version 300 es\r
precision mediump float;\r
\r
in vec4 vColor;\r
in vec4 vPos;\r
\r
out vec4 fragColor;\r
\r
void main()\r
{\r
    fragColor = vColor;\r
}`;
var m = `#version 300 es\r
precision mediump float;\r
\r
in vec3 aPos;\r
in vec4 aColor;\r
\r
uniform mat4 uTransformM;\r
uniform mat4 uTransformVP;\r
uniform mat4 uTransformMVP;\r
\r
out vec4 vColor;\r
out vec4 vPos;\r
\r
void main()\r
{\r
    gl_Position = uTransformMVP * vec4(aPos, 1);\r
    vColor = aColor;\r
}`;
var s = `#version 300 es\r
precision mediump float;\r
\r
in vec3 aPos;\r
in vec2 aUV;\r
\r
out vec2 vUV;\r
\r
void main()\r
{\r
    gl_Position = vec4(aPos, 1);\r
    vUV = vec2(aUV.x, vec2(1) - aUV.y);\r
}`;
var t = `#version 300 es\r
precision mediump float;\r
\r
in vec4 vPos;\r
in vec2 vUV;\r
\r
uniform sampler2D uMainTex;\r
\r
out vec4 fragColor;\r
\r
void main()\r
{\r
    fragColor = texture(uMainTex, vUV).rgba;\r
}`;
var c = { defaultVert: a, defaultFrag: v, blitCopy: l, colorFrag: n, colorVert: m, flipVert: s, texFrag: t };
0 && (false);
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../zogra-renderer/dist/builtin-assets/materials.js":
/*!**********************************************************!*\
  !*** ../zogra-renderer/dist/builtin-assets/materials.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBuiltinMaterialTypes = exports.createBuiltinMaterial = void 0;
const material_1 = __webpack_require__(/*! ../core/material */ "../zogra-renderer/dist/core/material.js");
const color_1 = __webpack_require__(/*! ../types/color */ "../zogra-renderer/dist/types/color.js");
const material_type_1 = __webpack_require__(/*! ../core/material-type */ "../zogra-renderer/dist/core/material-type.js");
const vec2_1 = __webpack_require__(/*! ../types/vec2 */ "../zogra-renderer/dist/types/vec2.js");
function createBuiltinMaterial(gl, types, shaders, textures) {
    const errorMat = new material_1.Material(shaders.ErrorShader, gl);
    errorMat.setProp("uMainTex", "tex2d", textures.error);
    return {
        error: errorMat,
        default: new types.DefaultMaterial(gl),
        blitCopy: new types.BlitCopy(gl),
        ColoredLine: new material_1.Material(shaders.ColoredLine, gl),
    };
}
exports.createBuiltinMaterial = createBuiltinMaterial;
function createBuiltinMaterialTypes(gl, builtinTexs, shaders) {
    let DefaultMaterial = class DefaultMaterial extends material_1.MaterialFromShader(shaders.DefaultShader) {
        constructor() {
            super(...arguments);
            this.color = color_1.Color.white;
            this.mainTexture = builtinTexs.default;
        }
    };
    __decorate([
        material_1.shaderProp("uColor", "color")
    ], DefaultMaterial.prototype, "color", void 0);
    __decorate([
        material_1.shaderProp("uMainTex", "tex2d")
    ], DefaultMaterial.prototype, "mainTexture", void 0);
    DefaultMaterial = __decorate([
        material_1.materialDefine
    ], DefaultMaterial);
    let BlitCopy = class BlitCopy extends material_1.MaterialFromShader(shaders.BlitCopy) {
        constructor() {
            super(...arguments);
            this.source = null;
            this.flip = vec2_1.vec2(0, 0);
        }
    };
    __decorate([
        material_1.shaderProp("uMainTex", "tex2d")
    ], BlitCopy.prototype, "source", void 0);
    __decorate([
        material_1.shaderProp("uFlip", "vec2")
    ], BlitCopy.prototype, "flip", void 0);
    BlitCopy = __decorate([
        material_1.materialDefine
    ], BlitCopy);
    let DefaultLit = class DefaultLit extends material_1.MaterialFromShader(shaders.DefaultShader) {
        constructor() {
            super(...arguments);
            this.color = color_1.Color.white;
            this.mainTexture = builtinTexs.default;
            this.normalTexture = builtinTexs.defaultNormal;
            this.emission = color_1.Color.black;
            this.specular = color_1.Color.white;
            this.metiallic = 0.023;
            this.smoothness = 0.5;
            this.fresnel = 5;
        }
    };
    __decorate([
        material_1.shaderProp("uColor", "color")
    ], DefaultLit.prototype, "color", void 0);
    __decorate([
        material_1.shaderProp("uMainTex", "tex2d")
    ], DefaultLit.prototype, "mainTexture", void 0);
    __decorate([
        material_1.shaderProp("uNormalTex", "tex2d")
    ], DefaultLit.prototype, "normalTexture", void 0);
    __decorate([
        material_1.shaderProp("uEmission", "color")
    ], DefaultLit.prototype, "emission", void 0);
    __decorate([
        material_1.shaderProp("uSpecular", "color")
    ], DefaultLit.prototype, "specular", void 0);
    __decorate([
        material_1.shaderProp("uMetallic", "float")
    ], DefaultLit.prototype, "metiallic", void 0);
    __decorate([
        material_1.shaderProp("uSmoothness", "float")
    ], DefaultLit.prototype, "smoothness", void 0);
    __decorate([
        material_1.shaderProp("uFresnel", "float")
    ], DefaultLit.prototype, "fresnel", void 0);
    DefaultLit = __decorate([
        material_1.materialDefine
    ], DefaultLit);
    return {
        DefaultMaterial: DefaultMaterial,
        BlitCopy: BlitCopy,
        DefaultLit: DefaultLit,
    };
}
exports.createBuiltinMaterialTypes = createBuiltinMaterialTypes;
//# sourceMappingURL=materials.js.map

/***/ }),

/***/ "../zogra-renderer/dist/builtin-assets/mesh.js":
/*!*****************************************************!*\
  !*** ../zogra-renderer/dist/builtin-assets/mesh.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.createBuiltinMesh = void 0;
const vec3_1 = __webpack_require__(/*! ../types/vec3 */ "../zogra-renderer/dist/types/vec3.js");
const vec2_1 = __webpack_require__(/*! ../types/vec2 */ "../zogra-renderer/dist/types/vec2.js");
const mesh_builder_1 = __webpack_require__(/*! ../utils/mesh-builder */ "../zogra-renderer/dist/utils/mesh-builder.js");
function createBuiltinMesh(ctx) {
    return {
        quad: mesh_builder_1.MeshBuilder.quad(vec2_1.vec2.zero(), vec2_1.vec2.one(), ctx),
        screenQuad: mesh_builder_1.MeshBuilder.ndcQuad(ctx),
        cube: mesh_builder_1.MeshBuilder.cube(vec3_1.vec3.zero(), vec3_1.vec3.one(), ctx),
    };
}
exports.createBuiltinMesh = createBuiltinMesh;
//# sourceMappingURL=mesh.js.map

/***/ }),

/***/ "../zogra-renderer/dist/builtin-assets/shaders.js":
/*!********************************************************!*\
  !*** ../zogra-renderer/dist/builtin-assets/shaders.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.BuiltinShaderSources = exports.compileBuiltinShaders = exports.BuiltinUniformNames = void 0;
const shader_1 = __webpack_require__(/*! ../core/shader */ "../zogra-renderer/dist/core/shader.js");
const generated_1 = __webpack_require__(/*! ./generated */ "../zogra-renderer/dist/builtin-assets/generated/index.js");
Object.defineProperty(exports, "BuiltinShaderSources", { enumerable: true, get: function () { return generated_1.BuiltinShaderSources; } });
exports.BuiltinUniformNames = {
    matM: "uTransformM",
    matM_IT: "uTransformM_IT",
    matMInv: "uTransformMInv",
    matVP: "uTransformVP",
    matMVP: "uTransformMVP",
    matMV_IT: "uTransformMV_IT",
    flipUV: "uFlipUV",
    mainTex: "uMainTex",
    color: "uColor",
};
function compileBuiltinShaders(gl) {
    return {
        DefaultShader: new shader_1.Shader(generated_1.BuiltinShaderSources.defaultVert, generated_1.BuiltinShaderSources.defaultFrag, { name: "DefaultShader" }, gl),
        BlitCopy: new shader_1.Shader(generated_1.BuiltinShaderSources.defaultVert, generated_1.BuiltinShaderSources.blitCopy, {
            name: "BlitCopy",
            depth: shader_1.DepthTest.Always,
            blend: shader_1.Blending.Disable,
            zWrite: false
        }, gl),
        FlipTexture: new shader_1.Shader(generated_1.BuiltinShaderSources.flipVert, generated_1.BuiltinShaderSources.blitCopy, {}, gl),
        ColoredLine: new shader_1.Shader(generated_1.BuiltinShaderSources.colorVert, generated_1.BuiltinShaderSources.colorFrag, {
            blend: [shader_1.Blending.SrcAlpha, shader_1.Blending.OneMinusSrcAlpha],
            depth: shader_1.DepthTest.Disable,
            zWrite: false,
        }, gl),
        ErrorShader: new shader_1.Shader(generated_1.BuiltinShaderSources.defaultVert, generated_1.BuiltinShaderSources.texFrag, {
            name: "Error"
        }, gl)
    };
}
exports.compileBuiltinShaders = compileBuiltinShaders;
//# sourceMappingURL=shaders.js.map

/***/ }),

/***/ "../zogra-renderer/dist/builtin-assets/textures.js":
/*!*********************************************************!*\
  !*** ../zogra-renderer/dist/builtin-assets/textures.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.createDefaultTextures = void 0;
const util_1 = __webpack_require__(/*! ../utils/util */ "../zogra-renderer/dist/utils/util.js");
const texture_1 = __webpack_require__(/*! ../core/texture */ "../zogra-renderer/dist/core/texture.js");
const texture_format_1 = __webpack_require__(/*! ../core/texture-format */ "../zogra-renderer/dist/core/texture-format.js");
function createDefaultTextures(context) {
    var _a;
    const size = 64;
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;
    const ctx = (_a = canvas.getContext("2d")) !== null && _a !== void 0 ? _a : util_1.panic("Failed to create default texture.");
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = "cyan";
    ctx.fillRect(0, 0, size / 2, size / 2);
    ctx.fillRect(size / 2, size / 2, size / 2, size / 2);
    const errorTex = new texture_1.Texture2D(size, size, texture_format_1.TextureFormat.RGBA, texture_1.FilterMode.Linear, context);
    errorTex.setData(canvas);
    errorTex.name = "Texture-Error";
    ctx.fillStyle = "blue";
    ctx.fillRect(0, 0, size, size);
    const defaultNormalTex = new texture_1.Texture2D(size, size, texture_format_1.TextureFormat.RGBA, texture_1.FilterMode.Linear, context);
    defaultNormalTex.setData(canvas);
    defaultNormalTex.name = "Default-Normal";
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, size, size);
    const defaultTex = new texture_1.Texture2D(size, size, texture_format_1.TextureFormat.RGBA, texture_1.FilterMode.Linear, context);
    defaultTex.setData(canvas);
    defaultTex.name = "Default-White";
    return {
        default: defaultTex,
        defaultNormal: defaultNormalTex,
        error: errorTex
    };
}
exports.createDefaultTextures = createDefaultTextures;
//# sourceMappingURL=textures.js.map

/***/ }),

/***/ "../zogra-renderer/dist/core/asset.js":
/*!********************************************!*\
  !*** ../zogra-renderer/dist/core/asset.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetManager = exports.LazyInitAsset = exports.Asset = void 0;
const util_1 = __webpack_require__(/*! ../utils/util */ "../zogra-renderer/dist/utils/util.js");
const event_1 = __webpack_require__(/*! ./event */ "../zogra-renderer/dist/core/event.js");
const global_1 = __webpack_require__(/*! ./global */ "../zogra-renderer/dist/core/global.js");
class Asset {
    constructor(name) {
        this.destroyed = false;
        this.assetID = exports.AssetManager.newAssetID(this);
        this.name = name || `Asset_${this.assetID}`;
    }
    destroy() {
        this.destroyed = true;
        exports.AssetManager.destroy(this.assetID);
    }
}
exports.Asset = Asset;
class LazyInitAsset extends Asset {
    constructor(ctx = global_1.GlobalContext()) {
        super();
        this.initialzed = false;
        this.ctx = ctx;
    }
    tryInit(required = false) {
        if (this.initialzed)
            return true;
        const ctx = this.ctx || global_1.GlobalContext();
        if (!ctx) {
            if (required)
                throw new Error("Failed to initialize GPU resource withou a global GL context.");
            return false;
        }
        this.ctx = ctx;
        if (this.init()) {
            this.initialzed = true;
            return true;
        }
        else {
            if (required)
                throw new Error("Failed to initialize required GPU resource.");
            return false;
        }
    }
}
exports.LazyInitAsset = LazyInitAsset;
class AssetManagerType {
    constructor() {
        this.assetsMap = new Map();
        this.id = 1;
        this.eventEmitter = new event_1.EventEmitter();
    }
    newAssetID(asset) {
        const currentId = ++this.id;
        this.assetsMap.set(currentId, asset);
        util_1.setImmediate(() => this.eventEmitter.emit("asset-created", asset));
        return asset.assetID = currentId;
    }
    find(id) {
        if (typeof (id) === "number")
            return this.assetsMap.get(id);
        else if (typeof (id) === "string") {
            for (const asset of this.assetsMap.values())
                if (asset.name === id)
                    return asset;
        }
        return undefined;
    }
    destroy(id) {
        const asset = this.assetsMap.get(id);
        if (!asset)
            return;
        this.assetsMap.delete(id);
        util_1.setImmediate(() => this.eventEmitter.emit("asset-destroyed", asset));
    }
    findAssetsOfType(type) {
        return Array.from(this.assetsMap.values()).filter(asset => asset instanceof type);
    }
    on(event, listener) {
        return this.eventEmitter.on(event, listener);
    }
    off(event, listener) {
        return this.eventEmitter.off(event, listener);
    }
}
exports.AssetManager = new AssetManagerType();
//# sourceMappingURL=asset.js.map

/***/ }),

/***/ "../zogra-renderer/dist/core/buffer.js":
/*!*********************************************!*\
  !*** ../zogra-renderer/dist/core/buffer.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.RenderBuffer = exports.BufferStructureInfo = void 0;
const util_1 = __webpack_require__(/*! ../utils/util */ "../zogra-renderer/dist/utils/util.js");
const global_1 = __webpack_require__(/*! ./global */ "../zogra-renderer/dist/core/global.js");
exports.BufferStructureInfo = {
    from(structure) {
        const valueLength = {
            float: 1,
            vec2: 2,
            vec3: 3,
            vec4: 4,
            mat4: 16,
        };
        const structInfo = {
            elements: [],
            byteSize: 0,
            totalSize: 0,
        };
        let location = 0;
        for (const key in structure) {
            const element = {
                key,
                type: structure[key],
                location: location,
                length: valueLength[structure[key]],
            };
            element.byteLength = element.length * 4;
            element.offset = structInfo.totalSize;
            element.byteOffset = structInfo.byteSize;
            structInfo.totalSize += element.length;
            structInfo.byteSize += element.byteLength;
            structInfo.elements.push(element);
            location += structure[key] === "mat4" ? 4 : 1;
        }
        return structInfo;
    }
};
class RenderBuffer extends Array {
    constructor(structure, items, ctx = global_1.GlobalContext()) {
        super(items);
        this.static = true;
        this.Data = null;
        this.dirty = false;
        this.initialized = false;
        this.glBuf = null;
        this.swapBuffer = null;
        this.structure = exports.BufferStructureInfo.from(structure);
        // this.structure = structure;
        this.ctx = ctx;
        this.buffer = null;
        this.resize(items);
        this.tryInit(false);
    }
    get byteLength() { return this.length * this.structure.byteSize; }
    resize(length, keepContent = true) {
        const oldBuffer = this.buffer;
        this.buffer = new Float32Array(this.structure.totalSize * length);
        if (keepContent && oldBuffer) {
            if (oldBuffer.length > this.buffer.length) {
                this.buffer.set(new Float32Array(oldBuffer.buffer, 0, this.buffer.length));
            }
            else
                this.buffer.set(oldBuffer, 0);
        }
        this.length = length;
        for (let i = 0; i < this.length; i++) {
            const elementView = {};
            for (const element of this.structure.elements) {
                const bufferOffset = i * this.structure.byteSize + element.byteOffset;
                switch (element.type) {
                    case "float":
                        elementView[element.key] = new Float32Array(this.buffer.buffer, bufferOffset, 1);
                        break;
                    case "vec2":
                        elementView[element.key] = new Float32Array(this.buffer.buffer, bufferOffset, 2);
                        break;
                    case "vec3":
                        elementView[element.key] = new Float32Array(this.buffer.buffer, bufferOffset, 3);
                        break;
                    case "vec4":
                        elementView[element.key] = new Float32Array(this.buffer.buffer, bufferOffset, 4);
                        break;
                    case "mat4":
                        elementView[element.key] = new Float32Array(this.buffer.buffer, bufferOffset, 16);
                        break;
                }
            }
            this[i] = elementView;
        }
        this.dirty = true;
    }
    swapVertices(a, b) {
        if (!this.swapBuffer)
            this.swapBuffer = new Float32Array(this.structure.totalSize);
        const offsetI = a * this.structure.byteSize;
        const offsetJ = b * this.structure.byteSize;
        let temp = this.swapBuffer;
        let viewA = new Float32Array(this.buffer.buffer, offsetI, this.structure.totalSize);
        temp.set(viewA);
        const viewB = new Float32Array(this.buffer.buffer, offsetJ, this.structure.totalSize);
        this.buffer.set(viewB, a * this.structure.totalSize);
        this.buffer.set(temp, b * this.structure.totalSize);
    }
    markDirty() {
        this.dirty = true;
    }
    upload(force = false) {
        this.tryInit(true);
        if (!this.dirty && !force && this.static)
            return false;
        const gl = this.ctx.gl;
        gl.bindBuffer(gl.ARRAY_BUFFER, this.glBuf);
        gl.bufferData(gl.ARRAY_BUFFER, this.buffer, this.static ? gl.STATIC_DRAW : gl.DYNAMIC_DRAW);
        this.dirty = false;
        return true;
    }
    bind() {
        this.tryInit(true);
        const gl = this.ctx.gl;
        this.upload();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.glBuf);
    }
    bindVertexArray(instancing = false, attributes) {
        this.tryInit(true);
        const gl = this.ctx.gl;
        this.upload();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.glBuf);
        for (const element of this.structure.elements) {
            const location = attributes
                ? attributes[element.key] || -1
                : element.location;
            if (location < 0)
                continue;
            if (element.type === "mat4") {
                gl.enableVertexAttribArray(location + 0);
                gl.enableVertexAttribArray(location + 1);
                gl.enableVertexAttribArray(location + 2);
                gl.enableVertexAttribArray(location + 3);
                gl.vertexAttribPointer(location + 0, 4, gl.FLOAT, false, this.structure.byteSize, element.byteOffset + 0);
                gl.vertexAttribPointer(location + 1, 4, gl.FLOAT, false, this.structure.byteSize, element.byteOffset + 1);
                gl.vertexAttribPointer(location + 2, 4, gl.FLOAT, false, this.structure.byteSize, element.byteOffset + 2);
                gl.vertexAttribPointer(location + 3, 4, gl.FLOAT, false, this.structure.byteSize, element.byteOffset + 3);
                if (instancing) {
                    gl.vertexAttribDivisor(location + 0, 1);
                    gl.vertexAttribDivisor(location + 1, 1);
                    gl.vertexAttribDivisor(location + 2, 1);
                    gl.vertexAttribDivisor(location + 3, 1);
                }
            }
            else {
                gl.enableVertexAttribArray(location);
                gl.vertexAttribPointer(location, element.length, gl.FLOAT, false, this.structure.byteSize, element.byteOffset);
                instancing && gl.vertexAttribDivisor(location, 1);
            }
        }
    }
    unbindVertexArray(instancing = false, attributes) {
        this.tryInit(true);
        const gl = this.ctx.gl;
        for (const element of this.structure.elements) {
            const location = attributes
                ? attributes[element.key] || -1
                : element.location;
            if (location < 0)
                continue;
            if (element.type === "mat4") {
                gl.disableVertexAttribArray(location + 0);
                gl.disableVertexAttribArray(location + 1);
                gl.disableVertexAttribArray(location + 2);
                gl.disableVertexAttribArray(location + 3);
                if (instancing) {
                    gl.vertexAttribDivisor(location + 0, 0);
                    gl.vertexAttribDivisor(location + 1, 0);
                    gl.vertexAttribDivisor(location + 2, 0);
                    gl.vertexAttribDivisor(location + 3, 0);
                }
            }
            else {
                gl.disableVertexAttribArray(location);
                instancing && gl.vertexAttribDivisor(location, 0);
            }
        }
    }
    unbind() {
        this.tryInit(true);
        const gl = this.ctx.gl;
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        gl.bindVertexArray(null);
    }
    tryInit(required = false) {
        var _a;
        if (this.initialized)
            return true;
        const ctx = this.ctx || global_1.GlobalContext();
        if (!ctx) {
            if (required)
                throw new Error("Failed to init render buffer without a global GL context.");
            return false;
        }
        this.ctx = ctx;
        const gl = ctx.gl;
        this.glBuf = (_a = gl.createBuffer()) !== null && _a !== void 0 ? _a : util_1.panic("Failed to create render buffer");
        gl.bindBuffer(gl.ARRAY_BUFFER, this.glBuf);
        gl.bufferData(gl.ARRAY_BUFFER, this.byteLength, this.static ? gl.STATIC_DRAW : gl.DYNAMIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        this.initialized = true;
        return true;
    }
}
exports.RenderBuffer = RenderBuffer;
//# sourceMappingURL=buffer.js.map

/***/ }),

/***/ "../zogra-renderer/dist/core/core.js":
/*!*******************************************!*\
  !*** ../zogra-renderer/dist/core/core.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextureFormat = void 0;
__exportStar(__webpack_require__(/*! ./material */ "../zogra-renderer/dist/core/material.js"), exports);
__exportStar(__webpack_require__(/*! ./material-type */ "../zogra-renderer/dist/core/material-type.js"), exports);
__exportStar(__webpack_require__(/*! ./mesh */ "../zogra-renderer/dist/core/mesh.js"), exports);
__exportStar(__webpack_require__(/*! ./renderer */ "../zogra-renderer/dist/core/renderer.js"), exports);
__exportStar(__webpack_require__(/*! ./shader */ "../zogra-renderer/dist/core/shader.js"), exports);
__exportStar(__webpack_require__(/*! ./texture */ "../zogra-renderer/dist/core/texture.js"), exports);
__exportStar(__webpack_require__(/*! ./asset */ "../zogra-renderer/dist/core/asset.js"), exports);
__exportStar(__webpack_require__(/*! ./lines */ "../zogra-renderer/dist/core/lines.js"), exports);
__exportStar(__webpack_require__(/*! ./event */ "../zogra-renderer/dist/core/event.js"), exports);
__exportStar(__webpack_require__(/*! ./buffer */ "../zogra-renderer/dist/core/buffer.js"), exports);
__exportStar(__webpack_require__(/*! ./render-target */ "../zogra-renderer/dist/core/render-target.js"), exports);
__exportStar(__webpack_require__(/*! ./debug */ "../zogra-renderer/dist/core/debug.js"), exports);
var texture_format_1 = __webpack_require__(/*! ./texture-format */ "../zogra-renderer/dist/core/texture-format.js");
Object.defineProperty(exports, "TextureFormat", { enumerable: true, get: function () { return texture_format_1.TextureFormat; } });
//# sourceMappingURL=core.js.map

/***/ }),

/***/ "../zogra-renderer/dist/core/debug.js":
/*!********************************************!*\
  !*** ../zogra-renderer/dist/core/debug.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.DebugProvider = void 0;
const color_1 = __webpack_require__(/*! ../types/color */ "../zogra-renderer/dist/types/color.js");
const math_1 = __webpack_require__(/*! ../types/math */ "../zogra-renderer/dist/types/math.js");
const rect_1 = __webpack_require__(/*! ../types/rect */ "../zogra-renderer/dist/types/rect.js");
const vec2_1 = __webpack_require__(/*! ../types/vec2 */ "../zogra-renderer/dist/types/vec2.js");
class DebugProvider {
    drawRay(origin, dir, distance = 1, color = color_1.Color.red) {
        this.drawLine(origin, math_1.mul(dir, distance).plus(origin), color);
    }
    drawRect(...args) {
        let min, max, color;
        if (args[0] instanceof rect_1.Rect) {
            min = args[0].min;
            max = args[0].max;
            color = args[1] || color_1.Color.red;
        }
        else {
            min = args[0];
            max = args[1];
            color = args[2] || color_1.Color.red;
        }
        this.drawLine(vec2_1.vec2(min.x, min.y).toVec3(), vec2_1.vec2(max.x, min.y).toVec3(), color);
        this.drawLine(vec2_1.vec2(max.x, min.y).toVec3(), vec2_1.vec2(max.x, max.y).toVec3(), color);
        this.drawLine(vec2_1.vec2(max.x, max.y).toVec3(), vec2_1.vec2(min.x, max.y).toVec3(), color);
        this.drawLine(vec2_1.vec2(min.x, max.y).toVec3(), vec2_1.vec2(min.x, min.y).toVec3(), color);
    }
}
exports.DebugProvider = DebugProvider;
//# sourceMappingURL=debug.js.map

/***/ }),

/***/ "../zogra-renderer/dist/core/event.js":
/*!********************************************!*\
  !*** ../zogra-renderer/dist/core/event.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.EventEmitter = void 0;
class EventEmitter {
    constructor() {
        this.listeners = new Map();
    }
    // on(event: string, listener: EventListener): void
    // on<T extends EventKeys<TEvents>>(event: T, listener: TEvents[T]): void
    on(event, listener) {
        var _a;
        if (!this.listeners.has(event))
            this.listeners.set(event, []);
        (_a = this.listeners.get(event)) === null || _a === void 0 ? void 0 : _a.push(listener);
    }
    // off(event: string, listener: EventListener): void
    // off<T extends EventKeys<TEvents>>(event: T, listener: TEvents[T]): void
    off(event, listener) {
        var _a, _b;
        if (this.listeners.has(event))
            this.listeners.set(event, (_b = (_a = this.listeners.get(event)) === null || _a === void 0 ? void 0 : _a.filter(f => f !== listener)) !== null && _b !== void 0 ? _b : []);
    }
    // emit(event: string, ...args: any[]): void
    // emit<T extends EventKeys<TEvents>>(event: T, ...args: Parameters<TEvents[T]>): void
    emit(event, ...args) {
        var _a;
        (_a = this.listeners.get(event)) === null || _a === void 0 ? void 0 : _a.forEach(f => f(...args));
    }
    with() {
        return this;
    }
}
exports.EventEmitter = EventEmitter;
//# sourceMappingURL=event.js.map

/***/ }),

/***/ "../zogra-renderer/dist/core/global.js":
/*!*********************************************!*\
  !*** ../zogra-renderer/dist/core/global.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Debug = exports.GL = exports.GlobalContext = exports.setGlobalContext = exports.GLContext = void 0;
const debug_1 = __webpack_require__(/*! ./debug */ "../zogra-renderer/dist/core/debug.js");
class GLContext {
    constructor() {
        this.gl = null;
        this.width = 0;
        this.height = 0;
        this.assets = null;
        this.renderer = null;
    }
}
exports.GLContext = GLContext;
let ctx;
let debugProvider = new class EmptyDebugProvider extends debug_1.DebugProvider {
    drawLine(start, end, color) {
        console.warn("No debug provider.");
    }
};
const setGlobalContext = (_ctx) => ctx = _ctx;
exports.setGlobalContext = setGlobalContext;
const GlobalContext = () => ctx;
exports.GlobalContext = GlobalContext;
const GL = () => { var _a; return (_a = exports.GlobalContext()) === null || _a === void 0 ? void 0 : _a.gl; };
exports.GL = GL;
const Debug = (provider) => {
    if (provider)
        debugProvider = provider;
    return debugProvider;
};
exports.Debug = Debug;
//# sourceMappingURL=global.js.map

/***/ }),

/***/ "../zogra-renderer/dist/core/lines.js":
/*!********************************************!*\
  !*** ../zogra-renderer/dist/core/lines.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.LineBuilder = exports.Lines = void 0;
const color_1 = __webpack_require__(/*! ../types/color */ "../zogra-renderer/dist/types/color.js");
const global_1 = __webpack_require__(/*! ./global */ "../zogra-renderer/dist/core/global.js");
const util_1 = __webpack_require__(/*! ../utils/util */ "../zogra-renderer/dist/utils/util.js");
const asset_1 = __webpack_require__(/*! ./asset */ "../zogra-renderer/dist/core/asset.js");
class Lines extends asset_1.Asset {
    constructor(gl = global_1.GL()) {
        var _a, _b;
        super();
        this._verts = [];
        this._colors = [];
        this._lines = [];
        this.dirty = true;
        this.vertices = new Float32Array(0);
        this.indices = new Uint32Array(0);
        this.name = `Lines_${this.assetID}`;
        this.gl = gl;
        this.VBO = (_a = gl.createBuffer()) !== null && _a !== void 0 ? _a : util_1.panic("Failed to create vertex buffer.");
        this.EBO = (_b = gl.createBuffer()) !== null && _b !== void 0 ? _b : util_1.panic("Failed to create element buffer.");
    }
    get verts() { return this._verts; }
    set verts(verts) {
        this._verts = verts;
        this.dirty = true;
    }
    get colors() { return this._colors; }
    set colors(colors) {
        this._colors = colors;
        this.dirty = true;
    }
    get lines() { return this._lines; }
    set lines(lines) {
        this._lines = lines;
        this.dirty = true;
    }
    clear() {
        this.verts = [];
        this.colors = [];
        this.lines = [];
    }
    update() {
        if (this.dirty) {
            const gl = this.gl;
            // Prepare VBO data.
            if (this.lines.length % 2 !== 0)
                throw new Error("Invalid lines.");
            if (this.colors.length !== this.verts.length)
                this.colors = [...this.colors, ...util_1.fillArray(color_1.Color.white, this.verts.length - this.colors.length)];
            this.vertices = new Float32Array(this.verts.flatMap((vert, idx) => [
                ...vert,
                ...this.colors[idx],
            ]));
            if (this.vertices.length != this.verts.length * 7)
                throw new Error("Buffer with invalid length.");
            this.indices = new Uint32Array(this.lines.flat());
            gl.bindBuffer(gl.ARRAY_BUFFER, this.VBO);
            gl.bufferData(gl.ARRAY_BUFFER, this.vertices, gl.DYNAMIC_DRAW);
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.EBO);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.indices, gl.DYNAMIC_DRAW);
            this.dirty = false;
        }
    }
    bind(shader) {
        const gl = this.gl;
        this.update();
        const attributes = shader.attributes;
        // Setup VAO
        const stride = 7 * 4;
        gl.bindBuffer(gl.ARRAY_BUFFER, this.VBO);
        // vert: vec3
        if (attributes.vert >= 0) {
            gl.vertexAttribPointer(attributes.vert, 3, gl.FLOAT, false, stride, 0);
            gl.enableVertexAttribArray(attributes.vert);
        }
        // color: vec4
        if (attributes.color >= 0) {
            gl.vertexAttribPointer(attributes.color, 4, gl.FLOAT, false, stride, 3 * 4);
            gl.enableVertexAttribArray(attributes.color);
        }
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.EBO);
    }
    destroy() {
        if (this.destroyed)
            return;
        this.gl.deleteBuffer(this.VBO);
        this.gl.deleteBuffer(this.EBO);
        super.destroy();
    }
}
exports.Lines = Lines;
class LineBuilder {
    constructor(capacity = 0, gl = global_1.GL()) {
        this.verts = [];
        this.colors = [];
        this.lines = [];
        this.gl = gl;
    }
    addLine(line, color = color_1.Color.white) {
        const base = this.verts.length;
        const [u, v] = line;
        this.verts.push(u, v);
        this.colors.push(color, color);
        this.lines.push(base, base + 1);
    }
    toLines() {
        const line = new Lines(this.gl);
        line.verts = this.verts;
        line.colors = this.colors;
        line.lines = this.lines;
        line.update();
        return line;
    }
}
exports.LineBuilder = LineBuilder;
//# sourceMappingURL=lines.js.map

/***/ }),

/***/ "../zogra-renderer/dist/core/material-type.js":
/*!****************************************************!*\
  !*** ../zogra-renderer/dist/core/material-type.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const material_1 = __webpack_require__(/*! ./material */ "../zogra-renderer/dist/core/material.js");
//# sourceMappingURL=material-type.js.map

/***/ }),

/***/ "../zogra-renderer/dist/core/material.js":
/*!***********************************************!*\
  !*** ../zogra-renderer/dist/core/material.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.materialDefine = exports.SimpleTexturedMaterial = exports.MaterialFromShader = exports.shaderProp = exports.Material = void 0;
const color_1 = __webpack_require__(/*! ../types/color */ "../zogra-renderer/dist/types/color.js");
const util_1 = __webpack_require__(/*! ../utils/util */ "../zogra-renderer/dist/utils/util.js");
__webpack_require__(/*! reflect-metadata */ "../zogra-renderer/node_modules/reflect-metadata/Reflect.js");
const global_1 = __webpack_require__(/*! ./global */ "../zogra-renderer/dist/core/global.js");
__webpack_require__(/*! reflect-metadata */ "../zogra-renderer/node_modules/reflect-metadata/Reflect.js");
const texture_1 = __webpack_require__(/*! ./texture */ "../zogra-renderer/dist/core/texture.js");
const asset_1 = __webpack_require__(/*! ./asset */ "../zogra-renderer/dist/core/asset.js");
const shaders_1 = __webpack_require__(/*! ../builtin-assets/shaders */ "../zogra-renderer/dist/builtin-assets/shaders.js");
/**
 * Inicate where to get the value from material
 */
var ValueReference;
(function (ValueReference) {
    ValueReference[ValueReference["Field"] = 0] = "Field";
    ValueReference[ValueReference["Dynamic"] = 1] = "Dynamic";
})(ValueReference || (ValueReference = {}));
// export type MaterialProperties = Map<string, NumericProperty<NumericUnifromTypes> | TextureProperty<TextureUniformTypes>>;
class Material extends asset_1.Asset {
    constructor(shader, gl = global_1.GL()) {
        super();
        this.properties = {};
        this.textureCount = 0;
        this.initialized = false;
        this.name = `Material_${this.assetID}`;
        this.gl = gl;
        this._shader = shader;
    }
    get shader() { return this._shader; }
    // set shader(value)
    // {
    //     const gl = this.gl;
    //     if (value != this._shader)
    //     {
    //         this._shader = value;
    //         for (const uniformName in this.properties)
    //         {
    //             const loc = this._shader.uniformLocation(uniformName);
    //             this.properties[uniformName].location = loc;
    //         }
    //     }
    // }
    upload(data) {
        this.tryInit(true);
        for (const uniformName in this.properties) {
            const prop = this.properties[uniformName];
            const value = prop.key
                ? this[prop.key]
                : prop.value;
            if (value !== undefined)
                this.uploadUniform(prop, value);
        }
    }
    // setProp<T extends UniformType>(key: string, uniformName: string, type: T, value: UniformValueType<T>): void
    // setProp<T extends UniformType>(name: string, type: T, value: UniformValueType<T>): void
    setProp(uniformName, type, value) {
        this.tryInit(true);
        const prop = this.getOrCreatePropInfo(uniformName, type);
        if (type !== prop.type) {
            console.warn("Uniform type missmatch");
            return;
        }
        if (prop.key)
            this[prop.key] = value;
        else
            prop.value = util_1.cloneUniformValue(value);
    }
    /**
     * Unbind all render textures from active texture slot due to avoid
     * 'Feedback loop formed between Framebuffer and active Texture' in chrome since version 83
     */
    unbindRenderTextures() {
        this.tryInit(true);
        const gl = this.gl;
        for (const uniformName in this.properties) {
            const prop = this.properties[uniformName];
            if (prop.uploaded instanceof texture_1.RenderTexture) {
                prop.uploaded.unbind(prop.textureUnit);
                prop.uploaded = null;
            }
        }
    }
    tryInit(required = false) {
        if (this.initialized)
            return true;
        const gl = this.gl || global_1.GL();
        if (!gl) {
            if (required)
                throw new Error("Failed to intialize material without global GL context");
            return false;
        }
        this.gl = gl;
        for (const key in this) {
            const propInfo = getShaderProp(this, key);
            if (!propInfo)
                continue;
            const prop = this.getOrCreatePropInfo(propInfo.name, propInfo.type);
            prop.key = key;
        }
        this.initialized = true;
        return true;
    }
    setUniformDirectly(uniformName, type, value) {
        if (value === undefined)
            throw new Error("");
        this.tryInit(true);
        const prop = this.getOrCreatePropInfo(uniformName, type);
        if (!prop.location)
            return;
        this.uploadUniform(prop, value);
    }
    getOrCreatePropInfo(uniformName, type) {
        let prop = this.properties[uniformName];
        if (prop)
            return prop;
        switch (type) {
            case "tex2d":
                prop = {
                    type: type,
                    uploaded: undefined,
                    location: this.shader.uniformLocation(uniformName),
                    textureUnit: this.textureCount++,
                };
                break;
            default:
                prop = {
                    type: type,
                    location: this.shader.uniformLocation(uniformName),
                    uploaded: undefined,
                };
        }
        this.properties[uniformName] = prop;
        return prop;
    }
    uploadUniform(prop, value) {
        const gl = this.gl;
        const ctx = global_1.GlobalContext();
        if (!prop.location)
            return false;
        let dirty = false;
        if (prop.uploaded === null && value === null && prop.type !== "tex2d")
            return false;
        // switch (prop.type)
        // {
        //     case "tex2d":
        //     case "float":
        //     case "int":
        //         dirty = prop.uploaded !== value;
        //         break;
        //     case "mat4":
        //         dirty = !mat4.exactEquals(prop.uploaded as mat4, value as mat4);
        //         break;
        //     default:
        //         dirty = !(prop.uploaded as Vector).equals(value);
        //         break;
        // }
        // if (!dirty)
        //     return false;
        switch (prop.type) {
            case "float":
                gl.uniform1f(prop.location, value);
                break;
            case "vec2":
                gl.uniform2fv(prop.location, value);
                break;
            case "vec3":
                gl.uniform3fv(prop.location, value);
                break;
            case "vec4":
                gl.uniform4fv(prop.location, value);
                break;
            case "color":
                gl.uniform4fv(prop.location, value);
                break;
            case "mat4":
                gl.uniformMatrix4fv(prop.location, false, value);
                break;
            case "tex2d":
                // Update texture to texture unit instead of update uniform1i
                // Due to performance issue mentioned in https://www.khronos.org/registry/webgl/specs/latest/1.0/#5.14.10
                value = value || ctx.renderer.assets.textures.default;
                value.bind(prop.textureUnit);
                if (!prop.uniformSet) {
                    gl.uniform1i(prop.location, prop.textureUnit);
                    prop.uniformSet = true;
                }
                break;
        }
        prop.uploaded = value;
    }
}
exports.Material = Material;
const shaderPropMetaKey = Symbol("shaderProp");
function shaderProp(name, type) {
    return Reflect.metadata(shaderPropMetaKey, { name: name, type: type });
}
exports.shaderProp = shaderProp;
function getShaderProp(target, propKey) {
    return Reflect.getMetadata(shaderPropMetaKey, target, propKey);
}
function MaterialFromShader(shader) {
    return class Mat extends Material {
        constructor(gl = global_1.GL()) {
            super(shader, gl);
        }
    };
}
exports.MaterialFromShader = MaterialFromShader;
function SimpleTexturedMaterial(shader) {
    class Mat extends MaterialFromShader(shader) {
        constructor() {
            super(...arguments);
            this.texture = null;
            this.color = new color_1.Color(1, 1, 1, 1);
        }
    }
    __decorate([
        shaderProp(shaders_1.BuiltinUniformNames.mainTex, "tex2d")
    ], Mat.prototype, "texture", void 0);
    __decorate([
        shaderProp(shaders_1.BuiltinUniformNames.color, "color")
    ], Mat.prototype, "color", void 0);
    return Mat;
}
exports.SimpleTexturedMaterial = SimpleTexturedMaterial;
/**
 *
 * @deprecated
 */
function materialDefine(constructor) {
    return class extends constructor {
        constructor(...arg) {
            super(...arg);
        }
    };
}
exports.materialDefine = materialDefine;
//# sourceMappingURL=material.js.map

/***/ }),

/***/ "../zogra-renderer/dist/core/mesh.js":
/*!*******************************************!*\
  !*** ../zogra-renderer/dist/core/mesh.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.MeshLegacy = exports.Mesh = exports.DefaultVertexStructInfo = exports.DefaultVertexData = void 0;
const vec3_1 = __webpack_require__(/*! ../types/vec3 */ "../zogra-renderer/dist/types/vec3.js");
const vec2_1 = __webpack_require__(/*! ../types/vec2 */ "../zogra-renderer/dist/types/vec2.js");
const color_1 = __webpack_require__(/*! ../types/color */ "../zogra-renderer/dist/types/color.js");
const global_1 = __webpack_require__(/*! ./global */ "../zogra-renderer/dist/core/global.js");
const util_1 = __webpack_require__(/*! ../utils/util */ "../zogra-renderer/dist/utils/util.js");
const math_1 = __webpack_require__(/*! ../types/math */ "../zogra-renderer/dist/types/math.js");
const asset_1 = __webpack_require__(/*! ./asset */ "../zogra-renderer/dist/core/asset.js");
const buffer_1 = __webpack_require__(/*! ./buffer */ "../zogra-renderer/dist/core/buffer.js");
const VertDataFloatCount = 14;
exports.DefaultVertexData = {
    vert: "vec3",
    color: "vec4",
    normal: "vec3",
    uv: "vec2",
    uv2: "vec2",
};
exports.DefaultVertexStructInfo = buffer_1.BufferStructureInfo.from(exports.DefaultVertexData);
class Mesh extends asset_1.Asset {
    constructor(...args) {
        super("Mesh");
        this.ctx = null;
        this.initialized = false;
        this.vertexArray = null;
        this.elementBuffer = null;
        this.dirty = true;
        this.indices = new Uint32Array();
        if (args.length === 0) {
            this.ctx = global_1.GlobalContext();
            this.vertices = new buffer_1.RenderBuffer(exports.DefaultVertexData, 0, this.ctx);
        }
        else if (args.length === 1) {
            if (args[0] instanceof global_1.GLContext) {
                this.ctx = args[0];
                this.vertices = new buffer_1.RenderBuffer(exports.DefaultVertexData, 0, this.ctx);
            }
            else {
                this.ctx = global_1.GlobalContext();
                this.vertices = new buffer_1.RenderBuffer(args[0], 0, this.ctx);
            }
        }
        else {
            this.ctx = args[1] || global_1.GlobalContext();
            this.vertices = new buffer_1.RenderBuffer(args[0], 0, this.ctx);
        }
        this.tryInit(false);
    }
    /** @deprecated */
    get verts() {
        return this.getVertexDataArray("vert", vec3_1.vec3.zero);
    }
    /** @deprecated */
    set verts(verts) {
        this.setVertexDataArray("vert", verts);
    }
    /** @deprecated */
    get uvs() {
        return this.getVertexDataArray("uv", vec2_1.vec2.zero);
    }
    /** @deprecated */
    set uvs(uvs) {
        this.setVertexDataArray("uv", uvs);
    }
    /** @deprecated */
    get colors() {
        return this.getVertexDataArray("color", () => color_1.Color.black);
    }
    /** @deprecated */
    set colors(colors) {
        this.setVertexDataArray("color", colors);
    }
    /** @deprecated */
    get normals() {
        return this.getVertexDataArray("uv2", vec3_1.vec3.zero);
    }
    /** @deprecated */
    set normals(normals) {
        this.setVertexDataArray("normal", normals);
    }
    /** @deprecated */
    get uv2() {
        return this.getVertexDataArray("uv2", vec2_1.vec2.zero);
    }
    /** @deprecated */
    set uv2(uv2) {
        this.setVertexDataArray("uv2", uv2);
    }
    /** @deprecated */
    get triangles() {
        return Array.from(this.indices);
    }
    /** @deprecated */
    set triangles(triangles) {
        if (triangles.length > this.indices.length)
            this.indices = new Uint32Array(triangles.length);
        this.indices.set(triangles);
    }
    getVertexDataArray(key, allocator) {
        return this.vertices.map(vert => allocator().set(vert[key]));
    }
    setVertexDataArray(key, values) {
        const vertices = this.vertices;
        if (values.length >= this.vertices.length)
            this.vertices.resize(values.length);
        values.forEach((value, i) => this.vertices[i][key].set(value));
    }
    resize(vertices, indices, keepData = false) {
        this.vertices.resize(vertices, keepData);
        let oldTriangles = this.indices;
        this.indices = new Uint32Array(indices);
        if (keepData) {
            if (indices < oldTriangles.length) {
                oldTriangles = new Uint32Array(oldTriangles.buffer, 0, indices);
            }
            this.indices.set(oldTriangles, 0);
        }
        this.dirty = true;
    }
    update(upload = false) {
        this.dirty = true;
        this.vertices.markDirty();
        if (upload)
            this.upload();
    }
    upload() {
        this.tryInit(true);
        if (!this.dirty)
            return false;
        const gl = this.ctx.gl;
        this.vertices.upload();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.elementBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.indices, gl.STATIC_DRAW);
        this.dirty = false;
        return true;
    }
    bind() {
        this.upload();
        const gl = this.ctx.gl;
        gl.bindVertexArray(this.vertexArray);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.elementBuffer);
        return this.indices.length;
    }
    unbind() {
        this.tryInit(true);
        const gl = this.ctx.gl;
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
        gl.bindVertexArray(null);
    }
    // https://schemingdeveloper.com/2014/10/17/better-method-recalculate-normals-unity/
    /**
     * Heavy cost
     * @param angleThreshold
     */
    calculateNormals(angleThreshold = 0) {
        if (this.triangles.length % 3 !== 0)
            throw new Error("Invalid triangles.");
        // this.normals = fillArray(() => vec3(0, 0, 0), this.verts.length);
        for (let i = 0; i < this.triangles.length; i += 3) {
            const a = this.vertices[this.triangles[i + 0]].vert;
            const b = this.vertices[this.triangles[i + 1]].vert;
            const c = this.vertices[this.triangles[i + 2]].vert;
            const u = math_1.minus(b, a);
            const v = math_1.minus(c, a);
            const normal = math_1.cross(u, v).normalize();
            vec3_1.vec3.plus(this.vertices[this.triangles[i + 0]].normal, this.vertices[this.triangles[i + 0]].normal, normal);
            vec3_1.vec3.plus(this.vertices[this.triangles[i + 1]].normal, this.vertices[this.triangles[i + 1]].normal, normal);
            vec3_1.vec3.plus(this.vertices[this.triangles[i + 2]].normal, this.vertices[this.triangles[i + 2]].normal, normal);
        }
        for (let i = 0; i < this.vertices.length; i++) {
            vec3_1.vec3.normalize(this.vertices[i].normal, this.vertices[i].normal);
        }
    }
    tryInit(required = false) {
        var _a, _b;
        if (this.initialized)
            return true;
        this.ctx = this.ctx || global_1.GlobalContext();
        if (!this.ctx) {
            if (required)
                throw new Error("Failed to init mesh without global GL context");
            return false;
        }
        const gl = this.ctx.gl;
        this.elementBuffer = (_a = gl.createBuffer()) !== null && _a !== void 0 ? _a : util_1.panic("Failed to create element buffer object.");
        this.vertexArray = (_b = gl.createVertexArray()) !== null && _b !== void 0 ? _b : util_1.panic("Failed to create vertex array object.");
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.elementBuffer);
        gl.bindVertexArray(this.vertexArray);
        this.vertices.bindVertexArray();
        gl.bindVertexArray(null);
        this.initialized = true;
        return true;
    }
}
exports.Mesh = Mesh;
/** @deprecated */
class MeshLegacy extends asset_1.Asset {
    constructor(gl = global_1.GL()) {
        super();
        this._verts = [];
        this._triangles = [];
        this._uvs = [];
        this._uv2 = [];
        this._colors = [];
        this._normals = [];
        this.dirty = true;
        this.uploaded = false;
        this.vertices = new Float32Array(0);
        this.indices = new Uint32Array(0);
        this.VAO = null;
        this.VBO = null;
        this.EBO = null;
        this.initialized = false;
        this.name = `Mesh_${this.assetID}`;
        this.vertexStruct = exports.DefaultVertexStructInfo;
        this.gl = gl;
        this.tryInit(false);
    }
    get verts() { return this._verts; }
    set verts(verts) {
        this._verts = verts;
        this.dirty = true;
    }
    get triangles() { return this._triangles; }
    set triangles(triangles) {
        this._triangles = triangles;
        this.dirty = true;
    }
    get uvs() { return this._uvs; }
    set uvs(uvs) {
        this._uvs = uvs;
        this.dirty = true;
    }
    get uv2() { return this._uv2; }
    set uv2(uv) {
        this._uv2 = uv;
        this.dirty = true;
    }
    get colors() { return this._colors; }
    set colors(colors) {
        this._colors = colors;
        this.dirty = true;
    }
    get normals() { return this._normals; }
    set normals(normals) {
        this._normals = normals;
        this.dirty = true;
    }
    clear() {
        this.verts = [];
        this.uvs = [];
        this.triangles = [];
        this.colors = [];
        this.normals = [];
    }
    // https://schemingdeveloper.com/2014/10/17/better-method-recalculate-normals-unity/
    calculateNormals(angleThreshold = 0) {
        if (this.triangles.length % 3 !== 0)
            throw new Error("Invalid triangles.");
        this.normals = util_1.fillArray(() => vec3_1.vec3(0, 0, 0), this.verts.length);
        for (let i = 0; i < this.triangles.length; i += 3) {
            const a = this.verts[this.triangles[i]];
            const b = this.verts[this.triangles[i + 1]];
            const c = this.verts[this.triangles[i + 2]];
            const u = math_1.minus(b, a);
            const v = math_1.minus(c, a);
            const normal = math_1.cross(u, v).normalize();
            this.normals[this.triangles[i + 0]].plus(normal);
            this.normals[this.triangles[i + 1]].plus(normal);
            this.normals[this.triangles[i + 2]].plus(normal);
        }
        for (let i = 0; i < this.normals.length; i++)
            this.normals[i] = this.normals[i].normalize();
    }
    update() {
        if (this.dirty) {
            if (this.triangles.length % 3 !== 0)
                throw new Error("Invalid triangles.");
            if (this.colors.length !== this.verts.length)
                this.colors = [...this.colors, ...util_1.fillArray(color_1.Color.white, this.verts.length - this.colors.length)];
            if (this.uvs.length !== this.verts.length)
                this.uvs = [...this.uvs, ...util_1.fillArray(vec2_1.vec2(0, 0), this.verts.length - this.uvs.length)];
            if (this.uv2.length !== this.verts.length)
                this.uv2 = [...this.uv2, ...util_1.fillArray(vec2_1.vec2(0, 0), this.verts.length - this.uv2.length)];
            if (this.normals.length !== this.verts.length)
                this.normals = [...this.normals, ...util_1.fillArray(vec3_1.vec3(0, 0, 0), this.verts.length - this.normals.length)];
            this.vertices = new Float32Array(this.verts.flatMap((vert, idx) => [
                ...vert,
                ...this.colors[idx],
                ...this.normals[idx],
                ...this.uvs[idx],
                ...this.uv2[idx],
            ]));
            if (this.vertices.length != this.verts.length * VertDataFloatCount)
                throw new Error("Buffer with invalid length.");
            this.indices = new Uint32Array(this.triangles.flat());
            this.dirty = false;
            this.uploaded = false;
        }
    }
    setup() {
        this.update();
        this.tryInit(true);
        const gl = this.gl;
        if (!this.uploaded) {
            gl.bindBuffer(gl.ARRAY_BUFFER, this.VBO);
            gl.bufferData(gl.ARRAY_BUFFER, this.vertices, gl.STATIC_DRAW);
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.EBO);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.indices, gl.STATIC_DRAW);
            this.uploaded = true;
        }
        return [this.VBO, this.EBO];
    }
    bind(shader) {
        this.setup();
        const gl = this.gl;
        // const attributes = shader._internal().attributes;
        // // Setup VAO
        // const stride = VertDataFloatCount * 4;
        // gl.bindBuffer(gl.ARRAY_BUFFER, this.VBO);
        // // vert: vec3
        // if (attributes.vert >= 0)
        // {
        //     gl.vertexAttribPointer(attributes.vert, 3, gl.FLOAT, false, stride, 0);
        //     gl.enableVertexAttribArray(attributes.vert);
        // }
        // // color: vec4
        // if (attributes.color >= 0)
        // {
        //     gl.vertexAttribPointer(attributes.color, 4, gl.FLOAT, false, stride, 3 * 4);
        //     gl.enableVertexAttribArray(attributes.color);
        // }
        // // uv: vec2
        // if (attributes.uv >= 0)
        // {
        //     gl.vertexAttribPointer(attributes.uv, 2, gl.FLOAT, false, stride, 7 * 4);
        //     gl.enableVertexAttribArray(attributes.uv);
        // }
        // // uv2: vec2
        // if (attributes.uv2 >= 0)
        // {
        //     gl.vertexAttribPointer(attributes.uv2, 2, gl.FLOAT, false, stride, 9 * 4);
        //     gl.enableVertexAttribArray(attributes.uv2);
        // }
        // if (attributes.uv)
        // // normal: vec3
        // if (attributes.normal >= 0)
        // {
        //     gl.vertexAttribPointer(attributes.normal, 3, gl.FLOAT, true, stride, 11 * 4);
        //     gl.enableVertexAttribArray(attributes.normal);
        // }
        // gl.bindBuffer(gl.ARRAY_BUFFER, this.VBO);
        gl.bindVertexArray(this.VAO);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.EBO);
        // gl.bindVertexArray(shader.vertexArray);
    }
    unbind() {
        const gl = this.gl;
        // gl.bindBuffer(gl.ARRAY_BUFFER, null);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
        gl.bindVertexArray(null);
    }
    destroy() {
        if (!this.initialized)
            return;
        if (this.destroyed)
            return;
        this.gl.deleteBuffer(this.VBO);
        this.gl.deleteBuffer(this.EBO);
        super.destroy();
    }
    tryInit(required = false) {
        var _a, _b;
        if (this.initialized)
            return true;
        const gl = this.gl || global_1.GL();
        if (!gl) {
            if (required)
                throw new Error("Failed to init mesh without global GL context");
            return false;
        }
        this.gl = gl;
        this.VBO = (_a = gl.createBuffer()) !== null && _a !== void 0 ? _a : util_1.panic("Failed to create vertex buffer.");
        this.EBO = (_b = gl.createBuffer()) !== null && _b !== void 0 ? _b : util_1.panic("Failed to create element buffer.");
        this.initVAO();
        this.initialized = true;
        return true;
    }
    initVAO() {
        var _a;
        const gl = this.gl;
        this.VAO = (_a = gl.createVertexArray()) !== null && _a !== void 0 ? _a : util_1.panic("Failed to create vertex array object.");
        gl.bindVertexArray(this.VAO);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.VBO);
        for (const element of this.vertexStruct.elements) {
            gl.enableVertexAttribArray(element.location);
            gl.vertexAttribPointer(element.location, element.length, gl.FLOAT, false, this.vertexStruct.byteSize, element.byteOffset);
        }
        gl.bindVertexArray(null);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
    }
}
exports.MeshLegacy = MeshLegacy;
//# sourceMappingURL=mesh.js.map

/***/ }),

/***/ "../zogra-renderer/dist/core/render-target.js":
/*!****************************************************!*\
  !*** ../zogra-renderer/dist/core/render-target.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.RenderTarget = void 0;
const global_1 = __webpack_require__(/*! ./global */ "../zogra-renderer/dist/core/global.js");
const util_1 = __webpack_require__(/*! ../utils/util */ "../zogra-renderer/dist/utils/util.js");
const vec2_1 = __webpack_require__(/*! ../types/vec2 */ "../zogra-renderer/dist/types/vec2.js");
const FrameBufferAttachment = {
    canvasOutput: { tex: null, attachPoint: WebGL2RenderingContext.BACK },
    fromRenderTexture: (rt) => ({ tex: rt.glTex() })
};
class CanvasTarget {
    get width() { return global_1.GlobalContext().width; }
    get height() { return global_1.GlobalContext().height; }
    get size() { return global_1.GlobalContext().renderer.canvasSize; }
    bind() {
        const gl = global_1.GlobalContext().gl;
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.viewport(0, 0, this.width, this.height);
    }
    release() { }
}
class RenderTarget {
    constructor(width = 0, height = 0, ctx = global_1.GlobalContext()) {
        var _a;
        this.colorAttachments = [];
        this.depthAttachment = FrameBufferAttachment.canvasOutput;
        this.isCanvasTarget = false;
        this.width = width;
        this.height = height;
        if (!ctx)
            this.frameBuffer = null;
        else
            this.frameBuffer = (_a = ctx.gl.createFramebuffer()) !== null && _a !== void 0 ? _a : util_1.panic("Failed to create frame buffer");
    }
    get size() { return vec2_1.vec2(this.width, this.height); }
    addColorAttachment(rt) {
        if (rt === null) {
            return;
        }
        // this.isCanvasTarget = false;
        if (this.width == 0 && this.height == 0) {
            this.width = rt.width;
            this.height = rt.height;
        }
        if (this.width != rt.width || this.height != rt.height)
            throw new Error("Framebuffer attachments must in same resolution.");
        this.colorAttachments.push(FrameBufferAttachment.fromRenderTexture(rt));
    }
    setDepthAttachment(rt) {
        var _a;
        if (this.width == 0 && this.height == 0) {
            this.width = rt.width;
            this.height = rt.height;
        }
        if (this.width != rt.width || this.height != rt.height)
            throw new Error("Framebuffer attachments must in same resolution.");
        this.depthAttachment = { tex: (_a = rt === null || rt === void 0 ? void 0 : rt.glTex) !== null && _a !== void 0 ? _a : null, attachPoint: WebGL2RenderingContext.DEPTH_ATTACHMENT };
    }
    bind(ctx = global_1.GlobalContext()) {
        const gl = ctx.gl;
        if (this.isCanvasTarget) {
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            gl.viewport(0, 0, ctx.width, ctx.height);
        }
        else {
            gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBuffer);
            let attachIdx = 0;
            for (let i = 0; i < this.colorAttachments.length; i++) {
                if (this.colorAttachments[i].tex) {
                    this.colorAttachments[i].attachPoint = gl.COLOR_ATTACHMENT0 + attachIdx++;
                    gl.framebufferTexture2D(gl.FRAMEBUFFER, this.colorAttachments[i].attachPoint, gl.TEXTURE_2D, this.colorAttachments[i].tex, 0);
                }
            }
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, this.depthAttachment.tex, 0);
            gl.viewport(0, 0, this.width, this.height);
            const buffers = this.colorAttachments.map(t => t.attachPoint);
            gl.drawBuffers(buffers);
        }
    }
    release(ctx = global_1.GlobalContext()) {
        if (this.isCanvasTarget)
            return;
        const gl = ctx.gl;
        gl.deleteFramebuffer(this.frameBuffer);
    }
}
exports.RenderTarget = RenderTarget;
RenderTarget.CanvasTarget = Object.freeze(new CanvasTarget());
//# sourceMappingURL=render-target.js.map

/***/ }),

/***/ "../zogra-renderer/dist/core/renderer.js":
/*!***********************************************!*\
  !*** ../zogra-renderer/dist/core/renderer.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ZograRenderer = void 0;
const util_1 = __webpack_require__(/*! ../utils/util */ "../zogra-renderer/dist/utils/util.js");
const global_1 = __webpack_require__(/*! ./global */ "../zogra-renderer/dist/core/global.js");
const color_1 = __webpack_require__(/*! ../types/color */ "../zogra-renderer/dist/types/color.js");
const mat4_1 = __webpack_require__(/*! ../types/mat4 */ "../zogra-renderer/dist/types/mat4.js");
const render_target_1 = __webpack_require__(/*! ./render-target */ "../zogra-renderer/dist/core/render-target.js");
const texture_1 = __webpack_require__(/*! ./texture */ "../zogra-renderer/dist/core/texture.js");
const vec2_1 = __webpack_require__(/*! ../types/vec2 */ "../zogra-renderer/dist/types/vec2.js");
const assets_1 = __webpack_require__(/*! ../builtin-assets/assets */ "../zogra-renderer/dist/builtin-assets/assets.js");
const rect_1 = __webpack_require__(/*! ../types/rect */ "../zogra-renderer/dist/types/rect.js");
const mesh_builder_1 = __webpack_require__(/*! ../utils/mesh-builder */ "../zogra-renderer/dist/utils/mesh-builder.js");
const math_1 = __webpack_require__(/*! ../types/math */ "../zogra-renderer/dist/types/math.js");
const shaders_1 = __webpack_require__(/*! ../builtin-assets/shaders */ "../zogra-renderer/dist/builtin-assets/shaders.js");
class ZograRenderer {
    constructor(canvasElement, width, height) {
        this.viewProjectionMatrix = mat4_1.mat4.identity();
        this.viewMatrix = mat4_1.mat4.identity();
        this.projectionMatrix = mat4_1.mat4.identity();
        this.target = render_target_1.RenderTarget.CanvasTarget;
        this.shader = null;
        this.globalUniforms = new Map();
        this.globalTextures = new Map();
        this.canvas = canvasElement;
        this.width = width === undefined ? canvasElement.width : width;
        this.height = height === undefined ? canvasElement.height : height;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.scissor = new rect_1.Rect(vec2_1.vec2.zero(), vec2_1.vec2(this.width, this.height));
        this.gl = util_1.panicNull(this.canvas.getContext("webgl2"), "WebGL2 is not support on current device.");
        this.ctx = new global_1.GLContext();
        Object.assign(this.ctx, {
            gl: this.gl,
            width: this.width,
            height: this.height,
            assets: {},
            renderer: this,
        });
        this.assets = new assets_1.BuiltinAssets(this.ctx);
        this.ctx.assets = this.assets;
        if (!global_1.GlobalContext())
            this.use();
        this.helperAssets = {
            clipBlitMesh: mesh_builder_1.MeshBuilder.ndcQuad(),
            blitMesh: mesh_builder_1.MeshBuilder.ndcTriangle(),
        };
    }
    use() {
        global_1.setGlobalContext(this.ctx);
    }
    setSize(width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
        this.width = width;
        this.height = height;
        this.ctx.width = width;
        this.ctx.height = height;
    }
    get canvasSize() { return vec2_1.vec2(this.width, this.height); }
    setViewProjection(view, projection) {
        mat4_1.mat4.mul(this.viewProjectionMatrix, projection, view);
    }
    setRenderTarget(colorAttachments, depthAttachment) {
        if (colorAttachments === render_target_1.RenderTarget.CanvasTarget) {
            if (this.target !== colorAttachments)
                this.target.release();
            this.target = colorAttachments;
        }
        else if (colorAttachments instanceof render_target_1.RenderTarget) {
            if (this.target !== colorAttachments)
                this.target.release();
            this.target = colorAttachments;
            if (depthAttachment) {
                this.target.setDepthAttachment(depthAttachment);
            }
        }
        else {
            let target;
            if (colorAttachments instanceof Array) {
                this.target.release();
                target = new render_target_1.RenderTarget(colorAttachments[0].width, colorAttachments[0].height, this.ctx);
                for (let i = 0; i < colorAttachments.length; i++)
                    target.addColorAttachment(colorAttachments[i]);
            }
            else if (colorAttachments instanceof texture_1.RenderTexture) {
                this.target.release();
                target = new render_target_1.RenderTarget(colorAttachments.width, colorAttachments.height, this.ctx);
                target.addColorAttachment(colorAttachments);
            }
            else
                throw new Error("Invalid render target");
            if (depthAttachment)
                target.setDepthAttachment(depthAttachment);
            this.target = target;
        }
        this.scissor = new rect_1.Rect(vec2_1.vec2.zero(), this.target.size);
        this.target.bind();
    }
    clear(color = color_1.Color.black, clearDepth = true) {
        this.gl.clearColor(color.r, color.g, color.b, color.a);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | (clearDepth ? this.gl.DEPTH_BUFFER_BIT : 0));
    }
    blit(src, dst, material = this.assets.materials.blitCopy, srcRect, dstRect) {
        if (dst instanceof texture_1.RenderTexture) {
            const target = new render_target_1.RenderTarget(dst.width, dst.height, this.ctx);
            target.addColorAttachment(dst);
            dst = target;
        }
        else if (dst instanceof Array) {
            const target = new render_target_1.RenderTarget(0, 0, this.ctx);
            for (let i = 0; i < dst.length; i++) {
                target.addColorAttachment(dst[i]);
            }
            dst = target;
        }
        const prevVP = this.viewProjectionMatrix;
        const prevTarget = this.target;
        let mesh = this.helperAssets.blitMesh;
        let viewport = dst === render_target_1.RenderTarget.CanvasTarget ? new rect_1.Rect(vec2_1.vec2.zero(), this.canvasSize) : new rect_1.Rect(vec2_1.vec2.zero(), dst.size);
        if (src && (srcRect || dstRect)) {
            viewport = dstRect || viewport;
            if (srcRect) {
                mesh = this.helperAssets.clipBlitMesh;
                let uvMin = math_1.div(srcRect.min, src.size);
                let uvMax = math_1.div(srcRect.max, src.size);
                mesh.uvs = [
                    vec2_1.vec2(uvMin.x, uvMin.y),
                    vec2_1.vec2(uvMax.x, uvMin.y),
                    vec2_1.vec2(uvMax.x, uvMax.y),
                    vec2_1.vec2(uvMin.x, uvMax.y),
                ];
                mesh.update();
            }
        }
        this.target = dst;
        this.scissor = viewport;
        this.viewProjectionMatrix = mat4_1.mat4.identity();
        if (src)
            material.setProp(shaders_1.BuiltinUniformNames.mainTex, "tex2d", src);
        this.drawMesh(mesh, mat4_1.mat4.identity(), material);
        // this.unsetGlobalTexture(BuiltinUniformNames.mainTex);
        this.setRenderTarget(prevTarget);
        this.viewProjectionMatrix = prevVP;
    }
    useShader(shader) {
        // Shader state may be modified by flip texure.
        // if (shader === this.shader)
        //     return;
        const gl = this.gl;
        this.shader = shader;
        shader.use();
        shader.setupPipelineStates();
    }
    setupTransforms(shader, transformModel) {
        const gl = this.gl;
        const mvp = mat4_1.mat4.mul(this.viewProjectionMatrix, transformModel);
        const mit = mat4_1.mat4.create();
        if (mat4_1.mat4.invert(mit, transformModel))
            mat4_1.mat4.transpose(mit, mit);
        else
            mit.fill(0);
        const mvit = mat4_1.mat4.mul(this.viewMatrix, transformModel);
        if (mat4_1.mat4.invert(mvit, mvit))
            mat4_1.mat4.transpose(mvit, mvit);
        else
            mvit.fill(0);
        shader.setupBuiltinUniform({
            matM: transformModel,
            matVP: this.viewProjectionMatrix,
            matMVP: mvp,
            matM_IT: mit,
            matMV_IT: mvit,
        });
    }
    setupGlobalUniforms(material) {
        for (const val of this.globalUniforms.values()) {
            material.setUniformDirectly(val.name, val.type, val.value);
        }
    }
    drawMeshInstance(mesh, buffer, material, count) {
        if (!material)
            material = this.assets.materials.error;
        const gl = this.gl;
        const data = {
            assets: this.assets,
            gl: gl,
            nextTextureUnit: 0,
            size: vec2_1.vec2(this.width, this.height),
        };
        this.target.bind();
        this.setupScissor();
        this.useShader(material.shader);
        material.upload(data);
        this.setupTransforms(material.shader, mat4_1.mat4.identity());
        const elementCount = mesh.bind();
        buffer.bindVertexArray(true, material.shader.attributes);
        gl.drawElementsInstanced(gl.TRIANGLES, elementCount, gl.UNSIGNED_INT, 0, count);
        buffer.unbindVertexArray(true, material.shader.attributes);
        mesh.unbind();
        material.unbindRenderTextures();
    }
    drawMeshProceduralInstance(mesh, material, count) {
        if (!material)
            material = this.assets.materials.error;
        const gl = this.gl;
        const data = {
            assets: this.assets,
            gl: gl,
            nextTextureUnit: 0,
            size: vec2_1.vec2(this.width, this.height),
        };
        this.target.bind();
        this.setupScissor();
        this.useShader(material.shader);
        material.upload(data);
        this.setupTransforms(material.shader, mat4_1.mat4.identity());
        const elementCount = mesh.bind();
        gl.drawElementsInstanced(gl.TRIANGLES, elementCount, gl.UNSIGNED_INT, 0, count);
        material.unbindRenderTextures();
    }
    drawMesh(mesh, transform, material) {
        if (!material)
            material = this.assets.materials.error;
        const gl = this.gl;
        const data = {
            assets: this.assets,
            gl: gl,
            nextTextureUnit: 0,
            size: vec2_1.vec2(this.width, this.height),
        };
        this.target.bind();
        this.setupScissor();
        this.useShader(material.shader);
        material.upload(data);
        this.setupTransforms(material.shader, transform);
        this.setupGlobalUniforms(material);
        let elementCount = mesh.bind();
        gl.drawElements(gl.TRIANGLES, elementCount, gl.UNSIGNED_INT, 0);
        mesh.unbind();
        material.unbindRenderTextures();
    }
    drawLines(lines, transform, material) {
        const gl = this.gl;
        const data = {
            assets: this.assets,
            gl: gl,
            nextTextureUnit: 0,
            size: vec2_1.vec2(this.width, this.height),
        };
        this.target.bind();
        this.setupScissor();
        this.useShader(material.shader);
        material.upload(data);
        this.setupTransforms(material.shader, transform);
        // this.setupGlobalUniforms(material.shader, data);
        lines.bind(material.shader);
        gl.drawElements(gl.LINES, lines.lines.length, gl.UNSIGNED_INT, 0);
    }
    setGlobalUniform(name, type, value) {
        this.globalUniforms.set(name, {
            name: name,
            type: type,
            value: util_1.cloneUniformValue(value),
        });
    }
    unsetGlobalUniform(name) {
        this.globalUniforms.delete(name);
    }
    setupScissor() {
        const gl = this.gl;
        gl.viewport(this.scissor.xMin, this.scissor.yMin, this.scissor.size.x, this.scissor.size.y);
    }
}
exports.ZograRenderer = ZograRenderer;
//# sourceMappingURL=renderer.js.map

/***/ }),

/***/ "../zogra-renderer/dist/core/shader.js":
/*!*********************************************!*\
  !*** ../zogra-renderer/dist/core/shader.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Shader = exports.DefaultShaderAttributeNames = exports.Culling = exports.Blending = exports.DepthTest = void 0;
const util_1 = __webpack_require__(/*! ../utils/util */ "../zogra-renderer/dist/utils/util.js");
const global_1 = __webpack_require__(/*! ./global */ "../zogra-renderer/dist/core/global.js");
const shaders_1 = __webpack_require__(/*! ../builtin-assets/shaders */ "../zogra-renderer/dist/builtin-assets/shaders.js");
const util_2 = __webpack_require__(/*! ../utils/util */ "../zogra-renderer/dist/utils/util.js");
const asset_1 = __webpack_require__(/*! ./asset */ "../zogra-renderer/dist/core/asset.js");
const buffer_1 = __webpack_require__(/*! ./buffer */ "../zogra-renderer/dist/core/buffer.js");
const mesh_1 = __webpack_require__(/*! ./mesh */ "../zogra-renderer/dist/core/mesh.js");
var DepthTest;
(function (DepthTest) {
    DepthTest[DepthTest["Disable"] = -1] = "Disable";
    DepthTest[DepthTest["Always"] = WebGL2RenderingContext.ALWAYS] = "Always";
    DepthTest[DepthTest["Never"] = WebGL2RenderingContext.NEVER] = "Never";
    DepthTest[DepthTest["Less"] = WebGL2RenderingContext.LESS] = "Less";
    DepthTest[DepthTest["Equal"] = WebGL2RenderingContext.EQUAL] = "Equal";
    DepthTest[DepthTest["LEqual"] = WebGL2RenderingContext.LEQUAL] = "LEqual";
    DepthTest[DepthTest["Greater"] = WebGL2RenderingContext.GREATER] = "Greater";
    DepthTest[DepthTest["NotEqual"] = WebGL2RenderingContext.NOTEQUAL] = "NotEqual";
    DepthTest[DepthTest["GEqual"] = WebGL2RenderingContext.GEQUAL] = "GEqual";
})(DepthTest = exports.DepthTest || (exports.DepthTest = {}));
var Blending;
(function (Blending) {
    Blending[Blending["Disable"] = -1] = "Disable";
    Blending[Blending["Zero"] = WebGL2RenderingContext.ZERO] = "Zero";
    Blending[Blending["One"] = WebGL2RenderingContext.ONE] = "One";
    Blending[Blending["SrcColor"] = WebGL2RenderingContext.SRC_COLOR] = "SrcColor";
    Blending[Blending["OneMinusSrcColor"] = WebGL2RenderingContext.ONE_MINUS_SRC_COLOR] = "OneMinusSrcColor";
    Blending[Blending["DstColor"] = WebGL2RenderingContext.DST_COLOR] = "DstColor";
    Blending[Blending["OneMinusDstColor"] = WebGL2RenderingContext.ONE_MINUS_DST_COLOR] = "OneMinusDstColor";
    Blending[Blending["SrcAlpha"] = WebGL2RenderingContext.SRC_ALPHA] = "SrcAlpha";
    Blending[Blending["OneMinusSrcAlpha"] = WebGL2RenderingContext.ONE_MINUS_SRC_ALPHA] = "OneMinusSrcAlpha";
    Blending[Blending["DstAlpha"] = WebGL2RenderingContext.DST_ALPHA] = "DstAlpha";
    Blending[Blending["OneMinusDstAlpha"] = WebGL2RenderingContext.ONE_MINUS_DST_ALPHA] = "OneMinusDstAlpha";
})(Blending = exports.Blending || (exports.Blending = {}));
var Culling;
(function (Culling) {
    Culling[Culling["Disable"] = -1] = "Disable";
    Culling[Culling["Back"] = WebGL2RenderingContext.BACK] = "Back";
    Culling[Culling["Front"] = WebGL2RenderingContext.FRONT] = "Front";
    Culling[Culling["Both"] = WebGL2RenderingContext.FRONT_AND_BACK] = "Both";
})(Culling = exports.Culling || (exports.Culling = {}));
exports.DefaultShaderAttributeNames = {
    vert: "aPos",
    color: "aColor",
    uv: "aUV",
    uv2: "aUV2",
    normal: "aNormal",
};
class Shader extends asset_1.Asset {
    constructor(vertexShader, fragmentShader, options = {}, gl = global_1.GL()) {
        super(options.name);
        /** @internal */
        this.attributes = {};
        this.initialized = false;
        this.gl = null;
        this.program = null;
        this.vertexShader = null;
        this.fragmentShader = null;
        this.pipelineStates = null;
        this.builtinUniformLocations = null;
        this._compiled = false;
        if (!options.name)
            this.name = `Shader_${this.assetID}`;
        this.vertexShaderSource = vertexShader;
        this.fragmentShaderSouce = fragmentShader;
        this.options = options;
        this.gl = gl;
        this.vertexStruct = buffer_1.BufferStructureInfo.from(this.options.vertexStructure || mesh_1.DefaultVertexData);
        this.attributeNames = Object.assign(Object.assign({}, exports.DefaultShaderAttributeNames), options.attributes);
        this.tryInit();
    }
    get compiled() { return this._compiled; }
    uniformLocation(name) {
        this.tryInit(true);
        return this.gl.getUniformLocation(this.program, name);
    }
    use() {
        this.tryInit(true);
        this.gl.useProgram(this.program);
    }
    setupPipelineStates() {
        const gl = this.gl;
        if (this.pipelineStates.depth === DepthTest.Disable)
            gl.disable(gl.DEPTH_TEST);
        else {
            gl.enable(gl.DEPTH_TEST);
            gl.depthMask(this.pipelineStates.zWrite);
            gl.depthFunc(this.pipelineStates.depth);
        }
        if (!this.pipelineStates.blend)
            gl.disable(gl.BLEND);
        else {
            const [srcRGB, dstRGB] = this.pipelineStates.blendRGB;
            const [srcAlpha, dstAlpha] = this.pipelineStates.blendAlpha;
            gl.enable(gl.BLEND);
            gl.blendFuncSeparate(srcRGB, dstRGB, srcAlpha, dstAlpha);
        }
        if (this.pipelineStates.cull === Culling.Disable)
            gl.disable(gl.CULL_FACE);
        else {
            gl.enable(gl.CULL_FACE);
            gl.cullFace(this.pipelineStates.cull);
            gl.frontFace(gl.CCW);
        }
    }
    setupBuiltinUniform(params) {
        this.tryInit(true);
        const gl = this.gl;
        // gl.useProgram(this.program);
        // console.log(this.builtinUniformLocations.matMVP);
        this.builtinUniformLocations.matM && gl.uniformMatrix4fv(this.builtinUniformLocations.matM, false, params.matM.asMut());
        this.builtinUniformLocations.matVP && gl.uniformMatrix4fv(this.builtinUniformLocations.matVP, false, params.matVP.asMut());
        this.builtinUniformLocations.matMVP && gl.uniformMatrix4fv(this.builtinUniformLocations.matMVP, false, params.matMVP.asMut());
        this.builtinUniformLocations.matM_IT && gl.uniformMatrix4fv(this.builtinUniformLocations.matM_IT, false, params.matM_IT.asMut());
        this.builtinUniformLocations.matMV_IT && gl.uniformMatrix4fv(this.builtinUniformLocations.matMV_IT, false, params.matMV_IT.asMut());
    }
    setPipelineStates(settings) {
        this.options = Object.assign(Object.assign({}, this.options), settings);
        if (this.initialized)
            this.setPipelineStateInternal(settings);
    }
    setPipelineStateInternal(settings) {
        let blend = false;
        let blendRGB = [Blending.One, Blending.Zero];
        let blendAlpha = [Blending.One, Blending.OneMinusSrcAlpha];
        if (typeof (settings.blend) === "number" && settings.blend !== Blending.Disable) {
            blend = true;
            blendRGB = [settings.blend, settings.blend];
            blendAlpha = [settings.blend, settings.blend];
        }
        else if (settings.blend instanceof Array) {
            blend = true;
            blendRGB = settings.blend;
        }
        if (settings.blendRGB) {
            blend = settings.blend !== false && settings.blend !== Blending.Disable;
            blendRGB = settings.blendRGB;
        }
        if (settings.blendAlpha) {
            blend = settings.blend !== false && settings.blend !== Blending.Disable;
            blendAlpha = settings.blendAlpha;
        }
        this.pipelineStates = {
            depth: settings.depth || DepthTest.Less,
            blend,
            blendRGB,
            blendAlpha,
            zWrite: settings.zWrite === false ? false : true,
            cull: settings.cull || Culling.Back
        };
    }
    _internal() {
        this.tryInit(true);
        return {
            options: this.options,
        };
    }
    tryInit(required = false) {
        if (this.initialized)
            return true;
        const gl = this.gl || global_1.GL();
        if (!gl) {
            return required
                ? util_1.panic("Failed to init shader without a global GL context")
                : false;
        }
        this.gl = gl;
        this.program = util_1.panicNull(gl.createProgram(), "Failed to create shader program");
        this.vertexShader = util_1.panicNull(gl.createShader(gl.VERTEX_SHADER), "Failed to create vertex shader");
        this.fragmentShader = util_1.panicNull(gl.createShader(gl.FRAGMENT_SHADER), "Failed to create fragment shader");
        this.compile();
        gl.useProgram(this.program);
        // const attributes = this.options.attributes || DefaultShaderAttributes;
        const attributeNames = Object.assign(Object.assign({}, exports.DefaultShaderAttributeNames), this.options.attributes);
        this.attributes = {};
        for (const key in attributeNames) {
            this.attributes[key] = gl.getAttribLocation(this.program, attributeNames[key]);
        }
        this.setPipelineStateInternal(this.options);
        this.builtinUniformLocations = util_2.getUniformsLocation(gl, this.program, shaders_1.BuiltinUniformNames);
        this.initialized = true;
        return true;
    }
    compile() {
        this.gl.shaderSource(this.vertexShader, this.vertexShaderSource);
        this.gl.compileShader(this.vertexShader);
        if (!this.gl.getShaderParameter(this.vertexShader, this.gl.COMPILE_STATUS)) {
            //this.gl.deleteShader(this.vertexShader);
            throw new Error("Failed to compile vertex shader:\r\n" + this.gl.getShaderInfoLog(this.vertexShader));
        }
        this.gl.shaderSource(this.fragmentShader, this.fragmentShaderSouce);
        this.gl.compileShader(this.fragmentShader);
        if (!this.gl.getShaderParameter(this.fragmentShader, this.gl.COMPILE_STATUS)) {
            //this.gl.deleteShader(this.fragmentShader);
            throw new Error("Failed to compile fragment shader:\r\n" + this.gl.getShaderInfoLog(this.fragmentShader));
        }
        this.gl.attachShader(this.program, this.vertexShader);
        this.gl.attachShader(this.program, this.fragmentShader);
        for (const element of this.vertexStruct.elements) {
            if (this.attributeNames[element.key])
                this.gl.bindAttribLocation(this.program, element.location, this.attributeNames[element.key]);
        }
        this.gl.linkProgram(this.program);
        if (!this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS)) {
            throw new Error("Failed to link shader program:\r\n" + this.gl.getProgramInfoLog(this.program));
        }
    }
}
exports.Shader = Shader;
//# sourceMappingURL=shader.js.map

/***/ }),

/***/ "../zogra-renderer/dist/core/texture-format.js":
/*!*****************************************************!*\
  !*** ../zogra-renderer/dist/core/texture-format.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.mapGLFormat = exports.TextureFormat = void 0;
var TextureFormat;
(function (TextureFormat) {
    TextureFormat[TextureFormat["RGB"] = 1] = "RGB";
    TextureFormat[TextureFormat["RGBA"] = 2] = "RGBA";
    TextureFormat[TextureFormat["LUMINANCE_ALPHA"] = 3] = "LUMINANCE_ALPHA";
    TextureFormat[TextureFormat["LUMINANCE"] = 4] = "LUMINANCE";
    TextureFormat[TextureFormat["ALPHA"] = 5] = "ALPHA";
    TextureFormat[TextureFormat["R8"] = 6] = "R8";
    TextureFormat[TextureFormat["R16F"] = 7] = "R16F";
    TextureFormat[TextureFormat["R32F"] = 8] = "R32F";
    TextureFormat[TextureFormat["R8UI"] = 9] = "R8UI";
    TextureFormat[TextureFormat["RG8"] = 10] = "RG8";
    TextureFormat[TextureFormat["RG16F"] = 11] = "RG16F";
    TextureFormat[TextureFormat["RG32F"] = 12] = "RG32F";
    TextureFormat[TextureFormat["RG8UI"] = 13] = "RG8UI";
    TextureFormat[TextureFormat["RGB8"] = 14] = "RGB8";
    TextureFormat[TextureFormat["SRGB8"] = 15] = "SRGB8";
    TextureFormat[TextureFormat["RGB565"] = 16] = "RGB565";
    TextureFormat[TextureFormat["R11F_G11F_B10F"] = 17] = "R11F_G11F_B10F";
    TextureFormat[TextureFormat["RGB9_E5"] = 18] = "RGB9_E5";
    TextureFormat[TextureFormat["RGB16F"] = 19] = "RGB16F";
    TextureFormat[TextureFormat["RGB32F"] = 20] = "RGB32F";
    TextureFormat[TextureFormat["RGB8UI"] = 21] = "RGB8UI";
    TextureFormat[TextureFormat["RGBA8"] = 22] = "RGBA8";
    TextureFormat[TextureFormat["SRGB8_ALPHA8"] = 23] = "SRGB8_ALPHA8";
    TextureFormat[TextureFormat["RGB5_A1"] = 24] = "RGB5_A1";
    TextureFormat[TextureFormat["RGB10_A2"] = 25] = "RGB10_A2";
    TextureFormat[TextureFormat["RGBA4"] = 26] = "RGBA4";
    TextureFormat[TextureFormat["RGBA16F"] = 27] = "RGBA16F";
    TextureFormat[TextureFormat["RGBA32F"] = 28] = "RGBA32F";
    TextureFormat[TextureFormat["RGBA8UI"] = 29] = "RGBA8UI";
    TextureFormat[TextureFormat["DEPTH_COMPONENT"] = 30] = "DEPTH_COMPONENT";
    TextureFormat[TextureFormat["DEPTH_STENCIL"] = 31] = "DEPTH_STENCIL";
})(TextureFormat = exports.TextureFormat || (exports.TextureFormat = {}));
;
function mapGLFormat(gl, format) {
    const map = {
        [TextureFormat.RGB]: [gl.RGB, gl.RGB, gl.UNSIGNED_BYTE],
        [TextureFormat.RGBA]: [gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE],
        [TextureFormat.LUMINANCE_ALPHA]: [gl.LUMINANCE_ALPHA, gl.LUMINANCE_ALPHA, gl.UNSIGNED_BYTE],
        [TextureFormat.LUMINANCE]: [gl.LUMINANCE, gl.LUMINANCE, gl.UNSIGNED_BYTE],
        [TextureFormat.ALPHA]: [gl.ALPHA, gl.ALPHA, gl.UNSIGNED_BYTE],
        [TextureFormat.R8]: [gl.R8, gl.RED, gl.UNSIGNED_BYTE],
        [TextureFormat.R16F]: [gl.R16F, gl.RED, gl.HALF_FLOAT],
        [TextureFormat.R32F]: [gl.R32F, gl.RED, gl.FLOAT],
        [TextureFormat.R8UI]: [gl.R8UI, gl.RED_INTEGER, gl.UNSIGNED_BYTE],
        [TextureFormat.RG8]: [gl.RG8, gl.RG, gl.UNSIGNED_BYTE],
        [TextureFormat.RG16F]: [gl.RG16F, gl.RG, gl.HALF_FLOAT],
        [TextureFormat.RG32F]: [gl.RG32F, gl.RG, gl.FLOAT],
        [TextureFormat.RG8UI]: [gl.RG8UI, gl.RG_INTEGER, gl.UNSIGNED_BYTE],
        [TextureFormat.RGB8]: [gl.RGB8, gl.RGB, gl.UNSIGNED_BYTE],
        [TextureFormat.SRGB8]: [gl.SRGB8, gl.RGB, gl.UNSIGNED_BYTE],
        [TextureFormat.RGB565]: [gl.RGB565, gl.RGB, gl.UNSIGNED_BYTE],
        [TextureFormat.R11F_G11F_B10F]: [gl.R11F_G11F_B10F, gl.RGB, gl.UNSIGNED_INT_10F_11F_11F_REV],
        [TextureFormat.RGB9_E5]: [gl.RGB9_E5, gl.RGB, gl.HALF_FLOAT],
        [TextureFormat.RGB16F]: [gl.RGB16F, gl.RGB, gl.HALF_FLOAT],
        [TextureFormat.RGB32F]: [gl.RGB32F, gl.RGB, gl.FLOAT],
        [TextureFormat.RGB8UI]: [gl.RGB8UI, gl.RGB_INTEGER, gl.UNSIGNED_BYTE],
        [TextureFormat.RGBA8]: [gl.RGBA8, gl.RGBA, gl.UNSIGNED_BYTE],
        [TextureFormat.SRGB8_ALPHA8]: [gl.SRGB8_ALPHA8, gl.RGBA, gl.UNSIGNED_BYTE],
        [TextureFormat.RGB5_A1]: [gl.RGB5_A1, gl.RGBA, gl.UNSIGNED_BYTE],
        [TextureFormat.RGB10_A2]: [gl.RGB10_A2, gl.RGBA, gl.UNSIGNED_INT_2_10_10_10_REV],
        [TextureFormat.RGBA4]: [gl.RGBA4, gl.RGBA, gl.UNSIGNED_BYTE],
        [TextureFormat.RGBA16F]: [gl.RGBA16F, gl.RGBA, gl.HALF_FLOAT],
        [TextureFormat.RGBA32F]: [gl.RGBA32F, gl.RGBA, gl.FLOAT],
        [TextureFormat.RGBA8UI]: [gl.RGBA8UI, gl.RGBA_INTEGER, gl.UNSIGNED_BYTE],
        [TextureFormat.DEPTH_COMPONENT]: [gl.DEPTH_COMPONENT, gl.DEPTH_COMPONENT, gl.UNSIGNED_INT],
        [TextureFormat.DEPTH_STENCIL]: [gl.DEPTH_STENCIL, gl.DEPTH_COMPONENT, gl.UNSIGNED_INT],
    };
    return map[format];
}
exports.mapGLFormat = mapGLFormat;
//# sourceMappingURL=texture-format.js.map

/***/ }),

/***/ "../zogra-renderer/dist/core/texture.js":
/*!**********************************************!*\
  !*** ../zogra-renderer/dist/core/texture.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.RenderTexture = exports.DepthTexture = exports.Texture2D = exports.TextureResizing = exports.Texture = exports.WrapMode = exports.FilterMode = void 0;
const global_1 = __webpack_require__(/*! ./global */ "../zogra-renderer/dist/core/global.js");
const texture_format_1 = __webpack_require__(/*! ./texture-format */ "../zogra-renderer/dist/core/texture-format.js");
const util_1 = __webpack_require__(/*! ../utils/util */ "../zogra-renderer/dist/utils/util.js");
const asset_1 = __webpack_require__(/*! ./asset */ "../zogra-renderer/dist/core/asset.js");
const shaders_1 = __webpack_require__(/*! ../builtin-assets/shaders */ "../zogra-renderer/dist/builtin-assets/shaders.js");
const vec2_1 = __webpack_require__(/*! ../types/vec2 */ "../zogra-renderer/dist/types/vec2.js");
const image_sizing_1 = __webpack_require__(/*! ../utils/image-sizing */ "../zogra-renderer/dist/utils/image-sizing.js");
var FilterMode;
(function (FilterMode) {
    FilterMode[FilterMode["Linear"] = WebGL2RenderingContext.LINEAR] = "Linear";
    FilterMode[FilterMode["Nearest"] = WebGL2RenderingContext.NEAREST] = "Nearest";
})(FilterMode = exports.FilterMode || (exports.FilterMode = {}));
var WrapMode;
(function (WrapMode) {
    WrapMode[WrapMode["Repeat"] = WebGL2RenderingContext.REPEAT] = "Repeat";
    WrapMode[WrapMode["Clamp"] = WebGL2RenderingContext.CLAMP_TO_EDGE] = "Clamp";
    WrapMode[WrapMode["Mirror"] = WebGL2RenderingContext.MIRRORED_REPEAT] = "Mirror";
})(WrapMode = exports.WrapMode || (exports.WrapMode = {}));
class Texture extends asset_1.Asset {
}
exports.Texture = Texture;
var TextureResizing;
(function (TextureResizing) {
    TextureResizing[TextureResizing["Discard"] = 0] = "Discard";
    TextureResizing[TextureResizing["Stretch"] = 1] = "Stretch";
    TextureResizing[TextureResizing["Cover"] = 2] = "Cover";
    TextureResizing[TextureResizing["Contain"] = 3] = "Contain";
    TextureResizing[TextureResizing["KeepLower"] = 4] = "KeepLower";
    TextureResizing[TextureResizing["KeepHigher"] = 5] = "KeepHigher";
    TextureResizing[TextureResizing["Center"] = 6] = "Center";
})(TextureResizing = exports.TextureResizing || (exports.TextureResizing = {}));
class TextureBase extends asset_1.Asset {
    constructor(width, height, format = texture_format_1.TextureFormat.RGBA, filterMode = FilterMode.Linear, ctx = global_1.GlobalContext()) {
        super();
        this.autoMipmap = true;
        this.wrapMode = WrapMode.Repeat;
        this._glTex = null;
        this.initialized = false;
        this.created = false;
        this.name = `Texture_${this.assetID}`;
        this.ctx = ctx;
        this.format = format;
        this.width = width;
        this.height = height;
        this.filterMode = filterMode;
        this.tryInit(false);
    }
    get size() { return vec2_1.vec2(this.width, this.height); }
    glTex() {
        this.create();
        return this._glTex;
    }
    bind(unit) {
        this.create();
        const gl = this.ctx.gl;
        gl.activeTexture(gl.TEXTURE0 + unit);
        gl.bindTexture(gl.TEXTURE_2D, this._glTex);
        // gl.uniform1i(location, data.nextTextureUnit);
        // data.nextTextureUnit++;
    }
    unbind(unit) {
        this.create();
        const gl = this.ctx.gl;
        gl.activeTexture(gl.TEXTURE0 + unit);
        gl.bindTexture(gl.TEXTURE_2D, null);
    }
    destroy() {
        if (!this.initialized || this.destroyed)
            return;
        const gl = this.ctx.gl;
        gl.deleteTexture(this._glTex);
        super.destroy();
    }
    resize(width, height, textureContent = TextureResizing.Discard) {
        this.tryInit(true);
        const gl = this.ctx.gl;
        let oldTex = TextureBase.wrapGlTex(this._glTex, this.width, this.height, this.format, this.filterMode, this.ctx);
        let newTex = new RenderTexture(width, height, false, this.format, this.filterMode, this.ctx);
        newTex.wrapMode = this.wrapMode;
        newTex.autoMipmap = this.autoMipmap;
        newTex.create();
        newTex.updateParameters();
        const prevSize = this.size;
        this.width = width;
        this.height = height;
        switch (textureContent) {
            case TextureResizing.Discard:
                break;
            default:
                const [srcRect, dstrEect] = image_sizing_1.imageResize(prevSize, newTex.size, textureContent);
                this.ctx.renderer.blit(oldTex, newTex, this.ctx.assets.materials.blitCopy, srcRect, dstrEect);
                break;
        }
        if (this.autoMipmap)
            newTex.generateMipmap();
        this._glTex = newTex._glTex;
        gl.deleteTexture(oldTex._glTex);
    }
    generateMipmap() {
        this.create();
        const gl = this.ctx.gl;
        gl.bindTexture(gl.TEXTURE_2D, this._glTex);
        gl.generateMipmap(gl.TEXTURE_2D);
    }
    updateParameters() {
        this.create();
        const gl = this.ctx.gl;
        gl.bindTexture(gl.TEXTURE_2D, this._glTex);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, this.filterMode);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, this.filterMode);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, this.wrapMode);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, this.wrapMode);
    }
    /**
     * Create & allocate texture if not
     */
    create() {
        if (this.created)
            return;
        this.tryInit(true);
        const gl = this.ctx.gl;
        gl.bindTexture(gl.TEXTURE_2D, this._glTex);
        const [internalFormat, format, type] = texture_format_1.mapGLFormat(gl, this.format);
        gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, this.width, this.height, 0, format, type, null);
        this.created = true;
        this.updateParameters();
    }
    setData(pixels) {
        this.create();
        const gl = this.ctx.gl;
        gl.bindTexture(gl.TEXTURE_2D, this._glTex);
        flipTexture(this.ctx, this._glTex, pixels, this.width, this.height, this.format, this.filterMode, this.wrapMode, 0);
    }
    tryInit(required = false) {
        var _a;
        if (this.initialized)
            return true;
        const ctx = this.ctx || global_1.GlobalContext();
        if (!ctx) {
            if (required)
                throw new Error("Failed to initialize texture without a global GL context");
            return false;
        }
        const gl = ctx.gl;
        this._glTex = (_a = gl.createTexture()) !== null && _a !== void 0 ? _a : util_1.panic("Failed to create texture.");
        this.initialized = true;
        return true;
    }
    static wrapGlTex(glTex, width, height, format = texture_format_1.TextureFormat.RGBA, filterMode = FilterMode.Linear, ctx = global_1.GlobalContext()) {
        var texture = new TextureBase(width, height, format, filterMode, ctx);
        texture._glTex = glTex;
        texture.initialized = true;
        texture.created = true;
        return texture;
    }
}
class Texture2D extends TextureBase {
    constructor(width = 0, height = 0, format = texture_format_1.TextureFormat.RGBA, filterMode = FilterMode.Linear, ctx = global_1.GlobalContext()) {
        super(width, height, format, filterMode, ctx);
    }
    setData(pixels) {
        if (pixels.width !== undefined && pixels.height !== undefined) {
            pixels = pixels;
            this.width = pixels.width;
            this.height = pixels.height;
        }
        super.setData(pixels);
    }
    clone() {
        if (!this.created)
            this.create();
        let rt = new RenderTexture(this.width, this.height, false, this.format, this.filterMode, this.ctx);
        this.ctx.renderer.blit(this, rt);
        let tex = new Texture2D(this.width, this.height, this.format, this.filterMode, this.ctx);
        tex._glTex = rt.glTex();
        tex.initialized = true;
        tex.created = true;
        return tex;
    }
}
exports.Texture2D = Texture2D;
class DepthTexture extends TextureBase {
    constructor(width, height, ctx = global_1.GlobalContext()) {
        super(width, height, texture_format_1.TextureFormat.DEPTH_COMPONENT, FilterMode.Nearest, ctx);
    }
    create() {
        super.create();
    }
}
exports.DepthTexture = DepthTexture;
class RenderTexture extends TextureBase {
    constructor(width, height, depth = false, format = texture_format_1.TextureFormat.RGBA, filterMode = FilterMode.Linear, ctx = global_1.GlobalContext()) {
        super(width, height, format, filterMode, ctx);
        this.depthTexture = null;
        if (depth) {
            this.depthTexture = new DepthTexture(width, height, ctx);
        }
    }
    setData(pixels) {
        super.setData(pixels);
    }
    destroy() {
        var _a;
        if (!this.initialized || this.destroyed)
            return;
        (_a = this.depthTexture) === null || _a === void 0 ? void 0 : _a.destroy();
        super.destroy();
    }
}
exports.RenderTexture = RenderTexture;
function flipTexture(ctx, dst, src, width, height, texFormat, filterMode, wrapMode, mipmapLevel) {
    var _a, _b;
    const gl = ctx.gl;
    const renderer = ctx.renderer;
    const srcTex = (_a = gl.createTexture()) !== null && _a !== void 0 ? _a : util_1.panic("Failed to create texture.");
    const [internalFormat, format, type] = texture_format_1.mapGLFormat(gl, texFormat);
    gl.bindTexture(gl.TEXTURE_2D, srcTex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrapMode);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrapMode);
    if (src.width !== undefined && src.height !== undefined) {
        src = src;
        gl.texImage2D(gl.TEXTURE_2D, mipmapLevel, internalFormat, format, type, src);
    }
    else {
        src = src;
        gl.texImage2D(gl.TEXTURE_2D, mipmapLevel, internalFormat, width, height, 0, format, type, src);
    }
    const fbo = (_b = gl.createFramebuffer()) !== null && _b !== void 0 ? _b : util_1.panic("Failed to create frame buffer");
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, dst, 0);
    gl.viewport(0, 0, width, height);
    gl.drawBuffers([gl.COLOR_ATTACHMENT0]);
    const shader = ctx.assets.shaders.FlipTexture;
    shader.use();
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, srcTex);
    gl.uniform1i(shader.uniformLocation(shaders_1.BuiltinUniformNames.mainTex), 0);
    const mesh = ctx.assets.meshes.screenQuad;
    mesh.bind();
    gl.drawElements(gl.TRIANGLE_STRIP, mesh.indices.length, gl.UNSIGNED_INT, 0);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, null);
    gl.deleteFramebuffer(fbo);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.deleteTexture(srcTex);
}
//# sourceMappingURL=texture.js.map

/***/ }),

/***/ "../zogra-renderer/dist/index.js":
/*!***************************************!*\
  !*** ../zogra-renderer/dist/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// export * from "./core/mesh";
// export * from "./core/material";
// export * from "./core/builtin-asset";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utils = exports.GlobalContext = exports.GLContext = exports.plugins = void 0;
// export * from "./types/vec2";
// export * from "./types/vec3";
// export * from "./types/vec4";
// export * from "./types/color";
// export * from "./types/math";
// export * from "./types/mat4";
// export * from "./core/shader";
__exportStar(__webpack_require__(/*! ./types/types */ "../zogra-renderer/dist/types/types.js"), exports);
__exportStar(__webpack_require__(/*! ./core/core */ "../zogra-renderer/dist/core/core.js"), exports);
const pluginsExport = __importStar(__webpack_require__(/*! ./plugins/plugins */ "../zogra-renderer/dist/plugins/plugins.js"));
exports.plugins = pluginsExport;
__exportStar(__webpack_require__(/*! ./plugins/plugins */ "../zogra-renderer/dist/plugins/plugins.js"), exports);
__exportStar(__webpack_require__(/*! ./utils/public-utils */ "../zogra-renderer/dist/utils/public-utils.js"), exports);
var global_1 = __webpack_require__(/*! ./core/global */ "../zogra-renderer/dist/core/global.js");
Object.defineProperty(exports, "GLContext", { enumerable: true, get: function () { return global_1.GLContext; } });
Object.defineProperty(exports, "GlobalContext", { enumerable: true, get: function () { return global_1.GlobalContext; } });
const Utils = __importStar(__webpack_require__(/*! ./utils/index */ "../zogra-renderer/dist/utils/index.js"));
exports.Utils = Utils;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../zogra-renderer/dist/plugins/assets-importer/assets-importer.js":
/*!*************************************************************************!*\
  !*** ../zogra-renderer/dist/plugins/assets-importer/assets-importer.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetsImporter = void 0;
const global_1 = __webpack_require__(/*! ../../core/global */ "../zogra-renderer/dist/core/global.js");
__exportStar(__webpack_require__(/*! ./types */ "../zogra-renderer/dist/plugins/assets-importer/types.js"), exports);
// const importers = {
//     img: TextureImporter,
// };
class AssetsImporter {
    constructor(importers) {
        this.importers = importers;
    }
    async url(url, ctx = global_1.GlobalContext()) {
        const buffer = await fetch(url).then(r => r.arrayBuffer());
        return await this.buffer(buffer, ctx);
    }
    async blob(blob, ctx = global_1.GlobalContext()) {
        const buffer = await blob.arrayBuffer();
        return await this.buffer(buffer, ctx);
    }
    async buffer(buffer, ctx = global_1.GlobalContext()) {
        const bufImporters = {};
        for (const key in this.importers) {
            bufImporters[key] = (options) => this.importers[key].import(buffer, options, ctx);
        }
        return bufImporters;
    }
}
exports.AssetsImporter = AssetsImporter;
// type BufferImporter = { [key in keyof typeof importers]: (options: AssetImportOptions) => Promise<AssetsPack> };
// function createBufferImporter(buffer: ArrayBuffer, ctx = GlobalContext()): BufferImporter
// {
//     const wrapper = {} as any;
//     for (const importer in importers)
//     {
//         wrapper[importer] = (options?: AssetImportOptions) => importers[importer as keyof typeof importers].import(buffer, options, ctx);
//     }
//     return wrapper;
// }
// export const AssetsImporter = {
//     importers: importers,
//     async url(url: string, ctx = GlobalContext())
//     {
//         const buffer = await fetch(url).then(r => r.arrayBuffer());
//         return createBufferImporter(buffer, ctx);
//     },
//     async buffer(buffer: ArrayBuffer, ctx = GlobalContext())
//     {
//         return createBufferImporter(buffer, ctx);
//     }
// };
//# sourceMappingURL=assets-importer.js.map

/***/ }),

/***/ "../zogra-renderer/dist/plugins/assets-importer/types.js":
/*!***************************************************************!*\
  !*** ../zogra-renderer/dist/plugins/assets-importer/types.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetsPack = void 0;
class AssetsPack {
    constructor() {
        this.mainAsset = null;
        this.assets = new Map();
    }
    add(name, asset) {
        asset.name = name;
        this.assets.set(name, asset);
    }
    setMain(asset) {
        this.mainAsset = asset;
    }
    get(Type) {
        for (const [name, asset] of this.assets) {
            if (asset instanceof Type)
                return asset;
        }
        return null;
    }
    getAll(Type) {
        return Array.from(this.assets.values()).filter(asset => asset instanceof Type);
    }
}
exports.AssetsPack = AssetsPack;
//# sourceMappingURL=types.js.map

/***/ }),

/***/ "../zogra-renderer/dist/plugins/plugins.js":
/*!*************************************************!*\
  !*** ../zogra-renderer/dist/plugins/plugins.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(__webpack_require__(/*! ./assets-importer/assets-importer */ "../zogra-renderer/dist/plugins/assets-importer/assets-importer.js"), exports);
__exportStar(__webpack_require__(/*! ./texture-importer/texture-importer */ "../zogra-renderer/dist/plugins/texture-importer/texture-importer.js"), exports);
//# sourceMappingURL=plugins.js.map

/***/ }),

/***/ "../zogra-renderer/dist/plugins/texture-importer/texture-importer.js":
/*!***************************************************************************!*\
  !*** ../zogra-renderer/dist/plugins/texture-importer/texture-importer.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.TextureImporter = void 0;
const core_1 = __webpack_require__(/*! ../../core/core */ "../zogra-renderer/dist/core/core.js");
const global_1 = __webpack_require__(/*! ../../core/global */ "../zogra-renderer/dist/core/global.js");
const texture_format_1 = __webpack_require__(/*! ../../core/texture-format */ "../zogra-renderer/dist/core/texture-format.js");
const assets_importer_1 = __webpack_require__(/*! ../assets-importer/assets-importer */ "../zogra-renderer/dist/plugins/assets-importer/assets-importer.js");
const Texture2DImporter = {
    import(buffer, options, ctx = global_1.GlobalContext()) {
        return new Promise((resolve, reject) => {
            const blob = new Blob([buffer]);
            const img = new Image();
            img.src = URL.createObjectURL(blob);
            const complete = () => {
                const defulatOptions = {
                    width: img.width,
                    height: img.height,
                    filterMode: core_1.FilterMode.Linear,
                    format: texture_format_1.TextureFormat.RGBA,
                    mipmap: true,
                    wrapMpde: core_1.WrapMode.Repeat
                };
                const opt = Object.assign(Object.assign({}, defulatOptions), options);
                const tex = new core_1.Texture2D(opt.width, opt.height, opt.format, opt.filterMode, ctx);
                tex.autoMipmap = opt.mipmap;
                tex.wrapMode = opt.wrapMpde;
                tex.updateParameters();
                tex.setData(img);
                resolve(tex);
            };
            if (img.complete)
                complete();
            else
                img.onload = complete;
        });
    }
};
const importers = {
    tex2d: Texture2DImporter,
};
exports.TextureImporter = new assets_importer_1.AssetsImporter(importers);
//# sourceMappingURL=texture-importer.js.map

/***/ }),

/***/ "../zogra-renderer/dist/types/color.js":
/*!*********************************************!*\
  !*** ../zogra-renderer/dist/types/color.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.hsl = exports.rgb = exports.rgba = exports.Color = void 0;
const vec4_1 = __webpack_require__(/*! ./vec4 */ "../zogra-renderer/dist/types/vec4.js");
class Color extends vec4_1.Vector4 {
    get r() { return this[0]; }
    set r(r) { this[0] = r; }
    get g() { return this[1]; }
    set g(g) { this[1] = g; }
    get b() { return this[2]; }
    set b(b) { this[2] = b; }
    get a() { return this[3]; }
    set a(a) { this[3] = a; }
    constructor(r, g, b, a = 1) {
        super(r, g, b, a);
    }
    static get white() { return new Color(1, 1, 1); }
    static get transparent() { return new Color(1, 1, 1, 0); }
    static get black() { return new Color(0, 0, 0); }
    static get red() { return new Color(1, 0, 0); }
    static get green() { return new Color(0, 1, 0); }
    static get blue() { return new Color(0, 0, 1); }
    static get cyan() { return new Color(0, 1, 1); }
    static get yellow() { return new Color(1, 1, 0); }
    static get magenta() { return new Color(1, 0, 1); }
    static get gray() { return new Color(.5, .5, .5); }
    transparent() {
        return new Color(this.r, this.g, this.b, 0);
    }
    /**
     *
     * @param h hue in [0..360]
     * @param s saturation in [0..1]
     * @param l lightness in [0..1]
     * @returns
     */
    setHSL(h, s, l) {
        h = h < 0 ? h + 360 : h;
        const chroma = (1 - Math.abs(2 * l - 1)) * s;
        if (isNaN(h)) {
            this.r = this.g = this.b = 0;
            return this;
        }
        h = h / 60;
        const x = chroma * (1 - Math.abs(h % 2 - 1));
        let color = [0, 0, 0];
        if (0 <= h && h <= 1)
            color = [chroma, x, 0];
        else if (h <= 2)
            color = [x, chroma, 0];
        else if (h <= 3)
            color = [0, chroma, x];
        else if (h <= 4)
            color = [0, x, chroma];
        else if (h <= 5)
            color = [x, 0, chroma];
        else if (h <= 6)
            color = [chroma, 0, x];
        let m = l - chroma / 2;
        this.r = color[0] + m;
        this.g = color[1] + m;
        this.b = color[2] + m;
        return this;
    }
    get hue() {
        const R = this.r;
        const G = this.g;
        const B = this.b;
        const max = Math.max(R, G, B);
        const min = Math.min(R, G, B);
        let h = 0;
        if (max === min)
            h = 0;
        else if (max === R)
            h = 60 * (0 + (G - B) / (max - min));
        else if (max === G)
            h = 60 * (2 + (B - R) / (max - min));
        else if (max === B)
            h = 60 * (4 + (R - G) / (max - min));
        return h < 0 ? h + 360 : h;
    }
    get saturation() {
        const max = Math.max(this.r, this.g, this.b);
        const min = Math.min(this.r, this.g, this.b);
        if (max === 0)
            return 0;
        else if (min == 1)
            return 0;
        return (max - min) / (1 - Math.abs(max + min - 1));
    }
    get lightness() {
        const max = Math.max(this.r, this.g, this.b);
        const min = Math.min(this.r, this.g, this.b);
        return (max + min) / 2;
    }
    toHSL() {
        return [this.hue, this.saturation, this.lightness];
    }
    /**
     *
     * @param h hue in [0..360]
     * @param s saturation in [0..1]
     * @param l lightness in [0..1]
     * @param alpha
     * @returns
     */
    static fromHSL(h, s, l, alpha = 1) {
        return new Color(0, 0, 0, alpha).setHSL(h, s, l);
    }
    static fromString(str, alpha) {
        str = str.replace(new RegExp(/\s/g), "");
        var reg = new RegExp("#[0-9a-fA-F]{6}");
        if (reg.test(str)) {
            str = str.replace("#", "");
            var strR = str.charAt(0) + str.charAt(1);
            var strG = str.charAt(2) + str.charAt(3);
            var strB = str.charAt(4) + str.charAt(5);
            var r = parseInt(strR, 16);
            var g = parseInt(strG, 16);
            var b = parseInt(strB, 16);
            return new Color(r / 255, g / 255, b / 255, alpha || 1);
        }
        reg = new RegExp("rgb\\(([0-9]+(\\.[0-9]+){0,1}),([0-9]+(\\.[0-9]+){0,1}),([0-9]+(\\.[0-9]+){0,1})\\)");
        if (reg.test(str)) {
            var colorArray = str.replace("rgb(", "").replace(")", "").split(",");
            var r = parseInt(colorArray[0]);
            var g = parseInt(colorArray[1]);
            var b = parseInt(colorArray[2]);
            var a = alpha || 1;
            return new Color(r / 255, g / 255, b / 255, a / 255);
        }
        reg = new RegExp("rgba\\(([0-9]+(\\.[0-9]+){0,1}),([0-9]+(\\.[0-9]+){0,1}),([0-9]+(\\.[0-9]+){0,1}),([0-9]+(\\.[0-9]+){0,1})\\)");
        if (reg.test(str)) {
            var colorArray = str.replace("rgba(", "").replace(")", "").split(",");
            var r = parseInt(colorArray[0]);
            var g = parseInt(colorArray[1]);
            var b = parseInt(colorArray[2]);
            var a = alpha || parseFloat(colorArray[3]);
            return new Color(r / 255, g / 255, b / 255, a);
        }
        throw new Error(`Invalid color string '${str}'`);
    }
}
exports.Color = Color;
const rgba = (r, g, b, a = 1) => new Color(r, g, b, a);
exports.rgba = rgba;
const rgb = (r, g, b) => new Color(r, g, b, 1);
exports.rgb = rgb;
exports.hsl = Color.fromHSL;
//# sourceMappingURL=color.js.map

/***/ }),

/***/ "../zogra-renderer/dist/types/mat4.js":
/*!********************************************!*\
  !*** ../zogra-renderer/dist/types/mat4.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.mat4 = exports.Matrix4x4 = void 0;
const gl_matrix_1 = __webpack_require__(/*! gl-matrix */ "../zogra-renderer/node_modules/gl-matrix/esm/index.js");
const quat_1 = __webpack_require__(/*! ./quat */ "../zogra-renderer/dist/types/quat.js");
const vec3_1 = __webpack_require__(/*! ./vec3 */ "../zogra-renderer/dist/types/vec3.js");
const vec4_1 = __webpack_require__(/*! ./vec4 */ "../zogra-renderer/dist/types/vec4.js");
const utils_1 = __webpack_require__(/*! ./utils */ "../zogra-renderer/dist/types/utils.js");
const Mat4Constructor = Array;
const __vec4_temp = vec4_1.vec4.zero();
class Matrix4x4 extends Mat4Constructor {
    constructor(p_0 = 0, p_1 = 0, p_2 = 0, p_3 = 0, p_4 = 0, p_5 = 0, p_6 = 0, p_7 = 0, p_8 = 0, p_9 = 0, p_10 = 0, p_11 = 0, p_12 = 0, p_13 = 0, p_14 = 0, p_15 = 0) {
        super(p_0, p_1, p_2, p_3, p_4, p_5, p_6, p_7, p_8, p_9, p_10, p_11, p_12, p_13, p_14, p_15);
    }
    static create() {
        return new Matrix4x4();
    }
    asMut() { return this; }
    set(m) {
        return gl_matrix_1.mat4.set(this, ...m);
    }
    fill(n) {
        return mat4.fill(this, n);
    }
    clone(out = mat4.create()) {
        return out.set(this);
    }
    equals(other) {
        return mat4.equal(this, other);
    }
}
exports.Matrix4x4 = Matrix4x4;
function mat4(p_0 = 0, p_1 = 0, p_2 = 0, p_3 = 0, p_4 = 0, p_5 = 0, p_6 = 0, p_7 = 0, p_8 = 0, p_9 = 0, p_10 = 0, p_11 = 0, p_12 = 0, p_13 = 0, p_14 = 0, p_15 = 0) {
    return new Matrix4x4(p_0, p_1, p_2, p_3, p_4, p_5, p_6, p_7, p_8, p_9, p_10, p_11, p_12, p_13, p_14, p_15);
}
exports.mat4 = mat4;
mat4.create = Matrix4x4.create;
mat4.identity = utils_1.wrapGlMatrix(gl_matrix_1.mat4.identity, 0, mat4.create);
mat4.rts = utils_1.wrapGlMatrix(gl_matrix_1.mat4.fromRotationTranslationScale, 3, mat4.create);
mat4.translate = utils_1.wrapGlMatrix(gl_matrix_1.mat4.translate, 2, Matrix4x4.create);
mat4.invert = utils_1.wrapGlMatrix(gl_matrix_1.mat4.invert, 1, Matrix4x4.create);
mat4.getTranslation = utils_1.wrapGlMatrix(gl_matrix_1.mat4.getTranslation, 1, vec3_1.vec3.zero);
mat4.getRotation = utils_1.wrapGlMatrix(gl_matrix_1.mat4.getRotation, 1, quat_1.quat.create);
mat4.getScaling = utils_1.wrapGlMatrix(gl_matrix_1.mat4.getScaling, 1, vec3_1.vec3.zero);
mat4.mulVec4 = utils_1.wrapGlMatrix((out, m, v) => gl_matrix_1.vec4.transformMat4(out, v, m), 2, vec4_1.vec4.zero);
mat4.perspective = utils_1.wrapGlMatrix(gl_matrix_1.mat4.perspective, 4, Matrix4x4.create);
mat4.transpose = utils_1.wrapGlMatrix(gl_matrix_1.mat4.transpose, 1, Matrix4x4.create);
mat4.rotate = utils_1.wrapGlMatrix((out, m, axis, rad) => gl_matrix_1.mat4.rotate(out, m, rad, axis), 3, Matrix4x4.create);
mat4.scale = utils_1.wrapGlMatrix(gl_matrix_1.mat4.scale, 2, Matrix4x4.create);
mat4.fromTranslation = utils_1.wrapGlMatrix(gl_matrix_1.mat4.fromTranslation, 1, Matrix4x4.create);
mat4.fromRotation = utils_1.wrapGlMatrix(gl_matrix_1.mat4.fromRotation, 1, Matrix4x4.create);
mat4.fromScaling = utils_1.wrapGlMatrix(gl_matrix_1.mat4.fromScaling, 1, Matrix4x4.create);
mat4.mul = utils_1.wrapGlMatrix(gl_matrix_1.mat4.mul, 2, Matrix4x4.create);
mat4.add = utils_1.wrapGlMatrix(gl_matrix_1.mat4.add, 2, mat4.create);
mat4.sub = utils_1.wrapGlMatrix(gl_matrix_1.mat4.sub, 2, mat4.create);
mat4.plus = mat4.add;
mat4.minus = mat4.sub;
mat4.mulVector = utils_1.wrapGlMatrix((out, m, v) => {
    __vec4_temp[0] = v[0];
    __vec4_temp[1] = v[1];
    __vec4_temp[2] = v[2];
    __vec4_temp[3] = 0;
    gl_matrix_1.vec4.transformMat4(__vec4_temp, __vec4_temp, m);
    out[0] = __vec4_temp[0];
    out[1] = __vec4_temp[1];
    out[2] = __vec4_temp[2];
    return out;
}, 2, vec3_1.vec3.zero);
mat4.mulPoint = utils_1.wrapGlMatrix((out, m, v) => {
    __vec4_temp[0] = v[0];
    __vec4_temp[1] = v[1];
    __vec4_temp[2] = v[2];
    __vec4_temp[3] = 1;
    gl_matrix_1.vec4.transformMat4(__vec4_temp, __vec4_temp, m);
    out[0] = __vec4_temp[0];
    out[1] = __vec4_temp[1];
    out[2] = __vec4_temp[2];
    return out;
}, 2, vec3_1.vec3.zero);
function simpleOrthogonal(height, aspect, near, far) {
    const out = mat4.create();
    gl_matrix_1.mat4.ortho(out, -aspect * height, aspect * height, -height, height, near, far);
    return out;
}
function orthogonal(...args) {
    if (args.length === 4)
        return simpleOrthogonal(...args);
    const out = mat4.create();
    gl_matrix_1.mat4.ortho(...[out, ...args]);
    return out;
}
mat4.ortho = orthogonal;
// (height: number, aspect: number, near: number, far: number) =>
// {
//     const out = glMat4.create();
//     glMat4.ortho(out, -aspect * height, aspect * height, -height, height, near, far);
//     return out;
//     out[0] = 2 / (aspect * height);
//     out[1] = 0;
//     out[2] = 0;
//     out[3] = 0;
//     out[4] = 0;
//     out[5] = 2 / height;
//     out[6] = 0;
//     out[7] = 0;
//     out[8] = 0;
//     out[9] = 0;
//     out[10] = -2 / (far - near);
//     out[11] = -(far + near) / (far - near);
//     out[12] = 0;
//     out[13] = 0;
//     out[14] = 0;
//     out[15] = 1;
//     return out;
// }
mat4.equal = (a, b) => {
    if (a === undefined || b === undefined)
        return false;
    if (!(a instanceof Array || a instanceof Float32Array) || !(b instanceof Array || b instanceof Float32Array))
        return false;
    return gl_matrix_1.mat4.exactEquals(a, b);
};
mat4.set = utils_1.wrapGlMatrix(gl_matrix_1.mat4.set, 1, mat4.create);
mat4.fill = utils_1.wrapGlMatrix((out, n) => {
    out[0]
        = out[1]
            = out[2]
                = out[3]
                    = out[4]
                        = out[5]
                            = out[6]
                                = out[7]
                                    = out[8]
                                        = out[9]
                                            = out[10]
                                                = out[11]
                                                    = out[12]
                                                        = out[13]
                                                            = out[14]
                                                                = out[15] = n;
    return out;
}, 1, mat4.create);
// export const mat4 = Matrix4x4;
//# sourceMappingURL=mat4.js.map

/***/ }),

/***/ "../zogra-renderer/dist/types/math.js":
/*!********************************************!*\
  !*** ../zogra-renderer/dist/types/math.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Rad2Deg = exports.Deg2Rad = exports.boxRaycast = exports.distance = exports.cross = exports.dot = exports.div = exports.mul = exports.minus = exports.plus = void 0;
const vec3_1 = __webpack_require__(/*! ./vec3 */ "../zogra-renderer/dist/types/vec3.js");
const vec4_1 = __webpack_require__(/*! ./vec4 */ "../zogra-renderer/dist/types/vec4.js");
const vec2_1 = __webpack_require__(/*! ./vec2 */ "../zogra-renderer/dist/types/vec2.js");
const mat4_1 = __webpack_require__(/*! ./mat4 */ "../zogra-renderer/dist/types/mat4.js");
Number.prototype.__to = function (type) {
    switch (type) {
        case vec4_1.Vector4:
            return vec4_1.vec4(this.valueOf(), this.valueOf(), this.valueOf(), this.valueOf());
        case vec3_1.Vector3:
            return vec3_1.vec3(this.valueOf(), this.valueOf(), this.valueOf());
        case vec2_1.Vector2:
            return vec2_1.vec2(this.valueOf(), this.valueOf());
    }
    return this.valueOf();
};
function arithOrder(a, b) {
    if (typeof (a) === "number")
        return [b, a, true];
    else if (typeof (b) === "number")
        return [a, b, false];
    return (b.length > a.length ? [b, a, true] : [a, b, false]);
}
function allocateOutput(a, b) {
    let length = Math.max(a.length || 0, b.length || 0);
    switch (length) {
        case 2:
            return typeof (a) === "number" ? vec2_1.vec2.fill(a) : vec2_1.vec2.set(a);
        case 3:
            return typeof (a) === "number" ? vec2_1.vec2.fill(a) : vec3_1.vec3.set(a);
        case 4:
            return typeof (a) === "number" ? vec2_1.vec2.fill(a) : vec4_1.vec4.set(a);
        case 16:
            return typeof (a) === "number" ? vec2_1.vec2.fill(a) : mat4_1.mat4.set(a);
    }
    console.warn(`Unsupported vector length '${length}'`);
    return new Array();
}
function plus(a, b, out) {
    if (typeof (a) === "number" && typeof (b) === "number")
        return (a + b);
    let output = (out || allocateOutput(a, b));
    switch (output.length) {
        case 2:
            return vec2_1.vec2.plus(output, output, b);
        case 3:
            return vec3_1.vec3.plus(output, output, b);
        case 4:
            return vec4_1.vec4.plus(output, output, b);
    }
    console.warn(`Unsupported vector length '${output.length}'`);
    return vec4_1.vec4.plus(output, output, b);
}
exports.plus = plus;
function minus(a, b, out) {
    if (typeof (a) === "number" && typeof (b) === "number")
        return (a + b);
    let output = (out || allocateOutput(a, b));
    switch (output.length) {
        case 2:
            return vec2_1.vec2.minus(output, output, b);
        case 3:
            return vec3_1.vec3.minus(output, output, b);
        case 4:
            return vec4_1.vec4.minus(output, output, b);
    }
    console.warn(`Unsupported vector length '${output.length}'`);
    return vec4_1.vec4.minus(output, output, b);
}
exports.minus = minus;
function mul(a, b, out) {
    if (typeof (a) === "number" && typeof (b) === "number")
        return (a + b);
    let output = (out || allocateOutput(a, b));
    switch (output.length) {
        case 2:
            return vec2_1.vec2.mul(output, output, b);
        case 3:
            return vec3_1.vec3.mul(output, output, b);
        case 4:
            return vec4_1.vec4.mul(output, output, b);
    }
    console.warn(`Unsupported vector length '${output.length}'`);
    return vec4_1.vec4.mul(output, output, b);
}
exports.mul = mul;
function div(a, b, out) {
    if (typeof (a) === "number" && typeof (b) === "number")
        return (a + b);
    let output = (out || allocateOutput(a, b));
    switch (output.length) {
        case 2:
            return vec2_1.vec2.div(output, output, b);
        case 3:
            return vec3_1.vec3.div(output, output, b);
        case 4:
            return vec4_1.vec4.div(output, output, b);
    }
    console.warn(`Unsupported vector length '${output.length}'`);
    return vec4_1.vec4.div(output, output, b);
}
exports.div = div;
function dot(a, b) {
    switch (a.length) {
        case 2:
            return a[0] * b[0] + a[1] * b[1];
        case 3:
            return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
        case 4:
            return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
    }
}
exports.dot = dot;
function cross(a, b, out = vec3_1.vec3.zero()) {
    out[0] = a[1] * b[2] - a[2] * b[1];
    out[1] = a[2] * b[0] - a[0] * b[2];
    out[2] = a[0] * b[1] - a[1] * b[0];
    return out;
}
exports.cross = cross;
function distance(a, b) {
    return Math.hypot((b[0] - a[0]) || 0, (b[1] - a[1]) || 0, (b[2] - a[2]) || 0, (b[3] - a[3]) || 0);
}
exports.distance = distance;
function boxRaycast(box, center, direction) {
    direction = direction.normalized;
    if (direction.x == 0 && direction.y == 0)
        return [false, 0, vec2_1.vec2.zero()];
    let tMin = vec2_1.vec2.zero();
    let tMax = vec2_1.vec2.zero();
    if (direction.x == 0) {
        tMin.y = (box.yMin - center.y) / direction.y;
        tMax.y = (box.yMax - center.y) / direction.y;
        tMin.x = tMax.x = Number.NEGATIVE_INFINITY;
        if (box.xMin <= center.x && center.x <= box.xMax) {
            if (tMin.y < tMax.y)
                return [true, tMin.y, vec2_1.vec2(0, -1)];
            return [true, tMax.y, vec2_1.vec2(0, 1)];
        }
        return [false, 0, vec2_1.vec2.zero()];
    }
    if (direction.y == 0) {
        tMin.x = (box.xMin - center.x) / direction.x;
        tMax.x = (box.xMax - center.x) / direction.x;
        tMin.y = tMax.y = Number.NEGATIVE_INFINITY;
        if (box.yMin <= center.y && center.y <= box.yMax) {
            if (tMin.x < tMax.x)
                return [true, tMin.x, vec2_1.vec2(-1, 0)];
            return [true, tMax.x, vec2_1.vec2(1, 0)];
        }
        return [false, 0, vec2_1.vec2.zero()];
    }
    tMin = minus(box.min, center).div(direction); // distance to box min lines (X and Y)
    tMax = minus(box.max, center).div(direction); // distance to box max lines (X and Y)
    var minXT = tMin.x; // min distance to vertical line
    var maxXT = tMax.x; // max distance to vertical line
    var minXNormal = vec2_1.vec2(-1, 0); // Vector2.left; // normal of the vertical line which has minimal distance to center
    var minYT = tMin.y;
    var maxYT = tMax.y;
    var minYNormal = vec2_1.vec2(0, -1); // Vector2.down;
    if (tMin.x > tMax.x) {
        minXT = tMax.x;
        maxXT = tMin.x;
        minXNormal = vec2_1.vec2(1, 0); // Vector2.right;
    }
    if (tMin.y > tMax.y) {
        minYT = tMax.y;
        maxYT = tMin.y;
        minYNormal = vec2_1.vec2(0, 1); // Vector2.up;
    }
    if (minYT > maxXT || minXT > maxYT) {
        return [false, 0, vec2_1.vec2.zero()];
    }
    else if (minXT > minYT) {
        return [true, minXT, minXNormal];
    }
    return [true, minYT, minYNormal];
}
exports.boxRaycast = boxRaycast;
exports.Deg2Rad = Math.PI / 180;
exports.Rad2Deg = 180 / Math.PI;
//# sourceMappingURL=math.js.map

/***/ }),

/***/ "../zogra-renderer/dist/types/quat.js":
/*!********************************************!*\
  !*** ../zogra-renderer/dist/types/quat.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.quat = exports.Quaternion = void 0;
const gl_matrix_1 = __webpack_require__(/*! gl-matrix */ "../zogra-renderer/node_modules/gl-matrix/esm/index.js");
const vec3_1 = __webpack_require__(/*! ./vec3 */ "../zogra-renderer/dist/types/vec3.js");
const math_1 = __webpack_require__(/*! ./math */ "../zogra-renderer/dist/types/math.js");
const utils_1 = __webpack_require__(/*! ./utils */ "../zogra-renderer/dist/types/utils.js");
const V4Constructor = Array;
class Quaternion extends V4Constructor {
    static create() {
        return new Quaternion(0, 0, 0, 0);
    }
    asMut() { return this; }
    equals(v) {
        if (!v || !(v instanceof Array))
            return false;
        return gl_matrix_1.quat.exactEquals(this, v);
    }
    clone(out = Quaternion.create()) {
        return out.set(this);
    }
    set(value) {
        this[0] = value[0] || 0;
        this[1] = value[1] || 0;
        this[2] = value[2] || 0;
        this[3] = value[3] || 0;
        return this;
    }
    fill(value) {
        this[0] = value;
        this[1] = value;
        this[2] = value;
        this[3] = value;
        return this;
    }
}
exports.Quaternion = Quaternion;
function quat(x = 0, y = x, z = x, w = x) {
    return new Quaternion(x, y, z, w);
}
exports.quat = quat;
quat.create = () => {
    return quat(0);
};
quat.identity = utils_1.wrapGlMatrix(gl_matrix_1.quat.identity, 0, quat.create);
quat.axisAngle = utils_1.wrapGlMatrix((out, axis, rad) => gl_matrix_1.quat.setAxisAngle(out, axis, rad), 2, quat.create);
quat.mul = utils_1.wrapGlMatrix(gl_matrix_1.quat.mul, 2, quat.create);
quat.invert = utils_1.wrapGlMatrix(gl_matrix_1.quat.invert, 1, quat.create);
quat.normalize = utils_1.wrapGlMatrix(gl_matrix_1.quat.normalize, 1, quat.create);
quat.euler = utils_1.wrapGlMatrix((out, q) => {
    out[0] = Math.atan2(2 * (q[3] * q[0] + q[1] * q[2]), (1 - 2 * (q[0] ** 2 + q[1] ** 2))) * math_1.Rad2Deg;
    out[1] = Math.asin(2 * (q[3] * q[1] - q[2] * q[0])) * math_1.Rad2Deg;
    out[2] = Math.atan2(2 * (q[3] * q[2] + q[0] * q[1]), 1 - 2 * (q[1] ** 2, q[2] ** 2)) * math_1.Rad2Deg;
    return out;
}, 1, vec3_1.vec3.zero);
quat.fromEuler = utils_1.wrapGlMatrix((out, angles) => gl_matrix_1.quat.fromEuler(out, angles[0], angles[1], angles[2]), 1, quat.create);
quat.rotate = utils_1.wrapGlMatrix((out, q, v) => gl_matrix_1.vec3.transformQuat(out, v, q), 2, vec3_1.vec3.zero);
quat.equals = (a, b) => {
    return gl_matrix_1.quat.exactEquals(a, b);
};
//# sourceMappingURL=quat.js.map

/***/ }),

/***/ "../zogra-renderer/dist/types/ray.js":
/*!*******************************************!*\
  !*** ../zogra-renderer/dist/types/ray.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ray = void 0;
function ray(origin, direction) {
    return { origin, direction: direction.normalized };
}
exports.ray = ray;
//# sourceMappingURL=ray.js.map

/***/ }),

/***/ "../zogra-renderer/dist/types/rect.js":
/*!********************************************!*\
  !*** ../zogra-renderer/dist/types/rect.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Rect = void 0;
const math_1 = __webpack_require__(/*! ./math */ "../zogra-renderer/dist/types/math.js");
const vec2_1 = __webpack_require__(/*! ./vec2 */ "../zogra-renderer/dist/types/vec2.js");
class Rect {
    constructor(min, size) {
        this.min = min;
        this.max = math_1.plus(min, size);
    }
    get xMin() { return this.min.x; }
    get yMin() { return this.min.y; }
    get xMax() { return this.max.x; }
    get yMax() { return this.max.y; }
    get size() { return math_1.minus(this.max, this.min); }
    get center() { return math_1.plus(this.min, this.max).mul(vec2_1.vec2(.5)); }
    shrink(thickness) {
        let min = math_1.plus(this.min, vec2_1.vec2(thickness));
        let max = math_1.minus(this.max, vec2_1.vec2(thickness));
        if (min.x > max.x)
            min.x = max.x = (min.x + max.x) / 2;
        if (min.y > max.y)
            min.y = max.y = (min.y + max.y) / 2;
        return new Rect(min, max.minus(min));
    }
    expand(thickness) {
        return new Rect(math_1.minus(this.min, vec2_1.vec2(thickness)), math_1.plus(this.size, vec2_1.vec2(2 * thickness)));
    }
    static box01() {
        return new Rect(vec2_1.vec2.zero(), vec2_1.vec2.one());
    }
}
exports.Rect = Rect;
//# sourceMappingURL=rect.js.map

/***/ }),

/***/ "../zogra-renderer/dist/types/types.js":
/*!*********************************************!*\
  !*** ../zogra-renderer/dist/types/types.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MathUtils = void 0;
const gl_matrix_1 = __webpack_require__(/*! gl-matrix */ "../zogra-renderer/node_modules/gl-matrix/esm/index.js");
gl_matrix_1.glMatrix.setMatrixArrayType(Array);
__exportStar(__webpack_require__(/*! ./vec2 */ "../zogra-renderer/dist/types/vec2.js"), exports);
__exportStar(__webpack_require__(/*! ./vec3 */ "../zogra-renderer/dist/types/vec3.js"), exports);
__exportStar(__webpack_require__(/*! ./vec4 */ "../zogra-renderer/dist/types/vec4.js"), exports);
__exportStar(__webpack_require__(/*! ./color */ "../zogra-renderer/dist/types/color.js"), exports);
__exportStar(__webpack_require__(/*! ./math */ "../zogra-renderer/dist/types/math.js"), exports);
__exportStar(__webpack_require__(/*! ./mat4 */ "../zogra-renderer/dist/types/mat4.js"), exports);
__exportStar(__webpack_require__(/*! ./quat */ "../zogra-renderer/dist/types/quat.js"), exports);
__exportStar(__webpack_require__(/*! ./ray */ "../zogra-renderer/dist/types/ray.js"), exports);
__exportStar(__webpack_require__(/*! ./rect */ "../zogra-renderer/dist/types/rect.js"), exports);
var utils_1 = __webpack_require__(/*! ./utils */ "../zogra-renderer/dist/types/utils.js");
Object.defineProperty(exports, "MathUtils", { enumerable: true, get: function () { return utils_1.MathUtils; } });
//# sourceMappingURL=types.js.map

/***/ }),

/***/ "../zogra-renderer/dist/types/utils.js":
/*!*********************************************!*\
  !*** ../zogra-renderer/dist/types/utils.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.MathUtils = exports.wrapGlMatrix = void 0;
function wrapGlMatrix(func, argCount, allocator) {
    return ((...args) => {
        if (args.length <= argCount) {
            const out = allocator();
            return func(out, ...args);
        }
        else {
            const [out, ...rest] = args;
            return func(out, ...rest);
        }
    });
}
exports.wrapGlMatrix = wrapGlMatrix;
exports.MathUtils = {
    lerp(a, b, t) {
        return (b - a) * t + a;
    },
};
//# sourceMappingURL=utils.js.map

/***/ }),

/***/ "../zogra-renderer/dist/types/vec2.js":
/*!********************************************!*\
  !*** ../zogra-renderer/dist/types/vec2.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.vec2 = exports.Vector2 = void 0;
const vec4_1 = __webpack_require__(/*! ./vec4 */ "../zogra-renderer/dist/types/vec4.js");
const vec3_1 = __webpack_require__(/*! ./vec3 */ "../zogra-renderer/dist/types/vec3.js");
const utils_1 = __webpack_require__(/*! ./utils */ "../zogra-renderer/dist/types/utils.js");
const gl_matrix_1 = __webpack_require__(/*! gl-matrix */ "../zogra-renderer/node_modules/gl-matrix/esm/index.js");
const V2Constructor = Array;
class Vector2 extends V2Constructor {
    get x() { return this[0]; }
    set x(x) { this[0] = x; }
    get y() { return this[1]; }
    set y(y) { this[1] = y; }
    get magnitude() {
        return Math.hypot(...this);
    }
    get normalized() {
        const m = this.magnitude;
        return m == 0 ? vec2.zero() : this.clone().div(vec2(m, m));
    }
    get negative() {
        return this.clone().negate();
    }
    get inversed() {
        return this.clone().inverse();
    }
    get isZero() {
        return this.x === 0 && this.y === 0;
    }
    constructor(x, y) {
        super(x, y);
    }
    static zero() {
        return new Vector2(0, 0);
    }
    static one() {
        return new Vector2(1, 1);
    }
    static up() {
        return new Vector2(0, 1);
    }
    static down() {
        return new Vector2(0, -1);
    }
    static left() { return new Vector2(-1, 0); }
    static right() { return new Vector2(1, 0); }
    static distance(u, v) {
        return Math.sqrt((u.x - v.x) * (u.x - v.x) + (u.y - v.y) * (u.y - v.y));
    }
    static distanceSquared(u, v) {
        return (u.x - v.x) * (u.x - v.x) + (u.y - v.y) * (u.y - v.y);
    }
    static math(func) {
        return (...args) => {
            return vec2(func(...args.map(v => v.x)), func(...args.map(v => v.y)));
        };
    }
    asMut() { return this; }
    plus(v) {
        return vec2.plus(this, this, v);
    }
    minus(v) {
        return vec2.minus(this, this, v);
    }
    mul(v) {
        return vec2.mul(this, this, v);
    }
    div(v) {
        return vec2.div(this, this, v);
    }
    dot(v) {
        return this[0] * v[0]
            + this[1] * v[1];
    }
    normalize() {
        return vec2.normalize(this, this);
    }
    inverse() {
        this[0] = 1 / this[0];
        this[1] = 1 / this[1];
        return this;
    }
    negate() {
        this[0] = -this[0];
        this[1] = -this[1];
        return this;
    }
    equals(v) {
        if (v === undefined)
            return false;
        return v[0] === this[0] && v[1] === this[1];
    }
    clone(out = vec2.zero()) {
        return out.set(this);
    }
    set(v) {
        this[0] = v[0] || 0;
        this[1] = v[1] || 0;
        return this;
    }
    fill(n) {
        this[0] = this[1] = n;
        return this;
    }
    toVec3(z = 0) {
        return vec3_1.vec3(this[0], this[1], z);
    }
    __to(type) {
        switch (type) {
            case vec4_1.Vector4:
                return vec4_1.vec4(this[0], this[1], 0, 0);
            case vec3_1.Vector3:
                return vec3_1.vec3(this[0], this[1], 0);
        }
        return this.clone();
    }
}
exports.Vector2 = Vector2;
function vec2(x, y = x) {
    return new Vector2(x, y);
}
exports.vec2 = vec2;
vec2.from = (src) => {
    const [x = 0, y = 0] = src;
    return vec2(x, y);
};
vec2.floor = (v) => vec2(Math.floor(v.x), Math.floor(v.y));
vec2.zero = Vector2.zero;
vec2.one = Vector2.one;
vec2.left = Vector2.left;
vec2.right = Vector2.right;
vec2.down = Vector2.down;
vec2.up = Vector2.up;
vec2.math = Vector2.math;
vec2.plus = utils_1.wrapGlMatrix((out, a, b) => {
    if (typeof (b) === "number") {
        out[0] = a[0] + b;
        out[1] = a[1] + b;
    }
    else {
        out[0] = a[0] + b[0];
        out[1] = a[1] + (b[1] || 0);
    }
    return out;
}, 2, vec2.zero);
vec2.minus = utils_1.wrapGlMatrix((out, a, b) => {
    if (typeof (b) === "number") {
        out[0] = a[0] - b;
        out[1] = a[1] - b;
    }
    else {
        out[0] = a[0] - b[0];
        out[1] = a[1] - (b[1] || 0);
    }
    return out;
}, 2, vec2.zero);
vec2.mul = utils_1.wrapGlMatrix((out, a, b) => {
    if (typeof (b) === "number") {
        out[0] = a[0] * b;
        out[1] = a[1] * b;
    }
    else {
        out[0] = a[0] * b[0];
        out[1] = a[1] * b[1];
    }
    return out;
}, 2, vec2.zero);
vec2.div = utils_1.wrapGlMatrix((out, a, b) => {
    if (typeof (b) === "number") {
        out[0] = a[0] / b;
        out[1] = a[1] / b;
    }
    else {
        out[0] = a[0] / b[0];
        out[1] = a[1] / b[1];
    }
    return out;
}, 2, vec2.zero);
vec2.dot = (a, b) => {
    return a[0] * b[0] + a[1] * b[1];
};
vec2.cross = (a, b) => {
    return a[0] * b[1] - a[1] * b[0];
};
vec2.normalize = utils_1.wrapGlMatrix(gl_matrix_1.vec2.normalize, 1, vec2.zero);
vec2.perpendicular = utils_1.wrapGlMatrix((out, v) => {
    out[0] = -v[1];
    out[1] = v[0];
    return out;
}, 1, vec2.zero);
vec2.set = utils_1.wrapGlMatrix((out, v) => {
    out[0] = v[0];
    out[1] = v[1];
    return out;
}, 1, vec2.zero);
vec2.fill = utils_1.wrapGlMatrix((out, n) => {
    out[0] = out[1] = n;
    return out;
}, 1, vec2.zero);
//# sourceMappingURL=vec2.js.map

/***/ }),

/***/ "../zogra-renderer/dist/types/vec3.js":
/*!********************************************!*\
  !*** ../zogra-renderer/dist/types/vec3.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.vec3 = exports.Vector3 = void 0;
const vec4_1 = __webpack_require__(/*! ./vec4 */ "../zogra-renderer/dist/types/vec4.js");
const vec2_1 = __webpack_require__(/*! ./vec2 */ "../zogra-renderer/dist/types/vec2.js");
const utils_1 = __webpack_require__(/*! ./utils */ "../zogra-renderer/dist/types/utils.js");
const gl_matrix_1 = __webpack_require__(/*! gl-matrix */ "../zogra-renderer/node_modules/gl-matrix/esm/index.js");
const V3Constructor = Array;
class Vector3 extends V3Constructor {
    get x() { return this[0]; }
    set x(x) { this[0] = x; }
    get y() { return this[1]; }
    set y(y) { this[1] = y; }
    get z() { return this[2]; }
    set z(z) { this[2] = z; }
    get magnitude() {
        return Math.hypot(...this);
    }
    get normalized() {
        const m = this.magnitude;
        return m == 0 ? vec3.zero() : this.clone().div(vec3(m, m, m));
    }
    get negative() {
        return this.clone().negate();
    }
    get inversed() {
        return this.clone().inverse();
    }
    constructor(x, y, z) {
        super(x, y, z);
    }
    static zero() {
        return new Vector3(0, 0, 0);
    }
    static one() {
        return new Vector3(1, 1, 1);
    }
    asMut() { return this; }
    plus(v) {
        return vec3.plus(this, this, v);
    }
    minus(v) {
        return vec3.minus(this, this, v);
    }
    mul(v) {
        return vec3.mul(this, this, v);
    }
    div(v) {
        return vec3.div(this, this, v);
    }
    dot(v) {
        return this[0] * v[0]
            + this[1] * v[1]
            + this[2] * v[2];
    }
    normalize() {
        return vec3.normalize(this, this);
    }
    inverse() {
        this[0] = 1 / this[0];
        this[1] = 1 / this[1];
        this[2] = 1 / this[2];
        return this;
    }
    negate() {
        this[0] = -this[0];
        this[1] = -this[1];
        this[2] = -this[2];
        return this;
    }
    /**
     * cross product with vec3
     * @param a u
     * @param b v
     */
    cross(b) {
        return vec3(this.y * b.z - this.z * b.y, this.z * b.x - this.x * b.z, this.x * b.y - this.y * b.x);
    }
    set(v) {
        this[0] = v[0] || 0;
        this[1] = v[1] || 0;
        this[2] = v[2] || 0;
        return this;
    }
    fill(n) {
        this[0] = this[1] = this[2] = n;
        return this;
    }
    clone(out = vec3.zero()) {
        return out.set(this);
    }
    toVec2() {
        return vec2_1.vec2(this[0], this[1]);
    }
    equals(v) {
        if (v === undefined)
            return false;
        return v[0] === this[0]
            && v[1] === this[1]
            && v[2] === this[2];
    }
    static math(func) {
        return (...args) => {
            return vec3(func(...args.map(v => v.x)), func(...args.map(v => v.y)), func(...args.map(v => v.z)));
        };
    }
    static mathNonAlloc(func, out, ...args) {
        out[0] = func(...args.map(v => v[0]));
        out[1] = func(...args.map(v => v[1]));
        out[2] = func(...args.map(v => v[2]));
        return out;
    }
    __to(type) {
        switch (type) {
            case vec4_1.Vector4:
                return vec4_1.vec4(this[0], this[1], this[2], 0);
            case vec2_1.Vector2:
                return vec2_1.vec2(this[0], this[1]);
        }
        return this.clone();
    }
}
exports.Vector3 = Vector3;
function vec3(x, y = x, z = x) {
    return new Vector3(x, y, z);
}
exports.vec3 = vec3;
vec3.from = (src) => {
    const [x = 0, y = 0, z = 0] = src;
    return vec3(x, y, z);
};
// vec3.floor = (v: vec3) => vec3(Math.floor(v.x), Math.floor(v.y), Math.floor(v.z));
vec3.zero = Vector3.zero;
vec3.one = Vector3.one;
vec3.math = Vector3.math;
vec3.normalize = utils_1.wrapGlMatrix(gl_matrix_1.vec3.normalize, 1, vec3.zero);
vec3.plus = utils_1.wrapGlMatrix((out, a, b) => {
    if (typeof (b) === "number") {
        out[0] = a[0] + b;
        out[1] = a[1] + b;
        out[2] = a[2] + b;
    }
    else {
        out[0] = a[0] + b[0];
        out[1] = a[1] + (b[1] || 0);
        out[2] = a[2] + (b[2] || 0);
    }
    return out;
}, 2, vec3.zero);
vec3.minus = utils_1.wrapGlMatrix((out, a, b) => {
    if (typeof (b) === "number") {
        out[0] = a[0] - b;
        out[1] = a[1] - b;
        out[2] = a[2] - b;
    }
    else {
        out[0] = a[0] - b[0];
        out[1] = a[1] - (b[1] || 0);
        out[2] = a[2] - (b[2] || 0);
    }
    return out;
}, 2, vec3.zero);
vec3.mul = utils_1.wrapGlMatrix((out, a, b) => {
    if (typeof (b) === "number") {
        out[0] = a[0] * b;
        out[1] = a[1] * b;
        out[2] = a[2] * b;
    }
    else {
        out[0] = a[0] * b[0];
        out[1] = a[1] * (b[1] === undefined ? 1 : b[1]);
        out[2] = a[2] * (b[2] === undefined ? 1 : b[2]);
    }
    return out;
}, 2, vec3.zero);
vec3.div = utils_1.wrapGlMatrix((out, a, b) => {
    if (typeof (b) === "number") {
        out[0] = a[0] / b;
        out[1] = a[1] / b;
        out[2] = a[2] / b;
    }
    else {
        out[0] = a[0] / b[0];
        out[1] = a[1] / (b[1] === undefined ? 1 : b[1]);
        out[2] = a[2] / (b[2] === undefined ? 1 : b[2]);
    }
    return out;
}, 2, vec3.zero);
vec3.set = utils_1.wrapGlMatrix((out, v) => {
    out[0] = v[0];
    out[1] = v[1];
    out[2] = v[2];
    return out;
}, 1, vec3.zero);
vec3.fill = utils_1.wrapGlMatrix((out, n) => {
    out[0] = out[1] = out[2] = n;
    return out;
}, 1, vec3.zero);
//# sourceMappingURL=vec3.js.map

/***/ }),

/***/ "../zogra-renderer/dist/types/vec4.js":
/*!********************************************!*\
  !*** ../zogra-renderer/dist/types/vec4.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.vec4 = exports.Vector4 = void 0;
const vec3_1 = __webpack_require__(/*! ./vec3 */ "../zogra-renderer/dist/types/vec3.js");
const vec2_1 = __webpack_require__(/*! ./vec2 */ "../zogra-renderer/dist/types/vec2.js");
const gl_matrix_1 = __webpack_require__(/*! gl-matrix */ "../zogra-renderer/node_modules/gl-matrix/esm/index.js");
const utils_1 = __webpack_require__(/*! ./utils */ "../zogra-renderer/dist/types/utils.js");
const V4Constructor = Array;
class Vector4 extends V4Constructor {
    get x() { return this[0]; }
    set x(x) { this[0] = x; }
    get y() { return this[1]; }
    set y(y) { this[1] = y; }
    get z() { return this[2]; }
    set z(z) { this[2] = z; }
    get w() { return this[3]; }
    set w(w) { this[3] = w; }
    get magnitude() {
        return Math.hypot(...this);
    }
    get normalized() {
        const m = this.magnitude;
        return m == 0 ? vec4.zero() : this.clone().div(vec4(m, m, m, m));
    }
    get negative() {
        return this.clone().negate();
    }
    get inversed() {
        return this.clone().inverse();
    }
    constructor(x, y, z = 0, w = 0) {
        super(x, y, z || 0, w || 0);
    }
    static zero() {
        return new Vector4(0, 0, 0, 0);
    }
    static one() {
        return new Vector4(1, 1, 1, 1);
    }
    asMut() { return this; }
    plus(v) {
        return vec4.plus(this, this, v);
    }
    minus(v) {
        return vec4.minus(this, this, v);
    }
    mul(v) {
        return vec4.mul(this, this, v);
    }
    div(v) {
        return vec4.div(this, this, v);
    }
    dot(v) {
        return this[0] * v[0]
            + this[1] * v[1]
            + this[2] * v[2]
            + this[3] * v[3];
    }
    normalize() {
        return vec4.normalize(this, this);
    }
    inverse() {
        this[0] = 1 / this[0];
        this[1] = 1 / this[1];
        this[2] = 1 / this[2];
        this[3] = 1 / this[3];
        return this;
    }
    negate() {
        this[0] = -this[0];
        this[1] = -this[1];
        this[2] = -this[2];
        this[3] = -this[3];
        return this;
    }
    clone(out = vec4.zero()) {
        return out.set(this);
    }
    equals(v) {
        if (v === undefined)
            return false;
        return v[0] === this[0]
            && v[1] === this[1]
            && v[2] === this[2]
            && v[3] === this[3];
    }
    set(v) {
        this[0] = v[0] || 0;
        this[1] = v[1] || 0;
        this[2] = v[2] || 0;
        this[3] = v[3] || 0;
        return this;
    }
    fill(n) {
        this[0] = this[1] = this[2] = this[3] = n;
        return this;
    }
    static math(func) {
        return (...args) => {
            return vec4(func(...args.map(v => v.x)), func(...args.map(v => v.y)), func(...args.map(v => v.z)), func(...args.map(v => v.w)));
        };
    }
    __to(type) {
        switch (type) {
            case Vector4:
                return this.clone();
            case vec3_1.Vector3:
                return vec3_1.vec3(this[0], this[1], this[2]);
            case vec2_1.Vector2:
                return vec2_1.vec2(this[0], this[1]);
        }
        return this.clone();
    }
}
exports.Vector4 = Vector4;
function vec4(x, y = x, z = x, w = x) {
    return new Vector4(x, y, z, w);
}
exports.vec4 = vec4;
vec4.from = (src) => {
    const [x = 0, y = 0, z = 0, w = 0] = src;
    return vec4(x, y, z, w);
};
vec4.floor = (v) => vec4(Math.floor(v.x), Math.floor(v.y), Math.floor(v.z), Math.floor(v.w));
vec4.zero = Vector4.zero;
vec4.one = Vector4.one;
vec4.math = Vector4.math;
vec4.normalize = utils_1.wrapGlMatrix(gl_matrix_1.vec4.normalize, 1, vec4.zero);
vec4.plus = utils_1.wrapGlMatrix((out, a, b) => {
    if (typeof (b) === "number") {
        out[0] = a[0] + b;
        out[1] = a[1] + b;
        out[2] = a[2] + b;
        out[3] = a[3] + b;
    }
    else {
        out[0] = a[0] + b[0];
        out[1] = a[1] + (b[1] || 0);
        out[2] = a[2] + (b[2] || 0);
        out[3] = a[3] + (b[3] || 0);
    }
    return out;
}, 2, vec4.zero);
vec4.minus = utils_1.wrapGlMatrix((out, a, b) => {
    if (typeof (b) === "number") {
        out[0] = a[0] - b;
        out[1] = a[1] - b;
        out[2] = a[2] - b;
        out[3] = a[3] - b;
    }
    else {
        out[0] = a[0] - b[0];
        out[1] = a[1] - (b[1] || 0);
        out[2] = a[2] - (b[2] || 0);
        out[3] = a[3] - (b[3] || 0);
    }
    return out;
}, 2, vec4.zero);
vec4.mul = utils_1.wrapGlMatrix((out, a, b) => {
    if (typeof (b) === "number") {
        out[0] = a[0] * b;
        out[1] = a[1] * b;
        out[2] = a[2] * b;
        out[3] = a[3] * b;
    }
    else {
        out[0] = a[0] * b[0];
        out[1] = a[1] * (b[1] === undefined ? 1 : b[1]);
        out[2] = a[2] * (b[2] === undefined ? 1 : b[2]);
        out[3] = a[3] * (b[3] === undefined ? 1 : b[3]);
    }
    return out;
}, 2, vec4.zero);
vec4.div = utils_1.wrapGlMatrix((out, a, b) => {
    if (typeof (b) === "number") {
        out[0] = a[0] / b;
        out[1] = a[1] / b;
        out[2] = a[2] / b;
        out[3] = a[3] / b;
    }
    else {
        out[0] = a[0] / b[0];
        out[1] = a[1] / (b[1] === undefined ? 1 : b[1]);
        out[2] = a[2] / (b[2] === undefined ? 1 : b[2]);
        out[3] = a[3] / (b[3] === undefined ? 1 : b[3]);
    }
    return out;
}, 2, vec4.zero);
vec4.set = utils_1.wrapGlMatrix((out, v) => {
    out[0] = v[0];
    out[1] = v[1];
    out[2] = v[2];
    out[3] = v[3];
    return out;
}, 1, vec4.zero);
vec4.fill = utils_1.wrapGlMatrix((out, n) => {
    out[0] = out[1] = out[2] = out[3] = n;
    return out;
}, 1, vec4.zero);
//# sourceMappingURL=vec4.js.map

/***/ }),

/***/ "../zogra-renderer/dist/utils/image-sizing.js":
/*!****************************************************!*\
  !*** ../zogra-renderer/dist/utils/image-sizing.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.imageResize = exports.ImageSizing = void 0;
const rect_1 = __webpack_require__(/*! ../types/rect */ "../zogra-renderer/dist/types/rect.js");
const vec2_1 = __webpack_require__(/*! ../types/vec2 */ "../zogra-renderer/dist/types/vec2.js");
var ImageSizing;
(function (ImageSizing) {
    ImageSizing[ImageSizing["Stretch"] = 1] = "Stretch";
    ImageSizing[ImageSizing["Cover"] = 2] = "Cover";
    ImageSizing[ImageSizing["Contain"] = 3] = "Contain";
    ImageSizing[ImageSizing["KeepLower"] = 4] = "KeepLower";
    ImageSizing[ImageSizing["KeepHigher"] = 5] = "KeepHigher";
    ImageSizing[ImageSizing["Center"] = 6] = "Center";
})(ImageSizing = exports.ImageSizing || (exports.ImageSizing = {}));
function imageResize(srcSize, dstSize, sizing) {
    let srcRect = new rect_1.Rect(vec2_1.vec2.zero(), srcSize);
    let dstRect = new rect_1.Rect(vec2_1.vec2.zero(), dstSize);
    if (sizing === ImageSizing.Contain) {
        let srcAspectRatio = srcSize.x / srcSize.y;
        let dstAspectRatio = dstSize.x / dstSize.y;
        // Source wider than destination
        // Shrink destination viewport height
        if (srcAspectRatio > dstAspectRatio) {
            const delta = dstSize.y - srcSize.y * (dstSize.x / srcSize.x);
            dstRect.min.y += delta / 2;
            dstRect.max.y -= delta / 2;
        }
        // destination wider than source
        // Shrink destination viewport width
        else {
            const delta = dstSize.x - srcSize.x * (dstSize.y / srcSize.y);
            dstRect.min.x += delta / 2;
            dstRect.max.x -= delta / 2;
        }
    }
    else if (sizing === ImageSizing.Cover) {
        let srcAspectRatio = srcSize.x / srcSize.y;
        let dstAspectRatio = dstSize.x / dstSize.y;
        // Source wider than destination
        // shrink source rect with
        if (srcAspectRatio > dstAspectRatio) {
            const delta = srcSize.x - dstSize.x * (srcSize.y / dstSize.y);
            srcRect.min.x += delta / 2;
            srcRect.max.x -= delta / 2;
        }
        // destination wider than source
        // Shrink source rect height
        else {
            const delta = srcSize.y - dstSize.y * (srcSize.x / dstSize.x);
            srcRect.min.y += delta / 2;
            srcRect.max.y -= delta / 2;
        }
    }
    else {
        if (srcSize.x < dstSize.x) {
            switch (sizing) {
                case ImageSizing.Center:
                    const delta = dstSize.x - srcSize.x;
                    dstRect.min.x += delta / 2;
                    dstRect.max.x -= delta / 2;
                    break;
                case ImageSizing.KeepHigher:
                    dstRect.min.x = dstSize.x - srcSize.x;
                    break;
                case ImageSizing.KeepLower:
                    dstRect.max.x = srcSize.x;
                    break;
            }
        }
        else if (srcSize.x > dstSize.x) {
            switch (sizing) {
                case ImageSizing.Center:
                    const delta = srcSize.x - dstSize.x;
                    srcRect.min.x += delta / 2;
                    srcRect.max.x -= delta / 2;
                    break;
                case ImageSizing.KeepHigher:
                    srcRect.min.x = srcSize.x - dstSize.x;
                    break;
                case ImageSizing.KeepLower:
                    srcRect.max.x = dstSize.x;
                    break;
            }
        }
        if (srcSize.y < dstSize.y) {
            switch (sizing) {
                case ImageSizing.Center:
                    const delta = dstSize.y - srcSize.y;
                    dstRect.min.y += delta / 2;
                    dstRect.max.y -= delta / 2;
                    break;
                case ImageSizing.KeepHigher:
                    dstRect.min.y = dstSize.y - srcSize.y;
                    break;
                case ImageSizing.KeepLower:
                    dstRect.max.y = srcSize.y;
                    break;
            }
        }
        else if (srcSize.y > dstSize.y) {
            switch (sizing) {
                case ImageSizing.Center:
                    const delta = srcSize.y - dstSize.y;
                    srcRect.min.y += delta / 2;
                    srcRect.max.y -= delta / 2;
                    break;
                case ImageSizing.KeepHigher:
                    srcRect.min.y = srcSize.y - dstSize.y;
                    break;
                case ImageSizing.KeepLower:
                    srcRect.max.y = dstSize.y;
                    break;
            }
        }
    }
    return [srcRect, dstRect];
}
exports.imageResize = imageResize;
//# sourceMappingURL=image-sizing.js.map

/***/ }),

/***/ "../zogra-renderer/dist/utils/index.js":
/*!*********************************************!*\
  !*** ../zogra-renderer/dist/utils/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(__webpack_require__(/*! ./image-sizing */ "../zogra-renderer/dist/utils/image-sizing.js"), exports);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../zogra-renderer/dist/utils/mesh-builder.js":
/*!****************************************************!*\
  !*** ../zogra-renderer/dist/utils/mesh-builder.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.MeshBuilderLegacy = exports.MeshBuilder = void 0;
const types_1 = __webpack_require__(/*! ../types/types */ "../zogra-renderer/dist/types/types.js");
const global_1 = __webpack_require__(/*! ../core/global */ "../zogra-renderer/dist/core/global.js");
const mesh_1 = __webpack_require__(/*! ../core/mesh */ "../zogra-renderer/dist/core/mesh.js");
class MeshBuilder {
    constructor(verticesCapacity = 16, trianglesCapacity = verticesCapacity * 3, structure = mesh_1.DefaultVertexData, ctx = global_1.GlobalContext()) {
        this.verticesCount = 0;
        this.indicesCount = 0;
        this.mesh = new mesh_1.Mesh(structure, ctx);
        this.mesh.resize(verticesCapacity, trianglesCapacity);
    }
    addPolygon(...verts) {
        if (verts.length <= 0)
            return;
        if (this.verticesCount + verts.length > this.mesh.vertices.length) {
            this.mesh.resize(this.mesh.vertices.length * 2, this.mesh.indices.length * 2, true);
        }
        const base = this.verticesCount;
        for (const key in verts[0]) {
            for (let i = 0; i < verts.length; i++) {
                this.mesh.vertices[base + i][key].set(verts[i][key]);
            }
        }
        for (let i = 0; i < verts.length - 2; i++) {
            this.mesh.indices[this.indicesCount + i * 3 + 0] = base + 0;
            this.mesh.indices[this.indicesCount + i * 3 + 1] = base + i + 1;
            this.mesh.indices[this.indicesCount + i * 3 + 2] = base + i + 2;
        }
        this.verticesCount += verts.length;
        this.indicesCount += (verts.length - 2) * 3;
    }
    toMesh() {
        if (this.mesh.indices.length != this.indicesCount)
            this.mesh.resize(this.verticesCount, this.indicesCount, true);
        else if (this.mesh.vertices.length != this.verticesCount)
            this.mesh.vertices.resize(this.verticesCount, true);
        return this.mesh;
    }
    static quad(center = types_1.vec2.zero(), size = types_1.vec2.one(), ctx = global_1.GlobalContext()) {
        const halfSize = types_1.vec2.mul(size, 0.5);
        const mesh = new mesh_1.Mesh(ctx);
        mesh.resize(4, 6);
        mesh.vertices[0].vert.set([center.x - halfSize.x, center.y - halfSize.y, 0]);
        mesh.vertices[1].vert.set([center.x + halfSize.x, center.y - halfSize.y, 0]);
        mesh.vertices[2].vert.set([center.x + halfSize.x, center.y + halfSize.y, 0]);
        mesh.vertices[3].vert.set([center.x - halfSize.x, center.y + halfSize.y, 0]);
        mesh.vertices[0].uv.set([0, 0]);
        mesh.vertices[1].uv.set([1, 0]);
        mesh.vertices[2].uv.set([1, 1]);
        mesh.vertices[3].uv.set([0, 1]);
        mesh.vertices[0].normal.set([0, 0, 1]);
        mesh.vertices[1].normal.set([0, 0, 1]);
        mesh.vertices[2].normal.set([0, 0, 1]);
        mesh.vertices[3].normal.set([0, 0, 1]);
        mesh.vertices[0].color.fill(1);
        mesh.vertices[1].color.fill(1);
        mesh.vertices[2].color.fill(1);
        mesh.vertices[3].color.fill(1);
        mesh.indices.set([0, 1, 2, 0, 2, 3]);
        return mesh;
    }
    static ndcQuad(ctx = global_1.GlobalContext()) {
        return this.quad(types_1.vec2.zero(), types_1.vec2(2, 2), ctx);
    }
    static ndcTriangle(ctx = global_1.GlobalContext()) {
        const mesh = new mesh_1.Mesh(ctx);
        mesh.resize(3, 3);
        mesh.vertices[0].vert.set([-1, -1, 0]);
        mesh.vertices[1].vert.set([3, -1, 0]);
        mesh.vertices[2].vert.set([-1, 3, 0]);
        mesh.vertices[0].uv.set([0, 0]);
        mesh.vertices[1].uv.set([2, 0]);
        mesh.vertices[2].uv.set([0, 2]);
        mesh.vertices[0].normal.set([0, 0, 1]);
        mesh.vertices[1].normal.set([0, 0, 1]);
        mesh.vertices[2].normal.set([0, 0, 1]);
        mesh.vertices[0].color.fill(1);
        mesh.vertices[1].color.fill(1);
        mesh.vertices[2].color.fill(1);
        mesh.indices.set([0, 1, 2]);
        mesh.name = "mesh_ndc_triangle";
        return mesh;
    }
    static cube(center = types_1.vec3.zero(), size = types_1.vec3.one(), ctx) {
        const verts = [
            types_1.vec3(-.5, -.5, -.5).mul(size).plus(center),
            types_1.vec3(.5, -.5, -.5).mul(size).plus(center),
            types_1.vec3(.5, .5, -.5).mul(size).plus(center),
            types_1.vec3(-.5, .5, -.5).mul(size).plus(center),
            types_1.vec3(-.5, -.5, .5).mul(size).plus(center),
            types_1.vec3(.5, -.5, .5).mul(size).plus(center),
            types_1.vec3(.5, .5, .5).mul(size).plus(center),
            types_1.vec3(-.5, .5, .5).mul(size).plus(center),
        ];
        const uvs = [
            types_1.vec2(0, 0),
            types_1.vec2(1, 0),
            types_1.vec2(1, 1),
            types_1.vec2(0, 1)
        ];
        const mb = new MeshBuilder(24, 36, mesh_1.DefaultVertexData, ctx);
        mb.addPolygon({
            vert: verts[1],
            uv: uvs[0],
            normal: types_1.vec3(0, 0, -1),
        }, {
            vert: verts[0],
            uv: uvs[1],
            normal: types_1.vec3(0, 0, -1),
        }, {
            vert: verts[3],
            uv: uvs[2],
            normal: types_1.vec3(0, 0, -1),
        }, {
            vert: verts[2],
            uv: uvs[3],
            normal: types_1.vec3(0, 0, -1),
        });
        mb.addPolygon({
            vert: verts[5],
            uv: uvs[0],
            normal: types_1.vec3(1, 0, 0),
        }, {
            vert: verts[1],
            uv: uvs[1],
            normal: types_1.vec3(1, 0, 0),
        }, {
            vert: verts[2],
            uv: uvs[2],
            normal: types_1.vec3(1, 0, 0),
        }, {
            vert: verts[6],
            uv: uvs[3],
            normal: types_1.vec3(1, 0, 0),
        });
        mb.addPolygon({
            vert: verts[4],
            uv: uvs[0],
            normal: types_1.vec3(0, 0, 1),
        }, {
            vert: verts[5],
            uv: uvs[1],
            normal: types_1.vec3(0, 0, 1),
        }, {
            vert: verts[6],
            uv: uvs[2],
            normal: types_1.vec3(0, 0, 1),
        }, {
            vert: verts[7],
            uv: uvs[3],
            normal: types_1.vec3(0, 0, 1),
        });
        mb.addPolygon({
            vert: verts[0],
            uv: uvs[0],
            normal: types_1.vec3(-1, 0, 0),
        }, {
            vert: verts[4],
            uv: uvs[1],
            normal: types_1.vec3(-1, 0, 0),
        }, {
            vert: verts[7],
            uv: uvs[2],
            normal: types_1.vec3(-1, 0, 0),
        }, {
            vert: verts[3],
            uv: uvs[3],
            normal: types_1.vec3(-1, 0, 0),
        });
        mb.addPolygon({
            vert: verts[7],
            uv: uvs[0],
            normal: types_1.vec3(0, 1, 0),
        }, {
            vert: verts[6],
            uv: uvs[1],
            normal: types_1.vec3(0, 1, 0),
        }, {
            vert: verts[2],
            uv: uvs[2],
            normal: types_1.vec3(0, 1, 0),
        }, {
            vert: verts[3],
            uv: uvs[3],
            normal: types_1.vec3(0, 1, 0),
        });
        mb.addPolygon({
            vert: verts[0],
            uv: uvs[0],
            normal: types_1.vec3(0, -1, 0),
        }, {
            vert: verts[1],
            uv: uvs[1],
            normal: types_1.vec3(0, -1, 0),
        }, {
            vert: verts[5],
            uv: uvs[2],
            normal: types_1.vec3(0, -1, 0),
        }, {
            vert: verts[4],
            uv: uvs[3],
            normal: types_1.vec3(0, -1, 0),
        });
        const mesh = mb.toMesh();
        mesh.vertices.forEach(vert => vert.color.fill(1));
        mesh.name = "mesh_cube";
        return mesh;
    }
}
exports.MeshBuilder = MeshBuilder;
/** @deprecated */
class MeshBuilderLegacy {
    constructor(capacity = 0, ctx = global_1.GlobalContext()) {
        this.verts = [];
        this.triangles = [];
        this.uvs = [];
        this.colors = [];
        this.ctx = ctx;
    }
    addPolygon(verts, uvs) {
        const base = this.verts.length;
        for (let i = 0; i < verts.length; i++) {
            this.verts.push(verts[i]);
            this.uvs.push(uvs[i]);
            this.colors.push(types_1.Color.white);
        }
        for (let i = 2; i < verts.length; i++) {
            this.triangles.push(base + 0, base + i - 1, base + i);
        }
    }
    addSubMesh(verts, triangles, colors = [types_1.Color.white], uvs = [types_1.vec2(0, 0)]) {
        const base = this.verts.length;
        if (triangles.length % 3 !== 0)
            throw new Error("Invalid number of triangles.");
        for (let i = 0; i < verts.length; i++) {
            this.verts.push(verts[i]);
            this.uvs.push(i >= uvs.length ? uvs[uvs.length - 1] : uvs[i]);
            this.colors.push(i >= colors.length ? colors[colors.length - 1] : colors[i]);
        }
        for (let i = 0; i < triangles.length; i++) {
            this.triangles.push(base + triangles[i]);
        }
    }
    toMesh() {
        const mesh = new mesh_1.Mesh(this.ctx);
        mesh.verts = this.verts;
        mesh.triangles = this.triangles;
        mesh.colors = this.colors;
        mesh.uvs = this.uvs;
        mesh.calculateNormals();
        return mesh;
    }
    static quad(center = types_1.vec2.zero(), size = types_1.vec2.one()) {
        const halfSize = types_1.mul(size, types_1.vec2(0.5));
        const quad = new mesh_1.Mesh();
        quad.verts = [
            types_1.vec3(center.x - halfSize.x, center.y - halfSize.y, 0),
            types_1.vec3(center.x + halfSize.x, center.y - halfSize.y, 0),
            types_1.vec3(center.x + halfSize.x, center.y + halfSize.y, 0),
            types_1.vec3(center.x - halfSize.x, center.y + halfSize.y, 0),
        ];
        quad.triangles = [
            0, 1, 3,
            1, 2, 3,
        ];
        quad.uvs = [
            types_1.vec2(0, 0),
            types_1.vec2(1, 0),
            types_1.vec2(1, 1),
            types_1.vec2(0, 1)
        ];
        quad.normals = [
            types_1.vec3(0, 0, 1),
            types_1.vec3(0, 0, 1),
            types_1.vec3(0, 0, 1),
            types_1.vec3(0, 0, 1),
        ];
        // quad.calculateNormals();
        quad.name = "mesh_quad";
        return quad;
    }
    static ndcQuad() {
        return this.quad(types_1.vec2.zero(), types_1.vec2(2, 2));
    }
    static ndcTriangle() {
        const mesh = new mesh_1.Mesh();
        mesh.verts = [
            types_1.vec3(-1, -1, 0),
            types_1.vec3(3, -1, 0),
            types_1.vec3(-1, 3, 0),
        ];
        mesh.triangles = [0, 1, 2];
        mesh.uvs = [
            types_1.vec2(0, 0),
            types_1.vec2(2, 0),
            types_1.vec2(0, 2),
        ];
        mesh.normals = [
            types_1.vec3(0, 0, 1),
            types_1.vec3(0, 0, 1),
            types_1.vec3(0, 0, 1),
        ];
        mesh.name = "mesh_ndc_triangle";
        return mesh;
    }
}
exports.MeshBuilderLegacy = MeshBuilderLegacy;
//# sourceMappingURL=mesh-builder.js.map

/***/ }),

/***/ "../zogra-renderer/dist/utils/public-utils.js":
/*!****************************************************!*\
  !*** ../zogra-renderer/dist/utils/public-utils.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(__webpack_require__(/*! ./mesh-builder */ "../zogra-renderer/dist/utils/mesh-builder.js"), exports);
//# sourceMappingURL=public-utils.js.map

/***/ }),

/***/ "../zogra-renderer/dist/utils/util.js":
/*!********************************************!*\
  !*** ../zogra-renderer/dist/utils/util.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.cloneUniformValue = exports.setImmediate = exports.DoubleBuffer = exports.fillArray = exports.getUniformsLocation = exports.decorator = exports.warn = exports.panic = exports.panicNull = void 0;
__webpack_require__(/*! reflect-metadata */ "../zogra-renderer/node_modules/reflect-metadata/Reflect.js");
function panicNull(t, msg) {
    if (t === null)
        throw new Error(msg);
    return t;
}
exports.panicNull = panicNull;
function panic(msg) {
    throw new Error(msg);
}
exports.panic = panic;
function warn(msg) {
    console.warn(msg);
    return null;
}
exports.warn = warn;
function decorator(name, defaultValue = undefined, dataWrapper = v => v) {
    const metadataKey = Symbol(name);
    return [
        (value) => {
            if (value === undefined)
                value = defaultValue;
            return Reflect.metadata(metadataKey, dataWrapper(value));
        },
        (target, propKey) => {
            if (propKey === undefined)
                return Reflect.getMetadata(metadataKey, target);
            else
                return Reflect.getMetadata(metadataKey, target, propKey);
        }
    ];
}
exports.decorator = decorator;
function getUniformsLocation(gl, program, uniforms) {
    const out = {};
    for (const key in uniforms) {
        out[key] = gl.getUniformLocation(program, uniforms[key]);
    }
    return out;
}
exports.getUniformsLocation = getUniformsLocation;
function fillArray(element, count) {
    const arr = new Array(count);
    for (let i = 0; i < count; i++)
        arr[i] = typeof (element) === "function" ? element(i) : element;
    return arr;
}
exports.fillArray = fillArray;
class DoubleBuffer {
    constructor(init) {
        this.currentIdx = 0;
        this.buffers = [init(), init()];
    }
    get current() { return this.buffers[this.currentIdx % 2]; }
    set current(value) { this.buffers[this.currentIdx % 2] = value; }
    get back() { return this.buffers[(this.currentIdx + 1) % 2]; }
    set back(value) { this.buffers[(this.currentIdx + 1) % 2] = value; }
    update() {
        this.currentIdx++;
    }
}
exports.DoubleBuffer = DoubleBuffer;
function setImmediate(invoker) {
    setTimeout(invoker, 0);
}
exports.setImmediate = setImmediate;
function cloneUniformValue(value) {
    if (value === null)
        return null;
    if (typeof (value) === "number")
        return value;
    else if (value instanceof Array)
        return value.clone();
    return value;
}
exports.cloneUniformValue = cloneUniformValue;
//# sourceMappingURL=util.js.map

/***/ }),

/***/ "../zogra-renderer/node_modules/gl-matrix/esm/common.js":
/*!**************************************************************!*\
  !*** ../zogra-renderer/node_modules/gl-matrix/esm/common.js ***!
  \**************************************************************/
/*! exports provided: EPSILON, ARRAY_TYPE, RANDOM, setMatrixArrayType, toRadian, equals */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EPSILON", function() { return EPSILON; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ARRAY_TYPE", function() { return ARRAY_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RANDOM", function() { return RANDOM; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setMatrixArrayType", function() { return setMatrixArrayType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toRadian", function() { return toRadian; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "equals", function() { return equals; });
/**
 * Common utilities
 * @module glMatrix
 */
// Configuration Constants
var EPSILON = 0.000001;
var ARRAY_TYPE = typeof Float32Array !== 'undefined' ? Float32Array : Array;
var RANDOM = Math.random;
/**
 * Sets the type of array used when creating new vectors and matrices
 *
 * @param {Float32ArrayConstructor | ArrayConstructor} type Array type, such as Float32Array or Array
 */

function setMatrixArrayType(type) {
  ARRAY_TYPE = type;
}
var degree = Math.PI / 180;
/**
 * Convert Degree To Radian
 *
 * @param {Number} a Angle in Degrees
 */

function toRadian(a) {
  return a * degree;
}
/**
 * Tests whether or not the arguments have approximately the same value, within an absolute
 * or relative tolerance of glMatrix.EPSILON (an absolute tolerance is used for values less
 * than or equal to 1.0, and a relative tolerance is used for larger values)
 *
 * @param {Number} a The first number to test.
 * @param {Number} b The second number to test.
 * @returns {Boolean} True if the numbers are approximately equal, false otherwise.
 */

function equals(a, b) {
  return Math.abs(a - b) <= EPSILON * Math.max(1.0, Math.abs(a), Math.abs(b));
}
if (!Math.hypot) Math.hypot = function () {
  var y = 0,
      i = arguments.length;

  while (i--) {
    y += arguments[i] * arguments[i];
  }

  return Math.sqrt(y);
};

/***/ }),

/***/ "../zogra-renderer/node_modules/gl-matrix/esm/index.js":
/*!*************************************************************!*\
  !*** ../zogra-renderer/node_modules/gl-matrix/esm/index.js ***!
  \*************************************************************/
/*! exports provided: glMatrix, mat2, mat2d, mat3, mat4, quat, quat2, vec2, vec3, vec4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common.js */ "../zogra-renderer/node_modules/gl-matrix/esm/common.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "glMatrix", function() { return _common_js__WEBPACK_IMPORTED_MODULE_0__; });
/* harmony import */ var _mat2_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mat2.js */ "../zogra-renderer/node_modules/gl-matrix/esm/mat2.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "mat2", function() { return _mat2_js__WEBPACK_IMPORTED_MODULE_1__; });
/* harmony import */ var _mat2d_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mat2d.js */ "../zogra-renderer/node_modules/gl-matrix/esm/mat2d.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "mat2d", function() { return _mat2d_js__WEBPACK_IMPORTED_MODULE_2__; });
/* harmony import */ var _mat3_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./mat3.js */ "../zogra-renderer/node_modules/gl-matrix/esm/mat3.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "mat3", function() { return _mat3_js__WEBPACK_IMPORTED_MODULE_3__; });
/* harmony import */ var _mat4_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./mat4.js */ "../zogra-renderer/node_modules/gl-matrix/esm/mat4.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "mat4", function() { return _mat4_js__WEBPACK_IMPORTED_MODULE_4__; });
/* harmony import */ var _quat_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./quat.js */ "../zogra-renderer/node_modules/gl-matrix/esm/quat.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "quat", function() { return _quat_js__WEBPACK_IMPORTED_MODULE_5__; });
/* harmony import */ var _quat2_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./quat2.js */ "../zogra-renderer/node_modules/gl-matrix/esm/quat2.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "quat2", function() { return _quat2_js__WEBPACK_IMPORTED_MODULE_6__; });
/* harmony import */ var _vec2_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./vec2.js */ "../zogra-renderer/node_modules/gl-matrix/esm/vec2.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "vec2", function() { return _vec2_js__WEBPACK_IMPORTED_MODULE_7__; });
/* harmony import */ var _vec3_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./vec3.js */ "../zogra-renderer/node_modules/gl-matrix/esm/vec3.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "vec3", function() { return _vec3_js__WEBPACK_IMPORTED_MODULE_8__; });
/* harmony import */ var _vec4_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./vec4.js */ "../zogra-renderer/node_modules/gl-matrix/esm/vec4.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "vec4", function() { return _vec4_js__WEBPACK_IMPORTED_MODULE_9__; });












/***/ }),

/***/ "../zogra-renderer/node_modules/gl-matrix/esm/mat2.js":
/*!************************************************************!*\
  !*** ../zogra-renderer/node_modules/gl-matrix/esm/mat2.js ***!
  \************************************************************/
/*! exports provided: create, clone, copy, identity, fromValues, set, transpose, invert, adjoint, determinant, multiply, rotate, scale, fromRotation, fromScaling, str, frob, LDU, add, subtract, exactEquals, equals, multiplyScalar, multiplyScalarAndAdd, mul, sub */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create", function() { return create; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clone", function() { return clone; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "copy", function() { return copy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "identity", function() { return identity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromValues", function() { return fromValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "set", function() { return set; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transpose", function() { return transpose; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "invert", function() { return invert; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "adjoint", function() { return adjoint; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "determinant", function() { return determinant; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "multiply", function() { return multiply; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotate", function() { return rotate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scale", function() { return scale; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromRotation", function() { return fromRotation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromScaling", function() { return fromScaling; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "str", function() { return str; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "frob", function() { return frob; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LDU", function() { return LDU; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "add", function() { return add; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subtract", function() { return subtract; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "exactEquals", function() { return exactEquals; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "equals", function() { return equals; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "multiplyScalar", function() { return multiplyScalar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "multiplyScalarAndAdd", function() { return multiplyScalarAndAdd; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mul", function() { return mul; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sub", function() { return sub; });
/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common.js */ "../zogra-renderer/node_modules/gl-matrix/esm/common.js");

/**
 * 2x2 Matrix
 * @module mat2
 */

/**
 * Creates a new identity mat2
 *
 * @returns {mat2} a new 2x2 matrix
 */

function create() {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"](4);

  if (_common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"] != Float32Array) {
    out[1] = 0;
    out[2] = 0;
  }

  out[0] = 1;
  out[3] = 1;
  return out;
}
/**
 * Creates a new mat2 initialized with values from an existing matrix
 *
 * @param {ReadonlyMat2} a matrix to clone
 * @returns {mat2} a new 2x2 matrix
 */

function clone(a) {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"](4);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  return out;
}
/**
 * Copy the values from one mat2 to another
 *
 * @param {mat2} out the receiving matrix
 * @param {ReadonlyMat2} a the source matrix
 * @returns {mat2} out
 */

function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  return out;
}
/**
 * Set a mat2 to the identity matrix
 *
 * @param {mat2} out the receiving matrix
 * @returns {mat2} out
 */

function identity(out) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 1;
  return out;
}
/**
 * Create a new mat2 with the given values
 *
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m10 Component in column 1, row 0 position (index 2)
 * @param {Number} m11 Component in column 1, row 1 position (index 3)
 * @returns {mat2} out A new 2x2 matrix
 */

function fromValues(m00, m01, m10, m11) {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"](4);
  out[0] = m00;
  out[1] = m01;
  out[2] = m10;
  out[3] = m11;
  return out;
}
/**
 * Set the components of a mat2 to the given values
 *
 * @param {mat2} out the receiving matrix
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m10 Component in column 1, row 0 position (index 2)
 * @param {Number} m11 Component in column 1, row 1 position (index 3)
 * @returns {mat2} out
 */

function set(out, m00, m01, m10, m11) {
  out[0] = m00;
  out[1] = m01;
  out[2] = m10;
  out[3] = m11;
  return out;
}
/**
 * Transpose the values of a mat2
 *
 * @param {mat2} out the receiving matrix
 * @param {ReadonlyMat2} a the source matrix
 * @returns {mat2} out
 */

function transpose(out, a) {
  // If we are transposing ourselves we can skip a few steps but have to cache
  // some values
  if (out === a) {
    var a1 = a[1];
    out[1] = a[2];
    out[2] = a1;
  } else {
    out[0] = a[0];
    out[1] = a[2];
    out[2] = a[1];
    out[3] = a[3];
  }

  return out;
}
/**
 * Inverts a mat2
 *
 * @param {mat2} out the receiving matrix
 * @param {ReadonlyMat2} a the source matrix
 * @returns {mat2} out
 */

function invert(out, a) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3]; // Calculate the determinant

  var det = a0 * a3 - a2 * a1;

  if (!det) {
    return null;
  }

  det = 1.0 / det;
  out[0] = a3 * det;
  out[1] = -a1 * det;
  out[2] = -a2 * det;
  out[3] = a0 * det;
  return out;
}
/**
 * Calculates the adjugate of a mat2
 *
 * @param {mat2} out the receiving matrix
 * @param {ReadonlyMat2} a the source matrix
 * @returns {mat2} out
 */

function adjoint(out, a) {
  // Caching this value is nessecary if out == a
  var a0 = a[0];
  out[0] = a[3];
  out[1] = -a[1];
  out[2] = -a[2];
  out[3] = a0;
  return out;
}
/**
 * Calculates the determinant of a mat2
 *
 * @param {ReadonlyMat2} a the source matrix
 * @returns {Number} determinant of a
 */

function determinant(a) {
  return a[0] * a[3] - a[2] * a[1];
}
/**
 * Multiplies two mat2's
 *
 * @param {mat2} out the receiving matrix
 * @param {ReadonlyMat2} a the first operand
 * @param {ReadonlyMat2} b the second operand
 * @returns {mat2} out
 */

function multiply(out, a, b) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3];
  var b0 = b[0],
      b1 = b[1],
      b2 = b[2],
      b3 = b[3];
  out[0] = a0 * b0 + a2 * b1;
  out[1] = a1 * b0 + a3 * b1;
  out[2] = a0 * b2 + a2 * b3;
  out[3] = a1 * b2 + a3 * b3;
  return out;
}
/**
 * Rotates a mat2 by the given angle
 *
 * @param {mat2} out the receiving matrix
 * @param {ReadonlyMat2} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat2} out
 */

function rotate(out, a, rad) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3];
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  out[0] = a0 * c + a2 * s;
  out[1] = a1 * c + a3 * s;
  out[2] = a0 * -s + a2 * c;
  out[3] = a1 * -s + a3 * c;
  return out;
}
/**
 * Scales the mat2 by the dimensions in the given vec2
 *
 * @param {mat2} out the receiving matrix
 * @param {ReadonlyMat2} a the matrix to rotate
 * @param {ReadonlyVec2} v the vec2 to scale the matrix by
 * @returns {mat2} out
 **/

function scale(out, a, v) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3];
  var v0 = v[0],
      v1 = v[1];
  out[0] = a0 * v0;
  out[1] = a1 * v0;
  out[2] = a2 * v1;
  out[3] = a3 * v1;
  return out;
}
/**
 * Creates a matrix from a given angle
 * This is equivalent to (but much faster than):
 *
 *     mat2.identity(dest);
 *     mat2.rotate(dest, dest, rad);
 *
 * @param {mat2} out mat2 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat2} out
 */

function fromRotation(out, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  out[0] = c;
  out[1] = s;
  out[2] = -s;
  out[3] = c;
  return out;
}
/**
 * Creates a matrix from a vector scaling
 * This is equivalent to (but much faster than):
 *
 *     mat2.identity(dest);
 *     mat2.scale(dest, dest, vec);
 *
 * @param {mat2} out mat2 receiving operation result
 * @param {ReadonlyVec2} v Scaling vector
 * @returns {mat2} out
 */

function fromScaling(out, v) {
  out[0] = v[0];
  out[1] = 0;
  out[2] = 0;
  out[3] = v[1];
  return out;
}
/**
 * Returns a string representation of a mat2
 *
 * @param {ReadonlyMat2} a matrix to represent as a string
 * @returns {String} string representation of the matrix
 */

function str(a) {
  return "mat2(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ")";
}
/**
 * Returns Frobenius norm of a mat2
 *
 * @param {ReadonlyMat2} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */

function frob(a) {
  return Math.hypot(a[0], a[1], a[2], a[3]);
}
/**
 * Returns L, D and U matrices (Lower triangular, Diagonal and Upper triangular) by factorizing the input matrix
 * @param {ReadonlyMat2} L the lower triangular matrix
 * @param {ReadonlyMat2} D the diagonal matrix
 * @param {ReadonlyMat2} U the upper triangular matrix
 * @param {ReadonlyMat2} a the input matrix to factorize
 */

function LDU(L, D, U, a) {
  L[2] = a[2] / a[0];
  U[0] = a[0];
  U[1] = a[1];
  U[3] = a[3] - L[2] * U[1];
  return [L, D, U];
}
/**
 * Adds two mat2's
 *
 * @param {mat2} out the receiving matrix
 * @param {ReadonlyMat2} a the first operand
 * @param {ReadonlyMat2} b the second operand
 * @returns {mat2} out
 */

function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  return out;
}
/**
 * Subtracts matrix b from matrix a
 *
 * @param {mat2} out the receiving matrix
 * @param {ReadonlyMat2} a the first operand
 * @param {ReadonlyMat2} b the second operand
 * @returns {mat2} out
 */

function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  out[3] = a[3] - b[3];
  return out;
}
/**
 * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
 *
 * @param {ReadonlyMat2} a The first matrix.
 * @param {ReadonlyMat2} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */

function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
}
/**
 * Returns whether or not the matrices have approximately the same elements in the same position.
 *
 * @param {ReadonlyMat2} a The first matrix.
 * @param {ReadonlyMat2} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */

function equals(a, b) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3];
  var b0 = b[0],
      b1 = b[1],
      b2 = b[2],
      b3 = b[3];
  return Math.abs(a0 - b0) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a3), Math.abs(b3));
}
/**
 * Multiply each element of the matrix by a scalar.
 *
 * @param {mat2} out the receiving matrix
 * @param {ReadonlyMat2} a the matrix to scale
 * @param {Number} b amount to scale the matrix's elements by
 * @returns {mat2} out
 */

function multiplyScalar(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  return out;
}
/**
 * Adds two mat2's after multiplying each element of the second operand by a scalar value.
 *
 * @param {mat2} out the receiving vector
 * @param {ReadonlyMat2} a the first operand
 * @param {ReadonlyMat2} b the second operand
 * @param {Number} scale the amount to scale b's elements by before adding
 * @returns {mat2} out
 */

function multiplyScalarAndAdd(out, a, b, scale) {
  out[0] = a[0] + b[0] * scale;
  out[1] = a[1] + b[1] * scale;
  out[2] = a[2] + b[2] * scale;
  out[3] = a[3] + b[3] * scale;
  return out;
}
/**
 * Alias for {@link mat2.multiply}
 * @function
 */

var mul = multiply;
/**
 * Alias for {@link mat2.subtract}
 * @function
 */

var sub = subtract;

/***/ }),

/***/ "../zogra-renderer/node_modules/gl-matrix/esm/mat2d.js":
/*!*************************************************************!*\
  !*** ../zogra-renderer/node_modules/gl-matrix/esm/mat2d.js ***!
  \*************************************************************/
/*! exports provided: create, clone, copy, identity, fromValues, set, invert, determinant, multiply, rotate, scale, translate, fromRotation, fromScaling, fromTranslation, str, frob, add, subtract, multiplyScalar, multiplyScalarAndAdd, exactEquals, equals, mul, sub */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create", function() { return create; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clone", function() { return clone; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "copy", function() { return copy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "identity", function() { return identity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromValues", function() { return fromValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "set", function() { return set; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "invert", function() { return invert; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "determinant", function() { return determinant; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "multiply", function() { return multiply; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotate", function() { return rotate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scale", function() { return scale; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "translate", function() { return translate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromRotation", function() { return fromRotation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromScaling", function() { return fromScaling; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromTranslation", function() { return fromTranslation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "str", function() { return str; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "frob", function() { return frob; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "add", function() { return add; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subtract", function() { return subtract; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "multiplyScalar", function() { return multiplyScalar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "multiplyScalarAndAdd", function() { return multiplyScalarAndAdd; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "exactEquals", function() { return exactEquals; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "equals", function() { return equals; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mul", function() { return mul; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sub", function() { return sub; });
/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common.js */ "../zogra-renderer/node_modules/gl-matrix/esm/common.js");

/**
 * 2x3 Matrix
 * @module mat2d
 * @description
 * A mat2d contains six elements defined as:
 * <pre>
 * [a, b,
 *  c, d,
 *  tx, ty]
 * </pre>
 * This is a short form for the 3x3 matrix:
 * <pre>
 * [a, b, 0,
 *  c, d, 0,
 *  tx, ty, 1]
 * </pre>
 * The last column is ignored so the array is shorter and operations are faster.
 */

/**
 * Creates a new identity mat2d
 *
 * @returns {mat2d} a new 2x3 matrix
 */

function create() {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"](6);

  if (_common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"] != Float32Array) {
    out[1] = 0;
    out[2] = 0;
    out[4] = 0;
    out[5] = 0;
  }

  out[0] = 1;
  out[3] = 1;
  return out;
}
/**
 * Creates a new mat2d initialized with values from an existing matrix
 *
 * @param {ReadonlyMat2d} a matrix to clone
 * @returns {mat2d} a new 2x3 matrix
 */

function clone(a) {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"](6);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  return out;
}
/**
 * Copy the values from one mat2d to another
 *
 * @param {mat2d} out the receiving matrix
 * @param {ReadonlyMat2d} a the source matrix
 * @returns {mat2d} out
 */

function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  return out;
}
/**
 * Set a mat2d to the identity matrix
 *
 * @param {mat2d} out the receiving matrix
 * @returns {mat2d} out
 */

function identity(out) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 1;
  out[4] = 0;
  out[5] = 0;
  return out;
}
/**
 * Create a new mat2d with the given values
 *
 * @param {Number} a Component A (index 0)
 * @param {Number} b Component B (index 1)
 * @param {Number} c Component C (index 2)
 * @param {Number} d Component D (index 3)
 * @param {Number} tx Component TX (index 4)
 * @param {Number} ty Component TY (index 5)
 * @returns {mat2d} A new mat2d
 */

function fromValues(a, b, c, d, tx, ty) {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"](6);
  out[0] = a;
  out[1] = b;
  out[2] = c;
  out[3] = d;
  out[4] = tx;
  out[5] = ty;
  return out;
}
/**
 * Set the components of a mat2d to the given values
 *
 * @param {mat2d} out the receiving matrix
 * @param {Number} a Component A (index 0)
 * @param {Number} b Component B (index 1)
 * @param {Number} c Component C (index 2)
 * @param {Number} d Component D (index 3)
 * @param {Number} tx Component TX (index 4)
 * @param {Number} ty Component TY (index 5)
 * @returns {mat2d} out
 */

function set(out, a, b, c, d, tx, ty) {
  out[0] = a;
  out[1] = b;
  out[2] = c;
  out[3] = d;
  out[4] = tx;
  out[5] = ty;
  return out;
}
/**
 * Inverts a mat2d
 *
 * @param {mat2d} out the receiving matrix
 * @param {ReadonlyMat2d} a the source matrix
 * @returns {mat2d} out
 */

function invert(out, a) {
  var aa = a[0],
      ab = a[1],
      ac = a[2],
      ad = a[3];
  var atx = a[4],
      aty = a[5];
  var det = aa * ad - ab * ac;

  if (!det) {
    return null;
  }

  det = 1.0 / det;
  out[0] = ad * det;
  out[1] = -ab * det;
  out[2] = -ac * det;
  out[3] = aa * det;
  out[4] = (ac * aty - ad * atx) * det;
  out[5] = (ab * atx - aa * aty) * det;
  return out;
}
/**
 * Calculates the determinant of a mat2d
 *
 * @param {ReadonlyMat2d} a the source matrix
 * @returns {Number} determinant of a
 */

function determinant(a) {
  return a[0] * a[3] - a[1] * a[2];
}
/**
 * Multiplies two mat2d's
 *
 * @param {mat2d} out the receiving matrix
 * @param {ReadonlyMat2d} a the first operand
 * @param {ReadonlyMat2d} b the second operand
 * @returns {mat2d} out
 */

function multiply(out, a, b) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3],
      a4 = a[4],
      a5 = a[5];
  var b0 = b[0],
      b1 = b[1],
      b2 = b[2],
      b3 = b[3],
      b4 = b[4],
      b5 = b[5];
  out[0] = a0 * b0 + a2 * b1;
  out[1] = a1 * b0 + a3 * b1;
  out[2] = a0 * b2 + a2 * b3;
  out[3] = a1 * b2 + a3 * b3;
  out[4] = a0 * b4 + a2 * b5 + a4;
  out[5] = a1 * b4 + a3 * b5 + a5;
  return out;
}
/**
 * Rotates a mat2d by the given angle
 *
 * @param {mat2d} out the receiving matrix
 * @param {ReadonlyMat2d} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat2d} out
 */

function rotate(out, a, rad) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3],
      a4 = a[4],
      a5 = a[5];
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  out[0] = a0 * c + a2 * s;
  out[1] = a1 * c + a3 * s;
  out[2] = a0 * -s + a2 * c;
  out[3] = a1 * -s + a3 * c;
  out[4] = a4;
  out[5] = a5;
  return out;
}
/**
 * Scales the mat2d by the dimensions in the given vec2
 *
 * @param {mat2d} out the receiving matrix
 * @param {ReadonlyMat2d} a the matrix to translate
 * @param {ReadonlyVec2} v the vec2 to scale the matrix by
 * @returns {mat2d} out
 **/

function scale(out, a, v) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3],
      a4 = a[4],
      a5 = a[5];
  var v0 = v[0],
      v1 = v[1];
  out[0] = a0 * v0;
  out[1] = a1 * v0;
  out[2] = a2 * v1;
  out[3] = a3 * v1;
  out[4] = a4;
  out[5] = a5;
  return out;
}
/**
 * Translates the mat2d by the dimensions in the given vec2
 *
 * @param {mat2d} out the receiving matrix
 * @param {ReadonlyMat2d} a the matrix to translate
 * @param {ReadonlyVec2} v the vec2 to translate the matrix by
 * @returns {mat2d} out
 **/

function translate(out, a, v) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3],
      a4 = a[4],
      a5 = a[5];
  var v0 = v[0],
      v1 = v[1];
  out[0] = a0;
  out[1] = a1;
  out[2] = a2;
  out[3] = a3;
  out[4] = a0 * v0 + a2 * v1 + a4;
  out[5] = a1 * v0 + a3 * v1 + a5;
  return out;
}
/**
 * Creates a matrix from a given angle
 * This is equivalent to (but much faster than):
 *
 *     mat2d.identity(dest);
 *     mat2d.rotate(dest, dest, rad);
 *
 * @param {mat2d} out mat2d receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat2d} out
 */

function fromRotation(out, rad) {
  var s = Math.sin(rad),
      c = Math.cos(rad);
  out[0] = c;
  out[1] = s;
  out[2] = -s;
  out[3] = c;
  out[4] = 0;
  out[5] = 0;
  return out;
}
/**
 * Creates a matrix from a vector scaling
 * This is equivalent to (but much faster than):
 *
 *     mat2d.identity(dest);
 *     mat2d.scale(dest, dest, vec);
 *
 * @param {mat2d} out mat2d receiving operation result
 * @param {ReadonlyVec2} v Scaling vector
 * @returns {mat2d} out
 */

function fromScaling(out, v) {
  out[0] = v[0];
  out[1] = 0;
  out[2] = 0;
  out[3] = v[1];
  out[4] = 0;
  out[5] = 0;
  return out;
}
/**
 * Creates a matrix from a vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat2d.identity(dest);
 *     mat2d.translate(dest, dest, vec);
 *
 * @param {mat2d} out mat2d receiving operation result
 * @param {ReadonlyVec2} v Translation vector
 * @returns {mat2d} out
 */

function fromTranslation(out, v) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 1;
  out[4] = v[0];
  out[5] = v[1];
  return out;
}
/**
 * Returns a string representation of a mat2d
 *
 * @param {ReadonlyMat2d} a matrix to represent as a string
 * @returns {String} string representation of the matrix
 */

function str(a) {
  return "mat2d(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4] + ", " + a[5] + ")";
}
/**
 * Returns Frobenius norm of a mat2d
 *
 * @param {ReadonlyMat2d} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */

function frob(a) {
  return Math.hypot(a[0], a[1], a[2], a[3], a[4], a[5], 1);
}
/**
 * Adds two mat2d's
 *
 * @param {mat2d} out the receiving matrix
 * @param {ReadonlyMat2d} a the first operand
 * @param {ReadonlyMat2d} b the second operand
 * @returns {mat2d} out
 */

function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  out[4] = a[4] + b[4];
  out[5] = a[5] + b[5];
  return out;
}
/**
 * Subtracts matrix b from matrix a
 *
 * @param {mat2d} out the receiving matrix
 * @param {ReadonlyMat2d} a the first operand
 * @param {ReadonlyMat2d} b the second operand
 * @returns {mat2d} out
 */

function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  out[3] = a[3] - b[3];
  out[4] = a[4] - b[4];
  out[5] = a[5] - b[5];
  return out;
}
/**
 * Multiply each element of the matrix by a scalar.
 *
 * @param {mat2d} out the receiving matrix
 * @param {ReadonlyMat2d} a the matrix to scale
 * @param {Number} b amount to scale the matrix's elements by
 * @returns {mat2d} out
 */

function multiplyScalar(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  out[4] = a[4] * b;
  out[5] = a[5] * b;
  return out;
}
/**
 * Adds two mat2d's after multiplying each element of the second operand by a scalar value.
 *
 * @param {mat2d} out the receiving vector
 * @param {ReadonlyMat2d} a the first operand
 * @param {ReadonlyMat2d} b the second operand
 * @param {Number} scale the amount to scale b's elements by before adding
 * @returns {mat2d} out
 */

function multiplyScalarAndAdd(out, a, b, scale) {
  out[0] = a[0] + b[0] * scale;
  out[1] = a[1] + b[1] * scale;
  out[2] = a[2] + b[2] * scale;
  out[3] = a[3] + b[3] * scale;
  out[4] = a[4] + b[4] * scale;
  out[5] = a[5] + b[5] * scale;
  return out;
}
/**
 * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
 *
 * @param {ReadonlyMat2d} a The first matrix.
 * @param {ReadonlyMat2d} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */

function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5];
}
/**
 * Returns whether or not the matrices have approximately the same elements in the same position.
 *
 * @param {ReadonlyMat2d} a The first matrix.
 * @param {ReadonlyMat2d} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */

function equals(a, b) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3],
      a4 = a[4],
      a5 = a[5];
  var b0 = b[0],
      b1 = b[1],
      b2 = b[2],
      b3 = b[3],
      b4 = b[4],
      b5 = b[5];
  return Math.abs(a0 - b0) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a3), Math.abs(b3)) && Math.abs(a4 - b4) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a4), Math.abs(b4)) && Math.abs(a5 - b5) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a5), Math.abs(b5));
}
/**
 * Alias for {@link mat2d.multiply}
 * @function
 */

var mul = multiply;
/**
 * Alias for {@link mat2d.subtract}
 * @function
 */

var sub = subtract;

/***/ }),

/***/ "../zogra-renderer/node_modules/gl-matrix/esm/mat3.js":
/*!************************************************************!*\
  !*** ../zogra-renderer/node_modules/gl-matrix/esm/mat3.js ***!
  \************************************************************/
/*! exports provided: create, fromMat4, clone, copy, fromValues, set, identity, transpose, invert, adjoint, determinant, multiply, translate, rotate, scale, fromTranslation, fromRotation, fromScaling, fromMat2d, fromQuat, normalFromMat4, projection, str, frob, add, subtract, multiplyScalar, multiplyScalarAndAdd, exactEquals, equals, mul, sub */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create", function() { return create; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromMat4", function() { return fromMat4; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clone", function() { return clone; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "copy", function() { return copy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromValues", function() { return fromValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "set", function() { return set; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "identity", function() { return identity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transpose", function() { return transpose; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "invert", function() { return invert; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "adjoint", function() { return adjoint; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "determinant", function() { return determinant; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "multiply", function() { return multiply; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "translate", function() { return translate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotate", function() { return rotate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scale", function() { return scale; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromTranslation", function() { return fromTranslation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromRotation", function() { return fromRotation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromScaling", function() { return fromScaling; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromMat2d", function() { return fromMat2d; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromQuat", function() { return fromQuat; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "normalFromMat4", function() { return normalFromMat4; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "projection", function() { return projection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "str", function() { return str; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "frob", function() { return frob; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "add", function() { return add; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subtract", function() { return subtract; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "multiplyScalar", function() { return multiplyScalar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "multiplyScalarAndAdd", function() { return multiplyScalarAndAdd; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "exactEquals", function() { return exactEquals; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "equals", function() { return equals; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mul", function() { return mul; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sub", function() { return sub; });
/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common.js */ "../zogra-renderer/node_modules/gl-matrix/esm/common.js");

/**
 * 3x3 Matrix
 * @module mat3
 */

/**
 * Creates a new identity mat3
 *
 * @returns {mat3} a new 3x3 matrix
 */

function create() {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"](9);

  if (_common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"] != Float32Array) {
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
  }

  out[0] = 1;
  out[4] = 1;
  out[8] = 1;
  return out;
}
/**
 * Copies the upper-left 3x3 values into the given mat3.
 *
 * @param {mat3} out the receiving 3x3 matrix
 * @param {ReadonlyMat4} a   the source 4x4 matrix
 * @returns {mat3} out
 */

function fromMat4(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[4];
  out[4] = a[5];
  out[5] = a[6];
  out[6] = a[8];
  out[7] = a[9];
  out[8] = a[10];
  return out;
}
/**
 * Creates a new mat3 initialized with values from an existing matrix
 *
 * @param {ReadonlyMat3} a matrix to clone
 * @returns {mat3} a new 3x3 matrix
 */

function clone(a) {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"](9);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  return out;
}
/**
 * Copy the values from one mat3 to another
 *
 * @param {mat3} out the receiving matrix
 * @param {ReadonlyMat3} a the source matrix
 * @returns {mat3} out
 */

function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  return out;
}
/**
 * Create a new mat3 with the given values
 *
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m02 Component in column 0, row 2 position (index 2)
 * @param {Number} m10 Component in column 1, row 0 position (index 3)
 * @param {Number} m11 Component in column 1, row 1 position (index 4)
 * @param {Number} m12 Component in column 1, row 2 position (index 5)
 * @param {Number} m20 Component in column 2, row 0 position (index 6)
 * @param {Number} m21 Component in column 2, row 1 position (index 7)
 * @param {Number} m22 Component in column 2, row 2 position (index 8)
 * @returns {mat3} A new mat3
 */

function fromValues(m00, m01, m02, m10, m11, m12, m20, m21, m22) {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"](9);
  out[0] = m00;
  out[1] = m01;
  out[2] = m02;
  out[3] = m10;
  out[4] = m11;
  out[5] = m12;
  out[6] = m20;
  out[7] = m21;
  out[8] = m22;
  return out;
}
/**
 * Set the components of a mat3 to the given values
 *
 * @param {mat3} out the receiving matrix
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m02 Component in column 0, row 2 position (index 2)
 * @param {Number} m10 Component in column 1, row 0 position (index 3)
 * @param {Number} m11 Component in column 1, row 1 position (index 4)
 * @param {Number} m12 Component in column 1, row 2 position (index 5)
 * @param {Number} m20 Component in column 2, row 0 position (index 6)
 * @param {Number} m21 Component in column 2, row 1 position (index 7)
 * @param {Number} m22 Component in column 2, row 2 position (index 8)
 * @returns {mat3} out
 */

function set(out, m00, m01, m02, m10, m11, m12, m20, m21, m22) {
  out[0] = m00;
  out[1] = m01;
  out[2] = m02;
  out[3] = m10;
  out[4] = m11;
  out[5] = m12;
  out[6] = m20;
  out[7] = m21;
  out[8] = m22;
  return out;
}
/**
 * Set a mat3 to the identity matrix
 *
 * @param {mat3} out the receiving matrix
 * @returns {mat3} out
 */

function identity(out) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 1;
  out[5] = 0;
  out[6] = 0;
  out[7] = 0;
  out[8] = 1;
  return out;
}
/**
 * Transpose the values of a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {ReadonlyMat3} a the source matrix
 * @returns {mat3} out
 */

function transpose(out, a) {
  // If we are transposing ourselves we can skip a few steps but have to cache some values
  if (out === a) {
    var a01 = a[1],
        a02 = a[2],
        a12 = a[5];
    out[1] = a[3];
    out[2] = a[6];
    out[3] = a01;
    out[5] = a[7];
    out[6] = a02;
    out[7] = a12;
  } else {
    out[0] = a[0];
    out[1] = a[3];
    out[2] = a[6];
    out[3] = a[1];
    out[4] = a[4];
    out[5] = a[7];
    out[6] = a[2];
    out[7] = a[5];
    out[8] = a[8];
  }

  return out;
}
/**
 * Inverts a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {ReadonlyMat3} a the source matrix
 * @returns {mat3} out
 */

function invert(out, a) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2];
  var a10 = a[3],
      a11 = a[4],
      a12 = a[5];
  var a20 = a[6],
      a21 = a[7],
      a22 = a[8];
  var b01 = a22 * a11 - a12 * a21;
  var b11 = -a22 * a10 + a12 * a20;
  var b21 = a21 * a10 - a11 * a20; // Calculate the determinant

  var det = a00 * b01 + a01 * b11 + a02 * b21;

  if (!det) {
    return null;
  }

  det = 1.0 / det;
  out[0] = b01 * det;
  out[1] = (-a22 * a01 + a02 * a21) * det;
  out[2] = (a12 * a01 - a02 * a11) * det;
  out[3] = b11 * det;
  out[4] = (a22 * a00 - a02 * a20) * det;
  out[5] = (-a12 * a00 + a02 * a10) * det;
  out[6] = b21 * det;
  out[7] = (-a21 * a00 + a01 * a20) * det;
  out[8] = (a11 * a00 - a01 * a10) * det;
  return out;
}
/**
 * Calculates the adjugate of a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {ReadonlyMat3} a the source matrix
 * @returns {mat3} out
 */

function adjoint(out, a) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2];
  var a10 = a[3],
      a11 = a[4],
      a12 = a[5];
  var a20 = a[6],
      a21 = a[7],
      a22 = a[8];
  out[0] = a11 * a22 - a12 * a21;
  out[1] = a02 * a21 - a01 * a22;
  out[2] = a01 * a12 - a02 * a11;
  out[3] = a12 * a20 - a10 * a22;
  out[4] = a00 * a22 - a02 * a20;
  out[5] = a02 * a10 - a00 * a12;
  out[6] = a10 * a21 - a11 * a20;
  out[7] = a01 * a20 - a00 * a21;
  out[8] = a00 * a11 - a01 * a10;
  return out;
}
/**
 * Calculates the determinant of a mat3
 *
 * @param {ReadonlyMat3} a the source matrix
 * @returns {Number} determinant of a
 */

function determinant(a) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2];
  var a10 = a[3],
      a11 = a[4],
      a12 = a[5];
  var a20 = a[6],
      a21 = a[7],
      a22 = a[8];
  return a00 * (a22 * a11 - a12 * a21) + a01 * (-a22 * a10 + a12 * a20) + a02 * (a21 * a10 - a11 * a20);
}
/**
 * Multiplies two mat3's
 *
 * @param {mat3} out the receiving matrix
 * @param {ReadonlyMat3} a the first operand
 * @param {ReadonlyMat3} b the second operand
 * @returns {mat3} out
 */

function multiply(out, a, b) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2];
  var a10 = a[3],
      a11 = a[4],
      a12 = a[5];
  var a20 = a[6],
      a21 = a[7],
      a22 = a[8];
  var b00 = b[0],
      b01 = b[1],
      b02 = b[2];
  var b10 = b[3],
      b11 = b[4],
      b12 = b[5];
  var b20 = b[6],
      b21 = b[7],
      b22 = b[8];
  out[0] = b00 * a00 + b01 * a10 + b02 * a20;
  out[1] = b00 * a01 + b01 * a11 + b02 * a21;
  out[2] = b00 * a02 + b01 * a12 + b02 * a22;
  out[3] = b10 * a00 + b11 * a10 + b12 * a20;
  out[4] = b10 * a01 + b11 * a11 + b12 * a21;
  out[5] = b10 * a02 + b11 * a12 + b12 * a22;
  out[6] = b20 * a00 + b21 * a10 + b22 * a20;
  out[7] = b20 * a01 + b21 * a11 + b22 * a21;
  out[8] = b20 * a02 + b21 * a12 + b22 * a22;
  return out;
}
/**
 * Translate a mat3 by the given vector
 *
 * @param {mat3} out the receiving matrix
 * @param {ReadonlyMat3} a the matrix to translate
 * @param {ReadonlyVec2} v vector to translate by
 * @returns {mat3} out
 */

function translate(out, a, v) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a10 = a[3],
      a11 = a[4],
      a12 = a[5],
      a20 = a[6],
      a21 = a[7],
      a22 = a[8],
      x = v[0],
      y = v[1];
  out[0] = a00;
  out[1] = a01;
  out[2] = a02;
  out[3] = a10;
  out[4] = a11;
  out[5] = a12;
  out[6] = x * a00 + y * a10 + a20;
  out[7] = x * a01 + y * a11 + a21;
  out[8] = x * a02 + y * a12 + a22;
  return out;
}
/**
 * Rotates a mat3 by the given angle
 *
 * @param {mat3} out the receiving matrix
 * @param {ReadonlyMat3} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat3} out
 */

function rotate(out, a, rad) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a10 = a[3],
      a11 = a[4],
      a12 = a[5],
      a20 = a[6],
      a21 = a[7],
      a22 = a[8],
      s = Math.sin(rad),
      c = Math.cos(rad);
  out[0] = c * a00 + s * a10;
  out[1] = c * a01 + s * a11;
  out[2] = c * a02 + s * a12;
  out[3] = c * a10 - s * a00;
  out[4] = c * a11 - s * a01;
  out[5] = c * a12 - s * a02;
  out[6] = a20;
  out[7] = a21;
  out[8] = a22;
  return out;
}
/**
 * Scales the mat3 by the dimensions in the given vec2
 *
 * @param {mat3} out the receiving matrix
 * @param {ReadonlyMat3} a the matrix to rotate
 * @param {ReadonlyVec2} v the vec2 to scale the matrix by
 * @returns {mat3} out
 **/

function scale(out, a, v) {
  var x = v[0],
      y = v[1];
  out[0] = x * a[0];
  out[1] = x * a[1];
  out[2] = x * a[2];
  out[3] = y * a[3];
  out[4] = y * a[4];
  out[5] = y * a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  return out;
}
/**
 * Creates a matrix from a vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat3.identity(dest);
 *     mat3.translate(dest, dest, vec);
 *
 * @param {mat3} out mat3 receiving operation result
 * @param {ReadonlyVec2} v Translation vector
 * @returns {mat3} out
 */

function fromTranslation(out, v) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 1;
  out[5] = 0;
  out[6] = v[0];
  out[7] = v[1];
  out[8] = 1;
  return out;
}
/**
 * Creates a matrix from a given angle
 * This is equivalent to (but much faster than):
 *
 *     mat3.identity(dest);
 *     mat3.rotate(dest, dest, rad);
 *
 * @param {mat3} out mat3 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat3} out
 */

function fromRotation(out, rad) {
  var s = Math.sin(rad),
      c = Math.cos(rad);
  out[0] = c;
  out[1] = s;
  out[2] = 0;
  out[3] = -s;
  out[4] = c;
  out[5] = 0;
  out[6] = 0;
  out[7] = 0;
  out[8] = 1;
  return out;
}
/**
 * Creates a matrix from a vector scaling
 * This is equivalent to (but much faster than):
 *
 *     mat3.identity(dest);
 *     mat3.scale(dest, dest, vec);
 *
 * @param {mat3} out mat3 receiving operation result
 * @param {ReadonlyVec2} v Scaling vector
 * @returns {mat3} out
 */

function fromScaling(out, v) {
  out[0] = v[0];
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = v[1];
  out[5] = 0;
  out[6] = 0;
  out[7] = 0;
  out[8] = 1;
  return out;
}
/**
 * Copies the values from a mat2d into a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {ReadonlyMat2d} a the matrix to copy
 * @returns {mat3} out
 **/

function fromMat2d(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = 0;
  out[3] = a[2];
  out[4] = a[3];
  out[5] = 0;
  out[6] = a[4];
  out[7] = a[5];
  out[8] = 1;
  return out;
}
/**
 * Calculates a 3x3 matrix from the given quaternion
 *
 * @param {mat3} out mat3 receiving operation result
 * @param {ReadonlyQuat} q Quaternion to create matrix from
 *
 * @returns {mat3} out
 */

function fromQuat(out, q) {
  var x = q[0],
      y = q[1],
      z = q[2],
      w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;
  var xx = x * x2;
  var yx = y * x2;
  var yy = y * y2;
  var zx = z * x2;
  var zy = z * y2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;
  out[0] = 1 - yy - zz;
  out[3] = yx - wz;
  out[6] = zx + wy;
  out[1] = yx + wz;
  out[4] = 1 - xx - zz;
  out[7] = zy - wx;
  out[2] = zx - wy;
  out[5] = zy + wx;
  out[8] = 1 - xx - yy;
  return out;
}
/**
 * Calculates a 3x3 normal matrix (transpose inverse) from the 4x4 matrix
 *
 * @param {mat3} out mat3 receiving operation result
 * @param {ReadonlyMat4} a Mat4 to derive the normal matrix from
 *
 * @returns {mat3} out
 */

function normalFromMat4(out, a) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a03 = a[3];
  var a10 = a[4],
      a11 = a[5],
      a12 = a[6],
      a13 = a[7];
  var a20 = a[8],
      a21 = a[9],
      a22 = a[10],
      a23 = a[11];
  var a30 = a[12],
      a31 = a[13],
      a32 = a[14],
      a33 = a[15];
  var b00 = a00 * a11 - a01 * a10;
  var b01 = a00 * a12 - a02 * a10;
  var b02 = a00 * a13 - a03 * a10;
  var b03 = a01 * a12 - a02 * a11;
  var b04 = a01 * a13 - a03 * a11;
  var b05 = a02 * a13 - a03 * a12;
  var b06 = a20 * a31 - a21 * a30;
  var b07 = a20 * a32 - a22 * a30;
  var b08 = a20 * a33 - a23 * a30;
  var b09 = a21 * a32 - a22 * a31;
  var b10 = a21 * a33 - a23 * a31;
  var b11 = a22 * a33 - a23 * a32; // Calculate the determinant

  var det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

  if (!det) {
    return null;
  }

  det = 1.0 / det;
  out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
  out[1] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
  out[2] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
  out[3] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
  out[4] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
  out[5] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
  out[6] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
  out[7] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
  out[8] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
  return out;
}
/**
 * Generates a 2D projection matrix with the given bounds
 *
 * @param {mat3} out mat3 frustum matrix will be written into
 * @param {number} width Width of your gl context
 * @param {number} height Height of gl context
 * @returns {mat3} out
 */

function projection(out, width, height) {
  out[0] = 2 / width;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = -2 / height;
  out[5] = 0;
  out[6] = -1;
  out[7] = 1;
  out[8] = 1;
  return out;
}
/**
 * Returns a string representation of a mat3
 *
 * @param {ReadonlyMat3} a matrix to represent as a string
 * @returns {String} string representation of the matrix
 */

function str(a) {
  return "mat3(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4] + ", " + a[5] + ", " + a[6] + ", " + a[7] + ", " + a[8] + ")";
}
/**
 * Returns Frobenius norm of a mat3
 *
 * @param {ReadonlyMat3} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */

function frob(a) {
  return Math.hypot(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8]);
}
/**
 * Adds two mat3's
 *
 * @param {mat3} out the receiving matrix
 * @param {ReadonlyMat3} a the first operand
 * @param {ReadonlyMat3} b the second operand
 * @returns {mat3} out
 */

function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  out[4] = a[4] + b[4];
  out[5] = a[5] + b[5];
  out[6] = a[6] + b[6];
  out[7] = a[7] + b[7];
  out[8] = a[8] + b[8];
  return out;
}
/**
 * Subtracts matrix b from matrix a
 *
 * @param {mat3} out the receiving matrix
 * @param {ReadonlyMat3} a the first operand
 * @param {ReadonlyMat3} b the second operand
 * @returns {mat3} out
 */

function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  out[3] = a[3] - b[3];
  out[4] = a[4] - b[4];
  out[5] = a[5] - b[5];
  out[6] = a[6] - b[6];
  out[7] = a[7] - b[7];
  out[8] = a[8] - b[8];
  return out;
}
/**
 * Multiply each element of the matrix by a scalar.
 *
 * @param {mat3} out the receiving matrix
 * @param {ReadonlyMat3} a the matrix to scale
 * @param {Number} b amount to scale the matrix's elements by
 * @returns {mat3} out
 */

function multiplyScalar(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  out[4] = a[4] * b;
  out[5] = a[5] * b;
  out[6] = a[6] * b;
  out[7] = a[7] * b;
  out[8] = a[8] * b;
  return out;
}
/**
 * Adds two mat3's after multiplying each element of the second operand by a scalar value.
 *
 * @param {mat3} out the receiving vector
 * @param {ReadonlyMat3} a the first operand
 * @param {ReadonlyMat3} b the second operand
 * @param {Number} scale the amount to scale b's elements by before adding
 * @returns {mat3} out
 */

function multiplyScalarAndAdd(out, a, b, scale) {
  out[0] = a[0] + b[0] * scale;
  out[1] = a[1] + b[1] * scale;
  out[2] = a[2] + b[2] * scale;
  out[3] = a[3] + b[3] * scale;
  out[4] = a[4] + b[4] * scale;
  out[5] = a[5] + b[5] * scale;
  out[6] = a[6] + b[6] * scale;
  out[7] = a[7] + b[7] * scale;
  out[8] = a[8] + b[8] * scale;
  return out;
}
/**
 * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
 *
 * @param {ReadonlyMat3} a The first matrix.
 * @param {ReadonlyMat3} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */

function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7] && a[8] === b[8];
}
/**
 * Returns whether or not the matrices have approximately the same elements in the same position.
 *
 * @param {ReadonlyMat3} a The first matrix.
 * @param {ReadonlyMat3} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */

function equals(a, b) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3],
      a4 = a[4],
      a5 = a[5],
      a6 = a[6],
      a7 = a[7],
      a8 = a[8];
  var b0 = b[0],
      b1 = b[1],
      b2 = b[2],
      b3 = b[3],
      b4 = b[4],
      b5 = b[5],
      b6 = b[6],
      b7 = b[7],
      b8 = b[8];
  return Math.abs(a0 - b0) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a3), Math.abs(b3)) && Math.abs(a4 - b4) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a4), Math.abs(b4)) && Math.abs(a5 - b5) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a5), Math.abs(b5)) && Math.abs(a6 - b6) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a6), Math.abs(b6)) && Math.abs(a7 - b7) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a7), Math.abs(b7)) && Math.abs(a8 - b8) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a8), Math.abs(b8));
}
/**
 * Alias for {@link mat3.multiply}
 * @function
 */

var mul = multiply;
/**
 * Alias for {@link mat3.subtract}
 * @function
 */

var sub = subtract;

/***/ }),

/***/ "../zogra-renderer/node_modules/gl-matrix/esm/mat4.js":
/*!************************************************************!*\
  !*** ../zogra-renderer/node_modules/gl-matrix/esm/mat4.js ***!
  \************************************************************/
/*! exports provided: create, clone, copy, fromValues, set, identity, transpose, invert, adjoint, determinant, multiply, translate, scale, rotate, rotateX, rotateY, rotateZ, fromTranslation, fromScaling, fromRotation, fromXRotation, fromYRotation, fromZRotation, fromRotationTranslation, fromQuat2, getTranslation, getScaling, getRotation, fromRotationTranslationScale, fromRotationTranslationScaleOrigin, fromQuat, frustum, perspective, perspectiveFromFieldOfView, ortho, lookAt, targetTo, str, frob, add, subtract, multiplyScalar, multiplyScalarAndAdd, exactEquals, equals, mul, sub */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create", function() { return create; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clone", function() { return clone; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "copy", function() { return copy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromValues", function() { return fromValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "set", function() { return set; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "identity", function() { return identity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transpose", function() { return transpose; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "invert", function() { return invert; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "adjoint", function() { return adjoint; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "determinant", function() { return determinant; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "multiply", function() { return multiply; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "translate", function() { return translate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scale", function() { return scale; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotate", function() { return rotate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotateX", function() { return rotateX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotateY", function() { return rotateY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotateZ", function() { return rotateZ; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromTranslation", function() { return fromTranslation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromScaling", function() { return fromScaling; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromRotation", function() { return fromRotation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromXRotation", function() { return fromXRotation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromYRotation", function() { return fromYRotation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromZRotation", function() { return fromZRotation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromRotationTranslation", function() { return fromRotationTranslation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromQuat2", function() { return fromQuat2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTranslation", function() { return getTranslation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getScaling", function() { return getScaling; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRotation", function() { return getRotation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromRotationTranslationScale", function() { return fromRotationTranslationScale; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromRotationTranslationScaleOrigin", function() { return fromRotationTranslationScaleOrigin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromQuat", function() { return fromQuat; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "frustum", function() { return frustum; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "perspective", function() { return perspective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "perspectiveFromFieldOfView", function() { return perspectiveFromFieldOfView; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ortho", function() { return ortho; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lookAt", function() { return lookAt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "targetTo", function() { return targetTo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "str", function() { return str; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "frob", function() { return frob; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "add", function() { return add; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subtract", function() { return subtract; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "multiplyScalar", function() { return multiplyScalar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "multiplyScalarAndAdd", function() { return multiplyScalarAndAdd; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "exactEquals", function() { return exactEquals; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "equals", function() { return equals; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mul", function() { return mul; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sub", function() { return sub; });
/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common.js */ "../zogra-renderer/node_modules/gl-matrix/esm/common.js");

/**
 * 4x4 Matrix<br>Format: column-major, when typed out it looks like row-major<br>The matrices are being post multiplied.
 * @module mat4
 */

/**
 * Creates a new identity mat4
 *
 * @returns {mat4} a new 4x4 matrix
 */

function create() {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"](16);

  if (_common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"] != Float32Array) {
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
  }

  out[0] = 1;
  out[5] = 1;
  out[10] = 1;
  out[15] = 1;
  return out;
}
/**
 * Creates a new mat4 initialized with values from an existing matrix
 *
 * @param {ReadonlyMat4} a matrix to clone
 * @returns {mat4} a new 4x4 matrix
 */

function clone(a) {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"](16);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  out[9] = a[9];
  out[10] = a[10];
  out[11] = a[11];
  out[12] = a[12];
  out[13] = a[13];
  out[14] = a[14];
  out[15] = a[15];
  return out;
}
/**
 * Copy the values from one mat4 to another
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the source matrix
 * @returns {mat4} out
 */

function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  out[9] = a[9];
  out[10] = a[10];
  out[11] = a[11];
  out[12] = a[12];
  out[13] = a[13];
  out[14] = a[14];
  out[15] = a[15];
  return out;
}
/**
 * Create a new mat4 with the given values
 *
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m02 Component in column 0, row 2 position (index 2)
 * @param {Number} m03 Component in column 0, row 3 position (index 3)
 * @param {Number} m10 Component in column 1, row 0 position (index 4)
 * @param {Number} m11 Component in column 1, row 1 position (index 5)
 * @param {Number} m12 Component in column 1, row 2 position (index 6)
 * @param {Number} m13 Component in column 1, row 3 position (index 7)
 * @param {Number} m20 Component in column 2, row 0 position (index 8)
 * @param {Number} m21 Component in column 2, row 1 position (index 9)
 * @param {Number} m22 Component in column 2, row 2 position (index 10)
 * @param {Number} m23 Component in column 2, row 3 position (index 11)
 * @param {Number} m30 Component in column 3, row 0 position (index 12)
 * @param {Number} m31 Component in column 3, row 1 position (index 13)
 * @param {Number} m32 Component in column 3, row 2 position (index 14)
 * @param {Number} m33 Component in column 3, row 3 position (index 15)
 * @returns {mat4} A new mat4
 */

function fromValues(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"](16);
  out[0] = m00;
  out[1] = m01;
  out[2] = m02;
  out[3] = m03;
  out[4] = m10;
  out[5] = m11;
  out[6] = m12;
  out[7] = m13;
  out[8] = m20;
  out[9] = m21;
  out[10] = m22;
  out[11] = m23;
  out[12] = m30;
  out[13] = m31;
  out[14] = m32;
  out[15] = m33;
  return out;
}
/**
 * Set the components of a mat4 to the given values
 *
 * @param {mat4} out the receiving matrix
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m02 Component in column 0, row 2 position (index 2)
 * @param {Number} m03 Component in column 0, row 3 position (index 3)
 * @param {Number} m10 Component in column 1, row 0 position (index 4)
 * @param {Number} m11 Component in column 1, row 1 position (index 5)
 * @param {Number} m12 Component in column 1, row 2 position (index 6)
 * @param {Number} m13 Component in column 1, row 3 position (index 7)
 * @param {Number} m20 Component in column 2, row 0 position (index 8)
 * @param {Number} m21 Component in column 2, row 1 position (index 9)
 * @param {Number} m22 Component in column 2, row 2 position (index 10)
 * @param {Number} m23 Component in column 2, row 3 position (index 11)
 * @param {Number} m30 Component in column 3, row 0 position (index 12)
 * @param {Number} m31 Component in column 3, row 1 position (index 13)
 * @param {Number} m32 Component in column 3, row 2 position (index 14)
 * @param {Number} m33 Component in column 3, row 3 position (index 15)
 * @returns {mat4} out
 */

function set(out, m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
  out[0] = m00;
  out[1] = m01;
  out[2] = m02;
  out[3] = m03;
  out[4] = m10;
  out[5] = m11;
  out[6] = m12;
  out[7] = m13;
  out[8] = m20;
  out[9] = m21;
  out[10] = m22;
  out[11] = m23;
  out[12] = m30;
  out[13] = m31;
  out[14] = m32;
  out[15] = m33;
  return out;
}
/**
 * Set a mat4 to the identity matrix
 *
 * @param {mat4} out the receiving matrix
 * @returns {mat4} out
 */

function identity(out) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = 1;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 1;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
/**
 * Transpose the values of a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the source matrix
 * @returns {mat4} out
 */

function transpose(out, a) {
  // If we are transposing ourselves we can skip a few steps but have to cache some values
  if (out === a) {
    var a01 = a[1],
        a02 = a[2],
        a03 = a[3];
    var a12 = a[6],
        a13 = a[7];
    var a23 = a[11];
    out[1] = a[4];
    out[2] = a[8];
    out[3] = a[12];
    out[4] = a01;
    out[6] = a[9];
    out[7] = a[13];
    out[8] = a02;
    out[9] = a12;
    out[11] = a[14];
    out[12] = a03;
    out[13] = a13;
    out[14] = a23;
  } else {
    out[0] = a[0];
    out[1] = a[4];
    out[2] = a[8];
    out[3] = a[12];
    out[4] = a[1];
    out[5] = a[5];
    out[6] = a[9];
    out[7] = a[13];
    out[8] = a[2];
    out[9] = a[6];
    out[10] = a[10];
    out[11] = a[14];
    out[12] = a[3];
    out[13] = a[7];
    out[14] = a[11];
    out[15] = a[15];
  }

  return out;
}
/**
 * Inverts a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the source matrix
 * @returns {mat4} out
 */

function invert(out, a) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a03 = a[3];
  var a10 = a[4],
      a11 = a[5],
      a12 = a[6],
      a13 = a[7];
  var a20 = a[8],
      a21 = a[9],
      a22 = a[10],
      a23 = a[11];
  var a30 = a[12],
      a31 = a[13],
      a32 = a[14],
      a33 = a[15];
  var b00 = a00 * a11 - a01 * a10;
  var b01 = a00 * a12 - a02 * a10;
  var b02 = a00 * a13 - a03 * a10;
  var b03 = a01 * a12 - a02 * a11;
  var b04 = a01 * a13 - a03 * a11;
  var b05 = a02 * a13 - a03 * a12;
  var b06 = a20 * a31 - a21 * a30;
  var b07 = a20 * a32 - a22 * a30;
  var b08 = a20 * a33 - a23 * a30;
  var b09 = a21 * a32 - a22 * a31;
  var b10 = a21 * a33 - a23 * a31;
  var b11 = a22 * a33 - a23 * a32; // Calculate the determinant

  var det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

  if (!det) {
    return null;
  }

  det = 1.0 / det;
  out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
  out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
  out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
  out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
  out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
  out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
  out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
  out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
  out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
  out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
  out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
  out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
  out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
  out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
  out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
  out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;
  return out;
}
/**
 * Calculates the adjugate of a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the source matrix
 * @returns {mat4} out
 */

function adjoint(out, a) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a03 = a[3];
  var a10 = a[4],
      a11 = a[5],
      a12 = a[6],
      a13 = a[7];
  var a20 = a[8],
      a21 = a[9],
      a22 = a[10],
      a23 = a[11];
  var a30 = a[12],
      a31 = a[13],
      a32 = a[14],
      a33 = a[15];
  out[0] = a11 * (a22 * a33 - a23 * a32) - a21 * (a12 * a33 - a13 * a32) + a31 * (a12 * a23 - a13 * a22);
  out[1] = -(a01 * (a22 * a33 - a23 * a32) - a21 * (a02 * a33 - a03 * a32) + a31 * (a02 * a23 - a03 * a22));
  out[2] = a01 * (a12 * a33 - a13 * a32) - a11 * (a02 * a33 - a03 * a32) + a31 * (a02 * a13 - a03 * a12);
  out[3] = -(a01 * (a12 * a23 - a13 * a22) - a11 * (a02 * a23 - a03 * a22) + a21 * (a02 * a13 - a03 * a12));
  out[4] = -(a10 * (a22 * a33 - a23 * a32) - a20 * (a12 * a33 - a13 * a32) + a30 * (a12 * a23 - a13 * a22));
  out[5] = a00 * (a22 * a33 - a23 * a32) - a20 * (a02 * a33 - a03 * a32) + a30 * (a02 * a23 - a03 * a22);
  out[6] = -(a00 * (a12 * a33 - a13 * a32) - a10 * (a02 * a33 - a03 * a32) + a30 * (a02 * a13 - a03 * a12));
  out[7] = a00 * (a12 * a23 - a13 * a22) - a10 * (a02 * a23 - a03 * a22) + a20 * (a02 * a13 - a03 * a12);
  out[8] = a10 * (a21 * a33 - a23 * a31) - a20 * (a11 * a33 - a13 * a31) + a30 * (a11 * a23 - a13 * a21);
  out[9] = -(a00 * (a21 * a33 - a23 * a31) - a20 * (a01 * a33 - a03 * a31) + a30 * (a01 * a23 - a03 * a21));
  out[10] = a00 * (a11 * a33 - a13 * a31) - a10 * (a01 * a33 - a03 * a31) + a30 * (a01 * a13 - a03 * a11);
  out[11] = -(a00 * (a11 * a23 - a13 * a21) - a10 * (a01 * a23 - a03 * a21) + a20 * (a01 * a13 - a03 * a11));
  out[12] = -(a10 * (a21 * a32 - a22 * a31) - a20 * (a11 * a32 - a12 * a31) + a30 * (a11 * a22 - a12 * a21));
  out[13] = a00 * (a21 * a32 - a22 * a31) - a20 * (a01 * a32 - a02 * a31) + a30 * (a01 * a22 - a02 * a21);
  out[14] = -(a00 * (a11 * a32 - a12 * a31) - a10 * (a01 * a32 - a02 * a31) + a30 * (a01 * a12 - a02 * a11));
  out[15] = a00 * (a11 * a22 - a12 * a21) - a10 * (a01 * a22 - a02 * a21) + a20 * (a01 * a12 - a02 * a11);
  return out;
}
/**
 * Calculates the determinant of a mat4
 *
 * @param {ReadonlyMat4} a the source matrix
 * @returns {Number} determinant of a
 */

function determinant(a) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a03 = a[3];
  var a10 = a[4],
      a11 = a[5],
      a12 = a[6],
      a13 = a[7];
  var a20 = a[8],
      a21 = a[9],
      a22 = a[10],
      a23 = a[11];
  var a30 = a[12],
      a31 = a[13],
      a32 = a[14],
      a33 = a[15];
  var b00 = a00 * a11 - a01 * a10;
  var b01 = a00 * a12 - a02 * a10;
  var b02 = a00 * a13 - a03 * a10;
  var b03 = a01 * a12 - a02 * a11;
  var b04 = a01 * a13 - a03 * a11;
  var b05 = a02 * a13 - a03 * a12;
  var b06 = a20 * a31 - a21 * a30;
  var b07 = a20 * a32 - a22 * a30;
  var b08 = a20 * a33 - a23 * a30;
  var b09 = a21 * a32 - a22 * a31;
  var b10 = a21 * a33 - a23 * a31;
  var b11 = a22 * a33 - a23 * a32; // Calculate the determinant

  return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
}
/**
 * Multiplies two mat4s
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the first operand
 * @param {ReadonlyMat4} b the second operand
 * @returns {mat4} out
 */

function multiply(out, a, b) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a03 = a[3];
  var a10 = a[4],
      a11 = a[5],
      a12 = a[6],
      a13 = a[7];
  var a20 = a[8],
      a21 = a[9],
      a22 = a[10],
      a23 = a[11];
  var a30 = a[12],
      a31 = a[13],
      a32 = a[14],
      a33 = a[15]; // Cache only the current line of the second matrix

  var b0 = b[0],
      b1 = b[1],
      b2 = b[2],
      b3 = b[3];
  out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  b0 = b[4];
  b1 = b[5];
  b2 = b[6];
  b3 = b[7];
  out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  b0 = b[8];
  b1 = b[9];
  b2 = b[10];
  b3 = b[11];
  out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  b0 = b[12];
  b1 = b[13];
  b2 = b[14];
  b3 = b[15];
  out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  return out;
}
/**
 * Translate a mat4 by the given vector
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the matrix to translate
 * @param {ReadonlyVec3} v vector to translate by
 * @returns {mat4} out
 */

function translate(out, a, v) {
  var x = v[0],
      y = v[1],
      z = v[2];
  var a00, a01, a02, a03;
  var a10, a11, a12, a13;
  var a20, a21, a22, a23;

  if (a === out) {
    out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
    out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
    out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
    out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
  } else {
    a00 = a[0];
    a01 = a[1];
    a02 = a[2];
    a03 = a[3];
    a10 = a[4];
    a11 = a[5];
    a12 = a[6];
    a13 = a[7];
    a20 = a[8];
    a21 = a[9];
    a22 = a[10];
    a23 = a[11];
    out[0] = a00;
    out[1] = a01;
    out[2] = a02;
    out[3] = a03;
    out[4] = a10;
    out[5] = a11;
    out[6] = a12;
    out[7] = a13;
    out[8] = a20;
    out[9] = a21;
    out[10] = a22;
    out[11] = a23;
    out[12] = a00 * x + a10 * y + a20 * z + a[12];
    out[13] = a01 * x + a11 * y + a21 * z + a[13];
    out[14] = a02 * x + a12 * y + a22 * z + a[14];
    out[15] = a03 * x + a13 * y + a23 * z + a[15];
  }

  return out;
}
/**
 * Scales the mat4 by the dimensions in the given vec3 not using vectorization
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the matrix to scale
 * @param {ReadonlyVec3} v the vec3 to scale the matrix by
 * @returns {mat4} out
 **/

function scale(out, a, v) {
  var x = v[0],
      y = v[1],
      z = v[2];
  out[0] = a[0] * x;
  out[1] = a[1] * x;
  out[2] = a[2] * x;
  out[3] = a[3] * x;
  out[4] = a[4] * y;
  out[5] = a[5] * y;
  out[6] = a[6] * y;
  out[7] = a[7] * y;
  out[8] = a[8] * z;
  out[9] = a[9] * z;
  out[10] = a[10] * z;
  out[11] = a[11] * z;
  out[12] = a[12];
  out[13] = a[13];
  out[14] = a[14];
  out[15] = a[15];
  return out;
}
/**
 * Rotates a mat4 by the given angle around the given axis
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @param {ReadonlyVec3} axis the axis to rotate around
 * @returns {mat4} out
 */

function rotate(out, a, rad, axis) {
  var x = axis[0],
      y = axis[1],
      z = axis[2];
  var len = Math.hypot(x, y, z);
  var s, c, t;
  var a00, a01, a02, a03;
  var a10, a11, a12, a13;
  var a20, a21, a22, a23;
  var b00, b01, b02;
  var b10, b11, b12;
  var b20, b21, b22;

  if (len < _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"]) {
    return null;
  }

  len = 1 / len;
  x *= len;
  y *= len;
  z *= len;
  s = Math.sin(rad);
  c = Math.cos(rad);
  t = 1 - c;
  a00 = a[0];
  a01 = a[1];
  a02 = a[2];
  a03 = a[3];
  a10 = a[4];
  a11 = a[5];
  a12 = a[6];
  a13 = a[7];
  a20 = a[8];
  a21 = a[9];
  a22 = a[10];
  a23 = a[11]; // Construct the elements of the rotation matrix

  b00 = x * x * t + c;
  b01 = y * x * t + z * s;
  b02 = z * x * t - y * s;
  b10 = x * y * t - z * s;
  b11 = y * y * t + c;
  b12 = z * y * t + x * s;
  b20 = x * z * t + y * s;
  b21 = y * z * t - x * s;
  b22 = z * z * t + c; // Perform rotation-specific matrix multiplication

  out[0] = a00 * b00 + a10 * b01 + a20 * b02;
  out[1] = a01 * b00 + a11 * b01 + a21 * b02;
  out[2] = a02 * b00 + a12 * b01 + a22 * b02;
  out[3] = a03 * b00 + a13 * b01 + a23 * b02;
  out[4] = a00 * b10 + a10 * b11 + a20 * b12;
  out[5] = a01 * b10 + a11 * b11 + a21 * b12;
  out[6] = a02 * b10 + a12 * b11 + a22 * b12;
  out[7] = a03 * b10 + a13 * b11 + a23 * b12;
  out[8] = a00 * b20 + a10 * b21 + a20 * b22;
  out[9] = a01 * b20 + a11 * b21 + a21 * b22;
  out[10] = a02 * b20 + a12 * b21 + a22 * b22;
  out[11] = a03 * b20 + a13 * b21 + a23 * b22;

  if (a !== out) {
    // If the source and destination differ, copy the unchanged last row
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  }

  return out;
}
/**
 * Rotates a matrix by the given angle around the X axis
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */

function rotateX(out, a, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  var a10 = a[4];
  var a11 = a[5];
  var a12 = a[6];
  var a13 = a[7];
  var a20 = a[8];
  var a21 = a[9];
  var a22 = a[10];
  var a23 = a[11];

  if (a !== out) {
    // If the source and destination differ, copy the unchanged rows
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  } // Perform axis-specific matrix multiplication


  out[4] = a10 * c + a20 * s;
  out[5] = a11 * c + a21 * s;
  out[6] = a12 * c + a22 * s;
  out[7] = a13 * c + a23 * s;
  out[8] = a20 * c - a10 * s;
  out[9] = a21 * c - a11 * s;
  out[10] = a22 * c - a12 * s;
  out[11] = a23 * c - a13 * s;
  return out;
}
/**
 * Rotates a matrix by the given angle around the Y axis
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */

function rotateY(out, a, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  var a00 = a[0];
  var a01 = a[1];
  var a02 = a[2];
  var a03 = a[3];
  var a20 = a[8];
  var a21 = a[9];
  var a22 = a[10];
  var a23 = a[11];

  if (a !== out) {
    // If the source and destination differ, copy the unchanged rows
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  } // Perform axis-specific matrix multiplication


  out[0] = a00 * c - a20 * s;
  out[1] = a01 * c - a21 * s;
  out[2] = a02 * c - a22 * s;
  out[3] = a03 * c - a23 * s;
  out[8] = a00 * s + a20 * c;
  out[9] = a01 * s + a21 * c;
  out[10] = a02 * s + a22 * c;
  out[11] = a03 * s + a23 * c;
  return out;
}
/**
 * Rotates a matrix by the given angle around the Z axis
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */

function rotateZ(out, a, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  var a00 = a[0];
  var a01 = a[1];
  var a02 = a[2];
  var a03 = a[3];
  var a10 = a[4];
  var a11 = a[5];
  var a12 = a[6];
  var a13 = a[7];

  if (a !== out) {
    // If the source and destination differ, copy the unchanged last row
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  } // Perform axis-specific matrix multiplication


  out[0] = a00 * c + a10 * s;
  out[1] = a01 * c + a11 * s;
  out[2] = a02 * c + a12 * s;
  out[3] = a03 * c + a13 * s;
  out[4] = a10 * c - a00 * s;
  out[5] = a11 * c - a01 * s;
  out[6] = a12 * c - a02 * s;
  out[7] = a13 * c - a03 * s;
  return out;
}
/**
 * Creates a matrix from a vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, dest, vec);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {ReadonlyVec3} v Translation vector
 * @returns {mat4} out
 */

function fromTranslation(out, v) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = 1;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 1;
  out[11] = 0;
  out[12] = v[0];
  out[13] = v[1];
  out[14] = v[2];
  out[15] = 1;
  return out;
}
/**
 * Creates a matrix from a vector scaling
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.scale(dest, dest, vec);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {ReadonlyVec3} v Scaling vector
 * @returns {mat4} out
 */

function fromScaling(out, v) {
  out[0] = v[0];
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = v[1];
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = v[2];
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
/**
 * Creates a matrix from a given angle around a given axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotate(dest, dest, rad, axis);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @param {ReadonlyVec3} axis the axis to rotate around
 * @returns {mat4} out
 */

function fromRotation(out, rad, axis) {
  var x = axis[0],
      y = axis[1],
      z = axis[2];
  var len = Math.hypot(x, y, z);
  var s, c, t;

  if (len < _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"]) {
    return null;
  }

  len = 1 / len;
  x *= len;
  y *= len;
  z *= len;
  s = Math.sin(rad);
  c = Math.cos(rad);
  t = 1 - c; // Perform rotation-specific matrix multiplication

  out[0] = x * x * t + c;
  out[1] = y * x * t + z * s;
  out[2] = z * x * t - y * s;
  out[3] = 0;
  out[4] = x * y * t - z * s;
  out[5] = y * y * t + c;
  out[6] = z * y * t + x * s;
  out[7] = 0;
  out[8] = x * z * t + y * s;
  out[9] = y * z * t - x * s;
  out[10] = z * z * t + c;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
/**
 * Creates a matrix from the given angle around the X axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotateX(dest, dest, rad);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */

function fromXRotation(out, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad); // Perform axis-specific matrix multiplication

  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = c;
  out[6] = s;
  out[7] = 0;
  out[8] = 0;
  out[9] = -s;
  out[10] = c;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
/**
 * Creates a matrix from the given angle around the Y axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotateY(dest, dest, rad);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */

function fromYRotation(out, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad); // Perform axis-specific matrix multiplication

  out[0] = c;
  out[1] = 0;
  out[2] = -s;
  out[3] = 0;
  out[4] = 0;
  out[5] = 1;
  out[6] = 0;
  out[7] = 0;
  out[8] = s;
  out[9] = 0;
  out[10] = c;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
/**
 * Creates a matrix from the given angle around the Z axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotateZ(dest, dest, rad);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */

function fromZRotation(out, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad); // Perform axis-specific matrix multiplication

  out[0] = c;
  out[1] = s;
  out[2] = 0;
  out[3] = 0;
  out[4] = -s;
  out[5] = c;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 1;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
/**
 * Creates a matrix from a quaternion rotation and vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     let quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {ReadonlyVec3} v Translation vector
 * @returns {mat4} out
 */

function fromRotationTranslation(out, q, v) {
  // Quaternion math
  var x = q[0],
      y = q[1],
      z = q[2],
      w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;
  var xx = x * x2;
  var xy = x * y2;
  var xz = x * z2;
  var yy = y * y2;
  var yz = y * z2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;
  out[0] = 1 - (yy + zz);
  out[1] = xy + wz;
  out[2] = xz - wy;
  out[3] = 0;
  out[4] = xy - wz;
  out[5] = 1 - (xx + zz);
  out[6] = yz + wx;
  out[7] = 0;
  out[8] = xz + wy;
  out[9] = yz - wx;
  out[10] = 1 - (xx + yy);
  out[11] = 0;
  out[12] = v[0];
  out[13] = v[1];
  out[14] = v[2];
  out[15] = 1;
  return out;
}
/**
 * Creates a new mat4 from a dual quat.
 *
 * @param {mat4} out Matrix
 * @param {ReadonlyQuat2} a Dual Quaternion
 * @returns {mat4} mat4 receiving operation result
 */

function fromQuat2(out, a) {
  var translation = new _common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"](3);
  var bx = -a[0],
      by = -a[1],
      bz = -a[2],
      bw = a[3],
      ax = a[4],
      ay = a[5],
      az = a[6],
      aw = a[7];
  var magnitude = bx * bx + by * by + bz * bz + bw * bw; //Only scale if it makes sense

  if (magnitude > 0) {
    translation[0] = (ax * bw + aw * bx + ay * bz - az * by) * 2 / magnitude;
    translation[1] = (ay * bw + aw * by + az * bx - ax * bz) * 2 / magnitude;
    translation[2] = (az * bw + aw * bz + ax * by - ay * bx) * 2 / magnitude;
  } else {
    translation[0] = (ax * bw + aw * bx + ay * bz - az * by) * 2;
    translation[1] = (ay * bw + aw * by + az * bx - ax * bz) * 2;
    translation[2] = (az * bw + aw * bz + ax * by - ay * bx) * 2;
  }

  fromRotationTranslation(out, a, translation);
  return out;
}
/**
 * Returns the translation vector component of a transformation
 *  matrix. If a matrix is built with fromRotationTranslation,
 *  the returned vector will be the same as the translation vector
 *  originally supplied.
 * @param  {vec3} out Vector to receive translation component
 * @param  {ReadonlyMat4} mat Matrix to be decomposed (input)
 * @return {vec3} out
 */

function getTranslation(out, mat) {
  out[0] = mat[12];
  out[1] = mat[13];
  out[2] = mat[14];
  return out;
}
/**
 * Returns the scaling factor component of a transformation
 *  matrix. If a matrix is built with fromRotationTranslationScale
 *  with a normalized Quaternion paramter, the returned vector will be
 *  the same as the scaling vector
 *  originally supplied.
 * @param  {vec3} out Vector to receive scaling factor component
 * @param  {ReadonlyMat4} mat Matrix to be decomposed (input)
 * @return {vec3} out
 */

function getScaling(out, mat) {
  var m11 = mat[0];
  var m12 = mat[1];
  var m13 = mat[2];
  var m21 = mat[4];
  var m22 = mat[5];
  var m23 = mat[6];
  var m31 = mat[8];
  var m32 = mat[9];
  var m33 = mat[10];
  out[0] = Math.hypot(m11, m12, m13);
  out[1] = Math.hypot(m21, m22, m23);
  out[2] = Math.hypot(m31, m32, m33);
  return out;
}
/**
 * Returns a quaternion representing the rotational component
 *  of a transformation matrix. If a matrix is built with
 *  fromRotationTranslation, the returned quaternion will be the
 *  same as the quaternion originally supplied.
 * @param {quat} out Quaternion to receive the rotation component
 * @param {ReadonlyMat4} mat Matrix to be decomposed (input)
 * @return {quat} out
 */

function getRotation(out, mat) {
  var scaling = new _common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"](3);
  getScaling(scaling, mat);
  var is1 = 1 / scaling[0];
  var is2 = 1 / scaling[1];
  var is3 = 1 / scaling[2];
  var sm11 = mat[0] * is1;
  var sm12 = mat[1] * is2;
  var sm13 = mat[2] * is3;
  var sm21 = mat[4] * is1;
  var sm22 = mat[5] * is2;
  var sm23 = mat[6] * is3;
  var sm31 = mat[8] * is1;
  var sm32 = mat[9] * is2;
  var sm33 = mat[10] * is3;
  var trace = sm11 + sm22 + sm33;
  var S = 0;

  if (trace > 0) {
    S = Math.sqrt(trace + 1.0) * 2;
    out[3] = 0.25 * S;
    out[0] = (sm23 - sm32) / S;
    out[1] = (sm31 - sm13) / S;
    out[2] = (sm12 - sm21) / S;
  } else if (sm11 > sm22 && sm11 > sm33) {
    S = Math.sqrt(1.0 + sm11 - sm22 - sm33) * 2;
    out[3] = (sm23 - sm32) / S;
    out[0] = 0.25 * S;
    out[1] = (sm12 + sm21) / S;
    out[2] = (sm31 + sm13) / S;
  } else if (sm22 > sm33) {
    S = Math.sqrt(1.0 + sm22 - sm11 - sm33) * 2;
    out[3] = (sm31 - sm13) / S;
    out[0] = (sm12 + sm21) / S;
    out[1] = 0.25 * S;
    out[2] = (sm23 + sm32) / S;
  } else {
    S = Math.sqrt(1.0 + sm33 - sm11 - sm22) * 2;
    out[3] = (sm12 - sm21) / S;
    out[0] = (sm31 + sm13) / S;
    out[1] = (sm23 + sm32) / S;
    out[2] = 0.25 * S;
  }

  return out;
}
/**
 * Creates a matrix from a quaternion rotation, vector translation and vector scale
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     let quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *     mat4.scale(dest, scale)
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {ReadonlyVec3} v Translation vector
 * @param {ReadonlyVec3} s Scaling vector
 * @returns {mat4} out
 */

function fromRotationTranslationScale(out, q, v, s) {
  // Quaternion math
  var x = q[0],
      y = q[1],
      z = q[2],
      w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;
  var xx = x * x2;
  var xy = x * y2;
  var xz = x * z2;
  var yy = y * y2;
  var yz = y * z2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;
  var sx = s[0];
  var sy = s[1];
  var sz = s[2];
  out[0] = (1 - (yy + zz)) * sx;
  out[1] = (xy + wz) * sx;
  out[2] = (xz - wy) * sx;
  out[3] = 0;
  out[4] = (xy - wz) * sy;
  out[5] = (1 - (xx + zz)) * sy;
  out[6] = (yz + wx) * sy;
  out[7] = 0;
  out[8] = (xz + wy) * sz;
  out[9] = (yz - wx) * sz;
  out[10] = (1 - (xx + yy)) * sz;
  out[11] = 0;
  out[12] = v[0];
  out[13] = v[1];
  out[14] = v[2];
  out[15] = 1;
  return out;
}
/**
 * Creates a matrix from a quaternion rotation, vector translation and vector scale, rotating and scaling around the given origin
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     mat4.translate(dest, origin);
 *     let quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *     mat4.scale(dest, scale)
 *     mat4.translate(dest, negativeOrigin);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {ReadonlyVec3} v Translation vector
 * @param {ReadonlyVec3} s Scaling vector
 * @param {ReadonlyVec3} o The origin vector around which to scale and rotate
 * @returns {mat4} out
 */

function fromRotationTranslationScaleOrigin(out, q, v, s, o) {
  // Quaternion math
  var x = q[0],
      y = q[1],
      z = q[2],
      w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;
  var xx = x * x2;
  var xy = x * y2;
  var xz = x * z2;
  var yy = y * y2;
  var yz = y * z2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;
  var sx = s[0];
  var sy = s[1];
  var sz = s[2];
  var ox = o[0];
  var oy = o[1];
  var oz = o[2];
  var out0 = (1 - (yy + zz)) * sx;
  var out1 = (xy + wz) * sx;
  var out2 = (xz - wy) * sx;
  var out4 = (xy - wz) * sy;
  var out5 = (1 - (xx + zz)) * sy;
  var out6 = (yz + wx) * sy;
  var out8 = (xz + wy) * sz;
  var out9 = (yz - wx) * sz;
  var out10 = (1 - (xx + yy)) * sz;
  out[0] = out0;
  out[1] = out1;
  out[2] = out2;
  out[3] = 0;
  out[4] = out4;
  out[5] = out5;
  out[6] = out6;
  out[7] = 0;
  out[8] = out8;
  out[9] = out9;
  out[10] = out10;
  out[11] = 0;
  out[12] = v[0] + ox - (out0 * ox + out4 * oy + out8 * oz);
  out[13] = v[1] + oy - (out1 * ox + out5 * oy + out9 * oz);
  out[14] = v[2] + oz - (out2 * ox + out6 * oy + out10 * oz);
  out[15] = 1;
  return out;
}
/**
 * Calculates a 4x4 matrix from the given quaternion
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {ReadonlyQuat} q Quaternion to create matrix from
 *
 * @returns {mat4} out
 */

function fromQuat(out, q) {
  var x = q[0],
      y = q[1],
      z = q[2],
      w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;
  var xx = x * x2;
  var yx = y * x2;
  var yy = y * y2;
  var zx = z * x2;
  var zy = z * y2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;
  out[0] = 1 - yy - zz;
  out[1] = yx + wz;
  out[2] = zx - wy;
  out[3] = 0;
  out[4] = yx - wz;
  out[5] = 1 - xx - zz;
  out[6] = zy + wx;
  out[7] = 0;
  out[8] = zx + wy;
  out[9] = zy - wx;
  out[10] = 1 - xx - yy;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
/**
 * Generates a frustum matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {Number} left Left bound of the frustum
 * @param {Number} right Right bound of the frustum
 * @param {Number} bottom Bottom bound of the frustum
 * @param {Number} top Top bound of the frustum
 * @param {Number} near Near bound of the frustum
 * @param {Number} far Far bound of the frustum
 * @returns {mat4} out
 */

function frustum(out, left, right, bottom, top, near, far) {
  var rl = 1 / (right - left);
  var tb = 1 / (top - bottom);
  var nf = 1 / (near - far);
  out[0] = near * 2 * rl;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = near * 2 * tb;
  out[6] = 0;
  out[7] = 0;
  out[8] = (right + left) * rl;
  out[9] = (top + bottom) * tb;
  out[10] = (far + near) * nf;
  out[11] = -1;
  out[12] = 0;
  out[13] = 0;
  out[14] = far * near * 2 * nf;
  out[15] = 0;
  return out;
}
/**
 * Generates a perspective projection matrix with the given bounds.
 * Passing null/undefined/no value for far will generate infinite projection matrix.
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} fovy Vertical field of view in radians
 * @param {number} aspect Aspect ratio. typically viewport width/height
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum, can be null or Infinity
 * @returns {mat4} out
 */

function perspective(out, fovy, aspect, near, far) {
  var f = 1.0 / Math.tan(fovy / 2),
      nf;
  out[0] = f / aspect;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = f;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[11] = -1;
  out[12] = 0;
  out[13] = 0;
  out[15] = 0;

  if (far != null && far !== Infinity) {
    nf = 1 / (near - far);
    out[10] = (far + near) * nf;
    out[14] = 2 * far * near * nf;
  } else {
    out[10] = -1;
    out[14] = -2 * near;
  }

  return out;
}
/**
 * Generates a perspective projection matrix with the given field of view.
 * This is primarily useful for generating projection matrices to be used
 * with the still experiemental WebVR API.
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {Object} fov Object containing the following values: upDegrees, downDegrees, leftDegrees, rightDegrees
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */

function perspectiveFromFieldOfView(out, fov, near, far) {
  var upTan = Math.tan(fov.upDegrees * Math.PI / 180.0);
  var downTan = Math.tan(fov.downDegrees * Math.PI / 180.0);
  var leftTan = Math.tan(fov.leftDegrees * Math.PI / 180.0);
  var rightTan = Math.tan(fov.rightDegrees * Math.PI / 180.0);
  var xScale = 2.0 / (leftTan + rightTan);
  var yScale = 2.0 / (upTan + downTan);
  out[0] = xScale;
  out[1] = 0.0;
  out[2] = 0.0;
  out[3] = 0.0;
  out[4] = 0.0;
  out[5] = yScale;
  out[6] = 0.0;
  out[7] = 0.0;
  out[8] = -((leftTan - rightTan) * xScale * 0.5);
  out[9] = (upTan - downTan) * yScale * 0.5;
  out[10] = far / (near - far);
  out[11] = -1.0;
  out[12] = 0.0;
  out[13] = 0.0;
  out[14] = far * near / (near - far);
  out[15] = 0.0;
  return out;
}
/**
 * Generates a orthogonal projection matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} left Left bound of the frustum
 * @param {number} right Right bound of the frustum
 * @param {number} bottom Bottom bound of the frustum
 * @param {number} top Top bound of the frustum
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */

function ortho(out, left, right, bottom, top, near, far) {
  var lr = 1 / (left - right);
  var bt = 1 / (bottom - top);
  var nf = 1 / (near - far);
  out[0] = -2 * lr;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = -2 * bt;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 2 * nf;
  out[11] = 0;
  out[12] = (left + right) * lr;
  out[13] = (top + bottom) * bt;
  out[14] = (far + near) * nf;
  out[15] = 1;
  return out;
}
/**
 * Generates a look-at matrix with the given eye position, focal point, and up axis.
 * If you want a matrix that actually makes an object look at another object, you should use targetTo instead.
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {ReadonlyVec3} eye Position of the viewer
 * @param {ReadonlyVec3} center Point the viewer is looking at
 * @param {ReadonlyVec3} up vec3 pointing up
 * @returns {mat4} out
 */

function lookAt(out, eye, center, up) {
  var x0, x1, x2, y0, y1, y2, z0, z1, z2, len;
  var eyex = eye[0];
  var eyey = eye[1];
  var eyez = eye[2];
  var upx = up[0];
  var upy = up[1];
  var upz = up[2];
  var centerx = center[0];
  var centery = center[1];
  var centerz = center[2];

  if (Math.abs(eyex - centerx) < _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] && Math.abs(eyey - centery) < _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] && Math.abs(eyez - centerz) < _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"]) {
    return identity(out);
  }

  z0 = eyex - centerx;
  z1 = eyey - centery;
  z2 = eyez - centerz;
  len = 1 / Math.hypot(z0, z1, z2);
  z0 *= len;
  z1 *= len;
  z2 *= len;
  x0 = upy * z2 - upz * z1;
  x1 = upz * z0 - upx * z2;
  x2 = upx * z1 - upy * z0;
  len = Math.hypot(x0, x1, x2);

  if (!len) {
    x0 = 0;
    x1 = 0;
    x2 = 0;
  } else {
    len = 1 / len;
    x0 *= len;
    x1 *= len;
    x2 *= len;
  }

  y0 = z1 * x2 - z2 * x1;
  y1 = z2 * x0 - z0 * x2;
  y2 = z0 * x1 - z1 * x0;
  len = Math.hypot(y0, y1, y2);

  if (!len) {
    y0 = 0;
    y1 = 0;
    y2 = 0;
  } else {
    len = 1 / len;
    y0 *= len;
    y1 *= len;
    y2 *= len;
  }

  out[0] = x0;
  out[1] = y0;
  out[2] = z0;
  out[3] = 0;
  out[4] = x1;
  out[5] = y1;
  out[6] = z1;
  out[7] = 0;
  out[8] = x2;
  out[9] = y2;
  out[10] = z2;
  out[11] = 0;
  out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
  out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
  out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
  out[15] = 1;
  return out;
}
/**
 * Generates a matrix that makes something look at something else.
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {ReadonlyVec3} eye Position of the viewer
 * @param {ReadonlyVec3} center Point the viewer is looking at
 * @param {ReadonlyVec3} up vec3 pointing up
 * @returns {mat4} out
 */

function targetTo(out, eye, target, up) {
  var eyex = eye[0],
      eyey = eye[1],
      eyez = eye[2],
      upx = up[0],
      upy = up[1],
      upz = up[2];
  var z0 = eyex - target[0],
      z1 = eyey - target[1],
      z2 = eyez - target[2];
  var len = z0 * z0 + z1 * z1 + z2 * z2;

  if (len > 0) {
    len = 1 / Math.sqrt(len);
    z0 *= len;
    z1 *= len;
    z2 *= len;
  }

  var x0 = upy * z2 - upz * z1,
      x1 = upz * z0 - upx * z2,
      x2 = upx * z1 - upy * z0;
  len = x0 * x0 + x1 * x1 + x2 * x2;

  if (len > 0) {
    len = 1 / Math.sqrt(len);
    x0 *= len;
    x1 *= len;
    x2 *= len;
  }

  out[0] = x0;
  out[1] = x1;
  out[2] = x2;
  out[3] = 0;
  out[4] = z1 * x2 - z2 * x1;
  out[5] = z2 * x0 - z0 * x2;
  out[6] = z0 * x1 - z1 * x0;
  out[7] = 0;
  out[8] = z0;
  out[9] = z1;
  out[10] = z2;
  out[11] = 0;
  out[12] = eyex;
  out[13] = eyey;
  out[14] = eyez;
  out[15] = 1;
  return out;
}
/**
 * Returns a string representation of a mat4
 *
 * @param {ReadonlyMat4} a matrix to represent as a string
 * @returns {String} string representation of the matrix
 */

function str(a) {
  return "mat4(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4] + ", " + a[5] + ", " + a[6] + ", " + a[7] + ", " + a[8] + ", " + a[9] + ", " + a[10] + ", " + a[11] + ", " + a[12] + ", " + a[13] + ", " + a[14] + ", " + a[15] + ")";
}
/**
 * Returns Frobenius norm of a mat4
 *
 * @param {ReadonlyMat4} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */

function frob(a) {
  return Math.hypot(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8], a[9], a[10], a[11], a[12], a[13], a[14], a[15]);
}
/**
 * Adds two mat4's
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the first operand
 * @param {ReadonlyMat4} b the second operand
 * @returns {mat4} out
 */

function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  out[4] = a[4] + b[4];
  out[5] = a[5] + b[5];
  out[6] = a[6] + b[6];
  out[7] = a[7] + b[7];
  out[8] = a[8] + b[8];
  out[9] = a[9] + b[9];
  out[10] = a[10] + b[10];
  out[11] = a[11] + b[11];
  out[12] = a[12] + b[12];
  out[13] = a[13] + b[13];
  out[14] = a[14] + b[14];
  out[15] = a[15] + b[15];
  return out;
}
/**
 * Subtracts matrix b from matrix a
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the first operand
 * @param {ReadonlyMat4} b the second operand
 * @returns {mat4} out
 */

function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  out[3] = a[3] - b[3];
  out[4] = a[4] - b[4];
  out[5] = a[5] - b[5];
  out[6] = a[6] - b[6];
  out[7] = a[7] - b[7];
  out[8] = a[8] - b[8];
  out[9] = a[9] - b[9];
  out[10] = a[10] - b[10];
  out[11] = a[11] - b[11];
  out[12] = a[12] - b[12];
  out[13] = a[13] - b[13];
  out[14] = a[14] - b[14];
  out[15] = a[15] - b[15];
  return out;
}
/**
 * Multiply each element of the matrix by a scalar.
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the matrix to scale
 * @param {Number} b amount to scale the matrix's elements by
 * @returns {mat4} out
 */

function multiplyScalar(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  out[4] = a[4] * b;
  out[5] = a[5] * b;
  out[6] = a[6] * b;
  out[7] = a[7] * b;
  out[8] = a[8] * b;
  out[9] = a[9] * b;
  out[10] = a[10] * b;
  out[11] = a[11] * b;
  out[12] = a[12] * b;
  out[13] = a[13] * b;
  out[14] = a[14] * b;
  out[15] = a[15] * b;
  return out;
}
/**
 * Adds two mat4's after multiplying each element of the second operand by a scalar value.
 *
 * @param {mat4} out the receiving vector
 * @param {ReadonlyMat4} a the first operand
 * @param {ReadonlyMat4} b the second operand
 * @param {Number} scale the amount to scale b's elements by before adding
 * @returns {mat4} out
 */

function multiplyScalarAndAdd(out, a, b, scale) {
  out[0] = a[0] + b[0] * scale;
  out[1] = a[1] + b[1] * scale;
  out[2] = a[2] + b[2] * scale;
  out[3] = a[3] + b[3] * scale;
  out[4] = a[4] + b[4] * scale;
  out[5] = a[5] + b[5] * scale;
  out[6] = a[6] + b[6] * scale;
  out[7] = a[7] + b[7] * scale;
  out[8] = a[8] + b[8] * scale;
  out[9] = a[9] + b[9] * scale;
  out[10] = a[10] + b[10] * scale;
  out[11] = a[11] + b[11] * scale;
  out[12] = a[12] + b[12] * scale;
  out[13] = a[13] + b[13] * scale;
  out[14] = a[14] + b[14] * scale;
  out[15] = a[15] + b[15] * scale;
  return out;
}
/**
 * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
 *
 * @param {ReadonlyMat4} a The first matrix.
 * @param {ReadonlyMat4} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */

function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7] && a[8] === b[8] && a[9] === b[9] && a[10] === b[10] && a[11] === b[11] && a[12] === b[12] && a[13] === b[13] && a[14] === b[14] && a[15] === b[15];
}
/**
 * Returns whether or not the matrices have approximately the same elements in the same position.
 *
 * @param {ReadonlyMat4} a The first matrix.
 * @param {ReadonlyMat4} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */

function equals(a, b) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3];
  var a4 = a[4],
      a5 = a[5],
      a6 = a[6],
      a7 = a[7];
  var a8 = a[8],
      a9 = a[9],
      a10 = a[10],
      a11 = a[11];
  var a12 = a[12],
      a13 = a[13],
      a14 = a[14],
      a15 = a[15];
  var b0 = b[0],
      b1 = b[1],
      b2 = b[2],
      b3 = b[3];
  var b4 = b[4],
      b5 = b[5],
      b6 = b[6],
      b7 = b[7];
  var b8 = b[8],
      b9 = b[9],
      b10 = b[10],
      b11 = b[11];
  var b12 = b[12],
      b13 = b[13],
      b14 = b[14],
      b15 = b[15];
  return Math.abs(a0 - b0) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a3), Math.abs(b3)) && Math.abs(a4 - b4) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a4), Math.abs(b4)) && Math.abs(a5 - b5) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a5), Math.abs(b5)) && Math.abs(a6 - b6) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a6), Math.abs(b6)) && Math.abs(a7 - b7) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a7), Math.abs(b7)) && Math.abs(a8 - b8) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a8), Math.abs(b8)) && Math.abs(a9 - b9) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a9), Math.abs(b9)) && Math.abs(a10 - b10) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a10), Math.abs(b10)) && Math.abs(a11 - b11) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a11), Math.abs(b11)) && Math.abs(a12 - b12) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a12), Math.abs(b12)) && Math.abs(a13 - b13) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a13), Math.abs(b13)) && Math.abs(a14 - b14) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a14), Math.abs(b14)) && Math.abs(a15 - b15) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a15), Math.abs(b15));
}
/**
 * Alias for {@link mat4.multiply}
 * @function
 */

var mul = multiply;
/**
 * Alias for {@link mat4.subtract}
 * @function
 */

var sub = subtract;

/***/ }),

/***/ "../zogra-renderer/node_modules/gl-matrix/esm/quat.js":
/*!************************************************************!*\
  !*** ../zogra-renderer/node_modules/gl-matrix/esm/quat.js ***!
  \************************************************************/
/*! exports provided: create, identity, setAxisAngle, getAxisAngle, getAngle, multiply, rotateX, rotateY, rotateZ, calculateW, exp, ln, pow, slerp, random, invert, conjugate, fromMat3, fromEuler, str, clone, fromValues, copy, set, add, mul, scale, dot, lerp, length, len, squaredLength, sqrLen, normalize, exactEquals, equals, rotationTo, sqlerp, setAxes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create", function() { return create; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "identity", function() { return identity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setAxisAngle", function() { return setAxisAngle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAxisAngle", function() { return getAxisAngle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAngle", function() { return getAngle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "multiply", function() { return multiply; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotateX", function() { return rotateX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotateY", function() { return rotateY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotateZ", function() { return rotateZ; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "calculateW", function() { return calculateW; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "exp", function() { return exp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ln", function() { return ln; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pow", function() { return pow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "slerp", function() { return slerp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "random", function() { return random; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "invert", function() { return invert; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "conjugate", function() { return conjugate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromMat3", function() { return fromMat3; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromEuler", function() { return fromEuler; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "str", function() { return str; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clone", function() { return clone; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromValues", function() { return fromValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "copy", function() { return copy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "set", function() { return set; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "add", function() { return add; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mul", function() { return mul; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scale", function() { return scale; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dot", function() { return dot; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lerp", function() { return lerp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "length", function() { return length; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "len", function() { return len; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "squaredLength", function() { return squaredLength; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sqrLen", function() { return sqrLen; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "normalize", function() { return normalize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "exactEquals", function() { return exactEquals; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "equals", function() { return equals; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotationTo", function() { return rotationTo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sqlerp", function() { return sqlerp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setAxes", function() { return setAxes; });
/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common.js */ "../zogra-renderer/node_modules/gl-matrix/esm/common.js");
/* harmony import */ var _mat3_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mat3.js */ "../zogra-renderer/node_modules/gl-matrix/esm/mat3.js");
/* harmony import */ var _vec3_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./vec3.js */ "../zogra-renderer/node_modules/gl-matrix/esm/vec3.js");
/* harmony import */ var _vec4_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./vec4.js */ "../zogra-renderer/node_modules/gl-matrix/esm/vec4.js");




/**
 * Quaternion
 * @module quat
 */

/**
 * Creates a new identity quat
 *
 * @returns {quat} a new quaternion
 */

function create() {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"](4);

  if (_common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"] != Float32Array) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
  }

  out[3] = 1;
  return out;
}
/**
 * Set a quat to the identity quaternion
 *
 * @param {quat} out the receiving quaternion
 * @returns {quat} out
 */

function identity(out) {
  out[0] = 0;
  out[1] = 0;
  out[2] = 0;
  out[3] = 1;
  return out;
}
/**
 * Sets a quat from the given angle and rotation axis,
 * then returns it.
 *
 * @param {quat} out the receiving quaternion
 * @param {ReadonlyVec3} axis the axis around which to rotate
 * @param {Number} rad the angle in radians
 * @returns {quat} out
 **/

function setAxisAngle(out, axis, rad) {
  rad = rad * 0.5;
  var s = Math.sin(rad);
  out[0] = s * axis[0];
  out[1] = s * axis[1];
  out[2] = s * axis[2];
  out[3] = Math.cos(rad);
  return out;
}
/**
 * Gets the rotation axis and angle for a given
 *  quaternion. If a quaternion is created with
 *  setAxisAngle, this method will return the same
 *  values as providied in the original parameter list
 *  OR functionally equivalent values.
 * Example: The quaternion formed by axis [0, 0, 1] and
 *  angle -90 is the same as the quaternion formed by
 *  [0, 0, 1] and 270. This method favors the latter.
 * @param  {vec3} out_axis  Vector receiving the axis of rotation
 * @param  {ReadonlyQuat} q     Quaternion to be decomposed
 * @return {Number}     Angle, in radians, of the rotation
 */

function getAxisAngle(out_axis, q) {
  var rad = Math.acos(q[3]) * 2.0;
  var s = Math.sin(rad / 2.0);

  if (s > _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"]) {
    out_axis[0] = q[0] / s;
    out_axis[1] = q[1] / s;
    out_axis[2] = q[2] / s;
  } else {
    // If s is zero, return any axis (no rotation - axis does not matter)
    out_axis[0] = 1;
    out_axis[1] = 0;
    out_axis[2] = 0;
  }

  return rad;
}
/**
 * Gets the angular distance between two unit quaternions
 *
 * @param  {ReadonlyQuat} a     Origin unit quaternion
 * @param  {ReadonlyQuat} b     Destination unit quaternion
 * @return {Number}     Angle, in radians, between the two quaternions
 */

function getAngle(a, b) {
  var dotproduct = dot(a, b);
  return Math.acos(2 * dotproduct * dotproduct - 1);
}
/**
 * Multiplies two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {ReadonlyQuat} a the first operand
 * @param {ReadonlyQuat} b the second operand
 * @returns {quat} out
 */

function multiply(out, a, b) {
  var ax = a[0],
      ay = a[1],
      az = a[2],
      aw = a[3];
  var bx = b[0],
      by = b[1],
      bz = b[2],
      bw = b[3];
  out[0] = ax * bw + aw * bx + ay * bz - az * by;
  out[1] = ay * bw + aw * by + az * bx - ax * bz;
  out[2] = az * bw + aw * bz + ax * by - ay * bx;
  out[3] = aw * bw - ax * bx - ay * by - az * bz;
  return out;
}
/**
 * Rotates a quaternion by the given angle about the X axis
 *
 * @param {quat} out quat receiving operation result
 * @param {ReadonlyQuat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */

function rotateX(out, a, rad) {
  rad *= 0.5;
  var ax = a[0],
      ay = a[1],
      az = a[2],
      aw = a[3];
  var bx = Math.sin(rad),
      bw = Math.cos(rad);
  out[0] = ax * bw + aw * bx;
  out[1] = ay * bw + az * bx;
  out[2] = az * bw - ay * bx;
  out[3] = aw * bw - ax * bx;
  return out;
}
/**
 * Rotates a quaternion by the given angle about the Y axis
 *
 * @param {quat} out quat receiving operation result
 * @param {ReadonlyQuat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */

function rotateY(out, a, rad) {
  rad *= 0.5;
  var ax = a[0],
      ay = a[1],
      az = a[2],
      aw = a[3];
  var by = Math.sin(rad),
      bw = Math.cos(rad);
  out[0] = ax * bw - az * by;
  out[1] = ay * bw + aw * by;
  out[2] = az * bw + ax * by;
  out[3] = aw * bw - ay * by;
  return out;
}
/**
 * Rotates a quaternion by the given angle about the Z axis
 *
 * @param {quat} out quat receiving operation result
 * @param {ReadonlyQuat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */

function rotateZ(out, a, rad) {
  rad *= 0.5;
  var ax = a[0],
      ay = a[1],
      az = a[2],
      aw = a[3];
  var bz = Math.sin(rad),
      bw = Math.cos(rad);
  out[0] = ax * bw + ay * bz;
  out[1] = ay * bw - ax * bz;
  out[2] = az * bw + aw * bz;
  out[3] = aw * bw - az * bz;
  return out;
}
/**
 * Calculates the W component of a quat from the X, Y, and Z components.
 * Assumes that quaternion is 1 unit in length.
 * Any existing W component will be ignored.
 *
 * @param {quat} out the receiving quaternion
 * @param {ReadonlyQuat} a quat to calculate W component of
 * @returns {quat} out
 */

function calculateW(out, a) {
  var x = a[0],
      y = a[1],
      z = a[2];
  out[0] = x;
  out[1] = y;
  out[2] = z;
  out[3] = Math.sqrt(Math.abs(1.0 - x * x - y * y - z * z));
  return out;
}
/**
 * Calculate the exponential of a unit quaternion.
 *
 * @param {quat} out the receiving quaternion
 * @param {ReadonlyQuat} a quat to calculate the exponential of
 * @returns {quat} out
 */

function exp(out, a) {
  var x = a[0],
      y = a[1],
      z = a[2],
      w = a[3];
  var r = Math.sqrt(x * x + y * y + z * z);
  var et = Math.exp(w);
  var s = r > 0 ? et * Math.sin(r) / r : 0;
  out[0] = x * s;
  out[1] = y * s;
  out[2] = z * s;
  out[3] = et * Math.cos(r);
  return out;
}
/**
 * Calculate the natural logarithm of a unit quaternion.
 *
 * @param {quat} out the receiving quaternion
 * @param {ReadonlyQuat} a quat to calculate the exponential of
 * @returns {quat} out
 */

function ln(out, a) {
  var x = a[0],
      y = a[1],
      z = a[2],
      w = a[3];
  var r = Math.sqrt(x * x + y * y + z * z);
  var t = r > 0 ? Math.atan2(r, w) / r : 0;
  out[0] = x * t;
  out[1] = y * t;
  out[2] = z * t;
  out[3] = 0.5 * Math.log(x * x + y * y + z * z + w * w);
  return out;
}
/**
 * Calculate the scalar power of a unit quaternion.
 *
 * @param {quat} out the receiving quaternion
 * @param {ReadonlyQuat} a quat to calculate the exponential of
 * @param {Number} b amount to scale the quaternion by
 * @returns {quat} out
 */

function pow(out, a, b) {
  ln(out, a);
  scale(out, out, b);
  exp(out, out);
  return out;
}
/**
 * Performs a spherical linear interpolation between two quat
 *
 * @param {quat} out the receiving quaternion
 * @param {ReadonlyQuat} a the first operand
 * @param {ReadonlyQuat} b the second operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {quat} out
 */

function slerp(out, a, b, t) {
  // benchmarks:
  //    http://jsperf.com/quaternion-slerp-implementations
  var ax = a[0],
      ay = a[1],
      az = a[2],
      aw = a[3];
  var bx = b[0],
      by = b[1],
      bz = b[2],
      bw = b[3];
  var omega, cosom, sinom, scale0, scale1; // calc cosine

  cosom = ax * bx + ay * by + az * bz + aw * bw; // adjust signs (if necessary)

  if (cosom < 0.0) {
    cosom = -cosom;
    bx = -bx;
    by = -by;
    bz = -bz;
    bw = -bw;
  } // calculate coefficients


  if (1.0 - cosom > _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"]) {
    // standard case (slerp)
    omega = Math.acos(cosom);
    sinom = Math.sin(omega);
    scale0 = Math.sin((1.0 - t) * omega) / sinom;
    scale1 = Math.sin(t * omega) / sinom;
  } else {
    // "from" and "to" quaternions are very close
    //  ... so we can do a linear interpolation
    scale0 = 1.0 - t;
    scale1 = t;
  } // calculate final values


  out[0] = scale0 * ax + scale1 * bx;
  out[1] = scale0 * ay + scale1 * by;
  out[2] = scale0 * az + scale1 * bz;
  out[3] = scale0 * aw + scale1 * bw;
  return out;
}
/**
 * Generates a random unit quaternion
 *
 * @param {quat} out the receiving quaternion
 * @returns {quat} out
 */

function random(out) {
  // Implementation of http://planning.cs.uiuc.edu/node198.html
  // TODO: Calling random 3 times is probably not the fastest solution
  var u1 = _common_js__WEBPACK_IMPORTED_MODULE_0__["RANDOM"]();
  var u2 = _common_js__WEBPACK_IMPORTED_MODULE_0__["RANDOM"]();
  var u3 = _common_js__WEBPACK_IMPORTED_MODULE_0__["RANDOM"]();
  var sqrt1MinusU1 = Math.sqrt(1 - u1);
  var sqrtU1 = Math.sqrt(u1);
  out[0] = sqrt1MinusU1 * Math.sin(2.0 * Math.PI * u2);
  out[1] = sqrt1MinusU1 * Math.cos(2.0 * Math.PI * u2);
  out[2] = sqrtU1 * Math.sin(2.0 * Math.PI * u3);
  out[3] = sqrtU1 * Math.cos(2.0 * Math.PI * u3);
  return out;
}
/**
 * Calculates the inverse of a quat
 *
 * @param {quat} out the receiving quaternion
 * @param {ReadonlyQuat} a quat to calculate inverse of
 * @returns {quat} out
 */

function invert(out, a) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3];
  var dot = a0 * a0 + a1 * a1 + a2 * a2 + a3 * a3;
  var invDot = dot ? 1.0 / dot : 0; // TODO: Would be faster to return [0,0,0,0] immediately if dot == 0

  out[0] = -a0 * invDot;
  out[1] = -a1 * invDot;
  out[2] = -a2 * invDot;
  out[3] = a3 * invDot;
  return out;
}
/**
 * Calculates the conjugate of a quat
 * If the quaternion is normalized, this function is faster than quat.inverse and produces the same result.
 *
 * @param {quat} out the receiving quaternion
 * @param {ReadonlyQuat} a quat to calculate conjugate of
 * @returns {quat} out
 */

function conjugate(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  out[2] = -a[2];
  out[3] = a[3];
  return out;
}
/**
 * Creates a quaternion from the given 3x3 rotation matrix.
 *
 * NOTE: The resultant quaternion is not normalized, so you should be sure
 * to renormalize the quaternion yourself where necessary.
 *
 * @param {quat} out the receiving quaternion
 * @param {ReadonlyMat3} m rotation matrix
 * @returns {quat} out
 * @function
 */

function fromMat3(out, m) {
  // Algorithm in Ken Shoemake's article in 1987 SIGGRAPH course notes
  // article "Quaternion Calculus and Fast Animation".
  var fTrace = m[0] + m[4] + m[8];
  var fRoot;

  if (fTrace > 0.0) {
    // |w| > 1/2, may as well choose w > 1/2
    fRoot = Math.sqrt(fTrace + 1.0); // 2w

    out[3] = 0.5 * fRoot;
    fRoot = 0.5 / fRoot; // 1/(4w)

    out[0] = (m[5] - m[7]) * fRoot;
    out[1] = (m[6] - m[2]) * fRoot;
    out[2] = (m[1] - m[3]) * fRoot;
  } else {
    // |w| <= 1/2
    var i = 0;
    if (m[4] > m[0]) i = 1;
    if (m[8] > m[i * 3 + i]) i = 2;
    var j = (i + 1) % 3;
    var k = (i + 2) % 3;
    fRoot = Math.sqrt(m[i * 3 + i] - m[j * 3 + j] - m[k * 3 + k] + 1.0);
    out[i] = 0.5 * fRoot;
    fRoot = 0.5 / fRoot;
    out[3] = (m[j * 3 + k] - m[k * 3 + j]) * fRoot;
    out[j] = (m[j * 3 + i] + m[i * 3 + j]) * fRoot;
    out[k] = (m[k * 3 + i] + m[i * 3 + k]) * fRoot;
  }

  return out;
}
/**
 * Creates a quaternion from the given euler angle x, y, z.
 *
 * @param {quat} out the receiving quaternion
 * @param {x} Angle to rotate around X axis in degrees.
 * @param {y} Angle to rotate around Y axis in degrees.
 * @param {z} Angle to rotate around Z axis in degrees.
 * @returns {quat} out
 * @function
 */

function fromEuler(out, x, y, z) {
  var halfToRad = 0.5 * Math.PI / 180.0;
  x *= halfToRad;
  y *= halfToRad;
  z *= halfToRad;
  var sx = Math.sin(x);
  var cx = Math.cos(x);
  var sy = Math.sin(y);
  var cy = Math.cos(y);
  var sz = Math.sin(z);
  var cz = Math.cos(z);
  out[0] = sx * cy * cz - cx * sy * sz;
  out[1] = cx * sy * cz + sx * cy * sz;
  out[2] = cx * cy * sz - sx * sy * cz;
  out[3] = cx * cy * cz + sx * sy * sz;
  return out;
}
/**
 * Returns a string representation of a quatenion
 *
 * @param {ReadonlyQuat} a vector to represent as a string
 * @returns {String} string representation of the vector
 */

function str(a) {
  return "quat(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ")";
}
/**
 * Creates a new quat initialized with values from an existing quaternion
 *
 * @param {ReadonlyQuat} a quaternion to clone
 * @returns {quat} a new quaternion
 * @function
 */

var clone = _vec4_js__WEBPACK_IMPORTED_MODULE_3__["clone"];
/**
 * Creates a new quat initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {quat} a new quaternion
 * @function
 */

var fromValues = _vec4_js__WEBPACK_IMPORTED_MODULE_3__["fromValues"];
/**
 * Copy the values from one quat to another
 *
 * @param {quat} out the receiving quaternion
 * @param {ReadonlyQuat} a the source quaternion
 * @returns {quat} out
 * @function
 */

var copy = _vec4_js__WEBPACK_IMPORTED_MODULE_3__["copy"];
/**
 * Set the components of a quat to the given values
 *
 * @param {quat} out the receiving quaternion
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {quat} out
 * @function
 */

var set = _vec4_js__WEBPACK_IMPORTED_MODULE_3__["set"];
/**
 * Adds two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {ReadonlyQuat} a the first operand
 * @param {ReadonlyQuat} b the second operand
 * @returns {quat} out
 * @function
 */

var add = _vec4_js__WEBPACK_IMPORTED_MODULE_3__["add"];
/**
 * Alias for {@link quat.multiply}
 * @function
 */

var mul = multiply;
/**
 * Scales a quat by a scalar number
 *
 * @param {quat} out the receiving vector
 * @param {ReadonlyQuat} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {quat} out
 * @function
 */

var scale = _vec4_js__WEBPACK_IMPORTED_MODULE_3__["scale"];
/**
 * Calculates the dot product of two quat's
 *
 * @param {ReadonlyQuat} a the first operand
 * @param {ReadonlyQuat} b the second operand
 * @returns {Number} dot product of a and b
 * @function
 */

var dot = _vec4_js__WEBPACK_IMPORTED_MODULE_3__["dot"];
/**
 * Performs a linear interpolation between two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {ReadonlyQuat} a the first operand
 * @param {ReadonlyQuat} b the second operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {quat} out
 * @function
 */

var lerp = _vec4_js__WEBPACK_IMPORTED_MODULE_3__["lerp"];
/**
 * Calculates the length of a quat
 *
 * @param {ReadonlyQuat} a vector to calculate length of
 * @returns {Number} length of a
 */

var length = _vec4_js__WEBPACK_IMPORTED_MODULE_3__["length"];
/**
 * Alias for {@link quat.length}
 * @function
 */

var len = length;
/**
 * Calculates the squared length of a quat
 *
 * @param {ReadonlyQuat} a vector to calculate squared length of
 * @returns {Number} squared length of a
 * @function
 */

var squaredLength = _vec4_js__WEBPACK_IMPORTED_MODULE_3__["squaredLength"];
/**
 * Alias for {@link quat.squaredLength}
 * @function
 */

var sqrLen = squaredLength;
/**
 * Normalize a quat
 *
 * @param {quat} out the receiving quaternion
 * @param {ReadonlyQuat} a quaternion to normalize
 * @returns {quat} out
 * @function
 */

var normalize = _vec4_js__WEBPACK_IMPORTED_MODULE_3__["normalize"];
/**
 * Returns whether or not the quaternions have exactly the same elements in the same position (when compared with ===)
 *
 * @param {ReadonlyQuat} a The first quaternion.
 * @param {ReadonlyQuat} b The second quaternion.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */

var exactEquals = _vec4_js__WEBPACK_IMPORTED_MODULE_3__["exactEquals"];
/**
 * Returns whether or not the quaternions have approximately the same elements in the same position.
 *
 * @param {ReadonlyQuat} a The first vector.
 * @param {ReadonlyQuat} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */

var equals = _vec4_js__WEBPACK_IMPORTED_MODULE_3__["equals"];
/**
 * Sets a quaternion to represent the shortest rotation from one
 * vector to another.
 *
 * Both vectors are assumed to be unit length.
 *
 * @param {quat} out the receiving quaternion.
 * @param {ReadonlyVec3} a the initial vector
 * @param {ReadonlyVec3} b the destination vector
 * @returns {quat} out
 */

var rotationTo = function () {
  var tmpvec3 = _vec3_js__WEBPACK_IMPORTED_MODULE_2__["create"]();
  var xUnitVec3 = _vec3_js__WEBPACK_IMPORTED_MODULE_2__["fromValues"](1, 0, 0);
  var yUnitVec3 = _vec3_js__WEBPACK_IMPORTED_MODULE_2__["fromValues"](0, 1, 0);
  return function (out, a, b) {
    var dot = _vec3_js__WEBPACK_IMPORTED_MODULE_2__["dot"](a, b);

    if (dot < -0.999999) {
      _vec3_js__WEBPACK_IMPORTED_MODULE_2__["cross"](tmpvec3, xUnitVec3, a);
      if (_vec3_js__WEBPACK_IMPORTED_MODULE_2__["len"](tmpvec3) < 0.000001) _vec3_js__WEBPACK_IMPORTED_MODULE_2__["cross"](tmpvec3, yUnitVec3, a);
      _vec3_js__WEBPACK_IMPORTED_MODULE_2__["normalize"](tmpvec3, tmpvec3);
      setAxisAngle(out, tmpvec3, Math.PI);
      return out;
    } else if (dot > 0.999999) {
      out[0] = 0;
      out[1] = 0;
      out[2] = 0;
      out[3] = 1;
      return out;
    } else {
      _vec3_js__WEBPACK_IMPORTED_MODULE_2__["cross"](tmpvec3, a, b);
      out[0] = tmpvec3[0];
      out[1] = tmpvec3[1];
      out[2] = tmpvec3[2];
      out[3] = 1 + dot;
      return normalize(out, out);
    }
  };
}();
/**
 * Performs a spherical linear interpolation with two control points
 *
 * @param {quat} out the receiving quaternion
 * @param {ReadonlyQuat} a the first operand
 * @param {ReadonlyQuat} b the second operand
 * @param {ReadonlyQuat} c the third operand
 * @param {ReadonlyQuat} d the fourth operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {quat} out
 */

var sqlerp = function () {
  var temp1 = create();
  var temp2 = create();
  return function (out, a, b, c, d, t) {
    slerp(temp1, a, d, t);
    slerp(temp2, b, c, t);
    slerp(out, temp1, temp2, 2 * t * (1 - t));
    return out;
  };
}();
/**
 * Sets the specified quaternion with values corresponding to the given
 * axes. Each axis is a vec3 and is expected to be unit length and
 * perpendicular to all other specified axes.
 *
 * @param {ReadonlyVec3} view  the vector representing the viewing direction
 * @param {ReadonlyVec3} right the vector representing the local "right" direction
 * @param {ReadonlyVec3} up    the vector representing the local "up" direction
 * @returns {quat} out
 */

var setAxes = function () {
  var matr = _mat3_js__WEBPACK_IMPORTED_MODULE_1__["create"]();
  return function (out, view, right, up) {
    matr[0] = right[0];
    matr[3] = right[1];
    matr[6] = right[2];
    matr[1] = up[0];
    matr[4] = up[1];
    matr[7] = up[2];
    matr[2] = -view[0];
    matr[5] = -view[1];
    matr[8] = -view[2];
    return normalize(out, fromMat3(out, matr));
  };
}();

/***/ }),

/***/ "../zogra-renderer/node_modules/gl-matrix/esm/quat2.js":
/*!*************************************************************!*\
  !*** ../zogra-renderer/node_modules/gl-matrix/esm/quat2.js ***!
  \*************************************************************/
/*! exports provided: create, clone, fromValues, fromRotationTranslationValues, fromRotationTranslation, fromTranslation, fromRotation, fromMat4, copy, identity, set, getReal, getDual, setReal, setDual, getTranslation, translate, rotateX, rotateY, rotateZ, rotateByQuatAppend, rotateByQuatPrepend, rotateAroundAxis, add, multiply, mul, scale, dot, lerp, invert, conjugate, length, len, squaredLength, sqrLen, normalize, str, exactEquals, equals */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create", function() { return create; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clone", function() { return clone; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromValues", function() { return fromValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromRotationTranslationValues", function() { return fromRotationTranslationValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromRotationTranslation", function() { return fromRotationTranslation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromTranslation", function() { return fromTranslation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromRotation", function() { return fromRotation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromMat4", function() { return fromMat4; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "copy", function() { return copy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "identity", function() { return identity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "set", function() { return set; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getReal", function() { return getReal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDual", function() { return getDual; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setReal", function() { return setReal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setDual", function() { return setDual; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTranslation", function() { return getTranslation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "translate", function() { return translate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotateX", function() { return rotateX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotateY", function() { return rotateY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotateZ", function() { return rotateZ; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotateByQuatAppend", function() { return rotateByQuatAppend; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotateByQuatPrepend", function() { return rotateByQuatPrepend; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotateAroundAxis", function() { return rotateAroundAxis; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "add", function() { return add; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "multiply", function() { return multiply; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mul", function() { return mul; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scale", function() { return scale; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dot", function() { return dot; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lerp", function() { return lerp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "invert", function() { return invert; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "conjugate", function() { return conjugate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "length", function() { return length; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "len", function() { return len; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "squaredLength", function() { return squaredLength; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sqrLen", function() { return sqrLen; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "normalize", function() { return normalize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "str", function() { return str; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "exactEquals", function() { return exactEquals; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "equals", function() { return equals; });
/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common.js */ "../zogra-renderer/node_modules/gl-matrix/esm/common.js");
/* harmony import */ var _quat_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./quat.js */ "../zogra-renderer/node_modules/gl-matrix/esm/quat.js");
/* harmony import */ var _mat4_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mat4.js */ "../zogra-renderer/node_modules/gl-matrix/esm/mat4.js");



/**
 * Dual Quaternion<br>
 * Format: [real, dual]<br>
 * Quaternion format: XYZW<br>
 * Make sure to have normalized dual quaternions, otherwise the functions may not work as intended.<br>
 * @module quat2
 */

/**
 * Creates a new identity dual quat
 *
 * @returns {quat2} a new dual quaternion [real -> rotation, dual -> translation]
 */

function create() {
  var dq = new _common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"](8);

  if (_common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"] != Float32Array) {
    dq[0] = 0;
    dq[1] = 0;
    dq[2] = 0;
    dq[4] = 0;
    dq[5] = 0;
    dq[6] = 0;
    dq[7] = 0;
  }

  dq[3] = 1;
  return dq;
}
/**
 * Creates a new quat initialized with values from an existing quaternion
 *
 * @param {ReadonlyQuat2} a dual quaternion to clone
 * @returns {quat2} new dual quaternion
 * @function
 */

function clone(a) {
  var dq = new _common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"](8);
  dq[0] = a[0];
  dq[1] = a[1];
  dq[2] = a[2];
  dq[3] = a[3];
  dq[4] = a[4];
  dq[5] = a[5];
  dq[6] = a[6];
  dq[7] = a[7];
  return dq;
}
/**
 * Creates a new dual quat initialized with the given values
 *
 * @param {Number} x1 X component
 * @param {Number} y1 Y component
 * @param {Number} z1 Z component
 * @param {Number} w1 W component
 * @param {Number} x2 X component
 * @param {Number} y2 Y component
 * @param {Number} z2 Z component
 * @param {Number} w2 W component
 * @returns {quat2} new dual quaternion
 * @function
 */

function fromValues(x1, y1, z1, w1, x2, y2, z2, w2) {
  var dq = new _common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"](8);
  dq[0] = x1;
  dq[1] = y1;
  dq[2] = z1;
  dq[3] = w1;
  dq[4] = x2;
  dq[5] = y2;
  dq[6] = z2;
  dq[7] = w2;
  return dq;
}
/**
 * Creates a new dual quat from the given values (quat and translation)
 *
 * @param {Number} x1 X component
 * @param {Number} y1 Y component
 * @param {Number} z1 Z component
 * @param {Number} w1 W component
 * @param {Number} x2 X component (translation)
 * @param {Number} y2 Y component (translation)
 * @param {Number} z2 Z component (translation)
 * @returns {quat2} new dual quaternion
 * @function
 */

function fromRotationTranslationValues(x1, y1, z1, w1, x2, y2, z2) {
  var dq = new _common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"](8);
  dq[0] = x1;
  dq[1] = y1;
  dq[2] = z1;
  dq[3] = w1;
  var ax = x2 * 0.5,
      ay = y2 * 0.5,
      az = z2 * 0.5;
  dq[4] = ax * w1 + ay * z1 - az * y1;
  dq[5] = ay * w1 + az * x1 - ax * z1;
  dq[6] = az * w1 + ax * y1 - ay * x1;
  dq[7] = -ax * x1 - ay * y1 - az * z1;
  return dq;
}
/**
 * Creates a dual quat from a quaternion and a translation
 *
 * @param {ReadonlyQuat2} dual quaternion receiving operation result
 * @param {ReadonlyQuat} q a normalized quaternion
 * @param {ReadonlyVec3} t tranlation vector
 * @returns {quat2} dual quaternion receiving operation result
 * @function
 */

function fromRotationTranslation(out, q, t) {
  var ax = t[0] * 0.5,
      ay = t[1] * 0.5,
      az = t[2] * 0.5,
      bx = q[0],
      by = q[1],
      bz = q[2],
      bw = q[3];
  out[0] = bx;
  out[1] = by;
  out[2] = bz;
  out[3] = bw;
  out[4] = ax * bw + ay * bz - az * by;
  out[5] = ay * bw + az * bx - ax * bz;
  out[6] = az * bw + ax * by - ay * bx;
  out[7] = -ax * bx - ay * by - az * bz;
  return out;
}
/**
 * Creates a dual quat from a translation
 *
 * @param {ReadonlyQuat2} dual quaternion receiving operation result
 * @param {ReadonlyVec3} t translation vector
 * @returns {quat2} dual quaternion receiving operation result
 * @function
 */

function fromTranslation(out, t) {
  out[0] = 0;
  out[1] = 0;
  out[2] = 0;
  out[3] = 1;
  out[4] = t[0] * 0.5;
  out[5] = t[1] * 0.5;
  out[6] = t[2] * 0.5;
  out[7] = 0;
  return out;
}
/**
 * Creates a dual quat from a quaternion
 *
 * @param {ReadonlyQuat2} dual quaternion receiving operation result
 * @param {ReadonlyQuat} q the quaternion
 * @returns {quat2} dual quaternion receiving operation result
 * @function
 */

function fromRotation(out, q) {
  out[0] = q[0];
  out[1] = q[1];
  out[2] = q[2];
  out[3] = q[3];
  out[4] = 0;
  out[5] = 0;
  out[6] = 0;
  out[7] = 0;
  return out;
}
/**
 * Creates a new dual quat from a matrix (4x4)
 *
 * @param {quat2} out the dual quaternion
 * @param {ReadonlyMat4} a the matrix
 * @returns {quat2} dual quat receiving operation result
 * @function
 */

function fromMat4(out, a) {
  //TODO Optimize this
  var outer = _quat_js__WEBPACK_IMPORTED_MODULE_1__["create"]();
  _mat4_js__WEBPACK_IMPORTED_MODULE_2__["getRotation"](outer, a);
  var t = new _common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"](3);
  _mat4_js__WEBPACK_IMPORTED_MODULE_2__["getTranslation"](t, a);
  fromRotationTranslation(out, outer, t);
  return out;
}
/**
 * Copy the values from one dual quat to another
 *
 * @param {quat2} out the receiving dual quaternion
 * @param {ReadonlyQuat2} a the source dual quaternion
 * @returns {quat2} out
 * @function
 */

function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  return out;
}
/**
 * Set a dual quat to the identity dual quaternion
 *
 * @param {quat2} out the receiving quaternion
 * @returns {quat2} out
 */

function identity(out) {
  out[0] = 0;
  out[1] = 0;
  out[2] = 0;
  out[3] = 1;
  out[4] = 0;
  out[5] = 0;
  out[6] = 0;
  out[7] = 0;
  return out;
}
/**
 * Set the components of a dual quat to the given values
 *
 * @param {quat2} out the receiving quaternion
 * @param {Number} x1 X component
 * @param {Number} y1 Y component
 * @param {Number} z1 Z component
 * @param {Number} w1 W component
 * @param {Number} x2 X component
 * @param {Number} y2 Y component
 * @param {Number} z2 Z component
 * @param {Number} w2 W component
 * @returns {quat2} out
 * @function
 */

function set(out, x1, y1, z1, w1, x2, y2, z2, w2) {
  out[0] = x1;
  out[1] = y1;
  out[2] = z1;
  out[3] = w1;
  out[4] = x2;
  out[5] = y2;
  out[6] = z2;
  out[7] = w2;
  return out;
}
/**
 * Gets the real part of a dual quat
 * @param  {quat} out real part
 * @param  {ReadonlyQuat2} a Dual Quaternion
 * @return {quat} real part
 */

var getReal = _quat_js__WEBPACK_IMPORTED_MODULE_1__["copy"];
/**
 * Gets the dual part of a dual quat
 * @param  {quat} out dual part
 * @param  {ReadonlyQuat2} a Dual Quaternion
 * @return {quat} dual part
 */

function getDual(out, a) {
  out[0] = a[4];
  out[1] = a[5];
  out[2] = a[6];
  out[3] = a[7];
  return out;
}
/**
 * Set the real component of a dual quat to the given quaternion
 *
 * @param {quat2} out the receiving quaternion
 * @param {ReadonlyQuat} q a quaternion representing the real part
 * @returns {quat2} out
 * @function
 */

var setReal = _quat_js__WEBPACK_IMPORTED_MODULE_1__["copy"];
/**
 * Set the dual component of a dual quat to the given quaternion
 *
 * @param {quat2} out the receiving quaternion
 * @param {ReadonlyQuat} q a quaternion representing the dual part
 * @returns {quat2} out
 * @function
 */

function setDual(out, q) {
  out[4] = q[0];
  out[5] = q[1];
  out[6] = q[2];
  out[7] = q[3];
  return out;
}
/**
 * Gets the translation of a normalized dual quat
 * @param  {vec3} out translation
 * @param  {ReadonlyQuat2} a Dual Quaternion to be decomposed
 * @return {vec3} translation
 */

function getTranslation(out, a) {
  var ax = a[4],
      ay = a[5],
      az = a[6],
      aw = a[7],
      bx = -a[0],
      by = -a[1],
      bz = -a[2],
      bw = a[3];
  out[0] = (ax * bw + aw * bx + ay * bz - az * by) * 2;
  out[1] = (ay * bw + aw * by + az * bx - ax * bz) * 2;
  out[2] = (az * bw + aw * bz + ax * by - ay * bx) * 2;
  return out;
}
/**
 * Translates a dual quat by the given vector
 *
 * @param {quat2} out the receiving dual quaternion
 * @param {ReadonlyQuat2} a the dual quaternion to translate
 * @param {ReadonlyVec3} v vector to translate by
 * @returns {quat2} out
 */

function translate(out, a, v) {
  var ax1 = a[0],
      ay1 = a[1],
      az1 = a[2],
      aw1 = a[3],
      bx1 = v[0] * 0.5,
      by1 = v[1] * 0.5,
      bz1 = v[2] * 0.5,
      ax2 = a[4],
      ay2 = a[5],
      az2 = a[6],
      aw2 = a[7];
  out[0] = ax1;
  out[1] = ay1;
  out[2] = az1;
  out[3] = aw1;
  out[4] = aw1 * bx1 + ay1 * bz1 - az1 * by1 + ax2;
  out[5] = aw1 * by1 + az1 * bx1 - ax1 * bz1 + ay2;
  out[6] = aw1 * bz1 + ax1 * by1 - ay1 * bx1 + az2;
  out[7] = -ax1 * bx1 - ay1 * by1 - az1 * bz1 + aw2;
  return out;
}
/**
 * Rotates a dual quat around the X axis
 *
 * @param {quat2} out the receiving dual quaternion
 * @param {ReadonlyQuat2} a the dual quaternion to rotate
 * @param {number} rad how far should the rotation be
 * @returns {quat2} out
 */

function rotateX(out, a, rad) {
  var bx = -a[0],
      by = -a[1],
      bz = -a[2],
      bw = a[3],
      ax = a[4],
      ay = a[5],
      az = a[6],
      aw = a[7],
      ax1 = ax * bw + aw * bx + ay * bz - az * by,
      ay1 = ay * bw + aw * by + az * bx - ax * bz,
      az1 = az * bw + aw * bz + ax * by - ay * bx,
      aw1 = aw * bw - ax * bx - ay * by - az * bz;
  _quat_js__WEBPACK_IMPORTED_MODULE_1__["rotateX"](out, a, rad);
  bx = out[0];
  by = out[1];
  bz = out[2];
  bw = out[3];
  out[4] = ax1 * bw + aw1 * bx + ay1 * bz - az1 * by;
  out[5] = ay1 * bw + aw1 * by + az1 * bx - ax1 * bz;
  out[6] = az1 * bw + aw1 * bz + ax1 * by - ay1 * bx;
  out[7] = aw1 * bw - ax1 * bx - ay1 * by - az1 * bz;
  return out;
}
/**
 * Rotates a dual quat around the Y axis
 *
 * @param {quat2} out the receiving dual quaternion
 * @param {ReadonlyQuat2} a the dual quaternion to rotate
 * @param {number} rad how far should the rotation be
 * @returns {quat2} out
 */

function rotateY(out, a, rad) {
  var bx = -a[0],
      by = -a[1],
      bz = -a[2],
      bw = a[3],
      ax = a[4],
      ay = a[5],
      az = a[6],
      aw = a[7],
      ax1 = ax * bw + aw * bx + ay * bz - az * by,
      ay1 = ay * bw + aw * by + az * bx - ax * bz,
      az1 = az * bw + aw * bz + ax * by - ay * bx,
      aw1 = aw * bw - ax * bx - ay * by - az * bz;
  _quat_js__WEBPACK_IMPORTED_MODULE_1__["rotateY"](out, a, rad);
  bx = out[0];
  by = out[1];
  bz = out[2];
  bw = out[3];
  out[4] = ax1 * bw + aw1 * bx + ay1 * bz - az1 * by;
  out[5] = ay1 * bw + aw1 * by + az1 * bx - ax1 * bz;
  out[6] = az1 * bw + aw1 * bz + ax1 * by - ay1 * bx;
  out[7] = aw1 * bw - ax1 * bx - ay1 * by - az1 * bz;
  return out;
}
/**
 * Rotates a dual quat around the Z axis
 *
 * @param {quat2} out the receiving dual quaternion
 * @param {ReadonlyQuat2} a the dual quaternion to rotate
 * @param {number} rad how far should the rotation be
 * @returns {quat2} out
 */

function rotateZ(out, a, rad) {
  var bx = -a[0],
      by = -a[1],
      bz = -a[2],
      bw = a[3],
      ax = a[4],
      ay = a[5],
      az = a[6],
      aw = a[7],
      ax1 = ax * bw + aw * bx + ay * bz - az * by,
      ay1 = ay * bw + aw * by + az * bx - ax * bz,
      az1 = az * bw + aw * bz + ax * by - ay * bx,
      aw1 = aw * bw - ax * bx - ay * by - az * bz;
  _quat_js__WEBPACK_IMPORTED_MODULE_1__["rotateZ"](out, a, rad);
  bx = out[0];
  by = out[1];
  bz = out[2];
  bw = out[3];
  out[4] = ax1 * bw + aw1 * bx + ay1 * bz - az1 * by;
  out[5] = ay1 * bw + aw1 * by + az1 * bx - ax1 * bz;
  out[6] = az1 * bw + aw1 * bz + ax1 * by - ay1 * bx;
  out[7] = aw1 * bw - ax1 * bx - ay1 * by - az1 * bz;
  return out;
}
/**
 * Rotates a dual quat by a given quaternion (a * q)
 *
 * @param {quat2} out the receiving dual quaternion
 * @param {ReadonlyQuat2} a the dual quaternion to rotate
 * @param {ReadonlyQuat} q quaternion to rotate by
 * @returns {quat2} out
 */

function rotateByQuatAppend(out, a, q) {
  var qx = q[0],
      qy = q[1],
      qz = q[2],
      qw = q[3],
      ax = a[0],
      ay = a[1],
      az = a[2],
      aw = a[3];
  out[0] = ax * qw + aw * qx + ay * qz - az * qy;
  out[1] = ay * qw + aw * qy + az * qx - ax * qz;
  out[2] = az * qw + aw * qz + ax * qy - ay * qx;
  out[3] = aw * qw - ax * qx - ay * qy - az * qz;
  ax = a[4];
  ay = a[5];
  az = a[6];
  aw = a[7];
  out[4] = ax * qw + aw * qx + ay * qz - az * qy;
  out[5] = ay * qw + aw * qy + az * qx - ax * qz;
  out[6] = az * qw + aw * qz + ax * qy - ay * qx;
  out[7] = aw * qw - ax * qx - ay * qy - az * qz;
  return out;
}
/**
 * Rotates a dual quat by a given quaternion (q * a)
 *
 * @param {quat2} out the receiving dual quaternion
 * @param {ReadonlyQuat} q quaternion to rotate by
 * @param {ReadonlyQuat2} a the dual quaternion to rotate
 * @returns {quat2} out
 */

function rotateByQuatPrepend(out, q, a) {
  var qx = q[0],
      qy = q[1],
      qz = q[2],
      qw = q[3],
      bx = a[0],
      by = a[1],
      bz = a[2],
      bw = a[3];
  out[0] = qx * bw + qw * bx + qy * bz - qz * by;
  out[1] = qy * bw + qw * by + qz * bx - qx * bz;
  out[2] = qz * bw + qw * bz + qx * by - qy * bx;
  out[3] = qw * bw - qx * bx - qy * by - qz * bz;
  bx = a[4];
  by = a[5];
  bz = a[6];
  bw = a[7];
  out[4] = qx * bw + qw * bx + qy * bz - qz * by;
  out[5] = qy * bw + qw * by + qz * bx - qx * bz;
  out[6] = qz * bw + qw * bz + qx * by - qy * bx;
  out[7] = qw * bw - qx * bx - qy * by - qz * bz;
  return out;
}
/**
 * Rotates a dual quat around a given axis. Does the normalisation automatically
 *
 * @param {quat2} out the receiving dual quaternion
 * @param {ReadonlyQuat2} a the dual quaternion to rotate
 * @param {ReadonlyVec3} axis the axis to rotate around
 * @param {Number} rad how far the rotation should be
 * @returns {quat2} out
 */

function rotateAroundAxis(out, a, axis, rad) {
  //Special case for rad = 0
  if (Math.abs(rad) < _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"]) {
    return copy(out, a);
  }

  var axisLength = Math.hypot(axis[0], axis[1], axis[2]);
  rad = rad * 0.5;
  var s = Math.sin(rad);
  var bx = s * axis[0] / axisLength;
  var by = s * axis[1] / axisLength;
  var bz = s * axis[2] / axisLength;
  var bw = Math.cos(rad);
  var ax1 = a[0],
      ay1 = a[1],
      az1 = a[2],
      aw1 = a[3];
  out[0] = ax1 * bw + aw1 * bx + ay1 * bz - az1 * by;
  out[1] = ay1 * bw + aw1 * by + az1 * bx - ax1 * bz;
  out[2] = az1 * bw + aw1 * bz + ax1 * by - ay1 * bx;
  out[3] = aw1 * bw - ax1 * bx - ay1 * by - az1 * bz;
  var ax = a[4],
      ay = a[5],
      az = a[6],
      aw = a[7];
  out[4] = ax * bw + aw * bx + ay * bz - az * by;
  out[5] = ay * bw + aw * by + az * bx - ax * bz;
  out[6] = az * bw + aw * bz + ax * by - ay * bx;
  out[7] = aw * bw - ax * bx - ay * by - az * bz;
  return out;
}
/**
 * Adds two dual quat's
 *
 * @param {quat2} out the receiving dual quaternion
 * @param {ReadonlyQuat2} a the first operand
 * @param {ReadonlyQuat2} b the second operand
 * @returns {quat2} out
 * @function
 */

function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  out[4] = a[4] + b[4];
  out[5] = a[5] + b[5];
  out[6] = a[6] + b[6];
  out[7] = a[7] + b[7];
  return out;
}
/**
 * Multiplies two dual quat's
 *
 * @param {quat2} out the receiving dual quaternion
 * @param {ReadonlyQuat2} a the first operand
 * @param {ReadonlyQuat2} b the second operand
 * @returns {quat2} out
 */

function multiply(out, a, b) {
  var ax0 = a[0],
      ay0 = a[1],
      az0 = a[2],
      aw0 = a[3],
      bx1 = b[4],
      by1 = b[5],
      bz1 = b[6],
      bw1 = b[7],
      ax1 = a[4],
      ay1 = a[5],
      az1 = a[6],
      aw1 = a[7],
      bx0 = b[0],
      by0 = b[1],
      bz0 = b[2],
      bw0 = b[3];
  out[0] = ax0 * bw0 + aw0 * bx0 + ay0 * bz0 - az0 * by0;
  out[1] = ay0 * bw0 + aw0 * by0 + az0 * bx0 - ax0 * bz0;
  out[2] = az0 * bw0 + aw0 * bz0 + ax0 * by0 - ay0 * bx0;
  out[3] = aw0 * bw0 - ax0 * bx0 - ay0 * by0 - az0 * bz0;
  out[4] = ax0 * bw1 + aw0 * bx1 + ay0 * bz1 - az0 * by1 + ax1 * bw0 + aw1 * bx0 + ay1 * bz0 - az1 * by0;
  out[5] = ay0 * bw1 + aw0 * by1 + az0 * bx1 - ax0 * bz1 + ay1 * bw0 + aw1 * by0 + az1 * bx0 - ax1 * bz0;
  out[6] = az0 * bw1 + aw0 * bz1 + ax0 * by1 - ay0 * bx1 + az1 * bw0 + aw1 * bz0 + ax1 * by0 - ay1 * bx0;
  out[7] = aw0 * bw1 - ax0 * bx1 - ay0 * by1 - az0 * bz1 + aw1 * bw0 - ax1 * bx0 - ay1 * by0 - az1 * bz0;
  return out;
}
/**
 * Alias for {@link quat2.multiply}
 * @function
 */

var mul = multiply;
/**
 * Scales a dual quat by a scalar number
 *
 * @param {quat2} out the receiving dual quat
 * @param {ReadonlyQuat2} a the dual quat to scale
 * @param {Number} b amount to scale the dual quat by
 * @returns {quat2} out
 * @function
 */

function scale(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  out[4] = a[4] * b;
  out[5] = a[5] * b;
  out[6] = a[6] * b;
  out[7] = a[7] * b;
  return out;
}
/**
 * Calculates the dot product of two dual quat's (The dot product of the real parts)
 *
 * @param {ReadonlyQuat2} a the first operand
 * @param {ReadonlyQuat2} b the second operand
 * @returns {Number} dot product of a and b
 * @function
 */

var dot = _quat_js__WEBPACK_IMPORTED_MODULE_1__["dot"];
/**
 * Performs a linear interpolation between two dual quats's
 * NOTE: The resulting dual quaternions won't always be normalized (The error is most noticeable when t = 0.5)
 *
 * @param {quat2} out the receiving dual quat
 * @param {ReadonlyQuat2} a the first operand
 * @param {ReadonlyQuat2} b the second operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {quat2} out
 */

function lerp(out, a, b, t) {
  var mt = 1 - t;
  if (dot(a, b) < 0) t = -t;
  out[0] = a[0] * mt + b[0] * t;
  out[1] = a[1] * mt + b[1] * t;
  out[2] = a[2] * mt + b[2] * t;
  out[3] = a[3] * mt + b[3] * t;
  out[4] = a[4] * mt + b[4] * t;
  out[5] = a[5] * mt + b[5] * t;
  out[6] = a[6] * mt + b[6] * t;
  out[7] = a[7] * mt + b[7] * t;
  return out;
}
/**
 * Calculates the inverse of a dual quat. If they are normalized, conjugate is cheaper
 *
 * @param {quat2} out the receiving dual quaternion
 * @param {ReadonlyQuat2} a dual quat to calculate inverse of
 * @returns {quat2} out
 */

function invert(out, a) {
  var sqlen = squaredLength(a);
  out[0] = -a[0] / sqlen;
  out[1] = -a[1] / sqlen;
  out[2] = -a[2] / sqlen;
  out[3] = a[3] / sqlen;
  out[4] = -a[4] / sqlen;
  out[5] = -a[5] / sqlen;
  out[6] = -a[6] / sqlen;
  out[7] = a[7] / sqlen;
  return out;
}
/**
 * Calculates the conjugate of a dual quat
 * If the dual quaternion is normalized, this function is faster than quat2.inverse and produces the same result.
 *
 * @param {quat2} out the receiving quaternion
 * @param {ReadonlyQuat2} a quat to calculate conjugate of
 * @returns {quat2} out
 */

function conjugate(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  out[2] = -a[2];
  out[3] = a[3];
  out[4] = -a[4];
  out[5] = -a[5];
  out[6] = -a[6];
  out[7] = a[7];
  return out;
}
/**
 * Calculates the length of a dual quat
 *
 * @param {ReadonlyQuat2} a dual quat to calculate length of
 * @returns {Number} length of a
 * @function
 */

var length = _quat_js__WEBPACK_IMPORTED_MODULE_1__["length"];
/**
 * Alias for {@link quat2.length}
 * @function
 */

var len = length;
/**
 * Calculates the squared length of a dual quat
 *
 * @param {ReadonlyQuat2} a dual quat to calculate squared length of
 * @returns {Number} squared length of a
 * @function
 */

var squaredLength = _quat_js__WEBPACK_IMPORTED_MODULE_1__["squaredLength"];
/**
 * Alias for {@link quat2.squaredLength}
 * @function
 */

var sqrLen = squaredLength;
/**
 * Normalize a dual quat
 *
 * @param {quat2} out the receiving dual quaternion
 * @param {ReadonlyQuat2} a dual quaternion to normalize
 * @returns {quat2} out
 * @function
 */

function normalize(out, a) {
  var magnitude = squaredLength(a);

  if (magnitude > 0) {
    magnitude = Math.sqrt(magnitude);
    var a0 = a[0] / magnitude;
    var a1 = a[1] / magnitude;
    var a2 = a[2] / magnitude;
    var a3 = a[3] / magnitude;
    var b0 = a[4];
    var b1 = a[5];
    var b2 = a[6];
    var b3 = a[7];
    var a_dot_b = a0 * b0 + a1 * b1 + a2 * b2 + a3 * b3;
    out[0] = a0;
    out[1] = a1;
    out[2] = a2;
    out[3] = a3;
    out[4] = (b0 - a0 * a_dot_b) / magnitude;
    out[5] = (b1 - a1 * a_dot_b) / magnitude;
    out[6] = (b2 - a2 * a_dot_b) / magnitude;
    out[7] = (b3 - a3 * a_dot_b) / magnitude;
  }

  return out;
}
/**
 * Returns a string representation of a dual quatenion
 *
 * @param {ReadonlyQuat2} a dual quaternion to represent as a string
 * @returns {String} string representation of the dual quat
 */

function str(a) {
  return "quat2(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4] + ", " + a[5] + ", " + a[6] + ", " + a[7] + ")";
}
/**
 * Returns whether or not the dual quaternions have exactly the same elements in the same position (when compared with ===)
 *
 * @param {ReadonlyQuat2} a the first dual quaternion.
 * @param {ReadonlyQuat2} b the second dual quaternion.
 * @returns {Boolean} true if the dual quaternions are equal, false otherwise.
 */

function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7];
}
/**
 * Returns whether or not the dual quaternions have approximately the same elements in the same position.
 *
 * @param {ReadonlyQuat2} a the first dual quat.
 * @param {ReadonlyQuat2} b the second dual quat.
 * @returns {Boolean} true if the dual quats are equal, false otherwise.
 */

function equals(a, b) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3],
      a4 = a[4],
      a5 = a[5],
      a6 = a[6],
      a7 = a[7];
  var b0 = b[0],
      b1 = b[1],
      b2 = b[2],
      b3 = b[3],
      b4 = b[4],
      b5 = b[5],
      b6 = b[6],
      b7 = b[7];
  return Math.abs(a0 - b0) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a3), Math.abs(b3)) && Math.abs(a4 - b4) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a4), Math.abs(b4)) && Math.abs(a5 - b5) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a5), Math.abs(b5)) && Math.abs(a6 - b6) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a6), Math.abs(b6)) && Math.abs(a7 - b7) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a7), Math.abs(b7));
}

/***/ }),

/***/ "../zogra-renderer/node_modules/gl-matrix/esm/vec2.js":
/*!************************************************************!*\
  !*** ../zogra-renderer/node_modules/gl-matrix/esm/vec2.js ***!
  \************************************************************/
/*! exports provided: create, clone, fromValues, copy, set, add, subtract, multiply, divide, ceil, floor, min, max, round, scale, scaleAndAdd, distance, squaredDistance, length, squaredLength, negate, inverse, normalize, dot, cross, lerp, random, transformMat2, transformMat2d, transformMat3, transformMat4, rotate, angle, zero, str, exactEquals, equals, len, sub, mul, div, dist, sqrDist, sqrLen, forEach */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create", function() { return create; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clone", function() { return clone; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromValues", function() { return fromValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "copy", function() { return copy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "set", function() { return set; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "add", function() { return add; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subtract", function() { return subtract; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "multiply", function() { return multiply; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "divide", function() { return divide; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ceil", function() { return ceil; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "floor", function() { return floor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "min", function() { return min; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "max", function() { return max; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "round", function() { return round; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scale", function() { return scale; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scaleAndAdd", function() { return scaleAndAdd; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "distance", function() { return distance; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "squaredDistance", function() { return squaredDistance; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "length", function() { return length; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "squaredLength", function() { return squaredLength; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "negate", function() { return negate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "inverse", function() { return inverse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "normalize", function() { return normalize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dot", function() { return dot; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cross", function() { return cross; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lerp", function() { return lerp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "random", function() { return random; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transformMat2", function() { return transformMat2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transformMat2d", function() { return transformMat2d; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transformMat3", function() { return transformMat3; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transformMat4", function() { return transformMat4; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotate", function() { return rotate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "angle", function() { return angle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "zero", function() { return zero; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "str", function() { return str; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "exactEquals", function() { return exactEquals; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "equals", function() { return equals; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "len", function() { return len; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sub", function() { return sub; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mul", function() { return mul; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "div", function() { return div; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dist", function() { return dist; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sqrDist", function() { return sqrDist; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sqrLen", function() { return sqrLen; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "forEach", function() { return forEach; });
/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common.js */ "../zogra-renderer/node_modules/gl-matrix/esm/common.js");

/**
 * 2 Dimensional Vector
 * @module vec2
 */

/**
 * Creates a new, empty vec2
 *
 * @returns {vec2} a new 2D vector
 */

function create() {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"](2);

  if (_common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"] != Float32Array) {
    out[0] = 0;
    out[1] = 0;
  }

  return out;
}
/**
 * Creates a new vec2 initialized with values from an existing vector
 *
 * @param {ReadonlyVec2} a vector to clone
 * @returns {vec2} a new 2D vector
 */

function clone(a) {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"](2);
  out[0] = a[0];
  out[1] = a[1];
  return out;
}
/**
 * Creates a new vec2 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {vec2} a new 2D vector
 */

function fromValues(x, y) {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"](2);
  out[0] = x;
  out[1] = y;
  return out;
}
/**
 * Copy the values from one vec2 to another
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a the source vector
 * @returns {vec2} out
 */

function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  return out;
}
/**
 * Set the components of a vec2 to the given values
 *
 * @param {vec2} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {vec2} out
 */

function set(out, x, y) {
  out[0] = x;
  out[1] = y;
  return out;
}
/**
 * Adds two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a the first operand
 * @param {ReadonlyVec2} b the second operand
 * @returns {vec2} out
 */

function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  return out;
}
/**
 * Subtracts vector b from vector a
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a the first operand
 * @param {ReadonlyVec2} b the second operand
 * @returns {vec2} out
 */

function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  return out;
}
/**
 * Multiplies two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a the first operand
 * @param {ReadonlyVec2} b the second operand
 * @returns {vec2} out
 */

function multiply(out, a, b) {
  out[0] = a[0] * b[0];
  out[1] = a[1] * b[1];
  return out;
}
/**
 * Divides two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a the first operand
 * @param {ReadonlyVec2} b the second operand
 * @returns {vec2} out
 */

function divide(out, a, b) {
  out[0] = a[0] / b[0];
  out[1] = a[1] / b[1];
  return out;
}
/**
 * Math.ceil the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a vector to ceil
 * @returns {vec2} out
 */

function ceil(out, a) {
  out[0] = Math.ceil(a[0]);
  out[1] = Math.ceil(a[1]);
  return out;
}
/**
 * Math.floor the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a vector to floor
 * @returns {vec2} out
 */

function floor(out, a) {
  out[0] = Math.floor(a[0]);
  out[1] = Math.floor(a[1]);
  return out;
}
/**
 * Returns the minimum of two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a the first operand
 * @param {ReadonlyVec2} b the second operand
 * @returns {vec2} out
 */

function min(out, a, b) {
  out[0] = Math.min(a[0], b[0]);
  out[1] = Math.min(a[1], b[1]);
  return out;
}
/**
 * Returns the maximum of two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a the first operand
 * @param {ReadonlyVec2} b the second operand
 * @returns {vec2} out
 */

function max(out, a, b) {
  out[0] = Math.max(a[0], b[0]);
  out[1] = Math.max(a[1], b[1]);
  return out;
}
/**
 * Math.round the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a vector to round
 * @returns {vec2} out
 */

function round(out, a) {
  out[0] = Math.round(a[0]);
  out[1] = Math.round(a[1]);
  return out;
}
/**
 * Scales a vec2 by a scalar number
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec2} out
 */

function scale(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  return out;
}
/**
 * Adds two vec2's after scaling the second operand by a scalar value
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a the first operand
 * @param {ReadonlyVec2} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec2} out
 */

function scaleAndAdd(out, a, b, scale) {
  out[0] = a[0] + b[0] * scale;
  out[1] = a[1] + b[1] * scale;
  return out;
}
/**
 * Calculates the euclidian distance between two vec2's
 *
 * @param {ReadonlyVec2} a the first operand
 * @param {ReadonlyVec2} b the second operand
 * @returns {Number} distance between a and b
 */

function distance(a, b) {
  var x = b[0] - a[0],
      y = b[1] - a[1];
  return Math.hypot(x, y);
}
/**
 * Calculates the squared euclidian distance between two vec2's
 *
 * @param {ReadonlyVec2} a the first operand
 * @param {ReadonlyVec2} b the second operand
 * @returns {Number} squared distance between a and b
 */

function squaredDistance(a, b) {
  var x = b[0] - a[0],
      y = b[1] - a[1];
  return x * x + y * y;
}
/**
 * Calculates the length of a vec2
 *
 * @param {ReadonlyVec2} a vector to calculate length of
 * @returns {Number} length of a
 */

function length(a) {
  var x = a[0],
      y = a[1];
  return Math.hypot(x, y);
}
/**
 * Calculates the squared length of a vec2
 *
 * @param {ReadonlyVec2} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */

function squaredLength(a) {
  var x = a[0],
      y = a[1];
  return x * x + y * y;
}
/**
 * Negates the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a vector to negate
 * @returns {vec2} out
 */

function negate(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  return out;
}
/**
 * Returns the inverse of the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a vector to invert
 * @returns {vec2} out
 */

function inverse(out, a) {
  out[0] = 1.0 / a[0];
  out[1] = 1.0 / a[1];
  return out;
}
/**
 * Normalize a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a vector to normalize
 * @returns {vec2} out
 */

function normalize(out, a) {
  var x = a[0],
      y = a[1];
  var len = x * x + y * y;

  if (len > 0) {
    //TODO: evaluate use of glm_invsqrt here?
    len = 1 / Math.sqrt(len);
  }

  out[0] = a[0] * len;
  out[1] = a[1] * len;
  return out;
}
/**
 * Calculates the dot product of two vec2's
 *
 * @param {ReadonlyVec2} a the first operand
 * @param {ReadonlyVec2} b the second operand
 * @returns {Number} dot product of a and b
 */

function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1];
}
/**
 * Computes the cross product of two vec2's
 * Note that the cross product must by definition produce a 3D vector
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec2} a the first operand
 * @param {ReadonlyVec2} b the second operand
 * @returns {vec3} out
 */

function cross(out, a, b) {
  var z = a[0] * b[1] - a[1] * b[0];
  out[0] = out[1] = 0;
  out[2] = z;
  return out;
}
/**
 * Performs a linear interpolation between two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a the first operand
 * @param {ReadonlyVec2} b the second operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {vec2} out
 */

function lerp(out, a, b, t) {
  var ax = a[0],
      ay = a[1];
  out[0] = ax + t * (b[0] - ax);
  out[1] = ay + t * (b[1] - ay);
  return out;
}
/**
 * Generates a random vector with the given scale
 *
 * @param {vec2} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec2} out
 */

function random(out, scale) {
  scale = scale || 1.0;
  var r = _common_js__WEBPACK_IMPORTED_MODULE_0__["RANDOM"]() * 2.0 * Math.PI;
  out[0] = Math.cos(r) * scale;
  out[1] = Math.sin(r) * scale;
  return out;
}
/**
 * Transforms the vec2 with a mat2
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a the vector to transform
 * @param {ReadonlyMat2} m matrix to transform with
 * @returns {vec2} out
 */

function transformMat2(out, a, m) {
  var x = a[0],
      y = a[1];
  out[0] = m[0] * x + m[2] * y;
  out[1] = m[1] * x + m[3] * y;
  return out;
}
/**
 * Transforms the vec2 with a mat2d
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a the vector to transform
 * @param {ReadonlyMat2d} m matrix to transform with
 * @returns {vec2} out
 */

function transformMat2d(out, a, m) {
  var x = a[0],
      y = a[1];
  out[0] = m[0] * x + m[2] * y + m[4];
  out[1] = m[1] * x + m[3] * y + m[5];
  return out;
}
/**
 * Transforms the vec2 with a mat3
 * 3rd vector component is implicitly '1'
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a the vector to transform
 * @param {ReadonlyMat3} m matrix to transform with
 * @returns {vec2} out
 */

function transformMat3(out, a, m) {
  var x = a[0],
      y = a[1];
  out[0] = m[0] * x + m[3] * y + m[6];
  out[1] = m[1] * x + m[4] * y + m[7];
  return out;
}
/**
 * Transforms the vec2 with a mat4
 * 3rd vector component is implicitly '0'
 * 4th vector component is implicitly '1'
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a the vector to transform
 * @param {ReadonlyMat4} m matrix to transform with
 * @returns {vec2} out
 */

function transformMat4(out, a, m) {
  var x = a[0];
  var y = a[1];
  out[0] = m[0] * x + m[4] * y + m[12];
  out[1] = m[1] * x + m[5] * y + m[13];
  return out;
}
/**
 * Rotate a 2D vector
 * @param {vec2} out The receiving vec2
 * @param {ReadonlyVec2} a The vec2 point to rotate
 * @param {ReadonlyVec2} b The origin of the rotation
 * @param {Number} rad The angle of rotation in radians
 * @returns {vec2} out
 */

function rotate(out, a, b, rad) {
  //Translate point to the origin
  var p0 = a[0] - b[0],
      p1 = a[1] - b[1],
      sinC = Math.sin(rad),
      cosC = Math.cos(rad); //perform rotation and translate to correct position

  out[0] = p0 * cosC - p1 * sinC + b[0];
  out[1] = p0 * sinC + p1 * cosC + b[1];
  return out;
}
/**
 * Get the angle between two 2D vectors
 * @param {ReadonlyVec2} a The first operand
 * @param {ReadonlyVec2} b The second operand
 * @returns {Number} The angle in radians
 */

function angle(a, b) {
  var x1 = a[0],
      y1 = a[1],
      x2 = b[0],
      y2 = b[1],
      // mag is the product of the magnitudes of a and b
  mag = Math.sqrt(x1 * x1 + y1 * y1) * Math.sqrt(x2 * x2 + y2 * y2),
      // mag &&.. short circuits if mag == 0
  cosine = mag && (x1 * x2 + y1 * y2) / mag; // Math.min(Math.max(cosine, -1), 1) clamps the cosine between -1 and 1

  return Math.acos(Math.min(Math.max(cosine, -1), 1));
}
/**
 * Set the components of a vec2 to zero
 *
 * @param {vec2} out the receiving vector
 * @returns {vec2} out
 */

function zero(out) {
  out[0] = 0.0;
  out[1] = 0.0;
  return out;
}
/**
 * Returns a string representation of a vector
 *
 * @param {ReadonlyVec2} a vector to represent as a string
 * @returns {String} string representation of the vector
 */

function str(a) {
  return "vec2(" + a[0] + ", " + a[1] + ")";
}
/**
 * Returns whether or not the vectors exactly have the same elements in the same position (when compared with ===)
 *
 * @param {ReadonlyVec2} a The first vector.
 * @param {ReadonlyVec2} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */

function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1];
}
/**
 * Returns whether or not the vectors have approximately the same elements in the same position.
 *
 * @param {ReadonlyVec2} a The first vector.
 * @param {ReadonlyVec2} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */

function equals(a, b) {
  var a0 = a[0],
      a1 = a[1];
  var b0 = b[0],
      b1 = b[1];
  return Math.abs(a0 - b0) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a1), Math.abs(b1));
}
/**
 * Alias for {@link vec2.length}
 * @function
 */

var len = length;
/**
 * Alias for {@link vec2.subtract}
 * @function
 */

var sub = subtract;
/**
 * Alias for {@link vec2.multiply}
 * @function
 */

var mul = multiply;
/**
 * Alias for {@link vec2.divide}
 * @function
 */

var div = divide;
/**
 * Alias for {@link vec2.distance}
 * @function
 */

var dist = distance;
/**
 * Alias for {@link vec2.squaredDistance}
 * @function
 */

var sqrDist = squaredDistance;
/**
 * Alias for {@link vec2.squaredLength}
 * @function
 */

var sqrLen = squaredLength;
/**
 * Perform some operation over an array of vec2s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec2. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec2s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */

var forEach = function () {
  var vec = create();
  return function (a, stride, offset, count, fn, arg) {
    var i, l;

    if (!stride) {
      stride = 2;
    }

    if (!offset) {
      offset = 0;
    }

    if (count) {
      l = Math.min(count * stride + offset, a.length);
    } else {
      l = a.length;
    }

    for (i = offset; i < l; i += stride) {
      vec[0] = a[i];
      vec[1] = a[i + 1];
      fn(vec, vec, arg);
      a[i] = vec[0];
      a[i + 1] = vec[1];
    }

    return a;
  };
}();

/***/ }),

/***/ "../zogra-renderer/node_modules/gl-matrix/esm/vec3.js":
/*!************************************************************!*\
  !*** ../zogra-renderer/node_modules/gl-matrix/esm/vec3.js ***!
  \************************************************************/
/*! exports provided: create, clone, length, fromValues, copy, set, add, subtract, multiply, divide, ceil, floor, min, max, round, scale, scaleAndAdd, distance, squaredDistance, squaredLength, negate, inverse, normalize, dot, cross, lerp, hermite, bezier, random, transformMat4, transformMat3, transformQuat, rotateX, rotateY, rotateZ, angle, zero, str, exactEquals, equals, sub, mul, div, dist, sqrDist, len, sqrLen, forEach */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create", function() { return create; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clone", function() { return clone; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "length", function() { return length; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromValues", function() { return fromValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "copy", function() { return copy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "set", function() { return set; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "add", function() { return add; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subtract", function() { return subtract; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "multiply", function() { return multiply; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "divide", function() { return divide; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ceil", function() { return ceil; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "floor", function() { return floor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "min", function() { return min; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "max", function() { return max; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "round", function() { return round; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scale", function() { return scale; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scaleAndAdd", function() { return scaleAndAdd; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "distance", function() { return distance; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "squaredDistance", function() { return squaredDistance; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "squaredLength", function() { return squaredLength; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "negate", function() { return negate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "inverse", function() { return inverse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "normalize", function() { return normalize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dot", function() { return dot; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cross", function() { return cross; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lerp", function() { return lerp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hermite", function() { return hermite; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bezier", function() { return bezier; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "random", function() { return random; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transformMat4", function() { return transformMat4; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transformMat3", function() { return transformMat3; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transformQuat", function() { return transformQuat; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotateX", function() { return rotateX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotateY", function() { return rotateY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotateZ", function() { return rotateZ; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "angle", function() { return angle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "zero", function() { return zero; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "str", function() { return str; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "exactEquals", function() { return exactEquals; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "equals", function() { return equals; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sub", function() { return sub; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mul", function() { return mul; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "div", function() { return div; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dist", function() { return dist; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sqrDist", function() { return sqrDist; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "len", function() { return len; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sqrLen", function() { return sqrLen; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "forEach", function() { return forEach; });
/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common.js */ "../zogra-renderer/node_modules/gl-matrix/esm/common.js");

/**
 * 3 Dimensional Vector
 * @module vec3
 */

/**
 * Creates a new, empty vec3
 *
 * @returns {vec3} a new 3D vector
 */

function create() {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"](3);

  if (_common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"] != Float32Array) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
  }

  return out;
}
/**
 * Creates a new vec3 initialized with values from an existing vector
 *
 * @param {ReadonlyVec3} a vector to clone
 * @returns {vec3} a new 3D vector
 */

function clone(a) {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"](3);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  return out;
}
/**
 * Calculates the length of a vec3
 *
 * @param {ReadonlyVec3} a vector to calculate length of
 * @returns {Number} length of a
 */

function length(a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  return Math.hypot(x, y, z);
}
/**
 * Creates a new vec3 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} a new 3D vector
 */

function fromValues(x, y, z) {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"](3);
  out[0] = x;
  out[1] = y;
  out[2] = z;
  return out;
}
/**
 * Copy the values from one vec3 to another
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the source vector
 * @returns {vec3} out
 */

function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  return out;
}
/**
 * Set the components of a vec3 to the given values
 *
 * @param {vec3} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} out
 */

function set(out, x, y, z) {
  out[0] = x;
  out[1] = y;
  out[2] = z;
  return out;
}
/**
 * Adds two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @returns {vec3} out
 */

function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  return out;
}
/**
 * Subtracts vector b from vector a
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @returns {vec3} out
 */

function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  return out;
}
/**
 * Multiplies two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @returns {vec3} out
 */

function multiply(out, a, b) {
  out[0] = a[0] * b[0];
  out[1] = a[1] * b[1];
  out[2] = a[2] * b[2];
  return out;
}
/**
 * Divides two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @returns {vec3} out
 */

function divide(out, a, b) {
  out[0] = a[0] / b[0];
  out[1] = a[1] / b[1];
  out[2] = a[2] / b[2];
  return out;
}
/**
 * Math.ceil the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a vector to ceil
 * @returns {vec3} out
 */

function ceil(out, a) {
  out[0] = Math.ceil(a[0]);
  out[1] = Math.ceil(a[1]);
  out[2] = Math.ceil(a[2]);
  return out;
}
/**
 * Math.floor the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a vector to floor
 * @returns {vec3} out
 */

function floor(out, a) {
  out[0] = Math.floor(a[0]);
  out[1] = Math.floor(a[1]);
  out[2] = Math.floor(a[2]);
  return out;
}
/**
 * Returns the minimum of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @returns {vec3} out
 */

function min(out, a, b) {
  out[0] = Math.min(a[0], b[0]);
  out[1] = Math.min(a[1], b[1]);
  out[2] = Math.min(a[2], b[2]);
  return out;
}
/**
 * Returns the maximum of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @returns {vec3} out
 */

function max(out, a, b) {
  out[0] = Math.max(a[0], b[0]);
  out[1] = Math.max(a[1], b[1]);
  out[2] = Math.max(a[2], b[2]);
  return out;
}
/**
 * Math.round the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a vector to round
 * @returns {vec3} out
 */

function round(out, a) {
  out[0] = Math.round(a[0]);
  out[1] = Math.round(a[1]);
  out[2] = Math.round(a[2]);
  return out;
}
/**
 * Scales a vec3 by a scalar number
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec3} out
 */

function scale(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  return out;
}
/**
 * Adds two vec3's after scaling the second operand by a scalar value
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec3} out
 */

function scaleAndAdd(out, a, b, scale) {
  out[0] = a[0] + b[0] * scale;
  out[1] = a[1] + b[1] * scale;
  out[2] = a[2] + b[2] * scale;
  return out;
}
/**
 * Calculates the euclidian distance between two vec3's
 *
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @returns {Number} distance between a and b
 */

function distance(a, b) {
  var x = b[0] - a[0];
  var y = b[1] - a[1];
  var z = b[2] - a[2];
  return Math.hypot(x, y, z);
}
/**
 * Calculates the squared euclidian distance between two vec3's
 *
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @returns {Number} squared distance between a and b
 */

function squaredDistance(a, b) {
  var x = b[0] - a[0];
  var y = b[1] - a[1];
  var z = b[2] - a[2];
  return x * x + y * y + z * z;
}
/**
 * Calculates the squared length of a vec3
 *
 * @param {ReadonlyVec3} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */

function squaredLength(a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  return x * x + y * y + z * z;
}
/**
 * Negates the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a vector to negate
 * @returns {vec3} out
 */

function negate(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  out[2] = -a[2];
  return out;
}
/**
 * Returns the inverse of the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a vector to invert
 * @returns {vec3} out
 */

function inverse(out, a) {
  out[0] = 1.0 / a[0];
  out[1] = 1.0 / a[1];
  out[2] = 1.0 / a[2];
  return out;
}
/**
 * Normalize a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a vector to normalize
 * @returns {vec3} out
 */

function normalize(out, a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  var len = x * x + y * y + z * z;

  if (len > 0) {
    //TODO: evaluate use of glm_invsqrt here?
    len = 1 / Math.sqrt(len);
  }

  out[0] = a[0] * len;
  out[1] = a[1] * len;
  out[2] = a[2] * len;
  return out;
}
/**
 * Calculates the dot product of two vec3's
 *
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @returns {Number} dot product of a and b
 */

function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}
/**
 * Computes the cross product of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @returns {vec3} out
 */

function cross(out, a, b) {
  var ax = a[0],
      ay = a[1],
      az = a[2];
  var bx = b[0],
      by = b[1],
      bz = b[2];
  out[0] = ay * bz - az * by;
  out[1] = az * bx - ax * bz;
  out[2] = ax * by - ay * bx;
  return out;
}
/**
 * Performs a linear interpolation between two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {vec3} out
 */

function lerp(out, a, b, t) {
  var ax = a[0];
  var ay = a[1];
  var az = a[2];
  out[0] = ax + t * (b[0] - ax);
  out[1] = ay + t * (b[1] - ay);
  out[2] = az + t * (b[2] - az);
  return out;
}
/**
 * Performs a hermite interpolation with two control points
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @param {ReadonlyVec3} c the third operand
 * @param {ReadonlyVec3} d the fourth operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {vec3} out
 */

function hermite(out, a, b, c, d, t) {
  var factorTimes2 = t * t;
  var factor1 = factorTimes2 * (2 * t - 3) + 1;
  var factor2 = factorTimes2 * (t - 2) + t;
  var factor3 = factorTimes2 * (t - 1);
  var factor4 = factorTimes2 * (3 - 2 * t);
  out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
  out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
  out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;
  return out;
}
/**
 * Performs a bezier interpolation with two control points
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @param {ReadonlyVec3} c the third operand
 * @param {ReadonlyVec3} d the fourth operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {vec3} out
 */

function bezier(out, a, b, c, d, t) {
  var inverseFactor = 1 - t;
  var inverseFactorTimesTwo = inverseFactor * inverseFactor;
  var factorTimes2 = t * t;
  var factor1 = inverseFactorTimesTwo * inverseFactor;
  var factor2 = 3 * t * inverseFactorTimesTwo;
  var factor3 = 3 * factorTimes2 * inverseFactor;
  var factor4 = factorTimes2 * t;
  out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
  out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
  out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;
  return out;
}
/**
 * Generates a random vector with the given scale
 *
 * @param {vec3} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec3} out
 */

function random(out, scale) {
  scale = scale || 1.0;
  var r = _common_js__WEBPACK_IMPORTED_MODULE_0__["RANDOM"]() * 2.0 * Math.PI;
  var z = _common_js__WEBPACK_IMPORTED_MODULE_0__["RANDOM"]() * 2.0 - 1.0;
  var zScale = Math.sqrt(1.0 - z * z) * scale;
  out[0] = Math.cos(r) * zScale;
  out[1] = Math.sin(r) * zScale;
  out[2] = z * scale;
  return out;
}
/**
 * Transforms the vec3 with a mat4.
 * 4th vector component is implicitly '1'
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the vector to transform
 * @param {ReadonlyMat4} m matrix to transform with
 * @returns {vec3} out
 */

function transformMat4(out, a, m) {
  var x = a[0],
      y = a[1],
      z = a[2];
  var w = m[3] * x + m[7] * y + m[11] * z + m[15];
  w = w || 1.0;
  out[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w;
  out[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w;
  out[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;
  return out;
}
/**
 * Transforms the vec3 with a mat3.
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the vector to transform
 * @param {ReadonlyMat3} m the 3x3 matrix to transform with
 * @returns {vec3} out
 */

function transformMat3(out, a, m) {
  var x = a[0],
      y = a[1],
      z = a[2];
  out[0] = x * m[0] + y * m[3] + z * m[6];
  out[1] = x * m[1] + y * m[4] + z * m[7];
  out[2] = x * m[2] + y * m[5] + z * m[8];
  return out;
}
/**
 * Transforms the vec3 with a quat
 * Can also be used for dual quaternions. (Multiply it with the real part)
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the vector to transform
 * @param {ReadonlyQuat} q quaternion to transform with
 * @returns {vec3} out
 */

function transformQuat(out, a, q) {
  // benchmarks: https://jsperf.com/quaternion-transform-vec3-implementations-fixed
  var qx = q[0],
      qy = q[1],
      qz = q[2],
      qw = q[3];
  var x = a[0],
      y = a[1],
      z = a[2]; // var qvec = [qx, qy, qz];
  // var uv = vec3.cross([], qvec, a);

  var uvx = qy * z - qz * y,
      uvy = qz * x - qx * z,
      uvz = qx * y - qy * x; // var uuv = vec3.cross([], qvec, uv);

  var uuvx = qy * uvz - qz * uvy,
      uuvy = qz * uvx - qx * uvz,
      uuvz = qx * uvy - qy * uvx; // vec3.scale(uv, uv, 2 * w);

  var w2 = qw * 2;
  uvx *= w2;
  uvy *= w2;
  uvz *= w2; // vec3.scale(uuv, uuv, 2);

  uuvx *= 2;
  uuvy *= 2;
  uuvz *= 2; // return vec3.add(out, a, vec3.add(out, uv, uuv));

  out[0] = x + uvx + uuvx;
  out[1] = y + uvy + uuvy;
  out[2] = z + uvz + uuvz;
  return out;
}
/**
 * Rotate a 3D vector around the x-axis
 * @param {vec3} out The receiving vec3
 * @param {ReadonlyVec3} a The vec3 point to rotate
 * @param {ReadonlyVec3} b The origin of the rotation
 * @param {Number} rad The angle of rotation in radians
 * @returns {vec3} out
 */

function rotateX(out, a, b, rad) {
  var p = [],
      r = []; //Translate point to the origin

  p[0] = a[0] - b[0];
  p[1] = a[1] - b[1];
  p[2] = a[2] - b[2]; //perform rotation

  r[0] = p[0];
  r[1] = p[1] * Math.cos(rad) - p[2] * Math.sin(rad);
  r[2] = p[1] * Math.sin(rad) + p[2] * Math.cos(rad); //translate to correct position

  out[0] = r[0] + b[0];
  out[1] = r[1] + b[1];
  out[2] = r[2] + b[2];
  return out;
}
/**
 * Rotate a 3D vector around the y-axis
 * @param {vec3} out The receiving vec3
 * @param {ReadonlyVec3} a The vec3 point to rotate
 * @param {ReadonlyVec3} b The origin of the rotation
 * @param {Number} rad The angle of rotation in radians
 * @returns {vec3} out
 */

function rotateY(out, a, b, rad) {
  var p = [],
      r = []; //Translate point to the origin

  p[0] = a[0] - b[0];
  p[1] = a[1] - b[1];
  p[2] = a[2] - b[2]; //perform rotation

  r[0] = p[2] * Math.sin(rad) + p[0] * Math.cos(rad);
  r[1] = p[1];
  r[2] = p[2] * Math.cos(rad) - p[0] * Math.sin(rad); //translate to correct position

  out[0] = r[0] + b[0];
  out[1] = r[1] + b[1];
  out[2] = r[2] + b[2];
  return out;
}
/**
 * Rotate a 3D vector around the z-axis
 * @param {vec3} out The receiving vec3
 * @param {ReadonlyVec3} a The vec3 point to rotate
 * @param {ReadonlyVec3} b The origin of the rotation
 * @param {Number} rad The angle of rotation in radians
 * @returns {vec3} out
 */

function rotateZ(out, a, b, rad) {
  var p = [],
      r = []; //Translate point to the origin

  p[0] = a[0] - b[0];
  p[1] = a[1] - b[1];
  p[2] = a[2] - b[2]; //perform rotation

  r[0] = p[0] * Math.cos(rad) - p[1] * Math.sin(rad);
  r[1] = p[0] * Math.sin(rad) + p[1] * Math.cos(rad);
  r[2] = p[2]; //translate to correct position

  out[0] = r[0] + b[0];
  out[1] = r[1] + b[1];
  out[2] = r[2] + b[2];
  return out;
}
/**
 * Get the angle between two 3D vectors
 * @param {ReadonlyVec3} a The first operand
 * @param {ReadonlyVec3} b The second operand
 * @returns {Number} The angle in radians
 */

function angle(a, b) {
  var ax = a[0],
      ay = a[1],
      az = a[2],
      bx = b[0],
      by = b[1],
      bz = b[2],
      mag1 = Math.sqrt(ax * ax + ay * ay + az * az),
      mag2 = Math.sqrt(bx * bx + by * by + bz * bz),
      mag = mag1 * mag2,
      cosine = mag && dot(a, b) / mag;
  return Math.acos(Math.min(Math.max(cosine, -1), 1));
}
/**
 * Set the components of a vec3 to zero
 *
 * @param {vec3} out the receiving vector
 * @returns {vec3} out
 */

function zero(out) {
  out[0] = 0.0;
  out[1] = 0.0;
  out[2] = 0.0;
  return out;
}
/**
 * Returns a string representation of a vector
 *
 * @param {ReadonlyVec3} a vector to represent as a string
 * @returns {String} string representation of the vector
 */

function str(a) {
  return "vec3(" + a[0] + ", " + a[1] + ", " + a[2] + ")";
}
/**
 * Returns whether or not the vectors have exactly the same elements in the same position (when compared with ===)
 *
 * @param {ReadonlyVec3} a The first vector.
 * @param {ReadonlyVec3} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */

function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
}
/**
 * Returns whether or not the vectors have approximately the same elements in the same position.
 *
 * @param {ReadonlyVec3} a The first vector.
 * @param {ReadonlyVec3} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */

function equals(a, b) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2];
  var b0 = b[0],
      b1 = b[1],
      b2 = b[2];
  return Math.abs(a0 - b0) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a2), Math.abs(b2));
}
/**
 * Alias for {@link vec3.subtract}
 * @function
 */

var sub = subtract;
/**
 * Alias for {@link vec3.multiply}
 * @function
 */

var mul = multiply;
/**
 * Alias for {@link vec3.divide}
 * @function
 */

var div = divide;
/**
 * Alias for {@link vec3.distance}
 * @function
 */

var dist = distance;
/**
 * Alias for {@link vec3.squaredDistance}
 * @function
 */

var sqrDist = squaredDistance;
/**
 * Alias for {@link vec3.length}
 * @function
 */

var len = length;
/**
 * Alias for {@link vec3.squaredLength}
 * @function
 */

var sqrLen = squaredLength;
/**
 * Perform some operation over an array of vec3s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec3. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec3s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */

var forEach = function () {
  var vec = create();
  return function (a, stride, offset, count, fn, arg) {
    var i, l;

    if (!stride) {
      stride = 3;
    }

    if (!offset) {
      offset = 0;
    }

    if (count) {
      l = Math.min(count * stride + offset, a.length);
    } else {
      l = a.length;
    }

    for (i = offset; i < l; i += stride) {
      vec[0] = a[i];
      vec[1] = a[i + 1];
      vec[2] = a[i + 2];
      fn(vec, vec, arg);
      a[i] = vec[0];
      a[i + 1] = vec[1];
      a[i + 2] = vec[2];
    }

    return a;
  };
}();

/***/ }),

/***/ "../zogra-renderer/node_modules/gl-matrix/esm/vec4.js":
/*!************************************************************!*\
  !*** ../zogra-renderer/node_modules/gl-matrix/esm/vec4.js ***!
  \************************************************************/
/*! exports provided: create, clone, fromValues, copy, set, add, subtract, multiply, divide, ceil, floor, min, max, round, scale, scaleAndAdd, distance, squaredDistance, length, squaredLength, negate, inverse, normalize, dot, cross, lerp, random, transformMat4, transformQuat, zero, str, exactEquals, equals, sub, mul, div, dist, sqrDist, len, sqrLen, forEach */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create", function() { return create; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clone", function() { return clone; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromValues", function() { return fromValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "copy", function() { return copy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "set", function() { return set; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "add", function() { return add; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subtract", function() { return subtract; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "multiply", function() { return multiply; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "divide", function() { return divide; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ceil", function() { return ceil; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "floor", function() { return floor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "min", function() { return min; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "max", function() { return max; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "round", function() { return round; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scale", function() { return scale; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scaleAndAdd", function() { return scaleAndAdd; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "distance", function() { return distance; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "squaredDistance", function() { return squaredDistance; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "length", function() { return length; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "squaredLength", function() { return squaredLength; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "negate", function() { return negate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "inverse", function() { return inverse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "normalize", function() { return normalize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dot", function() { return dot; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cross", function() { return cross; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lerp", function() { return lerp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "random", function() { return random; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transformMat4", function() { return transformMat4; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transformQuat", function() { return transformQuat; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "zero", function() { return zero; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "str", function() { return str; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "exactEquals", function() { return exactEquals; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "equals", function() { return equals; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sub", function() { return sub; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mul", function() { return mul; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "div", function() { return div; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dist", function() { return dist; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sqrDist", function() { return sqrDist; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "len", function() { return len; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sqrLen", function() { return sqrLen; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "forEach", function() { return forEach; });
/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common.js */ "../zogra-renderer/node_modules/gl-matrix/esm/common.js");

/**
 * 4 Dimensional Vector
 * @module vec4
 */

/**
 * Creates a new, empty vec4
 *
 * @returns {vec4} a new 4D vector
 */

function create() {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"](4);

  if (_common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"] != Float32Array) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
  }

  return out;
}
/**
 * Creates a new vec4 initialized with values from an existing vector
 *
 * @param {ReadonlyVec4} a vector to clone
 * @returns {vec4} a new 4D vector
 */

function clone(a) {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"](4);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  return out;
}
/**
 * Creates a new vec4 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {vec4} a new 4D vector
 */

function fromValues(x, y, z, w) {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"](4);
  out[0] = x;
  out[1] = y;
  out[2] = z;
  out[3] = w;
  return out;
}
/**
 * Copy the values from one vec4 to another
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the source vector
 * @returns {vec4} out
 */

function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  return out;
}
/**
 * Set the components of a vec4 to the given values
 *
 * @param {vec4} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {vec4} out
 */

function set(out, x, y, z, w) {
  out[0] = x;
  out[1] = y;
  out[2] = z;
  out[3] = w;
  return out;
}
/**
 * Adds two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the first operand
 * @param {ReadonlyVec4} b the second operand
 * @returns {vec4} out
 */

function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  return out;
}
/**
 * Subtracts vector b from vector a
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the first operand
 * @param {ReadonlyVec4} b the second operand
 * @returns {vec4} out
 */

function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  out[3] = a[3] - b[3];
  return out;
}
/**
 * Multiplies two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the first operand
 * @param {ReadonlyVec4} b the second operand
 * @returns {vec4} out
 */

function multiply(out, a, b) {
  out[0] = a[0] * b[0];
  out[1] = a[1] * b[1];
  out[2] = a[2] * b[2];
  out[3] = a[3] * b[3];
  return out;
}
/**
 * Divides two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the first operand
 * @param {ReadonlyVec4} b the second operand
 * @returns {vec4} out
 */

function divide(out, a, b) {
  out[0] = a[0] / b[0];
  out[1] = a[1] / b[1];
  out[2] = a[2] / b[2];
  out[3] = a[3] / b[3];
  return out;
}
/**
 * Math.ceil the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a vector to ceil
 * @returns {vec4} out
 */

function ceil(out, a) {
  out[0] = Math.ceil(a[0]);
  out[1] = Math.ceil(a[1]);
  out[2] = Math.ceil(a[2]);
  out[3] = Math.ceil(a[3]);
  return out;
}
/**
 * Math.floor the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a vector to floor
 * @returns {vec4} out
 */

function floor(out, a) {
  out[0] = Math.floor(a[0]);
  out[1] = Math.floor(a[1]);
  out[2] = Math.floor(a[2]);
  out[3] = Math.floor(a[3]);
  return out;
}
/**
 * Returns the minimum of two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the first operand
 * @param {ReadonlyVec4} b the second operand
 * @returns {vec4} out
 */

function min(out, a, b) {
  out[0] = Math.min(a[0], b[0]);
  out[1] = Math.min(a[1], b[1]);
  out[2] = Math.min(a[2], b[2]);
  out[3] = Math.min(a[3], b[3]);
  return out;
}
/**
 * Returns the maximum of two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the first operand
 * @param {ReadonlyVec4} b the second operand
 * @returns {vec4} out
 */

function max(out, a, b) {
  out[0] = Math.max(a[0], b[0]);
  out[1] = Math.max(a[1], b[1]);
  out[2] = Math.max(a[2], b[2]);
  out[3] = Math.max(a[3], b[3]);
  return out;
}
/**
 * Math.round the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a vector to round
 * @returns {vec4} out
 */

function round(out, a) {
  out[0] = Math.round(a[0]);
  out[1] = Math.round(a[1]);
  out[2] = Math.round(a[2]);
  out[3] = Math.round(a[3]);
  return out;
}
/**
 * Scales a vec4 by a scalar number
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec4} out
 */

function scale(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  return out;
}
/**
 * Adds two vec4's after scaling the second operand by a scalar value
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the first operand
 * @param {ReadonlyVec4} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec4} out
 */

function scaleAndAdd(out, a, b, scale) {
  out[0] = a[0] + b[0] * scale;
  out[1] = a[1] + b[1] * scale;
  out[2] = a[2] + b[2] * scale;
  out[3] = a[3] + b[3] * scale;
  return out;
}
/**
 * Calculates the euclidian distance between two vec4's
 *
 * @param {ReadonlyVec4} a the first operand
 * @param {ReadonlyVec4} b the second operand
 * @returns {Number} distance between a and b
 */

function distance(a, b) {
  var x = b[0] - a[0];
  var y = b[1] - a[1];
  var z = b[2] - a[2];
  var w = b[3] - a[3];
  return Math.hypot(x, y, z, w);
}
/**
 * Calculates the squared euclidian distance between two vec4's
 *
 * @param {ReadonlyVec4} a the first operand
 * @param {ReadonlyVec4} b the second operand
 * @returns {Number} squared distance between a and b
 */

function squaredDistance(a, b) {
  var x = b[0] - a[0];
  var y = b[1] - a[1];
  var z = b[2] - a[2];
  var w = b[3] - a[3];
  return x * x + y * y + z * z + w * w;
}
/**
 * Calculates the length of a vec4
 *
 * @param {ReadonlyVec4} a vector to calculate length of
 * @returns {Number} length of a
 */

function length(a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  var w = a[3];
  return Math.hypot(x, y, z, w);
}
/**
 * Calculates the squared length of a vec4
 *
 * @param {ReadonlyVec4} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */

function squaredLength(a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  var w = a[3];
  return x * x + y * y + z * z + w * w;
}
/**
 * Negates the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a vector to negate
 * @returns {vec4} out
 */

function negate(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  out[2] = -a[2];
  out[3] = -a[3];
  return out;
}
/**
 * Returns the inverse of the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a vector to invert
 * @returns {vec4} out
 */

function inverse(out, a) {
  out[0] = 1.0 / a[0];
  out[1] = 1.0 / a[1];
  out[2] = 1.0 / a[2];
  out[3] = 1.0 / a[3];
  return out;
}
/**
 * Normalize a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a vector to normalize
 * @returns {vec4} out
 */

function normalize(out, a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  var w = a[3];
  var len = x * x + y * y + z * z + w * w;

  if (len > 0) {
    len = 1 / Math.sqrt(len);
  }

  out[0] = x * len;
  out[1] = y * len;
  out[2] = z * len;
  out[3] = w * len;
  return out;
}
/**
 * Calculates the dot product of two vec4's
 *
 * @param {ReadonlyVec4} a the first operand
 * @param {ReadonlyVec4} b the second operand
 * @returns {Number} dot product of a and b
 */

function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
}
/**
 * Returns the cross-product of three vectors in a 4-dimensional space
 *
 * @param {ReadonlyVec4} result the receiving vector
 * @param {ReadonlyVec4} U the first vector
 * @param {ReadonlyVec4} V the second vector
 * @param {ReadonlyVec4} W the third vector
 * @returns {vec4} result
 */

function cross(out, u, v, w) {
  var A = v[0] * w[1] - v[1] * w[0],
      B = v[0] * w[2] - v[2] * w[0],
      C = v[0] * w[3] - v[3] * w[0],
      D = v[1] * w[2] - v[2] * w[1],
      E = v[1] * w[3] - v[3] * w[1],
      F = v[2] * w[3] - v[3] * w[2];
  var G = u[0];
  var H = u[1];
  var I = u[2];
  var J = u[3];
  out[0] = H * F - I * E + J * D;
  out[1] = -(G * F) + I * C - J * B;
  out[2] = G * E - H * C + J * A;
  out[3] = -(G * D) + H * B - I * A;
  return out;
}
/**
 * Performs a linear interpolation between two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the first operand
 * @param {ReadonlyVec4} b the second operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {vec4} out
 */

function lerp(out, a, b, t) {
  var ax = a[0];
  var ay = a[1];
  var az = a[2];
  var aw = a[3];
  out[0] = ax + t * (b[0] - ax);
  out[1] = ay + t * (b[1] - ay);
  out[2] = az + t * (b[2] - az);
  out[3] = aw + t * (b[3] - aw);
  return out;
}
/**
 * Generates a random vector with the given scale
 *
 * @param {vec4} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec4} out
 */

function random(out, scale) {
  scale = scale || 1.0; // Marsaglia, George. Choosing a Point from the Surface of a
  // Sphere. Ann. Math. Statist. 43 (1972), no. 2, 645--646.
  // http://projecteuclid.org/euclid.aoms/1177692644;

  var v1, v2, v3, v4;
  var s1, s2;

  do {
    v1 = _common_js__WEBPACK_IMPORTED_MODULE_0__["RANDOM"]() * 2 - 1;
    v2 = _common_js__WEBPACK_IMPORTED_MODULE_0__["RANDOM"]() * 2 - 1;
    s1 = v1 * v1 + v2 * v2;
  } while (s1 >= 1);

  do {
    v3 = _common_js__WEBPACK_IMPORTED_MODULE_0__["RANDOM"]() * 2 - 1;
    v4 = _common_js__WEBPACK_IMPORTED_MODULE_0__["RANDOM"]() * 2 - 1;
    s2 = v3 * v3 + v4 * v4;
  } while (s2 >= 1);

  var d = Math.sqrt((1 - s1) / s2);
  out[0] = scale * v1;
  out[1] = scale * v2;
  out[2] = scale * v3 * d;
  out[3] = scale * v4 * d;
  return out;
}
/**
 * Transforms the vec4 with a mat4.
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the vector to transform
 * @param {ReadonlyMat4} m matrix to transform with
 * @returns {vec4} out
 */

function transformMat4(out, a, m) {
  var x = a[0],
      y = a[1],
      z = a[2],
      w = a[3];
  out[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
  out[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
  out[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
  out[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w;
  return out;
}
/**
 * Transforms the vec4 with a quat
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the vector to transform
 * @param {ReadonlyQuat} q quaternion to transform with
 * @returns {vec4} out
 */

function transformQuat(out, a, q) {
  var x = a[0],
      y = a[1],
      z = a[2];
  var qx = q[0],
      qy = q[1],
      qz = q[2],
      qw = q[3]; // calculate quat * vec

  var ix = qw * x + qy * z - qz * y;
  var iy = qw * y + qz * x - qx * z;
  var iz = qw * z + qx * y - qy * x;
  var iw = -qx * x - qy * y - qz * z; // calculate result * inverse quat

  out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
  out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
  out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
  out[3] = a[3];
  return out;
}
/**
 * Set the components of a vec4 to zero
 *
 * @param {vec4} out the receiving vector
 * @returns {vec4} out
 */

function zero(out) {
  out[0] = 0.0;
  out[1] = 0.0;
  out[2] = 0.0;
  out[3] = 0.0;
  return out;
}
/**
 * Returns a string representation of a vector
 *
 * @param {ReadonlyVec4} a vector to represent as a string
 * @returns {String} string representation of the vector
 */

function str(a) {
  return "vec4(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ")";
}
/**
 * Returns whether or not the vectors have exactly the same elements in the same position (when compared with ===)
 *
 * @param {ReadonlyVec4} a The first vector.
 * @param {ReadonlyVec4} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */

function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
}
/**
 * Returns whether or not the vectors have approximately the same elements in the same position.
 *
 * @param {ReadonlyVec4} a The first vector.
 * @param {ReadonlyVec4} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */

function equals(a, b) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3];
  var b0 = b[0],
      b1 = b[1],
      b2 = b[2],
      b3 = b[3];
  return Math.abs(a0 - b0) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a3), Math.abs(b3));
}
/**
 * Alias for {@link vec4.subtract}
 * @function
 */

var sub = subtract;
/**
 * Alias for {@link vec4.multiply}
 * @function
 */

var mul = multiply;
/**
 * Alias for {@link vec4.divide}
 * @function
 */

var div = divide;
/**
 * Alias for {@link vec4.distance}
 * @function
 */

var dist = distance;
/**
 * Alias for {@link vec4.squaredDistance}
 * @function
 */

var sqrDist = squaredDistance;
/**
 * Alias for {@link vec4.length}
 * @function
 */

var len = length;
/**
 * Alias for {@link vec4.squaredLength}
 * @function
 */

var sqrLen = squaredLength;
/**
 * Perform some operation over an array of vec4s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec4. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec4s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */

var forEach = function () {
  var vec = create();
  return function (a, stride, offset, count, fn, arg) {
    var i, l;

    if (!stride) {
      stride = 4;
    }

    if (!offset) {
      offset = 0;
    }

    if (count) {
      l = Math.min(count * stride + offset, a.length);
    } else {
      l = a.length;
    }

    for (i = offset; i < l; i += stride) {
      vec[0] = a[i];
      vec[1] = a[i + 1];
      vec[2] = a[i + 2];
      vec[3] = a[i + 3];
      fn(vec, vec, arg);
      a[i] = vec[0];
      a[i + 1] = vec[1];
      a[i + 2] = vec[2];
      a[i + 3] = vec[3];
    }

    return a;
  };
}();

/***/ }),

/***/ "../zogra-renderer/node_modules/reflect-metadata/Reflect.js":
/*!******************************************************************!*\
  !*** ../zogra-renderer/node_modules/reflect-metadata/Reflect.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process, global) {/*! *****************************************************************************
Copyright (C) Microsoft. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
var Reflect;
(function (Reflect) {
    // Metadata Proposal
    // https://rbuckton.github.io/reflect-metadata/
    (function (factory) {
        var root = typeof global === "object" ? global :
            typeof self === "object" ? self :
                typeof this === "object" ? this :
                    Function("return this;")();
        var exporter = makeExporter(Reflect);
        if (typeof root.Reflect === "undefined") {
            root.Reflect = Reflect;
        }
        else {
            exporter = makeExporter(root.Reflect, exporter);
        }
        factory(exporter);
        function makeExporter(target, previous) {
            return function (key, value) {
                if (typeof target[key] !== "function") {
                    Object.defineProperty(target, key, { configurable: true, writable: true, value: value });
                }
                if (previous)
                    previous(key, value);
            };
        }
    })(function (exporter) {
        var hasOwn = Object.prototype.hasOwnProperty;
        // feature test for Symbol support
        var supportsSymbol = typeof Symbol === "function";
        var toPrimitiveSymbol = supportsSymbol && typeof Symbol.toPrimitive !== "undefined" ? Symbol.toPrimitive : "@@toPrimitive";
        var iteratorSymbol = supportsSymbol && typeof Symbol.iterator !== "undefined" ? Symbol.iterator : "@@iterator";
        var supportsCreate = typeof Object.create === "function"; // feature test for Object.create support
        var supportsProto = { __proto__: [] } instanceof Array; // feature test for __proto__ support
        var downLevel = !supportsCreate && !supportsProto;
        var HashMap = {
            // create an object in dictionary mode (a.k.a. "slow" mode in v8)
            create: supportsCreate
                ? function () { return MakeDictionary(Object.create(null)); }
                : supportsProto
                    ? function () { return MakeDictionary({ __proto__: null }); }
                    : function () { return MakeDictionary({}); },
            has: downLevel
                ? function (map, key) { return hasOwn.call(map, key); }
                : function (map, key) { return key in map; },
            get: downLevel
                ? function (map, key) { return hasOwn.call(map, key) ? map[key] : undefined; }
                : function (map, key) { return map[key]; },
        };
        // Load global or shim versions of Map, Set, and WeakMap
        var functionPrototype = Object.getPrototypeOf(Function);
        var usePolyfill = typeof process === "object" && process.env && process.env["REFLECT_METADATA_USE_MAP_POLYFILL"] === "true";
        var _Map = !usePolyfill && typeof Map === "function" && typeof Map.prototype.entries === "function" ? Map : CreateMapPolyfill();
        var _Set = !usePolyfill && typeof Set === "function" && typeof Set.prototype.entries === "function" ? Set : CreateSetPolyfill();
        var _WeakMap = !usePolyfill && typeof WeakMap === "function" ? WeakMap : CreateWeakMapPolyfill();
        // [[Metadata]] internal slot
        // https://rbuckton.github.io/reflect-metadata/#ordinary-object-internal-methods-and-internal-slots
        var Metadata = new _WeakMap();
        /**
         * Applies a set of decorators to a property of a target object.
         * @param decorators An array of decorators.
         * @param target The target object.
         * @param propertyKey (Optional) The property key to decorate.
         * @param attributes (Optional) The property descriptor for the target key.
         * @remarks Decorators are applied in reverse order.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     Example = Reflect.decorate(decoratorsArray, Example);
         *
         *     // property (on constructor)
         *     Reflect.decorate(decoratorsArray, Example, "staticProperty");
         *
         *     // property (on prototype)
         *     Reflect.decorate(decoratorsArray, Example.prototype, "property");
         *
         *     // method (on constructor)
         *     Object.defineProperty(Example, "staticMethod",
         *         Reflect.decorate(decoratorsArray, Example, "staticMethod",
         *             Object.getOwnPropertyDescriptor(Example, "staticMethod")));
         *
         *     // method (on prototype)
         *     Object.defineProperty(Example.prototype, "method",
         *         Reflect.decorate(decoratorsArray, Example.prototype, "method",
         *             Object.getOwnPropertyDescriptor(Example.prototype, "method")));
         *
         */
        function decorate(decorators, target, propertyKey, attributes) {
            if (!IsUndefined(propertyKey)) {
                if (!IsArray(decorators))
                    throw new TypeError();
                if (!IsObject(target))
                    throw new TypeError();
                if (!IsObject(attributes) && !IsUndefined(attributes) && !IsNull(attributes))
                    throw new TypeError();
                if (IsNull(attributes))
                    attributes = undefined;
                propertyKey = ToPropertyKey(propertyKey);
                return DecorateProperty(decorators, target, propertyKey, attributes);
            }
            else {
                if (!IsArray(decorators))
                    throw new TypeError();
                if (!IsConstructor(target))
                    throw new TypeError();
                return DecorateConstructor(decorators, target);
            }
        }
        exporter("decorate", decorate);
        // 4.1.2 Reflect.metadata(metadataKey, metadataValue)
        // https://rbuckton.github.io/reflect-metadata/#reflect.metadata
        /**
         * A default metadata decorator factory that can be used on a class, class member, or parameter.
         * @param metadataKey The key for the metadata entry.
         * @param metadataValue The value for the metadata entry.
         * @returns A decorator function.
         * @remarks
         * If `metadataKey` is already defined for the target and target key, the
         * metadataValue for that key will be overwritten.
         * @example
         *
         *     // constructor
         *     @Reflect.metadata(key, value)
         *     class Example {
         *     }
         *
         *     // property (on constructor, TypeScript only)
         *     class Example {
         *         @Reflect.metadata(key, value)
         *         static staticProperty;
         *     }
         *
         *     // property (on prototype, TypeScript only)
         *     class Example {
         *         @Reflect.metadata(key, value)
         *         property;
         *     }
         *
         *     // method (on constructor)
         *     class Example {
         *         @Reflect.metadata(key, value)
         *         static staticMethod() { }
         *     }
         *
         *     // method (on prototype)
         *     class Example {
         *         @Reflect.metadata(key, value)
         *         method() { }
         *     }
         *
         */
        function metadata(metadataKey, metadataValue) {
            function decorator(target, propertyKey) {
                if (!IsObject(target))
                    throw new TypeError();
                if (!IsUndefined(propertyKey) && !IsPropertyKey(propertyKey))
                    throw new TypeError();
                OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
            }
            return decorator;
        }
        exporter("metadata", metadata);
        /**
         * Define a unique metadata entry on the target.
         * @param metadataKey A key used to store and retrieve metadata.
         * @param metadataValue A value that contains attached metadata.
         * @param target The target object on which to define metadata.
         * @param propertyKey (Optional) The property key for the target.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     Reflect.defineMetadata("custom:annotation", options, Example);
         *
         *     // property (on constructor)
         *     Reflect.defineMetadata("custom:annotation", options, Example, "staticProperty");
         *
         *     // property (on prototype)
         *     Reflect.defineMetadata("custom:annotation", options, Example.prototype, "property");
         *
         *     // method (on constructor)
         *     Reflect.defineMetadata("custom:annotation", options, Example, "staticMethod");
         *
         *     // method (on prototype)
         *     Reflect.defineMetadata("custom:annotation", options, Example.prototype, "method");
         *
         *     // decorator factory as metadata-producing annotation.
         *     function MyAnnotation(options): Decorator {
         *         return (target, key?) => Reflect.defineMetadata("custom:annotation", options, target, key);
         *     }
         *
         */
        function defineMetadata(metadataKey, metadataValue, target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey))
                propertyKey = ToPropertyKey(propertyKey);
            return OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
        }
        exporter("defineMetadata", defineMetadata);
        /**
         * Gets a value indicating whether the target object or its prototype chain has the provided metadata key defined.
         * @param metadataKey A key used to store and retrieve metadata.
         * @param target The target object on which the metadata is defined.
         * @param propertyKey (Optional) The property key for the target.
         * @returns `true` if the metadata key was defined on the target object or its prototype chain; otherwise, `false`.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     result = Reflect.hasMetadata("custom:annotation", Example);
         *
         *     // property (on constructor)
         *     result = Reflect.hasMetadata("custom:annotation", Example, "staticProperty");
         *
         *     // property (on prototype)
         *     result = Reflect.hasMetadata("custom:annotation", Example.prototype, "property");
         *
         *     // method (on constructor)
         *     result = Reflect.hasMetadata("custom:annotation", Example, "staticMethod");
         *
         *     // method (on prototype)
         *     result = Reflect.hasMetadata("custom:annotation", Example.prototype, "method");
         *
         */
        function hasMetadata(metadataKey, target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey))
                propertyKey = ToPropertyKey(propertyKey);
            return OrdinaryHasMetadata(metadataKey, target, propertyKey);
        }
        exporter("hasMetadata", hasMetadata);
        /**
         * Gets a value indicating whether the target object has the provided metadata key defined.
         * @param metadataKey A key used to store and retrieve metadata.
         * @param target The target object on which the metadata is defined.
         * @param propertyKey (Optional) The property key for the target.
         * @returns `true` if the metadata key was defined on the target object; otherwise, `false`.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     result = Reflect.hasOwnMetadata("custom:annotation", Example);
         *
         *     // property (on constructor)
         *     result = Reflect.hasOwnMetadata("custom:annotation", Example, "staticProperty");
         *
         *     // property (on prototype)
         *     result = Reflect.hasOwnMetadata("custom:annotation", Example.prototype, "property");
         *
         *     // method (on constructor)
         *     result = Reflect.hasOwnMetadata("custom:annotation", Example, "staticMethod");
         *
         *     // method (on prototype)
         *     result = Reflect.hasOwnMetadata("custom:annotation", Example.prototype, "method");
         *
         */
        function hasOwnMetadata(metadataKey, target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey))
                propertyKey = ToPropertyKey(propertyKey);
            return OrdinaryHasOwnMetadata(metadataKey, target, propertyKey);
        }
        exporter("hasOwnMetadata", hasOwnMetadata);
        /**
         * Gets the metadata value for the provided metadata key on the target object or its prototype chain.
         * @param metadataKey A key used to store and retrieve metadata.
         * @param target The target object on which the metadata is defined.
         * @param propertyKey (Optional) The property key for the target.
         * @returns The metadata value for the metadata key if found; otherwise, `undefined`.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     result = Reflect.getMetadata("custom:annotation", Example);
         *
         *     // property (on constructor)
         *     result = Reflect.getMetadata("custom:annotation", Example, "staticProperty");
         *
         *     // property (on prototype)
         *     result = Reflect.getMetadata("custom:annotation", Example.prototype, "property");
         *
         *     // method (on constructor)
         *     result = Reflect.getMetadata("custom:annotation", Example, "staticMethod");
         *
         *     // method (on prototype)
         *     result = Reflect.getMetadata("custom:annotation", Example.prototype, "method");
         *
         */
        function getMetadata(metadataKey, target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey))
                propertyKey = ToPropertyKey(propertyKey);
            return OrdinaryGetMetadata(metadataKey, target, propertyKey);
        }
        exporter("getMetadata", getMetadata);
        /**
         * Gets the metadata value for the provided metadata key on the target object.
         * @param metadataKey A key used to store and retrieve metadata.
         * @param target The target object on which the metadata is defined.
         * @param propertyKey (Optional) The property key for the target.
         * @returns The metadata value for the metadata key if found; otherwise, `undefined`.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     result = Reflect.getOwnMetadata("custom:annotation", Example);
         *
         *     // property (on constructor)
         *     result = Reflect.getOwnMetadata("custom:annotation", Example, "staticProperty");
         *
         *     // property (on prototype)
         *     result = Reflect.getOwnMetadata("custom:annotation", Example.prototype, "property");
         *
         *     // method (on constructor)
         *     result = Reflect.getOwnMetadata("custom:annotation", Example, "staticMethod");
         *
         *     // method (on prototype)
         *     result = Reflect.getOwnMetadata("custom:annotation", Example.prototype, "method");
         *
         */
        function getOwnMetadata(metadataKey, target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey))
                propertyKey = ToPropertyKey(propertyKey);
            return OrdinaryGetOwnMetadata(metadataKey, target, propertyKey);
        }
        exporter("getOwnMetadata", getOwnMetadata);
        /**
         * Gets the metadata keys defined on the target object or its prototype chain.
         * @param target The target object on which the metadata is defined.
         * @param propertyKey (Optional) The property key for the target.
         * @returns An array of unique metadata keys.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     result = Reflect.getMetadataKeys(Example);
         *
         *     // property (on constructor)
         *     result = Reflect.getMetadataKeys(Example, "staticProperty");
         *
         *     // property (on prototype)
         *     result = Reflect.getMetadataKeys(Example.prototype, "property");
         *
         *     // method (on constructor)
         *     result = Reflect.getMetadataKeys(Example, "staticMethod");
         *
         *     // method (on prototype)
         *     result = Reflect.getMetadataKeys(Example.prototype, "method");
         *
         */
        function getMetadataKeys(target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey))
                propertyKey = ToPropertyKey(propertyKey);
            return OrdinaryMetadataKeys(target, propertyKey);
        }
        exporter("getMetadataKeys", getMetadataKeys);
        /**
         * Gets the unique metadata keys defined on the target object.
         * @param target The target object on which the metadata is defined.
         * @param propertyKey (Optional) The property key for the target.
         * @returns An array of unique metadata keys.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     result = Reflect.getOwnMetadataKeys(Example);
         *
         *     // property (on constructor)
         *     result = Reflect.getOwnMetadataKeys(Example, "staticProperty");
         *
         *     // property (on prototype)
         *     result = Reflect.getOwnMetadataKeys(Example.prototype, "property");
         *
         *     // method (on constructor)
         *     result = Reflect.getOwnMetadataKeys(Example, "staticMethod");
         *
         *     // method (on prototype)
         *     result = Reflect.getOwnMetadataKeys(Example.prototype, "method");
         *
         */
        function getOwnMetadataKeys(target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey))
                propertyKey = ToPropertyKey(propertyKey);
            return OrdinaryOwnMetadataKeys(target, propertyKey);
        }
        exporter("getOwnMetadataKeys", getOwnMetadataKeys);
        /**
         * Deletes the metadata entry from the target object with the provided key.
         * @param metadataKey A key used to store and retrieve metadata.
         * @param target The target object on which the metadata is defined.
         * @param propertyKey (Optional) The property key for the target.
         * @returns `true` if the metadata entry was found and deleted; otherwise, false.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     result = Reflect.deleteMetadata("custom:annotation", Example);
         *
         *     // property (on constructor)
         *     result = Reflect.deleteMetadata("custom:annotation", Example, "staticProperty");
         *
         *     // property (on prototype)
         *     result = Reflect.deleteMetadata("custom:annotation", Example.prototype, "property");
         *
         *     // method (on constructor)
         *     result = Reflect.deleteMetadata("custom:annotation", Example, "staticMethod");
         *
         *     // method (on prototype)
         *     result = Reflect.deleteMetadata("custom:annotation", Example.prototype, "method");
         *
         */
        function deleteMetadata(metadataKey, target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey))
                propertyKey = ToPropertyKey(propertyKey);
            var metadataMap = GetOrCreateMetadataMap(target, propertyKey, /*Create*/ false);
            if (IsUndefined(metadataMap))
                return false;
            if (!metadataMap.delete(metadataKey))
                return false;
            if (metadataMap.size > 0)
                return true;
            var targetMetadata = Metadata.get(target);
            targetMetadata.delete(propertyKey);
            if (targetMetadata.size > 0)
                return true;
            Metadata.delete(target);
            return true;
        }
        exporter("deleteMetadata", deleteMetadata);
        function DecorateConstructor(decorators, target) {
            for (var i = decorators.length - 1; i >= 0; --i) {
                var decorator = decorators[i];
                var decorated = decorator(target);
                if (!IsUndefined(decorated) && !IsNull(decorated)) {
                    if (!IsConstructor(decorated))
                        throw new TypeError();
                    target = decorated;
                }
            }
            return target;
        }
        function DecorateProperty(decorators, target, propertyKey, descriptor) {
            for (var i = decorators.length - 1; i >= 0; --i) {
                var decorator = decorators[i];
                var decorated = decorator(target, propertyKey, descriptor);
                if (!IsUndefined(decorated) && !IsNull(decorated)) {
                    if (!IsObject(decorated))
                        throw new TypeError();
                    descriptor = decorated;
                }
            }
            return descriptor;
        }
        function GetOrCreateMetadataMap(O, P, Create) {
            var targetMetadata = Metadata.get(O);
            if (IsUndefined(targetMetadata)) {
                if (!Create)
                    return undefined;
                targetMetadata = new _Map();
                Metadata.set(O, targetMetadata);
            }
            var metadataMap = targetMetadata.get(P);
            if (IsUndefined(metadataMap)) {
                if (!Create)
                    return undefined;
                metadataMap = new _Map();
                targetMetadata.set(P, metadataMap);
            }
            return metadataMap;
        }
        // 3.1.1.1 OrdinaryHasMetadata(MetadataKey, O, P)
        // https://rbuckton.github.io/reflect-metadata/#ordinaryhasmetadata
        function OrdinaryHasMetadata(MetadataKey, O, P) {
            var hasOwn = OrdinaryHasOwnMetadata(MetadataKey, O, P);
            if (hasOwn)
                return true;
            var parent = OrdinaryGetPrototypeOf(O);
            if (!IsNull(parent))
                return OrdinaryHasMetadata(MetadataKey, parent, P);
            return false;
        }
        // 3.1.2.1 OrdinaryHasOwnMetadata(MetadataKey, O, P)
        // https://rbuckton.github.io/reflect-metadata/#ordinaryhasownmetadata
        function OrdinaryHasOwnMetadata(MetadataKey, O, P) {
            var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ false);
            if (IsUndefined(metadataMap))
                return false;
            return ToBoolean(metadataMap.has(MetadataKey));
        }
        // 3.1.3.1 OrdinaryGetMetadata(MetadataKey, O, P)
        // https://rbuckton.github.io/reflect-metadata/#ordinarygetmetadata
        function OrdinaryGetMetadata(MetadataKey, O, P) {
            var hasOwn = OrdinaryHasOwnMetadata(MetadataKey, O, P);
            if (hasOwn)
                return OrdinaryGetOwnMetadata(MetadataKey, O, P);
            var parent = OrdinaryGetPrototypeOf(O);
            if (!IsNull(parent))
                return OrdinaryGetMetadata(MetadataKey, parent, P);
            return undefined;
        }
        // 3.1.4.1 OrdinaryGetOwnMetadata(MetadataKey, O, P)
        // https://rbuckton.github.io/reflect-metadata/#ordinarygetownmetadata
        function OrdinaryGetOwnMetadata(MetadataKey, O, P) {
            var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ false);
            if (IsUndefined(metadataMap))
                return undefined;
            return metadataMap.get(MetadataKey);
        }
        // 3.1.5.1 OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P)
        // https://rbuckton.github.io/reflect-metadata/#ordinarydefineownmetadata
        function OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P) {
            var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ true);
            metadataMap.set(MetadataKey, MetadataValue);
        }
        // 3.1.6.1 OrdinaryMetadataKeys(O, P)
        // https://rbuckton.github.io/reflect-metadata/#ordinarymetadatakeys
        function OrdinaryMetadataKeys(O, P) {
            var ownKeys = OrdinaryOwnMetadataKeys(O, P);
            var parent = OrdinaryGetPrototypeOf(O);
            if (parent === null)
                return ownKeys;
            var parentKeys = OrdinaryMetadataKeys(parent, P);
            if (parentKeys.length <= 0)
                return ownKeys;
            if (ownKeys.length <= 0)
                return parentKeys;
            var set = new _Set();
            var keys = [];
            for (var _i = 0, ownKeys_1 = ownKeys; _i < ownKeys_1.length; _i++) {
                var key = ownKeys_1[_i];
                var hasKey = set.has(key);
                if (!hasKey) {
                    set.add(key);
                    keys.push(key);
                }
            }
            for (var _a = 0, parentKeys_1 = parentKeys; _a < parentKeys_1.length; _a++) {
                var key = parentKeys_1[_a];
                var hasKey = set.has(key);
                if (!hasKey) {
                    set.add(key);
                    keys.push(key);
                }
            }
            return keys;
        }
        // 3.1.7.1 OrdinaryOwnMetadataKeys(O, P)
        // https://rbuckton.github.io/reflect-metadata/#ordinaryownmetadatakeys
        function OrdinaryOwnMetadataKeys(O, P) {
            var keys = [];
            var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ false);
            if (IsUndefined(metadataMap))
                return keys;
            var keysObj = metadataMap.keys();
            var iterator = GetIterator(keysObj);
            var k = 0;
            while (true) {
                var next = IteratorStep(iterator);
                if (!next) {
                    keys.length = k;
                    return keys;
                }
                var nextValue = IteratorValue(next);
                try {
                    keys[k] = nextValue;
                }
                catch (e) {
                    try {
                        IteratorClose(iterator);
                    }
                    finally {
                        throw e;
                    }
                }
                k++;
            }
        }
        // 6 ECMAScript Data Typ0es and Values
        // https://tc39.github.io/ecma262/#sec-ecmascript-data-types-and-values
        function Type(x) {
            if (x === null)
                return 1 /* Null */;
            switch (typeof x) {
                case "undefined": return 0 /* Undefined */;
                case "boolean": return 2 /* Boolean */;
                case "string": return 3 /* String */;
                case "symbol": return 4 /* Symbol */;
                case "number": return 5 /* Number */;
                case "object": return x === null ? 1 /* Null */ : 6 /* Object */;
                default: return 6 /* Object */;
            }
        }
        // 6.1.1 The Undefined Type
        // https://tc39.github.io/ecma262/#sec-ecmascript-language-types-undefined-type
        function IsUndefined(x) {
            return x === undefined;
        }
        // 6.1.2 The Null Type
        // https://tc39.github.io/ecma262/#sec-ecmascript-language-types-null-type
        function IsNull(x) {
            return x === null;
        }
        // 6.1.5 The Symbol Type
        // https://tc39.github.io/ecma262/#sec-ecmascript-language-types-symbol-type
        function IsSymbol(x) {
            return typeof x === "symbol";
        }
        // 6.1.7 The Object Type
        // https://tc39.github.io/ecma262/#sec-object-type
        function IsObject(x) {
            return typeof x === "object" ? x !== null : typeof x === "function";
        }
        // 7.1 Type Conversion
        // https://tc39.github.io/ecma262/#sec-type-conversion
        // 7.1.1 ToPrimitive(input [, PreferredType])
        // https://tc39.github.io/ecma262/#sec-toprimitive
        function ToPrimitive(input, PreferredType) {
            switch (Type(input)) {
                case 0 /* Undefined */: return input;
                case 1 /* Null */: return input;
                case 2 /* Boolean */: return input;
                case 3 /* String */: return input;
                case 4 /* Symbol */: return input;
                case 5 /* Number */: return input;
            }
            var hint = PreferredType === 3 /* String */ ? "string" : PreferredType === 5 /* Number */ ? "number" : "default";
            var exoticToPrim = GetMethod(input, toPrimitiveSymbol);
            if (exoticToPrim !== undefined) {
                var result = exoticToPrim.call(input, hint);
                if (IsObject(result))
                    throw new TypeError();
                return result;
            }
            return OrdinaryToPrimitive(input, hint === "default" ? "number" : hint);
        }
        // 7.1.1.1 OrdinaryToPrimitive(O, hint)
        // https://tc39.github.io/ecma262/#sec-ordinarytoprimitive
        function OrdinaryToPrimitive(O, hint) {
            if (hint === "string") {
                var toString_1 = O.toString;
                if (IsCallable(toString_1)) {
                    var result = toString_1.call(O);
                    if (!IsObject(result))
                        return result;
                }
                var valueOf = O.valueOf;
                if (IsCallable(valueOf)) {
                    var result = valueOf.call(O);
                    if (!IsObject(result))
                        return result;
                }
            }
            else {
                var valueOf = O.valueOf;
                if (IsCallable(valueOf)) {
                    var result = valueOf.call(O);
                    if (!IsObject(result))
                        return result;
                }
                var toString_2 = O.toString;
                if (IsCallable(toString_2)) {
                    var result = toString_2.call(O);
                    if (!IsObject(result))
                        return result;
                }
            }
            throw new TypeError();
        }
        // 7.1.2 ToBoolean(argument)
        // https://tc39.github.io/ecma262/2016/#sec-toboolean
        function ToBoolean(argument) {
            return !!argument;
        }
        // 7.1.12 ToString(argument)
        // https://tc39.github.io/ecma262/#sec-tostring
        function ToString(argument) {
            return "" + argument;
        }
        // 7.1.14 ToPropertyKey(argument)
        // https://tc39.github.io/ecma262/#sec-topropertykey
        function ToPropertyKey(argument) {
            var key = ToPrimitive(argument, 3 /* String */);
            if (IsSymbol(key))
                return key;
            return ToString(key);
        }
        // 7.2 Testing and Comparison Operations
        // https://tc39.github.io/ecma262/#sec-testing-and-comparison-operations
        // 7.2.2 IsArray(argument)
        // https://tc39.github.io/ecma262/#sec-isarray
        function IsArray(argument) {
            return Array.isArray
                ? Array.isArray(argument)
                : argument instanceof Object
                    ? argument instanceof Array
                    : Object.prototype.toString.call(argument) === "[object Array]";
        }
        // 7.2.3 IsCallable(argument)
        // https://tc39.github.io/ecma262/#sec-iscallable
        function IsCallable(argument) {
            // NOTE: This is an approximation as we cannot check for [[Call]] internal method.
            return typeof argument === "function";
        }
        // 7.2.4 IsConstructor(argument)
        // https://tc39.github.io/ecma262/#sec-isconstructor
        function IsConstructor(argument) {
            // NOTE: This is an approximation as we cannot check for [[Construct]] internal method.
            return typeof argument === "function";
        }
        // 7.2.7 IsPropertyKey(argument)
        // https://tc39.github.io/ecma262/#sec-ispropertykey
        function IsPropertyKey(argument) {
            switch (Type(argument)) {
                case 3 /* String */: return true;
                case 4 /* Symbol */: return true;
                default: return false;
            }
        }
        // 7.3 Operations on Objects
        // https://tc39.github.io/ecma262/#sec-operations-on-objects
        // 7.3.9 GetMethod(V, P)
        // https://tc39.github.io/ecma262/#sec-getmethod
        function GetMethod(V, P) {
            var func = V[P];
            if (func === undefined || func === null)
                return undefined;
            if (!IsCallable(func))
                throw new TypeError();
            return func;
        }
        // 7.4 Operations on Iterator Objects
        // https://tc39.github.io/ecma262/#sec-operations-on-iterator-objects
        function GetIterator(obj) {
            var method = GetMethod(obj, iteratorSymbol);
            if (!IsCallable(method))
                throw new TypeError(); // from Call
            var iterator = method.call(obj);
            if (!IsObject(iterator))
                throw new TypeError();
            return iterator;
        }
        // 7.4.4 IteratorValue(iterResult)
        // https://tc39.github.io/ecma262/2016/#sec-iteratorvalue
        function IteratorValue(iterResult) {
            return iterResult.value;
        }
        // 7.4.5 IteratorStep(iterator)
        // https://tc39.github.io/ecma262/#sec-iteratorstep
        function IteratorStep(iterator) {
            var result = iterator.next();
            return result.done ? false : result;
        }
        // 7.4.6 IteratorClose(iterator, completion)
        // https://tc39.github.io/ecma262/#sec-iteratorclose
        function IteratorClose(iterator) {
            var f = iterator["return"];
            if (f)
                f.call(iterator);
        }
        // 9.1 Ordinary Object Internal Methods and Internal Slots
        // https://tc39.github.io/ecma262/#sec-ordinary-object-internal-methods-and-internal-slots
        // 9.1.1.1 OrdinaryGetPrototypeOf(O)
        // https://tc39.github.io/ecma262/#sec-ordinarygetprototypeof
        function OrdinaryGetPrototypeOf(O) {
            var proto = Object.getPrototypeOf(O);
            if (typeof O !== "function" || O === functionPrototype)
                return proto;
            // TypeScript doesn't set __proto__ in ES5, as it's non-standard.
            // Try to determine the superclass constructor. Compatible implementations
            // must either set __proto__ on a subclass constructor to the superclass constructor,
            // or ensure each class has a valid `constructor` property on its prototype that
            // points back to the constructor.
            // If this is not the same as Function.[[Prototype]], then this is definately inherited.
            // This is the case when in ES6 or when using __proto__ in a compatible browser.
            if (proto !== functionPrototype)
                return proto;
            // If the super prototype is Object.prototype, null, or undefined, then we cannot determine the heritage.
            var prototype = O.prototype;
            var prototypeProto = prototype && Object.getPrototypeOf(prototype);
            if (prototypeProto == null || prototypeProto === Object.prototype)
                return proto;
            // If the constructor was not a function, then we cannot determine the heritage.
            var constructor = prototypeProto.constructor;
            if (typeof constructor !== "function")
                return proto;
            // If we have some kind of self-reference, then we cannot determine the heritage.
            if (constructor === O)
                return proto;
            // we have a pretty good guess at the heritage.
            return constructor;
        }
        // naive Map shim
        function CreateMapPolyfill() {
            var cacheSentinel = {};
            var arraySentinel = [];
            var MapIterator = /** @class */ (function () {
                function MapIterator(keys, values, selector) {
                    this._index = 0;
                    this._keys = keys;
                    this._values = values;
                    this._selector = selector;
                }
                MapIterator.prototype["@@iterator"] = function () { return this; };
                MapIterator.prototype[iteratorSymbol] = function () { return this; };
                MapIterator.prototype.next = function () {
                    var index = this._index;
                    if (index >= 0 && index < this._keys.length) {
                        var result = this._selector(this._keys[index], this._values[index]);
                        if (index + 1 >= this._keys.length) {
                            this._index = -1;
                            this._keys = arraySentinel;
                            this._values = arraySentinel;
                        }
                        else {
                            this._index++;
                        }
                        return { value: result, done: false };
                    }
                    return { value: undefined, done: true };
                };
                MapIterator.prototype.throw = function (error) {
                    if (this._index >= 0) {
                        this._index = -1;
                        this._keys = arraySentinel;
                        this._values = arraySentinel;
                    }
                    throw error;
                };
                MapIterator.prototype.return = function (value) {
                    if (this._index >= 0) {
                        this._index = -1;
                        this._keys = arraySentinel;
                        this._values = arraySentinel;
                    }
                    return { value: value, done: true };
                };
                return MapIterator;
            }());
            return /** @class */ (function () {
                function Map() {
                    this._keys = [];
                    this._values = [];
                    this._cacheKey = cacheSentinel;
                    this._cacheIndex = -2;
                }
                Object.defineProperty(Map.prototype, "size", {
                    get: function () { return this._keys.length; },
                    enumerable: true,
                    configurable: true
                });
                Map.prototype.has = function (key) { return this._find(key, /*insert*/ false) >= 0; };
                Map.prototype.get = function (key) {
                    var index = this._find(key, /*insert*/ false);
                    return index >= 0 ? this._values[index] : undefined;
                };
                Map.prototype.set = function (key, value) {
                    var index = this._find(key, /*insert*/ true);
                    this._values[index] = value;
                    return this;
                };
                Map.prototype.delete = function (key) {
                    var index = this._find(key, /*insert*/ false);
                    if (index >= 0) {
                        var size = this._keys.length;
                        for (var i = index + 1; i < size; i++) {
                            this._keys[i - 1] = this._keys[i];
                            this._values[i - 1] = this._values[i];
                        }
                        this._keys.length--;
                        this._values.length--;
                        if (key === this._cacheKey) {
                            this._cacheKey = cacheSentinel;
                            this._cacheIndex = -2;
                        }
                        return true;
                    }
                    return false;
                };
                Map.prototype.clear = function () {
                    this._keys.length = 0;
                    this._values.length = 0;
                    this._cacheKey = cacheSentinel;
                    this._cacheIndex = -2;
                };
                Map.prototype.keys = function () { return new MapIterator(this._keys, this._values, getKey); };
                Map.prototype.values = function () { return new MapIterator(this._keys, this._values, getValue); };
                Map.prototype.entries = function () { return new MapIterator(this._keys, this._values, getEntry); };
                Map.prototype["@@iterator"] = function () { return this.entries(); };
                Map.prototype[iteratorSymbol] = function () { return this.entries(); };
                Map.prototype._find = function (key, insert) {
                    if (this._cacheKey !== key) {
                        this._cacheIndex = this._keys.indexOf(this._cacheKey = key);
                    }
                    if (this._cacheIndex < 0 && insert) {
                        this._cacheIndex = this._keys.length;
                        this._keys.push(key);
                        this._values.push(undefined);
                    }
                    return this._cacheIndex;
                };
                return Map;
            }());
            function getKey(key, _) {
                return key;
            }
            function getValue(_, value) {
                return value;
            }
            function getEntry(key, value) {
                return [key, value];
            }
        }
        // naive Set shim
        function CreateSetPolyfill() {
            return /** @class */ (function () {
                function Set() {
                    this._map = new _Map();
                }
                Object.defineProperty(Set.prototype, "size", {
                    get: function () { return this._map.size; },
                    enumerable: true,
                    configurable: true
                });
                Set.prototype.has = function (value) { return this._map.has(value); };
                Set.prototype.add = function (value) { return this._map.set(value, value), this; };
                Set.prototype.delete = function (value) { return this._map.delete(value); };
                Set.prototype.clear = function () { this._map.clear(); };
                Set.prototype.keys = function () { return this._map.keys(); };
                Set.prototype.values = function () { return this._map.values(); };
                Set.prototype.entries = function () { return this._map.entries(); };
                Set.prototype["@@iterator"] = function () { return this.keys(); };
                Set.prototype[iteratorSymbol] = function () { return this.keys(); };
                return Set;
            }());
        }
        // naive WeakMap shim
        function CreateWeakMapPolyfill() {
            var UUID_SIZE = 16;
            var keys = HashMap.create();
            var rootKey = CreateUniqueKey();
            return /** @class */ (function () {
                function WeakMap() {
                    this._key = CreateUniqueKey();
                }
                WeakMap.prototype.has = function (target) {
                    var table = GetOrCreateWeakMapTable(target, /*create*/ false);
                    return table !== undefined ? HashMap.has(table, this._key) : false;
                };
                WeakMap.prototype.get = function (target) {
                    var table = GetOrCreateWeakMapTable(target, /*create*/ false);
                    return table !== undefined ? HashMap.get(table, this._key) : undefined;
                };
                WeakMap.prototype.set = function (target, value) {
                    var table = GetOrCreateWeakMapTable(target, /*create*/ true);
                    table[this._key] = value;
                    return this;
                };
                WeakMap.prototype.delete = function (target) {
                    var table = GetOrCreateWeakMapTable(target, /*create*/ false);
                    return table !== undefined ? delete table[this._key] : false;
                };
                WeakMap.prototype.clear = function () {
                    // NOTE: not a real clear, just makes the previous data unreachable
                    this._key = CreateUniqueKey();
                };
                return WeakMap;
            }());
            function CreateUniqueKey() {
                var key;
                do
                    key = "@@WeakMap@@" + CreateUUID();
                while (HashMap.has(keys, key));
                keys[key] = true;
                return key;
            }
            function GetOrCreateWeakMapTable(target, create) {
                if (!hasOwn.call(target, rootKey)) {
                    if (!create)
                        return undefined;
                    Object.defineProperty(target, rootKey, { value: HashMap.create() });
                }
                return target[rootKey];
            }
            function FillRandomBytes(buffer, size) {
                for (var i = 0; i < size; ++i)
                    buffer[i] = Math.random() * 0xff | 0;
                return buffer;
            }
            function GenRandomBytes(size) {
                if (typeof Uint8Array === "function") {
                    if (typeof crypto !== "undefined")
                        return crypto.getRandomValues(new Uint8Array(size));
                    if (typeof msCrypto !== "undefined")
                        return msCrypto.getRandomValues(new Uint8Array(size));
                    return FillRandomBytes(new Uint8Array(size), size);
                }
                return FillRandomBytes(new Array(size), size);
            }
            function CreateUUID() {
                var data = GenRandomBytes(UUID_SIZE);
                // mark as random - RFC 4122 § 4.4
                data[6] = data[6] & 0x4f | 0x40;
                data[8] = data[8] & 0xbf | 0x80;
                var result = "";
                for (var offset = 0; offset < UUID_SIZE; ++offset) {
                    var byte = data[offset];
                    if (offset === 4 || offset === 6 || offset === 8)
                        result += "-";
                    if (byte < 16)
                        result += "0";
                    result += byte.toString(16).toLowerCase();
                }
                return result;
            }
        }
        // uses a heuristic used by v8 and chakra to force an object into dictionary mode.
        function MakeDictionary(obj) {
            obj.__ = undefined;
            delete obj.__;
            return obj;
        }
    });
})(Reflect || (Reflect = {}));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../examples/node_modules/process/browser.js */ "./node_modules/process/browser.js"), __webpack_require__(/*! ./../../../examples/node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/css/base.css":
/*!****************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/css/base.css ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "\r\nbody {\r\n    margin: 0;\r\n    padding: 0;\r\n    width: 100vw;\r\n    height: 100vh;\r\n    display: flex;\r\n    flex-flow: column nowrap;\r\n    align-items: center;\r\n    justify-content: center;\r\n    background-color: #EEE;\r\n    font-family: 'Open Sans', Roboto, Segoe UI, Microsoft Yahei UI, Tahoma, Geneva, Verdana, sans-serif;\r\n\r\n    background-position: 0px 0px,\r\n    16px 16px;\r\n    background-size: 32px 32px;\r\n    background-image: linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%, #eee 100%),\r\n    linear-gradient(45deg, #eee 25%, white 25%, white 75%, #eee 75%, #eee 100%);\r\n}\r\n\r\n#root {\r\n    max-width: 100%;\r\n    max-height: 100%;\r\n}\r\n\r\n#canvas {\r\n    max-width: 100%;\r\n    max-height: 100%;\r\n}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || '').concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : undefined;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/css/base.css":
/*!**************************!*\
  !*** ./src/css/base.css ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!./base.css */ "./node_modules/css-loader/dist/cjs.js!./src/css/base.css");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ "./src/engine-test.ts":
/*!****************************!*\
  !*** ./src/engine-test.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(/*! ./css/base.css */ "./src/css/base.css");
const zogra_engine_1 = __webpack_require__(/*! zogra-engine */ "../zogra-engine/dist/index.js");
const default_frag_glsl_1 = __importDefault(__webpack_require__(/*! ./shader/default-frag.glsl */ "./src/shader/default-frag.glsl"));
const default_vert_glsl_1 = __importDefault(__webpack_require__(/*! ./shader/default-vert.glsl */ "./src/shader/default-vert.glsl"));
const ZograRendererPackage = __importStar(__webpack_require__(/*! zogra-renderer */ "../zogra-renderer/dist/index.js"));
const ZograEnginePackage = __importStar(__webpack_require__(/*! zogra-engine */ "../zogra-engine/dist/index.js"));
window.ZograEngine = ZograEnginePackage;
window.ZograRenderer = ZograRendererPackage;
class LambertMaterial extends zogra_engine_1.MaterialFromShader(new zogra_engine_1.Shader(default_vert_glsl_1.default, default_frag_glsl_1.default, {})) {
    constructor() {
        super(...arguments);
        this.color = zogra_engine_1.Color.white;
        this.texture = null;
    }
}
__decorate([
    zogra_engine_1.shaderProp("uColor", "color")
], LambertMaterial.prototype, "color", void 0);
__decorate([
    zogra_engine_1.shaderProp("uMainTex", "tex2d")
], LambertMaterial.prototype, "texture", void 0);
const canvas = document.querySelector("#canvas");
const engine = new zogra_engine_1.ZograEngine(canvas, zogra_engine_1.PreviewRenderer);
const input = new zogra_engine_1.InputManager();
initCamera();
initObjects();
engine.start();
engine.on('update', () => input.update());
function initCamera() {
    const wrapper = new zogra_engine_1.Entity();
    engine.scene.add(wrapper);
    wrapper.position = zogra_engine_1.vec3(0, 2, 20);
    const camera = new zogra_engine_1.Camera();
    camera.clearColor = zogra_engine_1.rgb(.3, .3, .3);
    camera.FOV = 60;
    engine.scene.add(camera, wrapper);
    engine.on("update", (time) => {
        // engine.renderer.clear(Color.white, true);
        // engine.renderer.drawMesh(mesh, mat4.identity(), new Mat());
        const sensity = 0.0001 * 10;
        let v = zogra_engine_1.vec3.zero();
        let forward = zogra_engine_1.mat4.mulVector(camera.localToWorldMatrix, zogra_engine_1.vec3(0, 0, -1));
        forward.y = 0;
        forward = forward.normalize();
        let right = zogra_engine_1.mat4.mulVector(camera.localToWorldMatrix, zogra_engine_1.vec3(1, 0, 0)).normalize();
        let up = zogra_engine_1.vec3(0, 1, 0);
        if (input.getKey(zogra_engine_1.Keys.Shift) || input.getKey(zogra_engine_1.Keys.Space))
            v.plus(zogra_engine_1.vec3(0, 1 * time.deltaTime, 0));
        if (input.getKey(zogra_engine_1.Keys.Control))
            v.plus(zogra_engine_1.vec3(0, -1 * time.deltaTime, 0));
        if (input.getKey(zogra_engine_1.Keys.W))
            v.plus(zogra_engine_1.mul(forward, time.deltaTime));
        if (input.getKey(zogra_engine_1.Keys.S))
            v.plus(zogra_engine_1.mul(forward, -time.deltaTime));
        if (input.getKey(zogra_engine_1.Keys.D))
            v.plus(zogra_engine_1.mul(right, time.deltaTime));
        if (input.getKey(zogra_engine_1.Keys.A))
            v.plus(zogra_engine_1.mul(right, -time.deltaTime));
        if (input.getKeyDown(zogra_engine_1.Keys.Mouse2))
            input.lockPointer();
        if (input.getKeyUp(zogra_engine_1.Keys.Mouse2))
            input.releasePointer();
        let look = input.pointerDelta;
        let rotate = zogra_engine_1.quat.normalize(zogra_engine_1.quat.mul(zogra_engine_1.quat.axisAngle(right, -sensity * look.y), zogra_engine_1.quat.axisAngle(up, -sensity * look.x)));
        /*if (input.getKey(Keys.Space))
            rotate = quat.axis(right, -sensity * look.y);
        else
            rotate = quat.normalize(quat.axis(up, -sensity * look.x));*/
        wrapper.rotation = zogra_engine_1.quat.mul(wrapper.rotation, zogra_engine_1.quat.axisAngle(up, -sensity * look.x));
        camera.localRotation = zogra_engine_1.quat.mul(camera.localRotation, zogra_engine_1.quat.axisAngle(zogra_engine_1.vec3(1, 0, 0), -sensity * look.y));
        wrapper.position = zogra_engine_1.plus(wrapper.position, zogra_engine_1.mul(v, 5));
        //input.pointerDelta.magnitude > 0 &&  console.log(input.pointerDelta);
    });
}
function initObjects() {
    const cube = new zogra_engine_1.RenderObject();
    engine.scene.add(cube);
    // cube.meshes.push(engine.renderer.assets.meshes.cube);
    cube.meshes[0] = engine.renderer.assets.meshes.cube;
    cube.materials[0] = new LambertMaterial();
    engine.on("update", (time) => {
        cube.rotation = zogra_engine_1.quat.normalize(zogra_engine_1.quat.mul(cube.rotation, zogra_engine_1.quat.axisAngle(zogra_engine_1.vec3(1, 1, 1), time.deltaTime * 0.5)));
    });
}


/***/ }),

/***/ "./src/shader/default-frag.glsl":
/*!**************************************!*\
  !*** ./src/shader/default-frag.glsl ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "#version 300 es\r\nprecision mediump float;\r\n\r\nin vec4 vColor;\r\nin vec4 vPos;\r\nin vec2 vUV;\r\nin vec3 vNormal;\r\n\r\nuniform sampler2D uMainTex;\r\nuniform vec4 uColor;\r\nuniform vec3 uLightDir;\r\nuniform vec3 uLightColor;\r\n\r\nout vec4 fragColor;\r\n\r\nvoid main()\r\n{\r\n    vec3 color = texture(uMainTex, vUV.xy).rgb;\r\n    float lambertian = dot(vNormal, uLightDir);\r\n    color = color * vec3(lambertian);\r\n\r\n    fragColor = vec4(color, 1);\r\n}";

/***/ }),

/***/ "./src/shader/default-vert.glsl":
/*!**************************************!*\
  !*** ./src/shader/default-vert.glsl ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "#version 300 es\r\nprecision mediump float;\r\n\r\nin vec3 aPos;\r\nin vec4 aColor;\r\nin vec2 aUV;\r\nin vec3 aNormal;\r\n\r\nuniform mat4 uTransformM;\r\nuniform mat4 uTransformVP;\r\nuniform mat4 uTransformMVP;\r\nuniform mat4 uTransformM_IT;\r\n\r\nout vec4 vColor;\r\nout vec4 vPos;\r\nout vec2 vUV;\r\nout vec3 vNormal;\r\nout vec3 vWorldPos;\r\n\r\nvoid main()\r\n{\r\n    gl_Position = uTransformMVP * vec4(aPos, 1);\r\n    vPos = gl_Position;\r\n    vColor = aColor;\r\n    vUV = aUV;\r\n    vNormal = (uTransformM_IT *  vec4(aNormal, 0)).xyz;\r\n    vWorldPos = (uTransformM * vec4(aPos, 1)).xyz;\r\n    \r\n}";

/***/ })

/******/ });
//# sourceMappingURL=engine-test.js.map
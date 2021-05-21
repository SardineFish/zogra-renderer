import { GlobalContext, vec2 } from "zogra-renderer";
import { minus } from "zogra-renderer";
import { DoubleBuffer } from "../utils/util";
export var KeyState;
(function (KeyState) {
    KeyState[KeyState["Pressed"] = 1] = "Pressed";
    KeyState[KeyState["Released"] = 0] = "Released";
})(KeyState || (KeyState = {}));
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
export var TouchState;
(function (TouchState) {
    TouchState[TouchState["Idle"] = 0] = "Idle";
    TouchState[TouchState["Started"] = 1] = "Started";
    TouchState[TouchState["Moved"] = 2] = "Moved";
    TouchState[TouchState["Ended"] = 4] = "Ended";
    TouchState[TouchState["Canceled"] = 8] = "Canceled";
})(TouchState || (TouchState = {}));
const TouchInput = {
    equals(a, b) {
        return a.id === b.id && a.state === b.state && a.pos.equals(b.pos);
    }
};
class InputStates {
    constructor() {
        this.keyStates = new Map();
        this.keyStatesThisFrame = new Map();
        this.mousePos = vec2.zero();
        this.mouseDelta = vec2.zero();
        this.wheelDelta = 0;
        this.touches = new Map();
        this.touchList = [];
    }
}
export class InputManager {
    constructor(options = {}) {
        var _a, _b, _c;
        this.preventBrowserShortcut = true;
        this.bound = null;
        this.states = new DoubleBuffer(() => new InputStates);
        this.renderer = null;
        this.eventTarget = options.target || window;
        this.pointerLockElement = (_a = options.pointerLockElement) !== null && _a !== void 0 ? _a : document.body;
        this.renderer = options.renderer || GlobalContext().renderer;
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
                const offset = vec2(rect.left, rect === null || rect === void 0 ? void 0 : rect.top);
                const pos = minus(vec2(e.clientX, e.clientY), offset);
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
                const offset = vec2(rect.left, rect === null || rect === void 0 ? void 0 : rect.top);
                const pos = minus(vec2(e.clientX, e.clientY), offset);
                if (pos.x < 0 || pos.y < 0 || pos.x > rect.width || pos.y > rect.height)
                    return;
            }
            this.states.back.keyStates.set(Keys.Mouse0 + e.button, KeyState.Released);
            this.states.back.keyStatesThisFrame.set(Keys.Mouse0 + e.button, KeyState.Released);
        });
        this.eventTarget.addEventListener("mousemove", e => {
            const pos = this.mapPointerPosition(e.clientX, e.clientY);
            if (!pos)
                return;
            this.states.back.mouseDelta.plus(this.mapPointerMovement(e.movementX, e.movementY));
            this.states.back.mousePos = pos;
        });
        this.eventTarget.addEventListener("wheel", e => {
            this.states.back.wheelDelta = e.deltaY;
        });
        this.eventTarget.addEventListener("touchstart", this.touchEventHandler(TouchState.Started));
        this.eventTarget.addEventListener("touchmove", this.touchEventHandler(TouchState.Moved));
        this.eventTarget.addEventListener("touchend", this.touchEventHandler(TouchState.Ended));
        this.eventTarget.addEventListener("touchcancel", this.touchEventHandler(TouchState.Canceled));
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
    get touches() { return this.states.current.touchList; }
    getKey(key) {
        return this.states.current.keyStates.get(key) === KeyState.Pressed ? true : false;
    }
    getKeyDown(key) {
        return this.states.current.keyStatesThisFrame.get(key) === KeyState.Pressed ? true : false;
    }
    getKeyUp(key) {
        return this.states.current.keyStatesThisFrame.get(key) === KeyState.Released ? true : false;
    }
    getTouchByID(id) {
        return this.states.current.touches.get(id);
    }
    update() {
        this.states.update();
        this.states.back.keyStatesThisFrame.clear();
        this.states.back.mouseDelta = vec2.zero();
        this.states.back.wheelDelta = 0;
        this.states.back.touches.clear();
        for (const [key, value] of this.states.current.keyStates) {
            this.states.back.keyStates.set(key, value);
        }
        for (const [key, value] of this.states.current.touches) {
            if (!(value.state & (TouchState.Canceled | TouchState.Ended)))
                this.states.back.touches.set(key, {
                    id: value.id,
                    pos: value.pos.clone(),
                    state: TouchState.Idle,
                    startPos: value.startPos,
                });
        }
        this.states.back.mousePos = this.states.current.mousePos;
        this.states.current.touchList = Array.from(this.states.current.touches.values()).sort((a, b) => b.id - a.id);
    }
    lockPointer() {
        this.pointerLockElement.requestPointerLock();
    }
    releasePointer() {
        document.exitPointerLock();
    }
    touchEventHandler(eventState) {
        return (e) => {
            for (let i = 0; i < e.changedTouches.length; i++) {
                const touch = e.changedTouches.item(i);
                const pos = this.mapPointerPosition(touch.clientX, touch.clientY);
                // console.log(eventState, pos);
                if (!pos)
                    continue;
                let state = this.states.back.touches.get(touch.identifier);
                if (!state) {
                    state = {
                        id: touch.identifier,
                        pos,
                        state: eventState,
                        startPos: pos.clone(),
                    };
                    this.states.back.touches.set(touch.identifier, state);
                }
                else {
                    state.state |= eventState;
                    state.pos.set(pos);
                }
            }
        };
    }
    mapPointerMovement(movementX, movementY) {
        if (!this.renderer)
            this.renderer = GlobalContext().renderer;
        if (!this.renderer)
            return undefined;
        const rect = this.renderer.canvas.getBoundingClientRect();
        return vec2(movementX, movementY).mul(this.renderer.canvasSize).div(vec2(rect.width, rect.height));
    }
    mapPointerPosition(clientX, clientY) {
        var _a;
        if (!this.renderer)
            this.renderer = GlobalContext().renderer;
        if (!this.renderer)
            return undefined;
        const eventBound = this.bound || ((_a = this.renderer) === null || _a === void 0 ? void 0 : _a.canvas) || windowBound;
        const rect = eventBound.getBoundingClientRect();
        const rendererRect = this.renderer.canvas.getBoundingClientRect();
        const pos = minus(vec2(clientX, clientY), vec2(rect.left, rect.top));
        if (pos.x < 0 || pos.y < 0 || pos.x >= rect.width || pos.y >= rect.height) {
            return undefined;
        }
        pos.x -= (rendererRect.left - rect.left);
        pos.y -= (rendererRect.top - rect.top);
        pos.mul(this.renderer.canvasSize).div(vec2(rendererRect.width, rendererRect.height));
        return pos;
    }
}
function createPointerLockElement() {
    const element = document.createElement("div");
    element.classList.add("pointer-lock-element");
    return element;
}
export var Keys;
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
})(Keys || (Keys = {}));
//# sourceMappingURL=input.js.map
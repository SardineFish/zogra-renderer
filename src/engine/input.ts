import { vec2 } from "../types/vec2";
import { minus, plus } from "../types/math";

export enum KeyState
{
    Pressed = 1,
    Released = 0,
};

interface InputEvents
{
    mousedown: (e: MouseEvent) => void;
    mouseup: (e: MouseEvent) => void;
    keydown: (e: KeyboardEvent) => void;
    keyup: (e: KeyboardEvent) => void;
    mousemove: (e: MouseEvent) => void;
}

interface InputEventTarget
{
    addEventListener: <EventT extends keyof InputEvents>(event: EventT, listener: InputEvents[EventT]) => void;
    getBoundingClientRect?: () => DOMRect;
}

interface PointerBoundingElement
{
    getBoundingClientRect(): DOMRect;
}

interface InputManagerOptions
{
    target?: InputEventTarget;
    bound?: PointerBoundingElement;
    pointerLockElement?: Element;
}

export class InputManager
{
    private eventTarget: InputEventTarget;
    private bound?: PointerBoundingElement;
    private keyStates = new Map<number, KeyState>();
    private keyStatesThisFrame = new Map<number, KeyState>();
    private mousePos: vec2 = vec2.zero();
    private mouseDelta: vec2 = vec2.zero();
    private previousMousePos = vec2.zero();
    private pointerLockElement: Element;
    
    constructor(options: InputManagerOptions = {})
    {
        this.eventTarget = options.target || window;
        if (options.bound)
            this.bound = options.bound;
        else if (options.target?.getBoundingClientRect)
            this.bound = options.target as PointerBoundingElement;
        
        this.pointerLockElement = options.pointerLockElement ?? document.body;
        
        this.eventTarget.addEventListener("keydown", (e: KeyboardEvent) =>
        {
            this.keyStates.set(e.keyCode, KeyState.Pressed);
            this.keyStatesThisFrame.set(e.keyCode, KeyState.Pressed);
        });
        this.eventTarget.addEventListener("keyup", e =>
        {
            this.keyStates.set(e.keyCode, KeyState.Released);
            this.keyStatesThisFrame.set(e.keyCode, KeyState.Released);
        });
        this.eventTarget.addEventListener("mousedown", e =>
        {
            this.keyStates.set(Keys.Mouse0 + e.button, KeyState.Pressed);
            this.keyStatesThisFrame.set(Keys.Mouse0 + e.button, KeyState.Pressed);
        });
        this.eventTarget.addEventListener("mouseup", e =>
        {
            this.keyStates.set(Keys.Mouse0 + e.button, KeyState.Released);
            this.keyStatesThisFrame.set(Keys.Mouse0 + e.button, KeyState.Released);
        });
        this.eventTarget.addEventListener("mousemove", e =>
        {
            const rect = this.bound?.getBoundingClientRect();
            const offset = vec2(rect?.left ?? 0, rect?.top ?? 0);
            const pos = minus(vec2(e.clientX, e.clientY), offset);
            this.mouseDelta.plus(vec2(e.movementX, e.movementY));
            if (this.mouseDelta.magnitude > 100)
                console.log(e);
            this.mousePos = pos;
        });
        for (const key in Keys)
        {
            if (!isNaN(key as any))
                continue;
            if (Keys.hasOwnProperty(key))
            {
                this.keyStates.set((Keys as any)[key], KeyState.Released);
            }
        }
    }
    get pointerPosition() { return this.mousePos; }
    get pointerDelta() { return this.mouseDelta; }
    getKey(key: Keys)
    {
        return this.keyStates.get(key) === KeyState.Pressed ? true : false;
    }
    getKeyDown(key: Keys)
    {
        return this.keyStatesThisFrame.get(key) === KeyState.Pressed ? true : false;
    }
    getKeyUp(key: Keys)
    {
        return this.keyStatesThisFrame.get(key) === KeyState.Released ? true : false;
    }
    update()
    {
        this.keyStatesThisFrame.clear();
        this.previousMousePos = this.mousePos;
        this.mouseDelta = vec2.zero();
    }
    lockPointer()
    {
        this.pointerLockElement.requestPointerLock();
    }
    releasePointer()
    {
        document.exitPointerLock();
    }
}

function createPointerLockElement()
{
    const element = document.createElement("div");
    element.classList.add("pointer-lock-element");
    return element;
}

export enum Keys
{
    BackSpace = 8,
    Tab = 9,
    Clear = 12,
    Enter = 13,
    Shift = 16,
    Control = 17,
    Alt = 18,
    Pause = 19,
    CapsLock = 20,
    Escape = 27,
    Space = 32,
    Prior = 33,
    Next = 34,
    End = 35,
    Home = 36,
    Left = 37,
    Up = 38,
    Right = 39,
    Down = 40,
    Select = 41,
    Print = 42,
    Execute = 43,
    Insert = 45,
    Delete = 46,
    Help = 47,
    Num0 = 48,
    Num1 = 49,
    Num2 = 50,
    Num3 = 51,
    Num4 = 52,
    Num5 = 53,
    Num6 = 54,
    Num7 = 55,
    Num8 = 56,
    Num9 = 57,
    A = 65,
    B = 66,
    C = 67,
    D = 68,
    E = 69,
    F = 70,
    G = 71,
    H = 72,
    I = 73,
    J = 74,
    K = 75,
    L = 76,
    M = 77,
    N = 78,
    O = 79,
    P = 80,
    Q = 81,
    R = 82,
    S = 83,
    T = 84,
    U = 85,
    V = 86,
    W = 87,
    X = 88,
    Y = 89,
    Z = 90,
    KP0 = 96,
    KP1 = 97,
    KP2 = 98,
    KP3 = 99,
    KP4 = 100,
    KP5 = 101,
    KP6 = 102,
    KP7 = 103,
    KP8 = 104,
    KP9 = 105,
    KPMultiply = 106,
    KPAdd = 107,
    KPSeparator = 108,
    KPSubtract = 109,
    KPDecimal = 110,
    KPDivide = 111,
    F1 = 112,
    F2 = 113,
    F3 = 114,
    F4 = 115,
    F5 = 116,
    F6 = 117,
    F7 = 118,
    F8 = 119,
    F9 = 120,
    F10 = 121,
    F11 = 122,
    F12 = 123,
    F13 = 124,
    F14 = 125,
    F15 = 126,
    F16 = 127,
    F17 = 128,
    F18 = 129,
    F19 = 130,
    F20 = 131,
    F21 = 132,
    F22 = 133,
    F23 = 134,
    F24 = 135,
    NumLock = 136,
    ScrollLock = 137,
    Mouse0 = 0x100,
    Mouse1 = 0x101,
    Mouse2 = 0x102,
    Mouse3 = 0x103,
    Mouse4 = 0x104,
    Mouse5 = 0x105,
    Mouse6 = 0x106,
}
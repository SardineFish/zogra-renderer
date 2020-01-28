export declare enum KeyState {
    Pressed = 1,
    Released = 0
}
interface InputEvents {
    mousedown: (e: MouseEvent) => void;
    mouseup: (e: MouseEvent) => void;
    keydown: (e: KeyboardEvent) => void;
    keyup: (e: KeyboardEvent) => void;
    mousemove: (e: MouseEvent) => void;
}
interface InputEventTarget {
    addEventListener: <EventT extends keyof InputEvents>(event: EventT, listener: InputEvents[EventT]) => void;
    getBoundingClientRect?: () => DOMRect;
}
interface PointerBoundingElement {
    getBoundingClientRect(): DOMRect;
}
interface InputManagerOptions {
    target?: InputEventTarget;
    bound?: PointerBoundingElement;
}
export declare class InputManager {
    private eventTarget;
    private bound?;
    private keyStates;
    private keyStatesThisFrame;
    private mousePos;
    private mouseDelta;
    private previousMousePos;
    constructor(options?: InputManagerOptions);
    get pointerPosition(): import("../types/vec2").Vector2;
    get pointerDelta(): import("../types/vec2").Vector2;
    getKey(key: Keys): boolean;
    getKeyDown(key: Keys): boolean;
    getKeyUp(key: Keys): boolean;
    update(): void;
}
export declare enum Keys {
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
    Mouse0 = 256,
    Mouse1 = 257,
    Mouse2 = 258,
    Mouse3 = 259,
    Mouse4 = 260,
    Mouse5 = 261,
    Mouse6 = 262
}
export {};

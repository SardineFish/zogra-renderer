import { GlobalContext, vec2, ZograRenderer } from "zogra-renderer";
import { minus, plus } from "zogra-renderer";
import { EventDefinitions } from "zogra-renderer";
import { DoubleBuffer } from "../utils/util";

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
    wheel: (e: WheelEvent) => void;
    touchstart: (e: TouchEvent) => void;
    touchmove: (e: TouchEvent) => void;
    touchend: (e: TouchEvent) => void;
    touchcancel: (e: TouchEvent) => void;
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
    /** Input event srouce */
    target?: InputEventTarget;
    /** Input boundary, use to calculate screen position */
    bound?: PointerBoundingElement;
    /** Lock input by a HTML elemnt */
    pointerLockElement?: Element;
    /** Specific a renderer to perform screen position convertion */
    renderer?: ZograRenderer;
}

// interface InputManagerEvents extends EventDefinitions
// {
//     keydown: (key: Keys) => void;
//     keyup: (key: Keys) => void;
//     keypressed: (key: Keys) => void;
//     mousemove: ()
// }

const windowBound: PointerBoundingElement = {
    getBoundingClientRect()
    {
        return <DOMRect>{
            x: 0,
            y: 0,
            left: 0,
            top: 0,
            right: document.documentElement.clientWidth || window.innerWidth,
            bottom: document.documentElement.clientHeight || window.innerHeight,
            width: document.documentElement.clientWidth || window.innerWidth,
            height: document.documentElement.clientHeight || window.innerHeight,
        }
    }
}

export enum TouchState
{
    Idle = 0,
    Started = 1,
    Moved = 2,
    Ended = 4,
    Canceled = 8,
}

interface TouchInput
{
    id: number;
    pos: vec2;
    state: TouchState;
    startPos: vec2;
}
const TouchInput = {
    equals(a: TouchInput, b: TouchInput)
    {
        return a.id === b.id && a.state === b.state && a.pos.equals(b.pos);
    }
}

class InputStates
{
    keyStates = new Map<number, KeyState>();
    keyStatesThisFrame = new Map<number, KeyState>();
    mousePos: vec2 = vec2.zero();
    mouseDelta: vec2 = vec2.zero();
    wheelDelta: number = 0;
    touches = new Map<number, TouchInput>();
    touchList: TouchInput[] = [];
}

export class InputManager
{
    public preventBrowserShortcut = true;
    private eventTarget: InputEventTarget;
    private bound: PointerBoundingElement | null = null;
    private states = new DoubleBuffer(() => new InputStates);
    private pointerLockElement: Element;
    private renderer: ZograRenderer | null = null;
    
    constructor(options: InputManagerOptions = {})
    {
        this.eventTarget = options.target || window;
        this.pointerLockElement = options.pointerLockElement ?? document.body;
        this.renderer = options.renderer || GlobalContext().renderer;

        if (options.bound)
            this.bound = options.bound;
        else if (options.target?.getBoundingClientRect)
            this.bound = options.target as PointerBoundingElement;
        else
            this.bound = this.renderer?.canvas;
        
        this.eventTarget.addEventListener("keydown", (e: KeyboardEvent) =>
        {
            this.states.back.keyStates.set(e.keyCode, KeyState.Pressed);
            if (this.states.current.keyStates.get(e.keyCode) !== KeyState.Pressed)
                this.states.back.keyStatesThisFrame.set(e.keyCode, KeyState.Pressed);
            if (this.preventBrowserShortcut && e.ctrlKey && (e.keyCode == Keys.S || e.keyCode == Keys.W))
            {
                e.preventDefault();
                e.stopPropagation();
            }
        });
        this.eventTarget.addEventListener("keyup", e =>
        {
            this.states.back.keyStates.set(e.keyCode, KeyState.Released);
            this.states.back.keyStatesThisFrame.set(e.keyCode, KeyState.Released);
        });
        this.eventTarget.addEventListener("mousedown", e =>
        {
            const rect = this.bound?.getBoundingClientRect();
            if (rect)
            {
                const offset = vec2(rect.left, rect?.top);
                const pos = minus(vec2(e.clientX, e.clientY), offset);
                if (pos.x < 0 || pos.y < 0 || pos.x > rect.width || pos.y > rect.height)
                    return;
            }
            this.states.back.keyStates.set(Keys.Mouse0 + e.button, KeyState.Pressed);
            if (this.states.current.keyStates.get(Keys.Mouse0 + e.button) !== KeyState.Pressed)
                this.states.back.keyStatesThisFrame.set(Keys.Mouse0 + e.button, KeyState.Pressed);
        });
        this.eventTarget.addEventListener("mouseup", e =>
        {
            const rect = this.bound?.getBoundingClientRect();
            if (rect)
            {
                const offset = vec2(rect.left, rect?.top);
                const pos = minus(vec2(e.clientX, e.clientY), offset);
                if (pos.x < 0 || pos.y < 0 || pos.x > rect.width || pos.y > rect.height)
                    return;
            }
            this.states.back.keyStates.set(Keys.Mouse0 + e.button, KeyState.Released);
            this.states.back.keyStatesThisFrame.set(Keys.Mouse0 + e.button, KeyState.Released);
        });
        this.eventTarget.addEventListener("mousemove", e =>
        {
            const pos = this.mapPointerPosition(e.clientX, e.clientY);
            if (!pos)
                return;
            
            this.states.back.mouseDelta.plus(this.mapPointerMovement(e.movementX, e.movementY) as vec2);
            this.states.back.mousePos = pos;
        });
        this.eventTarget.addEventListener("wheel", e =>
        {
            this.states.back.wheelDelta = e.deltaY;
        });
        this.eventTarget.addEventListener("touchstart", this.touchEventHandler(TouchState.Started));
        this.eventTarget.addEventListener("touchmove", this.touchEventHandler(TouchState.Moved));
        this.eventTarget.addEventListener("touchend", this.touchEventHandler(TouchState.Ended));
        this.eventTarget.addEventListener("touchcancel", this.touchEventHandler(TouchState.Canceled));

        for (const key in Keys)
        {
            if (!isNaN(key as any))
                continue;
            if (Keys.hasOwnProperty(key))
            {
                this.states.back.keyStates.set((Keys as any)[key], KeyState.Released);
            }
        }
        window.addEventListener("beforeunload", (e) =>
        {
            if (this.preventBrowserShortcut && (this.states.back.keyStates.get(Keys.W) === KeyState.Pressed || this.states.back.keyStates.get(Keys.Control)=== KeyState.Pressed))
            {
                e.preventDefault();
                e.returnValue = "Really want to quit?";
            }
        });
    }
    get pointerPosition() { return this.states.current.mousePos }
    get pointerDelta() { return this.states.current.mouseDelta }
    get wheelDelta() { return this.states.current.wheelDelta }
    get touches() { return this.states.current.touchList as Readonly<TouchInput[]> }
    getKey(key: Keys)
    {
        return this.states.current.keyStates.get(key) === KeyState.Pressed ? true : false;
    }
    getKeyDown(key: Keys)
    {
        return this.states.current.keyStatesThisFrame.get(key) === KeyState.Pressed ? true : false;
    }
    getKeyUp(key: Keys)
    {
        return this.states.current.keyStatesThisFrame.get(key) === KeyState.Released ? true : false;
    }
    getTouchByID(id: number)
    {
        return this.states.current.touches.get(id);
    }
    update()
    {
        this.states.update();
        this.states.back.keyStatesThisFrame.clear();
        this.states.back.mouseDelta = vec2.zero();
        this.states.back.wheelDelta = 0;
        this.states.back.touches.clear();
        for (const [key, value] of this.states.current.keyStates)
        {
            this.states.back.keyStates.set(key, value);
        }
        for (const [key, value] of this.states.current.touches)
        {
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
    lockPointer()
    {
        this.pointerLockElement.requestPointerLock();
    }
    releasePointer()
    {
        document.exitPointerLock();
    }

    private touchEventHandler(eventState: TouchState)
    {
        return (e: TouchEvent) =>
        {
            for (let i = 0; i < e.changedTouches.length; i++)
            {
                const touch = e.changedTouches.item(i) as Touch;
                const pos = this.mapPointerPosition(touch.clientX, touch.clientY);
                // console.log(eventState, pos);
                if (!pos)
                    continue;
                let state = this.states.back.touches.get(touch.identifier);
                if (!state)
                {
                    state = {
                        id: touch.identifier,
                        pos,
                        state: eventState,
                        startPos: pos.clone(),
                    }
                    this.states.back.touches.set(touch.identifier, state);
                }
                else
                {
                    state.state |= eventState;
                    state.pos.set(pos);
                }
            }
        };
    }
    private mapPointerMovement(movementX: number, movementY: number)
    {
        if (!this.renderer)
            this.renderer = GlobalContext().renderer;
        if (!this.renderer)
            return undefined;
        
        const rect = this.renderer.canvas.getBoundingClientRect();
        return vec2(movementX, movementY).mul(this.renderer.canvasSize).div(vec2(rect.width, rect.height));
    }
    private mapPointerPosition(clientX: number, clientY: number)
    {
        if (!this.renderer)
            this.renderer = GlobalContext().renderer;
        if (!this.renderer)
            return undefined;
        
        const eventBound = this.bound || this.renderer?.canvas || windowBound;
        const rect = eventBound.getBoundingClientRect();
        const rendererRect = this.renderer.canvas.getBoundingClientRect();
        const pos = minus(vec2(clientX, clientY), vec2(rect.left, rect.top));
        if (pos.x < 0 || pos.y < 0 || pos.x >= rect.width || pos.y >= rect.height)
        {
            return undefined;
        }
        pos.x -= (rendererRect.left - rect.left);
        pos.y -= (rendererRect.top - rect.top);
        
        pos.mul(this.renderer.canvasSize).div(vec2(rendererRect.width, rendererRect.height));
        return pos;
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
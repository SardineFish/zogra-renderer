
export type ConstructorType<T> = { prototype: T } & Function;

export class DoubleBuffer<T>
{
    private currentIdx = 0;
    private buffers: T[];
    get current() { return this.buffers[this.currentIdx % 2] }
    set current(value: T) { this.buffers[this.currentIdx % 2] = value}
    get back() { return this.buffers[(this.currentIdx + 1) % 2] }
    set back(value: T) { this.buffers[(this.currentIdx + 1) % 2] = value }
    
    constructor(init: () => T)
    {
        this.buffers = [init(), init()];
    }
    update()
    {
        this.currentIdx++;
    }
}
export class EntityBuffer {
    constructor() {
        this.buffer = [];
    }
    push(entity) {
        Object.assign(entity, {
            _index: this.buffer.length,
            _buffer: this,
        });
        this.buffer.push(entity);
        return entity;
    }
    swapRemove(entity) {
        if (entity._index < 0)
            return;
        this.buffer[entity._index] = this.buffer[this.buffer.length - 1];
        if (entity._index !== this.buffer.length - 1) {
            this.buffer[entity._index]._index = entity._index;
        }
        this.buffer.length -= 1;
        entity._index = -1;
    }
}
export class ShapeBuffer extends EntityBuffer {
    constructor(type) {
        super();
        this.type = type;
    }
}
//# sourceMappingURL=entity-buffer.js.map
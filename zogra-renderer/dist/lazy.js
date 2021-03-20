"use strict";
const Lazy = function () {
    this.initialized = false;
    this.init = (params) => {
        for (const key in params) {
            this[key] = params[key];
        }
    };
};
//# sourceMappingURL=lazy.js.map
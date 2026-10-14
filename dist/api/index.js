"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
let cachedHandler;
async function default_1(req, res) {
    if (!cachedHandler) {
        try {
            const mainModule = require('../dist/src/main.js');
            cachedHandler = mainModule.default || mainModule;
        }
        catch (err) {
            try {
                const mainModule = require('../dist/src/main');
                cachedHandler = mainModule.default || mainModule;
            }
            catch (err2) {
                return res.status(500).json({
                    error: 'Failed to load compiled NestJS handler from dist',
                    message: err?.message,
                    message2: err2?.message,
                    stack: err?.stack,
                });
            }
        }
    }
    return cachedHandler(req, res);
}
//# sourceMappingURL=index.js.map
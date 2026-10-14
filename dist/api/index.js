"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
async function default_1(req, res) {
    try {
        const mainModule = require('../src/main');
        const handler = mainModule.default || mainModule;
        return await handler(req, res);
    }
    catch (err) {
        return res.status(500).json({
            error: 'Serverless Function Load Error',
            message: err?.message || String(err),
            stack: err?.stack || undefined,
        });
    }
}
//# sourceMappingURL=index.js.map
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const path = __importStar(require("path"));
let cachedHandler;
function loadMainHandler() {
    const candidates = [
        path.resolve(process.cwd(), 'dist/src/main.js'),
        path.resolve(process.cwd(), 'dist/src/main'),
        path.resolve(__dirname, '../dist/src/main.js'),
        path.resolve(__dirname, '../dist/src/main'),
        '../dist/src/main.js',
        '../dist/src/main',
        '../src/main',
    ];
    let lastError;
    for (const candidate of candidates) {
        try {
            const mod = require(candidate);
            return mod.default || mod;
        }
        catch (err) {
            lastError = err;
        }
    }
    throw lastError;
}
async function default_1(req, res) {
    if (!cachedHandler) {
        try {
            cachedHandler = loadMainHandler();
        }
        catch (err) {
            return res.status(500).json({
                error: 'Failed to load compiled NestJS handler',
                cwd: process.cwd(),
                dirname: __dirname,
                message: err?.message,
                stack: err?.stack,
            });
        }
    }
    return cachedHandler(req, res);
}
//# sourceMappingURL=index.js.map
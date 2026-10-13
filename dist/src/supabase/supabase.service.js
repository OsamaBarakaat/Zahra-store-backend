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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var SupabaseService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupabaseService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const supabase_js_1 = require("@supabase/supabase-js");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
let SupabaseService = SupabaseService_1 = class SupabaseService {
    configService;
    logger = new common_1.Logger(SupabaseService_1.name);
    supabaseClient = null;
    isConfigured;
    constructor(configService) {
        this.configService = configService;
        const supabaseUrl = this.configService.get('SUPABASE_URL');
        const supabaseKey = this.configService.get('SUPABASE_SERVICE_ROLE_KEY') ||
            this.configService.get('SUPABASE_ANON_KEY');
        if (supabaseUrl &&
            supabaseKey &&
            !supabaseUrl.includes('example.supabase.co') &&
            !supabaseKey.includes('demo-')) {
            try {
                this.supabaseClient = (0, supabase_js_1.createClient)(supabaseUrl, supabaseKey);
                this.isConfigured = true;
                this.logger.log('✅ Supabase Client initialized successfully.');
            }
            catch (err) {
                this.logger.warn(`Failed to initialize Supabase Client: ${err.message}`);
                this.isConfigured = false;
            }
        }
        else {
            this.isConfigured = false;
            this.logger.log('ℹ️ Supabase credentials not set or using demo keys. Storage will use local file system fallback.');
        }
    }
    getClient() {
        return this.supabaseClient;
    }
    async uploadFile(bucket, filePath, fileBuffer, contentType) {
        if (this.supabaseClient) {
            try {
                const { data, error } = await this.supabaseClient.storage
                    .from(bucket)
                    .upload(filePath, fileBuffer, {
                    contentType,
                    upsert: true,
                });
                if (error) {
                    this.logger.warn(`Supabase storage upload error: ${error.message}. Falling back to local storage.`);
                }
                else if (data) {
                    const { data: publicData } = this.supabaseClient.storage
                        .from(bucket)
                        .getPublicUrl(filePath);
                    return publicData.publicUrl;
                }
            }
            catch (err) {
                this.logger.warn(`Supabase upload failed: ${err.message}. Using local fallback.`);
            }
        }
        const basePath = process.env.VERCEL ? path.resolve('/tmp', 'uploads') : path.resolve(process.cwd(), 'uploads');
        const uploadsDir = path.resolve(basePath, bucket);
        try {
            if (!fs.existsSync(uploadsDir)) {
                fs.mkdirSync(uploadsDir, { recursive: true });
            }
            const fullPath = path.join(uploadsDir, filePath);
            fs.writeFileSync(fullPath, fileBuffer);
        }
        catch (e) {
            this.logger.warn(`Could not save local file fallback: ${e.message}`);
        }
        return `/uploads/${bucket}/${filePath}`;
    }
    getPublicUrl(bucket, filePath) {
        if (this.supabaseClient) {
            const { data } = this.supabaseClient.storage.from(bucket).getPublicUrl(filePath);
            return data.publicUrl;
        }
        return `/uploads/${bucket}/${filePath}`;
    }
    async deleteFile(bucket, filePath) {
        if (this.supabaseClient) {
            await this.supabaseClient.storage.from(bucket).remove([filePath]);
        }
        else {
            const basePath = process.env.VERCEL ? path.resolve('/tmp', 'uploads') : path.resolve(process.cwd(), 'uploads');
            const fullPath = path.resolve(basePath, bucket, filePath);
            try {
                if (fs.existsSync(fullPath)) {
                    fs.unlinkSync(fullPath);
                }
            }
            catch { }
        }
    }
};
exports.SupabaseService = SupabaseService;
exports.SupabaseService = SupabaseService = SupabaseService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], SupabaseService);
//# sourceMappingURL=supabase.service.js.map
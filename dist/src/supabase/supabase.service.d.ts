import { ConfigService } from '@nestjs/config';
import { SupabaseClient } from '@supabase/supabase-js';
export declare class SupabaseService {
    private configService;
    private readonly logger;
    private supabaseClient;
    readonly isConfigured: boolean;
    constructor(configService: ConfigService);
    getClient(): SupabaseClient | null;
    uploadFile(bucket: string, filePath: string, fileBuffer: Buffer, contentType: string): Promise<string>;
    getPublicUrl(bucket: string, filePath: string): string;
    deleteFile(bucket: string, filePath: string): Promise<void>;
}

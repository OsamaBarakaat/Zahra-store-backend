import { SupabaseService } from '../supabase/supabase.service';
export declare class StorageController {
    private readonly supabaseService;
    constructor(supabaseService: SupabaseService);
    uploadFile(file: Express.Multer.File, bucket?: string): Promise<{
        url: string;
        fileName: string;
        bucket: string;
    }>;
}

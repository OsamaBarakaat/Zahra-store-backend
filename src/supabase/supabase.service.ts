import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class SupabaseService {
  private readonly logger = new Logger(SupabaseService.name);
  private supabaseClient: SupabaseClient | null = null;
  public readonly isConfigured: boolean;

  constructor(private configService: ConfigService) {
    const supabaseUrl = this.configService.get<string>('SUPABASE_URL');
    const supabaseKey =
      this.configService.get<string>('SUPABASE_SERVICE_ROLE_KEY') ||
      this.configService.get<string>('SUPABASE_ANON_KEY');

    if (
      supabaseUrl &&
      supabaseKey &&
      !supabaseUrl.includes('example.supabase.co') &&
      !supabaseKey.includes('demo-')
    ) {
      try {
        this.supabaseClient = createClient(supabaseUrl, supabaseKey);
        this.isConfigured = true;
        this.logger.log('✅ Supabase Client initialized successfully.');
      } catch (err) {
        this.logger.warn(`Failed to initialize Supabase Client: ${err.message}`);
        this.isConfigured = false;
      }
    } else {
      this.isConfigured = false;
      this.logger.log(
        'ℹ️ Supabase credentials not set or using demo keys. Storage will use local file system fallback.',
      );
    }
  }

  getClient(): SupabaseClient | null {
    return this.supabaseClient;
  }

  /**
   * Upload file to Supabase Storage bucket, or fallback to local disk storage
   */
  async uploadFile(
    bucket: string,
    filePath: string,
    fileBuffer: Buffer,
    contentType: string,
  ): Promise<string> {
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
        } else if (data) {
          const { data: publicData } = this.supabaseClient.storage
            .from(bucket)
            .getPublicUrl(filePath);
          return publicData.publicUrl;
        }
      } catch (err) {
        this.logger.warn(`Supabase upload failed: ${err.message}. Using local fallback.`);
      }
    }

    // Local file fallback
    const uploadsDir = path.resolve(process.cwd(), 'uploads', bucket);
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const fullPath = path.join(uploadsDir, filePath);
    fs.writeFileSync(fullPath, fileBuffer);
    return `/uploads/${bucket}/${filePath}`;
  }

  /**
   * Get public URL for a file
   */
  getPublicUrl(bucket: string, filePath: string): string {
    if (this.supabaseClient) {
      const { data } = this.supabaseClient.storage.from(bucket).getPublicUrl(filePath);
      return data.publicUrl;
    }
    return `/uploads/${bucket}/${filePath}`;
  }

  /**
   * Delete file from storage
   */
  async deleteFile(bucket: string, filePath: string): Promise<void> {
    if (this.supabaseClient) {
      await this.supabaseClient.storage.from(bucket).remove([filePath]);
    } else {
      const fullPath = path.resolve(process.cwd(), 'uploads', bucket, filePath);
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
      }
    }
  }
}

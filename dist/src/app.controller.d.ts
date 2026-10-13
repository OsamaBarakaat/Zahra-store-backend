import type { Response } from 'express';
export declare class AppController {
    getRoot(res: Response): Response<any, Record<string, any>>;
    getIndexHtml(res: Response): Response<any, Record<string, any>>;
}

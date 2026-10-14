import { Request, Response } from 'express';

let cachedHandler: any;

export default async function (req: Request, res: Response) {
  if (!cachedHandler) {
    try {
      const mainModule = require('../dist/src/main.js');
      cachedHandler = mainModule.default || mainModule;
    } catch (err: any) {
      try {
        const mainModule = require('../dist/src/main');
        cachedHandler = mainModule.default || mainModule;
      } catch (err2: any) {
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

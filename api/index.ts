import { Request, Response } from 'express';

export default async function (req: Request, res: Response) {
  try {
    const mainModule = require('../src/main');
    const handler = mainModule.default || mainModule;
    return await handler(req, res);
  } catch (err: any) {
    return res.status(500).json({
      error: 'Serverless Function Load Error',
      message: err?.message || String(err),
      stack: err?.stack || undefined,
    });
  }
}

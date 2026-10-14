import { Request, Response } from 'express';
import * as path from 'path';

let cachedHandler: any;

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

  let lastError: any;
  for (const candidate of candidates) {
    try {
      const mod = require(candidate);
      return mod.default || mod;
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError;
}

export default async function (req: Request, res: Response) {
  if (!cachedHandler) {
    try {
      cachedHandler = loadMainHandler();
    } catch (err: any) {
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

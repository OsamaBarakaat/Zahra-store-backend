import { Controller, Get, Res } from '@nestjs/common';
import type { Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import { EMBEDDED_ADMIN_HTML } from './admin-html';

let cachedHtml: string | null = null;

function getAdminHtml(): string {
  if (cachedHtml) return cachedHtml;

  // Try reading fresh file from disk first (useful for local dev)
  const candidatePaths = [
    path.resolve(process.cwd(), 'public', 'index.html'),
    path.resolve(__dirname, '..', '..', 'public', 'index.html'),
    path.resolve(__dirname, '..', 'public', 'index.html'),
    path.resolve(__dirname, 'public', 'index.html'),
  ];

  for (const candidate of candidatePaths) {
    if (fs.existsSync(candidate)) {
      try {
        cachedHtml = fs.readFileSync(candidate, 'utf-8');
        return cachedHtml;
      } catch {}
    }
  }

  // Fallback to embedded HTML (100% reliable in Vercel serverless functions)
  cachedHtml = EMBEDDED_ADMIN_HTML;
  return cachedHtml;
}

@Controller()
export class AppController {
  @Get()
  getRoot(@Res() res: Response) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.send(getAdminHtml());
  }

  @Get(['admin', 'admin/{*path}'])
  getAdmin(@Res() res: Response) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.send(getAdminHtml());
  }

  @Get('index.html')
  getIndexHtml(@Res() res: Response) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.send(getAdminHtml());
  }
}

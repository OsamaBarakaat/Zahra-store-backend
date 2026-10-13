import handler from '../src/main';
import { Request, Response } from 'express';

export default async function (req: Request, res: Response) {
  return handler(req, res);
}

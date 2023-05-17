import { ApiError } from '../exceptions/ApiError';
import { Request, Response, NextFunction } from 'express';
export declare function ErrorMiddleware(err: ApiError, req: Request, res: Response, next: NextFunction): Response<any, Record<string, any>>;

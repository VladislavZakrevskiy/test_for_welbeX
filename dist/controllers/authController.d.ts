import { NextFunction, Request, Response } from "express";
declare class AuthController {
    registration(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
    login(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    logout(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    refresh(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
}
declare const _default: AuthController;
export default _default;

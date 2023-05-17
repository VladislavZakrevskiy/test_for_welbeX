import { NextFunction, Request, Response } from "express";
declare class postsController {
    getPost(req: Request, res: Response, next: NextFunction): Promise<void>;
    getPostsUser(req: Request, res: Response, next: NextFunction): Promise<void>;
    createPost(req: Request, res: Response, next: NextFunction): Promise<void>;
    getPosts(req: Request, res: Response, next: NextFunction): Promise<void>;
    update(req: Request, res: Response, next: NextFunction): Promise<void>;
    delete(req: Request, res: Response, next: NextFunction): Promise<void>;
}
declare const _default: postsController;
export default _default;

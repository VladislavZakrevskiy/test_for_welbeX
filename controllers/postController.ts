import { NextFunction, Request, Response } from "express"
import postService from "../service/postService"
import fileService from "../service/fileService"


class postsController {
    async getPost(req: Request, res: Response, next: NextFunction){
        try {
            const {post_id} = req.params
            const response = await postService.getPost(post_id)
            res.json(response)
        } catch (e) {
            console.log(e)
            next(e)
        }
    }

    async getPostsUser(req: Request, res: Response, next: NextFunction){
        try {
            const {limit, page, id} = req.query
            //@ts-ignore
            const response = await postService.getPostsUser(id, limit, page)
            res.json(response)
        } catch (e) {
            console.log(e)
            next(e)
        }
    }

    async createPost(req: Request, res: Response, next: NextFunction){
        try {
            const {body, id} = req.body
            const files = req.files
            const fileNames = fileService.upload(files)
            const response = await postService.createPost(body, id, fileNames)
            res.json(response)
        } catch (e) {
            console.log(e)
            next(e)
        }
    }

    async getPosts (req: Request, res: Response, next: NextFunction) {
        try {
            const {limit, page} = req.query
            //@ts-ignore
            const response = await postService.getPosts(limit,page)
            res.json(response)
        } catch (e) {
            console.log(e)
            next(e)
        }
    }

    async update (req: Request, res: Response, next: NextFunction) {
        try {
            const {message, id} = req.body
            //@ts-ignore
            const response = await postService.updatePost(message, id)
            res.json(response)
        } catch (e) {
            console.log(e)
            next(e)
        }
    }

}

export default new postsController()
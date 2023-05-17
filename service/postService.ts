import { ApiError } from "../exceptions/ApiError"
import prisma from "../prisma"
import { pagination } from "../utils/pagination"


class postsService {
    async getPost(id: string){
        const post = await prisma.post.findUnique({where: {post_id: id}})
        if(post){
            return post
        }
        throw ApiError.badRequest('Не существует', ['not exist'])
    }

    async getPostsUser(id: string, limit: number = 20, page: number = 1){
        const posts = await prisma.post.findMany({where:{user_id: id}})
        const response = pagination(posts, limit, page)
        return response
    }

    async getPosts(limit: number, page: number){
        const posts = await prisma.post.findMany({take: limit, skip: page * 20})
        return posts
    }

    async createPost( message: string, id: string, media: string[]){
        const userPost = await prisma.post.create({data: {created_At: new Date(), message, user_id: id, media}})
        return userPost       
    }

    async updatePost(message: string, id: string) {
        const post = await prisma.post.update({data: {message}, where: {post_id: id}})
        return post
    }
}


export default new postsService()
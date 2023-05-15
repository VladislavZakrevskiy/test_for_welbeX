import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { createPost } from './dto/createPost';
import { FileService, fileType } from 'src/files/files.service';


@Injectable()
export class PostService {
    
    constructor(private prisma: PrismaService, private fileService: FileService) {}

    async create (dto: createPost, picture: string[], audio: string) {
        const audioPath = this.fileService.createFile(fileType.AUDIO, audio)
        const picturePaths: string[] = []
        for(let i = 0;i < picture.length;i++) {
            const picturePath = this.fileService.createFile(fileType.IMAGE, picture)
            picturePaths.push(picturePath)
        }
        const post = await this.prisma.post.create({data: {
            ...dto, media: [audioPath, ...picturePaths]
        }})
        return post
    }

    async getAll (count: number = 20, offset: number = 0) {
        const posts = await this.prisma.post.findMany({skip: +offset, take: +count})
        return posts
    }

    async search (query: string) {
        const posts = await this.prisma.post.findMany({where: {message: {contains: query, mode: 'insensitive'}}})
        return posts
    }

    async getOne (id: string) {
        const post = await this.prisma.post.findUnique({where: {post_id: id}})
        return post
    }

    async delete (id: string) {
        const post = await this.prisma.post.delete({where: {post_id: id}})
        return post.post_id
    }

    async update (dto: createPost, id: string) {
        const post = this.prisma.post.update({data: {...dto}, where: {post_id: id}})
        return post
    }

}
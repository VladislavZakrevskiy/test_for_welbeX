import { Body, Controller, Delete, Get, Param, Post, UploadedFiles, UseInterceptors, Query, Patch } from "@nestjs/common";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { createPost } from "./dto/createPost";
import { PostService } from "./posts.service";


@Controller('/post')
export class PostController {

    constructor(private PostService: PostService) {}

    @Post()
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'picture', maxCount: 10 },
        { name: 'audio', maxCount: 1 },
      ]))
    create(@UploadedFiles() files, @Body() dto: createPost) {
        const {picture, audio} = files
        return this.PostService.create(dto, picture, audio[0])
    }

    @Get()
    getAll (
        @Query('count') count: number, 
        @Query('offset') offset: number
        ) {
        const tracks = this.PostService.getAll(count, offset)
        return tracks
    }

    @Get('/search')
    search ( @Query('query') query: string, ) {
        const tracks = this.PostService.search(query)
        return tracks
    }

    @Get(':id')
    getOne (@Param('id') id: string) {
        const track = this.PostService.getOne(id)
        return track
    }

    @Delete(':id')
    delete (@Param('id') id: string) {
        const track = this.PostService.delete(id)
        return track
    }

    @Patch('/update/:id')
    update(dto: createPost, @Param('id') id: string) {
        const post = this.PostService.update(dto, id)
        return post
    }

}
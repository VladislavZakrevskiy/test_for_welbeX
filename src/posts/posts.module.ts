import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma.module";
import { FileService } from "src/files/files.service";
import { PostController } from "./posts.controller";
import { PostService } from "./posts.service";






@Module({
    controllers: [PostController],
    providers: [PostService, FileService],
    imports: [PrismaModule]
})
export class PostModule {

}
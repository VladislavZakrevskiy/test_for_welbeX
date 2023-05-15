import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";





@Injectable()
export class UserService {

    constructor(private prisma: PrismaService){}

    async getAll() {
        const users = this.prisma.user.findMany()
        return users
    }

    async getOne(id: string) {
        const user = this.prisma.user.findUnique({where: {user_id: id}})
        return user
    }

    async delete(id: string) {
        const user = this.prisma.user.delete({where: {user_id: id}})
        return user
    }

}
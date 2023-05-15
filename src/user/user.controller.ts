import { Controller, Delete, Get, Param } from "@nestjs/common";
import { UserService } from './user.service';





@Controller('/user')
export class UserController {

    constructor(private userService:UserService){}

    @Get()
    getAll () {
        const users = this.userService.getAll()
        return users
    }

    @Get('/:id')
    getOne (@Param('id') id: string) {
        const user = this.userService.getOne(id)
        return user
    }

    @Delete('/:id')
    delete(@Param('id') id: string) {
        const user = this.userService.delete(id)
        return user
    }
}

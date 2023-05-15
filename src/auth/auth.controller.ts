import { Body, Controller, Delete, Get, Param, Post, UploadedFiles, UseInterceptors, Query, Req, Res } from "@nestjs/common";
import { RegistrationDto } from "./dto/registration";
import { Request, Response } from "express";
import { AuthService } from './auth.service';


@Controller('/auth')
export class AuthController {

    constructor(private authService: AuthService) {}
    
    @Post('/registration')
    async registration (@Body() dto: RegistrationDto, @Res() res: Response) {
        const data = await this.authService.registration(dto)
        res.cookie('refresh_token', data.refreshToken)
        res.status(200).send(data)
    }

    @Post('/login')
    async login (@Body() dto: RegistrationDto, @Res() res: Response) {
        const data = await this.authService.login(dto)
        res.cookie('refresh_token', data.refreshToken)
        res.status(200).send(data)
    }

    @Post('/logout/:id')
    async logout (@Param('id') id: string, @Res() res: Response) {
        const data = await this.authService.logout(id)
        res.clearCookie('refresh_token')
        res.status(200).send(data)
    }

    @Get('/refresh')
    async refresh (@Req() req: Request, @Res() res: Response) {
        const cookies = req.cookies
        const data = await this.authService.refresh(cookies['refresh_token'])
        res.cookie('refresh_token', data.refreshToken)
        res.status(200).send(data)
    }
}


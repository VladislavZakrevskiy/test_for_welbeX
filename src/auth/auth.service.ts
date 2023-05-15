import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegistrationDto } from './dto/registration';
import { PrismaService } from 'src/prisma.service';
import bcrypt from 'bcrypt'
import { TokenService } from '../token/token.service';




@Injectable()
export class AuthService {

    constructor(private prisma: PrismaService, private tokenService: TokenService) {}

    async registration ( dto: RegistrationDto) {
        const candidate = await this.prisma.user.findUnique({where: {email: dto.email}})
        if(!candidate) {
            const hashPassword = await bcrypt.hash(dto.password, 7)
            const {accessToken, refreshToken} = this.tokenService.generateTokens(dto)
            const user = await this.prisma.user.create({data: {email: dto.email, password: hashPassword, token: refreshToken}})
            await this.tokenService.saveToken(user.user_id, refreshToken)
            
            return {accessToken, refreshToken, user}
        }
    }

    async login (dto: RegistrationDto) {
        const user = await this.prisma.user.findUnique({where: {email: dto.email}})
        if(!user){
            throw new HttpException(`User doesn't exist`, HttpStatus.UNAUTHORIZED)
        }
        const isPassEquals = await bcrypt.compare(dto.password, (await user).password)
        if(!isPassEquals) {
            throw new HttpException('wrong password', HttpStatus.UNAUTHORIZED)
        }
        const tokens = this.tokenService.generateTokens(dto)
        await this.tokenService.saveToken(user.user_id, tokens.refreshToken)

        return {...tokens, user}
    }

    async logout (user_id: string) {
        const token = await this.tokenService.remove(user_id)
        return token
    }

    async refresh (refresh_token) {
        if(!refresh_token) {
            throw new HttpException('no refresh token', HttpStatus.UNAUTHORIZED)
        }
        const userData = this.tokenService.validateRefreshToken(refresh_token)
        const tokenDB = await this.tokenService.find(refresh_token)
        if (!userData || !tokenDB) {
            throw new HttpException('error', HttpStatus.UNAUTHORIZED)
        }
        const user = await this.prisma.user.findUnique({where: {email: userData.email}})
        const tokens = this.tokenService.generateTokens(user)
        await this.tokenService.saveToken(user.user_id, tokens.refreshToken)
        return {...tokens, user}
    }
}
import { Injectable } from '@nestjs/common';
import jwt from 'jsonwebtoken'
import { RegistrationDto } from 'src/auth/dto/registration';
import { PrismaService } from 'src/prisma.service';




@Injectable()
export class TokenService {

    constructor(private prisma: PrismaService) {}

    generateTokens (payload: RegistrationDto) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
            expiresIn: '30m'
        })
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
            expiresIn: '30d'
        })

        return {
            accessToken, 
            refreshToken
        }
    }

    async saveToken (user_id: string, refresh: string) {
        const tokenDate = await this.prisma.refresh_token.findUnique({where: {user_id}})
        if(tokenDate){
            return await this.prisma.refresh_token.update({data: {token :refresh, user_id}, where: {user_id}})
        }
        const token = await this.prisma.refresh_token.create({data: {token: refresh, user_id}}) 
        return token
    }

    async remove(user_id: string) {
        const tokenData = await this.prisma.refresh_token.delete({where: {user_id}})
        return tokenData
    }

    async find(refresh_token: string) {
        const tokenData = await this.prisma.refresh_token.findFirst({where: {token: refresh_token}})
        return tokenData
    }

    validateAccessToken (token: string) {
        try {
            const userData: RegistrationDto = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
            return userData
        } catch (error) {
            return null
        }
    }

    validateRefreshToken (token: string) {
        try {
            const userData: RegistrationDto = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
            return userData
        } catch (error) {
            return null
        }
    }
}

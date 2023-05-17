import { IUser } from "../dto/User"
import jwt from 'jsonwebtoken'
import prisma from "../prisma"

class tokenService {
    generateTokens (payload: IUser) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET!, {
            expiresIn: '30m'
        })
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, {
            expiresIn: '30d'
        })

        return {
            accessToken, 
            refreshToken
        }
    }

    async saveToken (user_id: string, refresh: string) {
        const tokenDate = await prisma.refresh_token.findUnique({where: {user_id}})
        if(tokenDate){
            await prisma.refresh_token.update({data: {token: refresh, user_id}, where: {user_id}})
            return
        }
        const token = await prisma.refresh_token.create({data: {token: refresh, user_id}})
        return token
    }

    async remove(user_id: string) {
        const tokenData = await prisma.refresh_token.delete({where: {user_id}})
        return tokenData
    }

    async find(refreshToken: string) {
        const tokenData = await prisma.refresh_token.findFirst({where: {token: refreshToken}})
        return tokenData
    }

    validateAccessToken (accessToken: string) {
        try {
            const userData = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET!)
            return userData
        } catch (error) {
            return null
        }
    }

    validateRefreshToken (refreshToken: string): IUser | null {
        try {
            //@ts-ignore
            const userData: IUser = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!)
            return userData
        } catch (error) {
            return null
        }
    }
}

export default new tokenService()
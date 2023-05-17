import prisma from "../prisma"
import * as bcrypt from 'bcrypt'
import * as uuid from 'uuid'
import tokenService from "./tokenService"
import { IUser, User } from '../dto/User';
import {ApiError} from '../exceptions/ApiError'


class authService {
    async registration (email: string, password: string) {
        const candidate = await prisma.user.findUnique({where: {email}})
        if(!candidate){
            const hashPassword = await bcrypt.hash(password, 7)
            const user = await prisma.user.create({data: {email, password: hashPassword}})
            const userDto = new User(user)
            const tokens = tokenService.generateTokens({...userDto})
            await tokenService.saveToken(userDto.user_id!, tokens.refreshToken)
            return {...tokens, user: userDto}
        }
        else {
            throw ApiError.badRequest(`Пользователь с почтовым адресом ${email} уже существует`, [])
        }

    }

    async login (email: string, password: string) {
        const user = await prisma.user.findUnique({where: {email}})
        if(!user){
            throw ApiError.badRequest('Пользователь не был найден', ['not exist'])
        }
        const isPassEquals = await bcrypt.compare(password, user.password)
        if(!isPassEquals){
            throw ApiError.badRequest('Неверный пароль', ['password'])
        }
        const userDto = new User(user)
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.user_id!, tokens.refreshToken)

        return {...tokens, user: userDto}
    }

    async logout(user_id: string){
        const token = await tokenService.remove(user_id)
        return token
    }

    async refresh(refreshToken: string) {
        if(!refreshToken){
            throw ApiError.UnauthorizedError()
        }
        const userData = tokenService.validateRefreshToken(refreshToken)
        const tokenDB = await tokenService.find(refreshToken)
        if(!userData || !tokenDB) {
            throw ApiError.UnauthorizedError()
        }
        const user = await prisma.user.findUnique({where: {user_id: userData.user_id}})
        const userDto = new User(user!)
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.user_id!, tokens.refreshToken)
        return {...tokens, user: userDto}
    }
}

export default new authService()




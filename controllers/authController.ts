import { NextFunction, Request, Response } from "express"
import { validationResult } from "express-validator"
import authService from '../service/authService'
import { ApiError } from "../exceptions/ApiError"


class AuthController {
    async registration(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                //@ts-ignore
                return next(ApiError.badRequest('Ошибка при валидации', errors.array()))
            }
           const {email, password} = req.body
           const userData = await authService.registration(email, password)
           res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true})
           return res.json(userData)
        } catch (e) {
            console.log(e)
            next(e)
        }
    }
    
    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const {email, password} = req.body
            const userData = await authService.login(email,password)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true})
           return res.json(userData)
        } catch (e) {
            next(e) 
        }
    }    
    
    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            const {user_id} = req.body
            const token = await authService.logout(user_id)
            res.clearCookie('refreshToken')
            return res.json(token)
        } catch (e) {
            console.log(e)
            next(e)
        }
    }
    
    async refresh(req: Request, res: Response, next: NextFunction) {
        try {
            const {refreshToken} = req.cookies
            console.log(refreshToken)
            const userData = await authService.refresh(refreshToken)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true})
           return res.json(userData)
        } catch (e) {
            next(e)
            console.log(e)
        }
    }
}

export default new AuthController()
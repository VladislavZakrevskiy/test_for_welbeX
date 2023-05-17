import { NextFunction, Request, Response } from "express"
import tokenService from "../service/tokenService"
import { ApiError } from "../exceptions/ApiError"

export function AuthMiddleware (req: Request, res: Response, next: NextFunction) {
    try {
        const authHeader = req.headers.authorization
        if(!authHeader) {
            throw ApiError.UnauthorizedError()
        }
        const accessToken = authHeader.split(' ')[1]
        if(!accessToken){
            throw ApiError.UnauthorizedError()
        }
        const userData = tokenService.validateAccessToken(accessToken)
        if(!userData) {
            throw ApiError.UnauthorizedError()
        }
        //@ts-ignore
        req.user = userData
        next()
    } catch (e) {
        return next(ApiError.UnauthorizedError())
    }
}
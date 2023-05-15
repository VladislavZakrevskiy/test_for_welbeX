// const ApiError = require('../exceptions/apiError')
// const tokenService = require('../service/tokenService')
// module.exports = function (req,res,next) {
//     try {
//         const authHeader = req.headers.authorization
//         if(!authHeader) {
//             throw ApiError.UnauthorizedError()
//         }
//         const accessToken = authHeader.split(' ')[1]
//         if(!accessToken){
//             throw ApiError.UnauthorizedError()
//         }
//         const userData = tokenService.validateAccessToken(accessToken)
//         if(!userData) {
//             throw ApiError.UnauthorizedError()
//         }
//         req.user = userData
//         next()
//     } catch (e) {
//         return next(ApiError.UnauthorizedError())
//     }
// }

import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken'
import { RegistrationDto } from 'src/auth/dto/registration';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    try {
        const authHeader = req.headers.authorization
        if(!authHeader){
            throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED)
        }
        const accessToken = authHeader.split(' ')[1]
        if(!accessToken){
            throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED)
        }
        const userData: RegistrationDto = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET)
        if(!userData) {
            throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED)
        }
        next();
    } catch (e) {
        next(new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED));  
    }
  }
}

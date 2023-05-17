import { ApiError } from '../exceptions/ApiError';
import { Request, Response, NextFunction} from 'express';


export function ErrorMiddleware (err: ApiError, req: Request, res: Response, next: NextFunction) {
    if(err.status){
        return res.status(err.status).json({message: err.message, errors: err.errors})
    }
    else {
        console.log(err)
        return res.status(500).json({message: 'Server Error'})
    }
}
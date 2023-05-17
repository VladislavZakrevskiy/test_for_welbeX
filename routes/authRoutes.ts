import {body} from 'express-validator'
import {AuthMiddleware} from '../middlewares/authMiddleware'
import express from 'express';
import authController from '../controllers/authController';

const router = express.Router()


router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({min: 3, max: 32}),
    authController.registration) //y
router.post('/login', authController.login)//y
router.post('/logout', authController.logout)//y
router.get('/refresh', authController.refresh)//y


export default router

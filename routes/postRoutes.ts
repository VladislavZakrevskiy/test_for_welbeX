import { AuthMiddleware } from "../middlewares/authMiddleware"
import postsController from '../controllers/postController'
import express from 'express';

const router = express.Router()

router.get('/:post_id', AuthMiddleware, postsController.getPost) //y
router.get('/user', AuthMiddleware, postsController.getPostsUser)//y
router.get('/posts', AuthMiddleware, postsController.getPosts)//y
router.post('/', AuthMiddleware, postsController.createPost) //y
router.patch('/', AuthMiddleware, postsController.update) //y


export default router 
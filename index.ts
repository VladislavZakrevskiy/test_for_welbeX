import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRouter from './routes/authRoutes'
import postsRouter from './routes/postRoutes'
import {ErrorMiddleware} from './middlewares/errorMiddleware'
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload'
import path from 'path';


dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}))
app.use(fileUpload())
app.use(express.static(path.resolve(__dirname, 'files')))

app.use('/auth', authRouter)
// app.use('/users', userRouter)
app.use('/posts', postsRouter)
app.use(ErrorMiddleware)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
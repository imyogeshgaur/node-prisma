import express, { json, urlencoded } from 'express';
const app = express();
import postRouter from './routes/post.routes';
import userRouter from './routes/user.routes';
import cors from 'cors';

app.use(urlencoded({ extended: true }))
app.use(json())
app.use(cors({
    origin: process.env.FRONTEND_URL as string
}))
app.use("/user", userRouter)
app.use("/post", postRouter)

app.listen(4000)

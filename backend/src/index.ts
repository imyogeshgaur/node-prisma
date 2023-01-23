import express, { urlencoded } from "express"
import userRouter from "./routes/user.routes";
import cors from 'cors';
const app = express();
import * as path from "path"
import dotenv from "dotenv";
import postRouter from "./routes/post.routes";
dotenv.config({ path: path.resolve("./.env") })

app.use(express.json())
app.use(urlencoded({ extended: true }))
app.use(cors({
    origin: process.env.CLIENT_URL as string
}))
app.use("/static/post", express.static(path.join(process.cwd(), "/src/uploads/Posts")))
app.use("/static/user", express.static(path.join(process.cwd(), "/src/uploads/Users")))

app.use("/user", userRouter)
app.use("/post", postRouter)

app.listen(4000)

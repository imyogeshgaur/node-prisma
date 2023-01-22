import express, { urlencoded } from "express"
import userRouter from "./routes/user.routes";
import cors from 'cors';
const app = express();
import * as path from "path"
import dotenv from "dotenv";
dotenv.config({path:path.resolve("./.env")})

app.use(express.json())
app.use(urlencoded({extended:true}))
app.use(cors({
    origin:process.env.CLIENT_URL as string 
}))


app.use("/user",userRouter)

app.listen(4000)

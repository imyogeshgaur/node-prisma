import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import * as path from "path"
import dotenv from "dotenv";
dotenv.config({ path: path.resolve("./.env") })

const authorization = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token: any = req.headers.authorization;
        const verify = jwt.verify(token, process.env.JWT_SECRET as string)
        if (verify) {
            next()
        } else {
            return res.status(400).send("Not Authorized !!!")
        }
    } catch (error) {
        console.log("Auth MiddleWare Error : ", error)
        return res.status(400).send("Not Authorized !!!")
    }
}

export default authorization;
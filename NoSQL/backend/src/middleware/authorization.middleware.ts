import { NextFunction, Request, Response } from "express";
import * as jwt from 'jsonwebtoken';
import {resolve} from 'path';
import {config} from 'dotenv';
config({path:resolve("./env")})

const authorization = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token:any = req.headers.authorization;
        const isauth = jwt.verify(token, process.env.JWT_SECRET as string);
        if (isauth) {
            next();
        } else {
            return res.status(400).send({ message: "Unauthorized Access !!!" })
        }
    } catch (error) {
        console.log("Authorization Middleware Error : ", error);
    }
}

export default authorization;
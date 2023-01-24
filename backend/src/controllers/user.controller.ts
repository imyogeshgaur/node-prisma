import { Request, Response } from "express";
import * as path from "path"
import dotenv from "dotenv";
dotenv.config({ path: path.resolve("./.env") })
import UserService from "../services/user.service";

class UserController {
    private req: Request;
    private res: Response;
    private service: UserService
    constructor(request: Request, response: Response) {
        this.req = request;
        this.res = response;
        this.service = new UserService();
    }

    async getListOfUsers() {
        try {
            const users = await this.service.getListOfUsers();
            if (users === 0) {
                return this.res.status(200).send("No Data Found !!!");
            }
            return this.res.status(200).send(users);
        } catch (error) {
            console.log(error)
            this.res.status(500).send("User's Controller : Internal Server Error !!!")
        }
    }

    async getASingleUser() {
        try {
            const id = this.req.params.id;
            const user = await this.service.getASingleUser(id);
            if (user === 0) {
                return this.res.status(200).send("No User Found !!!");
            }
            return this.res.status(200).send(user);
        } catch (error) {
            console.log(error)
            this.res.status(500).send("User's Controller : Internal Server Error !!!")
        }
    }

    async updateUser() {
        try {
            const id = this.req.params.id;
            const firstName = this.req.body.firstName;
            const middleName = this.req.body.middleName;
            const lastName = this.req.body.lastName;
            const phone = this.req.body.phone;
            const file = process.env.USER_IMAGE_URL as string + this.req.file?.filename
            const data = { firstName, middleName, lastName, phone, file }
            const updateData = await this.service.updateUser(id, data);
            if (updateData !== 0) {
                return this.res.status(200).send({ message: "User Details Updated !!!" })
            } else {
                return this.res.status(200).send({message:"User Details Not Updated !!!"})
            }
        } catch (error) {
            console.log(error)
            this.res.status(500).send("User's Controller : Internal Server Error !!!")
        }
    }

    async deleteUser() {
        try {
            const id = this.req.params.id;
            const deleteData = await this.service.deleteUser(id);
            if (deleteData !== 0) {
                return this.res.status(200).send({message:"User Deleted !!!"});
            }else{
                return this.res.status(200).send({message:"User Not Deleted !!!"});
            }
        } catch (error) {
            console.log(error)
            this.res.status(500).send("User's Controller : Internal Server Error !!!")
        }
    }

    //! Authentication Controller

    async signUpUser() {
        try {
            const data = this.req.body;
            const user = await this.service.signUpUser(data);
            return this.res.status(200).send(user);
        } catch (error) {
            console.log(error)
            this.res.status(500).send("User's Controller : Internal Server Error !!!")
        }
    }

    async loginUser() {
        try {
            const data = this.req.body;
            const token = await this.service.loginUser(data);
            if (token === -1) {
                return this.res.status(200).send("Invalid Credentials !!!");
            } else if (token === 0) {
                return this.res.status(200).send("Invalid Credentials !!!");
            } else {
                return this.res.status(200).send({ token });
            }
        } catch (error) {
            console.log(error)
            this.res.status(500).send("User's Controller : Internal Server Error !!!")
        }
    }
}

export default UserController
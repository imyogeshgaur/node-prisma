import { Request, Response } from "express";
import { userInfo } from "os";
import { send } from "process";
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
            const body = this.req.body;
            const updateData = await this.service.updateUser(id, body);
            if (updateData) {
                return this.res.status(200).send("User Details Updated !!!")
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
            if (deleteData) {
                this.res.status(200).send("User Deleted !!!");
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
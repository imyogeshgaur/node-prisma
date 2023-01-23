import { PrismaClient, User } from "@prisma/client"
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import * as path from "path"
import dotenv from "dotenv";
dotenv.config({ path: path.resolve("./.env") })

class UserService {
    private User: any;
    constructor() {
        const prisma = new PrismaClient()
        this.User = prisma.user;
    }
    async getListOfUsers() {
        try {
            const users = await this.User.findMany();
            if (users.length === 0) {
                return 0;
            } else {
                return users;
            }
        } catch (error) {
            console.log("User's Service : Internal Server Error !!!", error)
        }
    }

    async getASingleUser(id: string) {
        try {
            const user = await this.User.findFirst({
                where: {
                    userId: id
                }
            })
            if (user) {
                return user;
            } else {
                return 0;
            }
        } catch (error) {
            console.log("User's Service : Internal Server Error !!!", error)
        }
    }

    async updateUser(id: string, userData: any) {
        try {
            const user = await this.User.findFirst({
                where: {
                    userId: id
                }
            })
            if (user) {
                const password = userData.password;
                if (password) {
                    const newPassword = await bcrypt.hash(password, 12)
                    const updateUser = await this.User.update({
                        where: {
                            userId: id
                        },
                        data: {
                            phone : userData.phone,
                            firstName : userData.firstName,
                            middleName : userData.middleName,
                            lastName : userData.lastName,
                            password: newPassword
                        }
                    })
                    return updateUser;
                }
                else {
                    const updateUser = await this.User.update({
                        where: {
                            userId: id
                        },
                        data: {
                            phone : userData.phone,
                            firstName : userData.firstName,
                            middleName : userData.middleName,
                            lastName : userData.lastName,
                        }
                    })
                    return updateUser;
                }
            } else {
                return 0;
            }
        } catch (error) {
            console.log("User's Service : Internal Server Error !!!", error)
        }
    }

    async deleteUser(id: string) {
        try {
            const user = await this.User.findFirst({
                where: {
                    userId: id
                }
            })
            if (user) {
                const deleteUser = await this.User.delete({
                    where: {
                        userId: id
                    }
                })
                return deleteUser;
            } else {
                return 0;
            }
        } catch (error) {
            console.log("User's Service : Internal Server Error !!!", error)
        }
    }

    //! Authentication Service

    async signUpUser(userData: any) {
        try {
            const email = userData.email;
            const password = userData.password;
            const newPassword = await bcrypt.hash(password, 12);
            const user = await this.User.create({
                data: {
                    email,
                    password: newPassword
                }
            })
            return user
        } catch (error) {
            console.log("User's Service : Internal Server Error !!!", error)
        }
    }

    async loginUser(userData: any) {
        try {
            const email = userData.email;
            const password = userData.password;
            const user = await this.User.findFirst({
                where: {
                    email
                }
            })
            if (user) {
                const match = await bcrypt.compare(password, user.password);
                if (match) {
                    const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET as string)
                    return token;
                } else {
                    return 0;
                }
            } else {
                return -1;
            }
        } catch (error) {
            console.log("User's Service : Internal Server Error !!!", error)
        }
    }

}

export default UserService
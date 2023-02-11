import prisma from "../Database/db.config";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import * as path from "path"
import dotenv from "dotenv";
import decodeUser from "../helpers/decodeUser.helper";
dotenv.config({ path: path.resolve("./.env") })
import * as fs from "fs"

class UserService {
    private User: any;
    constructor() {
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
            if (id.length <= 40) {
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
            } else {
                const userRet = await decodeUser(id);
                const user = await this.User.findFirst({
                    where: {
                        userId: userRet?.userId
                    }
                })
                if (user) {
                    return user;
                } else {
                    return 0;
                }
            }
        } catch (error) {
            console.log("User's Service : Internal Server Error !!!", error)
        }
    }

    async updateUser(id: string, userData: any) {
        const { firstName, middleName, lastName, phone, file } = userData
        try {
            const user = await this.User.findFirst({
                where: {
                    userId: id
                }
            })
            if (user) {
                if (file.substr(34) !== undefined) {
                    if (
                        user.userImage === null
                        ||
                        user.userImage.substring(34) === undefined
                    ) {
                        const updateUser = await this.User.update({
                            where: {
                                userId: id
                            },
                            data: {
                                phone,
                                firstName,
                                middleName,
                                lastName,
                                userImage: file
                            }
                        })
                        return updateUser
                    } else {
                        const imagePath = path.join(process.cwd(), `/src/uploads/Users/${user.userImage.substr(34)}`)
                        fs.unlinkSync(imagePath);
                        const updateUser = await this.User.update({
                            where: {
                                userId: id
                            },
                            data: {
                                phone,
                                firstName,
                                middleName,
                                lastName,
                                userImage: file
                            }
                        })
                        return updateUser;
                    }
                }
                else {
                    const updateUser = await this.User.update({
                        where: {
                            userId: id
                        },
                        data: {
                            phone,
                            firstName,
                            middleName,
                            lastName,
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
            const enteredEmail = userData.email;
            const email = enteredEmail.toLowerCase();
            const userExist = await this.User.findFirst({
                where: {
                    email
                }
            })
            if (userExist) {
                return 0;
            } else {
                const password = userData.password;
                const newPassword = await bcrypt.hash(password, 12);
                const user = await this.User.create({
                    data: {
                        email,
                        password: newPassword
                    }
                })
                return user
            }
        } catch (error) {
            console.log("User's Service : Internal Server Error !!!", error)
        }
    }

    async loginUser(userData: any) {
        try {
            const enteredEmail = userData.email;
            const email = enteredEmail.toLowerCase();
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
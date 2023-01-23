import { PrismaClient } from "@prisma/client"
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();

const decodeUser = async (token: string) => {
    const User = prisma.user;
    const decodeVal: any = jwt.decode(token, { complete: true })
    const decodedUser = await User.findFirst({
        where: {
            userId: decodeVal.payload.userId as string
        }
    })
    return decodedUser;
}

export default decodeUser;
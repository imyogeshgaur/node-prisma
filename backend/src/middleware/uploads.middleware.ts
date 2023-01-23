import multer from "multer"
import { v4 as uuidv4 } from 'uuid';
import * as path from "path"
import dotenv from "dotenv";
dotenv.config({ path: path.resolve("./.env") })

const tempPostStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        const pathToFolder = path.resolve(process.env.POST_IMAGE_STORAGE as string)
        callback(null, pathToFolder);
    },
    filename: function (req, file, callback) {
        callback(null, uuidv4() + Date.now() + path.extname(file.originalname))
    }
});
const tempUserStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        const pathToFolder = path.resolve(process.env.USER_IMAGE_STORAGE as string)
        callback(null, pathToFolder);
    },
    filename: function (req, file, callback) {
        callback(null, uuidv4() + Date.now() + path.extname(file.originalname))
    }
});

export const uploadPost = multer({ storage: tempPostStorage }).single("postImage");
export const uploadUser = multer({ storage: tempUserStorage }).single("userImage");
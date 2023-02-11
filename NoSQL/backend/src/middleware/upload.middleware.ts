import multer from 'multer';
import {resolve,extname} from 'path';
import {config} from 'dotenv';
import {v4 as uuidv4} from 'uuid';
config({path:resolve("./env")})

const tempPostStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        const pathToFolder = resolve(process.env.POST_IMAGE_STORAGE as string)
        callback(null, pathToFolder);
    },
    filename: function (req, file, callback) {
        callback(null, uuidv4() + Date.now() + extname(file.originalname))
    }
});
const tempUserStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        const pathToFolder = resolve(process.env.USER_IMAGE_STORAGE as string)
        callback(null, pathToFolder);
    },
    filename: function (req, file, callback) {
        callback(null, uuidv4() + Date.now() + extname(file.originalname))
    }
});

export const uploadPost = multer({ storage: tempPostStorage }).single("postImage");
export const uploadUser = multer({ storage: tempUserStorage }).single("userImage");
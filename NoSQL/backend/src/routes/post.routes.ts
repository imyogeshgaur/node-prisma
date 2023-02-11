import {Request, Response, Router} from 'express';
import PostController from '../Controller/post.controller';
import authorization from '../middleware/authorization.middleware';
import { uploadPost } from '../middleware/upload.middleware';
const postRouter = Router();

postRouter.get("/list", authorization, async (req: Request, res: Response) => {
    try {
        const postController = new PostController(req, res);
        await postController.getListOfPostForUser();
    } catch (error) {
        console.log("Global Post Error : ", error)
    }
})

postRouter.get("/getPostForUser/:authorId", authorization, async (req: Request, res: Response) => {
    try {
        const postController = new PostController(req, res)
        await postController.getListOfPostForUser();
    } catch (error) {
        console.log("Global Post Error : ", error)
    }
})

postRouter.get("/:id", authorization, async (req: Request, res: Response) => {
    try {
        const userController = new PostController(req, res);
        await userController.getASinglePost();
    } catch (error) {
        console.log("Global User Error !!!", error)
    }
})

postRouter.post("/create", [authorization, uploadPost], async (req: Request, res: Response) => {
    try {
        const postController = new PostController(req, res)
        await postController.createAPost();
    } catch (error) {
        console.log("Global Post Error : ", error)
    }
})

postRouter.put("/update/:postId", [authorization, uploadPost], async (req: Request, res: Response) => {
    try {
        const postController = new PostController(req, res)
        await postController.updatePost();
    } catch (error) {
        console.log("Global Post Error : ", error)
    }
})

postRouter.delete("/delete/:postId", authorization, async (req: Request, res: Response) => {
    try {
        const postController = new PostController(req, res)
        await postController.deletePost();
    } catch (error) {
        console.log("Global Post Error : ", error);
    }
})

export default postRouter
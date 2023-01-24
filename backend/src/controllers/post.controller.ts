import { Request, Response } from "express";
import PostService from "../services/post.service";
import * as path from "path"
import dotenv from "dotenv";
dotenv.config({ path: path.resolve("./.env") })

class PostController {
    private req: Request;
    private res: Response;
    private service: PostService

    constructor(request: Request, response: Response) {
        this.req = request;
        this.res = response;
        this.service = new PostService()
    }

    async getListOfPost() {
        try {
            const posts = await this.service.getListOfPost();
            if (posts.length === 0) {
                return this.res.status(200).send("No Post Exist !!!")
            } else {
                return this.res.status(200).send(posts)
            }
        } catch (error) {
            console.log(error)
            return this.res.status(500).send("Post's Controller : Internal Service Error !!!")
        }
    }

    async getListOfPostForUser() {
        try {
            const authorId = this.req.params.authorId;
            const posts = await this.service.getListOfPostForUser(authorId);
            if (posts.length === 0) {
                return this.res.status(200).send("No Post Exist !!!")
            } else {
                return this.res.status(200).send(posts)
            }
        } catch (error) {
            console.log(error)
            return this.res.status(500).send("Post's Controller : Internal Service Error !!!")
        }
    }

    async getASinglePost() {
        try {
            const token = this.req.headers.authorization as string;
            const post = await this.service.getASinglePost(token);
            return this.res.status(200).send(post)
        } catch (error) {
            console.log(error)
            return this.res.status(500).send("Post's Controller : Internal Service Error !!!")
        }
    }

    async createAPost() {
        try {
            const caption = this.req.body.caption;
            const hashtags = this.req.body.hashtags;
            const token = this.req.headers.authorization as string;
            const file = process.env.POST_IMAGE_URL as string + this.req.file?.filename;
            const data = { caption, hashtags, file }
            const post = await this.service.createAPost(token, data);
            return this.res.status(201).send(post);
        } catch (error) {
            console.log(error)
            return this.res.status(500).send("Post's Controller : Internal Service Error !!!")
        }
    }

    async updatePost() {
        try {
            const postId = this.req.params.postId;
            const caption = this.req.body.caption;
            const hashtags = this.req.body.hashtags;
            const file = process.env.POST_IMAGE_URL as string + this.req.file?.filename;
            const data = { caption, hashtags, file }
            const updatedPost = await this.service.updatePost(postId, data);
            if (updatedPost !== 0) {
                return this.res.status(200).send({ message: "Post Details Updated !!!" })
            } else {
                return this.res.status(200).send({ message: "Post Details Not Updated !!!" })
            }
        } catch (error) {
            console.log(error)
            return this.res.status(500).send("Post's Controller : Internal Service Error !!!")
        }
    }

    async deletePost() {
        try {
            const postId = this.req.params.postId;
            const deletedPost = await this.service.deletePost(postId);
            if (deletedPost) {
                return this.res.status(200).send("Post Deleted !!!")
            } else {
                return this.res.status(200).send("Post Not Deleted !!!")
            }
        } catch (error) {
            console.log(error)
            return this.res.status(500).send("Post's Controller : Internal Service Error !!!")
        }
    }
}

export default PostController

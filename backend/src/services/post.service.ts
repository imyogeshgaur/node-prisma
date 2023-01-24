import prisma from "../database/database.config";
import decodeUser from "../helpers/decodeUser.helper";

class PostService {
    private Post: any;
    constructor() {
        this.Post = prisma.post;
    }

    async getListOfPost() {
        try {
            const posts = await this.Post.findMany();
            return posts;
        } catch (error) {
            console.log("Post's Service Error : ", error);
        }
    }

    async getListOfPostForUser(authorId: string) {
        try {
            const posts = await this.Post.findMany({
                where: {
                    authorId
                }
            })
            return posts;
        } catch (error) {
            console.log("Post's Service Error : ", error);
        }
    }

    async getASinglePost(token: string) {
        const user = await decodeUser(token);
        try {
            const post = await this.Post.findFirst({
                where: {
                    authorId: user?.userId
                }
            })
            return post
        } catch (error) {
            console.log("Post's Service Error : ", error);
        }
    }

    async createAPost(token: string, data: any) {
        const { caption, hashtags, file } = data;
        const user = await decodeUser(token);
        try {
            const post = await this.Post.create({
                data: {
                    caption,
                    hashtags,
                    postImage: file,
                    authorId: user?.userId
                }
            })
            return post;
        } catch (error) {
            console.log("Post's Service Error : ", error);
        }
    }

    async updatePost(postId: string, data: any) {
        try {
            const { caption, hashtags, file } = data;
            if (file===undefined) {
                const updatedPost = await this.Post.update({
                    where: {
                        postId
                    },
                    data: {
                        caption,
                        hashtags,
                        postImage: file
                    }
                })
                return updatedPost
            } else {
                const updatedPost = await this.Post.update({
                    where: {
                        postId
                    },
                    data: {
                        caption,
                        hashtags,
                    }
                })
                return updatedPost
            }
        } catch (error) {
            console.log("Post's Service Error : ", error);
        }
    }

    async deletePost(postId: string) {
        try {
            const deletedPost = await this.Post.delete({
                where: {
                    postId
                }
            })
            return deletedPost;
        } catch (error) {
            console.log("Post's Service Error : ", error);
        }
    }
}

export default PostService
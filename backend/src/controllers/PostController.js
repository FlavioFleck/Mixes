import PostService from "../services/PostService.js";

export default class PostController {
    constructor(connection) {
        this.postService = new PostService(connection)
    }

    createPost = async (req, res) => {
        const payload = {
            ...req.body
        }

        const post = await this.postService.createPost(payload)
        res.send(post)
    }

    getPostById = async(req, res) => {
        const payload= {
            ...req.params
        }

        const result = await this.postService.getPostById(payload)
        res.send(result)
    }

    getAllPosts = async(req, res) => {
        const posts = await this.postService.getAllPosts();
        return res.send(posts)
    }
}
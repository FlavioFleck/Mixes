import PostService from "../services/PostService.js";

export default class PostController {
    constructor(connection) {
        this.postService = new PostService(connection)
    }

    createPost = async(req, res) => {
        const payload = {
            ...req.body,
            authUserId: req.user.sub
        }

        const post = await this.postService.createPost(payload)
        res.send(post)
    }

    delete = async(req, res) => {
        const payload = {
            ...req.params
        }
        const result = await this.postService.deletePost(payload)
        res.send(result)
    }

    getPostById = async(req, res) => {
        const payload= {
            ...req.params
        }

        const result = await this.postService.getPostById(payload)
        res.send(result)
    }

    getPostByUsername = async(req, res) => {
        const payload = {
            username: req.params.username,
            authUserId: req.user.sub
        }

        const posts = await this.postService.getPostsByUsername(payload)
        res.send(posts)
    }

    getAllPosts = async(req, res) => {
        const payload = {
            authUserId: req.user.sub
        }
        const posts = await this.postService.getAllPosts(payload);
        return res.send(posts)
    }
}
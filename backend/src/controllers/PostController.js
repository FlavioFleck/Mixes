import PostService from "../services/PostService.js";

export default class PostController {
    constructor(connection) {
        this.postService = new PostService(connection)
    }

    createPost = async (req, res) => {
        const payload = {
            ...req.body
        }

        // const result = await this.postService.getNotificationsByUserId(payload)
        res.send(payload)
    }

    getPostById = async(req, res) => {
        const payload= {
            ...req.params
        }

        const result = await this.postService.getPostById(payload)
        res.send(result)
    }
}
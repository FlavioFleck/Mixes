import Post from "../models/Post.js"
import PostRepository from "../repositories/PostRepository.js"

export default class PostService {
    constructor(connection) {
        this.postRepository = new PostRepository(connection)
    }

    async createPost(payload) {
        const post = new Post(payload)
        const result = await this.postRepository.add(post)
        return result
    }

    async deletePost(payload) {
        const result = await this.postRepository.delete(payload)
        return result
    }
}
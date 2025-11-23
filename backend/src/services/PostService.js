import Post from "../models/Post.js"
import PostRepository from "../repositories/PostRepository.js"
import ProfileRepository from "../repositories/ProfileRepository.js"
import UserRepository from "../repositories/UserRepository.js"

export default class PostService {
    constructor(connection) {
        this.postRepository = new PostRepository(connection)
        this.profileRepository = new ProfileRepository(connection)
        this.userRespository = new UserRepository(connection)
    }

    async createPost(payload) {
        const post = new Post(payload)
        const postR = await this.postRepository.add(post)
        const profile = await this.profileRepository.getByUserId({user_id: postR.user_id})
        const user = await this.userRespository.getById({id: postR.user_id})
        const response = {
            id: postR.id,
            content: postR.content,
            created_at: postR.created_at,
            user: {
                id: profile.user_id,
                name: user.name,
                username: profile.username,
                avatar: profile.profile_image
            }
        }
        return response
    }

    async deletePost(payload) {
        const result = await this.postRepository.delete(payload)
        return result
    }

    async getAllPosts() {
        const posts = await this.postRepository.getAll()
        const payload = []
        for(const post of posts) {
            const profile = await this.profileRepository.getByUserId({user_id: post.user_id})
            const user = await this.userRespository.getById({id: post.user_id})
            payload.push({
                id: post.id,
                content: post.content,
                createdAt: post.created_at,
                user: {
                    id: profile.user_id,
                    name: user.name,
                    username: profile.username,
                    avatar: profile.profile_image
                }
            })
        }
        return payload
    }

    async getPostById(payload) {
        const result = await this.postRepository.getById(payload)
        return result
    }

    async getPostsByUserId(payload) {
        const posts = await this.postRepository.getByUserId(payload)
        const response = []
        for(const post of posts) {
            const profile = await this.profileRepository.getByUserId(payload)
            const user = await this.userRespository.getById({id: payload.user_id})
            response.push({
                id: post.id,
                content: post.content,
                createdAt: post.created_at,
                user: {
                    id: profile.user_id,
                    name: user.name,
                    username: profile.username,
                    avatar: profile.profile_image
                }
            })
        }
        return response
    }
}
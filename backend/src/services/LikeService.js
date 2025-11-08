import Like from "../models/Like"
import LikeRepository from "../repositories/LikeRepository";

export default class LikeService {
    constructor(connection) {
        this.likeRepository = new LikeRepository(connection)
    }

    async createLike(payload) {
        const like = new Like(payload)
        const result = await this.likeRepository.add(like)
        return result
    }

    async deleteLike(payload) {
        const result = await this.likeRepository.delete(payload)
        return result
    }
}
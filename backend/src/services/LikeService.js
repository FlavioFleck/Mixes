import Like from "../models/Like.js"
import LikeRepository from "../repositories/LikeRepository.js";

export default class LikeService {
    constructor(connection) {
        this.likeRepository = new LikeRepository(connection)
    }

    async createLike(payload) {
        const like = new Like(payload)
        const verifyIfExists = await this.likeRepository.alreadyLiked(like)

        if(!verifyIfExists) {
            const idReponse = await this.likeRepository.add(like)
            const likeQTDResponse = await this.likeRepository.likeCountByPostId({id: like.post_id})
            return {id: idReponse.id, like_count: likeQTDResponse.like_count}
        }
    }

    async deleteLike(payload) {
        await this.likeRepository.delete({id: payload.like_id})
        const likeQTDResponse = await this.likeRepository.likeCountByPostId({id: payload.post_id})
        return likeQTDResponse
    }

    async likeCountByPostId(payload) {
        const result = await this.likeRepository.likeCountByPostId(payload)
        return result
    }

    async alreadyLiked(payload) {
        const result = await this.likeRepository.alreadyLiked(payload);
        return result
    }

    async getLikeByUserAndPost(payload) {
        const result = await this.likeRepository.getLikeByUserAndPost(payload)
        return result
    }
}
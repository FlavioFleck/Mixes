import Follow from "../models/Follow";
import FollowRepository from "../repositories/FollowRepository";

export default class FollowService {
    constructor(connection) {
        this.followRepository = new FollowRepository(connection)
    }

    async createFollow(payload) {
        const follow = new Follow(payload)
        const result = this.followRepository.add(follow)
        return result
    }

    async deleteFollow(payload) {
        const result = this.followRepository.delete(payload)
        return result
    }
}
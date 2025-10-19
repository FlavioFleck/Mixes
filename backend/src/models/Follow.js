export default class Follow {
    constructor(followingUserId, followedUserId, createdAt) {
        this.followingUserId = followingUserId
        this.followedUserId = followedUserId
        this.createdAt = createdAt 
    }
}
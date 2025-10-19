export default class Block {
    constructor(blockerUserId, blockedUserId, createdAt) {
        this.blockerUserId = blockerUserId
        this.blockedUserId = blockedUserId
        this.createdAt = createdAt
    }
}
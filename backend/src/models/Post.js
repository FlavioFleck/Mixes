export default class Post {
    constructor(userId, content, file, songId, postFatherId, createdAt) {
        this.userId = userId,
        this.content = content
        this.file = file
        this.songId = songId
        this.postFatherId = postFatherId
        this.createdAt = createdAt
    }
}
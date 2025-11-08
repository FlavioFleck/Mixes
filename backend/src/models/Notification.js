export default class Notification {
    constructor({senderId, receiverId, content, type, messageId, likeId, postId, followId}) {
        this.senderId = senderId
        this.receiverId = receiverId
        this.content = content
        this.type = type
        this.messageId = messageId
        this.likeId = likeId
        this.postId = postId
        this.followId = followId
    }
}
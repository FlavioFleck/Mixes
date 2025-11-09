export default class NotificationRepository {
    constructor(connection) {
        this.connection = connection
    }

    async add({senderId, receiverId, content, type, messageId, likeId, postId, followId}) {
        const query = `
            INSERT INTO notifications(sender_user_id, receiver_user_id, content, type, message_id, like_id, post_id, follow_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `

        const [info] = await this.connection.query(query, [
            senderId, 
            receiverId, 
            content, 
            type,
            messageId,
            likeId,
            postId,
            followId
        ])

        return info.insertId
    }
    
    async delete({id}) {
        const query = "DELETE FROM notifications WHERE id = ?"
        const [info] = await this.connection.query(query, [id])
        return info.affectedRows
    }

    async getByUserId({userId}) {
        const query = "SELECT * FROM notifications WHERE receiver_user_id = ?"
        const [info] = await this.connection.query(query, [userId])
        return info
    }
}
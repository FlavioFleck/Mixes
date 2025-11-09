export default class NotificartionRepository {
    constructor(connection) {
        this.connection = connection
    }

    add({senderId, receiverId, content, type, messageId, likeId, postId, followId}) {
        const query = `
            INSERT INTO notifications(sender_user_id, receiver_user_id, content, type, message_id, like_id, post_id, follow_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `

        const [info] = this.connection.query(query, [
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
    
    delete({id}) {
        const query = "DELETE FROM notifications WHERE id = ?"
        const [info] = this.connection.query(query, [id])
        return info.affectedRows
    }
}